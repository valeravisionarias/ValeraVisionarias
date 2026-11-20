"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { contactInfo } from "@/lib/contact-info"
import { getSellerWhatsAppMessage, isValidSellerContact, submitSellerLead, trackSellerEvent } from "@/lib/seller-leads"

export default function ContactForm() {
  const [step, setStep] = useState<1 | 2>(1)
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [contactValue, setContactValue] = useState("")
  // El nombre se pide en el paso 1, que se desmonta al pasar al paso 2: lo guardamos en estado
  const [nameValue, setNameValue] = useState("")
  const [contactError, setContactError] = useState("")

  const goToStepTwo = () => {
    if (!isValidSellerContact(contactValue)) {
      setContactError("Necesitamos un teléfono o email válido para enviarte la valoración.")
      return
    }

    setContactError("")
    setStep(2)
    trackSellerEvent("cta_click", { placement: "contact-form", target: "step-2" })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isValidSellerContact(contactValue)) {
      setContactError("Necesitamos un teléfono o email válido para enviarte la valoración.")
      setStep(1)
      return
    }

    setStatus("sending")

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const payload = {
        name: nameValue,
        contacto: contactValue,
        zona: (formData.get("zona") as string) || "No indicada",
        tipo: (formData.get("tipo") as string) || "No indicado",
        timeline: formData.get("timeline") as string,
        reason: formData.get("reason") as string,
        message: formData.get("message") as string,
        source: "contact-form",
      }

      const result = await submitSellerLead(payload)
      if (!result.ok) throw new Error("request_failed")

      trackSellerEvent("lead_form_submit", {
        source: payload.source,
        property_type: payload.tipo,
        form_name: "contact-form",
      })

      setStatus("success")
      setStep(1)
      setContactValue("")
      setNameValue("")
      form.reset()
    } catch {
      // Conservamos lo escrito para que pueda reintentar o usar otra vía de contacto
      setStatus("error")
    }
  }

  return (
    <form
      id="seller-contact-form"
      onSubmit={handleSubmit}
      className="relative space-y-5 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-soft sm:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Valoración de vivienda</p>
          <h3 className="mt-2 text-[30px] font-light leading-tight tracking-[-0.03em] text-black">Cuéntanos lo mínimo para empezar</h3>
        </div>
        <div className="rounded-3xl bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">Paso {step} de 2</div>
      </div>

      {step === 1 ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="cf-name" className="mb-1 block text-sm text-stone-600">Nombre</label>
            <input
              id="cf-name"
              type="text"
              name="name"
              value={nameValue}
              onChange={(event) => setNameValue(event.target.value)}
              autoComplete="given-name"
              placeholder="Cómo te llamas"
              className="w-full rounded-xl border border-black/10 bg-black/[0.03] p-3 text-base focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="cf-contacto" className="mb-1 block text-sm text-stone-600">Teléfono o email *</label>
            <input
              id="cf-contacto"
              type="text"
              name="contacto"
              required
              value={contactValue}
              onChange={(event) => {
                const value = event.target.value
                setContactValue(value)
                if (value.length > 2) {
                  setContactError(isValidSellerContact(value) ? "" : "Necesitamos un teléfono o email válido para enviarte la valoración.")
                } else if (contactError) {
                  setContactError("")
                }
              }}
              placeholder="Ej. 600 123 123 o tu@email.com"
              aria-invalid={Boolean(contactError)}
              aria-describedby={contactError ? "cf-contacto-error" : undefined}
              className="w-full rounded-xl border border-black/10 bg-black/[0.03] p-3 text-base focus:outline-none focus:ring-2 focus:ring-black"
            />
            {contactError ? <p id="cf-contacto-error" className="mt-2 text-sm text-red-600">{contactError}</p> : null}
          </div>

          <div className="rounded-xl bg-stone-100 p-4">
            <p className="text-sm text-stone-700">
              Te enviaremos una primera orientación sin compromiso y te diremos cómo podríamos enfocar la venta.
            </p>
            <p className="mt-2 inline-flex items-center gap-1 text-xs text-stone-600">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Respuesta en menos de 24h y datos protegidos.
            </p>
          </div>

          <button
            type="button"
            onClick={goToStepTwo}
            className="w-full rounded-xl bg-black px-6 py-3 text-white transition hover:bg-stone-800"
          >
            Continuar
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="cf-zona" className="mb-1 block text-sm text-stone-600">Zona o dirección</label>
              <input
                id="cf-zona"
                type="text"
                name="zona"
                autoComplete="street-address"
                placeholder="Ej. Centro, Haygón..."
                className="w-full rounded-xl border border-black/10 bg-black/[0.03] p-3 text-base focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label htmlFor="cf-tipo" className="mb-1 block text-sm text-stone-600">Tipo de vivienda</label>
              <select
                id="cf-tipo"
                name="tipo"
                className="w-full rounded-xl border border-black/10 bg-black/[0.03] p-3 text-base focus:outline-none focus:ring-2 focus:ring-black"
                defaultValue=""
              >
                <option value="">Selecciona</option>
                <option value="piso">Piso</option>
                <option value="atico">Ático</option>
                <option value="chalet">Chalet</option>
                <option value="adosado">Adosado</option>
                <option value="duplex">Dúplex</option>
                <option value="bungalow">Bungalow</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="cf-timeline" className="mb-1 block text-sm text-stone-600">Cuándo te gustaría vender</label>
              <select
                id="cf-timeline"
                name="timeline"
                className="w-full rounded-xl border border-black/10 bg-black/[0.03] p-3 text-base focus:outline-none focus:ring-2 focus:ring-black"
                defaultValue=""
              >
                <option value="">Solo quiero orientación</option>
                <option value="0-30 dias">En menos de 30 días</option>
                <option value="1-3 meses">En 1-3 meses</option>
                <option value="3-6 meses">En 3-6 meses</option>
                <option value="solo valoracion">Estoy comparando opciones</option>
              </select>
            </div>
            <div>
              <label htmlFor="cf-reason" className="mb-1 block text-sm text-stone-600">Motivo de venta</label>
              <select
                id="cf-reason"
                name="reason"
                className="w-full rounded-xl border border-black/10 bg-black/[0.03] p-3 text-base focus:outline-none focus:ring-2 focus:ring-black"
                defaultValue=""
              >
                <option value="">Opcional</option>
                <option value="cambio de vivienda">Cambio de vivienda</option>
                <option value="herencia">Herencia</option>
                <option value="inversion">Inversión</option>
                <option value="traslado">Traslado</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="cf-message" className="mb-1 block text-sm text-stone-600">Detalles adicionales</label>
            <textarea
              id="cf-message"
              name="message"
              rows={4}
              placeholder="Ej. Piso reformado de 3 habitaciones, con ascensor y garaje."
              className="w-full rounded-xl border border-black/10 bg-black/[0.03] p-3 text-base focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 rounded-xl border border-black/15 px-4 py-3 text-black transition hover:bg-stone-50"
            >
              Volver
            </button>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              className="relative flex-1 overflow-hidden rounded-xl bg-black px-6 py-3 text-white transition-all disabled:cursor-not-allowed disabled:opacity-80"
              whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait">
                {status === "sending" ? (
                  <motion.span
                    key="sending"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Enviando...
                  </motion.span>
                ) : status === "success" ? (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    Solicitud enviada
                  </motion.span>
                ) : status === "error" ? (
                  <motion.span
                    key="error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    Error al enviar
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    Recibir valoración
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      )}

      <div aria-live="polite">
        {status === "success" ? (
          <div className="rounded-xl bg-stone-100 p-3 text-sm text-black">
            <p className="font-medium">Hemos recibido tu solicitud.</p>
            <p className="mt-1">
              Revisaremos los datos y te contactaremos por el teléfono o email que nos has indicado para preparar tu
              valoración.
            </p>
          </div>
        ) : null}
        {status === "error" ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            No se ha podido enviar el formulario. Inténtalo de nuevo o escríbenos por{" "}
            <a
              href={`${contactInfo.whatsappHref}?text=${encodeURIComponent(getSellerWhatsAppMessage("contact"))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline"
            >
              WhatsApp
            </a>{" "}
            o llámanos al{" "}
            <a href={contactInfo.phoneHref} className="font-medium underline">
              {contactInfo.phone}
            </a>
            .
          </div>
        ) : null}
      </div>

      <p className="text-xs text-stone-500">
        Sin compromiso. Usaremos tus datos solo para responder a tu solicitud de valoración. Más información en la{" "}
        <Link href="/privacidad" className="underline hover:text-black">
          política de privacidad
        </Link>
        .
      </p>
    </form>
  )
}
