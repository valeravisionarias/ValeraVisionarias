"use client"

import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import { Calculator, Info, TrendingUp } from "lucide-react"

type Num = number | ""

function toNum(v: string): Num {
  if (v.trim() === "") return ""
  const n = Number(v.replace(",", "."))
  return Number.isFinite(n) ? n : ""
}

const fmt = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })
const fmt2 = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 2 })

export default function RentabilidadPage() {
  const [precio, setPrecio] = useState<Num>(150000)
  const [alquilerMes, setAlquilerMes] = useState<Num>(850)
  const [reforma, setReforma] = useState<Num>(10000)
  // Segunda mano en la Comunitat Valenciana: ITP 9 % + notaría, registro y gestoría (~1,5 %) ≈ 10,5 % del precio
  const [gastosCierre, setGastosCierre] = useState<Num>(15750)

  // Gastos anuales fijos (IBI, comunidad, seguro, mantenimiento)
  const [ibi, setIbi] = useState<Num>(350)
  const [comunidad, setComunidad] = useState<Num>(45) // mensual
  const [seguro, setSeguro] = useState<Num>(180)
  const [mantenimientoPct, setMantenimientoPct] = useState<Num>(5) // % del alquiler anual

  // Vacancia y gestión
  const [vacanciaPct, setVacanciaPct] = useState<Num>(5)
  const [gestionPct, setGestionPct] = useState<Num>(0)

  // Hipoteca
  const [usaHipoteca, setUsaHipoteca] = useState(true)
  const [entradaPct, setEntradaPct] = useState<Num>(20)
  const [interes, setInteres] = useState<Num>(3.5) // TIN anual
  const [plazoAnios, setPlazoAnios] = useState<Num>(30)

  const resultado = useMemo(() => {
    if (
      precio === "" || precio <= 0 ||
      alquilerMes === "" ||
      reforma === "" ||
      gastosCierre === "" ||
      ibi === "" ||
      comunidad === "" ||
      seguro === "" ||
      mantenimientoPct === "" ||
      vacanciaPct === "" ||
      gestionPct === "" ||
      interes === "" ||
      plazoAnios === "" ||
      entradaPct === ""
    ) {
      return null
    }

    // Inversión total inicial
    const entrada = usaHipoteca ? (precio * (entradaPct / 100)) : precio
    const inversionInicial = entrada + reforma + gastosCierre

    // Hipoteca
    const principal = usaHipoteca ? precio - entrada : 0
    const i = (interes / 100) / 12
    const n = (plazoAnios * 12)
    const cuotaHipotecaMes = usaHipoteca && i > 0 && n > 0
      ? principal * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
      : usaHipoteca && n > 0 ? principal / n : 0

    // Ingresos y gastos
    const ingresosAnuales = alquilerMes * 12
    const vacancia = ingresosAnuales * (vacanciaPct / 100)
    const gestion = ingresosAnuales * (gestionPct / 100)
    const mantenimiento = ingresosAnuales * (mantenimientoPct / 100)
    const comunidadAnual = comunidad * 12

    const gastosOperativos = vacancia + gestion + mantenimiento + comunidadAnual + ibi + seguro
    const noi = ingresosAnuales - gastosOperativos // Net Operating Income (sin deuda)

    const deudaAnual = cuotaHipotecaMes * 12
    const cashFlowAnual = noi - (usaHipoteca ? deudaAnual : 0)
    const cashFlowMensual = cashFlowAnual / 12

    // Métricas: sobre el coste total de la compra (precio + impuestos y gastos + reforma),
    // que es lo que de verdad cuesta poner el piso en alquiler
    const costeTotal = precio + gastosCierre + reforma
    const rentabilidadBruta = ingresosAnuales / costeTotal * 100
    const rentabilidadNeta = noi / costeTotal * 100
    const cashOnCash = inversionInicial > 0 ? (cashFlowAnual / inversionInicial) * 100 : 0

    // Punto de equilibrio: alquiler mínimo para cash-flow 0
    // CF = (alquiler*12 - gastosOperativosVar(alquiler) - gastosFijos) - deuda
    // gastosOperativosVar = (vacancia% + gestion% + mantenimiento%) * alquiler*12
    const varPct = (vacanciaPct + gestionPct + mantenimientoPct) / 100
    const gastosFijosAnuales = comunidadAnual + ibi + seguro
    // Ojo: hay que dividir la suma completa (antes solo se dividían los gastos fijos)
    const alquilerAnualBreakEven =
      ((usaHipoteca ? deudaAnual : 0) + gastosFijosAnuales) / (1 - varPct > 0 ? 1 - varPct : 1)
    const alquilerMensualBreakEven = alquilerAnualBreakEven / 12

    return {
      costeTotal,
      inversionInicial,
      cuotaHipotecaMes,
      ingresosAnuales,
      gastosOperativos,
      noi,
      deudaAnual,
      cashFlowAnual,
      cashFlowMensual,
      rentabilidadBruta,
      rentabilidadNeta,
      cashOnCash,
      alquilerMensualBreakEven
    }
  }, [
    precio, alquilerMes, reforma, gastosCierre,
    ibi, comunidad, seguro, mantenimientoPct,
    vacanciaPct, gestionPct, usaHipoteca,
    entradaPct, interes, plazoAnios
  ])

  const reset = () => {
    setPrecio(150000); setAlquilerMes(850); setReforma(10000); setGastosCierre(15750)
    setIbi(350); setComunidad(45); setSeguro(180); setMantenimientoPct(5)
    setVacanciaPct(5); setGestionPct(0)
    setUsaHipoteca(true); setEntradaPct(20); setInteres(3.5); setPlazoAnios(30)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="mb-10 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-wider">
        <Calculator className="h-4 w-4" /> Calculadora de Rentabilidad
      </span>
      <h1 className="page-title mt-4">
        Calcula la rentabilidad de tu inversión
      </h1>
      <p className="text-muted-foreground mt-3 text-base md:text-lg max-w-2xl mx-auto">
        Descubre cuánto rinde un piso en alquiler y cuánto dinero te quedaría cada mes, con o sin hipoteca.
      </p>
    </section>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6 space-y-8">
            {/* Precio / Alquiler */}
            <section className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Precio de compra (€)</Label>
                <Input inputMode="decimal" value={precio} onChange={(e)=>setPrecio(toNum(e.target.value))} />
              </div>
              <div>
                <Label>Alquiler mensual objetivo (€)</Label>
                <Input inputMode="decimal" value={alquilerMes} onChange={(e)=>setAlquilerMes(toNum(e.target.value))} />
              </div>
              <div>
                <Label>Reforma (€)</Label>
                <Input inputMode="decimal" value={reforma} onChange={(e)=>setReforma(toNum(e.target.value))} />
              </div>
              <div>
                <Label>Impuestos y gastos de compra (€)</Label>
                <Input inputMode="decimal" value={gastosCierre} onChange={(e)=>setGastosCierre(toNum(e.target.value))} />
                <p className="mt-1 text-xs text-stone-500">
                  Segunda mano en la Comunitat Valenciana: ITP del 9 % más notaría, registro y gestoría (aprox. 10,5 % del precio).
                  {precio !== "" && precio > 0 && <> Para este precio, unos {fmt.format(precio * 0.105)}.</>}
                </p>
              </div>
            </section>

            {/* Gastos recurrentes */}
            <section>
              <h3 className="font-medium mb-3">Gastos recurrentes</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <Label>IBI anual (€)</Label>
                  <Input inputMode="decimal" value={ibi} onChange={(e)=>setIbi(toNum(e.target.value))}/>
                </div>
                <div>
                  <Label>Comunidad mensual (€)</Label>
                  <Input inputMode="decimal" value={comunidad} onChange={(e)=>setComunidad(toNum(e.target.value))}/>
                </div>
                <div>
                  <Label>Seguro anual (€)</Label>
                  <Input inputMode="decimal" value={seguro} onChange={(e)=>setSeguro(toNum(e.target.value))}/>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mt-4">
                <div>
                  <Label>Reparaciones y mantenimiento (% del alquiler)</Label>
                  <Input inputMode="decimal" value={mantenimientoPct} onChange={(e)=>setMantenimientoPct(toNum(e.target.value))}/>
                </div>
                <div>
                  <Label>Tiempo sin inquilino (% del año)</Label>
                  <Input inputMode="decimal" value={vacanciaPct} onChange={(e)=>setVacanciaPct(toNum(e.target.value))}/>
                </div>
                <div>
                  <Label>Gestión del alquiler (% del alquiler)</Label>
                  <Input inputMode="decimal" value={gestionPct} onChange={(e)=>setGestionPct(toNum(e.target.value))}/>
                </div>
              </div>
            </section>

            {/* Hipoteca */}
            <section className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-medium">Hipoteca</h3>
                <Button variant={usaHipoteca ? "default" : "secondary"} size="sm" onClick={()=>setUsaHipoteca(v=>!v)}>
                  {usaHipoteca ? "Con hipoteca" : "Sin hipoteca"}
                </Button>
              </div>

              <div className={`grid sm:grid-cols-3 gap-4 transition-opacity ${usaHipoteca ? "opacity-100" : "opacity-60"}`}>
                <div>
                  <Label>Entrada (%)</Label>
                  <div className="flex items-center gap-3">
                    <Input inputMode="decimal" value={entradaPct} onChange={(e)=>setEntradaPct(toNum(e.target.value))}/>
                    <span className="text-sm text-stone-500 whitespace-nowrap">{fmt.format(Number(precio||0)*(Number(entradaPct||0)/100))}</span>
                  </div>
                </div>
                <div>
                  <Label>Interés de la hipoteca (% anual)</Label>
                  <Input inputMode="decimal" value={interes} onChange={(e)=>setInteres(toNum(e.target.value))}/>
                </div>
                <div>
                  <Label>Plazo (años)</Label>
                  <Input inputMode="numeric" value={plazoAnios} onChange={(e)=>setPlazoAnios(toNum(e.target.value))}/>
                </div>
              </div>
            </section>

            <div className="pt-2 flex gap-3">
              <Button variant="secondary" onClick={reset}>Restablecer</Button>
            </div>
          </CardContent>
        </Card>

        {/* Resultados */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              <h3 className="font-medium">Resultados</h3>
            </div>

            {!resultado ? (
              <p className="text-sm text-stone-600">Rellena todos los campos para ver los cálculos.</p>
            ) : (
              <div className="space-y-4">
                <Stat label="Coste total de la compra" value={fmt.format(resultado.costeTotal)} />
                <Stat label="Dinero que pones tú" value={fmt.format(resultado.inversionInicial)} />
                <hr className="border-black/[0.08]" />
                <Stat label="Rentabilidad bruta" value={`${fmt2.format(resultado.rentabilidadBruta)} %`} />
                <Stat label="Rentabilidad neta (tras gastos)" value={`${fmt2.format(resultado.rentabilidadNeta)} %`} />
                <hr className="border-black/[0.08]" />
                <Stat label="Te queda al mes" value={fmt.format(resultado.cashFlowMensual)} emphasis />
                <Stat label="Rentabilidad sobre tu dinero (año 1)" value={`${fmt2.format(resultado.cashOnCash)} %`} />
                {resultado.cuotaHipotecaMes > 0 && (
                  <Stat label="Cuota hipoteca (mes)" value={fmt.format(resultado.cuotaHipotecaMes)} />
                )}
                <hr className="border-black/[0.08]" />
                <Stat label="Alquiler mínimo para no perder dinero" value={fmt.format(resultado.alquilerMensualBreakEven)} />
              </div>
            )}

            <div className="mt-6 rounded-xl border border-black/[0.08] p-4 bg-stone-50">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <p className="font-medium">Consejo rápido</p>
              </div>
              <p className="text-sm text-stone-700">
                Para comparar pisos, fíjate en la <span className="font-medium">rentabilidad neta</span>: ya descuenta impuestos de compra,
                reforma y gastos. Si "te queda al mes" sale en negativo, tendrías que poner dinero cada mes.
              </p>
            </div>

            <p className="flex items-start gap-2 text-xs text-stone-500">
              <Info className="mt-[2px] h-4 w-4 shrink-0" aria-hidden="true" />
              Cálculo orientativo. No incluye los impuestos sobre las rentas del alquiler ni garantiza resultados.
            </p>

            <Button asChild className="w-full bg-black hover:bg-stone-800 text-white">
              <Link href="/contacto">¿Te ayudo a encontrar un piso para invertir?</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Stat({ label, value, emphasis = false }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-sm text-stone-600">{label}</span>
      <span className={`tabular-nums ${emphasis ? "text-xl font-semibold" : "font-medium"}`}>{value}</span>
    </div>
  )
}
