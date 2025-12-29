import { useState, useEffect } from 'react';

/**
 * Custom hook to load all data from the /data directory
 * Returns: { events, patterns, entities, stackLayers, actionTypes, entityClasses, loading, error }
 */
export function useData() {
  const [data, setData] = useState({
    events: [],
    patterns: [],
    entities: [],
    stackLayers: [],
    actionTypes: [],
    entityClasses: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function loadData() {
      try {
        // Load canonical data (JSON)
        const [entities, stackLayers, actionTypes, entityClasses] = await Promise.all([
          fetch('/data/canonical/entities.json').then(r => r.json()),
          fetch('/data/canonical/stack_layers.json').then(r => r.json()),
          fetch('/data/canonical/action_types.json').then(r => r.json()),
          fetch('/data/canonical/entity_classes.json').then(r => r.json()),
        ]);

        // Load events (JSONL - one JSON object per line)
        const eventsText = await fetch('/data/events/v0_seed_40.jsonl').then(r => r.text());
        const events = eventsText
          .trim()
          .split('\n')
          .filter(line => line.trim())
          .map(line => JSON.parse(line));

        // Load patterns (JSONL)
        const patternsText = await fetch('/data/patterns/v0_seed_5.jsonl').then(r => r.text());
        const patterns = patternsText
          .trim()
          .split('\n')
          .filter(line => line.trim())
          .map(line => JSON.parse(line));

        setData({
          events,
          patterns,
          entities,
          stackLayers: stackLayers.sort((a, b) => a.sort_order - b.sort_order),
          actionTypes,
          entityClasses,
          loading: false,
          error: null,
        });
      } catch (err) {
        console.error('Error loading data:', err);
        setData(prev => ({
          ...prev,
          loading: false,
          error: err.message,
        }));
      }
    }

    loadData();
  }, []);

  return data;
}
