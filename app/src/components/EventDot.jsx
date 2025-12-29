/**
 * Individual event dot component
 * Sized by impact, colored by entity class, positioned within quarter
 * Clean circles with confidence level encoding via border style
 */
export default function EventDot({
  event,
  position,
  index,
  totalInCell,
  quarterIndex,
  color,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) {
  // Dot size based on impact level
  const sizeMap = {
    low: 8,
    medium: 12,
    high: 18,
  };
  const size = sizeMap[event.impact_level] || 12;

  // Vertical jitter to prevent overlap when multiple events in same cell
  const verticalOffset = totalInCell > 1 ? (index / (totalInCell - 1)) * 70 + 20 : 50;

  // Calculate horizontal position: quarter base + position within quarter
  const quarterWidth = 100 / 12; // 12 quarters total
  const quarterBase = quarterIndex * quarterWidth;
  const positionWithinQuarter = position * quarterWidth;
  const horizontalPercent = quarterBase + positionWithinQuarter;

  // Border style based on confidence level
  const borderStyle = event.confidence === 'confirmed' ? 'solid' :
                      event.confidence === 'likely' ? 'dashed' : 'dotted';

  return (
    <div
      className="absolute rounded-full cursor-pointer transition-all duration-200 hover:z-50"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        left: `${horizontalPercent}%`,
        top: `${verticalOffset}%`,
        transform: 'translate(-50%, -50%) scale(1)',
        boxShadow: '0 0 0 1px #fff, 0 1px 2px rgba(0,0,0,0.1)',
        border: `2px ${borderStyle} ${color}`,
        zIndex: 10,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      title={event.title}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.2)';
        e.currentTarget.style.boxShadow = '0 0 0 2px #fff, 0 4px 12px rgba(0,0,0,0.2)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
        e.currentTarget.style.boxShadow = '0 0 0 1px #fff, 0 1px 2px rgba(0,0,0,0.1)';
      }}
    />
  );
}
