"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
  }

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected")
    setShowBanner(false)
  }

  if (!showBanner) return null

  // Margen inferior para que los botones queden por encima de la etiqueta "Powered by Netlify"
  // (plan gratuito, abajo a la derecha) y de los botones flotantes
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[2147483000] px-3 pt-3 pb-[calc(4.5rem+env(safe-area-inset-bottom))] sm:px-4 sm:pt-4 animate-slide-up"
      role="region"
      aria-label="Aviso de cookies"
    >
      <Card className="max-w-4xl mx-auto border-2 border-black/[0.08] shadow-2xl">
        <CardContent className="p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="font-semibold text-black mb-1 sm:mb-2 text-base sm:text-lg">
                Cookies en esta web
              </p>
              <p className="text-sm sm:text-base text-stone-700 leading-snug sm:leading-relaxed">
                Usamos almacenamiento técnico necesario y, en algunas páginas, mapas de Google que pueden instalar
                cookies de terceros.{" "}
                <Link href="/cookies" className="underline hover:text-black font-medium">
                  Más información
                </Link>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full sm:flex sm:w-auto">
              <Button
                onClick={rejectCookies}
                variant="outline"
                className="border-2 border-black/10 text-black hover:bg-stone-100 w-full sm:w-auto bg-transparent"
              >
                Rechazar
              </Button>
              <Button onClick={acceptCookies} className="bg-black hover:bg-stone-800 text-white w-full sm:w-auto">
                Aceptar todas
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
