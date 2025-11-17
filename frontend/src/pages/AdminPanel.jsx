// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data.projects || []);
    } catch (err) {
      console.error(err);
      alert('Could not fetch projects');
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/projects', form); // protected
      const newProject = res.data.project;
      setProjects((p) => [newProject, ...p]);
      setForm({ title: '', description: '', imageUrl: '' });
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || 'Add failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('rt_token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <div className="space-x-2">
            <button onClick={handleLogout} className="px-3 py-1 border rounded">Logout</button>
          </div>
        </div>

        <form onSubmit={handleAdd} className="space-y-3 mb-6">
          <input
            type="text"
            placeholder="Project title"
            value={form.title}
            required
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Short description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Image URL (or path in /assets)"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? 'Adding...' : 'Add Project'}
          </button>
        </form>

        <div>
          <h3 className="font-semibold mb-2">Existing Projects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((p) => (
              <div key={p._id} className="border rounded p-3 bg-white">
                <div className="h-36 w-full overflow-hidden rounded mb-2 bg-gray-100">
                  {p.imageUrl ? (
                    // If the imageUrl is a relative path in src/assets, it needs to be handled at build time.
                    <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">No image</div>
                  )}
                </div>
                <h4 className="font-semibold">{p.title}</h4>
                <p className="text-sm text-gray-500">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
