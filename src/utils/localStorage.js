const nameToken = "auth.token";

export const setAuthToken = (token) => localStorage.setItem(nameToken, JSON.stringify(token));

export const getAuthToken = () => localStorage.getItem(nameToken);

export const clearAuthToken = () => localStorage.removeItem(nameToken);