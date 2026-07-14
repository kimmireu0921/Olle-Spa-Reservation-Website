async function request(path, options = {}) {
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;
  if (!response.ok) {
    const error = new Error(data?.error || 'Request failed');
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

function adminHeaders() {
  const token = localStorage.getItem('olle-spa-admin-token');
  return token ? { 'x-admin-key': token } : {};
}

export const getServices = (lang) => request(`/services?lang=${lang}`);
export const getTherapists = (lang) => request(`/therapists?lang=${lang}`);
export const getAvailability = (serviceId, therapistId, date) =>
  request(`/availability?serviceId=${serviceId}&therapistId=${therapistId}&date=${date}`);
export const createBooking = (payload) =>
  request('/bookings', { method: 'POST', body: JSON.stringify(payload) });
export const getReviews = () => request('/reviews');
export const sendMessage = (payload) =>
  request('/messages', { method: 'POST', body: JSON.stringify(payload) });

export const adminLogin = (password) =>
  request('/admin/login', { method: 'POST', body: JSON.stringify({ password }) });
export const getAdminBookings = (params = {}) =>
  request(`/admin/bookings?${new URLSearchParams(params)}`, { headers: adminHeaders() });
export const cancelBooking = (id) =>
  request(`/admin/bookings/${id}/cancel`, { method: 'PATCH', headers: adminHeaders() });
export const getAdminMessages = () => request('/admin/messages', { headers: adminHeaders() });
export const markMessageRead = (id) =>
  request(`/admin/messages/${id}/read`, { method: 'PATCH', headers: adminHeaders() });
export const getBlockedSlots = (date) =>
  request(`/admin/blocked-slots${date ? `?date=${date}` : ''}`, { headers: adminHeaders() });
export const addBlockedSlot = (payload) =>
  request('/admin/blocked-slots', { method: 'POST', body: JSON.stringify(payload), headers: adminHeaders() });
export const deleteBlockedSlot = (id) =>
  request(`/admin/blocked-slots/${id}`, { method: 'DELETE', headers: adminHeaders() });
