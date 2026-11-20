import type { MetadataRoute } from "next"
import { createClient } from "@supabase/supabase-js"
import { SITE_URL } from "@/lib/site"

export const revalidate = 3600

const staticRoutes: Array<{ path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/valoraciones", priority: 0.9, changeFrequency: "monthly" },
  { path: "/propiedades", priority: 0.9, changeFrequency: "daily" },
  { path: "/promocion-reyes-catolicos", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contacto", priority: 0.7, changeFrequency: "yearly" },
  { path: "/nosotros", priority: 0.6, changeFrequency: "yearly" },
  { path: "/simulador-hipoteca", priority: 0.5, changeFrequency: "yearly" },
  { path: "/calculadora-rentabilidad", priority: 0.5, changeFrequency: "yearly" },
  { path: "/colabora", priority: 0.4, changeFrequency: "yearly" },
  { path: "/privacidad", priority: 0.1, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.1, changeFrequency: "yearly" },
]

async function getPropertyEntries(): Promise<MetadataRoute.Sitemap> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return []

  try {
    const supabase = createClient(url, key, { auth: { persistSession: false } })
    const { data } = await supabase.from("properties").select("id, created_at").eq("status", "activo")
    return (data ?? []).map((p) => ({
      url: `${SITE_URL}/propiedad/${p.id}`,
      lastModified: p.created_at ? new Date(p.created_at) : undefined,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  } catch {
    // Si Supabase no responde, publicamos al menos las páginas fijas
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getPropertyEntries()
  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...properties,
  ]
}
