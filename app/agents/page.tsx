"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, HardHat, Brain, TrendingUp, BarChart3, Hammer, MessageCircle, Wrench } from "lucide-react"
import Link from "next/link"

export default function AgentsPage() {
  const agents = [
    {
      id: "transactional",
      name: "Transactional Agent",
      title: "Agente Transaccional",
      description: "Especializado en operaciones, transacciones y gestión de procesos de procurement en tiempo real.",
      features: [
        "Procesamiento de órdenes de compra",
        "Gestión de inventarios",
        "Seguimiento de entregas",
        "Automatización de workflows",
        "Integración con sistemas ERP",
      ],
      icon: Hammer,
      color: "from-blue-500 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-50",
      mainIcon: BarChart3,
      href: "/agents/transactional",
    },
    {
      id: "ask",
      name: "Ask Agent",
      title: "Agente Consultor",
      description: "Experto en análisis, consultoría estratégica y respuestas a consultas complejas de procurement.",
      features: [
        "Análisis de mercado y tendencias",
        "Recomendaciones estratégicas",
        "Evaluación de proveedores",
        "Optimización de costos",
        "Insights y reportes avanzados",
      ],
      icon: Wrench,
      color: "from-emerald-500 to-teal-600",
      bgColor: "from-emerald-50 to-teal-50",
      mainIcon: Brain,
      href: "/agents/ask",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-4 sm:px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="hover:bg-white/50">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-sky-500 via-blue-500 to-sky-600 rounded-full flex items-center justify-center shadow-lg">
                <HardHat className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-semibold text-gray-900">Agentes IA Procurement</h1>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                  Selecciona tu asistente especializado
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-3 sm:mb-4">
            Elige tu Agente IA
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Contamos con agentes especializados para diferentes necesidades de procurement. Cada uno está entrenado para
            brindarte la mejor asistencia en su área de expertise.
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {agents.map((agent) => (
            <Card
              key={agent.id}
              className="group bg-white/70 backdrop-blur-sm border-gray-200/50 hover:shadow-2xl transition-all duration-500 hover:bg-white/90 hover:scale-[1.02] overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${agent.color}`}></div>

              <CardHeader className="pb-4 sm:pb-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br ${agent.color} p-3 sm:p-4 shadow-lg flex items-center justify-center`}
                    >
                      <agent.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br ${agent.color} rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <agent.mainIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                      {agent.title}
                    </CardTitle>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{agent.description}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 sm:space-y-6">
                {/* Features */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center text-sm sm:text-base">
                    <HardHat className="w-4 h-4 mr-2 text-sky-500" />
                    Especialidades
                  </h3>
                  <ul className="space-y-2">
                    {agent.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-xs sm:text-sm text-gray-600">
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${agent.color} mr-3 flex-shrink-0 mt-1.5`}
                        ></div>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="pt-2 sm:pt-4">
                  <Link href={agent.href} className="block">
                    <Button
                      className={`w-full bg-gradient-to-r ${agent.color} hover:shadow-lg transition-all duration-300 text-white font-medium py-2.5 sm:py-3 text-sm sm:text-base group-hover:scale-[1.02]`}
                    >
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Iniciar Conversación
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 sm:mt-16">
          <Card className="bg-gradient-to-r from-sky-50 via-blue-50 to-sky-50 border-sky-200/50">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-sky-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">
                    ¿No estás seguro cuál elegir?
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Ambos agentes pueden ayudarte con consultas generales. El <strong>Transactional Agent</strong> es
                    ideal para operaciones del día a día, mientras que el <strong>Ask Agent</strong> es perfecto para
                    análisis estratégicos y consultas complejas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
