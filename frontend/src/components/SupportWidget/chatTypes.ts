export type ChatRole = "user" | "assistant"

export type ChatErrors = {
  invalid: string
  offline: string
  unavailable: string
}

export type ChatTurn = {
  role: ChatRole
  content: string
}

export type ChatMessage = {
  id: number
  role: ChatRole
  content: string
  sources?: string[]
  ticketUrl?: string | null
  error?: boolean
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")

/** Markdown minimal (gras, titres en gras, sauts de ligne) sur texte échappé. */
export const renderRichText = (text: string): string =>
  escapeHtml(text)
    .replace(/^#{1,3}\s?(.*)$/gm, "<strong>$1</strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>")
