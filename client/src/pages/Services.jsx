import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getServices } from '../api/client.js';
import ServiceCard from '../components/ServiceCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

export default function Services() {
  const { t, i18n } = useTranslation();
  const [services, setServices] = useState(null);

  useEffect(() => {
    getServices(i18n.language).then(setServices);
  }, [i18n.language]);

  return (
    <div>
      <div className="page-header">
        <h1>{t('services.title')}</h1>
        <p>{t('services.subtitle')}</p>
      </div>
      {!services ? (
        <LoadingSpinner />
      ) : (
        <div className="grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
