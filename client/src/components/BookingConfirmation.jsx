import { useTranslation } from 'react-i18next';

export default function BookingConfirmation({ booking, service, therapist, onBookAgain }) {
  const { t } = useTranslation();
  return (
    <div className="form-card" style={{ textAlign: 'center' }}>
      <h2>{t('booking.confirmationTitle')}</h2>
      <p>{t('booking.confirmationBody')}</p>
      <p><strong>{service?.name}</strong></p>
      <p><strong>{therapist?.name}</strong></p>
      <p>{booking.date} &middot; {booking.start_time}</p>
      <button className="btn" onClick={onBookAgain}>{t('booking.bookAgain')}</button>
    </div>
  );
}
