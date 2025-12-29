import { useState, useMemo } from 'react';

/**
 * Data transparency section with audit report + filterable tables
 * Displays events and patterns in tabular format for browsing/analysis
 */
export default function DataTables({ events, patterns, entities, entityMap, entityClassMap, stackLayers }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('events'); // 'events' | 'patterns' | 'audit'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  // Sort and filter events
  const filteredEvents = useMemo(() => {
    if (!events || events.length === 0) return [];

    let filtered = events.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entityMap?.get(event.entity_id)?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort
    filtered.sort((a, b) => {
      let aVal, bVal;

      if (sortConfig.key === 'date') {
        aVal = new Date(a.date);
        bVal = new Date(b.date);
      } else if (sortConfig.key === 'entity') {
        aVal = entityMap?.get(a.entity_id)?.name || '';
        bVal = entityMap?.get(b.entity_id)?.name || '';
      } else if (sortConfig.key === 'impact') {
        const impactOrder = { high: 3, medium: 2, low: 1 };
        aVal = impactOrder[a.impact_level];
        bVal = impactOrder[b.impact_level];
      } else {
        aVal = a[sortConfig.key];
        bVal = b[sortConfig.key];
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [events, searchQuery, sortConfig, entityMap]);

  // Sort and filter patterns
  const filteredPatterns = useMemo(() => {
    if (!patterns || patterns.length === 0) return [];

    let filtered = patterns.filter(pattern =>
      pattern.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pattern.thesis?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aVal, bVal;

      if (sortConfig.key === 'confidence') {
        const confOrder = { high: 3, medium: 2, low: 1 };
        aVal = confOrder[a.confidence];
        bVal = confOrder[b.confidence];
      } else if (sortConfig.key === 'events') {
        aVal = a.supporting_events.length;
        bVal = b.supporting_events.length;
      } else {
        aVal = a[sortConfig.key];
        bVal = b[sortConfig.key];
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [patterns, searchQuery, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="border-t border-border-subtle bg-gray-50">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <svg
            className={`w-5 h-5 text-text-muted transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <div className="text-left">
            <h2 className="text-sm font-bold text-text-main uppercase tracking-widest">
              Data Quality & Transparency
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              Independent audit report + browsable event/pattern tables
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span>{events?.length || 0} events</span>
          <span>•</span>
          <span>{patterns?.length || 0} patterns</span>
          <span>•</span>
          <span className="font-mono bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
            Grade: C+ (6.2/10)
          </span>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-6">
          {/* Tabs */}
          <div className="flex gap-4 border-b border-border-subtle mb-4">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'events'
                  ? 'text-text-main border-b-2 border-text-main'
                  : 'text-text-muted hover:text-text-main'
              }`}
            >
              Events ({events.length})
            </button>
            <button
              onClick={() => setActiveTab('patterns')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'patterns'
                  ? 'text-text-main border-b-2 border-text-main'
                  : 'text-text-muted hover:text-text-main'
              }`}
            >
              Patterns ({patterns.length})
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'audit'
                  ? 'text-text-main border-b-2 border-text-main'
                  : 'text-text-muted hover:text-text-main'
              }`}
            >
              Audit Report
            </button>
          </div>

          {/* Search */}
          {activeTab !== 'audit' && (
            <div className="mb-4">
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md px-3 py-2 text-sm border border-border-subtle rounded focus:outline-none focus:ring-2 focus:ring-text-main"
              />
            </div>
          )}

          {/* Events Table */}
          {activeTab === 'events' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-white rounded border border-border-subtle">
                <thead className="bg-gray-50 border-b border-border-subtle">
                  <tr>
                    <th
                      onClick={() => handleSort('date')}
                      className="px-4 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    >
                      Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      onClick={() => handleSort('title')}
                      className="px-4 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    >
                      Event {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      onClick={() => handleSort('entity')}
                      className="px-4 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    >
                      Entity {sortConfig.key === 'entity' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      onClick={() => handleSort('impact')}
                      className="px-4 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    >
                      Impact {sortConfig.key === 'impact' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider">
                      Stack Layer
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {filteredEvents.map((event) => {
                    const entity = entityMap?.get(event.entity_id);
                    const entityClass = entity ? entityClassMap?.get(entity.entity_class) : null;
                    const layer = stackLayers.find(l => l.id === event.stack_layers[0]);

                    return (
                      <tr key={event.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-text-muted font-mono text-xs">
                          {formatDate(event.date)}
                        </td>
                        <td className="px-4 py-3 text-text-main font-medium max-w-xs">
                          <div className="truncate">{event.title}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className="inline-block px-2 py-1 text-xs rounded"
                            style={{
                              backgroundColor: `${entityClass?.color}15`,
                              color: entityClass?.color || '#6b7280'
                            }}
                          >
                            {entity?.name}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`inline-block px-2 py-1 text-xs rounded font-medium ${
                            event.impact_level === 'high' ? 'bg-red-100 text-red-800' :
                            event.impact_level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {event.impact_level}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-text-muted text-xs">
                          {layer?.name}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filteredEvents.length === 0 && (
                <div className="text-center py-8 text-text-muted text-sm">
                  No events match your search.
                </div>
              )}
            </div>
          )}

          {/* Patterns Table */}
          {activeTab === 'patterns' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-white rounded border border-border-subtle">
                <thead className="bg-gray-50 border-b border-border-subtle">
                  <tr>
                    <th
                      onClick={() => handleSort('title')}
                      className="px-4 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    >
                      Pattern {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider">
                      Thesis
                    </th>
                    <th
                      onClick={() => handleSort('confidence')}
                      className="px-4 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    >
                      Confidence {sortConfig.key === 'confidence' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      onClick={() => handleSort('events')}
                      className="px-4 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    >
                      Events {sortConfig.key === 'events' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {filteredPatterns.map((pattern) => (
                    <tr key={pattern.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-text-main font-medium">
                        {pattern.title}
                      </td>
                      <td className="px-4 py-3 text-text-muted text-xs max-w-2xl">
                        <div className="line-clamp-2">{pattern.thesis}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-block px-2 py-1 text-xs rounded font-medium ${
                          pattern.confidence === 'high' ? 'bg-green-100 text-green-800' :
                          pattern.confidence === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {pattern.confidence}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-text-muted font-mono text-xs">
                        {pattern.supporting_events.length} events
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredPatterns.length === 0 && (
                <div className="text-center py-8 text-text-muted text-sm">
                  No patterns match your search.
                </div>
              )}
            </div>
          )}

          {/* Audit Report Summary */}
          {activeTab === 'audit' && (
            <div className="bg-white rounded border border-border-subtle p-6 prose prose-sm max-w-none">
              <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <h3 className="text-sm font-bold text-yellow-900 mt-0 mb-2">Independent Third-Party Audit</h3>
                <p className="text-xs text-yellow-800 mb-0">
                  This audit was conducted to assess data quality, coverage gaps, and framework coherence.
                  <strong> Overall Grade: C+ (6.2/10)</strong> - Solid foundation but needs substantial refinement for authoritative status.
                </p>
              </div>

              <h3 className="text-base font-bold mt-6 mb-3">Executive Summary Scores</h3>
              <div className="grid grid-cols-3 gap-4 mb-6 not-prose">
                {[
                  { label: 'Event Coverage', score: '6/10', color: 'yellow' },
                  { label: 'Framework Design', score: '7/10', color: 'green' },
                  { label: 'Entity Classification', score: '5/10', color: 'red' },
                  { label: 'Pattern Quality', score: '7/10', color: 'green' },
                  { label: 'Data Rigor', score: '5/10', color: 'red' },
                  { label: 'Strategic Value', score: '7/10', color: 'green' }
                ].map(item => (
                  <div key={item.label} className="border border-border-subtle rounded p-3">
                    <div className="text-xs text-text-muted mb-1">{item.label}</div>
                    <div className={`text-lg font-bold ${
                      item.color === 'green' ? 'text-green-600' :
                      item.color === 'yellow' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {item.score}
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-base font-bold mt-6 mb-3">Key Findings</h3>

              <h4 className="text-sm font-semibold mt-4 mb-2">Strengths:</h4>
              <ul className="text-xs text-text-main space-y-1">
                <li>Strong coverage of coding AI explosion (2024-2025)</li>
                <li>Clear documentation of vertical integration dynamics</li>
                <li>6-layer stack taxonomy aligned with enterprise spend patterns</li>
                <li>Compelling narrative around Claude Sonnet 3.5 triggering market shifts</li>
              </ul>

              <h4 className="text-sm font-semibold mt-4 mb-2">Critical Gaps:</h4>
              <ul className="text-xs text-text-main space-y-1">
                <li><strong>Geographic Bias (Critical):</strong> 95% US-focused, only 1 Chinese entity despite China = 30% of global AI investment</li>
                <li><strong>Infrastructure Under-coverage:</strong> Training/Compute layer has only 2 events (4.3%), missing NVIDIA, AMD, Google TPU</li>
                <li><strong>Financial Data Weakness:</strong> Only 4.3% of events have quantified metrics with sources</li>
                <li><strong>Missing Modalities:</strong> Multimodal AI (image/video) almost entirely absent ($5B+ market)</li>
                <li><strong>No Regulatory Coverage:</strong> Zero events on EU AI Act, US Executive Orders, China regulations</li>
              </ul>

              <h3 className="text-base font-bold mt-6 mb-3">Immediate Recommendations (Ship in 4 weeks)</h3>
              <ul className="text-xs text-text-main space-y-1">
                <li>Add 10 international events (Mistral AI, Alibaba Qwen, ByteDance, Stability AI)</li>
                <li>Add 8 compute/infrastructure events (NVIDIA H100, Google TPU v5, AMD MI300X)</li>
                <li>Backfill financial metrics for all public ARR/revenue data</li>
                <li>Add at least 3 regulatory events (EU AI Act, US Executive Order, China standards)</li>
              </ul>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
                <p className="text-xs text-blue-900 mb-0">
                  <strong>Full Report:</strong> See{' '}
                  <a href="/docs/THIRD_PARTY_AUDIT.md" className="text-blue-600 hover:underline">
                    docs/THIRD_PARTY_AUDIT.md
                  </a>{' '}
                  for complete 40-page analysis with appendices, missing events list, and v2 roadmap.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
