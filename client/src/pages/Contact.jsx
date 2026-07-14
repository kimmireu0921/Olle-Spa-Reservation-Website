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
          <p>Paseo Saturnino, Cebu City, 6000 Cebu, Philippines</p>
        </div>
        <div className="card">
          <h3>{t('contact.phone')}</h3>
          <p><a href="tel:+639562206222">+63 956 220 6222</a></p>
        </div>
        <div className="card">
          <h3>{t('contact.kakao')}</h3>
          <p><a href="http://pf.kakao.com/_HiGFxj" target="_blank" rel="noopener noreferrer">pf.kakao.com/_HiGFxj</a></p>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
