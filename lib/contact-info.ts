const MAPS_QUERY = "Avenida Ancha de Castelar 46, 03690 San Vicente del Raspeig, Alicante, España"

export const contactInfo = {
  phone: "617 31 45 84",
  phoneHref: "tel:+34617314584",
  phoneE164: "+34617314584",
  email: "Valeravisionarias@gmail.com",
  emailHref: "mailto:Valeravisionarias@gmail.com",
  whatsappHref: "https://wa.me/34617314584",
  addressLine1: "Avenida Ancha de Castelar 46-48",
  addressLine2: "San Vicente del Raspeig, Alicante",
  postalCode: "03690",
  fullAddress: "Avenida Ancha de Castelar 46-48, 03690 San Vicente del Raspeig, Alicante",
  // Mapas: una sola consulta para todos los enlaces.
  // Solo el primer número (46) para que el buscador sitúe bien el punto; con código postal y municipio para no caer en Alicante ciudad.
  mapsSearchHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`,
  mapsEmbedSrc: `https://maps.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=17&hl=es&output=embed`,
  mapsDirectionsHref: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAPS_QUERY)}`,
  // Ficha de Google: se usa cuando no hay enlace directo devuelto por la API de Places
  googleProfileHref: "https://www.google.com/maps/search/?api=1&query=Valera+Visionarias+San+Vicente+del+Raspeig",
  googleRating: "4,3",
  googleReviewCount: "Más de 20",
  hoursSummary: "Lunes a viernes de 9:00 a 20:00 y sábados de 9:00 a 14:00.",
  appointmentNote: "Te atendemos con cita previa, para dedicarte todo el tiempo que necesites.",
  socialLinks: {
    instagram: "https://www.instagram.com/lvaleravisionarias?igsh=emp1N2VyZXg1cTN1&utm_source=qr",
    tiktok: "https://www.tiktok.com/@lvaleravisionarias?_r=1&_t=ZN-94lbuEN3tT8",
    idealista: "https://www.idealista.com/pro/valera-visionarias/",
  },
} as const

export const openingHoursSpecification = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "20:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday"],
    opens: "09:00",
    closes: "14:00",
  },
] as const
