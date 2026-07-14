import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAdminBookings, cancelBooking } from '../api/client.js';

export default function BookingsTable() {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState(null);
  const [dateFilter, setDateFilter] = useState('');

  const load = () => {
    getAdminBookings(dateFilter ? { date: dateFilter } : {}).then(setBookings);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFilter]);

  const handleCancel = async (id) => {
    await cancelBooking(id);
    load();
  };

  if (!bookings) return <p>{t('common.loading')}</p>;

  return (
    <div>
      <div className="form-group" style={{ maxWidth: 220, marginBottom: '1rem' }}>
        <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
      </div>
      <table>
        <thead>
          <tr>
            <th>{t('admin.date')}</th>
            <th>{t('admin.time')}</th>
            <th>{t('admin.service')}</th>
            <th>{t('admin.therapist')}</th>
            <th>{t('admin.customer')}</th>
            <th>{t('admin.status')}</th>
            <th>{t('admin.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.date}</td>
              <td>{b.start_time}</td>
              <td>{b.service_name}</td>
              <td>{b.therapist_name}</td>
              <td>{b.customer_name} &middot; {b.customer_phone}</td>
              <td>
                <span className={`status-badge status-${b.status}`}>{b.status}</span>
              </td>
              <td>
                {b.status === 'booked' && (
                  <button className="btn btn-danger" onClick={() => handleCancel(b.id)}>
                    {t('admin.cancelBooking')}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
