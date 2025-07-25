"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Send, Brain, User, TrendingUp, BarChart3, Target, Lightbulb, Wrench, Menu } from "lucide-react"
import Link from "next/link"
import ProjectsSidebar from "@/components/projects-sidebar"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import AgentResultMessage from "@/components/AgentResultMessage"
import TypingIndicator from "@/components/TypingIndicator"




interface Entity {
  type: string
  id?: string
  name: string
  rut?: string
  surname?: string
  email?: string
}

interface Recipient {
  name: string
  email: string
}

interface BotContent {
  answer: string
  entities: Entity[]
  offerReminder?: boolean
  reminderRecipients?: Recipient[]
  rfqId?: string
}

interface Message {
  id: string
  sender: "user" | "bot"
  timestamp: Date
  content: string | BotContent
}


function isTableFormat(data: any): data is { headers: string[]; rows: string[][] } {
  return (
    typeof data === "object" &&
    data !== null &&
    Array.isArray(data.headers) &&
    Array.isArray(data.rows)
  )
}


export default function AskAgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hola, soy Ask Agent. ¿Dime qué necesitas?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputMessage
    setInputMessage("")
    setIsTyping(true)

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ask/smart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: currentInput }),
    })
    if (!res.ok) throw new Error(res.statusText)
    // Incluye rfqId en la respuesta
    const { answer, entities, offerReminder, reminderRecipients, rfqId } = await res.json()

    const botMessage: Message = {
      id: Date.now().toString(),
      sender: "bot",
      timestamp: new Date(),
      content: {
        answer,
        entities: entities.map((e: any) => ({
          type: e.type,
          name: e.name,
          rut: e.rut,
          surname: e.surname,
          email: e.email,
        })),
        offerReminder,
        reminderRecipients,
        rfqId, // ← aquí
      },
    }

    setMessages(prev => [...prev, botMessage])

  } catch (e) {
    // fallback…
  } finally {
    setIsTyping(false)
  }
}

  const quickSuggestions = [
    {
      text: "Listame los proveedores",
      icon: TrendingUp,
    },
    {
      text: "Algun proveedor incumplio los plazos?",
      icon: Target,
    },
    {
      text: "Mostrar niveles de inventario por obra P0001",
      icon: BarChart3,
    },
    {
      text: "Todos los PM ya te pasaron las necesidades de consumibles?",
      icon: Lightbulb,
    },
  ]

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50/40 to-blue-50/30 flex relative">
    
      {/* Mobile Sidebar */}
      <ProjectsSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Chat Area - Más ancho */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 min-w-0">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden hover:bg-white/50 h-8 w-8 sm:h-10 sm:w-10"
                >
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Link href="/agents">
                  <Button variant="ghost" size="icon" className="hover:bg-white/50 h-8 w-8 sm:h-10 sm:w-10">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Brain className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                  </div>
                </div>
                <div className="min-w-0">
                  <h1 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 truncate">
                    Agente Consultor
                  </h1>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm text-gray-500 hidden sm:block">Conectado al backend</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-2 sm:p-4 lg:p-6 min-h-0">
          {/* Chat Container - Más ancho */}
        <Card className="h-[80vh] bg-white/70 backdrop-blur-sm border-gray-200/50 shadow-xl flex flex-col max-w-none"> 
            {/* Messages Area */}
            <CardContent className="flex flex-col h-full p-0">
           <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-6">
  {messages.map((message) => (
    <div
      key={message.id}
      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex items-start space-x-2 sm:space-x-3 max-w-[90%] sm:max-w-[80%] lg:max-w-4xl ${
          message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
        }`}
      >
        {/* Avatar */}
        <div
          className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 ${
            message.sender === "user"
              ? "bg-gradient-to-br from-gray-600 to-gray-700"
              : "bg-gradient-to-br from-cyan-500 to-blue-500"
          }`}
        >
          {message.sender === "user" ? (
            <User className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
          ) : (
            <Wrench className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
          )}
        </div>

        {/* Bubble */}
        <div
          className={`rounded-2xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 shadow-sm ${
            message.sender === "user"
              ? "bg-gradient-to-r from-gray-600 to-gray-700 text-white"
              : "bg-gradient-to-r from-white to-cyan-50/50 text-gray-900 border border-cyan-200/30"
          }`}
        >
         {typeof message.content === "string" ? (
  <ReactMarkdown>{message.content}</ReactMarkdown>
) : (
  <AgentResultMessage result={message.content} />
)}

          <p
            className={`text-xs mt-1 ${
              message.sender === "user" ? "text-gray-200" : "text-gray-500"
            }`}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  ))}

  {isTyping && <TypingIndicator />}
  <div className="flex justify-start">
    {/* ... tu indicador de "typing" ... */}
  </div>
  <div ref={messagesEndRef} />
</div>

              {/* Quick Suggestions - Una sola columna */}
              {messages.length <= 1 && (
                <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4">
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 font-medium">Consultas estratégicas:</p>
                  <div className="grid grid-cols-1 gap-2 sm:gap-3 max-w-md">
                    {quickSuggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        onClick={() => handleSuggestionClick(suggestion.text)}
                        className="justify-start h-auto p-2 sm:p-3 lg:p-4 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:border-cyan-200 bg-white/50 backdrop-blur-sm border-gray-200/50 group text-left"
                      >
                        <suggestion.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 text-cyan-600 group-hover:scale-110 transition-transform flex-shrink-0" />
                        <span className="text-xs sm:text-sm leading-tight">{suggestion.text}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="border-t border-gray-200/50 p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-white/50 to-cyan-50/30 backdrop-blur-sm">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Comparte tu consulta estratégica o análisis que necesitas..."
                      className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border border-gray-300/50 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white/70 backdrop-blur-sm text-sm sm:text-base placeholder-gray-500 shadow-sm"
                      disabled={isTyping}
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-2xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
