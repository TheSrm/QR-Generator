import { useTheme } from "../hooks/useTheme"

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className="flex size-9 items-center justify-center rounded-lg border border-neutral-300 bg-neutral-100 text-neutral-700 transition hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-900"
        >
            {theme === "dark" ? (
                /* Icono del Sol para cambiar a modo claro */
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m8.966-8.966h-2.25m-13.5 0H3m15.364-6.364l-1.591 1.591M6.759 17.241l-1.591 1.591m12.728 0l-1.591-1.591M6.759 6.759L5.168 5.168M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
                </svg>
            ) : (
                /* Icono de la Luna para cambiar a modo oscuro */
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
            )}
        </button>
    )
}