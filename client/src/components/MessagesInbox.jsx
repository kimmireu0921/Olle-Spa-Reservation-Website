import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAdminMessages, markMessageRead } from '../api/client.js';

export default function MessagesInbox() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState(null);

  const load = () => getAdminMessages().then(setMessages);

  useEffect(() => {
    load();
  }, []);

  const handleMarkRead = async (id) => {
    await markMessageRead(id);
    load();
  };

  if (!messages) return <p>{t('common.loading')}</p>;
  if (messages.length === 0) return <p>{t('admin.noMessages')}</p>;

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id} className={`message-item ${m.is_read ? '' : 'unread'}`}>
          <div className="message-meta">
            {m.name} {m.email && `· ${m.email}`} {m.phone && `· ${m.phone}`} &middot; {m.created_at}
            {' '}
            <span className={`status-badge ${m.is_read ? 'status-booked' : 'status-cancelled'}`}>
              {m.is_read ? t('admin.read') : t('admin.unread')}
            </span>
          </div>
          <p>{m.body}</p>
          {!m.is_read && (
            <button className="btn btn-secondary" onClick={() => handleMarkRead(m.id)}>{t('admin.markRead')}</button>
          )}
        </div>
      ))}
    </div>
  );
}
