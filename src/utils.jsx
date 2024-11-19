import axios from 'axios'
import { parse as parseDomain } from 'tldts'

export const generateCriticalCSS = async (url, mobileViewport, desktopViewport, removeFontFace) => {
    const domain = parseDomain(url)?.domain || ''

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
        if (axios.isAxiosError(error)) {
            console.error('Axios error generating critical CSS:', error.response?.data || error.message)
        } else {
            console.error('Unexpected error generating critical CSS:', error)
        }
        throw new Error('Failed to generate critical CSS')
    }
}
