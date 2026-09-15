import type {QRHistoryProps} from "../types/types.ts";

export function QRHistory({ history, onSelect, onClear }: QRHistoryProps) {
    if (history.length === 0) return null

    return (
        <div className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-neutral-300">Historial reciente</h3>
                <button
                    onClick={onClear}
                    className="text-xs text-neutral-500 hover:text-neutral-400"
                >
                    Borrar historial
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {history.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onSelect(item)}
                        className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-300 transition hover:border-neutral-700 hover:bg-neutral-800"
                    >
                        <span className="rounded bg-neutral-800 px-1.5 py-0.5 text-[10px] font-mono uppercase text-neutral-400">
                            {item.type}
                        </span>
                        <span className="max-w-[150px] truncate">{item.text}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}