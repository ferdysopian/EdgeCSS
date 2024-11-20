import axios from 'axios'
import { parse as parseDomain } from 'tldts'

export const generateCriticalCSS = async (url, mobileViewport, desktopViewport, removeFontFace) => {
    const parsedDomain = parseDomain(url)
    // if hostname is localhost, domain will be localhost
    let domain = parsedDomain?.domain || ''
    // if node env is development, domain will be localhost
    if (process.env.NODE_ENV !== 'production') {
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
        const response = await axios.post('http://localhost:3000/api/generate', { ...data })
        return response.data
    } catch (error) {
        let errorMessage = ''
        // Check if error is from Axios
        if (axios.isAxiosError(error)) {
            console.error('Axios error generating critical CSS:', error.response?.data || error.message)
            errorMessage = error.response?.data.error || error.message
        } else {
            console.error('Unexpected error generating critical CSS:', error)
            errorMessage = 'Failed to generate critical CSS'
        }
        throw new Error(errorMessage)
    }
}
