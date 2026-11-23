"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, SlidersHorizontal } from "lucide-react"

export default function PropertySearchSection() {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <section id="buscador" className="py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="section-title text-black mb-4">
              Encuentra tu propiedad ideal
            </h2>
            <p className="text-base sm:text-lg text-stone-700">
              Busca entre nuestras propiedades disponibles en San Vicente del Raspeig
            </p>
          </div>

          <Card className="border-2 border-black/[0.08]">
            <CardContent className="p-6 sm:p-8">
              <form className="space-y-6" aria-label="Buscador de propiedades">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="precio-min" className="text-sm font-medium text-stone-800 mb-2 block">
                      Precio mínimo
                    </Label>
                    <Input
                      id="precio-min"
                      type="number"
                      placeholder="€ 50.000"
                      className="h-11 border-black/10 focus:border-black focus:ring-black"
                      inputMode="numeric"
                    />
                  </div>

                  <div>
                    <Label htmlFor="precio-max" className="text-sm font-medium text-stone-800 mb-2 block">
                      Precio máximo
                    </Label>
                    <Input
                      id="precio-max"
                      type="number"
                      placeholder="€ 500.000"
                      className="h-11 border-black/10 focus:border-black focus:ring-black"
                      inputMode="numeric"
                    />
                  </div>

                  <div>
                    <Label htmlFor="habitaciones" className="text-sm font-medium text-stone-800 mb-2 block">
                      Habitaciones
                    </Label>
                    <select
                      id="habitaciones"
                      className="w-full h-11 border border-black/10 rounded-md px-3 bg-white focus:border-black focus:ring-black"
                    >
                      <option value="">Cualquiera</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="banos" className="text-sm font-medium text-stone-800 mb-2 block">
                      Baños
                    </Label>
                    <select
                      id="banos"
                      className="w-full h-11 border border-black/10 rounded-md px-3 bg-white focus:border-black focus:ring-black"
                    >
                      <option value="">Cualquiera</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="border-2 border-black/10 hover:border-black text-black"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" aria-hidden="true" />
                    {showFilters ? "Ocultar filtros" : "Más filtros"}
                  </Button>
                </div>

                {showFilters && (
                  <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-black/[0.08] animate-slide-down">
                    <div>
                      <Label htmlFor="superficie-min" className="text-sm font-medium text-stone-800 mb-2 block">
                        Superficie mínima (m²)
                      </Label>
                      <Input
                        id="superficie-min"
                        type="number"
                        placeholder="50"
                        className="h-11 border-black/10 focus:border-black focus:ring-black"
                        inputMode="numeric"
                      />
                    </div>

                    <div>
                      <Label htmlFor="zona" className="text-sm font-medium text-stone-800 mb-2 block">
                        Zona
                      </Label>
                      <select
                        id="zona"
                        className="w-full h-11 border border-black/10 rounded-md px-3 bg-white focus:border-black focus:ring-black"
                      >
                        <option value="">Todas las zonas</option>
                        <option value="centro">San Vicente Centro</option>
                        <option value="universidad">Cerca de la Universidad</option>
                        <option value="villafranqueza">Villafranqueza</option>
                        <option value="raspeig-norte">Raspeig Norte</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          id="cerca-universidad"
                          className="w-4 h-4 rounded border-black/10 text-black focus:ring-black"
                        />
                        <span className="text-sm text-stone-800">Cerca de la Universidad de Alicante</span>
                      </label>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-stone-800 text-white h-12 text-base focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  <Search className="w-5 h-5 mr-2" aria-hidden="true" />
                  Buscar propiedades
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
