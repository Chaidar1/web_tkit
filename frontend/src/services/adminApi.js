import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // TANPA /api

// ============================================================
// AXIOS INSTANCE
// ============================================================

const adminApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================================
// REQUEST INTERCEPTOR
// ============================================================

adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Jika menggunakan FormData,
    // biarkan browser/axios menentukan Content-Type
    // beserta boundary multipart-nya.
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================================================
// RESPONSE INTERCEPTOR
// ============================================================

adminApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Jika server mengembalikan 401,
    // jangan langsung logout di sini.
    //
    // Penanganan 401 dilakukan oleh masing-masing halaman
    // agar tidak terjadi redirect yang tidak diinginkan.
    return Promise.reject(error);
  }
);

// ============================================================
// AUTH API
// ============================================================

export const authAPI = {
  // Login admin
  login: (username, password) => {
    const formData = new URLSearchParams();

    formData.append('username', username);
    formData.append('password', password);

    return adminApi.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },

  // Ambil data user yang sedang login
  me: () => {
    return adminApi.get('/auth/me');
  },

  // Logout
  logout: () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
  },
};

// ============================================================
// UPLOAD API
// ============================================================

export const uploadAPI = {
  uploadImage: (file) => {
    const formData = new FormData();

    formData.append('file', file);

    return adminApi.post('/admin/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// ============================================================
// ADMIN STATS API
// ============================================================

export const adminStatsAPI = {
  getStats: () => {
    return adminApi.get('/admin/stats');
  },
};

// ============================================================
// ABOUT API
// ============================================================

export const adminAboutAPI = {
  // Mengambil data About
  //
  // Jika belum ada data di database,
  // backend dapat mengembalikan null.
  getAbout: () => {
    return adminApi.get('/about/');
  },

  // Membuat data About untuk pertama kali
  //
  // Digunakan ketika:
  // about === null
  createAbout: (data) => {
    return adminApi.post('/about/', data);
  },

  // Memperbarui data About yang sudah ada
  //
  // Digunakan ketika:
  // about.id tersedia
  updateAbout: (id, data) => {
    return adminApi.put(`/about/${id}`, data);
  },
};

// ============================================================
// PROGRAMS API
// ============================================================

export const adminProgramsAPI = {
  // Mengambil semua program
  getPrograms: () => {
    return adminApi.get('/programs/all');
  },

  // Membuat program baru
  createProgram: (data) => {
    return adminApi.post('/programs/', data);
  },

  // Update program
  updateProgram: (id, data) => {
    return adminApi.put(`/programs/${id}`, data);
  },

  // Hapus program
  deleteProgram: (id) => {
    return adminApi.delete(`/programs/${id}`);
  },
};

// ============================================================
// NEWS API
// ============================================================

export const adminNewsAPI = {
  // Mengambil semua berita
  getNews: () => {
    return adminApi.get('/news/all');
  },

  // Mengambil detail berita
  getNewsDetail: (id) => {
    return adminApi.get(`/news/${id}`);
  },

  // Membuat berita baru
  createNews: (data) => {
    return adminApi.post('/news/', data);
  },

  // Update berita
  updateNews: (id, data) => {
    return adminApi.put(`/news/${id}`, data);
  },

  // Hapus berita
  deleteNews: (id) => {
    return adminApi.delete(`/news/${id}`);
  },
};

// ============================================================
// CONTACT API
// ============================================================

export const adminContactAPI = {
  // Mengambil data contact
  getContact: () => {
    return adminApi.get('/contact/');
  },

  // Update contact
  updateContact: (id, data) => {
    return adminApi.put(`/contact/${id}`, data);
  },
};

// ============================================================
// FOOTER API
// ============================================================

export const adminFooterAPI = {
  // Mengambil data footer
  getFooter: () => {
    return adminApi.get('/footer/');
  },

  // Update footer
  updateFooter: (id, data) => {
    return adminApi.put(`/footer/${id}`, data);
  },
};

// ============================================================
// HERO API
// ============================================================

export const adminHeroAPI = {
  // Mengambil semua gambar hero
  getHeroImages: () => {
    return adminApi.get('/hero/all');
  },

  // Membuat gambar hero baru
  createHeroImage: (formData) => {
    return adminApi.post('/hero/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Update gambar hero
  updateHeroImage: (id, formData) => {
    return adminApi.put(`/hero/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Hapus gambar hero
  deleteHeroImage: (id) => {
    return adminApi.delete(`/hero/${id}`);
  },
};

// ============================================================
// WELCOME API
// ============================================================

export const adminWelcomeAPI = {
  // Mengambil semua data welcome
  getWelcome: () => {
    return adminApi.get('/welcome/all');
  },

  // Update welcome
  updateWelcome: (id, data) => {
    return adminApi.put(`/welcome/${id}`, data);
  },

  // Upload gambar welcome
  uploadWelcomeImage: (id, formData) => {
    return adminApi.post(
      `/welcome/upload-image/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  },
};

// ============================================================
// DEFAULT EXPORT
// ============================================================

export default adminApi;