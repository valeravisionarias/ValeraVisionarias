import { NextResponse } from "next/server"
import { Resend } from "resend"
import { escapeHtml } from "@/lib/escape-html"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const form = await req.json()

    if (form.hp && form.hp.length > 0) {
      return NextResponse.json({ success: true })
    }

    if (!form.contacto) {
      return NextResponse.json({ error: "Falta el dato de contacto" }, { status: 400 })
    }

    const safeZone = escapeHtml(form.zona || "No indicada")
    const safeType = escapeHtml(form.tipo || "No indicado")

    const html = `
      <h2>Nueva solicitud de valoracion</h2>
      <p><strong>Zona:</strong> ${safeZone}</p>
      <p><strong>Tipo:</strong> ${safeType}</p>
      <p><strong>Nombre:</strong> ${escapeHtml(form.name || "-")}</p>
      <p><strong>Superficie aprox.:</strong> ${form.superficie ? `${escapeHtml(form.superficie)} m2` : "No indicada"}</p>
      <p><strong>Habitaciones:</strong> ${escapeHtml(form.habitaciones || "-")}</p>
      <p><strong>Banos:</strong> ${escapeHtml(form.banos || "-")}</p>
      <p><strong>Estado:</strong> ${escapeHtml(form.estado || "-")}</p>
      <p><strong>Planta:</strong> ${escapeHtml(form.planta || "-")}</p>
      <p><strong>Ascensor:</strong> ${form.ascensor ? "Si" : "No"}</p>
      <p><strong>Garaje:</strong> ${form.garaje ? "Si" : "No"}</p>
      <p><strong>Terraza o balcon:</strong> ${form.terraza ? "Si" : "No"}</p>
      <p><strong>Piscina:</strong> ${form.piscina ? "Si" : "No"}</p>
      <p><strong>Exterior:</strong> ${form.exterior ? "Si" : "No"}</p>
      <p><strong>Ano de construccion (aprox.):</strong> ${escapeHtml(form.anio || "No indicado")}</p>
      <p><strong>Plazo estimado:</strong> ${escapeHtml(form.timeline || "-")}</p>
      <p><strong>Motivo de venta:</strong> ${escapeHtml(form.reason || "-")}</p>
      <p><strong>Mensaje:</strong> ${escapeHtml(form.message || "-")}</p>
      <p><strong>Origen:</strong> ${escapeHtml(form.source || "web")}</p>
      <hr style="margin:12px 0;border:none;border-top:1px solid #ddd;">
      <p><strong>Contacto:</strong> ${escapeHtml(form.contacto)}</p>
    `

    const { error: sendError } = await resend.emails.send({
      from: "Valera Visionarias <inmobiliaria@valeravisionarias.com>",
      to: "valeravisionarias@gmail.com",
      subject: `Nueva valoracion: ${safeType} en ${safeZone}`,
      html,
    })

    // Resend no lanza excepción si falla el envío: lo comprobamos para no perder el contacto
    if (sendError) throw sendError

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al enviar el correo:", error)
    return NextResponse.json({ error: "Error al enviar el correo" }, { status: 500 })
  }
}
