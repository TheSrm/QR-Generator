import { useState } from "react"
import type { FormEvent } from "react"
import type { QRFormProps } from "../types/types.ts"
import {validateQRInput} from "../utils/QrUtils.tsx";

function QRForm({ value, onChange, onSubmit }: QRFormProps) {
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Validar antes de generar
        const validation = validateQRInput(value)

        if (!validation.valid) {
            setError(validation.error || "Error de validación")
            return
        }

        // Si es válido, limpiar error y generar
        setError(null)
        onSubmit()
    }

    const handleChange = (newValue: string) => {
        onChange(newValue)
        // Limpiar error cuando el usuario empiece a escribir
        if (error) setError(null)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8"
        >
            <h2 className="text-lg font-semibold text-neutral-50">
                Contenido
            </h2>

            <p className="mt-2 text-sm leading-6 text-neutral-400">
                Introduce una URL o cualquier texto que quieras convertir en QR.
            </p>

            <div className="mt-8">
                <label
                    htmlFor="qr-text"
                    className="mb-2 block text-sm font-medium text-neutral-300"
                >
                    Texto o URL
                </label>

                <input
                    id="qr-text"
                    type="text"
                    value={value}
                    onChange={(event) => handleChange(event.target.value)}
                    placeholder="https://ejemplo.com"
                    className={`w-full rounded-lg border bg-neutral-950 px-4 py-3 text-neutral-50 outline-none transition placeholder:text-neutral-600 focus:ring-4 ${
                        error
                            ? "border-red-800 focus:border-red-600 focus:ring-red-900/30"
                            : "border-neutral-800 focus:border-neutral-600 focus:ring-neutral-800/50"
                    }`}
                />

                {/* Mensaje de error */}
                {error && (
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-red-400">
                        <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        {error}
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="mt-6 w-full rounded-lg bg-neutral-50 px-4 py-3 font-medium text-neutral-950 transition hover:bg-neutral-200 active:bg-neutral-300"
            >
                Generar QR
            </button>
        </form>
    )
}

export default QRForm