import { useState } from 'react';
import EventDot from './EventDot';
import Tooltip from './Tooltip';

/**
 * Main timeline grid component
 * Renders Stack × Time grid with event dots
 */
export default function TimelineGrid({ events, stackLayers, entityClasses, entities, showSpend, onEventClick, highlightedPattern }) {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [hoveredPosition, setHoveredPosition] = useState({ x: 0, y: 0 });

  // Get set of event IDs that should be highlighted
  const highlightedEventIds = highlightedPattern ? new Set(highlightedPattern.supporting_events) : null;

  // Generate quarters for 2023-2025
  const quarters = [];
  for (let year = 2023; year <= 2025; year++) {
    for (let q = 1; q <= 4; q++) {
      quarters.push({ year, quarter: q, label: `Q${q}` });
    }
  }

  // Position event within quarter based on date
  const getEventPosition = (event, quarterIndex) => {
    const date = new Date(event.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 1-12
    const quarter = Math.ceil(month / 3);

    const eventQuarterIndex = (year - 2023) * 4 + (quarter - 1);

    if (eventQuarterIndex !== quarterIndex) return null;

    // Position within quarter based on month
    const monthInQuarter = month - (quarter - 1) * 3; // 1, 2, or 3
    const position = (monthInQuarter - 0.5) / 3; // 0.17, 0.5, 0.83

    return event.date_precision === 'exact' ? position : 0.5;
  };

  // Group events by stack layer and quarter
  const eventsByLayerQuarter = {};
  stackLayers.forEach(layer => {
    eventsByLayerQuarter[layer.id] = {};
    quarters.forEach((_, qIdx) => {
      eventsByLayerQuarter[layer.id][qIdx] = [];
    });
  });

  events.forEach(event => {
    const primaryLayer = event.stack_layers[0];
    quarters.forEach((_, qIdx) => {
      const pos = getEventPosition(event, qIdx);
      if (pos !== null) {
        eventsByLayerQuarter[primaryLayer][qIdx].push({ ...event, position: pos });
      }
    });
  });

  // Group layers by category
  const applicationLayers = stackLayers.slice(0, 3);
  const infrastructureLayers = stackLayers.slice(3, 6);

  return (
    <div className="relative min-w-[900px] flex flex-col">
      {/* Timeline Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-30 border-b border-black pt-4 pb-2 px-6 shadow-sm">
        <div className="grid grid-cols-[180px_1fr] gap-0">
          {/* STACK ROW Label */}
          <div className="flex items-end pb-2 pl-2">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
              Stack Row
            </span>
          </div>

          {/* Year/Quarter Headers */}
          <div className="relative h-8 w-full">
            <div className="absolute inset-0 flex text-[10px] font-mono text-text-muted uppercase tracking-wider h-full items-end pb-2">
              {[2023, 2024, 2025].map(year => (
                <div key={year} className="w-[33.33%] border-l border-black pl-2 flex flex-col justify-end">
                  <span className="font-bold text-black mb-1">{year}</span>
                  <div className="flex w-full text-[9px] text-gray-400 font-normal">
                    <span className="w-[25%]">Q1</span>
                    <span className="w-[25%]">Q2</span>
                    <span className="w-[25%]">Q3</span>
                    <span className="w-[25%]">Q4</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="p-6 pt-2 space-y-8">
        {/* APPLICATIONS Section */}
        <div className="relative">
          <h3 className="text-[11px] font-bold text-text-main uppercase tracking-widest mb-1 flex items-center gap-2 py-2 border-b border-gray-100">
            <svg className="w-3.5 h-3.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Applications
          </h3>

          {applicationLayers.map((layer) => (
            <div key={layer.id} className="grid grid-cols-[180px_1fr] gap-0 group hover:bg-gray-50/50 transition-colors border-b border-border-subtle cursor-pointer min-h-[72px]">
              {/* Layer Label */}
              <div className="py-4 border-r border-border-subtle pr-4 flex flex-col justify-center relative">
                <span className="text-xs font-medium text-text-main">{layer.name}</span>
                <span className="text-[10px] text-text-muted mt-0.5 opacity-60">
                  {layer.examples.join(', ')}
                </span>
                {showSpend && (
                  <div className="absolute right-2 top-2 text-[9px] text-text-muted font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    '25 est: $2B
                  </div>
                )}
              </div>

              {/* Timeline Cell with Events */}
              <div className="relative py-4 timeline-cell">
                {/* Year divider lines */}
                <div className="absolute top-0 bottom-0 left-[33.33%] border-l border-border-subtle z-0"></div>
                <div className="absolute top-0 bottom-0 left-[66.66%] border-l border-border-subtle z-0"></div>

                {/* Quarter divider lines (dashed) */}
                {[8.33, 16.66, 25, 41.66, 50, 58.33, 75, 83.33, 91.66].map((left, i) => (
                  <div
                    key={i}
                    className="absolute top-0 bottom-0 border-l border-dashed border-gray-200 z-0"
                    style={{ left: `${left}%` }}
                  ></div>
                ))}

                {/* Events */}
                {quarters.map((_, qIdx) => (
                  <div key={qIdx} className="absolute inset-0">
                    {eventsByLayerQuarter[layer.id][qIdx].map((event, eventIdx) => {
                      const entityClass = entityClasses.find(ec => {
                        const entity = entities.find(e => e.id === event.entity_id);
                        return entity && ec.id === entity.entity_class;
                      });

                      return (
                        <EventDot
                          key={event.id}
                          event={event}
                          position={event.position}
                          index={eventIdx}
                          totalInCell={eventsByLayerQuarter[layer.id][qIdx].length}
                          quarterIndex={qIdx}
                          color={entityClass?.color || '#6b7280'}
                          onClick={() => onEventClick && onEventClick(event)}
                          onMouseEnter={(e) => {
                            setHoveredEvent(event);
                            const rect = e.currentTarget.getBoundingClientRect();
                            setHoveredPosition({
                              x: rect.left + rect.width / 2,
                              y: rect.top,
                            });
                          }}
                          onMouseLeave={() => setHoveredEvent(null)}
                          isHighlighted={highlightedEventIds ? highlightedEventIds.has(event.id) : false}
                          isDimmed={highlightedEventIds ? !highlightedEventIds.has(event.id) : false}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* INFRASTRUCTURE Section */}
        <div className="relative">
          <h3 className="text-[11px] font-bold text-text-main uppercase tracking-widest mb-1 flex items-center gap-2 py-2 border-b border-gray-100">
            <svg className="w-3.5 h-3.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
            Infrastructure
          </h3>

          {infrastructureLayers.map((layer) => (
            <div key={layer.id} className="grid grid-cols-[180px_1fr] gap-0 group hover:bg-gray-50/50 transition-colors border-b border-border-subtle cursor-pointer min-h-[72px]">
              {/* Layer Label */}
              <div className="py-4 border-r border-border-subtle pr-4 flex flex-col justify-center relative">
                <span className="text-xs font-medium text-text-main">{layer.name}</span>
                <span className="text-[10px] text-text-muted mt-0.5 opacity-60">
                  {layer.examples.join(', ')}
                </span>
                {showSpend && (
                  <div className="absolute right-2 top-2 text-[9px] text-text-muted font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    '25 est: $8B
                  </div>
                )}
              </div>

              {/* Timeline Cell with Events */}
              <div className="relative py-4 timeline-cell">
                {/* Year divider lines */}
                <div className="absolute top-0 bottom-0 left-[33.33%] border-l border-border-subtle z-0"></div>
                <div className="absolute top-0 bottom-0 left-[66.66%] border-l border-border-subtle z-0"></div>

                {/* Quarter divider lines (dashed) */}
                {[8.33, 16.66, 25, 41.66, 50, 58.33, 75, 83.33, 91.66].map((left, i) => (
                  <div
                    key={i}
                    className="absolute top-0 bottom-0 border-l border-dashed border-gray-200 z-0"
                    style={{ left: `${left}%` }}
                  ></div>
                ))}

                {/* Events */}
                {quarters.map((_, qIdx) => (
                  <div key={qIdx} className="absolute inset-0">
                    {eventsByLayerQuarter[layer.id][qIdx].map((event, eventIdx) => {
                      const entityClass = entityClasses.find(ec => {
                        const entity = entities.find(e => e.id === event.entity_id);
                        return entity && ec.id === entity.entity_class;
                      });

                      return (
                        <EventDot
                          key={event.id}
                          event={event}
                          position={event.position}
                          index={eventIdx}
                          totalInCell={eventsByLayerQuarter[layer.id][qIdx].length}
                          quarterIndex={qIdx}
                          color={entityClass?.color || '#6b7280'}
                          onClick={() => onEventClick && onEventClick(event)}
                          onMouseEnter={(e) => {
                            setHoveredEvent(event);
                            const rect = e.currentTarget.getBoundingClientRect();
                            setHoveredPosition({
                              x: rect.left + rect.width / 2,
                              y: rect.top,
                            });
                          }}
                          onMouseLeave={() => setHoveredEvent(null)}
                          isHighlighted={highlightedEventIds ? highlightedEventIds.has(event.id) : false}
                          isDimmed={highlightedEventIds ? !highlightedEventIds.has(event.id) : false}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {hoveredEvent && (
        <Tooltip
          event={hoveredEvent}
          position={hoveredPosition}
          entities={entities}
          entityClasses={entityClasses}
        />
      )}
    </div>
  );
}
