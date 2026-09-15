import { useRef, useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { downloadQRAsPNG, downloadQRAsSVG, copyQRToClipboard, copyToClipboard } from "../utils/QrUtils"
import type { QRPreviewProps, QRHistoryItem } from "../types/types"
import { ScannedContent } from "./preview/ScannedContent"
import { QRHistoryWidget } from "./preview/QRHistoryWidget"

type ExtendedQRPreviewProps = QRPreviewProps & {
    history?: QRHistoryItem[]
    onSelectHistory?: (item: QRHistoryItem) => void
    onClearHistory?: () => void
}

function QRPreview({ value, mode, history = [], onSelectHistory, onClearHistory }: ExtendedQRPreviewProps) {
    const svgRef = useRef<HTMLDivElement>(null)
    const [copiedImage, setCopiedImage] = useState(false)
    const [copiedText, setCopiedText] = useState(false)

    const handleDownload = () => {
        const svg = svgRef.current?.querySelector("svg")
        if (!svg) return
        downloadQRAsPNG(svg)
    }

    const handleDownloadSVG = () => {
        const svg = svgRef.current?.querySelector("svg")
        if (!svg) return
        downloadQRAsSVG(svg)
    }

    const handleCopyImage = async () => {
        const svg = svgRef.current?.querySelector("svg")
        if (!svg) return
        const success = await copyQRToClipboard(svg)
        if (success) {
            setCopiedImage(true)
            setTimeout(() => setCopiedImage(false), 2000)
        }
    }

    const handleCopyText = async (textToCopy: string) => {
        const success = await copyToClipboard(textToCopy)
        if (success) {
            setCopiedText(true)
            setTimeout(() => setCopiedText(false), 2000)
        }
    }

    return (
        <section className="flex min-h-[28rem] flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
            <div className="flex flex-1 flex-col items-center justify-center text-center">
                {mode === "scan" ? (
                    <ScannedContent
                        value={value}
                        onCopyText={handleCopyText}
                        copiedText={copiedText}
                    />
                ) : value ? (
                    <>
                        <div ref={svgRef} className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
                            <QRCodeSVG
                                value={value}
                                size={200}
                                fgColor="#fafafa"
                                bgColor="transparent"
                                level="H"
                            />
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={handleCopyImage}
                                className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                                    copiedImage
                                        ? "border-green-800 bg-green-950 text-green-400"
                                        : "border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800 hover:text-neutral-50"
                                }`}
                            >
                                {copiedImage ? "Imagen copiada" : "Copiar imagen"}
                            </button>

                            <button
                                type="button"
                                onClick={handleDownload}
                                className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm font-medium text-neutral-300 transition hover:border-neutral-700 hover:bg-neutral-800 hover:text-neutral-50"
                            >
                                PNG
                            </button>

                            <button
                                type="button"
                                onClick={handleDownloadSVG}
                                className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm font-medium text-neutral-300 transition hover:border-neutral-700 hover:bg-neutral-800 hover:text-neutral-50"
                            >
                                SVG
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <div className="mx-auto grid size-56 place-items-center rounded-xl border border-dashed border-neutral-800 bg-neutral-950/50">
                            <span className="text-sm font-medium text-neutral-600">QR</span>
                        </div>
                        <p className="mt-6 text-base font-medium text-neutral-300">
                            Tu código QR aparecerá aquí
                        </p>
                        <p className="mt-2 text-sm text-neutral-500">
                            Introduce datos y haz clic en Generar QR.
                        </p>
                    </div>
                )}
            </div>

            {/* Widget Desplegable de Historial */}
            {history.length > 0 && onSelectHistory && onClearHistory && (
                <QRHistoryWidget
                    history={history}
                    onSelect={onSelectHistory}
                    onClear={onClearHistory}
                />
            )}
        </section>
    )
}

export default QRPreview