"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Send, BarChart3, User, Zap, CheckCircle, Clock, Hammer, Menu } from "lucide-react"
import Link from "next/link"
import ProjectsSidebar from "@/components/projects-sidebar"
import ResultMessage from "@/components/ResultMessage"

interface Message {
  id: string;
  content:
    | string
    | {
        answer: string;
        table: { headers: string[]; rows: string[][] } | null;
        entities: { type: string; value: string }[];
      };
  sender: "user" | "bot";
  timestamp: Date;
}


export default function TransactionalAgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hola, soy Transactional Agent. ¿Dime qué necesitas?",
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
  // Conectar al endpoint /write del backend
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000"}/api/ask/smart-write`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
  question: currentInput,
  confirm: true,
}),

    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }


   const { answer, entities, table } = await response.json();

// envuelvo todo en un sólo objeto
const botResponse: Message = {
  id: (Date.now()+1).toString(),
  content: {
    answer,
    table,
    entities
  },
  sender: "bot",
  timestamp: new Date(),
};

setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Error connecting to backend:", error)

      // Fallback response si el backend no está disponible
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Lo siento, no puedo conectarme al servidor en este momento. Por favor, verifica que el backend esté ejecutándose en http://localhost:4000",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, fallbackResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const quickSuggestions = [
    {
      text: "Modificar status de V0007 a Inactivo",
      icon: CheckCircle,
    },
    {
      text: "Borrar cotizacion linea 1",
      icon: BarChart3,
    },
    {
      text: "Crear nuevo proyecto id:xxx , name:xxx",
      icon: Clock,
    },
    {
      text: "Aprobar la evaluación EV0002 para V0004",
      icon: Zap,
    },
  ]

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50/40 to-cyan-50/30 flex relative">
      {/* Projects Sidebar */}
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
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <Hammer className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                  </div>
                </div>
                <div className="min-w-0">
                  <h1 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 truncate">
                    Agente Transaccional
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
                      <div
                        className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 ${
                          message.sender === "user"
                            ? "bg-gradient-to-br from-gray-600 to-gray-700"
                            : "bg-gradient-to-br from-blue-500 to-indigo-600"
                        }`}
                      >
                        {message.sender === "user" ? (
                          <User className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                        ) : (
                          <Hammer className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                        )}
                      </div>
                      <div
                        className={`rounded-2xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 shadow-sm ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-gray-600 to-gray-700 text-white"
                            : "bg-gradient-to-r from-white to-blue-50/50 text-gray-900 border border-blue-200/30"
                        }`}
                      >
                       {message.sender === "bot" && typeof message.content !== "string" ? (
  // Cuando content es el objeto, delego en ResultMessage
  <ResultMessage result={message.content} />
) : (
  // Si es string, lo muestro en párrafo
  <p className="text-sm sm:text-base leading-relaxed">
    {message.content as string}
  </p>
)}
                        <p
                          className={`text-xs mt-1 sm:mt-2 ${message.sender === "user" ? "text-gray-200" : "text-gray-500"}`}
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

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                        <Hammer className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                      </div>
                      <div className="bg-gradient-to-r from-white to-blue-50/50 rounded-2xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border border-blue-200/30 shadow-sm">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestions - Una sola columna */}
              {messages.length <= 1 && (
                <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4">
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 font-medium">Operaciones frecuentes:</p>
                  <div className="grid grid-cols-1 gap-2 sm:gap-3 max-w-md">
                    {quickSuggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        onClick={() => handleSuggestionClick(suggestion.text)}
                        className="justify-start h-auto p-2 sm:p-3 lg:p-4 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 hover:border-sky-200 bg-white/50 backdrop-blur-sm border-gray-200/50 group text-left"
                      >
                        <suggestion.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 text-sky-600 group-hover:scale-110 transition-transform flex-shrink-0" />
                        <span className="text-xs sm:text-sm leading-tight">{suggestion.text}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="border-t border-gray-200/50 p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-white/50 to-sky-50/30 backdrop-blur-sm">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Describe la operación que necesitas realizar..."
                      className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border border-gray-300/50 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white/70 backdrop-blur-sm text-sm sm:text-base placeholder-gray-500 shadow-sm"
                      disabled={isTyping}
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white rounded-2xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
