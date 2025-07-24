"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Search,
  Bell,
  User,
  Users,
  FolderOpen,
  ClipboardCheck,
  Star,
  Target,
  FileText,
  TrendingUp,
  MessageCircle,
  CheckCircle,
  AlertTriangle,
  Zap,
  UserPlus,
  Plus,
  BarChart,
  Building2,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProcurementDashboard() {
  const router = useRouter()

  const stats = [
    {
      title: "Proveedores Activos",
      value: "6",
      subtitle: "Registrados en el sistema",
      icon: Users,
      color: "text-blue-600",
      href: "/proveedores",
    },
    {
      title: "Proyectos en Curso",
      value: "12",
      subtitle: "En desarrollo",
      icon: FolderOpen,
      color: "text-green-600",
      href: "/proyectos",
    },
    {
      title: "Evaluaciones",
      value: "5",
      subtitle: "Total registradas",
      icon: ClipboardCheck,
      color: "text-orange-600",
      href: "/evaluaciones",
    },
    {
      title: "Cotizaciones",
      value: "5",
      subtitle: "En el sistema",
      icon: FileText,
      color: "text-purple-600",
      href: "/cotizaciones",
    },
  ]

  const recentActivity = [
    {
      title: "Evaluación completada: Constructora ABC",
      time: "Hace 2 horas",
      type: "success",
      icon: CheckCircle,
    },
    {
      title: "Nueva cotización recibida: Proyecto Plaza Norte",
      time: "Hace 4 horas",
      type: "info",
      icon: FileText,
    },
    {
      title: "Evaluación próxima a vencer: Materiales XYZ",
      time: "Hace 5 horas",
      type: "warning",
      icon: AlertTriangle,
    },
    {
      title: "Análisis IA completado: Comparativa Q4 2024",
      time: "Hace 1 día",
      type: "success",
      icon: CheckCircle,
    },
  ]

  const quickActions = [
    {
      title: "Nuevo Proveedor",
      subtitle: "Registrar un nuevo proveedor",
      icon: UserPlus,
      href: "/proveedores",
    },
    {
      title: "Crear Proyecto",
      subtitle: "Iniciar un nuevo proyecto",
      icon: Plus,
      href: "/proyectos",
    },
    {
      title: "Análisis IA",
      subtitle: "Ejecutar análisis inteligente",
      icon: Zap,
      href: "/agents",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-sky-50/30 to-blue-50/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Procurement AI</h1>
                <p className="text-sm text-gray-500">tu Copiloto de Compras</p>
              </div>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar proveedores, proyectos..."
                className="pl-10 pr-4 py-2 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
              />
            </div>
            <Link href="/agents">
              <Button className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white shadow-lg border-0 px-6 py-2.5 rounded-xl font-medium transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-3 h-3" />
                  </div>
                  <span>Consultar Agente IA</span>
                </div>
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="hover:bg-white/50">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-white/50">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white/60 backdrop-blur-sm border-r border-gray-200/50 min-h-screen">
          <nav className="p-4 space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">PRINCIPAL</h3>
              <Link href="/">
                <Button
                  variant="ghost"
                  className="w-full justify-start bg-gradient-to-r from-sky-50 to-blue-50 text-sky-700 hover:from-sky-100 hover:to-blue-100 border border-sky-200/50"
                >
                  <Building2 className="w-4 h-4 mr-3" />
                  Dashboard
                </Button>
              </Link>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                GESTIÓN DE ENTIDADES
              </h3>
              <div className="space-y-1">
                <Link href="/proveedores">
                  <Button variant="ghost" className="w-full justify-start hover:bg-white/50">
                    <Users className="w-4 h-4 mr-3" />
                    Proveedores
                  </Button>
                </Link>
                <Link href="/proyectos">
                  <Button variant="ghost" className="w-full justify-start hover:bg-white/50">
                    <FolderOpen className="w-4 h-4 mr-3" />
                    Proyectos
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                PROCESOS DE EVALUACIÓN
              </h3>
              <div className="space-y-1">
                <Link href="/evaluaciones">
                  <Button variant="ghost" className="w-full justify-start hover:bg-white/50">
                    <ClipboardCheck className="w-4 h-4 mr-3" />
                    Evaluaciones
                  </Button>
                </Link>
                <Link href="/preseleccion">
                  <Button variant="ghost" className="w-full justify-start hover:bg-white/50">
                    <Star className="w-4 h-4 mr-3" />
                    Preselección
                  </Button>
                </Link>
                <Link href="/asignacion">
                  <Button variant="ghost" className="w-full justify-start hover:bg-white/50">
                    <Target className="w-4 h-4 mr-3" />
                    Asignación
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                SISTEMA DE COTIZACIONES
              </h3>
              <div className="space-y-1">
                <Link href="/cotizaciones">
                  <Button variant="ghost" className="w-full justify-start hover:bg-white/50">
                    <FileText className="w-4 h-4 mr-3" />
                    Cotizaciones
                  </Button>
                </Link>
                <Link href="/analisis">
                  <Button variant="ghost" className="w-full justify-start hover:bg-white/50">
                    <TrendingUp className="w-4 h-4 mr-3" />
                    Análisis IA
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                INTELIGENCIA ARTIFICIAL
              </h3>
              <Link href="/agents">
                <Button variant="ghost" className="w-full justify-start hover:bg-white/50">
                  <Zap className="w-4 h-4 mr-3" />
                  Agente IA
                </Button>
              </Link>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">REPORTES Y ANÁLISIS</h3>
              <Link href="/reportes">
                <Button variant="ghost" className="w-full justify-start hover:bg-white/50">
                  <BarChart className="w-4 h-4 mr-3" />
                  Reportes
                </Button>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600">Resumen general del sistema de compras</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Link key={index} href={stat.href}>
                <Card className="hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-gray-200/50 hover:bg-white/90 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform">
                          {stat.value}
                        </p>
                        <p className="text-sm text-gray-500">{stat.subtitle}</p>
                      </div>
                      <stat.icon className={`w-8 h-8 ${stat.color} group-hover:scale-110 transition-transform`} />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card className="lg:col-span-2 bg-white/70 backdrop-blur-sm border-gray-200/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-orange-600" />
                  Actividad Reciente
                </CardTitle>
                <p className="text-sm text-gray-600">Últimas acciones en el sistema</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors"
                    >
                      <div
                        className={`p-2 rounded-full ${
                          activity.type === "success"
                            ? "bg-green-100"
                            : activity.type === "warning"
                              ? "bg-yellow-100"
                              : "bg-blue-100"
                        }`}
                      >
                        <activity.icon
                          className={`w-4 h-4 ${
                            activity.type === "success"
                              ? "text-green-600"
                              : activity.type === "warning"
                                ? "text-yellow-600"
                                : "text-blue-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <p className="text-sm text-gray-600">Herramientas de uso frecuente</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <Link key={index} href={action.href}>
                      <Button
                        variant="outline"
                        className="w-full justify-start h-auto p-4 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 hover:border-sky-200 bg-white/50 backdrop-blur-sm border-gray-200/50 group"
                      >
                        <action.icon className="w-5 h-5 mr-3 text-sky-600 group-hover:scale-110 transition-transform" />
                        <div className="text-left">
                          <p className="font-medium">{action.title}</p>
                          <p className="text-xs text-gray-500">{action.subtitle}</p>
                        </div>
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights */}
          <Card className="mt-6 bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-orange-600" />
                Insights de IA
              </CardTitle>
              <p className="text-sm text-gray-600">Análisis y recomendaciones del sistema inteligente</p>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-sky-50 via-blue-50 to-sky-50 p-6 rounded-lg border border-sky-200/30">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-br from-sky-100 to-blue-100 rounded-full shadow-sm">
                    <TrendingUp className="w-6 h-6 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Optimización de Costos Detectada</h3>
                    <p className="text-gray-700 mb-3">
                      El análisis IA ha identificado una oportunidad de ahorro del 15% en materiales de construcción
                      consolidando pedidos con Constructora ABC.
                    </p>
                    <Link href="/agents">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 shadow-sm"
                      >
                        Ver Detalles
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
