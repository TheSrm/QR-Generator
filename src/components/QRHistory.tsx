import { useTranslation } from "react-i18next"
import type { QRHistoryProps } from "../types/types.ts"

export function QRHistory({ history, onSelect, onClear }: QRHistoryProps) {
    const { t } = useTranslation()

    if (history.length === 0) return null

    return (
        <div className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-neutral-300">
                    {t("history.title", "Historial reciente")}
                </h3>
                <button
                    onClick={onClear}
                    className="text-xs text-neutral-500 transition hover:text-neutral-400"
                >
                    {t("history.clear", "Borrar historial")}
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {history.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onSelect(item)}
                        className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-300 transition hover:border-neutral-700 hover:bg-neutral-800"
                    >
                        <span className="rounded bg-neutral-800 px-1.5 py-0.5 font-mono text-[10px] uppercase text-neutral-400">
                            {t(`modes.${item.type}`, item.type)}
                        </span>
                        <span className="max-w-[150px] truncate">{item.text}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}