"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { contactInfo } from "@/lib/contact-info"
import { isValidSellerContact, trackSellerEvent } from "@/lib/seller-leads"
import { ArrowLeft, ArrowRight, Send } from "lucide-react"

// Formulario de valoración en 3 pasos cortos (como hacen los grandes portales):
// 1) la vivienda, 2) sus características, 3) contacto. Así el propietario empieza por lo fácil
// y la responsable recibe los datos mínimos para orientar la primera llamada.
// Se quitaron a propósito orientación y eficiencia energética.

interface FormData {
  zona: string
  tipo: string
  superficie: string
  habitaciones: string
  banos: string
  estado: string
  planta: string
  ascensor: boolean
  garaje: boolean
  terraza: boolean
  piscina: boolean
  exterior: boolean
  anio: string
  name: string
  contacto: string
  message: string
  privacidad: boolean
  hp: string // honeypot antispam
}

type Step = 1 | 2 | 3
type FormErrors = Partial<Record<keyof FormData, string>>

const initialData: FormData = {
  zona: "",
  tipo: "",
  superficie: "",
  habitaciones: "",
  banos: "",
  estado: "",
  planta: "",
  ascensor: false,
  garaje: false,
  terraza: false,
  piscina: false,
  exterior: false,
  anio: "",
  name: "",
  contacto: "",
  message: "",
  privacidad: false,
  hp: "",
}

const selectClass =
  "w-full h-11 sm:h-12 px-3 border border-black/10 rounded-md bg-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"

const stepTitles: Record<Step, string> = {
  1: "Tu vivienda",
  2: "Características",
  3: "¿Cómo te contactamos?",
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="text-xs sm:text-sm text-red-600">
      {message}
    </p>
  )
}

