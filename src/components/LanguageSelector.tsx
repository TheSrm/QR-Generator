import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import type {Language} from "../types/types.ts"

const LANGUAGES: Language[] = [
    {
        code: "es",
        label: "Español",
        // SVG directo de la bandera de España
        flag: "https://flagcdn.com/w40/es.png"
    },
    {
        code: "en",
        label: "English",
        // SVG directo de la bandera de Reino Unido
        flag: "https://flagcdn.com/w40/gb.png"
    }
]

export function LanguageSelector() {
    const { i18n } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const currentLang = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0]

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
                className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs font-medium text-neutral-300 transition hover:border-neutral-700 hover:bg-neutral-900"
            >
                <img
                    src={currentLang.flag}
                    alt={currentLang.label}
                    className="size-4 rounded-full object-cover"
                />
                <span>{currentLang.label}</span>
                <svg
                    className={`size-3 text-neutral-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 z-50 mt-2 w-32 rounded-xl border border-neutral-800 bg-neutral-950 p-1 shadow-lg">
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            type="button"
                            onClick={() => handleSelect(lang.code)}
                            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs transition ${
                                i18n.language === lang.code
                                    ? "bg-neutral-800 font-semibold text-neutral-50"
                                    : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200"
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