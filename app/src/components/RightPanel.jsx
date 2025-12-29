/**
 * Right panel component - shows key metrics and visual encoding legend
 * Appears by default when no event is selected
 */
export default function RightPanel({ events, patterns, entityClasses }) {
  return (
    <div className="w-80 flex-shrink-0 border-l border-border-subtle bg-gray-50/30 p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xs font-display font-semibold text-text-main uppercase tracking-wider mb-1">
          Atlas Overview
        </h3>
        <p className="text-[10px] text-text-muted leading-relaxed">
          Click any event dot to view full details
        </p>
      </div>

      {/* Key Metrics */}
      <div className="mb-8">
        <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">
          Dataset Summary
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">Total Events</span>
            <span className="text-sm font-display font-semibold text-text-main">{events?.length || 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">Strategic Patterns</span>
            <span className="text-sm font-display font-semibold text-text-main">{patterns?.length || 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">Time Range</span>
            <span className="text-xs font-mono text-text-main">2023-2025</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">Stack Layers</span>
            <span className="text-sm font-display font-semibold text-text-main">6</span>
          </div>
        </div>
      </div>

      {/* Visual Encoding Legend */}
      <div className="mb-8">
        <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">
          Visual Encoding
        </h4>

        {/* Entity Classes */}
        <div className="mb-4">
          <p className="text-[10px] text-text-muted mb-2 font-medium">Color = Entity Class</p>
          <div className="space-y-2">
            {entityClasses?.map(ec => (
              <div key={ec.id} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: ec.color }}
                ></div>
                <span className="text-xs text-text-main">{ec.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Size */}
        <div className="mb-4">
          <p className="text-[10px] text-text-muted mb-2 font-medium">Size = Impact Level</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-[18px] h-[18px] rounded-full bg-gray-400 flex-shrink-0"></div>
              <span className="text-xs text-text-main">High Impact</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[12px] h-[12px] rounded-full bg-gray-400 flex-shrink-0 ml-[3px]"></div>
              <span className="text-xs text-text-main">Medium Impact</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[8px] h-[8px] rounded-full bg-gray-400 flex-shrink-0 ml-[5px]"></div>
              <span className="text-xs text-text-main">Low Impact</span>
            </div>
          </div>
        </div>

        {/* Border Style */}
        <div className="mb-4">
          <p className="text-[10px] text-text-muted mb-2 font-medium">Border = Confidence</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gray-400 border-2 border-gray-600 flex-shrink-0"></div>
              <span className="text-xs text-text-main">Confirmed</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gray-400 border-2 border-dashed border-gray-600 flex-shrink-0"></div>
              <span className="text-xs text-text-main">Likely</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gray-400 border-2 border-dotted border-gray-600 flex-shrink-0"></div>
              <span className="text-xs text-text-main">Rumored</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">
          Recent Events
        </h4>
        <div className="space-y-2">
          {events?.slice(-3).reverse().map(event => (
            <div key={event.id} className="text-xs text-text-muted border-l-2 border-gray-300 pl-2 py-1">
              <div className="font-medium text-text-main line-clamp-1">{event.title}</div>
              <div className="text-[10px] mt-0.5">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
