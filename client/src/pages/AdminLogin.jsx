import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { adminLogin } from '../api/client.js';

const TOKEN_KEY = 'olle-spa-admin-token';

export default function AdminLogin({ onLogin }) {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const { token } = await adminLogin(password);
      localStorage.setItem(TOKEN_KEY, token);
      onLogin();
    } catch {
      setError(t('admin.loginError'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>{t('admin.loginTitle')}</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="form-group">
        <label>{t('admin.passwordLabel')}</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" className="btn" disabled={submitting}>{t('admin.loginButton')}</button>
    </form>
  );
}
