/**
 * Tooltip component that appears on hover
 * Shows basic event info: title, entity, date, impact
 */
export default function Tooltip({ event, position, entities, entityClasses }) {
  const entity = entities.find(e => e.id === event.entity_id);

  // Format date
  const formatDate = (dateStr, precision) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const quarter = Math.ceil(month / 3);

    if (precision === 'exact') {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } else if (precision === 'month') {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    } else if (precision === 'quarter') {
      return `Q${quarter} ${year}`;
    } else {
      return year.toString();
    }
  };

  return (
    <div
      className="fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded shadow-lg pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y - 10}px`,
        transform: 'translate(-50%, -100%)',
        maxWidth: '200px',
      }}
    >
      {/* Arrow pointing down */}
      <div
        className="absolute w-2 h-2 bg-gray-900 transform rotate-45"
        style={{
          bottom: '-4px',
          left: '50%',
          marginLeft: '-4px',
        }}
      />

      {/* Content */}
      <div className="relative">
        <div className="font-semibold mb-1">{event.title}</div>
        <div className="text-gray-300 text-xs">
          <div>{entity?.display_name || event.entity_id}</div>
          <div className="mt-1">{formatDate(event.date, event.date_precision)}</div>
          <div className="mt-1 capitalize">{event.impact_level} Impact</div>
        </div>
      </div>
    </div>
  );
}
