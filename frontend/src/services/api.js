const API_URL = 'http://localhost:5000/api';

export async function apiFetch(endpoint, options={}){
    // Get token from localStorage
    const token = localStorage.getItem('token')

    // To add custom errors as well
    const headers = {
        'Content-type': 'application/json',
        ...options.headers
    }

    // if token present then attach as Bearer token
    if(token){
        headers['Authorization'] = `Bearer ${token}` // Matching the protect middleware
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
    });

    return response.json();
}