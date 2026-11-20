"use client"

import { useEffect, type ReactNode } from "react"
import dynamic from "next/dynamic"
import { ArrowUpRight, MessageCircle, Phone, Mail, MapPin, Navigation, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ContactForm from "@/components/ContactForm"
import SellerMiniForm from "@/components/SellerMiniForm"
import SellerStickyBar from "@/components/SellerStickyBar"
import PromocionBanner from "@/components/PromocionBanner"
import { contactInfo } from "@/lib/contact-info"
import { getSellerWhatsAppMessage, sellerExperiment, setupScrollDepthTracking, trackSellerEvent } from "@/lib/seller-leads"

const AchievementsSection = dynamic(() => import("@/components/achievements-section"))
const SanVicenteSection = dynamic(() => import("@/components/san-vicente-section"))
const FAQSection = dynamic(() => import("@/components/faq-section"))
const ServiciosScroll = dynamic(() => import("@/components/ServiciosScroll"))
const SellingProcess = dynamic(() => import("@/components/SellingProcess"))

export default function ValeraVisionariasLandingClient({
  featuredSlot,
  reviewsSlot,
}: {
  featuredSlot?: ReactNode
  reviewsSlot?: ReactNode
}) {
  useEffect(() => {
    return setupScrollDepthTracking()
  }, [])

  return (
    <>
      <div className="min-h-screen">
        <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-black" aria-labelledby="hero-title">
          <Image
            src="/images/hero-architecture.jpg"
            alt="Viviendas en San Vicente del Raspeig"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/30" aria-hidden="true" />

          <div className="relative z-10 mx-auto w-full max-w-page px-4 pb-28 pt-32 text-white sm:px-6 sm:pb-32 lg:px-10">
            <p className="mb-6 text-xs uppercase tracking-[0.24em] text-white/90">
              Inmobiliaria en San Vicente del Raspeig
            </p>

            <h1
              id="hero-title"
              className="max-w-5xl font-display text-[2.75rem] font-light leading-[0.95] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[96px] lg:leading-[0.9]"
            >
              {sellerExperiment.heroTitle}
              <span className="block text-white/60">{sellerExperiment.heroSubtitle}</span>
            </h1>

            <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-xl text-lg leading-[1.33] text-white/85 sm:text-[23px] sm:leading-[1.25] sm:tracking-[-0.02em]">
                Descubre cuánto puede valer tu vivienda y qué estrategia seguir para vender sin malvender ni perder
                meses.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#seller-contact-form"
                  onClick={() => trackSellerEvent("cta_click", { placement: "hero", target: "seller-contact-form" })}
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-7 text-[15px] text-black shadow-subtle transition-colors hover:bg-stone-100"
                >
                  {sellerExperiment.primaryCta}
                </Link>
                <Link
                  href="#propiedades"
                  onClick={() => trackSellerEvent("cta_click", { placement: "hero-secondary", target: "propiedades" })}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-3xl bg-white/10 px-6 text-[15px] text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <Search className="h-4 w-4" aria-hidden="true" />
                  {sellerExperiment.secondaryCta}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Formulario rápido de valoración, elevado sobre el borde del hero */}
        <div className="relative z-20 mx-auto -mt-16 w-full max-w-page px-4 sm:px-6 lg:px-10">
          <SellerMiniForm />
        </div>


        <section id="propiedades" className="scroll-mt-24 py-24 md:py-32">
          <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
            <div className="mb-12 max-w-3xl sm:mb-16 lg:mb-20">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-stone-500 sm:mb-4">Propiedades destacadas</p>
              <h2 className="section-title mb-4 text-black sm:mb-6">
                Viviendas en San Vicente del Raspeig
              </h2>
              <p className="text-base leading-relaxed text-stone-700 sm:text-lg">
                Una selección de los pisos y casas que tenemos ahora en venta y alquiler en San Vicente del Raspeig y
                alrededores.
              </p>
            </div>

            {featuredSlot ?? <div className="text-stone-600">Sin destacadas por ahora.</div>}

            <PromocionBanner className="mt-14 sm:mt-16" />

            <div className="mt-14 sm:mt-16">
              <Link
                href="/propiedades"
                onClick={() => trackSellerEvent("cta_click", { placement: "properties-section", target: "/propiedades" })}
                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-black px-7 text-[15px] text-white transition-colors hover:bg-stone-800 sm:w-auto"
              >
                Ver todas las propiedades
              </Link>
            </div>
          </div>
        </section>

        <section
          id="servicios"
          className="relative scroll-mt-24 py-24 md:py-32"
        >
          <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
            <ServiciosScroll />

            <div className="mt-24 rounded-2xl bg-stone-100 p-7 shadow-subtle sm:p-9 lg:p-12">
              <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-end">
                <div>
                  <p className="eyebrow mb-4">Herramientas</p>
                  <h3 className="text-3xl font-light leading-[1.1] tracking-[-0.035em] text-black sm:text-4xl">
                    Calculadoras para decidir con datos
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-[1.49] text-stone-600">
                    Calcula tu hipoteca y el ahorro que necesitas, o estima la rentabilidad de un piso en alquiler.
                    Resultados orientativos para comparar escenarios.
                  </p>
                </div>

                <ul className="grid gap-3 sm:grid-cols-2">
                  {[
                    { href: "/simulador-hipoteca", title: "Hipoteca", text: "Cuota y ahorro que necesitas" },
                    { href: "/calculadora-rentabilidad", title: "Rentabilidad", text: "Alquiler bruto y neto" },
                  ].map((tool) => (
                    <li key={tool.href}>
                      <Link
                        href={tool.href}
                        className="group flex h-full flex-col justify-between gap-8 rounded-xl bg-white p-5 shadow-subtle transition-shadow hover:shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                      >
                        <span className="text-[23px] font-light tracking-[-0.03em] text-black">{tool.title}</span>
                        <span className="flex items-center justify-between text-sm text-stone-600">
                          {tool.text}
                          <ArrowUpRight
                            className="h-4 w-4 text-black transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <SellingProcess />

        {reviewsSlot}
        <AchievementsSection />
        <SanVicenteSection />

        <FAQSection />

        <section id="contacto" className="scroll-mt-24 py-24 md:py-32">
          <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <p className="eyebrow mb-4">Contacto para propietarios</p>
                <h2 className="section-title mb-6 text-black sm:mb-8">
                  Recibe una valoración y tu plan de venta
                </h2>
                <p className="mb-10 text-base leading-relaxed text-stone-700 sm:text-lg sm:mb-12">
                  Completa el formulario y revisaremos contigo precio, estrategia comercial y tiempos de venta. Respuesta
                  en menos de 24 horas.
                </p>

                <div className="mb-8 divide-y divide-black/[0.08] border-t border-black/[0.08]">
                  <div className="flex items-start gap-4 py-5">
                    <Phone className="mt-1 h-4 w-4 flex-shrink-0 text-black sm:h-5 sm:w-5" aria-hidden="true" />
                    <div>
                      <p className="mb-1 text-xs text-stone-600 sm:text-sm">Teléfono</p>
                      <a
                        href={contactInfo.phoneHref}
                        className="rounded px-1 text-sm font-medium text-black hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:text-base"
                        aria-label={`Llamar al ${contactInfo.phone}`}
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 py-5">
                    <Mail className="mt-1 h-4 w-4 flex-shrink-0 text-black sm:h-5 sm:w-5" aria-hidden="true" />
                    <div>
                      <p className="mb-1 text-xs text-stone-600 sm:text-sm">Email</p>
                      <a
                        href={contactInfo.emailHref}
                        className="break-all rounded px-1 text-sm font-medium text-black hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:text-base"
                        aria-label={`Enviar email a ${contactInfo.email}`}
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 py-5">
                    <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-black sm:h-5 sm:w-5" aria-hidden="true" />
                    <div>
                      <p className="mb-1 text-xs text-stone-600 sm:text-sm">Oficina</p>
                      <p className="text-sm font-medium text-black sm:text-base">
                        {contactInfo.addressLine1}
                        <br />
                        {contactInfo.addressLine2}
                        <br />
                        {contactInfo.postalCode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 py-5">
                    <MessageCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black sm:h-5 sm:w-5" aria-hidden="true" />
                    <div>
                      <p className="mb-1 text-xs text-stone-600 sm:text-sm">WhatsApp y redes</p>
                      <div className="flex flex-wrap gap-3 text-sm sm:text-base">
                        <a
                          href={`${contactInfo.whatsappHref}?text=${encodeURIComponent(getSellerWhatsAppMessage("contact"))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-black hover:underline"
                          onClick={() => trackSellerEvent("whatsapp_click", { placement: "contact-section" })}
                        >
                          WhatsApp directo
                        </a>
                        <a
                          href={contactInfo.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-black hover:underline"
                        >
                          Instagram
                        </a>
                        <a
                          href={contactInfo.socialLinks.tiktok}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-black hover:underline"
                        >
                          TikTok
                        </a>
                        <a
                          href={contactInfo.socialLinks.idealista}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-black hover:underline"
                        >
                          Idealista
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="!mt-8 rounded-2xl !border-0 bg-stone-100 p-6 shadow-subtle">
                    <p className="mb-1 text-sm font-medium text-black">Horario</p>
                    <p className="text-sm text-stone-700">{contactInfo.hoursSummary}</p>
                    <p className="mt-1 text-sm text-stone-700">{contactInfo.appointmentNote}</p>
                  </div>
                </div>

                <a
                  href={contactInfo.mapsSearchHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver ubicación en Google Maps (se abre en nueva ventana)"
                >
                  <Button
                    variant="outline"
                    className="h-12 w-full rounded-xl border border-black/15 bg-white px-6 text-black shadow-subtle hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:w-auto"
                  >
                    <Navigation className="mr-2 h-4 w-4" aria-hidden="true" />
                    Cómo llegar
                  </Button>
                </a>
              </div>

              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <SellerStickyBar />
      </div>
    </>
  )
}
