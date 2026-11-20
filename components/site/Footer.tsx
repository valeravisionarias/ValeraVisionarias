import Image from "next/image"
import Link from "next/link"
import { PROMOCION_PATH } from "@/lib/promocion"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin } from "lucide-react"
import { contactInfo } from "@/lib/contact-info"

export default function Footer({ year }: { year: number }) {
  return (
    <footer id="site-footer" className="bg-black pt-12 pb-24 text-white sm:pt-16 lg:pt-20 lg:pb-28">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
        <div className="mb-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4 sm:gap-10 lg:gap-12">
          <div className="sm:col-span-2">
            <div className="mb-6 flex items-center gap-2 sm:mb-8 sm:gap-3">
              <Image src="/images/logo-light.png" alt="" width={32} height={32} className="h-8 w-8 sm:h-9 sm:w-9" />
              <div>
                <h3 className="font-display text-base font-medium sm:text-lg">Valera Visionarias</h3>
                <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400 sm:text-[10px]">Inmobiliaria</p>
              </div>
            </div>

            <p className="mb-6 max-w-md text-sm leading-relaxed text-stone-400 sm:text-base">
              Inmobiliaria especializada en compraventa y alquiler de viviendas en San Vicente del Raspeig. Atención personal con cita
              previa y contacto directo por WhatsApp.
            </p>

            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-stone-400" aria-hidden="true" />
                <a href={contactInfo.phoneHref} className="text-sm text-stone-300 transition-colors hover:text-white">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-stone-400" aria-hidden="true" />
                <a
                  href={contactInfo.emailHref}
                  className="break-all text-sm text-stone-300 transition-colors hover:text-white"
                >
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-stone-400" aria-hidden="true" />
                <p className="text-sm text-stone-300">
                  {contactInfo.addressLine1}
                  <br />
                  {contactInfo.addressLine2}, {contactInfo.postalCode}
                </p>
              </div>
              <p className="text-xs text-stone-400">{contactInfo.hoursSummary}</p>
              <p className="text-xs text-stone-400">{contactInfo.appointmentNote}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/contacto">
                <Button
                  variant="outline"
                  className="h-10 border border-white bg-transparent px-6 text-sm text-white hover:bg-white hover:text-black"
                >
                  Contactar ahora
                </Button>
              </Link>
              <a href={contactInfo.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp (se abre en una ventana nueva)">
                <Button className="h-10 bg-white px-6 text-sm text-black hover:bg-stone-200">WhatsApp</Button>
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wider sm:mb-6 sm:text-sm">Servicios</h4>
            <ul className="space-y-2 text-xs text-stone-400 sm:space-y-3 sm:text-sm">
              <li><Link href="/valoraciones" className="transition-colors hover:text-white">Valoración gratuita</Link></li>
              <li><Link href="/propiedades" className="transition-colors hover:text-white">Comprar piso en San Vicente</Link></li>
              <li><a href={PROMOCION_PATH} className="transition-colors hover:text-white">Obra nueva: Residencial Reyes Católicos</a></li>
              <li><Link href="/propiedades" className="transition-colors hover:text-white">Alquiler cerca Universidad</Link></li>
              <li><Link href="/simulador-hipoteca" className="transition-colors hover:text-white">Simulador de hipoteca</Link></li>
              <li><Link href="/calculadora-rentabilidad" className="transition-colors hover:text-white">Calculadora de rentabilidad</Link></li>
              <li><Link href="/colabora" className="transition-colors hover:text-white">Colabora con nosotros</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wider sm:mb-6 sm:text-sm">Información</h4>
            <ul className="mb-6 space-y-2 text-xs text-stone-400 sm:space-y-3 sm:text-sm">
              <li><Link href="/nosotros" className="transition-colors hover:text-white">Quiénes somos</Link></li>
              <li><Link href="/#testimonios" className="transition-colors hover:text-white">Testimonios</Link></li>
              <li><Link href="/#faq" className="transition-colors hover:text-white">Preguntas frecuentes</Link></li>
              <li><Link href="/contacto" className="transition-colors hover:text-white">Contacto</Link></li>
            </ul>

            <div className="flex flex-wrap gap-4 text-sm">
              <a href={contactInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-stone-400 transition-colors hover:text-white">
                Instagram
              </a>
              <a href={contactInfo.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-stone-400 transition-colors hover:text-white">
                TikTok
              </a>
              <a href={contactInfo.socialLinks.idealista} target="_blank" rel="noopener noreferrer" className="text-stone-400 transition-colors hover:text-white">
                Idealista
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 sm:pt-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-center text-xs text-stone-500 sm:text-left sm:text-sm">
              &copy; {year} Valera Visionarias - Inmobiliaria en San Vicente del Raspeig. Todos los derechos reservados.
            </p>
            <nav aria-label="Información legal" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-stone-400">
              <Link href="/privacidad" className="transition-colors hover:text-white">
                Privacidad
              </Link>
              <Link href="/cookies" className="transition-colors hover:text-white">
                Cookies
              </Link>
              <a href={contactInfo.mapsSearchHref} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                Ver oficina en Google Maps
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
