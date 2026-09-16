import { useTranslation } from "react-i18next"
import type { TextFormFieldsProps } from "../../types/types"

export function TextFormFields({ value, onChange, hasError, inputClasses }: TextFormFieldsProps) {
    const { t } = useTranslation()

    return (
        <>
            <h2 className="text-lg font-semibold text-neutral-50">
                {t("form.text.title", "Contenido")}
            </h2>
            <p className="mt-2 text-sm leading-6 text-neutral-400">
                {t("form.text.description", "Introduce una URL o cualquier texto que quieras convertir en QR.")}
            </p>

            <div className="mt-8">
                <label htmlFor="qr-text" className="mb-2 block text-sm font-medium text-neutral-300">
                    {t("form.labels.text", "Texto o URL")}
                </label>
                <input
                    id="qr-text"
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={t("form.placeholders.text", "https://ejemplo.com")}
                    className={inputClasses(hasError)}
                />
            </div>
        </>
    )
}