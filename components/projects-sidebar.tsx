"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Calendar, DollarSign, X } from "lucide-react"

interface Project {
  id: number
  nombre: string
  descripcion: string
  estado: string
  imagen: string
  presupuesto: string
  fechaInicio: string
}

const proyectosDisponibles: Project[] = [
  {
    id: 1,
    nombre: "Renovación Hospital Central",
    descripcion: "Ampliación y modernización del hospital central",
    estado: "Activo",
    imagen: "https://ar.images.search.yahoo.com/images/view;_ylt=AwrNPD4_P4JosHElcWGt9Qt.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzZkMmFhZWUxNjRlNjEzMmE2OTY1NGE0MjdkM2I2ZTVhBGdwb3MDNARpdANiaW5n?back=https%3A%2F%2Far.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dedificio%26type%3DE210AR1589G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D4&w=2000&h=1785&imgurl=images.adsttc.com%2Fmedia%2Fimages%2F5bf7%2Ff9da%2F08a5%2Fe51c%2F3500%2F02f5%2Flarge_jpg%2FS11505_N83_print.jpg%3F1542977972&rurl=https%3A%2F%2Fwww.archdaily.com.br%2Fbr%2F906844%2Fo-maior-edificio-de-madeira-na-australia-e-inaugurado-em-brisbane&size=905KB&p=edificio&oid=6d2aaee164e6132a69654a427d3b6e5a&fr2=piv-web&fr=mcafee&tt=O+maior+edif%C3%ADcio+de+madeira+na+Austr%C3%A1lia+%C3%A9+inaugurado+em+Brisbane+...&b=0&ni=21&no=4&ts=&tab=organic&sigr=l1axk95MPLpq&sigb=MJEQN2EfG5WE&sigi=8m9beWZpJySD&sigt=aQ62Ux.DKhqq&.crumb=c/QixE7oJ9w&fr=mcafee&fr2=piv-web&type=E210AR1589G0",
    presupuesto: "$5,200,000",
    fechaInicio: "2024-01-15",
  },
  {
    id: 2,
    nombre: "Proyecto Solar",
    descripcion: "Instalación de paneles solares en complejo industrial",
    estado: "Activo",
    imagen: "/placeholder.svg?height=120&width=200",
    presupuesto: "$3,800,000",
    fechaInicio: "2024-03-01",
  },
  {
    id: 3,
    nombre: "Centro Comercial Norte",
    descripcion: "Construcción de nuevo centro comercial",
    estado: "En Planificación",
    imagen: "/placeholder.svg?height=120&width=200",
    presupuesto: "$8,500,000",
    fechaInicio: "2024-06-01",
  },
  
]

interface ProjectsSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function ProjectsSidebar({ isOpen = true, onClose }: ProjectsSidebarProps) {
  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Activo":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">Activo</Badge>
      case "En Planificación":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">En Planificación</Badge>
      case "En Revisión":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 text-xs">En Revisión</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {estado}
          </Badge>
        )
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar - Más estrecho */}
      <div
        className={`
        fixed lg:relative top-0 left-0 h-full z-50 lg:z-auto
        w-72 sm:w-80 lg:w-64
        bg-white/90 lg:bg-white/60 backdrop-blur-sm 
        border-r border-gray-200/50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        flex flex-col
      `}
      >
        {/* Header */}
        <div className="p-3 border-b border-gray-200/50 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 flex items-center text-sm">
              <Building2 className="w-4 h-4 mr-2 text-sky-600" />
              Proyectos
            </h3>
            <p className="text-xs text-gray-500 mt-1">Activos en el sistema</p>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden h-8 w-8">
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Projects List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {proyectosDisponibles.map((proyecto) => (
            <Card
              key={proyecto.id}
              className="bg-white/70 backdrop-blur-sm border-gray-200/50 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={proyecto.imagen || "/placeholder.svg"}
                  alt={proyecto.nombre}
                  className="w-full h-20 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute top-1 right-1">{getEstadoBadge(proyecto.estado)}</div>
              </div>

              <CardContent className="p-3">
                <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-1">{proyecto.nombre}</h4>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{proyecto.descripcion}</p>

                <div className="space-y-1">
                  <div className="flex items-center text-xs text-gray-500">
                    <DollarSign className="w-3 h-3 mr-1" />
                    <span className="truncate">{proyecto.presupuesto}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{new Date(proyecto.fechaInicio).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
