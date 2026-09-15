function drawQRToCanvas(svgElement: SVGElement): Promise<HTMLCanvasElement | null> {
    return new Promise((resolve) => {
        const rect = svgElement.getBoundingClientRect()
        const width = rect.width || 240
        const height = rect.height || 240

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

export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text)
        return true
    } catch (err) {
        console.warn("Clipboard API failed, usando fallback:", err)
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

export function isValidUrl(url: string): boolean {
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}

export function looksLikeUrl(text: string): boolean {
    const urlPattern = /^(https?:\/\/|www\.)[^\s]+$/i
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