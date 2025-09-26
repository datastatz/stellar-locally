"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { MessageBubble } from "./MessageBubble"
import { XPBar } from "./XPBar"
import { UnitCircle } from "./UnitCircle"
import { PeriodiekSysteem } from "./PeriodiekSysteem"
import { useChat } from "@/lib/hooks/useChat"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  images?: string[] // Array van base64 encoded images
}

export function ChatInterface() {
  const { messages: aiMessages, isLoading, sendMessage: sendAIMessage, error } = useChat()
  const [inputValue, setInputValue] = useState("")
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [xp, setXp] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [showXpAnimation, setShowXpAnimation] = useState(false)
  const [showUnitCircleManual, setShowUnitCircleManual] = useState(false)
  const [showPeriodiekManual, setShowPeriodiekManual] = useState(false)

  // Convert AI messages to our Message format
  const messages: Message[] = aiMessages.map(msg => ({
    id: msg.id,
    content: msg.content,
    sender: msg.role === 'user' ? 'user' : 'ai',
    timestamp: msg.timestamp,
    images: msg.images || undefined
  }))

  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize client-side state and load XP from localStorage
  useEffect(() => {
    setIsClient(true)
    const savedXP = localStorage.getItem('chatXP')
    if (savedXP) {
      setXp(parseInt(savedXP))
    }
  }, [])

  // Save XP to localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('chatXP', xp.toString())
    }
  }, [xp, isClient])

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    const el = messagesContainerRef.current
    if (!el) return
    
    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight
    })
  }, [messages, isLoading])

  const handleSendMessage = async () => {
    if ((!inputValue.trim() && selectedImages.length === 0) || isLoading) return

    const messageText = inputValue.trim()
    const images = [...selectedImages]
    
    // Clear input and images
    setInputValue("")
    setSelectedImages([])

    // Award XP
    setXp(prev => prev + 10)
    setShowXpAnimation(true)
    setTimeout(() => setShowXpAnimation(false), 2000)

    // Send message to AI
    try {
      await sendAIMessage(messageText, images)
    } catch (err) {
      console.error('Failed to send message:', err)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleImagesChange = (images: string[]) => {
    setSelectedImages(images)
  }

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.type.startsWith('image/')) {
        e.preventDefault()
        const file = item.getAsFile()
        if (file) {
          const reader = new FileReader()
          reader.onload = (event) => {
            const result = event.target?.result as string
            if (result) {
              setSelectedImages(prev => [...prev, result])
            }
          }
          reader.readAsDataURL(file)
        }
      }
    }
  }

  const handleImageUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.multiple = true
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files
      if (files) {
        Array.from(files).forEach(file => {
          const reader = new FileReader()
          reader.onload = (event) => {
            const result = event.target?.result as string
            if (result) {
              setSelectedImages(prev => [...prev, result])
            }
          }
          reader.readAsDataURL(file)
        })
      }
    }
    input.click()
  }


  const currentLevel = Math.floor(xp / 100) + 1
  const xpForCurrentLevel = xp % 100
  const xpToNextLevel = 100 - xpForCurrentLevel

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Header with XP */}
      <div className="p-6 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden shadow-sm">
              <Image
                src="/baby-stellar.svg"
                alt="Baby Stellar"
                width={48}
                height={48}
                quality={100}
                priority
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-card-foreground">Chat met Baby Stellar</h2>
              <p className="text-sm text-muted-foreground">Jouw AI studiebuddy</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-card-foreground">
              {isClient ? `Level ${currentLevel}` : 'Level 1'}
            </div>
            <div className="text-xs text-muted-foreground">
              {isClient ? `${xpToNextLevel} XP naar volgend level` : '100 XP naar volgend level'}
            </div>
          </div>
        </div>
        <XPBar currentXP={isClient ? xpForCurrentLevel : 0} totalXP={100} />
      </div>

      {/* XP Animation */}
      {showXpAnimation && (
        <div className="fixed top-20 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg animate-bounce z-50">
          +10 XP verdiend! ✨
        </div>
      )}

      {/* Messages */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {/* Typing Indicator - only show if no messages are being streamed */}
        {isLoading && messages.length === 0 && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white text-sm">🤖</span>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white text-sm">⚠️</span>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Unit Circle Display */}
        {(showUnitCircleManual) && (
          <div className="mt-4">
            <UnitCircle />
          </div>
        )}

        {/* Periodiek Systeem Display */}
        {showPeriodiekManual && (
          <div className="mt-4">
            <PeriodiekSysteem />
          </div>
        )}

        {/* spacer */}
        <div />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-border bg-card">
        <div className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            onPaste={handlePaste}
            placeholder="Stel een vraag aan Baby Stellar... (of plak een foto met Ctrl+V)"
            className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button
            onClick={handleSendMessage}
            disabled={(!inputValue.trim() && selectedImages.length === 0) || isLoading}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {isLoading ? "Versturen..." : "Verstuur"}
          </button>
        </div>
        <div className="mt-2 text-xs text-muted-foreground text-center">
          Druk op Enter om te versturen • Elke vraag = +10 XP
        </div>

        {/* Selected Images Preview */}
        {selectedImages.length > 0 && (
          <div className="mt-4">
            <div className="text-sm text-muted-foreground mb-2">Geselecteerde foto&apos;s:</div>
            <div className="flex flex-wrap gap-2">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={image}
                      alt={`Selected image ${index + 1}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== index))}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setShowUnitCircleManual((v) => !v)}
            className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <span className="inline-block h-4 w-4 rounded-full border-2 border-foreground" />
            {showUnitCircleManual ? "Verberg eenheidscirkel" : "Toon eenheidscirkel"}
          </button>

          <button
            type="button"
            onClick={() => setShowPeriodiekManual((v) => !v)}
            className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <span className="inline-block h-4 w-4 rounded-sm border-2 border-foreground" />
            {showPeriodiekManual ? "Verberg periodiek systeem" : "Toon periodiek systeem"}
          </button>

          <button
            type="button"
            onClick={handleImageUpload}
            className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <span className="inline-block h-5 w-4">🖼️</span>
            Foto toevoegen
          </button>
        </div>
      </div>
    </div>
  )
}
