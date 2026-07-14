import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getReviews } from '../api/client.js';
import LoadingSpinner from './LoadingSpinner.jsx';

export default function ReviewsSection() {
  const { t } = useTranslation();
  const [data, setData] = useState(null);

  useEffect(() => {
    getReviews().then(setData);
  }, []);

  if (!data) return <LoadingSpinner />;
  if (!data.available) return <p>{t('reviews.noReviews')}</p>;

  return (
    <div>
      <p>
        &#9733; {data.rating} ({data.userRatingsTotal}) &middot; {t('reviews.poweredBy')}
      </p>
      <div className="grid">
        {(data.reviews || []).map((review, idx) => (
          <div className="review-card" key={idx}>
            <p className="review-rating">{'★'.repeat(review.rating)}</p>
            <p>{review.text}</p>
            <p><strong>{review.author_name}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
}
