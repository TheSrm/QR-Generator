export function drawQRToCanvas(svgElement: SVGElement): Promise<HTMLCanvasElement | null> {
    return new Promise((resolve) => {
        const rect = svgElement.getBoundingClientRect()
        const width = rect.width || 240
        const height = rect.height || 240

        const svgCloned = svgElement.cloneNode(true) as SVGElement
        svgCloned.setAttribute("width", width.toString())
        svgCloned.setAttribute("height", height.toString())

        const svgData = new XMLSerializer().serializeToString(svgCloned)
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
        const svgUrl = URL.createObjectURL(svgBlob)

        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        const img = new Image()

        img.onload = () => {
            const scale = 2
            canvas.width = width * scale
            canvas.height = height * scale

            if (ctx) {
                ctx.fillStyle = "#0a0a0a"
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            }

            URL.revokeObjectURL(svgUrl)
            resolve(canvas)
        }

        img.onerror = () => {
            URL.revokeObjectURL(svgUrl)
            resolve(null)
        }

        img.src = svgUrl
    })
}