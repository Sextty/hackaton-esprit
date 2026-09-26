import { useCallback, useRef, useState } from "react"
import type { ChatErrors, ChatMessage, ChatTurn } from "./chatTypes"

const API_BASE: string =
  import.meta.env.VITE_API_BASE ?? "http://127.0.0.1:8000"
const CHAT_ENDPOINT = `${API_BASE}/api/agent/chat`

const MAX_HISTORY_TURNS = 50
const MAX_CONTENT_LENGTH = 6000

type ChatApiResponse = {
  reply?: string
  sources?: string[]
  ticket_url?: string | null
  history?: ChatTurn[]
  message?: string
}

const sanitizeHistory = (history: ChatTurn[]): ChatTurn[] =>
  history.slice(-MAX_HISTORY_TURNS).map((turn) => ({
    role: turn.role,
    content: String(turn.content).slice(0, MAX_CONTENT_LENGTH),
  }))

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [history, setHistory] = useState<ChatTurn[]>([])
  const [isSending, setIsSending] = useState(false)
  const idRef = useRef(0)

  const pushMessage = useCallback((message: Omit<ChatMessage, "id">) => {
    idRef.current += 1
    const id = idRef.current
    setMessages((prev) => [...prev, { id, ...message }])
  }, [])

  const send = useCallback(
    async (rawText: string, errors: ChatErrors) => {
      const text = rawText.trim()
      if (!text || isSending) return

      pushMessage({ role: "user", content: text })
      setIsSending(true)

      try {
        const res = await fetch(CHAT_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            message: text,
            history: sanitizeHistory(history),
          }),
        })

        if (res.status === 422) {
          const data: ChatApiResponse = await res.json().catch(() => ({}))
          pushMessage({
            role: "assistant",
            content: data.message ?? errors.invalid,
            error: true,
          })
          return
        }

        if (!res.ok) {
          pushMessage({
            role: "assistant",
            content: errors.unavailable,
            error: true,
          })
          return
        }

        const data: ChatApiResponse = await res.json()
        const reply = data.reply ?? errors.unavailable

        pushMessage({
          role: "assistant",
          content: reply,
          sources: Array.isArray(data.sources) ? data.sources : [],
          ticketUrl: data.ticket_url ?? null,
        })

        if (Array.isArray(data.history)) {
          setHistory(sanitizeHistory(data.history))
        } else {
          setHistory((prev) =>
            sanitizeHistory([
              ...prev,
              { role: "user", content: text },
              { role: "assistant", content: reply },
            ]),
          )
        }
      } catch {
        pushMessage({ role: "assistant", content: errors.offline, error: true })
      } finally {
        setIsSending(false)
      }
    },
    [history, isSending, pushMessage],
  )

  return { messages, isSending, send }
}
