import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="hero">
      <h1>{t('home.heroTitle')}</h1>
      <p>{t('home.heroSubtitle')}</p>
      <Link to="/booking" className="btn">
        {t('home.cta')}
      </Link>
      <div className="quick-links">
        <Link to="/services" className="btn btn-secondary">{t('nav.services')}</Link>
        <Link to="/therapists" className="btn btn-secondary">{t('nav.therapists')}</Link>
        <Link to="/reviews" className="btn btn-secondary">{t('nav.reviews')}</Link>
        <Link to="/contact" className="btn btn-secondary">{t('nav.contact')}</Link>
      </div>
    </div>
  );
}
