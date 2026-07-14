import { useTranslation } from 'react-i18next';
import ReviewsSection from '../components/ReviewsSection.jsx';

export default function Reviews() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="page-header">
        <h1>{t('reviews.title')}</h1>
      </div>
      <ReviewsSection />
    </div>
  );
}
