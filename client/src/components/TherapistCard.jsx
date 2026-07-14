export default function TherapistCard({ therapist }) {
  const initial = therapist.name.charAt(0).toUpperCase();
  return (
    <div className="card">
      {therapist.photo_url ? (
        <img
          src={therapist.photo_url}
          alt={therapist.name}
          style={{ width: 88, height: 88, borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }}
        />
      ) : (
        <div className="therapist-photo-placeholder">{initial}</div>
      )}
      <h3>{therapist.name}</h3>
      <p><strong>{therapist.specialties}</strong></p>
      <p>{therapist.bio}</p>
    </div>
  );
}
