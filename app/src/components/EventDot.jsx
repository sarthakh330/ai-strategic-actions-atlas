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
  isHighlighted = false,
  isDimmed = false,
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

  // Calculate styles based on highlighting state
  const baseScale = isHighlighted ? 1.2 : 1;
  const opacity = isDimmed ? 0.3 : 1;
  const baseBoxShadow = isHighlighted
    ? '0 0 0 3px rgba(239, 68, 68, 0.3), 0 0 0 1px #fff, 0 2px 8px rgba(0,0,0,0.15)'
    : '0 0 0 1px #fff, 0 1px 2px rgba(0,0,0,0.1)';
  const zIndex = isHighlighted ? 20 : 10;

  return (
    <div
      className="absolute rounded-full cursor-pointer transition-all duration-200 hover:z-50"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        left: `${horizontalPercent}%`,
        top: `${verticalOffset}%`,
        transform: `translate(-50%, -50%) scale(${baseScale})`,
        boxShadow: baseBoxShadow,
        border: `2px ${borderStyle} ${color}`,
        opacity: opacity,
        zIndex: zIndex,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      title={event.title}
      onMouseOver={(e) => {
        const hoverScale = isHighlighted ? 1.3 : 1.2;
        e.currentTarget.style.transform = `translate(-50%, -50%) scale(${hoverScale})`;
        e.currentTarget.style.boxShadow = isHighlighted
          ? '0 0 0 4px rgba(239, 68, 68, 0.4), 0 0 0 1px #fff, 0 4px 12px rgba(0,0,0,0.25)'
          : '0 0 0 2px #fff, 0 4px 12px rgba(0,0,0,0.2)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = `translate(-50%, -50%) scale(${baseScale})`;
        e.currentTarget.style.boxShadow = baseBoxShadow;
      }}
    />
  );
}
