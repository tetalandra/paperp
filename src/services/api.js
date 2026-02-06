// API Service for Paper Frontend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

class ApiService {
    // Helper method for making requests
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {



            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // ========== TEMPLATE APIs ==========

    /**
     * Generate a new template
     * @param {Object} templateData - Template data
     * @returns {Promise}
     */
    async generateTemplate(templateData) {
        return this.request('/api/templates/generate', {
            method: 'POST',
            body: JSON.stringify(templateData),
        });
    }

    /**
     * Get all templates
     * @param {Object} params - Query parameters (page, limit)
     * @returns {Promise}
     */
    async getTemplates(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/api/templates${queryString ? `?${queryString}` : ''}`);
    }

    /**
     * Get single template by ID
     * @param {string} id - Template ID
     * @returns {Promise}
     */
    async getTemplate(id) {
        return this.request(`/api/templates/${id}`);
    }

    /**
     * Update template
     * @param {string} id - Template ID
     * @param {Object} templateData - Updated template data
     * @returns {Promise}
     */
    async updateTemplate(id, templateData) {
        return this.request(`/api/templates/${id}`, {
            method: 'PUT',
            body: JSON.stringify(templateData),
        });
    }

    /**
     * Delete template
     * @param {string} id - Template ID
     * @returns {Promise}
     */
    async deleteTemplate(id) {
        return this.request(`/api/templates/${id}`, {
            method: 'DELETE',
        });
    }

    /**
     * Search templates
     * @param {Object} searchParams - Search parameters (q, type, variant, page, limit)
     * @returns {Promise}
     */
    async searchTemplates(searchParams) {
        const queryString = new URLSearchParams(searchParams).toString();
        return this.request(`/api/templates/search?${queryString}`);
    }

    /**
     * Download template data
     * @param {string} templateId - Template ID
     * @returns {Promise}
     */
    async downloadTemplate(templateId) {
        return this.request('/api/templates/download', {
            method: 'POST',
            body: JSON.stringify({ templateId }),
        });
    }

    // ========== AUTH APIs ==========

    /**
     * User signup
     * @param {Object} userData - User data (name, email, password)
     * @returns {Promise}
     */
    async signup(userData) {
        return this.request('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    /**
     * User login
     * @param {Object} credentials - Login credentials (email, password)
     * @returns {Promise}
     */
    async login(credentials) {
        return this.request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    }

    /**
     * User logout
     * @returns {Promise}
     */
    async logout() {
        return this.request('/api/auth/logout', {
            method: 'POST',
        });
    }

    /**
     * Get current user
     * @returns {Promise}
     */
    async getCurrentUser() {
        return this.request('/api/auth/me');
    }

    // ========== UPLOAD API ==========

    /**
     * Upload image
     * @param {File} file - Image file
     * @returns {Promise}
     */
    async uploadImage(file) {
        const formData = new FormData();
        formData.append('file', file);

        return this.request('/api/upload', {
            method: 'POST',
            headers: {}, // Let browser set Content-Type for FormData
            body: formData,
        });
    }
}

export default new ApiService();
