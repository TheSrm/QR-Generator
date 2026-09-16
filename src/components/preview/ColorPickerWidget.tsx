import { useTranslation } from "react-i18next"
import type {ColorPickerProps} from "../../types/types.ts";

const PRESET_COLORS = [
    "#000000",
    "#2563eb",
    "#059669",
    "#dc2626",
    "#7c3aed",
    "#ea580c"
]

export function ColorPickerWidget({
                                      fgColor,
                                      bgColor,
                                      onFgColorChange,
                                      onBgColorChange,
                                      onReset
                                  }: ColorPickerProps) {
    const { t } = useTranslation()

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                    {t("preview.customize", "Personalizar aspecto")}
                </h4>
                <button
                    type="button"
                    onClick={onReset}
                    className="text-[11px] text-neutral-500 transition hover:text-neutral-800 dark:hover:text-neutral-300"
                >
                    {t("preview.resetColors", "Restablecer")}
                </button>
            </div>

            {/* Color del QR */}
            <div>
                <label className="mb-2 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                    {t("preview.fgColor", "Color del QR")}
                </label>
                <div className="flex items-center gap-3">
                    <input
                        type="color"
                        value={fgColor === "transparent" ? "#000000" : fgColor}
                        onChange={(e) => onFgColorChange(e.target.value)}
                        className="size-8 shrink-0 cursor-pointer rounded-lg border-0 bg-transparent p-0"
                    />
                    <div className="flex flex-wrap items-center gap-1.5">
                        {PRESET_COLORS.map((c) => (
                            <button
                                key={c}
                                type="button"
                                onClick={() => onFgColorChange(c)}
                                style={{ backgroundColor: c }}
                                className={`size-5 shrink-0 rounded-full border border-neutral-300 transition hover:scale-110 dark:border-neutral-700 ${
                                    fgColor === c ? "ring-2 ring-neutral-400 ring-offset-1 dark:ring-offset-neutral-950" : ""
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Color de Fondo */}
            <div>
                <label className="mb-2 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                    {t("preview.bgColor", "Color de fondo")}
                </label>
                <div className="flex items-center gap-3">
                    <input
                        type="color"
                        value={bgColor === "transparent" ? "#ffffff" : bgColor}
                        onChange={(e) => onBgColorChange(e.target.value)}
                        className="size-8 shrink-0 cursor-pointer rounded-lg border-0 bg-transparent p-0"
                    />
                    <div className="flex flex-wrap items-center gap-1.5">
                        {PRESET_COLORS.map((c) => (
                            <button
                                key={c}
                                type="button"
                                onClick={() => onFgColorChange(c)}
                                style={{ backgroundColor: c }}
                                className={`size-5 shrink-0 rounded-full border border-neutral-300 transition hover:scale-110 dark:border-neutral-700 ${
                                    fgColor === c ? "ring-2 ring-neutral-400 ring-offset-1 dark:ring-offset-neutral-950" : ""
                                }`}
                            />
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => onBgColorChange("transparent")}
                        className={`rounded-lg border px-3 py-1 text-xs font-medium transition ${
                            bgColor === "transparent"
                                ? "border-neutral-400 bg-neutral-200 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                                : "border-neutral-200 text-neutral-500 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900"
                        }`}
                    >
                        Transparente
                    </button>
                </div>
            </div>
        </div>
    )
}