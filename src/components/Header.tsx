import { useTranslation } from "react-i18next"
import { LanguageSelector } from "./LanguageSelector"
import { ThemeToggle } from "./ThemeToggle"

export function Header() {
    const { t } = useTranslation()

    return (
        <header className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-neutral-200 pb-6 dark:border-neutral-800/60 sm:flex-row sm:items-center">
            <div>
                <div className="flex items-center gap-3">
                    <div className="grid size-9 place-items-center rounded-xl border border-neutral-200 bg-neutral-100 text-neutral-800 shadow-sm dark:border-neutral-700/60 dark:bg-neutral-800 dark:text-neutral-100">
                        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                        </svg>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-2xl">
                        {t("app.title", "QR Studio")}
                    </h1>
                </div>
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 sm:text-sm">
                    {t("app.subtitle", "Genera y escanea códigos QR de forma rápida, privada y segura.")}
                </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
                <ThemeToggle />
                <LanguageSelector />
            </div>
        </header>
    )
}