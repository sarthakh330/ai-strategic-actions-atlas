/**
 * Event detail drawer component
 * Slides in from right when event is clicked, shows full event details
 */
export default function EventDrawer({ event, onClose, entities, entityClasses, actionTypes, events }) {
  if (!event) return null;

  // Get entity and entity class
  const entity = entities?.find(e => e.id === event.entity_id);
  const entityClass = entityClasses?.find(ec => ec.id === entity?.entity_class);

  // Get action type
  const actionType = actionTypes?.find(at => at.id === event.action_type);

  // Format date
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Get confidence label
  const confidenceLabel = event.confidence === 'confirmed' ? 'Confirmed' :
                          event.confidence === 'likely' ? 'Likely' : 'Rumored';

  // Find related events (same entity or same action type)
  const relatedEvents = events?.filter(e =>
    e.id !== event.id &&
    (e.entity_id === event.entity_id || e.action_type === event.action_type)
  ).slice(0, 3);

  return (
    <div className="w-80 flex-shrink-0 border-l border-black bg-white overflow-y-auto animate-slideIn">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 border-b border-border-subtle p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {entityClass && (
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: entityClass.color }}
              ></div>
            )}
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
              {entity?.display_name || entity?.name}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-main transition-colors"
            aria-label="Close drawer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <h2 className="text-base font-display font-semibold text-text-main leading-snug">
          {event.title}
        </h2>
      </div>

      {/* Event Metadata */}
      <div className="p-6 pt-4 border-b border-border-subtle">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-muted">Date</span>
            <span className="font-medium text-text-main">{formattedDate}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-muted">Action Type</span>
            <span className="font-medium text-text-main">{actionType?.name || event.action_type}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-muted">Impact Level</span>
            <span className={`font-medium capitalize ${
              event.impact_level === 'high' ? 'text-red-600' :
              event.impact_level === 'medium' ? 'text-orange-600' :
              'text-gray-600'
            }`}>
              {event.impact_level}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-muted">Confidence</span>
            <span className="font-medium text-text-main">{confidenceLabel}</span>
          </div>
          {event.stack_layers && event.stack_layers.length > 0 && (
            <div className="flex items-start justify-between text-xs">
              <span className="text-text-muted">Stack Layers</span>
              <div className="text-right">
                {event.stack_layers.map((layer, i) => (
                  <div key={i} className="font-medium text-text-main capitalize">
                    {layer.replace(/-/g, ' ')}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {event.description && (
        <div className="p-6 border-b border-border-subtle">
          <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">
            Description
          </h3>
          <p className="text-xs text-text-main leading-relaxed">
            {event.description}
          </p>
        </div>
      )}

      {/* Strategic Significance */}
      {event.strategic_significance && (
        <div className="p-6 border-b border-border-subtle bg-gray-50/50">
          <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">
            Strategic Significance
          </h3>
          <p className="text-xs text-text-main leading-relaxed">
            {event.strategic_significance}
          </p>
        </div>
      )}

      {/* Evidence Sources */}
      {event.sources && event.sources.length > 0 && (
        <div className="p-6 border-b border-border-subtle">
          <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">
            Evidence Sources
          </h3>
          <div className="space-y-2">
            {event.sources.map((source, i) => (
              <a
                key={i}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 p-2 rounded hover:bg-gray-50 transition-colors group"
              >
                <svg className="w-4 h-4 text-text-muted group-hover:text-startup mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-text-main group-hover:text-startup line-clamp-2">
                    {source.title || source.url}
                  </div>
                  <div className="text-[10px] text-text-muted mt-0.5">
                    {source.type || 'External Link'}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Related Events */}
      {relatedEvents && relatedEvents.length > 0 && (
        <div className="p-6">
          <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">
            Related Events
          </h3>
          <div className="space-y-3">
            {relatedEvents.map(relatedEvent => {
              const relEntity = entities?.find(e => e.id === relatedEvent.entity_id);
              const relEntityClass = entityClasses?.find(ec => ec.id === relEntity?.entity_class);

              return (
                <div
                  key={relatedEvent.id}
                  className="border-l-2 pl-3 py-1 cursor-pointer hover:bg-gray-50 transition-colors"
                  style={{ borderLeftColor: relEntityClass?.color || '#ccc' }}
                >
                  <div className="text-xs font-medium text-text-main line-clamp-2 mb-1">
                    {relatedEvent.title}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-text-muted">
                    <span>{relEntity?.display_name || relEntity?.name}</span>
                    <span>•</span>
                    <span>{new Date(relatedEvent.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tags */}
      {event.tags && event.tags.length > 0 && (
        <div className="p-6 pt-0">
          <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">
            Tags
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {event.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-gray-100 text-[10px] text-text-main rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
