/** @type {import('next').NextConfig} */
// Dosier de la promoción de obra nueva: HTML autónomo en public/promocion-reyes-catolicos/index.html.
// Se sube tal cual (no reescribir el archivo: lleva imágenes y tipografía incrustadas).
const PROMOCION_PATH = '/promocion-reyes-catolicos'
const PROMOCION_CANONICAL = `https://www.valeravisionarias.com${PROMOCION_PATH}`

const nextConfig = {
  async rewrites() {
    return [{ source: PROMOCION_PATH, destination: `${PROMOCION_PATH}/index.html` }]
  },

  async redirects() {
    return [
      { source: '/dosier', destination: PROMOCION_PATH, permanent: false },
      // La calculadora de inversión (ahorro genérico, sin relación con viviendas) se retiró
      { source: '/calculadora-inversion', destination: '/calculadora-rentabilidad', permanent: true },
      { source: `${PROMOCION_PATH}/index.html`, destination: PROMOCION_PATH, permanent: true },
    ]
  },

  async headers() {
    return [
      {
        source: PROMOCION_PATH,
        headers: [{ key: 'Link', value: `<${PROMOCION_CANONICAL}>; rel="canonical"` }],
      },
    ]
  },

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  images: {
    remotePatterns: [
      // Supabase público
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      // Google (fotos de tu ficha y reseñas)
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'maps.gstatic.com' },
      { protocol: 'https', hostname: 'yt3.ggpht.com' },
    ],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 24, 32, 48, 64, 96, 128],
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
