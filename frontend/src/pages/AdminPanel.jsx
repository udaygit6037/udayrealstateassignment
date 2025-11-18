// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProjects, addProject, updateProject, deleteProject } from '../services/projectService.js';
import { getSubscribers, deleteSubscriber } from '../services/subscriberService.js';
import { getContacts, deleteContact } from '../services/contactService.js';
import { logoutAdmin } from '../services/authService.js';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '' });
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      if (activeTab === 'projects') {
        const data = await fetchProjects();
        setProjects(data);
      } else if (activeTab === 'subscribers') {
        const data = await getSubscribers();
        setSubscribers(data);
      } else if (activeTab === 'contacts') {
        const data = await getContacts();
        setContacts(data);
      }
    } catch (err) {
      console.error(err);
      alert('Could not fetch data');
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        imageUrl: form.imageUrl.trim(),
      };
      const newProject = await addProject(payload);
      setProjects((p) => [newProject, ...p]);
      setForm({ title: '', description: '', imageUrl: '' });
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || 'Add failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
    });
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    if (!editingProject) return;
    setLoading(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        imageUrl: form.imageUrl.trim(),
      };
      const updated = await updateProject(editingProject._id, payload);
      setProjects((p) => p.map((proj) => (proj._id === updated._id ? updated : proj)));
      setEditingProject(null);
      setForm({ title: '', description: '', imageUrl: '' });
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      setProjects((p) => p.filter((proj) => proj._id !== id));
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || 'Delete failed');
    }
  };

  const handleDeleteSubscriber = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subscriber?')) return;
    try {
      await deleteSubscriber(id);
      setSubscribers((s) => s.filter((sub) => sub._id !== id));
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || 'Delete failed');
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    try {
      await deleteContact(id);
      setContacts((c) => c.filter((contact) => contact._id !== id));
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || 'Delete failed');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    // Trigger custom event so Navbar updates immediately
    window.dispatchEvent(new Event('auth-change'));
    navigate('/');
  };

  const cancelEdit = () => {
    setEditingProject(null);
    setForm({ title: '', description: '', imageUrl: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-1 px-6">
            {['projects', 'subscribers', 'contacts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-medium text-sm transition ${
                  activeTab === tab
                    ? 'border-b-2 border-orange-500 text-orange-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <form
                onSubmit={editingProject ? handleUpdateProject : handleAddProject}
                className="space-y-3 mb-8 p-4 bg-gray-50 rounded-lg"
              >
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
                  required
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={form.imageUrl}
                  required
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : editingProject ? 'Update Project' : 'Add Project'}
                  </button>
                  {editingProject && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              <h3 className="text-lg font-semibold mb-4">Existing Projects ({projects.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((p) => (
                  <div key={p._id} className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="h-48 w-full overflow-hidden rounded mb-3 bg-gray-100">
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">No image</div>
                      )}
                    </div>
                    <h4 className="font-semibold text-lg mb-2">{p.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{p.description}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditProject(p)}
                        className="flex-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(p._id)}
                        className="flex-1 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subscribers Tab */}
          {activeTab === 'subscribers' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Newsletter Subscribers ({subscribers.length})</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subscribed</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subscribers.map((sub) => (
                      <tr key={sub._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sub.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(sub.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDeleteSubscriber(sub._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Form Submissions ({contacts.length})</h2>
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact._id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Name:</span>
                        <p className="text-gray-900">{contact.fullName}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Email:</span>
                        <p className="text-gray-900">{contact.email}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Mobile:</span>
                        <p className="text-gray-900">{contact.mobile}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">City:</span>
                        <p className="text-gray-900">{contact.city}</p>
                      </div>
                      {contact.message && (
                        <div className="md:col-span-2">
                          <span className="text-sm font-medium text-gray-600">Message:</span>
                          <p className="text-gray-900">{contact.message}</p>
                        </div>
                      )}
                      <div>
                        <span className="text-sm font-medium text-gray-600">Submitted:</span>
                        <p className="text-gray-900">{new Date(contact.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteContact(contact._id)}
                      className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
