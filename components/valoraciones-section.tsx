import ContactForm from "@/components/ContactForm"

// Página de valoración: formulario corto en dos pasos (mismo que en portada y contacto).
// Antes pedía unos 15 datos (superficie, planta, orientación, eficiencia...) y el propietario
// podía abandonar a medias. Los detalles se preguntan después, por teléfono o en la visita.
export default function ValoracionesSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        {/* En móvil: titular, formulario y pasos (en ese orden). En escritorio: formulario a la derecha. */}
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-x-16 lg:items-start">
          <div className="lg:col-start-1 lg:row-start-1">
            <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-3 sm:mb-4">Valoración gratuita</p>
            <h1 className="page-title text-black mb-4 sm:mb-6 text-balance">
              ¿Cuánto vale tu vivienda en San Vicente del Raspeig?
            </h1>
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
              Déjanos solo cómo contactarte y, si quieres, la zona y el tipo de vivienda. Te prepararemos una
              valoración orientativa según el mercado de la zona, sin coste y sin compromiso.
            </p>
          </div>

          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <ContactForm source="pagina-valoraciones" />
          </div>

          <div className="lg:col-start-1 lg:row-start-2">
            <ol className="grid gap-4 max-w-xl">
              {[
                { title: "Nos dejas tu contacto", text: "Solo un teléfono o email. La zona y el tipo de vivienda, si quieres." },
                { title: "Analizamos el mercado", text: "Revisamos viviendas comparables en tu zona y su situación." },
                { title: "Te contactamos", text: "Te explicamos el rango de precio y, si quieres, la estrategia de venta." },
              ].map((item, index) => (
                <li key={item.title} className="rounded-xl border border-black/[0.08] bg-stone-50 p-4 sm:p-5">
                  <span className="font-display text-2xl text-stone-400" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 font-medium text-black">{item.title}</p>
                  <p className="mt-1 text-sm text-stone-600 leading-relaxed">{item.text}</p>
                </li>
              ))}
            </ol>

            <p className="mt-6 max-w-xl text-xs text-stone-500 leading-relaxed">
              La valoración es orientativa y no sustituye a una tasación oficial.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
