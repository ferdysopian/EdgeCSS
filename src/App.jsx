import Header from './components/Header'

const App = () => {
    return (
        <>
            <div className='min-h-screen bg-gray-50'>
                <Header />
                <main>
                </main>

                <footer className='bg-gray-900 text-gray-400 py-12'>
                    <div className='container mx-auto px-4'>
                        <div className='grid grid-cols-1 md:grid-cols-1 gap-8 text-center'>
                            <div>
                                <h3 className='text-white font-semibold mb-4'>About</h3>
                                <p className='text-sm'>
                                    EdgeCSS helps optimize website performance by generating the critical-path CSS for above-the-fold content,
                                    improving load times and overall user experience.
                                </p>
                            </div>
                        </div>
                        <div className='mt-8 pt-8 border-t border-gray-800 text-center text-sm'>
                            <p>&copy; {new Date().getFullYear()} EdgeCSS. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default App
