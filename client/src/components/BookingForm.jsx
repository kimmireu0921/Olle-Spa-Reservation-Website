import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function BookingForm({ onSubmit, submitting, error }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({ customerName: '', customerPhone: '', customerEmail: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="form-group">
        <label>{t('booking.customerName')}</label>
        <input name="customerName" value={form.customerName} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>{t('booking.customerPhone')}</label>
        <input name="customerPhone" value={form.customerPhone} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>{t('booking.customerEmail')}</label>
        <input type="email" name="customerEmail" value={form.customerEmail} onChange={handleChange} />
      </div>
      <button type="submit" className="btn" disabled={submitting}>
        {t('booking.confirmButton')}
      </button>
    </form>
  );
}
