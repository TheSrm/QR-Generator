import { useTranslation } from "react-i18next"
import type { VCardCardProps } from "../../types/types"

export function VCardCard({ contact }: VCardCardProps) {
    const { t } = useTranslation()

    return (
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6 shadow-inner">
            <div className="flex items-center gap-4">
                <div className="grid size-12 place-items-center rounded-full bg-neutral-800 text-lg font-semibold text-neutral-200">
                    {contact.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3 className="text-base font-semibold text-neutral-50">{contact.name}</h3>
                    {contact.company && <p className="text-xs text-neutral-400">{contact.company}</p>}
                </div>
            </div>
            <div className="mt-5 space-y-3 divide-y divide-neutral-900 text-xs">
                {contact.phone && (
                    <div className="flex items-center justify-between pt-2 text-neutral-300">
                        <span className="text-neutral-500">{t("form.labels.phone", "Teléfono")}:</span>
                        <span className="font-mono">{contact.phone}</span>
                    </div>
                )}
                {contact.email && (
                    <div className="flex items-center justify-between pt-2 text-neutral-300">
                        <span className="text-neutral-500">{t("form.labels.email", "Email")}:</span>
                        <span className="font-mono">{contact.email}</span>
                    </div>
                )}
            </div>
        </div>
    )
}