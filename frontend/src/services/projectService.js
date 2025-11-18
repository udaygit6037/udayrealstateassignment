// src/services/projectService.js
import api from './api';

export async function fetchProjects() {
  const { data } = await api.get('/projects');
  return data.projects || [];
}

export async function getProject(id) {
  const { data } = await api.get(`/projects/${id}`);
  return data.project;
}

export async function addProject({ title, description, imageUrl }) {
  const { data } = await api.post('/projects', { title, description, imageUrl });
  return data.project;
}

export async function updateProject(id, { title, description, imageUrl }) {
  const { data } = await api.put(`/projects/${id}`, { title, description, imageUrl });
  return data.project;
}

export async function deleteProject(id) {
  const { data } = await api.delete(`/projects/${id}`);
  return data;
}
