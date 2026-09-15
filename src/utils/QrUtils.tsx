/**
 * Convierte un SVG element a PNG y lo descarga con fondo visible y alta resolución
 *//**
 * Función auxiliar interna: convierte un SVG Element a un HTMLCanvasElement renderizado.
 */
function drawQRToCanvas(svgElement: SVGElement): Promise<HTMLCanvasElement | null> {
    return new Promise((resolve) => {
        const rect = svgElement.getBoundingClientRect()
        const width = rect.width || 240
        const height = rect.height || 240

        // Clonar e inyectar atributos explícitos de ancho y alto
        const svgCloned = svgElement.cloneNode(true) as SVGElement
        svgCloned.setAttribute("width", width.toString())
        svgCloned.setAttribute("height", height.toString())

        const svgData = new XMLSerializer().serializeToString(svgCloned)
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
        const svgUrl = URL.createObjectURL(svgBlob)

        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        const img = new Image()

        img.onload = () => {
            const scale = 2
            canvas.width = width * scale
            canvas.height = height * scale

            if (ctx) {
                // Fondo oscuro para contrastar los módulos del QR
                ctx.fillStyle = "#0a0a0a"
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            }

            URL.revokeObjectURL(svgUrl)
            resolve(canvas)
        }

        img.onerror = () => {
            URL.revokeObjectURL(svgUrl)
            resolve(null)
        }

        img.src = svgUrl
    })
}

/**
 * Convierte un SVG element a PNG y lo descarga
 */
export async function downloadQRAsPNG(svgElement: SVGElement, filename?: string): Promise<void> {
    const canvas = await drawQRToCanvas(svgElement)
    if (!canvas) return

    const pngUrl = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = filename || `qr-${Date.now()}.png`
    link.href = pngUrl
    link.click()
}

/**
 * Convierte el elemento SVG del QR a un Blob PNG y lo copia al portapapeles
 */
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