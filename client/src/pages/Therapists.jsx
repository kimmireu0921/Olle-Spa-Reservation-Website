import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getTherapists } from '../api/client.js';
import TherapistCard from '../components/TherapistCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

export default function Therapists() {
  const { t, i18n } = useTranslation();
  const [therapists, setTherapists] = useState(null);

  useEffect(() => {
    getTherapists(i18n.language).then(setTherapists);
  }, [i18n.language]);

  return (
    <div>
      <div className="page-header">
        <h1>{t('therapists.title')}</h1>
        <p>{t('therapists.subtitle')}</p>
      </div>
      {!therapists ? (
        <LoadingSpinner />
      ) : (
        <div className="grid">
          {therapists.map((therapist) => (
            <TherapistCard key={therapist.id} therapist={therapist} />
          ))}
        </div>
      )}
    </div>
  );
}
