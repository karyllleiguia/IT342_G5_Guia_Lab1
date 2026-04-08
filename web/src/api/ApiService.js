import axios from 'axios';

class ApiService {
  static instance = null;

  constructor() {
    if (ApiService.instance) {
      return ApiService.instance;
    }

    this.client = axios.create({
      baseURL: 'http://localhost:8080/api',
      timeout: 10000,
    });

    this.client.interceptors.request.use((config) => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (currentUser?.token) {
        config.headers.Authorization = `Bearer ${currentUser.token}`;
      }
      return config;
    });

    ApiService.instance = this;
  }

  static getInstance() {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  register(user) {
    return this.client.post('/auth/register', user);
  }

  login(user) {
    return this.client.post('/auth/login', user);
  }

  getProfile(username) {
    return this.client.get(`/user/me?username=${username}`);
  }
}

export default ApiService.getInstance();