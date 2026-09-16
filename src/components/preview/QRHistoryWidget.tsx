import { useState } from "react"
import { useTranslation } from "react-i18next"
import type { QRHistoryWidgetProps } from "../../types/types"

export function QRHistoryWidget({ history, onSelect, onClear }: QRHistoryWidgetProps) {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)

    if (history.length === 0) return null

    return (
        <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-100/70 p-3 transition dark:border-neutral-800/80 dark:bg-neutral-950/60">
            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                    <svg
                        className={`size-3.5 transition-transform ${isOpen ? "rotate-90" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    <span>
                        {t("preview.historyTitle", "Historial reciente")} ({history.length})
                    </span>
                </button>

                {isOpen && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="text-[11px] text-neutral-500 hover:text-red-600 dark:hover:text-red-400"
                    >
                        {t("preview.clearHistory", "Limpiar")}
                    </button>
                )}
            </div>

            {isOpen && (
                <div className="mt-3 flex flex-wrap gap-2 border-t border-neutral-200 pt-2 dark:border-neutral-900">
                    {history.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => onSelect(item)}
                            className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-xs text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-200/60 dark:border-neutral-800/80 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
                        >
                            <span className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[10px] uppercase text-neutral-600 dark:bg-neutral-950 dark:text-neutral-400">
                                {t(`modes.${item.type}`, item.type)}
                            </span>
                            <span className="max-w-[130px] truncate font-mono text-[11px] text-neutral-800 dark:text-neutral-300">
                                {item.text}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}