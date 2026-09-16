import { useState, type ChangeEvent } from "react"
import { useTranslation } from "react-i18next"
import { ColorPickerWidget } from "./ColorPickerWidget"
import type {CustomizeAccordionProps} from "../../types/types.ts";
import { Pencil } from 'lucide-react';



export function CustomizeAccordion({
                                       fgColor,
                                       bgColor,
                                       logoUrl,
                                       onFgColorChange,
                                       onBgColorChange,
                                       onLogoChange,
                                       onReset
                                   }: CustomizeAccordionProps) {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)

    const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                onLogoChange(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="mt-4 w-full max-w-sm rounded-xl border border-neutral-200 bg-neutral-50/50 transition dark:border-neutral-800 dark:bg-neutral-950/50">
            {/* Cabecera del acordeón */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between p-3.5 text-xs font-semibold uppercase tracking-wider text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
            >
                <div className="flex items-center gap-2">
                    <Pencil size={16} />
                    <span>{t("preview.customize", "Personalizar aspecto")}</span>
                </div>
                <svg
                    className={`size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </button>

            {/* Contenido desplegable */}
            {isOpen && (
                <div className="border-t border-neutral-200 p-4 space-y-4 dark:border-neutral-800">
                    <ColorPickerWidget
                        fgColor={fgColor}
                        bgColor={bgColor}
                        onFgColorChange={onFgColorChange}
                        onBgColorChange={onBgColorChange}
                        onReset={onReset}
                    />

                    {/* Selector de Logo */}
                    <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800/60">
                        <label className="mb-2 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                            {t("preview.logoLabel", "Logo central")}
                        </label>
                        <div className="flex items-center gap-3">
                            {logoUrl ? (
                                <div className="relative size-10 shrink-0 rounded-lg border border-neutral-300 bg-white p-1 dark:border-neutral-700 dark:bg-neutral-900">
                                    <img src={logoUrl} alt="Logo QR" className="size-full object-contain" />
                                    <button
                                        type="button"
                                        onClick={() => onLogoChange(null)}
                                        className="absolute -top-1.5 -right-1.5 grid size-4 place-items-center rounded-full bg-red-500 text-[10px] text-white hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : null}

                            <label className="cursor-pointer rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800">
                                {logoUrl ? t("preview.changeLogo", "Cambiar logo") : t("preview.addLogo", "Añadir imagen/logo")}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}