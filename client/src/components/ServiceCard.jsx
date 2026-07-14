import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function ServiceCard({ service }) {
  const { t } = useTranslation();
  return (
    <div className="card">
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <p>
        {service.duration_minutes} {t('common.minutes')} &middot;{' '}
        <span className="price-tag">{formatPrice(service.price_cents)}</span>
      </p>
      <Link to={`/booking?serviceId=${service.id}`} className="btn">
        {t('services.bookThis')}
      </Link>
    </div>
  );
}
