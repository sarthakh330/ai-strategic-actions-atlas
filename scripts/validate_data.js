#!/usr/bin/env node

/**
 * Data Validation Script for AI Strategic Actions Atlas
 *
 * Validates events and patterns against schema requirements from DATA_MODEL_DRAFT.yaml
 * Implements quality checks from EVAL_RUBRIC.md
 *
 * Usage: node scripts/validate_data.js
 */

const fs = require('fs');
const path = require('path');

// Color codes for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

function log(color, ...args) {
  console.log(color, ...args, colors.reset);
}

// Load JSONL file (newline-delimited JSON)
function loadJSONL(filepath) {
  if (!fs.existsSync(filepath)) {
    log(colors.yellow, `⚠️  File not found: ${filepath}`);
    return [];
  }

  const content = fs.readFileSync(filepath, 'utf-8');
  return content
    .trim()
    .split('\n')
    .filter(line => line.trim())
    .map((line, idx) => {
      try {
        return JSON.parse(line);
      } catch (e) {
        log(colors.red, `❌ Parse error at line ${idx + 1} in ${filepath}: ${e.message}`);
        return null;
      }
    })
    .filter(obj => obj !== null);
}

// Load regular JSON file
function loadJSON(filepath) {
  if (!fs.existsSync(filepath)) {
    log(colors.yellow, `⚠️  File not found: ${filepath}`);
    return [];
  }

  try {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  } catch (e) {
    log(colors.red, `❌ Parse error in ${filepath}: ${e.message}`);
    return [];
  }
}

// Validation rules for events
function validateEvent(event, idx, entities, stackLayers, actionTypes) {
  const errors = [];
  const warnings = [];
  let score = 0;
  const maxScore = 10;

  // Required fields
  if (!event.id) errors.push('Missing required field: id');
  if (!event.title) errors.push('Missing required field: title');
  if (!event.entity_id) errors.push('Missing required field: entity_id');
  if (!event.date) errors.push('Missing required field: date');
  if (!event.action_type) errors.push('Missing required field: action_type');
  if (!event.stack_layers || !Array.isArray(event.stack_layers)) {
    errors.push('Missing or invalid stack_layers (must be array)');
  }
  if (!event.impact_level) errors.push('Missing required field: impact_level');
  if (!event.description) errors.push('Missing required field: description');
  if (!event.confidence) errors.push('Missing required field: confidence');

  // Evidence Quality (0-3 points)
  if (event.evidence_sources && Array.isArray(event.evidence_sources)) {
    const primarySources = event.evidence_sources.filter(s => s.credibility === 'primary');
    const credibleSources = event.evidence_sources.filter(s => s.credibility === 'credible-secondary');

    if (primarySources.length >= 1 && event.evidence_sources.length >= 2) {
      score += 3; // ≥2 sources, at least one primary
    } else if (primarySources.length >= 1 || credibleSources.length >= 2) {
      score += 2; // 1 primary OR ≥2 credible-secondary
    } else if (credibleSources.length >= 1) {
      score += 1; // 1 credible-secondary only
    } else {
      warnings.push('Evidence quality is low (unverified sources only)');
    }
  } else {
    errors.push('Missing or invalid evidence_sources array');
  }

  // Timestamp Correctness (0-2 points)
  if (event.date) {
    const datePrecision = event.date_precision || 'unknown';
    if (datePrecision === 'exact') {
      score += 2;
    } else if (datePrecision === 'month' || datePrecision === 'quarter') {
      score += 1;
    } else {
      warnings.push('Date precision is not specified or is "year" (low precision)');
    }

    // Check if date is in project range (2023-2025)
    const year = parseInt(event.date.split('-')[0]);
    if (year < 2023 || year > 2025) {
      errors.push(`Date ${event.date} is outside project range (2023-2025)`);
    }
  }

  // Classification Correctness (0-2 points)
  let classificationCorrect = true;

  if (event.entity_id && !entities.find(e => e.id === event.entity_id)) {
    errors.push(`entity_id "${event.entity_id}" not found in entities.json`);
    classificationCorrect = false;
  }

  if (event.action_type && !actionTypes.find(a => a.id === event.action_type)) {
    errors.push(`action_type "${event.action_type}" not found in action_types.json`);
    classificationCorrect = false;
  }

  if (event.stack_layers) {
    event.stack_layers.forEach(layerId => {
      if (!stackLayers.find(l => l.id === layerId)) {
        errors.push(`stack_layer "${layerId}" not found in stack_layers.json`);
        classificationCorrect = false;
      }
    });
  }

  if (classificationCorrect) score += 2;

  // Strategic Relevance (0-2 points) - heuristic based on impact level and description
  if (event.impact_level === 'high') {
    score += 2;
  } else if (event.impact_level === 'medium') {
    score += 1;
    warnings.push('Impact level is "medium" - ensure event is strategically significant');
  } else {
    warnings.push('Impact level is "low" - consider if this event belongs in the atlas');
  }

  // Clarity (0-1 point) - check description length
  if (event.description) {
    if (event.description.length > 0 && event.description.length <= 500) {
      score += 1;
    } else if (event.description.length > 500) {
      warnings.push(`Description is too long (${event.description.length} chars, max 500)`);
    }
  }

  // Validate enum values
  if (event.impact_level && !['high', 'medium', 'low'].includes(event.impact_level)) {
    errors.push(`Invalid impact_level: "${event.impact_level}" (must be high/medium/low)`);
  }

  if (event.confidence && !['confirmed', 'likely', 'rumored'].includes(event.confidence)) {
    errors.push(`Invalid confidence: "${event.confidence}" (must be confirmed/likely/rumored)`);
  }

  if (event.date_precision && !['exact', 'month', 'quarter', 'year'].includes(event.date_precision)) {
    errors.push(`Invalid date_precision: "${event.date_precision}"`);
  }

  return { event, score, maxScore, errors, warnings };
}

