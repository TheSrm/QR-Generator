import { useState, type ChangeEvent, type DragEvent } from "react"
import { useTranslation } from "react-i18next"
import type { QRReaderProps } from "../types/types.ts"
import { decodeQRFromImage } from "../utils/QRDecoderUtils"

function QRReader({ onResult }: QRReaderProps) {
    const { t } = useTranslation()
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleProcessFile = async (file: File) => {
        setError(null)
        setPreviewUrl(URL.createObjectURL(file))

        try {
            const decodedText = await decodeQRFromImage(file)
            onResult(decodedText)
        } catch (err) {
            onResult("")
            setError(err instanceof Error ? err.message : t("reader.errorProcess", "Error al procesar la imagen"))
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleProcessFile(file)
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const file = e.dataTransfer.files?.[0]
        if (file) handleProcessFile(file)
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                {t("reader.title", "Leer Código QR")}
            </h2>
            <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                {t("reader.description", "Sube o arrastra una imagen con un código QR para extraer su contenido.")}
            </p>

            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-center transition hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-950 dark:hover:border-neutral-500"
            >
                {previewUrl ? (
                    <img src={previewUrl} alt={t("reader.uploadedAlt", "QR subido")} className="max-h-40 rounded-lg object-contain" />
                ) : (
                    <svg className="size-8 text-neutral-400 dark:text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                )}

                <label htmlFor="qr-file" className="mt-4 cursor-pointer rounded-lg bg-neutral-200 px-4 py-2 text-xs font-medium text-neutral-800 transition hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700">
                    {previewUrl ? t("reader.changeImage", "Cambiar imagen") : t("reader.selectImage", "Seleccionar imagen")}
                </label>
                <input id="qr-file" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>

            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
    )
}

export default QRReader