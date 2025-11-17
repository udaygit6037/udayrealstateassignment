// src/services/projectService.js
import api from './api';

export function fetchProjects() {
  return api.get('/projects').then(r => r.data.projects || []);
}

export function addProject({ title, description, imageUrl }) {
  return api.post('/projects', { title, description, imageUrl }).then(r => r.data.project);
}
