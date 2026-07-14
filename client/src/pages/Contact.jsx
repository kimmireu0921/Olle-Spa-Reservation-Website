import { useTranslation } from 'react-i18next';
import ContactForm from '../components/ContactForm.jsx';

export default function Contact() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="page-header">
        <h1>{t('contact.title')}</h1>
        <p>{t('contact.subtitle')}</p>
      </div>
      <div className="grid" style={{ marginBottom: '2.5rem' }}>
        <div className="card">
          <h3>{t('contact.address')}</h3>
          <p>123 Olle-ro, Jeju-si, Jeju-do, South Korea (placeholder — update with your real address)</p>
        </div>
        <div className="card">
          <h3>{t('contact.phone')}</h3>
          <p>+82 64-000-0000 (placeholder)</p>
        </div>
        <div className="card">
          <h3>{t('contact.email')}</h3>
          <p>hello@ollespa.example (placeholder)</p>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
