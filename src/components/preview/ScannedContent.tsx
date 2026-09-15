import type { ScannedContentProps } from "../../types/types"
import { parseVCardString, parseWifiString } from "../../utils/qrParsers"
import { looksLikeUrl } from "../../utils/QrUtils"
import { VCardCard } from "./VCardCard"
import { WifiCard } from "./WifiCard"
import { UrlCard } from "./URLCard"
import { TextCard } from "./TextCard"

export function ScannedContent({ value, onCopyText, copiedText }: ScannedContentProps) {
    if (!value) {
        return (
            <div className="text-center">
                <div className="mx-auto grid size-20 place-items-center rounded-2xl border border-dashed border-neutral-800 bg-neutral-950/50">
                    <svg className="size-8 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM14.625 3.75c-.621 0-1.125.504-1.125 1.125v4.5c0 .621.504 1.125 1.125 1.125h4.5c.621 0 1.125-.504 1.125-1.125v-4.5c0-.621-.504-1.125-1.125-1.125h-4.5z" />
                    </svg>
                </div>
                <p className="mt-6 text-base font-medium text-neutral-300">
                    Resultado del escaneo
                </p>
                <p className="mt-2 text-sm text-neutral-500">
                    Sube una imagen para decodificar la información de su QR.
                </p>
            </div>
        )
    }

    const isVCard = value.includes("BEGIN:VCARD")
    const isWifi = value.startsWith("WIFI:")
    const isUrl = looksLikeUrl(value)

    return (
        <div className="w-full max-w-md">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-green-800/60 bg-green-950/40 px-3 py-1 text-xs font-medium text-green-400">
                <span className="size-1.5 rounded-full bg-green-400"></span>
                QR Leído Correctamente
            </span>

            {isVCard && <VCardCard contact={parseVCardString(value)} />}
            {isWifi && <WifiCard wifi={parseWifiString(value)} />}
            {isUrl && !isVCard && !isWifi && <UrlCard url={value} />}
            {!isVCard && !isWifi && !isUrl && <TextCard text={value} />}

            <button
                onClick={() => onCopyText(value)}
                className="mt-4 w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs font-medium text-neutral-300 transition hover:bg-neutral-800"
            >
                {copiedText ? "¡Contenido copiado!" : "Copiar todo el contenido"}
            </button>
        </div>
    )
}