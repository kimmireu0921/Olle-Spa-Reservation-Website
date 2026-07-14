import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand">
          Olle Spa
        </NavLink>
        <nav className="navbar-links">
          <NavLink to="/services">{t('nav.services')}</NavLink>
          <NavLink to="/therapists">{t('nav.therapists')}</NavLink>
          <NavLink to="/reviews">{t('nav.reviews')}</NavLink>
          <NavLink to="/contact">{t('nav.contact')}</NavLink>
          <NavLink to="/booking" className="btn">
            {t('nav.booking')}
          </NavLink>
          <NavLink to="/admin" style={{ fontSize: '0.85rem' }}>{t('nav.admin')}</NavLink>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
