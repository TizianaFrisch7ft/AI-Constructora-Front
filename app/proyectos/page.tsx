"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  Plus,
  FolderOpen,
  Calendar,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  Filter,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function ProyectosPage() {
  const proyectos = [
    {
      id: 1,
      nombre: "Construcción Plaza Norte",
      descripcion: "Desarrollo de centro comercial en zona norte",
      estado: "En Progreso",
      prioridad: "Alta",
      fechaInicio: "2024-01-15",
      fechaFin: "2024-08-30",
      presupuesto: "$5,200,000",
      gastado: "$2,100,000",
      progreso: 65,
      proveedor: "Constructora ABC",
      responsable: "María González",
      categoria: "Construcción",
    },
    {
      id: 2,
      nombre: "Sistema ERP Corporativo",
      descripcion: "Implementación de sistema de gestión empresarial",
      estado: "Planificación",
      prioridad: "Media",
      fechaInicio: "2024-03-01",
      fechaFin: "2024-12-15",
      presupuesto: "$3,800,000",
      gastado: "$450,000",
      progreso: 15,
      proveedor: "Tecnología JKL",
      responsable: "Carlos Ruiz",
      categoria: "Tecnología",
    },
    {
      id: 3,
      nombre: "Renovación Oficinas",
      descripcion: "Modernización de espacios de trabajo",
      estado: "En Progreso",
      prioridad: "Baja",
      fechaInicio: "2024-02-10",
      fechaFin: "2024-06-20",
      presupuesto: "$1,500,000",
      gastado: "$1,200,000",
      progreso: 80,
      proveedor: "Materiales XYZ",
      responsable: "Ana López",
      categoria: "Infraestructura",
    },
    {
      id: 4,
      nombre: "Consultoría Procesos",
      descripcion: "Optimización de procesos operativos",
      estado: "Completado",
      prioridad: "Alta",
      fechaInicio: "2023-10-01",
      fechaFin: "2024-01-31",
      presupuesto: "$950,000",
      gastado: "$920,000",
      progreso: 100,
      proveedor: "Consultoría MNO",
      responsable: "Pedro Silva",
      categoria: "Consultoría",
    },
    {
      id: 5,
      nombre: "Logística Distribución",
      descripcion: "Mejora del sistema de distribución nacional",
      estado: "En Revisión",
      prioridad: "Media",
      fechaInicio: "2024-04-01",
      fechaFin: "2024-10-30",
      presupuesto: "$2,300,000",
      gastado: "$680,000",
      progreso: 30,
      proveedor: "Logística GHI",
      responsable: "Laura Martín",
      categoria: "Logística",
    },
  ]

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "En Progreso":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En Progreso</Badge>
      case "Planificación":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Planificación</Badge>
      case "Completado":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completado</Badge>
      case "En Revisión":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">En Revisión</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  const getPrioridadBadge = (prioridad: string) => {
    switch (prioridad) {
      case "Alta":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Alta</Badge>
      case "Media":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Media</Badge>
      case "Baja":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Baja</Badge>
      default:
        return <Badge variant="secondary">{prioridad}</Badge>
    }
  }

  const getProgressColor = (progreso: number) => {
    if (progreso >= 80) return "bg-green-500"
    if (progreso >= 50) return "bg-blue-500"
    if (progreso >= 25) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50/30 to-cyan-50/20">
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
              <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Gestión de Proyectos</h1>
                <p className="text-sm text-gray-500">Administra y monitorea tus proyectos</p>
              </div>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Proyecto
          </Button>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Proyectos</p>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
                <FolderOpen className="w-8 h-8 text-sky-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En Progreso</p>
                  <p className="text-3xl font-bold text-blue-600">3</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completados</p>
                  <p className="text-3xl font-bold text-green-600">1</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Presupuesto Total</p>
                  <p className="text-3xl font-bold text-purple-600">$13.7M</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6 bg-white/70 backdrop-blur-sm border-gray-200/50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar proyectos..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                />
              </div>
              <Button variant="outline" className="bg-white/50 backdrop-blur-sm border-gray-200/50">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Proyectos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {proyectos.map((proyecto) => (
            <Card
              key={proyecto.id}
              className="bg-white/70 backdrop-blur-sm border-gray-200/50 hover:shadow-lg transition-all duration-300 hover:bg-white/90"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 mb-1">{proyecto.nombre}</CardTitle>
                    <p className="text-sm text-gray-600 mb-2">{proyecto.descripcion}</p>
                    <div className="flex items-center space-x-2">
                      {getEstadoBadge(proyecto.estado)}
                      {getPrioridadBadge(proyecto.prioridad)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progreso</span>
                    <span className="text-sm font-medium text-gray-700">{proyecto.progreso}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(proyecto.progreso)}`}
                      style={{ width: `${proyecto.progreso}%` }}
                    ></div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Inicio: {new Date(proyecto.fechaInicio).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{proyecto.responsable}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <BarChart3 className="w-4 h-4" />
                      <span>{proyecto.categoria}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Fin: {new Date(proyecto.fechaFin).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      <span>{proyecto.presupuesto}</span>
                    </div>
                    <div className="text-gray-600">
                      <span className="text-xs">Gastado: {proyecto.gastado}</span>
                    </div>
                  </div>
                </div>

                {/* Provider */}
                <div className="pt-3 border-t border-gray-200/50">
                  <p className="text-sm text-gray-500">Proveedor Principal</p>
                  <p className="font-medium text-gray-900">{proyecto.proveedor}</p>
                </div>

                <div className="pt-3">
                  <Button
                    variant="outline"
                    className="w-full bg-white/50 backdrop-blur-sm border-gray-200/50 hover:bg-sky-50"
                  >
                    Ver Detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
