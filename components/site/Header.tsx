"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import MobileNav from "@/components/mobile-nav"
import { PROMOCION_LABEL, PROMOCION_PATH } from "@/lib/promocion"

const navLinks = [
  { href: "/propiedades", label: "Propiedades" },
  { href: PROMOCION_PATH, label: PROMOCION_LABEL, staticPage: true },
  { href: "/valoraciones", label: "Vender" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
]

const calculatorLinks = [
  { href: "/simulador-hipoteca", label: "Hipoteca" },
  { href: "/calculadora-rentabilidad", label: "Rentabilidad" },
]

const linkBase =
  "px-3 py-2 text-sm rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black"

export default function Header() {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const closeDropdown = () => setOpenDropdown(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Cerrar el desplegable al hacer clic fuera o pulsar Escape
  useEffect(() => {
    if (!openDropdown) return
    const onPointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) closeDropdown()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDropdown()
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [openDropdown])

  useEffect(closeDropdown, [pathname])

  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`)
  const calculatorsActive = calculatorLinks.some((link) => isActive(link.href))

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b bg-stone-50/90 backdrop-blur-md supports-[backdrop-filter]:bg-stone-50/75 transition-shadow duration-300 ${
        scrolled ? "border-black/[0.08] shadow-subtle" : "border-black/[0.04]"
      }`}
    >
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-3 py-3 lg:py-4">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-xl"
            aria-label="Valera Visionarias, ir al inicio"
          >
            <Image
              src="/images/logo-dark.png"
              alt=""
              width={36}
              height={36}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded"
              priority
            />
            <div className="leading-tight">
              <span className="font-display text-base sm:text-lg font-medium text-black tracking-tight">
                Valera Visionarias
              </span>
              <span className="block text-[10px] sm:text-[11px] text-stone-600 tracking-[0.24em] uppercase">
                Inmobiliaria
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 relative" aria-label="Navegación principal">
            {navLinks.map((link) => {
              // El dosier es un HTML estático: enlace normal, sin navegación del router
              const NavLink = link.staticPage ? "a" : Link
              return (
              <NavLink
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`${linkBase} ${
                  isActive(link.href)
                    ? "text-black font-medium"
                    : "text-stone-700 hover:text-black hover:bg-stone-100"
                }`}
              >
                {link.label}
              </NavLink>
              )
            })}

            {/* Dropdown Calculadoras */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setOpenDropdown((prev) => !prev)}
                aria-expanded={openDropdown}
                aria-controls="calculadoras-menu"
                className={`${linkBase} flex items-center gap-1 ${
                  calculatorsActive ? "text-black font-medium" : "text-stone-700 hover:text-black hover:bg-stone-100"
                }`}
              >
                Calculadoras
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={`transition-transform ${openDropdown ? "rotate-180" : "rotate-0"}`}
                />
              </button>

              {openDropdown && (
                <ul
                  id="calculadoras-menu"
                  className="absolute left-0 mt-2 w-52 bg-white border border-black/[0.08] rounded-xl shadow-lifted py-2 z-50 animate-in fade-in-0 zoom-in-95"
                >
                  {calculatorLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={closeDropdown}
                        aria-current={isActive(link.href) ? "page" : undefined}
                        className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 hover:text-black focus:outline-none focus-visible:bg-stone-100"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link href="/valoraciones" className="ml-3">
              <Button className="bg-black hover:bg-stone-800 text-white text-sm px-5 h-10 rounded-xl">
                Valoración gratuita
              </Button>
            </Link>
          </nav>

          {/* Móvil: CTA de valoración siempre visible + menú */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/valoraciones"
              className="inline-flex h-10 items-center rounded-xl bg-black px-4 text-sm font-medium text-white transition-colors hover:bg-stone-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              Valorar
              <span className="sr-only"> mi vivienda gratis</span>
            </Link>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}
