import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm the ISH Digital Studio assistant. Ask me about our services, pricing, or timelines." },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMessage = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE_URL}/chat/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      setMessages([...newMessages, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: "Sorry, something went wrong. Please try WhatsApp instead." }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        data-cursor-hover
        aria-label="Chat with us"
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      >
        {open ? <X size={22} className="text-[#020617]" /> : <MessageCircle size={22} className="text-[#020617]" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-40 right-6 z-50 w-[90vw] max-w-sm h-[70vh] max-h-[520px] rounded-2xl bg-[#0F172A] border border-[#00E5FF]/20 shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="px-4 py-3 bg-gradient-to-r from-[#00E5FF]/10 to-[#8B5CF6]/10 border-b border-white/10">
              <p className="font-semibold text-sm">ISH Digital Studio</p>
              <p className="text-xs text-white/50">Usually replies instantly</p>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                      m.role === 'user'
                        ? 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-[#020617]'
                        : 'bg-white/5 text-white/90'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 px-3 py-2 rounded-xl">
                    <Loader2 size={14} className="animate-spin text-[#00E5FF]" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            <div className="p-3 border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 bg-white/5 border border-white/10 focus:border-[#00E5FF] rounded-full px-4 py-2 text-sm outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                data-cursor-hover
                className="w-9 h-9 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] flex items-center justify-center disabled:opacity-50"
              >
                <Send size={16} className="text-[#020617]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}