export default function ValoracionesSection() {
  const [step, setStep] = useState<Step>(1)
  const [formData, setFormData] = useState<FormData>(initialData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState<null | { ok: boolean; msg: string }>(null)

  const set = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = (current: Step): boolean => {
    const e: FormErrors = {}
    if (current === 1) {
      if (!formData.zona.trim()) e.zona = "Indica la zona o dirección"
      if (!formData.tipo) e.tipo = "Selecciona el tipo de vivienda"
      if (!formData.habitaciones) e.habitaciones = "Selecciona las habitaciones"
      if (!formData.banos) e.banos = "Selecciona los baños"
    }
    if (current === 2) {
      if (!formData.estado) e.estado = "Selecciona el estado"
      if (!formData.planta) e.planta = "Selecciona la planta"
    }
    if (current === 3) {
      if (!isValidSellerContact(formData.contacto)) e.contacto = "Introduce un teléfono o email válido"
      if (!formData.privacidad) e.privacidad = "Necesitamos tu permiso para responderte"
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (!validate(step)) return
    const nextStep = (step + 1) as Step
    setStep(nextStep)
    trackSellerEvent("cta_click", { placement: "pagina-valoraciones", target: `step-${nextStep}` })
  }

  const back = () => {
    setErrors({})
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSent(null)
    if (step !== 3) {
      next()
      return
    }
    if (!validate(3)) return

    // Honeypot: si un robot rellena el campo oculto, fingimos éxito sin enviar
    if (formData.hp) {
      setSent({ ok: true, msg: "¡Solicitud enviada!" })
      return
    }

    setSubmitting(true)
    try {
      const { privacidad, ...payload } = formData
      const res = await fetch("/api/valoraciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source: "pagina-valoraciones" }),
      })
      if (!res.ok) throw new Error("request_failed")

      trackSellerEvent("lead_form_submit", {
        source: "pagina-valoraciones",
        property_type: formData.tipo,
        form_name: "pagina-valoraciones",
      })
      setSent({
        ok: true,
        msg: "¡Solicitud enviada! Revisaremos los datos de tu vivienda y te contactaremos para explicarte la valoración.",
      })
      setFormData(initialData)
      setStep(1)
    } catch {
      setSent({ ok: false, msg: `No se ha podido enviar. Inténtalo de nuevo o llámanos al ${contactInfo.phone}.` })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
        <div className="mb-10 sm:mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-3 sm:mb-4">Valoración gratuita</p>
          <h1 className="page-title text-black mb-4 sm:mb-6 text-balance">
            ¿Cuánto vale tu vivienda en San Vicente del Raspeig?
          </h1>
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
            Cuéntanos cómo es tu vivienda en tres pasos rápidos y te prepararemos una valoración orientativa según el
            mercado de la zona, sin coste y sin compromiso.
          </p>
        </div>

        <Card className="border border-black/[0.08] bg-white">
          <CardContent className="p-6 sm:p-8 lg:p-12">
            {/* Progreso */}
            <div className="mb-8">
              <div className="flex items-center justify-between gap-4 mb-3">
                <h2 className="text-xl sm:text-2xl font-light text-black">{stepTitles[step]}</h2>
                <span className="rounded-3xl bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600 whitespace-nowrap">
                  Paso {step} de 3
                </span>
              </div>
              <div className="h-1 w-full rounded-full bg-stone-100" aria-hidden="true">
                <div
                  className="h-1 rounded-full bg-black transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={onSubmit} noValidate className="space-y-6">
              {/* Honeypot oculto */}
              <input
                type="text"
                name="website"
                aria-hidden
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                value={formData.hp}
                onChange={(e) => set("hp", e.target.value)}
              />

              {step === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="zona" className="text-xs sm:text-sm text-stone-700">Zona o dirección *</Label>
                    <Input
                      id="zona"
                      autoComplete="street-address"
                      placeholder="Ej: Haygón, cerca de la UA, San Vicente"
                      value={formData.zona}
                      onChange={(e) => set("zona", e.target.value)}
                      aria-invalid={Boolean(errors.zona)}
                      aria-describedby={errors.zona ? "zona-error" : undefined}
                      className={`h-11 sm:h-12 border-black/10 text-sm sm:text-base ${errors.zona ? "border-red-500" : ""}`}
                    />
                    <FieldError id="zona-error" message={errors.zona} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="tipo" className="text-xs sm:text-sm text-stone-700">Tipo de vivienda *</Label>
                      <select
                        id="tipo"
                        value={formData.tipo}
                        onChange={(e) => set("tipo", e.target.value)}
                        aria-invalid={Boolean(errors.tipo)}
                        aria-describedby={errors.tipo ? "tipo-error" : undefined}
                        className={`${selectClass} ${errors.tipo ? "border-red-500" : ""}`}
                      >
                        <option value="">Selecciona</option>
                        <option value="piso">Piso</option>
                        <option value="atico">Ático</option>
                        <option value="duplex">Dúplex</option>
                        <option value="bungalow">Bungalow</option>
                        <option value="adosado">Adosado</option>
                        <option value="chalet">Chalet</option>
                        <option value="estudio">Estudio</option>
                        <option value="otro">Otro</option>
                      </select>
                      <FieldError id="tipo-error" message={errors.tipo} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="superficie" className="text-xs sm:text-sm text-stone-700">
                        Superficie aproximada (m²)
                      </Label>
                      <Input
                        id="superficie"
                        type="number"
                        inputMode="numeric"
                        min={10}
                        placeholder="Si no la sabes, déjalo en blanco"
                        value={formData.superficie}
                        onChange={(e) => set("superficie", e.target.value)}
                        className="h-11 sm:h-12 border-black/10 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="habitaciones" className="text-xs sm:text-sm text-stone-700">Habitaciones *</Label>
                      <select
                        id="habitaciones"
                        value={formData.habitaciones}
                        onChange={(e) => set("habitaciones", e.target.value)}
                        aria-invalid={Boolean(errors.habitaciones)}
                        aria-describedby={errors.habitaciones ? "habitaciones-error" : undefined}
                        className={`${selectClass} ${errors.habitaciones ? "border-red-500" : ""}`}
                      >
                        <option value="">Selecciona</option>
                        <option value="0">Sin habitaciones (estudio)</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5 o más">5 o más</option>
                      </select>
                      <FieldError id="habitaciones-error" message={errors.habitaciones} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="banos" className="text-xs sm:text-sm text-stone-700">Baños *</Label>
                      <select
                        id="banos"
                        value={formData.banos}
                        onChange={(e) => set("banos", e.target.value)}
                        aria-invalid={Boolean(errors.banos)}
                        aria-describedby={errors.banos ? "banos-error" : undefined}
                        className={`${selectClass} ${errors.banos ? "border-red-500" : ""}`}
                      >
                        <option value="">Selecciona</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4 o más">4 o más</option>
                      </select>
                      <FieldError id="banos-error" message={errors.banos} />
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="estado" className="text-xs sm:text-sm text-stone-700">Estado *</Label>
                      <select
                        id="estado"
                        value={formData.estado}
                        onChange={(e) => set("estado", e.target.value)}
                        aria-invalid={Boolean(errors.estado)}
                        aria-describedby={errors.estado ? "estado-error" : undefined}
                        className={`${selectClass} ${errors.estado ? "border-red-500" : ""}`}
                      >
                        <option value="">Selecciona</option>
                        <option value="nuevo">Nuevo o seminuevo</option>
                        <option value="reformado">Reformado</option>
                        <option value="bueno">Buen estado</option>
                        <option value="a reformar">Necesita reforma</option>
                      </select>
                      <FieldError id="estado-error" message={errors.estado} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="planta" className="text-xs sm:text-sm text-stone-700">Planta *</Label>
                      <select
                        id="planta"
                        value={formData.planta}
                        onChange={(e) => set("planta", e.target.value)}
                        aria-invalid={Boolean(errors.planta)}
                        aria-describedby={errors.planta ? "planta-error" : undefined}
                        className={`${selectClass} ${errors.planta ? "border-red-500" : ""}`}
                      >
                        <option value="">Selecciona</option>
                        <option value="bajo">Bajo</option>
                        <option value="1">1ª</option>
                        <option value="2">2ª</option>
                        <option value="3">3ª</option>
                        <option value="4">4ª</option>
                        <option value="5 o más">5ª o más</option>
                        <option value="casa">Es una casa (no tiene planta)</option>
                      </select>
                      <FieldError id="planta-error" message={errors.planta} />
                    </div>
                  </div>

                  <fieldset className="space-y-3">
                    <legend className="text-xs sm:text-sm text-stone-700 mb-1">Marca lo que tenga tu vivienda</legend>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {(
                        [
                          ["ascensor", "Ascensor"],
                          ["garaje", "Garaje"],
                          ["terraza", "Terraza o balcón"],
                          ["piscina", "Piscina"],
                          ["exterior", "Exterior"],
                        ] as const
                      ).map(([field, label]) => (
                        <label
                          key={field}
                          htmlFor={field}
                          className="flex items-center gap-3 rounded-md border border-black/10 px-3 py-3 cursor-pointer hover:bg-stone-50"
                        >
                          <Checkbox
                            id={field}
                            checked={formData[field]}
                            onCheckedChange={(v) => set(field, v === true)}
                          />
                          <span className="text-sm text-stone-800">{label}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="space-y-2">
                    <Label htmlFor="anio" className="text-xs sm:text-sm text-stone-700">
                      Año de construcción (aproximado)
                    </Label>
                    <Input
                      id="anio"
                      inputMode="numeric"
                      placeholder="Ej: 1998, o «años 80». Si no lo sabes, déjalo en blanco"
                      value={formData.anio}
                      onChange={(e) => set("anio", e.target.value)}
                      className="h-11 sm:h-12 border-black/10 text-sm sm:text-base"
                    />
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs sm:text-sm text-stone-700">Nombre</Label>
                      <Input
                        id="name"
                        autoComplete="given-name"
                        placeholder="Cómo te llamas"
                        value={formData.name}
                        onChange={(e) => set("name", e.target.value)}
                        className="h-11 sm:h-12 border-black/10 text-sm sm:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contacto" className="text-xs sm:text-sm text-stone-700">Teléfono o email *</Label>
                      <Input
                        id="contacto"
                        autoComplete="tel"
                        placeholder="600 123 123 o tu@email.com"
                        value={formData.contacto}
                        onChange={(e) => set("contacto", e.target.value)}
                        aria-invalid={Boolean(errors.contacto)}
                        aria-describedby={errors.contacto ? "contacto-error" : undefined}
                        className={`h-11 sm:h-12 border-black/10 text-sm sm:text-base ${errors.contacto ? "border-red-500" : ""}`}
                      />
                      <FieldError id="contacto-error" message={errors.contacto} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-xs sm:text-sm text-stone-700">
                      ¿Algo más que quieras contarnos? (opcional)
                    </Label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Ej: tiene trastero, está alquilado, mejor llamar por la tarde…"
                      value={formData.message}
                      onChange={(e) => set("message", e.target.value)}
                      className="w-full rounded-md border border-black/10 p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="privacidad" className="flex items-start gap-3 cursor-pointer">
                      <Checkbox
                        id="privacidad"
                        checked={formData.privacidad}
                        onCheckedChange={(v) => set("privacidad", v === true)}
                        aria-invalid={Boolean(errors.privacidad)}
                        aria-describedby={errors.privacidad ? "privacidad-error" : undefined}
                        className="mt-0.5"
                      />
                      <span className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        He leído y acepto la{" "}
                        <Link href="/privacidad" className="underline hover:text-black" target="_blank">
                          política de privacidad
                        </Link>
                        . Usaremos tus datos solo para responder a tu solicitud de valoración. *
                      </span>
                    </label>
                    <FieldError id="privacidad-error" message={errors.privacidad} />
                  </div>
                </>
              )}

              {/* Botones */}
              <div className="flex gap-3 pt-2">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={back}
                    className="h-12 sm:h-14 flex-1 border-black/15 text-sm sm:text-base"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                    Volver
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={next}
                    className="h-12 sm:h-14 flex-[2] bg-black hover:bg-stone-800 text-white text-sm sm:text-base"
                  >
                    Continuar
                    <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="h-12 sm:h-14 flex-[2] bg-black hover:bg-stone-800 text-white text-sm sm:text-base"
                  >
                    <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                    {submitting ? "Enviando…" : "Solicitar valoración"}
                  </Button>
                )}
              </div>

              <div aria-live="polite">
                {sent && (
                  <div
                    className={`rounded-xl p-4 text-sm ${
                      sent.ok ? "bg-stone-100 text-black" : "border border-red-200 bg-red-50 text-red-800"
                    }`}
                  >
                    {sent.msg}
                  </div>
                )}
              </div>

              <p className="text-xs text-center text-stone-500 leading-relaxed">
                Sin compromiso. La valoración es orientativa y no sustituye a una tasación oficial.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
