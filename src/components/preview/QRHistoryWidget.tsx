import { useState } from "react"
import { useTranslation } from "react-i18next"
import type { QRHistoryWidgetProps } from "../../types/types"

export function QRHistoryWidget({ history, onSelect, onClear }: QRHistoryWidgetProps) {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)

    if (history.length === 0) return null

    return (
        <div className="mt-4 rounded-xl border border-neutral-800/80 bg-neutral-950/60 p-3 transition">
            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-neutral-200"
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
                        className="text-[11px] text-neutral-500 hover:text-red-400"
                    >
                        {t("preview.clearHistory", "Limpiar")}
                    </button>
                )}
            </div>

            {isOpen && (
                <div className="mt-3 flex flex-wrap gap-2 border-t border-neutral-900 pt-2">
                    {history.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => onSelect(item)}
                            className="flex items-center gap-2 rounded-lg border border-neutral-800/80 bg-neutral-900 px-2.5 py-1.5 text-xs text-neutral-300 transition hover:border-neutral-700 hover:bg-neutral-800"
                        >
                            <span className="rounded bg-neutral-950 px-1.5 py-0.5 font-mono text-[10px] uppercase text-neutral-400">
                                {t(`modes.${item.type}`, item.type)}
                            </span>
                            <span className="max-w-[130px] truncate font-mono text-[11px] text-neutral-300">
                                {item.text}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}