// Validation rules for patterns
function validatePattern(pattern, idx, events) {
  const errors = [];
  const warnings = [];
  let score = 0;
  const maxScore = 12;

  // Required fields
  if (!pattern.id) errors.push('Missing required field: id');
  if (!pattern.title) errors.push('Missing required field: title');
  if (!pattern.pattern_type) errors.push('Missing required field: pattern_type');
  if (!pattern.thesis) errors.push('Missing required field: thesis');
  if (!pattern.confidence) errors.push('Missing required field: confidence');

  // Hypothesis Language (0-3 points)
  if (pattern.thesis) {
    const hypothesisWords = ['appears to', 'suggests', 'may indicate', 'evidence shows', 'seems to', 'indicates'];
    const hasHypothesisLanguage = hypothesisWords.some(word => pattern.thesis.toLowerCase().includes(word));
    const hasCausalLanguage = /\b(caused|because|proves)\b/i.test(pattern.thesis);

    if (hasHypothesisLanguage && !hasCausalLanguage) {
      score += 3;
    } else if (hasHypothesisLanguage) {
      score += 2;
      warnings.push('Thesis has hypothesis language but also contains causal words');
    } else if (!hasCausalLanguage) {
      score += 1;
      warnings.push('Thesis lacks explicit hypothesis language ("appears to", "suggests", etc.)');
    } else {
      errors.push('Thesis contains causal claims without hypothesis language');
    }
  }

  // Supporting Evidence Strength (0-3 points)
  if (pattern.supporting_events && Array.isArray(pattern.supporting_events)) {
    const count = pattern.supporting_events.length;
    if (count >= 5) {
      score += 3;
    } else if (count >= 4) {
      score += 2;
    } else if (count >= 3) {
      score += 1;
    } else {
      errors.push(`Insufficient supporting events (${count}, minimum 3 required)`);
    }

    // Validate event IDs exist
    pattern.supporting_events.forEach(eventId => {
      if (!events.find(e => e.id === eventId)) {
        warnings.push(`supporting_event "${eventId}" not found in events dataset`);
      }
    });
  } else {
    errors.push('Missing or invalid supporting_events array');
  }

  // Counter-Signals Included (0-2 points)
  if (pattern.counter_signals && Array.isArray(pattern.counter_signals)) {
    if (pattern.counter_signals.length >= 2) {
      score += 2;
    } else if (pattern.counter_signals.length >= 1) {
      score += 1;
    }
  } else {
    warnings.push('No counter-signals listed - ensure epistemic discipline');
  }

  // Confidence Justification (0-2 points)
  if (pattern.confidence_reasoning) {
    if (pattern.confidence_reasoning.length >= 100) {
      score += 2;
    } else {
      score += 1;
      warnings.push('Confidence reasoning is brief - provide more detail');
    }
  } else {
    errors.push('Missing required field: confidence_reasoning');
  }

  // Time-Boundedness (0-1 point)
  if (pattern.time_range && pattern.time_range.start && pattern.time_range.end) {
    score += 1;
  } else {
    warnings.push('Pattern lacks explicit time_range (start/end dates)');
  }

  // Strategic Insight (0-1 point) - heuristic: check if thesis is substantive
  if (pattern.thesis && pattern.thesis.length >= 200) {
    score += 1;
  } else {
    warnings.push('Thesis may be too brief to provide strategic insight');
  }

  // Validate enum values
  const validTypes = ['consolidation-motif', 'strategic-pivot', 'tech-stack-shift', 'pressure-field', 'other'];
  if (pattern.pattern_type && !validTypes.includes(pattern.pattern_type)) {
    errors.push(`Invalid pattern_type: "${pattern.pattern_type}"`);
  }

  if (pattern.confidence && !['high', 'medium', 'low'].includes(pattern.confidence)) {
    errors.push(`Invalid confidence: "${pattern.confidence}" (must be high/medium/low)`);
  }

  return { pattern, score, maxScore, errors, warnings };
}

