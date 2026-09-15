import type { UrlCardProps } from "../../types/types"

export function UrlCard({ url }: UrlCardProps) {
    const href = url.startsWith("www.") ? `https://${url}` : url

    return (
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6 text-center">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Enlace Detectado</h3>
            <p className="mt-3 break-all font-mono text-sm text-neutral-200">{url}</p>
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block w-full rounded-lg bg-neutral-50 px-4 py-2.5 text-center text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
            >
                Abrir Enlace
            </a>
        </div>
    )
}