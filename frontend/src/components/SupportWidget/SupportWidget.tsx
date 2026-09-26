import React, { useEffect, useRef, useState } from "react"
import { Language } from "../../types"
import { MessageSquareText, X, PhoneCall, Send } from "lucide-react"
import { renderRichText } from "./chatTypes"
import { useChat } from "./useChat"

interface SupportWidgetProps {
  lang: Language
}

const COPY = {
  fr: {
    title: "Espace Assistance Douane",
    subtitle: "Service Relation Citoyen & Usagers",
    buttonTitle: "Assistance & Support Douane",
    placeholder: "Écrivez votre question...",
    send: "Envoyer",
    welcome:
      "Bonjour 👋 Je suis l'assistant douanier. Posez-moi une question (remboursement, classement tarifaire, marchandises interdites, bagages, devises...).",
    hotlineLabel: "Numéro vert gratuit & confidentiel",
    faqTitle: "Questions fréquentes",
    ticketLink: "Voir mon ticket de rendez-vous →",
    errors: {
      invalid: "Votre message est trop long ou invalide.",
      offline: "Connexion impossible. Vérifiez votre réseau et réessayez.",
      unavailable:
        "Le service est momentanément indisponible. Merci de réessayer.",
    },
    faq: [
      {
        href: "#faq-fcr",
        label: "Quelles conditions pour bénéficier du FCR ?",
      },
      {
        href: "#faq-devises",
        label: "Quel est le seuil de déclaration de devises ?",
      },
    ],
  },
  ar: {
    title: "فضاء المساعدة والاستعلام",
    subtitle: "مصلحة العلاقات مع المواطن",
    buttonTitle: "المساعد الإلكتروني والدعم",
    placeholder: "اكتب سؤالك...",
    send: "إرسال",
    welcome:
      "مرحباً 👋 أنا المساعد الجمركي. اطرح سؤالك (استرداد، تصنيف تعريفي، محظورات، حقائب، عملات...)",
    hotlineLabel: "الرقم الأخضر المجاني المباشر",
    faqTitle: "الأسئلة الأكثر تداولاً",
    ticketLink: "عرض تذكرة الموعد ←",
    errors: {
      invalid: "الرسالة غير صالحة أو طويلة جداً.",
      offline: "تعذّر الاتصال. تحقّق من الشبكة وأعد المحاولة.",
      unavailable: "الخدمة غير متاحة مؤقتاً. يرجى إعادة المحاولة.",
    },
    faq: [
      { href: "#faq-fcr", label: "ما هي شروط التمتع بـ FCR ؟" },
      { href: "#faq-devises", label: "ما هو سقف تصريح العملة ؟" },
    ],
  },
} as const

const TYPING_BOUNCE = [
  "animate-bounce [animation-delay:-0.3s]",
  "animate-bounce [animation-delay:-0.15s]",
  "animate-bounce",
]

