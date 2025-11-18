// src/services/contactService.js
import api from './api';

export async function submitContact({ fullName, email, mobile, city, message }) {
  const { data } = await api.post('/contact', { fullName, email, mobile, city, message });
  return data;
}

export async function getContacts() {
  const { data } = await api.get('/contacts');
  return data.contacts || [];
}

export async function deleteContact(id) {
  const { data } = await api.delete(`/contacts/${id}`);
  return data;
}

