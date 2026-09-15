import jsQR from "jsqr"

export function decodeQRFromImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith("image/")) {
            return reject(new Error("Sube un archivo de imagen válido."))
        }

        const reader = new FileReader()

        reader.onload = (e) => {
            const result = e.target?.result as string
            const img = new Image()
            img.crossOrigin = "anonymous"

            img.onload = () => {
                const canvas = document.createElement("canvas")
                const ctx = canvas.getContext("2d")

                canvas.width = img.naturalWidth || img.width
                canvas.height = img.naturalHeight || img.height

                if (!ctx) {
                    return reject(new Error("No se pudo procesar la imagen."))
                }

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
                const code = jsQR(imageData.data, imageData.width, imageData.height)

                if (code && code.data) {
                    resolve(code.data)
                } else {
                    reject(new Error("No se detectó ningún código QR legible en esta imagen."))
                }
            }

            img.onerror = () => reject(new Error("Error al cargar la imagen."))
            img.src = result
        }

        reader.onerror = () => reject(new Error("Error al leer el archivo."))
        reader.readAsDataURL(file)
    })
}