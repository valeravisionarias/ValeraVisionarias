import type { Metadata } from "next"
import Image from "next/image"
import dynamic from "next/dynamic"
import { contactInfo } from "@/lib/contact-info"
import { SITE_URL } from "@/lib/site"

const ContactForm = dynamic(() => import("@/components/ContactForm"), { ssr: false })

export const metadata: Metadata = {
  title: "Contacto: inmobiliaria en San Vicente del Raspeig",
  description:
    "Llama, escribe o visita Valera Visionarias en Avenida Ancha de Castelar 46-48, San Vicente del Raspeig (Alicante). Te atendemos con cita previa para vender, comprar o valorar tu vivienda.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto | Valera Visionarias",
    description:
      "Oficina en San Vicente del Raspeig. Escríbenos para vender, comprar o valorar tu vivienda.",
    url: "/contacto",
  },
}

export default function ContactoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contacto | Valera Visionarias",
            url: `${SITE_URL}/contacto`,
            mainEntity: { "@id": `${SITE_URL}/#organization` },
          }),
        }}
      />

      <section className="relative overflow-hidden">
        <div className="relative h-[280px] sm:h-[360px]">
          <Image
            src="/images/hero-architecture.jpg"
            alt="Arquitectura en San Vicente del Raspeig"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex h-full items-center justify-center">
            <h1 className="page-title text-white">Contacto</h1>
          </div>
        </div>

        <div className="mx-auto max-w-page px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-stone-500">Escríbenos</p>
              <h2 className="section-title mb-4 text-black">
                Comencemos tu proyecto inmobiliario
              </h2>
              <p className="mb-8 text-stone-700">
                Completa el formulario y te responderemos en menos de 24 horas. También puedes llamarnos, escribirnos
                por email o contactar por WhatsApp.
              </p>

              <ul className="space-y-4 text-sm text-stone-800">
                <li>
                  <strong>Teléfono:</strong>{" "}
                  <a className="underline" href={contactInfo.phoneHref}>
                    {contactInfo.phone}
                  </a>
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  <a className="break-all underline" href={contactInfo.emailHref}>
                    {contactInfo.email}
                  </a>
                </li>
                <li>
                  <strong>Dirección:</strong> {contactInfo.fullAddress}
                </li>
                <li>
                  <strong>WhatsApp:</strong>{" "}
                  <a className="underline" href={contactInfo.whatsappHref} target="_blank" rel="noopener noreferrer">
                    Contacto directo
                  </a>
                </li>
                <li>
                  <strong>Redes:</strong>{" "}
                  <a className="underline" href={contactInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>{" "}
                  ·{" "}
                  <a className="underline" href={contactInfo.socialLinks.tiktok} target="_blank" rel="noopener noreferrer">
                    TikTok
                  </a>{" "}
                  ·{" "}
                  <a className="underline" href={contactInfo.socialLinks.idealista} target="_blank" rel="noopener noreferrer">
                    Idealista
                  </a>
                </li>
              </ul>

              <div className="mt-8 text-sm leading-relaxed text-stone-700">
                <h3 className="mb-2 font-semibold text-black">Horario</h3>
                <ul className="space-y-1 text-stone-600">
                  <li>Lunes a viernes: 9:00-20:00</li>
                  <li>Sábado: 9:00-14:00</li>
                  <li>Domingo: Cerrado</li>
                  <li>Te atendemos con cita previa, para dedicarte todo el tiempo que necesites</li>
                </ul>
              </div>

              <div className="mt-8 overflow-hidden rounded-xl border border-black/[0.08]">
                <iframe
                  title="Ubicación de la oficina de Valera Visionarias en San Vicente del Raspeig"
                  className="h-[280px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={contactInfo.mapsEmbedSrc}
                />
              </div>
              <p className="mt-3 text-sm text-stone-600">
                {contactInfo.fullAddress} ·{" "}
                <a className="text-black underline underline-offset-2" href={contactInfo.mapsDirectionsHref} target="_blank" rel="noopener noreferrer">
                  Cómo llegar
                </a>
              </p>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
