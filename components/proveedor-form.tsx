"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

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

interface ProveedorFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (proveedor: Omit<Proveedor, "id">) => void
  proveedor?: Proveedor
  isEditing?: boolean
}

export default function ProveedorForm({ isOpen, onClose, onSave, proveedor, isEditing = false }: ProveedorFormProps) {
  const [formData, setFormData] = useState({
    nombre: proveedor?.nombre || "",
    categoria: proveedor?.categoria || "",
    ubicacion: proveedor?.ubicacion || "",
    telefono: proveedor?.telefono || "",
    email: proveedor?.email || "",
    descripcion: proveedor?.descripcion || "",
    sitioWeb: proveedor?.sitioWeb || "",
    contactoPrincipal: proveedor?.contactoPrincipal || "",
    fechaVencimiento: proveedor?.fechaVencimiento || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido"
    }
    if (!formData.categoria) {
      newErrors.categoria = "La categoría es requerida"
    }
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }
    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido"
    }
    if (!formData.ubicacion.trim()) {
      newErrors.ubicacion = "La ubicación es requerida"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const proveedorData: Omit<Proveedor, "id"> = {
      nombre: formData.nombre,
      categoria: formData.categoria,
      estado: "Sin Evaluar",
      puntuacion: null,
      proyectos: 0,
      fechaVencimiento: formData.fechaVencimiento || null,
      rating: 0,
      ubicacion: formData.ubicacion,
      telefono: formData.telefono,
      email: formData.email,
      descripcion: formData.descripcion,
      sitioWeb: formData.sitioWeb,
      contactoPrincipal: formData.contactoPrincipal,
    }

    onSave(proveedorData)
    onClose()

    // Reset form
    setFormData({
      nombre: "",
      categoria: "",
      ubicacion: "",
      telefono: "",
      email: "",
      descripcion: "",
      sitioWeb: "",
      contactoPrincipal: "",
      fechaVencimiento: "",
    })
    setErrors({})
  }

  const handleClose = () => {
    onClose()
    setErrors({})
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Proveedor" : "Nuevo Proveedor"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <div className="md:col-span-2">
              <Label htmlFor="nombre">Nombre de la Empresa *</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                placeholder="Ej: Constructora ABC S.A."
                className={errors.nombre ? "border-red-500" : ""}
              />
              {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
            </div>

            {/* Categoría */}
            <div>
              <Label htmlFor="categoria">Categoría *</Label>
              <Select value={formData.categoria} onValueChange={(value) => handleInputChange("categoria", value)}>
                <SelectTrigger className={errors.categoria ? "border-red-500" : ""}>
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Construcción">Construcción</SelectItem>
                  <SelectItem value="Materiales">Materiales</SelectItem>
                  <SelectItem value="Servicios">Servicios</SelectItem>
                  <SelectItem value="Equipos">Equipos</SelectItem>
                  <SelectItem value="Tecnología">Tecnología</SelectItem>
                  <SelectItem value="Consultoría">Consultoría</SelectItem>
                  <SelectItem value="Logística">Logística</SelectItem>
                </SelectContent>
              </Select>
              {errors.categoria && <p className="text-red-500 text-sm mt-1">{errors.categoria}</p>}
            </div>

            {/* Ubicación */}
            <div>
              <Label htmlFor="ubicacion">Ubicación *</Label>
              <Input
                id="ubicacion"
                value={formData.ubicacion}
                onChange={(e) => handleInputChange("ubicacion", e.target.value)}
                placeholder="Ej: Santiago, Chile"
                className={errors.ubicacion ? "border-red-500" : ""}
              />
              {errors.ubicacion && <p className="text-red-500 text-sm mt-1">{errors.ubicacion}</p>}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="contacto@empresa.cl"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Teléfono */}
            <div>
              <Label htmlFor="telefono">Teléfono *</Label>
              <Input
                id="telefono"
                value={formData.telefono}
                onChange={(e) => handleInputChange("telefono", e.target.value)}
                placeholder="+56 2 2345 6789"
                className={errors.telefono ? "border-red-500" : ""}
              />
              {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
            </div>

            {/* Contacto Principal */}
            <div>
              <Label htmlFor="contactoPrincipal">Contacto Principal</Label>
              <Input
                id="contactoPrincipal"
                value={formData.contactoPrincipal}
                onChange={(e) => handleInputChange("contactoPrincipal", e.target.value)}
                placeholder="Nombre del contacto"
              />
            </div>

            {/* Sitio Web */}
            <div>
              <Label htmlFor="sitioWeb">Sitio Web</Label>
              <Input
                id="sitioWeb"
                value={formData.sitioWeb}
                onChange={(e) => handleInputChange("sitioWeb", e.target.value)}
                placeholder="https://www.empresa.cl"
              />
            </div>

            {/* Fecha de Vencimiento */}
            <div>
              <Label htmlFor="fechaVencimiento">Fecha de Vencimiento de Evaluación</Label>
              <Input
                id="fechaVencimiento"
                type="date"
                value={formData.fechaVencimiento}
                onChange={(e) => handleInputChange("fechaVencimiento", e.target.value)}
              />
            </div>

            {/* Descripción */}
            <div className="md:col-span-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) => handleInputChange("descripcion", e.target.value)}
                placeholder="Descripción de la empresa y sus servicios..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-sky-500 hover:bg-sky-600">
              {isEditing ? "Actualizar" : "Crear"} Proveedor
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
