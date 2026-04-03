import axios from 'axios';

const API_URL = 'http://192.168.10.104:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

let token = null;

export const login = async () => {
  const res = await api.post('/auth/login', {
    username: 'admin',
    password: 'mmi2026',
  });
  token = res.data.token;
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const getSaes = () => api.get('/saes');
export const getSaeById = (id) => api.get(`/saes/${id}`);
export const getSaesByAnnee = (annee) => api.get(`/saes/annee/${annee}`);
export const getSaesByDomaine = (domaine) => api.get(`/saes/domaine/${domaine}`);
export const getClassement = () => api.get('/saes/classement');
export const addSae = (sae) => api.post('/saes', sae);