import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Smartphone, Monitor, Download, Copy, RefreshCw } from 'lucide-react'
import { generateCriticalCSS } from '../utils'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function CSSForm() {
    const [url, setUrl] = useState('')
    const [mobileViewport, setMobileViewport] = useState({ width: 375, height: 667 })
    const [desktopViewport, setDesktopViewport] = useState({ width: 1440, height: 900 })
    const [removeFontFace, setRemoveFontFace] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [generatedCSS, setGeneratedCSS] = useState('')
    const [remainingCredits, setRemainingCredits] = useState(null)
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const [styleExample, setStyleExample] = useState(`<style id="edgecss" media="all">
  /* Critical CSS Here */
</style>`)
    const [scriptExample, setScriptExample] = useState(`<script type="text/javascript">
  window.addEventListener("load",()=>{const e=document.querySelectorAll("#edgecss");e.length>1&&e.forEach(t=>t.media="none")});
</script>`)

    useEffect(() => {
        const validateViewport = (viewport, setViewport) => {
            let { width, height } = viewport

            // Ensure dimensions are within valid ranges
            width = Math.max(320, Math.min(width, 1920)) // Min width: 320px, Max width: 1920px
            height = Math.max(480, Math.min(height, 2000)) // Min height: 480px, Max height: 2000px

            // Only update state if the values have changed
            if (viewport.width !== width || viewport.height !== height) {
                setViewport({ width, height })
            }
        }

        validateViewport(mobileViewport, setMobileViewport)
        validateViewport(desktopViewport, setDesktopViewport)
    }, [mobileViewport, desktopViewport])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage(null)
        setError(null)
        setGeneratedCSS('')

        generateCriticalCSS(url, mobileViewport, desktopViewport, removeFontFace)
            .then((results) => {
                const { message, remainingCredits, result } = results
                setGeneratedCSS(`${result}`)
                setRemainingCredits(remainingCredits)
                toast.success(message)
                setIsLoading(false)
                setStyleExample(`<style id="edgecss" media="all">
  ${result}
</style>`)
            })
            .catch((error) => {
                toast.error(error.message)
                setIsLoading(false)
            })
    }

    return (
        <div className='container mx-auto px-4 py-12'>
            <ToastContainer position='bottom-right' hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} draggable />
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='max-w-3xl mx-auto space-y-8'
                onSubmit={handleSubmit}>
                <div className='space-y-4'>
                    <label className='block text-lg font-medium text-gray-700'>Website URL</label>
                    <input
                        type='url'
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder='https://example.com'
                        className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                        required
                    />
                </div>

                <div className='grid md:grid-cols-2 gap-8'>
                    <div className='space-y-4'>
                        <div className='flex items-center space-x-2'>
                            <Smartphone className='h-5 w-5 text-purple-600' />
                            <label className='text-lg font-medium text-gray-700'>Mobile Viewport</label>
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm text-gray-600'>Width (px)</label>
                                <input
                                    type='number'
                                    value={mobileViewport.width}
                                    onChange={(e) => setMobileViewport({ ...mobileViewport, width: Number(e.target.value) })}
                                    className='w-full px-3 py-2 rounded border border-gray-300'
                                />
                            </div>
                            <div>
                                <label className='block text-sm text-gray-600'>Height (px)</label>
                                <input
                                    type='number'
                                    value={mobileViewport.height}
                                    onChange={(e) => setMobileViewport({ ...mobileViewport, height: Number(e.target.value) })}
                                    className='w-full px-3 py-2 rounded border border-gray-300'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='space-y-4'>
                        <div className='flex items-center space-x-2'>
                            <Monitor className='h-5 w-5 text-purple-600' />
                            <label className='text-lg font-medium text-gray-700'>Desktop Viewport</label>
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm text-gray-600'>Width (px)</label>
                                <input
                                    type='number'
                                    min='320'
                                    max='1920'
                                    value={desktopViewport.width}
                                    onChange={(e) => setDesktopViewport({ ...desktopViewport, width: Number(e.target.value) })}
                                    className='w-full px-3 py-2 rounded border border-gray-300'
                                />
                            </div>
                            <div>
                                <label className='block text-sm text-gray-600'>Height (px)</label>
                                <input
                                    type='number'
                                    min='240'
                                    max='2000'
                                    value={desktopViewport.height}
                                    onChange={(e) => setDesktopViewport({ ...desktopViewport, height: Number(e.target.value) })}
                                    className='w-full px-3 py-2 rounded border border-gray-300'
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex items-center space-x-2'>
                    <input
                        type='checkbox'
                        id='removeFontFace'
                        checked={removeFontFace}
                        onChange={(e) => setRemoveFontFace(e.target.checked)}
                        className='h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded'
                    />
                    <label htmlFor='removeFontFace' className='text-gray-700'>
                        Remove @font-face rules
                    </label>
                </div>

                <button
                    type='submit'
                    disabled={isLoading}
                    className='w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-purple-400'>
                    {isLoading ? (
                        <span className='flex items-center justify-center space-x-2'>
                            <Loader2 className='h-5 w-5 animate-spin' />
                            <span>Generating...</span>
                        </span>
                    ) : (
                        <span className='flex items-center justify-center space-x-2'>
                            <RefreshCw className='h-5 w-5' />
                            <span>Generate Critical CSS</span>
                        </span>
                    )}
                </button>
            </motion.form>

            {message && <div className='mt-4 text-green-600 text-center'>{message}</div>}

            {error && <div className='mt-4 text-red-600 text-center'>{error}</div>}

            {remainingCredits !== null && <div className='mt-4 text-gray-700 text-center'>Remaining Credits: {remainingCredits}</div>}

            {generatedCSS && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='mt-12 max-w-3xl mx-auto'>
                    <div className='bg-gray-900 rounded-lg p-4'>
                        <div className='flex justify-between items-center mb-4'>
                            <h3 className='text-white font-medium'>Generated Critical CSS</h3>
                            <div className='space-x-2'>
                                <button
                                    onClick={() => navigator.clipboard.writeText(generatedCSS)}
                                    className='text-gray-400 hover:text-white p-2 rounded transition-colors'>
                                    <Copy className='h-5 w-5' />
                                </button>
                                <button
                                    onClick={() => {
                                        const blob = new Blob([generatedCSS], { type: 'text/css' })
                                        const url = URL.createObjectURL(blob)
                                        const a = document.createElement('a')
                                        a.href = url
                                        a.download = 'critical.css'
                                        a.click()
                                    }}
                                    className='text-gray-400 hover:text-white p-2 rounded transition-colors'>
                                    <Download className='h-5 w-5' />
                                </button>
                            </div>
                        </div>
                        <pre className='bg-gray-800 p-4 rounded overflow-x-auto'>
                            <code className='text-gray-100'>{generatedCSS}</code>
                        </pre>
                    </div>
                </motion.div>
            )}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='mt-12 max-w-3xl mx-auto'>
                <h2 className='text-2xl font-bold text-gray-700 mb-4'>How to Use Critical CSS</h2>
                <ol className='list-decimal list-inside text-gray-600 space-y-2'>
                    <li>Enter the URL of the website you want to generate critical CSS for.</li>
                    <li>Adjust the mobile and desktop viewport settings if necessary.</li>
                    <li>Check the box to remove @font-face rules if desired.</li>
                    <li>Click the "Generate Critical CSS" button and wait for the process to complete.</li>
                    <li>Once generated, you can copy the CSS to your clipboard or download it as a file.</li>
                </ol>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='mt-12 max-w-3xl mx-auto'>
                <h2 className='text-2xl font-bold text-gray-700 mb-4'>How to Apply Critical CSS to Your Website</h2>
                <ol className='list-decimal list-inside text-gray-600 space-y-2'>
                    <li>Copy the generated critical CSS to your clipboard.</li>
                    <li>
                        <p className='mb-2 inline'>Add the following code to the head of your HTML document:</p>
                        <div className='bg-gray-900 rounded-lg p-4 mb-4'>
                            <div className='flex justify-between items-center mb-4'>
                                <div className='space-x-2'>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(styleExample)}
                                        className='text-gray-400 hover:text-white p-2 rounded transition-colors'>
                                        <Copy className='h-5 w-5' />
                                    </button>
                                </div>
                            </div>
                            <pre className='bg-gray-800 p-4 rounded overflow-x-auto'>
                                <code className='text-gray-100'>{styleExample}</code>
                            </pre>
                        </div>
                    </li>
                    <li>
                        <p className='mb-2 inline'>Include a script to apply the Critical CSS only during the initial load and disable it afterward:</p>
                        <div className='bg-gray-900 rounded-lg p-4 mb-4'>
                            <div className='flex justify-between items-center mb-4'>
                                <div className='space-x-2'>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(scriptExample)}
                                        className='text-gray-400 hover:text-white p-2 rounded transition-colors'>
                                        <Copy className='h-5 w-5' />
                                    </button>
                                </div>
                            </div>
                            <pre className='bg-gray-800 p-4 rounded overflow-x-auto'>
                                <code className='text-gray-100'>{scriptExample}</code>
                            </pre>
                        </div>
                    </li>
                </ol>
            </motion.div>
        </div>
    )
}
