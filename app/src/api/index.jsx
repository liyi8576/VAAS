const API_ROOT = 'http://localhost:8080/vaas/api';

export const getApiUrl = endpoint => `${API_ROOT}/${endpoint}`;