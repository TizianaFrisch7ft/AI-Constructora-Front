"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  Plus,
  ClipboardCheck,
  Calendar,
  Star,
  User,
  FileText,
  Clock,
  CheckCircle,
  Filter,
} from "lucide-react"
import Link from "next/link"

export default function EvaluacionesPage() {
  const evaluaciones = [
    {
      id: 1,
      titulo: "Evaluación Constructora ABC",
      proveedor: "Constructora ABC",
      proyecto: "Construcción Plaza Norte",
      estado: "Completada",
      puntuacion: 4.8,
      fechaCreacion: "2024-01-10",
      fechaCompletado: "2024-01-15",
      evaluador: "María González",
      categoria: "Construcción",
      criterios: {
        calidad: 4.9,
        tiempo: 4.7,
        costo: 4.8,
        comunicacion: 4.8,
      },
      comentarios: "Excelente desempeño en todos los aspectos evaluados.",
    },
    {
      id: 2,
      titulo: "Evaluación Materiales XYZ",
      proveedor: "Materiales XYZ",
      proyecto: "Renovación Oficinas",
      estado: "En Progreso",
      puntuacion: 4.2,
      fechaCreacion: "2024-02-05",
      fechaCompletado: null,
      evaluador: "Carlos Ruiz",
      categoria: "Materiales",
      criterios: {
        calidad: 4.3,
        tiempo: 4.0,
        costo: 4.4,
        comunicacion: 4.1,
      },
      comentarios: "Evaluación en curso, resultados preliminares positivos.",
    },
    {
      id: 3,
      titulo: "Evaluación Tecnología JKL",
      proveedor: "Tecnología JKL",
      proyecto: "Sistema ERP Corporativo",
      estado: "Pendiente",
      puntuacion: null,
      fechaCreacion: "2024-02-20",
      fechaCompletado: null,
      evaluador: "Ana López",
      categoria: "Tecnología",
      criterios: {
        calidad: null,
        tiempo: null,
        costo: null,
        comunicacion: null,
      },
      comentarios: "Evaluación programada para la próxima semana.",
    },
    {
      id: 4,
      titulo: "Evaluación Consultoría MNO",
      proveedor: "Consultoría MNO",
      proyecto: "Consultoría Procesos",
      estado: "Completada",
      puntuacion: 4.6,
      fechaCreacion: "2023-12-15",
      fechaCompletado: "2024-01-31",
      evaluador: "Pedro Silva",
      categoria: "Consultoría",
      criterios: {
        calidad: 4.7,
        tiempo: 4.5,
        costo: 4.6,
        comunicacion: 4.6,
      },
      comentarios: "Muy buen trabajo, cumplió con todas las expectativas.",
    },
    {
      id: 5,
      titulo: "Evaluación Servicios Técnicos DEF",
      proveedor: "Servicios Técnicos DEF",
      proyecto: "Mantenimiento Equipos",
      estado: "En Revisión",
      puntuacion: 4.4,
      fechaCreacion: "2024-01-25",
      fechaCompletado: "2024-02-10",
      evaluador: "Laura Martín",
      categoria: "Servicios",
      criterios: {
        calidad: 4.5,
        tiempo: 4.2,
        costo: 4.5,
        comunicacion: 4.4,
      },
      comentarios: "Evaluación completada, pendiente de revisión final.",
    },
  ]

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Completada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completada</Badge>
      case "En Progreso":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En Progreso</Badge>
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "En Revisión":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">En Revisión</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-gray-400">Sin calificar</span>

    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className={`w-4 h-4 ${star <= rating ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
        ))}
        <span className="text-sm font-medium text-gray-700 ml-1">{rating.toFixed(1)}</span>
      </div>
    )
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
                <ClipboardCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Evaluaciones</h1>
                <p className="text-sm text-gray-500">Gestiona las evaluaciones de proveedores</p>
              </div>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Evaluación
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
                  <p className="text-sm font-medium text-gray-600">Total Evaluaciones</p>
                  <p className="text-3xl font-bold text-gray-900">5</p>
                </div>
                <ClipboardCheck className="w-8 h-8 text-sky-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completadas</p>
                  <p className="text-3xl font-bold text-green-600">2</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En Progreso</p>
                  <p className="text-3xl font-bold text-blue-600">2</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Puntuación Promedio</p>
                  <p className="text-3xl font-bold text-yellow-600">4.5</p>
                </div>
                <Star className="w-8 h-8 text-yellow-600" />
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
                  placeholder="Buscar evaluaciones..."
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

        {/* Evaluaciones Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {evaluaciones.map((evaluacion) => (
            <Card
              key={evaluacion.id}
              className="bg-white/70 backdrop-blur-sm border-gray-200/50 hover:shadow-lg transition-all duration-300 hover:bg-white/90"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 mb-1">{evaluacion.titulo}</CardTitle>
                    <p className="text-sm text-gray-600 mb-2">{evaluacion.proveedor}</p>
                    <div className="flex items-center space-x-2">
                      {getEstadoBadge(evaluacion.estado)}
                      <Badge variant="outline" className="bg-white/50">
                        {evaluacion.categoria}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Rating */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Puntuación General</p>
                  {renderStars(evaluacion.puntuacion)}
                </div>

                {/* Criterios */}
                {evaluacion.puntuacion && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Criterios de Evaluación</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Calidad:</span>
                        <span className="font-medium">{evaluacion.criterios.calidad?.toFixed(1) || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tiempo:</span>
                        <span className="font-medium">{evaluacion.criterios.tiempo?.toFixed(1) || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Costo:</span>
                        <span className="font-medium">{evaluacion.criterios.costo?.toFixed(1) || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Comunicación:</span>
                        <span className="font-medium">{evaluacion.criterios.comunicacion?.toFixed(1) || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Project and Details */}
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FileText className="w-4 h-4" />
                    <span>Proyecto: {evaluacion.proyecto}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span>Evaluador: {evaluacion.evaluador}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Creada: {new Date(evaluacion.fechaCreacion).toLocaleDateString()}</span>
                  </div>
                  {evaluacion.fechaCompletado && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Completada: {new Date(evaluacion.fechaCompletado).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {/* Comments */}
                {evaluacion.comentarios && (
                  <div className="pt-3 border-t border-gray-200/50">
                    <p className="text-sm text-gray-500 mb-1">Comentarios</p>
                    <p className="text-sm text-gray-700">{evaluacion.comentarios}</p>
                  </div>
                )}

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
