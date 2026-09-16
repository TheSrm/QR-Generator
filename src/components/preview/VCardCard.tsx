import { useTranslation } from "react-i18next"
import type { VCardCardProps } from "../../types/types"

export function VCardCard({ contact }: VCardCardProps) {
    const { t } = useTranslation()

    return (
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 text-left shadow-inner dark:border-neutral-800 dark:bg-neutral-950">
            <div className="flex items-center gap-4">
                <div className="grid size-12 place-items-center rounded-full bg-neutral-200 text-lg font-semibold text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                    {contact.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-50">{contact.name}</h3>
                    {contact.company && <p className="text-xs text-neutral-500 dark:text-neutral-400">{contact.company}</p>}
                </div>
            </div>
            <div className="mt-5 space-y-3 divide-y divide-neutral-200 text-xs dark:divide-neutral-900">
                {contact.phone && (
                    <div className="flex items-center justify-between pt-2 text-neutral-700 dark:text-neutral-300">
                        <span className="text-neutral-500">{t("form.labels.phone", "Teléfono")}:</span>
                        <span className="font-mono">{contact.phone}</span>
                    </div>
                )}
                {contact.email && (
                    <div className="flex items-center justify-between pt-2 text-neutral-700 dark:text-neutral-300">
                        <span className="text-neutral-500">{t("form.labels.email", "Email")}:</span>
                        <span className="font-mono">{contact.email}</span>
                    </div>
                )}
            </div>
        </div>
    )
}