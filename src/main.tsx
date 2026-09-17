import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <main className="min-h-screen bg-neutral-100 text-neutral-900 transition-colors duration-200 px-4 py-12 dark:bg-neutral-950 dark:text-neutral-50 sm:px-6 lg:px-8">
                <App />
        </main>
    </StrictMode>,
)