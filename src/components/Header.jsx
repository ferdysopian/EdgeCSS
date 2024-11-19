import { Code2, Menu } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Header() {
    return (
        <header className='bg-gradient-to-r from-purple-700 to-indigo-800 text-white'>
            <nav className='container mx-auto px-4 py-6'>
                <div className='flex items-center justify-between'>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='flex items-center space-x-2'>
                        <Code2 className='h-8 w-8' />
                        <span className='text-xl font-bold'>EdgeCSS</span>
                    </motion.div>

                    <button className='md:hidden'>
                        <Menu className='h-6 w-6' />
                    </button>
                </div>
            </nav>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='container mx-auto px-4 py-16 text-center'>
                <h1 className='text-4xl md:text-6xl font-bold mb-6'>
                    Generate Critical CSS
                    <span className='block text-purple-300'>in Seconds</span>
                </h1>
                <p className='text-xl md:text-2xl text-purple-100 mb-8 max-w-2xl mx-auto'>
                    Improve your website’s loading speed with EdgeCSS. Quickly generate only the critical CSS needed for above-the-fold content,
                    ensuring a faster and smoother user experience.
                </p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-purple-50 transition-colors'>
                    Try It Now
                </motion.button>
            </motion.div>
        </header>
    )
}
