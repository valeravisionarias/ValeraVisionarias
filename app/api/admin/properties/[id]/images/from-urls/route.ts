import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-session";
import { createServiceClient } from "@/lib/supabase/service";

// POST /api/admin/properties/:id/images/from-urls
// Body: { urls: string[], startPosition?: number }
// Descarga fotos desde enlaces (solo de idealista) y las guarda como fotos del inmueble.
const ALLOWED_HOST = /^img\d*\.idealista\.com$/;
const MAX_IMAGES = 40;
const MAX_BYTES = 15 * 1024 * 1024;

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const isAdmin = await isAdminRequest();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json().catch(() => null)) as { urls?: unknown; startPosition?: unknown } | null;
  const urls = Array.isArray(body?.urls) ? body!.urls.filter((u): u is string => typeof u === "string") : [];
  const start = Number.isFinite(Number(body?.startPosition)) ? Number(body?.startPosition) : 0;

  if (!urls.length) return NextResponse.json({ error: "No urls" }, { status: 400 });
  if (urls.length > MAX_IMAGES) return NextResponse.json({ error: `Máximo ${MAX_IMAGES} fotos por envío` }, { status: 400 });

  const supabase = createServiceClient();
  const inserted: { id: string; url: string }[] = [];
  const failed: { url: string; error: string }[] = [];

  for (let i = 0; i < urls.length; i++) {
    const src = urls[i];
    try {
      const u = new URL(src);
      if (u.protocol !== "https:" || !ALLOWED_HOST.test(u.hostname)) throw new Error("Origen no permitido");

      const res = await fetch(u.toString(), { headers: { "User-Agent": "Mozilla/5.0" }, redirect: "error" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const type = res.headers.get("content-type") || "image/jpeg";
      if (!type.startsWith("image/")) throw new Error("No es una imagen");
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.byteLength > MAX_BYTES) throw new Error("Imagen demasiado grande");

      const ext = type.includes("webp") ? "webp" : type.includes("png") ? "png" : "jpg";
      const path = `${params.id}/${Date.now()}-${i}.${ext}`;
      const { error: upErr } = await supabase.storage.from("properties").upload(path, buf, {
        upsert: false,
        contentType: type,
      });
      if (upErr) throw new Error(upErr.message);

      const { data: pub } = supabase.storage.from("properties").getPublicUrl(path);
      const { data, error: insErr } = await supabase
        .from("property_images")
        .insert({ property_id: params.id, url: pub.publicUrl, position: start + i })
        .select("id,url")
        .single();
      if (insErr) throw new Error(insErr.message);
      inserted.push(data);
    } catch (e) {
      failed.push({ url: src, error: e instanceof Error ? e.message : String(e) });
    }
  }

  return NextResponse.json({ images: inserted, failed });
}
