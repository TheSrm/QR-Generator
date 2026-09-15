import type { VCardFormFieldsProps } from "../../types/types"

export function VCardFormFields({ vCardData, onVCardChange, hasError, inputClasses }: VCardFormFieldsProps) {
    return (
        <>
            <h2 className="text-lg font-semibold text-neutral-50">Tarjeta de Contacto</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-400">
                Genera un QR para añadir un contacto directamente a la agenda del móvil.
            </p>

            <div className="mt-6 space-y-4">
                <div>
                    <label htmlFor="vcard-name" className="mb-1 block text-sm font-medium text-neutral-300">
                        Nombre completo *
                    </label>
                    <input
                        id="vcard-name"
                        type="text"
                        value={vCardData.name}
                        onChange={(e) => onVCardChange("name", e.target.value)}
                        placeholder="Ej. Ana Martínez"
                        className={inputClasses(hasError)}
                    />
                </div>

                <div>
                    <label htmlFor="vcard-phone" className="mb-1 block text-sm font-medium text-neutral-300">
                        Teléfono
                    </label>
                    <input
                        id="vcard-phone"
                        type="tel"
                        value={vCardData.phone}
                        onChange={(e) => onVCardChange("phone", e.target.value)}
                        placeholder="+34 600 000 000"
                        className={inputClasses(false)}
                    />
                </div>

                <div>
                    <label htmlFor="vcard-email" className="mb-1 block text-sm font-medium text-neutral-300">
                        Email
                    </label>
                    <input
                        id="vcard-email"
                        type="email"
                        value={vCardData.email}
                        onChange={(e) => onVCardChange("email", e.target.value)}
                        placeholder="ana@empresa.com"
                        className={inputClasses(false)}
                    />
                </div>

                <div>
                    <label htmlFor="vcard-company" className="mb-1 block text-sm font-medium text-neutral-300">
                        Empresa
                    </label>
                    <input
                        id="vcard-company"
                        type="text"
                        value={vCardData.company}
                        onChange={(e) => onVCardChange("company", e.target.value)}
                        placeholder="Mi Empresa S.L."
                        className={inputClasses(false)}
                    />
                </div>
            </div>
        </>
    )
}