import { useTranslation } from "react-i18next"
import type { VCardFormFieldsProps } from "../../types/types"

export function VCardFormFields({ vCardData, onVCardChange, hasError, inputClasses }: VCardFormFieldsProps) {
    const { t } = useTranslation()

    return (
        <>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                {t("form.vcard.title", "Tarjeta de Contacto")}
            </h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                {t("form.vcard.description", "Genera un QR para añadir un contacto directamente a la agenda del móvil.")}
            </p>

            <div className="mt-6 space-y-4">
                <div>
                    <label htmlFor="vcard-name" className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {t("form.labels.name", "Nombre completo")} *
                    </label>
                    <input
                        id="vcard-name"
                        type="text"
                        value={vCardData.name}
                        onChange={(e) => onVCardChange("name", e.target.value)}
                        placeholder={t("form.placeholders.name", "Ej. Ana Martínez")}
                        className={inputClasses(hasError)}
                    />
                </div>

                <div>
                    <label htmlFor="vcard-phone" className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {t("form.labels.phone", "Teléfono")}
                    </label>
                    <input
                        id="vcard-phone"
                        type="tel"
                        value={vCardData.phone}
                        onChange={(e) => onVCardChange("phone", e.target.value)}
                        placeholder={t("form.placeholders.phone", "+34 600 000 000")}
                        className={inputClasses(false)}
                    />
                </div>

                <div>
                    <label htmlFor="vcard-email" className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {t("form.labels.email", "Email")}
                    </label>
                    <input
                        id="vcard-email"
                        type="email"
                        value={vCardData.email}
                        onChange={(e) => onVCardChange("email", e.target.value)}
                        placeholder={t("form.placeholders.email", "ana@empresa.com")}
                        className={inputClasses(false)}
                    />
                </div>

                <div>
                    <label htmlFor="vcard-company" className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {t("form.labels.company", "Empresa")}
                    </label>
                    <input
                        id="vcard-company"
                        type="text"
                        value={vCardData.company}
                        onChange={(e) => onVCardChange("company", e.target.value)}
                        placeholder={t("form.placeholders.company", "Mi Empresa S.L.")}
                        className={inputClasses(false)}
                    />
                </div>
            </div>
        </>
    )
}