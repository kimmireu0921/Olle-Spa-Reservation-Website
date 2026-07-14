export default function TimeSlotGrid({ slots, selected, onSelect }) {
  return (
    <div className="time-slot-grid">
      {slots.map((slot) => (
        <div
          key={slot}
          className={`time-slot ${selected === slot ? 'selected' : ''}`}
          onClick={() => onSelect(slot)}
        >
          {slot}
        </div>
      ))}
    </div>
  );
}
