import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sendMessage } from '../api/client.js';

export default function ContactForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', phone: '', body: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      await sendMessage(form);
      setForm({ name: '', email: '', phone: '', body: '' });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      {status === 'success' && <div className="alert alert-success">{t('contact.formSuccess')}</div>}
      {status === 'error' && <div className="alert alert-error">{t('contact.formError')}</div>}
      <div className="form-group">
        <label>{t('contact.formName')}</label>
        <input name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>{t('contact.formEmail')}</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>{t('contact.formPhone')}</label>
        <input name="phone" value={form.phone} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>{t('contact.formMessage')}</label>
        <textarea name="body" rows="4" value={form.body} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn">{t('contact.formSubmit')}</button>
    </form>
  );
}
