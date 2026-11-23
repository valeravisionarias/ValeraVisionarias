import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PropertyForm from "@/components/admin/PropertyForm";
import { createServiceClient } from "@/lib/supabase/service";
import ImageGalleryManager from "@/components/admin/ImageGalleryManager";

// Siempre datos frescos: si no, el panel podía mostrar una versión antigua del inmueble
// (y al guardar se sobrescribían los cambios) y la galería salía vacía.
export const dynamic = "force-dynamic";

export default async function EditarPropiedadPage({ params }: { params: { id: string } }) {
  const supabase = createServiceClient();
  const { data: property } = await supabase
    .from("properties")
    .select("*, property_images(id, url, position, created_at)")
    .eq("id", params.id)
    .single();

  return (
    <div className="space-y-6">
      <Card className="border-2 border-stone-200">
        <CardHeader>
          <CardTitle className="font-display text-2xl font-light">Editar Propiedad</CardTitle>
        </CardHeader>
        <CardContent>
          <PropertyForm propertyId={params.id} defaultValues={property ?? {}} />
        </CardContent>
      </Card>

      <Card className="border-2 border-stone-200">
        <CardHeader>
          <CardTitle className="font-display text-2xl font-light">Galería</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageGalleryManager
            propertyId={params.id}
            initialImages={(property?.property_images as any[]) ?? []}
          />
        </CardContent>
      </Card>
    </div>
  );
}
