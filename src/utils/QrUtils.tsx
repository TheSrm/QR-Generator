import { drawQRToCanvas } from "./QRCanvasUtils"

export async function downloadQRAsPNG(svgElement: SVGElement, filename?: string): Promise<void> {
    const canvas = await drawQRToCanvas(svgElement)
    if (!canvas) return

    const pngUrl = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = filename || `qr-${Date.now()}.png`
    link.href = pngUrl
    link.click()
}

export async function copyQRToClipboard(svgElement: SVGElement): Promise<boolean> {
    try {
        const canvas = await drawQRToCanvas(svgElement)
        if (!canvas) return false

        return new Promise((resolve) => {
            canvas.toBlob(async (blob) => {
                if (!blob) {
                    resolve(false)
                    return
                }

                try {
                    const data = [new ClipboardItem({ [blob.type]: blob })]
                    await navigator.clipboard.write(data)
                    resolve(true)
                } catch (err) {
                    console.error("Error al copiar la imagen al portapapeles:", err)
                    resolve(false)
                }
            }, "image/png")
        })
    } catch (err) {
        console.error("No se pudo procesar la imagen para copiar:", err)
        return false
    }
}

// Limpio de document.execCommand
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text)
            return true
        }
        console.warn("Clipboard API no está disponible en este entorno.")
        return false
    } catch (err) {
        console.error("Error al copiar texto al portapapeles:", err)
        return false
    }
}

export function isValidUrl(url: string): boolean {
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}

export function looksLikeUrl(text: string): boolean {
    const urlPattern = /^(https?:\/\/|www\.)\S+$/i
    return urlPattern.test(text)
}

export function isSafeUrl(url: string): boolean {
    try {
        const parsed = new URL(url)
        return parsed.protocol === "http:" || parsed.protocol === "https:"
    } catch {
        return false
    }
}

export function validateQRInput(text: string): { valid: boolean; error?: string } {
    const trimmed = text.trim()

    if (!trimmed) {
        return { valid: false, error: "Introduce un texto o URL para generar el QR" }
    }
    if (trimmed.length > 2000) {
        return { valid: false, error: "El texto es demasiado largo (máximo 2000 caracteres)" }
    }
    if (looksLikeUrl(trimmed)) {
        const urlToCheck = trimmed.startsWith("www.") ? `https://${trimmed}` : trimmed
        if (!isValidUrl(urlToCheck)) {
            return { valid: false, error: "La URL no es válida. Ejemplo: https://ejemplo.com" }
        }
        if (!isSafeUrl(urlToCheck)) {
            return { valid: false, error: "Solo se permiten URLs con http o https" }
        }
    }

    return { valid: true }
}