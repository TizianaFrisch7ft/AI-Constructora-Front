"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  Plus,
  FileText,
  Calendar,
  DollarSign,
  Building,
  Clock,
  CheckCircle,
  Filter,
  TrendingDown,
} from "lucide-react"
import Link from "next/link"

export default function CotizacionesPage() {
  const cotizaciones = [
    {
      id: 1,
      numero: "COT-2024-001",
      proveedor: "Constructora ABC",
      proyecto: "Construcción Plaza Norte",
      estado: "Aprobada",
      monto: "$2,450,000",
      fechaSolicitud: "2024-01-10",
      fechaVencimiento: "2024-02-10",
      fechaRespuesta: "2024-01-15",
      categoria: "Construcción",
      items: 15,
      descuento: 5,
      validez: 30,
      moneda: "CLP",
    },
    {
      id: 2,
      numero: "COT-2024-002",
      proveedor: "Materiales XYZ",
      proyecto: "Renovación Oficinas",
      estado: "Pendiente",
      monto: "$890,000",
      fechaSolicitud: "2024-02-01",
      fechaVencimiento: "2024-03-01",
      fechaRespuesta: null,
      categoria: "Materiales",
      items: 8,
      descuento: 0,
      validez: 45,
      moneda: "CLP",
    },
    {
      id: 3,
      numero: "COT-2024-003",
      proveedor: "Tecnología JKL",
      proyecto: "Sistema ERP Corporativo",
      estado: "En Revisión",
      monto: "$3,200,000",
      fechaSolicitud: "2024-01-25",
      fechaVencimiento: "2024-02-25",
      fechaRespuesta: "2024-02-05",
      categoria: "Tecnología",
      items: 12,
      descuento: 10,
      validez: 60,
      moneda: "CLP",
    },
    {
      id: 4,
      numero: "COT-2024-004",
      proveedor: "Consultoría MNO",
      proyecto: "Consultoría Procesos",
      estado: "Rechazada",
      monto: "$1,200,000",
      fechaSolicitud: "2023-12-15",
      fechaVencimiento: "2024-01-15",
      fechaRespuesta: "2023-12-20",
      categoria: "Consultoría",
      items: 6,
      descuento: 0,
      validez: 30,
      moneda: "CLP",
    },
    {
      id: 5,
      numero: "COT-2024-005",
      proveedor: "Servicios Técnicos DEF",
      proyecto: "Mantenimiento Equipos",
      estado: "Vencida",
      monto: "$650,000",
      fechaSolicitud: "2024-01-05",
      fechaVencimiento: "2024-02-05",
      fechaRespuesta: "2024-01-12",
      categoria: "Servicios",
      items: 4,
      descuento: 3,
      validez: 30,
      moneda: "CLP",
    },
  ]

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Aprobada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobada</Badge>
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "En Revisión":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En Revisión</Badge>
      case "Rechazada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>
      case "Vencida":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Vencida</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(Number.parseInt(amount.replace(/[^0-9]/g, "")))
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
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Cotizaciones</h1>
                <p className="text-sm text-gray-500">Gestiona las cotizaciones de proveedores</p>
              </div>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Cotización
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
                  <p className="text-sm font-medium text-gray-600">Total Cotizaciones</p>
                  <p className="text-3xl font-bold text-gray-900">5</p>
                </div>
                <FileText className="w-8 h-8 text-sky-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Aprobadas</p>
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
                  <p className="text-sm font-medium text-gray-600">Pendientes</p>
                  <p className="text-3xl font-bold text-yellow-600">2</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Valor Total</p>
                  <p className="text-3xl font-bold text-sky-600">$8.4M</p>
                </div>
                <DollarSign className="w-8 h-8 text-sky-600" />
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
                  placeholder="Buscar cotizaciones..."
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

        {/* Cotizaciones Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cotizaciones.map((cotizacion) => (
            <Card
              key={cotizacion.id}
              className="bg-white/70 backdrop-blur-sm border-gray-200/50 hover:shadow-lg transition-all duration-300 hover:bg-white/90"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 mb-1">{cotizacion.numero}</CardTitle>
                    <p className="text-sm text-gray-600 mb-2">{cotizacion.proveedor}</p>
                    <div className="flex items-center space-x-2">
                      {getEstadoBadge(cotizacion.estado)}
                      <Badge variant="outline" className="bg-white/50">
                        {cotizacion.categoria}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(cotizacion.monto)}</p>
                    {cotizacion.descuento > 0 && (
                      <div className="flex items-center text-green-600 text-sm">
                        <TrendingDown className="w-4 h-4 mr-1" />
                        {cotizacion.descuento}% desc.
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Project */}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Building className="w-4 h-4" />
                  <span>Proyecto: {cotizacion.proyecto}</span>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Solicitada:</span>
                    </div>
                    <span className="font-medium">{new Date(cotizacion.fechaSolicitud).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Vencimiento:</span>
                    </div>
                    <span className="font-medium">{new Date(cotizacion.fechaVencimiento).toLocaleDateString()}</span>
                  </div>
                  {cotizacion.fechaRespuesta && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Respondida:</span>
                      </div>
                      <span className="font-medium">{new Date(cotizacion.fechaRespuesta).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="pt-3 border-t border-gray-200/50">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Items</p>
                      <p className="font-semibold text-gray-900">{cotizacion.items}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Validez</p>
                      <p className="font-semibold text-gray-900">{cotizacion.validez} días</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Moneda</p>
                      <p className="font-semibold text-gray-900">{cotizacion.moneda}</p>
                    </div>
                  </div>
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
