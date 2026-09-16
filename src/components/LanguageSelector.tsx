import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import type { Language } from "../types/types.ts"

export function LanguageSelector() {
    const { t, i18n } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Extrae el array de objetos desde el JSON
    const languages = t("languages", { returnObjects: true }) as Language[]

    // Normaliza el código de idioma activo (por si i18n devuelve 'es-ES' o 'en-US')
    const currentCode = i18n.language ? i18n.language.slice(0, 2) : "es"
    const currentLang = languages.find((l) => l.code === currentCode) || languages[0]

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSelect = (code: string) => {
        i18n.changeLanguage(code)
        setIsOpen(false)
    }

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-900"
            >
                <img
                    src={currentLang.flag}
                    alt={currentLang.label}
                    className="size-4 rounded-full object-cover"
                />
                <span>{currentLang.label}</span>
                <svg
                    className={`size-3 text-neutral-500 transition-transform dark:text-neutral-400 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 z-50 mt-2 w-32 rounded-xl border border-neutral-200 bg-white p-1 shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            type="button"
                            onClick={() => handleSelect(lang.code)}
                            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs transition ${
                                currentCode === lang.code
                                    ? "bg-neutral-100 font-semibold text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50"
                                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-200"
                            }`}
                        >
                            <img
                                src={lang.flag}
                                alt={lang.label}
                                className="size-4 rounded-full object-cover"
                            />
                            <span>{lang.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}