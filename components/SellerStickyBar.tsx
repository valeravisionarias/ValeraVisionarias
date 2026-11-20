"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"
import { contactInfo } from "@/lib/contact-info"
import { getSellerWhatsAppMessage, trackSellerEvent } from "@/lib/seller-leads"

export default function SellerStickyBar() {
  const whatsappHref = `${contactInfo.whatsappHref}?text=${encodeURIComponent(getSellerWhatsAppMessage("sticky"))}`
  const [hidden, setHidden] = useState(true)

  // Solo aparece tras dejar atrás el formulario del hero y se oculta sobre el formulario de contacto y el pie
  useEffect(() => {
    const targets = ["hero-title", "seller-contact-form", "site-footer"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!targets.length || typeof IntersectionObserver === "undefined") {
      setHidden(false)
      return
    }

    const visible = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target)))
      setHidden(visible.size > 0)
    })
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToForm = () => {
    trackSellerEvent("cta_click", { placement: "sticky-bar", target: "seller-contact-form" })
    document.getElementById("seller-contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div
      aria-hidden={hidden}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-black/[0.08] bg-white/95 p-3 pb-[calc(3.75rem+env(safe-area-inset-bottom))] shadow-[0_-10px_30px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-300 md:hidden ${
        hidden ? "pointer-events-none translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex max-w-md gap-3">
        <button
          type="button"
          tabIndex={hidden ? -1 : undefined}
          onClick={scrollToForm}
          className="flex-1 rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-stone-800 active:translate-y-0"
        >
          Valorar mi vivienda
        </button>
        <a
          href={whatsappHref}
          tabIndex={hidden ? -1 : undefined}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackSellerEvent("whatsapp_click", { placement: "sticky-bar" })}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 px-4 py-3 text-sm font-medium text-black transition hover:-translate-y-0.5 hover:border-black active:translate-y-0"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </div>
  )
}
