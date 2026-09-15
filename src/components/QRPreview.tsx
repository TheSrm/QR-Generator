import { useRef, useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { downloadQRAsPNG, copyQRToClipboard, copyToClipboard, looksLikeUrl } from "../utils/QrUtils"
import type { QRPreviewProps } from "../types/types.ts"

// Helpers para parsear el contenido escaneado
function parseWifiString(text: string) {
    const ssidMatch = text.match(/S:([^;]+)/)
    const passMatch = text.match(/P:([^;]+)/)
    const secMatch = text.match(/T:([^;]+)/)
    return {
        ssid: ssidMatch ? ssidMatch[1].replace(/\\([;,:\\])/g, "$1") : "Red WiFi",
        password: passMatch ? passMatch[1].replace(/\\([;,:\\])/g, "$1") : "",
        security: secMatch ? secMatch[1] : "nopass"
    }
}

function parseVCardString(text: string) {
    const fnMatch = text.match(/FN:(.+)/)
    const telMatch = text.match(/TEL.*:(.+)/)
    const emailMatch = text.match(/EMAIL.*:(.+)/)
    const orgMatch = text.match(/ORG:(.+)/)
    return {
        name: fnMatch ? fnMatch[1].trim() : "Contacto",
        phone: telMatch ? telMatch[1].trim() : "",
        email: emailMatch ? emailMatch[1].trim() : "",
        company: orgMatch ? orgMatch[1].trim() : ""
    }
}

function QRPreview({ value, mode }: QRPreviewProps) {
    const svgRef = useRef<HTMLDivElement>(null)
    const [copiedImage, setCopiedImage] = useState(false)
    const [copiedText, setCopiedText] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleDownload = () => {
        const svg = svgRef.current?.querySelector("svg")
        if (!svg) return
        downloadQRAsPNG(svg)
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

    // --- RENDER MODO LECTURA ("scan") ---
    if (mode === "scan") {
        if (!value) {
            return (
                <section className="flex min-h-[28rem] flex-col items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 p-8 text-center">
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
                </section>
            )
        }

        const isVCard = value.includes("BEGIN:VCARD")
        const isWifi = value.startsWith("WIFI:")
        const isUrl = looksLikeUrl(value)

        return (
            <section className="flex min-h-[28rem] flex-col items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 p-8 text-left">
                <div className="w-full max-w-md">
                    <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-green-800/60 bg-green-950/40 px-3 py-1 text-xs font-medium text-green-400">
                        <span className="size-1.5 rounded-full bg-green-400"></span>
                        QR Leído Correctamente
                    </span>

                    {/* VCard Format */}
                    {isVCard && (() => {
                        const contact = parseVCardString(value)
                        return (
                            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6 shadow-inner">
                                <div className="flex items-center gap-4">
                                    <div className="grid size-12 place-items-center rounded-full bg-neutral-800 text-lg font-semibold text-neutral-200">
                                        {contact.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-neutral-50">{contact.name}</h3>
                                        {contact.company && <p className="text-xs text-neutral-400">{contact.company}</p>}
                                    </div>
                                </div>
                                <div className="mt-5 space-y-3 divide-y divide-neutral-900 text-xs">
                                    {contact.phone && (
                                        <div className="pt-2 flex justify-between items-center text-neutral-300">
                                            <span className="text-neutral-500">Teléfono:</span>
                                            <span className="font-mono">{contact.phone}</span>
                                        </div>
                                    )}
                                    {contact.email && (
                                        <div className="pt-2 flex justify-between items-center text-neutral-300">
                                            <span className="text-neutral-500">Email:</span>
                                            <span className="font-mono">{contact.email}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })()}

                    {/* WiFi Format */}
                    {isWifi && (() => {
                        const wifi = parseWifiString(value)
                        return (
                            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Datos de red WiFi</h3>
                                <div className="mt-4 space-y-3 text-sm">
                                    <div>
                                        <p className="text-xs text-neutral-500">Nombre de red (SSID)</p>
                                        <p className="font-medium text-neutral-100">{wifi.ssid}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-neutral-500">Seguridad</p>
                                        <p className="font-medium text-neutral-100">{wifi.security}</p>
                                    </div>
                                    {wifi.password && (
                                        <div>
                                            <p className="text-xs text-neutral-500">Contraseña</p>
                                            <div className="flex items-center justify-between">
                                                <p className="font-mono text-neutral-100">
                                                    {showPassword ? wifi.password : "••••••••••••"}
                                                </p>
                                                <button
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="text-xs text-neutral-400 hover:text-neutral-200"
                                                >
                                                    {showPassword ? "Ocultar" : "Mostrar"}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })()}

                    {/* URL Format */}
                    {isUrl && !isVCard && !isWifi && (
                        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6 text-center">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Enlace Detectado</h3>
                            <p className="mt-3 break-all font-mono text-sm text-neutral-200">{value}</p>
                            <a
                                href={value.startsWith("www.") ? `https://${value}` : value}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-5 inline-block w-full rounded-lg bg-neutral-50 px-4 py-2.5 text-center text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
                            >
                                Abrir Enlace
                            </a>
                        </div>
                    )}

                    {/* Plain Text Format */}
                    {!isVCard && !isWifi && !isUrl && (
                        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Texto Extraído</h3>
                            <p className="mt-3 max-h-48 overflow-y-auto whitespace-pre-wrap break-all font-mono text-sm text-neutral-200">
                                {value}
                            </p>
                        </div>
                    )}

                    {/* Botón común para copiar el texto crudo */}
                    <button
                        onClick={() => handleCopyText(value)}
                        className="mt-4 w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs font-medium text-neutral-300 transition hover:bg-neutral-800"
                    >
                        {copiedText ? "¡Contenido copiado!" : "Copiar todo el contenido"}
                    </button>
                </div>
            </section>
        )
    }

    // --- RENDER MODO GENERADOR (text, wifi, vcard) ---
    return (
        <section className="flex min-h-[28rem] flex-col items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 p-8 text-center">
            {value ? (
                <>
                    <div
                        ref={svgRef}
                        className="rounded-xl border border-neutral-800 bg-neutral-950 p-6"
                    >
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
                            onClick={handleDownload}
                            className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm font-medium text-neutral-300 transition hover:border-neutral-700 hover:bg-neutral-800 hover:text-neutral-50"
                        >
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
                        Introduce datos para comenzar.
                    </p>
                </div>
            )}
        </section>
    )
}

export default QRPreview