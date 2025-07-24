"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Send, Bot, User, Zap, Sparkles, Brain, TrendingUp } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "suggestion"
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "¡Hola! Soy tu asistente inteligente de Procurement AI. Estoy aquí para ayudarte con análisis de proveedores, optimización de costos, evaluación de cotizaciones y mucho más.",
      sender: "bot",
      timestamp: new Date(),
    },
    {
      id: "2",
      content:
        "¿En qué puedo asistirte hoy? Puedo analizar datos, generar reportes o responder cualquier pregunta sobre procurement.",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
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
    setInputMessage("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 2000)
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("proveedor") || input.includes("supplier")) {
      return "Perfecto, puedo ayudarte con la gestión de proveedores. Actualmente tienes 6 proveedores activos en el sistema. Puedo analizar su rendimiento histórico, comparar sus cotizaciones y sugerir los mejores candidatos para tus próximos proyectos. ¿Te gustaría que analice algún proveedor específico o prefieres un análisis general?"
    }

    if (input.includes("cotización") || input.includes("precio") || input.includes("costo")) {
      return "Excelente, el análisis de cotizaciones es una de mis especialidades. He detectado que tienes 5 cotizaciones pendientes de revisión. Puedo comparar precios, analizar términos y condiciones, y identificar la mejor relación costo-beneficio. También puedo predecir tendencias de precios basándome en datos históricos."
    }

    if (input.includes("proyecto")) {
      return "Veo que tienes 12 proyectos activos en desarrollo. Puedo ayudarte con el seguimiento del progreso, asignación óptima de proveedores, gestión de recursos y identificación de posibles riesgos. ¿Hay algún proyecto específico que te preocupe o necesitas un resumen general del estado de todos?"
    }

    if (input.includes("ahorro") || input.includes("optimiz") || input.includes("eficiencia")) {
      return "¡Excelente pregunta sobre optimización! Mi análisis más reciente ha identificado oportunidades de ahorro del 15% consolidando pedidos con proveedores estratégicos. También he detectado patrones que podrían reducir tiempos de entrega en un 20%. ¿Te interesa ver el análisis detallado de estas oportunidades?"
    }

    if (input.includes("reporte") || input.includes("análisis") || input.includes("dashboard")) {
      return "Puedo generar reportes personalizados sobre cualquier aspecto del procurement. Desde análisis de rendimiento de proveedores hasta proyecciones de costos y evaluaciones de riesgo. ¿Qué tipo de reporte necesitas? Puedo crear visualizaciones interactivas y exportar los datos en diferentes formatos."
    }

    return "Entiendo tu consulta. Como tu asistente especializado en procurement, tengo acceso a todos los datos del sistema y puedo ayudarte con análisis profundos, predicciones basadas en IA, optimización de procesos y toma de decisiones estratégicas. ¿Podrías ser más específico sobre qué aspecto te interesa más?"
  }

  const quickSuggestions = [
    {
      text: "Analizar rendimiento de proveedores",
      icon: TrendingUp,
    },
    {
      text: "Comparar cotizaciones pendientes",
      icon: Brain,
    },
    {
      text: "Mostrar oportunidades de ahorro",
      icon: Sparkles,
    },
    {
      text: "Estado de proyectos críticos",
      icon: Zap,
    },
  ]

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/40 to-amber-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="hover:bg-white/50">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Agente IA Procurement</h1>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500">Asistente inteligente activo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {/* Chat Container */}
        <Card className="h-[calc(100vh-200px)] bg-white/70 backdrop-blur-sm border-gray-200/50 shadow-xl">
          {/* Messages Area */}
          <CardContent className="flex flex-col h-full p-0">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start space-x-3 max-w-2xl ${
                      message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                        message.sender === "user"
                          ? "bg-gradient-to-br from-blue-500 to-blue-600"
                          : "bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl px-6 py-4 shadow-sm ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                          : "bg-gradient-to-r from-gray-50 to-white text-gray-900 border border-gray-200/50"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-2 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
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
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl px-6 py-4 border border-gray-200/50 shadow-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length <= 2 && (
              <div className="px-6 pb-4">
                <p className="text-sm text-gray-600 mb-3 font-medium">Sugerencias para comenzar:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {quickSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleSuggestionClick(suggestion.text)}
                      className="justify-start h-auto p-4 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 hover:border-orange-200 bg-white/50 backdrop-blur-sm border-gray-200/50 group"
                    >
                      <suggestion.icon className="w-4 h-4 mr-3 text-orange-600 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">{suggestion.text}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-gray-200/50 p-6 bg-gradient-to-r from-white/50 to-gray-50/50 backdrop-blur-sm">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Pregúntame sobre proveedores, cotizaciones, análisis de costos..."
                    className="w-full px-6 py-4 border border-gray-300/50 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/70 backdrop-blur-sm text-sm placeholder-gray-500 shadow-sm"
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl px-6 py-4 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
