import { useTranslation } from "react-i18next"
import type { TextCardProps } from "../../types/types"

export function TextCard({ text }: TextCardProps) {
    const { t } = useTranslation()

    return (
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 text-left dark:border-neutral-800 dark:bg-neutral-950">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                {t("scanned.cards.extractedText", "Texto Extraído")}
            </h3>
            <p className="mt-3 max-h-48 overflow-y-auto whitespace-pre-wrap break-all font-mono text-sm text-neutral-800 dark:text-neutral-200">
                {text}
            </p>
        </div>
    )
}