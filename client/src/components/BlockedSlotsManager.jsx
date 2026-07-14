import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getBlockedSlots, addBlockedSlot, deleteBlockedSlot, getTherapists } from '../api/client.js';

export default function BlockedSlotsManager() {
  const { t, i18n } = useTranslation();
  const [blocks, setBlocks] = useState(null);
  const [therapists, setTherapists] = useState([]);
  const [form, setForm] = useState({ therapistId: '', date: '', startTime: '', endTime: '', reason: '' });

  const load = () => getBlockedSlots().then(setBlocks);

  useEffect(() => {
    load();
    getTherapists(i18n.language).then(setTherapists);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBlockedSlot({ ...form, therapistId: form.therapistId || null });
    setForm({ therapistId: '', date: '', startTime: '', endTime: '', reason: '' });
    load();
  };

  const handleDelete = async (id) => {
    await deleteBlockedSlot(id);
    load();
  };

  return (
    <div>
      <form className="form-card" onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <h3>{t('admin.addBlock')}</h3>
        <div className="form-group">
          <label>{t('admin.blockTherapist')}</label>
          <select name="therapistId" value={form.therapistId} onChange={handleChange}>
            <option value="">{t('admin.allTherapists')}</option>
            {therapists.map((th) => (
              <option key={th.id} value={th.id}>{th.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>{t('admin.blockDate')}</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>{t('admin.blockStart')}</label>
          <input type="time" name="startTime" value={form.startTime} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>{t('admin.blockEnd')}</label>
          <input type="time" name="endTime" value={form.endTime} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>{t('admin.blockReason')}</label>
          <input name="reason" value={form.reason} onChange={handleChange} />
        </div>
        <button type="submit" className="btn">{t('common.save')}</button>
      </form>

      {!blocks ? (
        <p>{t('common.loading')}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>{t('admin.date')}</th>
              <th>{t('admin.time')}</th>
              <th>{t('admin.therapist')}</th>
              <th>{t('admin.blockReason')}</th>
              <th>{t('admin.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((b) => (
              <tr key={b.id}>
                <td>{b.date}</td>
                <td>{b.start_time}–{b.end_time}</td>
                <td>{therapists.find((th) => th.id === b.therapist_id)?.name || t('admin.allTherapists')}</td>
                <td>{b.reason}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(b.id)}>{t('common.delete')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
