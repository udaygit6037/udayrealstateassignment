// src/services/subscriberService.js
import api from './api';

export async function subscribe(email) {
  const { data } = await api.post('/subscribe', { email });
  return data;
}

export async function getSubscribers() {
  const { data } = await api.get('/subscribers');
  return data.subscribers || [];
}

export async function deleteSubscriber(id) {
  const { data } = await api.delete(`/subscribers/${id}`);
  return data;
}

