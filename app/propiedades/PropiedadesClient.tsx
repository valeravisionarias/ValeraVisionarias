"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import PromocionBanner from "@/components/PromocionBanner";

interface Propiedad {
  id: string | number;
  title: string;
  description: string;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  city: string;
  featured: boolean;
  property_images?: { url: string; position?: number }[];
}

export default function PropiedadesClient({
  propiedades = [],
}: {
  propiedades?: Propiedad[];
}) {
  // --- Estado filtros (simple y eficaz)
  const [filtro, setFiltro] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    city: "",
  });

  const lista = useMemo(() => (Array.isArray(propiedades) ? propiedades : []), [propiedades]);

  const propiedadesFiltradas = useMemo(() => {
    const min = Number(filtro.minPrice) || 0;
    const max = Number(filtro.maxPrice) || 0;
    const beds = Number(filtro.bedrooms) || 0;
    const city = filtro.city.trim().toLowerCase();

    return lista.filter((p) => {
      if (!p) return false;
      if (min && p.price < min) return false;
      if (max && p.price > max) return false;
      if (beds && p.bedrooms !== beds) return false;
      if (city && !p.city?.toLowerCase().includes(city)) return false;
      return true;
    });
  }, [lista, filtro]);

  const clearFilters = () =>
    setFiltro({ minPrice: "", maxPrice: "", bedrooms: "", city: "" });

  return (
    <>
      {/* HERO — coherente con la landing */}
      <section
        aria-label="Cabecera de Propiedades"
        className="relative isolate min-h-[56svh] flex items-end bg-black pt-20"
      >
        {/* Fondo */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-architecture.jpg"
            alt="Arquitectura moderna en San Vicente del Raspeig"
            fill
            className="object-cover grayscale opacity-45"
            priority={false}
            sizes="100vw"
            quality={85}
          />
          {/* Velo negro translúcido: el edificio se intuye detrás sin restar legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/85" />
        </div>

        {/* Contenido */}
        <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10 text-white pb-10">
          {/* Breadcrumb simple */}
          <nav aria-label="Breadcrumb" className="mb-2 text-white/80 text-xs sm:text-sm">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:underline">Inicio</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90">Propiedades</li>
            </ol>
          </nav>

          <h1 className="page-title">
            Propiedades en Alicante
          </h1>
          <p className="mt-3 text-base sm:text-lg md:text-xl text-white/90 max-w-2xl">
            Transparencia, rapidez y acompañamiento experto.
          </p>

          {/* Badges/Highlights opcionales (coherentes con la landing) */}
          <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-white/85">
            <span className="inline-flex items-center rounded-3xl border border-white/30 bg-white/10 px-3 py-1 backdrop-blur-sm">
              Sin exclusivas forzadas
            </span>
            <span className="inline-flex items-center rounded-3xl border border-white/30 bg-white/10 px-3 py-1 backdrop-blur-sm">
              Honorarios claros
            </span>
            <span className="inline-flex items-center rounded-3xl border border-white/30 bg-white/10 px-3 py-1 backdrop-blur-sm">
              Especialistas UA
            </span>
          </div>
        </div>
      </section>

      {/* BARRA DE FILTROS — pegajosa y limpia */}
      <section
        id="buscador"
        className="sticky top-[68px] sm:top-[76px] z-40 bg-stone-50/90 backdrop-blur-md border-b border-black/[0.06] supports-[backdrop-filter]:bg-stone-50/75"
        aria-label="Filtros de propiedades"
      >
        <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
          <form
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 py-3 lg:py-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="col-span-2 lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                value={filtro.city}
                onChange={(e) => setFiltro((f) => ({ ...f, city: e.target.value }))}
                type="text"
                inputMode="search"
                placeholder="Ciudad / zona (p.ej. San Vicente)"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-black/10 bg-black/[0.03] focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <input
              value={filtro.minPrice}
              onChange={(e) => setFiltro((f) => ({ ...f, minPrice: e.target.value }))}
              type="number"
              min={0}
              placeholder="Precio mín. (€)"
              className="w-full px-3 py-2.5 rounded-xl border border-black/10 bg-black/[0.03] focus:outline-none focus:ring-2 focus:ring-black"
            />

            <input
              value={filtro.maxPrice}
              onChange={(e) => setFiltro((f) => ({ ...f, maxPrice: e.target.value }))}
              type="number"
              min={0}
              placeholder="Precio máx. (€)"
              className="w-full px-3 py-2.5 rounded-xl border border-black/10 bg-black/[0.03] focus:outline-none focus:ring-2 focus:ring-black"
            />

            <input
              value={filtro.bedrooms}
              onChange={(e) => setFiltro((f) => ({ ...f, bedrooms: e.target.value }))}
              type="number"
              min={0}
              placeholder="Habitaciones"
              className="w-full px-3 py-2.5 rounded-xl border border-black/10 bg-black/[0.03] focus:outline-none focus:ring-2 focus:ring-black"
            />

            <div className="col-span-2 sm:col-span-3 lg:col-span-1 flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-black text-white rounded-xl px-4 py-2.5 hover:bg-stone-800 transition"
              >
                Aplicar
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="flex-1 border border-black/15 bg-white text-stone-800 rounded-xl px-4 py-2.5 hover:bg-stone-100 transition"
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* LISTADO */}
      <div className="py-16 md:py-24">
        <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
          <PromocionBanner className="mb-12 sm:mb-14" />
          {/* Estado vacío elegante */}
          {propiedadesFiltradas.length === 0 && (
            <div className="rounded-2xl border border-black/[0.08] bg-white p-8 sm:p-10 text-center">
              <h2 className="text-2xl sm:text-[30px] font-light tracking-[-0.03em]">Sin resultados</h2>
              <p className="mt-2 text-stone-600">
                No encontramos propiedades con esos criterios. Prueba a ajustar los filtros
                o contáctanos para una búsqueda personalizada.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 rounded-xl border border-black/10 hover:bg-stone-50"
                >
                  Quitar filtros
                </button>
                <Link
                  href="/valoraciones"
                  className="px-6 py-3 rounded-xl bg-black text-white hover:bg-stone-800"
                >
                  Valoración gratuita
                </Link>
              </div>
            </div>
          )}

          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {propiedadesFiltradas.map((p) => {
              const imgs = p.property_images ?? [];
              const mainImg =
                imgs.length > 0
                  ? [...imgs].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))[0]?.url
                  : undefined;

              return (
                <article key={p.id} className="group">
                  <Link
                    href={`/propiedad/${p.id}`}
                    className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-stone-100 shadow-subtle">
                      {mainImg ? (
                        <Image
                          src={mainImg}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="grid h-full w-full place-items-center text-stone-400">Sin imagen</div>
                      )}

                      {p.featured && (
                        <span className="absolute left-3 top-3 z-10 rounded-3xl bg-white/90 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-black backdrop-blur-sm">
                          Destacada
                        </span>
                      )}
                    </div>

                    <p className="eyebrow mt-5">{p.city}</p>
                    <h2 className="mt-2 text-xl font-light leading-snug tracking-[-0.02em] text-black">{p.title}</h2>
                    <p className="mt-2 text-[23px] font-light tracking-[-0.02em] text-black">
                      {Number(p.price).toLocaleString("es-ES")} €
                    </p>
                    <p className="mt-2 text-sm text-stone-600">
                      {p.size} m² · {p.bedrooms} hab · {p.bathrooms} baños
                    </p>
                  </Link>
                  <Link
                    href={`/contacto?propiedad=${encodeURIComponent(String(p.id))}`}
                    className="mt-3 inline-flex text-sm text-stone-600 underline underline-offset-4 hover:text-black"
                  >
                    Preguntar por esta vivienda
                  </Link>
                </article>
              );
            })}
          </div>

          {/* CTA final coherente */}
          {propiedadesFiltradas.length > 0 && (
            <div className="mt-14 text-center">
              <Link
                href="/contacto"
                className="inline-block px-8 py-4 bg-black text-white rounded-xl hover:bg-stone-800 text-base"
              >
                ¿No ves lo que buscas? Te ayudamos a encontrarlo
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
