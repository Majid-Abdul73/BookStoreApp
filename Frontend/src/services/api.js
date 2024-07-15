import axios from 'axios';

const API = axios.create({
  baseURL: 'https://your-api-base-url.com',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export const fetchBooks = () => API.get('/api/books');
export const addBook = (book) => API.post('/api/books', book);
export const updateBook = (id, book) => API.put(`/api/books/${id}`, book);
export const deleteBook = (id) => API.delete(`/api/books/${id}`);
