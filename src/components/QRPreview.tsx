import { useRef, useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { downloadQRAsPNG, copyToClipboard } from "../utils/QrUtils"
import type { QRPreviewProps } from "../types/types.ts"

function QRPreview({ value }: QRPreviewProps) {
    const svgRef = useRef<HTMLDivElement>(null)
    const [copied, setCopied] = useState(false)

    const handleDownload = () => {
        const svg = svgRef.current?.querySelector("svg")
        if (!svg) return
        downloadQRAsPNG(svg)
    }

    const handleCopy = async () => {
        const success = await copyToClipboard(value)
        if (success) {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <section className="flex min-h-[28rem] flex-col items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
            {value ? (
                <>
                    <div
                        ref={svgRef}
                        className="rounded-xl border border-neutral-800 bg-neutral-950 p-8"
                    >
                        <QRCodeSVG
                            value={value}
                            size={240}
                            fgColor="#fafafa"
                            bgColor="transparent"
                            level="H"
                        />
                    </div>

                    <div className="mt-6 flex gap-3">
                        <button
                            onClick={handleCopy}
                            className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                                copied
                                    ? "border-green-800 bg-green-950 text-green-400"
                                    : "border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800 hover:text-neutral-50"
                            }`}
                        >
                            {copied ? (
                                <>
                                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    Copiado
                                </>
                            ) : (
                                <>
                                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                                    </svg>
                                    Copiar
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm font-medium text-neutral-300 transition hover:border-neutral-700 hover:bg-neutral-800 hover:text-neutral-50"
                        >
                            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            PNG
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
                        Introduce un texto o URL para comenzar.
                    </p>
                </div>
            )}
        </section>
    )
}

export default QRPreview