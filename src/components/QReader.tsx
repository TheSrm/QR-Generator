import { useState, type ChangeEvent, type DragEvent } from "react"
import jsQR from "jsqr"

type QRReaderProps = {
    onResult: (result: string) => void
}

function QRReader({ onResult }: QRReaderProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const processImage = (file: File) => {
        if (!file.type.startsWith("image/")) {
            setError("Sube un archivo de imagen válido.")
            return
        }

        setError(null)
        const reader = new FileReader()

        reader.onload = (e) => {
            const result = e.target?.result as string
            setPreviewUrl(result)

            const img = new Image()
            img.crossOrigin = "anonymous"

            img.onload = () => {
                const canvas = document.createElement("canvas")
                const ctx = canvas.getContext("2d")

                canvas.width = img.naturalWidth || img.width
                canvas.height = img.naturalHeight || img.height

                if (!ctx) return

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
                const code = jsQR(imageData.data, imageData.width, imageData.height)

                if (code && code.data) {
                    onResult(code.data)
                } else {
                    onResult("")
                    setError("No se detectó ningún código QR legible en esta imagen.")
                }
            }

            img.src = result
        }

        reader.readAsDataURL(file)
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) processImage(file)
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const file = e.dataTransfer.files?.[0]
        if (file) processImage(file)
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-neutral-50">Leer Código QR</h2>
            <p className="text-sm leading-6 text-neutral-400">
                Sube o arrastra una imagen con un código QR para extraer su contenido.
            </p>

            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-700 bg-neutral-950 p-6 text-center transition hover:border-neutral-500"
            >
                {previewUrl ? (
                    <img src={previewUrl} alt="QR subido" className="max-h-40 rounded-lg object-contain" />
                ) : (
                    <svg className="size-8 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                )}

                <label htmlFor="qr-file" className="mt-4 cursor-pointer rounded-lg bg-neutral-800 px-4 py-2 text-xs font-medium text-neutral-200 transition hover:bg-neutral-700">
                    {previewUrl ? "Cambiar imagen" : "Seleccionar imagen"}
                </label>
                <input id="qr-file" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
    )
}

export default QRReader