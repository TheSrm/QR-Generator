/**
 * Convierte un SVG element a PNG y lo descarga
 */
export function downloadQRAsPNG(svgElement: SVGElement, filename?: string): void {
    const svgData = new XMLSerializer().serializeToString(svgElement)
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const svgUrl = URL.createObjectURL(svgBlob)

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
        // 2x para mejor calidad
        canvas.width = img.width * 2
        canvas.height = img.height * 2
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)

        const pngUrl = canvas.toDataURL("image/png")
        const link = document.createElement("a")
        link.download = filename || `qr-${Date.now()}.png`
        link.href = pngUrl
        link.click()

        URL.revokeObjectURL(svgUrl)
    }

    img.src = svgUrl
}

/**
 * Copia texto al portapapeles con fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        // API moderna
        await navigator.clipboard.writeText(text)
        return true
    } catch (err) {
        console.warn("Clipboard API failed, using fallback:", err)

        // Fallback para navegadores antiguos o HTTP
        try {
            const textArea = document.createElement("textarea")
            textArea.value = text
            textArea.style.position = "fixed"
            textArea.style.opacity = "0"
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand("copy")
            document.body.removeChild(textArea)
            return true
        } catch (fallbackErr) {
            console.error("Copy failed:", fallbackErr)
            return false
        }
    }
}

/**
 * Valida si un string es una URL válida
 */
export function isValidUrl(url: string): boolean {
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}

/**
 * Valida si un string parece una URL (empieza con http/https o www)
 */
export function looksLikeUrl(text: string): boolean {
    const urlPattern = /^(https?:\/\/|www\.)[^\s]+$/i
    return urlPattern.test(text)
}

export function isSafeUrl(url: string): boolean {
    try {
        const parsed = new URL(url)
        // Solo permitir http y https
        return parsed.protocol === "http:" || parsed.protocol === "https:"
    } catch {
        return false
    }
}



/**
 * Valida el input del QR
 * Retorna objeto con { valid: boolean, error?: string }
 */
export function validateQRInput(text: string): { valid: boolean; error?: string } {
    // Trim para eliminar espacios al inicio y final
    const trimmed = text.trim()

    // Validación 1: campo vacío
    if (!trimmed) {
        return {
            valid: false,
            error: "Introduce un texto o URL para generar el QR"
        }
    }

    // Validación 2: longitud máxima (evitar URLs gigantes)
    if (trimmed.length > 2000) {
        return {
            valid: false,
            error: "El texto es demasiado largo (máximo 2000 caracteres)"
        }
    }

    // Validación 3: si parece URL, validar formato
    if (looksLikeUrl(trimmed)) {
        // Añadir https:// si empieza con www.
        const urlToCheck = trimmed.startsWith("www.")
            ? `https://${trimmed}`
            : trimmed

        // Validar que sea URL válida
        if (!isValidUrl(urlToCheck)) {
            return {
                valid: false,
                error: "La URL no es válida. Ejemplo: https://ejemplo.com"
            }
        }

        // Validar que use http o https (bloquear javascript:, ftp:, etc.)
        if (!isSafeUrl(urlToCheck)) {
            return {
                valid: false,
                error: "Solo se permiten URLs con http o https"
            }
        }
    }

    // Todo bien
    return { valid: true }
}