"use client"

import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import Image from "next/image"
import "katex/dist/katex.min.css"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  images?: string[]
}

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user"

  const formatTime = (date: Date) => {
    // Ensure we have a proper Date object
    const dateObj = date instanceof Date ? date : new Date(date)
    return dateObj.toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm ${
          isUser
            ? 'bg-primary'
            : 'bg-gradient-to-br from-blue-500 to-purple-600'
        }`}>
          <span className="text-white text-xs">
            {isUser ? '👤' : '🤖'}
          </span>
        </div>

        {/* Message Content */}
        <div className={`rounded-lg px-4 py-3 shadow-sm ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground'
        }`}>
          {/* Images */}
          {message.images && message.images.length > 0 && (
            <div className="mb-3">
              <div className={`grid gap-2 ${
                message.images.length === 1 
                  ? 'grid-cols-1' 
                  : message.images.length === 2 
                  ? 'grid-cols-2' 
                  : 'grid-cols-2'
              }`}>
                {message.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={image}
                      alt={`Message image ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-auto rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => {
                        // Open image in new tab for full view
                        window.open(image, '_blank')
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Text Content */}
          {message.content && (
            <div className={`prose prose-sm max-w-none ${
              isUser 
                ? 'text-primary-foreground' 
                : 'text-foreground prose-headings:text-foreground prose-strong:text-foreground prose-p:text-foreground prose-li:text-foreground'
            }`}>
              {(() => {
                const normalizeMath = (s: string) => {
                  let t = s
                  // Convert \[ ... \] → $$ ... $$
                  t = t.replace(/\\\[([\s\S]*?)\\\]/g, "$$$1$$")
                  // Convert \( ... \) → $ ... $
                  t = t.replace(/\\\(([\s\S]*?)\\\)/g, "$$1$")
                  // Convert [ \... ] (square brackets around LaTeX) → $$ ... $$
                  t = t.replace(/\[\s*\\([\s\S]*?)\s*\]/g, (_m, inner) => `$$\\${inner}$$`)
                  // Convert ( \... ) → $ ... $
                  t = t.replace(/\(\s*\\([\s\S]*?)\s*\)/g, (_m, inner) => `$\\${inner}$`)
                  // Improve dx spacing: ,dx → \\,dx
                  t = t.replace(/,dx/g, "\\,dx")
                  return t
                }
                const content = normalizeMath(message.content)
                return (
                  <ReactMarkdown 
                    remarkPlugins={[remarkMath, remarkGfm]} 
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      h1: ({children}) => <h1 className="text-lg font-bold mt-4 mb-2 first:mt-0">{children}</h1>,
                      h2: ({children}) => <h2 className="text-base font-semibold mt-3 mb-2 first:mt-0">{children}</h2>,
                      h3: ({children}) => <h3 className="text-sm font-medium mt-2 mb-1">{children}</h3>,
                      ul: ({children}) => <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>,
                      ol: ({children}) => <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>,
                      li: ({children}) => <li className="text-sm ml-2">{children}</li>,
                      p: ({children}) => <p className="my-2 first:mt-0 last:mb-0 text-sm">{children}</p>,
                      strong: ({children}) => <strong className="font-semibold">{children}</strong>,
                      em: ({children}) => <em className="italic">{children}</em>,
                      code: ({children, ...props}) => {
                        const isInline = !props.className?.includes('language-')
                        return isInline 
                          ? <code className="bg-gray-100 px-1 rounded text-xs">{children}</code>
                          : <pre className="bg-gray-100 p-2 rounded my-2 overflow-x-auto"><code className="text-xs">{children}</code></pre>
                      }
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                )
              })()}
            </div>
          )}
          
          <div className={`text-xs mt-2 ${
            isUser ? 'text-primary-foreground/70' : 'text-muted-foreground/70'
          }`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  )
}
