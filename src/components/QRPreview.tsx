import { QRCodeSVG } from "qrcode.react"
import type {QRPreviewProps} from "../types/types.ts";

function QRPreview({ value }: QRPreviewProps) {
    if (!value) {
        return null
    }

    return (
        <div>
            <QRCodeSVG value={value} />
        </div>
    )
}

export default QRPreview