// Main validation function
function validateData() {
  const baseDir = path.join(__dirname, '..');

  log(colors.blue, '\n=== AI Strategic Actions Atlas - Data Validation ===\n');

  // Load canonical data
  log(colors.blue, 'Loading canonical data...');
  const entities = loadJSON(path.join(baseDir, 'data/canonical/entities.json'));
  const stackLayers = loadJSON(path.join(baseDir, 'data/canonical/stack_layers.json'));
  const actionTypes = loadJSON(path.join(baseDir, 'data/canonical/action_types.json'));

  log(colors.green, `✓ Loaded ${entities.length} entities`);
  log(colors.green, `✓ Loaded ${stackLayers.length} stack layers`);
  log(colors.green, `✓ Loaded ${actionTypes.length} action types\n`);

  // Load events
  log(colors.blue, 'Validating events...');
  const events = loadJSONL(path.join(baseDir, 'data/events/v0_seed_40.jsonl'));
  log(colors.green, `✓ Loaded ${events.length} events\n`);

  let eventsPassed = 0;
  let eventsRevise = 0;
  let eventsRejected = 0;

  events.forEach((event, idx) => {
    const result = validateEvent(event, idx, entities, stackLayers, actionTypes);

    if (result.errors.length > 0) {
      log(colors.red, `\n❌ Event ${idx + 1}: "${result.event.id}" (Score: ${result.score}/${result.maxScore})`);
      result.errors.forEach(err => log(colors.red, `   Error: ${err}`));
      eventsRejected++;
    } else if (result.score >= 7) {
      log(colors.green, `✓ Event ${idx + 1}: "${result.event.id}" (Score: ${result.score}/${result.maxScore})`);
      eventsPassed++;
    } else {
      log(colors.yellow, `⚠️  Event ${idx + 1}: "${result.event.id}" (Score: ${result.score}/${result.maxScore}) - NEEDS REVISION`);
      eventsRevise++;
    }

    if (result.warnings.length > 0) {
      result.warnings.forEach(warn => log(colors.yellow, `   Warning: ${warn}`));
    }
  });

  // Load patterns
  log(colors.blue, '\n\nValidating patterns...');
  const patterns = loadJSONL(path.join(baseDir, 'data/patterns/v0_seed_5.jsonl'));
  log(colors.green, `✓ Loaded ${patterns.length} patterns\n`);

  let patternsPassed = 0;
  let patternsRevise = 0;
  let patternsRejected = 0;

  patterns.forEach((pattern, idx) => {
    const result = validatePattern(pattern, idx, events);

    if (result.errors.length > 0) {
      log(colors.red, `\n❌ Pattern ${idx + 1}: "${result.pattern.id}" (Score: ${result.score}/${result.maxScore})`);
      result.errors.forEach(err => log(colors.red, `   Error: ${err}`));
      patternsRejected++;
    } else if (result.score >= 9) {
      log(colors.green, `✓ Pattern ${idx + 1}: "${result.pattern.id}" (Score: ${result.score}/${result.maxScore})`);
      patternsPassed++;
    } else {
      log(colors.yellow, `⚠️  Pattern ${idx + 1}: "${result.pattern.id}" (Score: ${result.score}/${result.maxScore}) - NEEDS REVISION`);
      patternsRevise++;
    }

    if (result.warnings.length > 0) {
      result.warnings.forEach(warn => log(colors.yellow, `   Warning: ${warn}`));
    }
  });

  // Summary
  log(colors.blue, '\n=== Validation Summary ===\n');

  log(colors.blue, 'Events:');
  log(colors.green, `  ✓ Passed (7-10/10): ${eventsPassed}`);
  log(colors.yellow, `  ⚠️  Needs Revision (5-6/10): ${eventsRevise}`);
  log(colors.red, `  ❌ Rejected (0-4/10): ${eventsRejected}`);
  log(colors.blue, `  Total: ${events.length}\n`);

  log(colors.blue, 'Patterns:');
  log(colors.green, `  ✓ Passed (9-12/12): ${patternsPassed}`);
  log(colors.yellow, `  ⚠️  Needs Revision (6-8/12): ${patternsRevise}`);
  log(colors.red, `  ❌ Rejected (0-5/12): ${patternsRejected}`);
  log(colors.blue, `  Total: ${patterns.length}\n`);

  const overallPass = eventsRejected === 0 && patternsRejected === 0;

  if (overallPass) {
    log(colors.green, '✓ All validation checks passed! Dataset is ready for UI implementation.\n');
    process.exit(0);
  } else {
    log(colors.red, '❌ Validation failed. Fix errors before proceeding to UI implementation.\n');
    process.exit(1);
  }
}

// Run validation
validateData();
