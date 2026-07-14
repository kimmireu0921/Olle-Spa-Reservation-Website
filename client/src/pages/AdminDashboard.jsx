import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BookingsTable from '../components/BookingsTable.jsx';
import BlockedSlotsManager from '../components/BlockedSlotsManager.jsx';
import MessagesInbox from '../components/MessagesInbox.jsx';

const TOKEN_KEY = 'olle-spa-admin-token';

export default function AdminDashboard({ onLogout }) {
  const { t } = useTranslation();
  const [tab, setTab] = useState('bookings');

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    onLogout();
  };

  return (
    <div>
      <div className="admin-header">
        <h1>{t('admin.dashboardTitle')}</h1>
        <button className="btn btn-secondary" onClick={handleLogout}>{t('admin.logout')}</button>
      </div>
      <div className="admin-tabs">
        <button className={`admin-tab ${tab === 'bookings' ? 'active' : ''}`} onClick={() => setTab('bookings')}>
          {t('admin.tabBookings')}
        </button>
        <button className={`admin-tab ${tab === 'blocked' ? 'active' : ''}`} onClick={() => setTab('blocked')}>
          {t('admin.tabBlockedSlots')}
        </button>
        <button className={`admin-tab ${tab === 'messages' ? 'active' : ''}`} onClick={() => setTab('messages')}>
          {t('admin.tabMessages')}
        </button>
      </div>
      {tab === 'bookings' && <BookingsTable />}
      {tab === 'blocked' && <BlockedSlotsManager />}
      {tab === 'messages' && <MessagesInbox />}
    </div>
  );
}
