import { useState } from 'react';
import AdminLogin from './AdminLogin.jsx';
import AdminDashboard from './AdminDashboard.jsx';

const TOKEN_KEY = 'olle-spa-admin-token';

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem(TOKEN_KEY));

  return loggedIn ? (
    <AdminDashboard onLogout={() => setLoggedIn(false)} />
  ) : (
    <AdminLogin onLogin={() => setLoggedIn(true)} />
  );
}
