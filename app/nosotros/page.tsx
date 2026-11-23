import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Heart, Users, Target, Shield, MapPin } from "lucide-react"
import MobileNav from "@/components/mobile-nav"
import SkipToContent from "@/components/skip-to-content"
import type { Metadata } from "next"
import OfficeGallery from "./OfficeGallery"
import { officeImages } from "./office-images"
import { contactInfo } from "@/lib/contact-info"

export const metadata: Metadata = {
  title: "Quiénes somos: tu inmobiliaria en San Vicente del Raspeig",
  description:
    "Conoce al equipo de Valera Visionarias, inmobiliaria en San Vicente del Raspeig. Te acompañamos en la compra, venta y alquiler de tu vivienda.",
  alternates: { canonical: "/nosotros" },
}
const embedSrc = contactInfo.mapsEmbedSrc


export default function NosotrosPage() {
  return (
    <>
      <div className="min-h-screen">
        {/* Hero con fondo real de tu oficina */}
        <section className="pt-16 sm:pt-24 pb-16 sm:pb-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={officeImages[0]}
              alt="Oficina Valera Visionarias en San Vicente del Raspeig"
              className="object-cover object-center opacity-25"
              fill
              priority
              sizes="100vw"
            />
            {/* overlay sutil para contraste */}
            <div className="absolute inset-0 bg-white/40" />
          </div>

          <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-xs tracking-[0.3em] uppercase text-stone-600 mb-4">Quiénes Somos</p>
              <h1 className="page-title text-black mb-6">
                Tu inmobiliaria de confianza
                <span className="block mt-2">en San Vicente del Raspeig</span>
              </h1>
              <p className="text-lg sm:text-xl text-stone-700 leading-relaxed">
                Fotos reales de nuestra oficina. Cercanía, transparencia y resultados.
              </p>
            </div>
          </div>
        </section>


        {/* Misión / Valores / Propuesta */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-normal text-black mb-4">
                  Nuestra esencia
                </h3>
                <p className="text-base sm:text-lg text-stone-700 leading-relaxed mb-6">
                  En Valera Visionarias creemos en un servicio inmobiliario que sitúa al cliente en el centro: honestidad, conocimiento local, acompañamiento constante y resultados medibles.
                </p>
                <ul className="space-y-4 text-base sm:text-lg text-stone-700">
                  <li className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-black mt-1" />
                    <span>Transparencia total en cada paso</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="w-6 h-6 text-black mt-1" />
                    <span>Equipo humano con experiencia</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-black mt-1" />
                    <span>Excelencia y compromiso constante</span>
                  </li>
                </ul>
              </div>
              <div>
                <Card className="border-2 border-black/[0.08]">
                  <CardContent className="p-8 sm:p-10">
                    <Target className="w-12 h-12 text-black mb-6" aria-hidden="true" />
                    <h4 className="font-display text-2xl sm:text-3xl font-normal text-black mb-4">
                      Nuestra Misión
                    </h4>
                    <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
                      Apoyar a familias, estudiantes e inversores a encontrar su espacio ideal, mediante estrategias personalizadas, uso de datos locales y una atención cercana.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        {/* Equipo */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-4">Nuestro Equipo</p>
              <h2 className="section-title text-black mb-6">
                Profesionales dedicados a tu éxito
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Podrías mapear datos reales del equipo */}
              <Card className="border border-black/[0.08] hover:border-black transition-all">
                <CardContent className="p-6 text-center">
                  <h3 className="font-display text-xl font-normal text-black mb-2">Laura Valera</h3>
                  <p className="text-sm text-stone-600 mb-4">Fundadora y CEO</p>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    Experta en mercado local con años de trayectoria, pasión por conectar personas y espacios.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-black/[0.08] hover:border-black transition-all">
                <CardContent className="p-6 text-center">
                  <h3 className="font-display text-xl font-normal text-black mb-2">Equipo Comercial</h3>
                  <p className="text-sm text-stone-600 mb-4">Asesores especializados</p>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    Profesionales capacitados para guiar tu proceso de compra o venta con total seguridad.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-black/[0.08] hover:border-black transition-all">
                <CardContent className="p-6 text-center">
                  <h3 className="font-display text-xl font-normal text-black mb-2">Equipo Legal</h3>
                  <p className="text-sm text-stone-600 mb-4">Asesoramiento integral</p>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    Apoyo en trámites legales, financieros y contractuales para que todo sea claro y seguro.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <OfficeGallery />

        {/* Mapa ubicación */}
        <section className="py-16 sm:py-20 border-t border-black/[0.08]">
          <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-3">Ubicación</p>
              <h2 className="section-title text-black mb-4">
                Visítanos en nuestra oficina
              </h2>
              <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
                {contactInfo.fullAddress}
              </p>
            </div>

            {/* Contenedor del mapa */}
            <div className="relative w-full h-[400px] sm:h-[500px] rounded-xl overflow-hidden shadow-soft">
              <iframe
                title="Ubicación Valera Visionarias en San Vicente del Raspeig"
                src={embedSrc}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 border-0"
                allowFullScreen
              ></iframe>
            </div>

            {/* Botón para abrir en Maps */}
            <div className="mt-8 text-center">
              <a
                href={contactInfo.mapsDirectionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-black text-black px-6 py-3 rounded-xl hover:bg-black hover:text-white transition text-sm sm:text-base"
              >
                <MapPin className="w-4 h-4" />
                Cómo llegar en Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="section-title text-black mb-6">
                ¿Listo para dar el siguiente paso?
              </h2>
              <p className="text-lg text-stone-700 mb-8">
                Estamos aquí para ayudarte: resolver tus dudas, analizar tu propiedad o planificar tu próxima inversión.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contacto">
                  <Button size="lg" className="bg-black hover:bg-stone-800 text-white px-10 h-12 w-full sm:w-auto">
                    Contactar ahora
                  </Button>
                </Link>
                <Link href="/valoraciones">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-black text-black hover:bg-black hover:text-white px-10 h-12 w-full sm:w-auto bg-transparent"
                  >
                    Valoración gratuita
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
