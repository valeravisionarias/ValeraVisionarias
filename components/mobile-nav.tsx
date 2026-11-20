"use client"

import { Fragment, useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, Phone, Mail, MessageCircle } from "lucide-react"
import { contactInfo } from "@/lib/contact-info"
import { PROMOCION_PATH } from "@/lib/promocion"

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/propiedades", label: "Propiedades" },
  { href: PROMOCION_PATH, label: "Obra nueva: Residencial Reyes Católicos", staticPage: true },
  { href: "/valoraciones", label: "Vender mi vivienda" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/#san-vicente", label: "San Vicente del Raspeig" },
  { href: "/#faq", label: "Preguntas frecuentes" },
  { href: "/contacto", label: "Contacto" },
]

const calculatorItems = [
  { href: "/simulador-hipoteca", label: "Hipoteca" },
  { href: "/calculadora-rentabilidad", label: "Rentabilidad" },
]

export default function MobileNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const openBtnRef = useRef<HTMLButtonElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = "hidden"
    closeBtnRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu()
    }
    document.addEventListener("keydown", onKeyDown)

    const openBtn = openBtnRef.current
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", onKeyDown)
      openBtn?.focus()
    }
  }, [isOpen])

  useEffect(closeMenu, [pathname])

  const calculadoras = (
            <li key="calculadoras">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
                aria-controls="mobile-calculadoras"
                className="w-full flex justify-between items-center py-3 px-4 text-[1.05rem] text-stone-700 rounded-lg hover:bg-stone-100 hover:text-black transition-colors"
              >
                Calculadoras
                <ChevronDown
                  aria-hidden="true"
                  className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <ul id="mobile-calculadoras" className="ml-4 mt-1 space-y-1 border-l border-stone-200 pl-4">
                  {calculatorItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="block py-2 text-base text-stone-600 hover:text-black transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
  )

  return (
    <>
      <button
        ref={openBtnRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-white text-black transition-colors hover:bg-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
        aria-label="Abrir menú"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <Menu className="w-5 h-5" aria-hidden="true" />
      </button>

      {/* Overlay de fondo */}
      <div
        className={`fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Panel lateral */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        className={`fixed top-0 right-0 z-[90] flex h-[100dvh] w-80 max-w-[88vw] flex-col border-l border-stone-200 bg-white transition-[transform,visibility] duration-300 ease-out motion-reduce:transition-none ${
          isOpen ? "visible translate-x-0 shadow-2xl" : "invisible translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <span className="font-display text-xl text-black">Menú</span>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeMenu}
            className="p-2 rounded-lg hover:bg-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            aria-label="Cerrar menú"
          >
            <X className="w-6 h-6 text-black" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-4" aria-label="Navegación móvil">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active = item.href === pathname
              // El dosier es un HTML estático: enlace normal, sin navegación del router
              const NavLink = item.staticPage ? "a" : Link
              const link = (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-lg px-4 py-3 text-[1.05rem] transition-colors hover:bg-stone-100 hover:text-black ${
                      active ? "bg-stone-100 font-medium text-black" : "text-stone-700"
                    }`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
              // Calculadoras justo después de "Vender mi vivienda", para que se vean sin bajar en pantallas cortas
              return item.href === "/valoraciones" ? (
                <Fragment key={item.href}>
                  {link}
                  {calculadoras}
                </Fragment>
              ) : (
                link
              )
            })}

          </ul>

          <div className="mt-8 space-y-3 px-2">
            <Link href="/valoraciones" onClick={closeMenu} className="block">
              <Button className="w-full h-12 rounded-xl bg-black text-white hover:bg-stone-800 text-base">
                Valoración gratuita
              </Button>
            </Link>
            <Link href="/colabora" onClick={closeMenu} className="block">
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl border-black text-black hover:bg-black hover:text-white text-base"
              >
                Colabora con nosotros
              </Button>
            </Link>
          </div>
        </nav>

        <div className="space-y-2 border-t border-stone-200 bg-stone-50 p-6 pb-[calc(4.5rem+env(safe-area-inset-bottom))]">
          <p className="text-xs uppercase tracking-wide text-stone-500">Contacto directo</p>
          <a href={contactInfo.phoneHref} className="flex items-center gap-2 text-base font-semibold text-black hover:underline">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {contactInfo.phone}
          </a>
          <a href={contactInfo.emailHref} className="flex items-center gap-2 text-sm text-stone-700 hover:underline break-all">
            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            {contactInfo.email}
          </a>
          <a
            href={contactInfo.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-stone-700 hover:underline"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp directo
          </a>
        </div>
      </div>
    </>
  )
}
