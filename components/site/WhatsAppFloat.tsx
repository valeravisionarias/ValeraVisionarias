import { contactInfo } from "@/lib/contact-info"

export default function WhatsAppFloat() {
  return (
    <a
      href={contactInfo.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir WhatsApp con ${contactInfo.phone}`}
      className="fixed bottom-20 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.35)] transition-all duration-300 hover:scale-110 hover:bg-[#20bd5a] hover:shadow-[0_16px_34px_rgba(37,211,102,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 motion-safe:animate-[pulse_3s_ease-in-out_infinite] sm:bottom-20 sm:right-6"
    >
      <svg viewBox="0 0 32 32" className="h-8 w-8 fill-current" aria-hidden="true">
        <path d="M19.11 17.19c-.27-.14-1.61-.79-1.86-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.15-1.35-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.52-.44-.45-.61-.46h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.26s.98 2.62 1.11 2.8c.14.18 1.92 2.92 4.65 4.1.65.28 1.16.45 1.56.58.66.21 1.27.18 1.75.11.53-.08 1.61-.66 1.84-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.52-.32Z" />
        <path d="M16.01 3.2c-7.08 0-12.82 5.73-12.82 12.8 0 2.26.59 4.46 1.72 6.4L3.1 28.8l6.56-1.72a12.82 12.82 0 0 0 6.35 1.68h.01c7.07 0 12.8-5.73 12.8-12.8 0-3.43-1.33-6.66-3.76-9.08A12.73 12.73 0 0 0 16.01 3.2Zm0 23.4h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.89 1.02 1.04-3.79-.25-.39a10.58 10.58 0 0 1-1.63-5.72c0-5.85 4.75-10.6 10.6-10.6 2.83 0 5.49 1.1 7.49 3.1a10.52 10.52 0 0 1 3.1 7.49c0 5.85-4.76 10.6-10.61 10.6Z" />
      </svg>
    </a>
  )
}
