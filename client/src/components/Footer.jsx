import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <p>Olle Spa &middot; {new Date().getFullYear()} &middot; {t('footer.rights')}</p>
    </footer>
  );
}
