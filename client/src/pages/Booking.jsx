import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { getServices, getTherapists, getAvailability, createBooking } from '../api/client.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import TimeSlotGrid from '../components/TimeSlotGrid.jsx';
import BookingForm from '../components/BookingForm.jsx';
import BookingConfirmation from '../components/BookingConfirmation.jsx';

const STEPS = ['service', 'therapist', 'date', 'time', 'info'];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function Booking() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();

  const [services, setServices] = useState(null);
  const [therapists, setTherapists] = useState(null);
  const [step, setStep] = useState('service');

  const [serviceId, setServiceId] = useState(searchParams.get('serviceId') || null);
  const [therapistId, setTherapistId] = useState(null);
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState(null);

  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    getServices(i18n.language).then(setServices);
    getTherapists(i18n.language).then(setTherapists);
  }, [i18n.language]);

  useEffect(() => {
    if (step !== 'time' || !serviceId || !therapistId || !date) return;
    setSlotsLoading(true);
    setTime(null);
    getAvailability(serviceId, therapistId, date)
      .then(setSlots)
      .finally(() => setSlotsLoading(false));
  }, [step, serviceId, therapistId, date]);

  const selectedService = useMemo(
    () => services?.find((s) => String(s.id) === String(serviceId)),
    [services, serviceId],
  );
  const selectedTherapist = useMemo(
    () => therapists?.find((th) => String(th.id) === String(therapistId)),
    [therapists, therapistId],
  );

  const goNext = () => setStep(STEPS[STEPS.indexOf(step) + 1]);
  const goBack = () => setStep(STEPS[STEPS.indexOf(step) - 1]);

  const handleBookingSubmit = async (customerInfo) => {
    setSubmitting(true);
    setBookingError(null);
    try {
      const booking = await createBooking({
        serviceId,
        therapistId,
        date,
        startTime: time,
        ...customerInfo,
      });
      setConfirmedBooking(booking);
    } catch (err) {
      if (err.status === 409) {
        setBookingError(t('booking.slotTakenError'));
        setStep('time');
        setTime(null);
        getAvailability(serviceId, therapistId, date).then(setSlots);
      } else {
        setBookingError(err.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const resetBooking = () => {
    setStep('service');
    setServiceId(null);
    setTherapistId(null);
    setDate(todayISO());
    setTime(null);
    setConfirmedBooking(null);
    setBookingError(null);
  };

  if (!services || !therapists) return <LoadingSpinner />;

  if (confirmedBooking) {
    return (
      <BookingConfirmation
        booking={confirmedBooking}
        service={selectedService}
        therapist={selectedTherapist}
        onBookAgain={resetBooking}
      />
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>{t('booking.title')}</h1>
      </div>
      <div className="booking-steps">
        {STEPS.map((s) => (
          <span key={s} className={s === step ? 'active' : ''}>
            {t(`booking.step${s.charAt(0).toUpperCase() + s.slice(1)}`)}
          </span>
        ))}
      </div>

      {step === 'service' && (
        <div>
          <div className="selectable-grid">
            {services.map((s) => (
              <div
                key={s.id}
                className={`selectable-item ${String(serviceId) === String(s.id) ? 'selected' : ''}`}
                onClick={() => setServiceId(s.id)}
              >
                <strong>{s.name}</strong>
                <div>{s.duration_minutes} {t('common.minutes')}</div>
              </div>
            ))}
          </div>
          <div className="step-actions">
            <span />
            <button className="btn" disabled={!serviceId} onClick={goNext}>{t('common.next')}</button>
          </div>
        </div>
      )}

      {step === 'therapist' && (
        <div>
          <div className="selectable-grid">
            {therapists.map((th) => (
              <div
                key={th.id}
                className={`selectable-item ${String(therapistId) === String(th.id) ? 'selected' : ''}`}
                onClick={() => setTherapistId(th.id)}
              >
                <strong>{th.name}</strong>
              </div>
            ))}
          </div>
          <div className="step-actions">
            <button className="btn btn-secondary" onClick={goBack}>{t('common.back')}</button>
            <button className="btn" disabled={!therapistId} onClick={goNext}>{t('common.next')}</button>
          </div>
        </div>
      )}

      {step === 'date' && (
        <div>
          <div className="form-group">
            <input type="date" min={todayISO()} value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="step-actions">
            <button className="btn btn-secondary" onClick={goBack}>{t('common.back')}</button>
            <button className="btn" disabled={!date} onClick={goNext}>{t('common.next')}</button>
          </div>
        </div>
      )}

      {step === 'time' && (
        <div>
          {slotsLoading ? (
            <LoadingSpinner />
          ) : slots.length === 0 ? (
            <p>{t('booking.noSlots')}</p>
          ) : (
            <TimeSlotGrid slots={slots} selected={time} onSelect={setTime} />
          )}
          <div className="step-actions">
            <button className="btn btn-secondary" onClick={goBack}>{t('common.back')}</button>
            <button className="btn" disabled={!time} onClick={goNext}>{t('common.next')}</button>
          </div>
        </div>
      )}

      {step === 'info' && (
        <div className="form-card">
          <BookingForm onSubmit={handleBookingSubmit} submitting={submitting} error={bookingError} />
          <div className="step-actions">
            <button className="btn btn-secondary" onClick={goBack}>{t('common.back')}</button>
            <span />
          </div>
        </div>
      )}
    </div>
  );
}
