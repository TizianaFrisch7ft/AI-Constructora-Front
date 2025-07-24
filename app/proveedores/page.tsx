"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  Plus,
  Users,
  Star,
  CheckCircle,
  Eye,
  Edit,
  AlertTriangle,
  Clock,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import ProveedorForm from "@/components/proveedor-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"

interface Proveedor {
  id: number
  nombre: string
  categoria: string
  estado: "Activa" | "Por Vencer" | "Vencida" | "Sin Evaluar"
  puntuacion: number | null
  proyectos: number
  fechaVencimiento: string | null
  rating: number
  ubicacion: string
  telefono: string
  email: string
  descripcion?: string
  sitioWeb?: string
  contactoPrincipal?: string
}

export default function ProveedoresPage() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([
    {
      id: 1,
      nombre: "Constructora ABC S.A.",
      categoria: "Construcción",
      estado: "Activa",
      puntuacion: 85,
      proyectos: 3,
      fechaVencimiento: "2025-06-15",
      rating: 4.8,
      ubicacion: "Santiago, Chile",
      telefono: "+56 2 2345 6789",
      email: "contacto@constructoraabc.cl",
      descripcion: "Empresa líder en construcción con más de 20 años de experiencia",
      sitioWeb: "https://www.constructoraabc.cl",
      contactoPrincipal: "Juan Pérez",
    },
    {
      id: 2,
      nombre: "Materiales del Norte",
      categoria: "Materiales",
      estado: "Por Vencer",
      puntuacion: 92,
      proyectos: 1,
      fechaVencimiento: "2024-12-20",
      rating: 4.2,
      ubicacion: "Antofagasta, Chile",
      telefono: "+56 55 234 5678",
      email: "ventas@materialesnorte.cl",
      descripcion: "Proveedor especializado en materiales de construcción para el norte de Chile",
      contactoPrincipal: "María González",
    },
    {
      id: 3,
      nombre: "Servicios Industriales XYZ",
      categoria: "Servicios",
      estado: "Vencida",
      puntuacion: 78,
      proyectos: 0,
      fechaVencimiento: "2024-08-10",
      rating: 3.9,
      ubicacion: "Valparaíso, Chile",
      telefono: "+56 32 345 6789",
      email: "info@serviciosxyz.cl",
      descripcion: "Servicios industriales especializados",
      contactoPrincipal: "Carlos Rodríguez",
    },
    {
      id: 4,
      nombre: "Equipos y Maquinaria Pro",
      categoria: "Equipos",
      estado: "Sin Evaluar",
      puntuacion: null,
      proyectos: 0,
      fechaVencimiento: null,
      rating: 0,
      ubicacion: "Concepción, Chile",
      telefono: "+56 41 234 5678",
      email: "contacto@equipospro.cl",
      descripcion: "Alquiler y venta de equipos de construcción",
      contactoPrincipal: "Ana López",
    },
    {
      id: 5,
      nombre: "Tecnología Constructiva",
      categoria: "Tecnología",
      estado: "Activa",
      puntuacion: 88,
      proyectos: 2,
      fechaVencimiento: "2025-03-22",
      rating: 4.6,
      ubicacion: "Santiago, Chile",
      telefono: "+56 2 3456 7890",
      email: "soporte@tecconstructiva.cl",
      descripcion: "Soluciones tecnológicas para la construcción",
      contactoPrincipal: "Pedro Silva",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProveedor, setEditingProveedor] = useState<Proveedor | undefined>()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [proveedorToDelete, setProveedorToDelete] = useState<Proveedor | null>(null)
  const [viewingProveedor, setViewingProveedor] = useState<Proveedor | null>(null)

  const filteredProveedores = proveedores.filter((proveedor) => {
    const matchesSearch = proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || proveedor.categoria === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCreateProveedor = (proveedorData: Omit<Proveedor, "id">) => {
    const newId = Math.max(...proveedores.map((p) => p.id), 0) + 1
    const newProveedor: Proveedor = {
      ...proveedorData,
      id: newId,
    }
    setProveedores((prev) => [...prev, newProveedor])
  }

  const handleEditProveedor = (proveedorData: Omit<Proveedor, "id">) => {
    if (!editingProveedor) return

    setProveedores((prev) =>
      prev.map((p) => (p.id === editingProveedor.id ? { ...proveedorData, id: editingProveedor.id } : p)),
    )
    setEditingProveedor(undefined)
  }

  const handleDeleteProveedor = (proveedor: Proveedor) => {
    setProveedorToDelete(proveedor)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (proveedorToDelete) {
      setProveedores((prev) => prev.filter((p) => p.id !== proveedorToDelete.id))
      setProveedorToDelete(null)
    }
    setIsDeleteDialogOpen(false)
  }

  const openEditForm = (proveedor: Proveedor) => {
    setEditingProveedor(proveedor)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingProveedor(undefined)
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Activa":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">Activa</Badge>
      case "Por Vencer":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 text-xs">Por Vencer</Badge>
      case "Vencida":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 text-xs">Vencida</Badge>
      case "Sin Evaluar":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 text-xs">Sin Evaluar</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {estado}
          </Badge>
        )
    }
  }

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "Activa":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "Por Vencer":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "Vencida":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case "Sin Evaluar":
        return <AlertTriangle className="w-4 h-4 text-gray-600" />
      default:
        return null
    }
  }

  const estadoStats = {
    activas: proveedores.filter((p) => p.estado === "Activa").length,
    porVencer: proveedores.filter((p) => p.estado === "Por Vencer").length,
    vencidas: proveedores.filter((p) => p.estado === "Vencida").length,
    sinEvaluar: proveedores.filter((p) => p.estado === "Sin Evaluar").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50/30 to-cyan-50/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-4 sm:px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="hover:bg-white/50">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-sky-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-semibold text-gray-900">Lista de Proveedores</h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  Gestiona el estado y evaluaciones de todos los proveedores
                </p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white shadow-lg text-sm"
          >
            <Plus className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Nuevo Proveedor</span>
            <span className="sm:hidden">Nuevo</span>
          </Button>
        </div>
      </header>

      <div className="p-4 sm:p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Evaluaciones Activas</p>
                  <p className="text-xl sm:text-3xl font-bold text-green-600">{estadoStats.activas}</p>
                </div>
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Por Vencer</p>
                  <p className="text-xl sm:text-3xl font-bold text-yellow-600">{estadoStats.porVencer}</p>
                </div>
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Vencidas</p>
                  <p className="text-xl sm:text-3xl font-bold text-red-600">{estadoStats.vencidas}</p>
                </div>
                <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Sin Evaluar</p>
                  <p className="text-xl sm:text-3xl font-bold text-gray-600">{estadoStats.sinEvaluar}</p>
                </div>
                <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6 bg-white/70 backdrop-blur-sm border-gray-200/50">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar proveedores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white/50 backdrop-blur-sm text-sm"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white/50 backdrop-blur-sm text-sm"
              >
                <option value="Todos">Todas las categorías</option>
                <option value="Construcción">Construcción</option>
                <option value="Materiales">Materiales</option>
                <option value="Servicios">Servicios</option>
                <option value="Equipos">Equipos</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Consultoría">Consultoría</option>
                <option value="Logística">Logística</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Proveedores Table/Cards */}
        <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl">Lista de Proveedores ({filteredProveedores.length})</CardTitle>
            <p className="text-sm text-gray-600">Gestiona el estado y evaluaciones de todos los proveedores</p>
          </CardHeader>
          <CardContent className="p-0">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50 border-b border-gray-200/50">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-gray-700">Proveedor</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-700">Categoría</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-700">Estado de Evaluación</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-700">Puntuación</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-700">Proyectos</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-700">Fecha Vencimiento</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProveedores.map((proveedor) => (
                    <tr key={proveedor.id} className="border-b border-gray-200/30 hover:bg-sky-50/30 transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="font-semibold text-gray-900">{proveedor.nombre}</p>
                          <p className="text-sm text-gray-500">{proveedor.ubicacion}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="bg-white/50">
                          {proveedor.categoria}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          {getEstadoIcon(proveedor.estado)}
                          {getEstadoBadge(proveedor.estado)}
                        </div>
                      </td>
                      <td className="p-4">
                        {proveedor.puntuacion ? (
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-sky-600">{proveedor.puntuacion}/100</span>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-gray-600 ml-1">{proveedor.rating}</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="font-semibold">{proveedor.proyectos}</span>
                      </td>
                      <td className="p-4">
                        {proveedor.fechaVencimiento ? (
                          <span className="text-sm">{new Date(proveedor.fechaVencimiento).toLocaleDateString()}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-sky-50"
                            onClick={() => setViewingProveedor(proveedor)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-sky-50"
                            onClick={() => openEditForm(proveedor)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-red-50 text-red-600"
                            onClick={() => handleDeleteProveedor(proveedor)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4 p-4">
              {filteredProveedores.map((proveedor) => (
                <Card key={proveedor.id} className="bg-white/50 border-gray-200/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{proveedor.nombre}</h3>
                        <p className="text-xs text-gray-500">{proveedor.ubicacion}</p>
                        <Badge variant="outline" className="bg-white/50 mt-1 text-xs">
                          {proveedor.categoria}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getEstadoIcon(proveedor.estado)}
                        {getEstadoBadge(proveedor.estado)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                      <div>
                        <p className="text-gray-500 text-xs">Puntuación</p>
                        {proveedor.puntuacion ? (
                          <div className="flex items-center space-x-1">
                            <span className="font-semibold text-sky-600">{proveedor.puntuacion}/100</span>
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs">{proveedor.rating}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Proyectos</p>
                        <span className="font-semibold">{proveedor.proyectos}</span>
                      </div>
                    </div>

                    {proveedor.fechaVencimiento && (
                      <div className="mb-3">
                        <p className="text-gray-500 text-xs">Fecha Vencimiento</p>
                        <span className="text-sm">{new Date(proveedor.fechaVencimiento).toLocaleDateString()}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200/50">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-sky-50 text-xs"
                          onClick={() => setViewingProveedor(proveedor)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Ver
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-sky-50 text-xs"
                          onClick={() => openEditForm(proveedor)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Editar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-red-50 text-red-600 text-xs"
                          onClick={() => handleDeleteProveedor(proveedor)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProveedores.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No se encontraron proveedores que coincidan con los filtros.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Proveedor Form Modal */}
      <ProveedorForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSave={editingProveedor ? handleEditProveedor : handleCreateProveedor}
        proveedor={editingProveedor}
        isEditing={!!editingProveedor}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar el proveedor "{proveedorToDelete?.nombre}"? Esta acción no se puede
              deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Proveedor Dialog */}
      <Dialog open={!!viewingProveedor} onOpenChange={() => setViewingProveedor(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles del Proveedor</DialogTitle>
          </DialogHeader>
          {viewingProveedor && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Nombre</Label>
                  <p className="text-gray-900">{viewingProveedor.nombre}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Categoría</Label>
                  <p className="text-gray-900">{viewingProveedor.categoria}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Email</Label>
                  <p className="text-gray-900">{viewingProveedor.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Teléfono</Label>
                  <p className="text-gray-900">{viewingProveedor.telefono}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Ubicación</Label>
                  <p className="text-gray-900">{viewingProveedor.ubicacion}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Estado</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    {getEstadoIcon(viewingProveedor.estado)}
                    {getEstadoBadge(viewingProveedor.estado)}
                  </div>
                </div>
                {viewingProveedor.contactoPrincipal && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Contacto Principal</Label>
                    <p className="text-gray-900">{viewingProveedor.contactoPrincipal}</p>
                  </div>
                )}
                {viewingProveedor.sitioWeb && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Sitio Web</Label>
                    <p className="text-gray-900">{viewingProveedor.sitioWeb}</p>
                  </div>
                )}
              </div>
              {viewingProveedor.descripcion && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Descripción</Label>
                  <p className="text-gray-900">{viewingProveedor.descripcion}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setViewingProveedor(null)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
