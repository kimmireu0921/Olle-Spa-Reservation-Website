import { useTranslation } from 'react-i18next';

export default function LoadingSpinner() {
  const { t } = useTranslation();
  return <p>{t('common.loading')}</p>;
}
