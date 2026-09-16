import { useRef, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { QRCodeSVG } from "qrcode.react"
import { downloadQRAsPNG, downloadQRAsSVG, copyQRToClipboard, copyToClipboard } from "../utils/QrUtils"
import type { QRPreviewProps, QRHistoryItem } from "../types/types"
import { ScannedContent } from "./preview/ScannedContent"
import { QRHistoryWidget } from "./preview/QRHistoryWidget"
import { useTheme } from "../hooks/UseTheme"

type ExtendedQRPreviewProps = QRPreviewProps & {
    history?: QRHistoryItem[]
    onSelectHistory?: (item: QRHistoryItem) => void
    onClearHistory?: () => void
}

export default function QRPreview({
                                      value,
                                      mode,
                                      history = [],
                                      onSelectHistory,
                                      onClearHistory
                                  }: ExtendedQRPreviewProps) {
    const { t } = useTranslation()
    const { theme } = useTheme()
    const svgContainerRef = useRef<HTMLDivElement>(null)
    const [copiedImage, setCopiedImage] = useState(false)
    const [copiedText, setCopiedText] = useState(false)

    const imageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const textTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        return () => {
            if (imageTimerRef.current) clearTimeout(imageTimerRef.current)
            if (textTimerRef.current) clearTimeout(textTimerRef.current)
        }
    }, [])

    const getSVGElement = (): SVGSVGElement | null => {
        return svgContainerRef.current?.querySelector("svg") ?? null
    }

    const handleDownload = () => {
        const svg = getSVGElement()
        if (svg) downloadQRAsPNG(svg)
    }

    const handleDownloadSVG = () => {
        const svg = getSVGElement()
        if (svg) downloadQRAsSVG(svg)
    }

    const handleCopyImage = async () => {
        const svg = getSVGElement()
        if (!svg) return

        const success = await copyQRToClipboard(svg)
        if (success) {
            setCopiedImage(true)
            if (imageTimerRef.current) clearTimeout(imageTimerRef.current)
            imageTimerRef.current = setTimeout(() => setCopiedImage(false), 2000)
        }
    }

    const handleCopyText = async (textToCopy: string) => {
        const success = await copyToClipboard(textToCopy)
        if (success) {
            setCopiedText(true)
            if (textTimerRef.current) clearTimeout(textTimerRef.current)
            textTimerRef.current = setTimeout(() => setCopiedText(false), 2000)
        }
    }

    return (
        <section className="flex min-h-[28rem] flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex flex-1 flex-col items-center justify-center text-center">
                {mode === "scan" ? (
                    <ScannedContent
                        value={value}
                        onCopyText={handleCopyText}
                        copiedText={copiedText}
                    />
                ) : value ? (
                    <>
                        <div ref={svgContainerRef} className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
                            <QRCodeSVG
                                value={value}
                                size={200}
                                fgColor={theme === "dark" ? "#fafafa" : "#09090b"}
                                bgColor="transparent"
                                level="H"
                            />
                        </div>

                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <button
                                type="button"
                                onClick={handleCopyImage}
                                aria-live="polite"
                                className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 ${
                                    copiedImage
                                        ? "border-green-600 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400"
                                        : "border-neutral-200 bg-neutral-100 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
                                }`}
                            >
                                {copiedImage ? t("preview.imageCopied", "Imagen copiada") : t("preview.copyImage", "Copiar imagen")}
                            </button>

                            <button
                                type="button"
                                onClick={handleDownload}
                                className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                            >
                                PNG
                            </button>

                            <button
                                type="button"
                                onClick={handleDownloadSVG}
                                className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                            >
                                SVG
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <div className="mx-auto grid size-56 place-items-center rounded-xl border border-dashed border-neutral-300 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950/50">
                            <span className="text-sm font-medium text-neutral-400 dark:text-neutral-600">QR</span>
                        </div>
                        <p className="mt-6 text-base font-medium text-neutral-800 dark:text-neutral-300">
                            {t("preview.placeholderTitle", "Tu código QR aparecerá aquí")}
                        </p>
                        <p className="mt-2 text-sm text-neutral-500">
                            {t("preview.placeholderSub", "Introduce datos y haz clic en Generar QR.")}
                        </p>
                    </div>
                )}
            </div>

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