export const SupportWidget: React.FC<SupportWidgetProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const { messages, isSending, send } = useChat()
  const copy = COPY[lang]
  const messagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = messagesRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, isSending, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || isSending) return
    void send(text, copy.errors)
    setInput("")
    if (inputRef.current) inputRef.current.style.height = "auto"
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      e.currentTarget.form?.requestSubmit()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    e.target.style.height = "auto"
    e.target.style.height = `${Math.min(e.target.scrollHeight, 96)}px`
  }

  return (
    <>
      {/* Floating 48x48px Round Button as specified in 4.10 */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full bg-[#003087] hover:bg-[#002266] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,48,135,0.4)] hover:scale-105 transition-all duration-200 cursor-pointer border border-[#C8A951]/40"
          title={copy.buttonTitle}
          aria-label="Support Assistant"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageSquareText className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Chat panel + hotline + FAQ */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-50 w-96 max-w-[calc(100vw-40px)] h-[560px] max-h-[80vh] bg-white rounded-lg shadow-2xl border border-[#003087]/20 overflow-hidden animate-fade-in flex flex-col text-left">
          {/* Header */}
          <div className="bg-[#003087] text-white p-4 flex items-center justify-between shrink-0 border-b-2 border-[#C8A951]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#C8A951] text-[#003087] flex items-center justify-center font-bold">
                DT
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shrink-0" />
                  {copy.title}
                </h4>
                <p className="text-[11px] text-blue-200">{copy.subtitle}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={messagesRef}
            className="flex-1 min-h-0 overflow-y-auto bg-[#F7F8FA] px-3 py-3 space-y-3 text-sm"
          >
            <div className="flex">
              <div className="bg-white border border-[#E0E0E0] rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%] shadow-sm leading-snug text-[#333333]">
                {copy.welcome}
              </div>
            </div>

            {messages.map((message) => {
              if (message.role === "user") {
                return (
                  <div key={message.id} className="flex justify-end">
                    <div className="bg-[#003087] text-white rounded-2xl rounded-tr-sm px-3 py-2 max-w-[85%] shadow-sm leading-snug break-words">
                      {message.content}
                    </div>
                  </div>
                )
              }

              const hasMeta =
                (message.sources?.length ?? 0) > 0 || Boolean(message.ticketUrl)

              return (
                <div key={message.id} className="flex">
                  <div
                    className={`rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%] shadow-sm leading-snug break-words ${
                      message.error
                        ? "bg-red-50 border border-red-200 text-red-700"
                        : "bg-white border border-[#E0E0E0] text-[#333333]"
                    }`}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: renderRichText(message.content),
                      }}
                    />

                    {hasMeta && !message.error && (
                      <div className="mt-2 pt-2 border-t border-[#F0F0F0]">
                        {Boolean(message.ticketUrl) && (
                          <a
                            href={message.ticketUrl ?? "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-xs font-medium text-[#003087] underline underline-offset-2 hover:text-[#002266]"
                          >
                            {copy.ticketLink}
                          </a>
                        )}
                        {!!message.sources?.length && (
                          <div
                            className={`flex flex-wrap gap-1 ${
                              message.ticketUrl ? "mt-1.5" : ""
                            }`}
                          >
                            {message.sources!.map((source, index) => (
                              <span
                                key={`${source}-${index}`}
                                className="text-[10px] leading-tight bg-[#003087]/5 text-[#003087] border border-[#003087]/15 rounded-full px-2 py-0.5"
                              >
                                {source}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            {isSending && (
              <div className="flex">
                <div className="bg-white border border-[#E0E0E0] rounded-2xl rounded-tl-sm px-3 py-2.5 shadow-sm flex items-center gap-1">
                  {TYPING_BOUNCE.map((className) => (
                    <span
                      key={className}
                      className={`w-1.5 h-1.5 bg-[#9CA3AF] rounded-full ${className}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="shrink-0 border-t border-[#E0E0E0] bg-white p-2 flex items-end gap-2"
          >
            <textarea
              ref={inputRef}
              rows={1}
              maxLength={4000}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={copy.placeholder}
              className="flex-1 resize-none max-h-24 min-h-10 rounded-xl border border-[#CCCCCC] px-3 py-2 text-sm outline-none focus:border-[#0055B3] transition-colors"
            />
            <button
              type="submit"
              disabled={isSending || !input.trim()}
              className="w-10 h-10 shrink-0 rounded-full bg-[#003087] hover:bg-[#002266] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label={copy.send}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Hotline + FAQ sous le chat */}
          <div className="shrink-0 border-t border-[#E0E0E0] bg-white px-3 py-2.5 space-y-2">
            <div className="bg-[#F0F4FF] border border-[#0055B3]/20 rounded px-2.5 py-1.5 flex items-center gap-2.5">
              <PhoneCall className="w-4 h-4 text-[#003087] shrink-0" />
              <div className="flex items-baseline gap-2 min-w-0">
                <p className="text-[11px] text-[#666666] truncate">
                  {copy.hotlineLabel}
                </p>
                <a
                  href="tel:80103066"
                  className="text-sm font-bold text-[#003087] hover:underline shrink-0"
                >
                  80 10 30 66
                </a>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold text-[#888888] uppercase mb-0.5">
                {copy.faqTitle}
              </p>
              <div className="space-y-0.5">
                {copy.faq.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block text-[11px] leading-tight p-1 rounded hover:bg-[#F5F5F5] text-[#0055B3] hover:underline"
                  >
                    • {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
