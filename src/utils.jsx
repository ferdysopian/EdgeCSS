import axios from 'axios'
import { parse as parseDomain } from 'tldts'

const getEnvVariable = (key, fallback = '') => {
    const value = import.meta.env[key];
    if (!value && fallback) {
        console.warn(`Warning: Environment variable ${key} is not set. Falling back to: ${fallback}`);
        return fallback;
    }
    return value;
};

const apiUrl = getEnvVariable('VITE_BASE_API_URL', 'http://localhost:3000');

const axiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const generateCriticalCSS = async (url, mobileViewport, desktopViewport, removeFontFace) => {
    const parsedDomain = parseDomain(url)
    // if hostname is localhost, domain will be localhost
    let domain = parsedDomain?.domain || ''
    // if node env is development, domain will be localhost
    if (import.meta.env.MODE !== 'production') {
        if (parsedDomain?.hostname === 'localhost') {
            domain = 'localhost'
        }
    }

    if (!domain) {
        throw new Error('Invalid domain parsed from the URL')
    }

    const data = {
        domain,
        url,
        viewports: {
            mobile: {
                width: mobileViewport.width,
                height: mobileViewport.height,
            },
            desktop: {
                width: desktopViewport.width,
                height: desktopViewport.height,
            },
        },
        removeFontFace,
    }

    try {
        const response = await axiosInstance.post('/api/generate', { ...data })
        return response.data
    } catch (error) {
        let errorMessage = ''
        // Check if error is from Axios
        if (axios.isAxiosError(error)) {
            // if production, show generic error message
            if (import.meta.env.MODE !== 'production') {
                console.error('Unexpected error generating critical CSS:', error.response?.data || error.message)
            }
            errorMessage = error.response?.data.error || error.message
        } else {
            if (import.meta.env.MODE !== 'production') {
                console.error('Unexpected error generating critical CSS:', error)
            }
            errorMessage = 'Failed to generate critical CSS'
        }
        throw new Error(errorMessage)
    }
}
