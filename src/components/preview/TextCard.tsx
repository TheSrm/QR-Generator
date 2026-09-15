import type { TextCardProps } from "../../types/types"

export function TextCard({ text }: TextCardProps) {
    return (
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Texto Extraído</h3>
            <p className="mt-3 max-h-48 overflow-y-auto whitespace-pre-wrap break-all font-mono text-sm text-neutral-200">
                {text}
            </p>
        </div>
    )
}