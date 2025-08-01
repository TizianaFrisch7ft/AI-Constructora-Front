"use client"
import { useState, useMemo } from "react"
import CreateScheduleModal from "./CreateScheduleModal"
import SchedulePurTableModal from "./SchedulePurTableModal"
import { useSchedules } from "@/hooks/useSchedules"
import ScheduleRow from "./ScheduleRow"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, FileSpreadsheet, RotateCcw, Search, ArrowLeft } from "lucide-react" // Import ArrowLeft
import Link from "next/link" // Import Link

export default function ScheduleList() {
  const { schedules, loading, error, refetch } = useSchedules()
  const [openModal, setOpenModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all-statuses")
  const [projectFilter, setProjectFilter] = useState("all-projects")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCcId, setSelectedCcId] = useState<string | null>(null)
  const itemsPerPage = 6

  const filteredSchedules = useMemo(() => {
    return schedules.filter((s) => {
      const matchesSearch = s.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all-statuses" || s.status === statusFilter
      const matchesProject = projectFilter === "all-projects" || s.project_id === projectFilter
      return matchesSearch && matchesStatus && matchesProject
    })
  }, [schedules, searchTerm, statusFilter, projectFilter])

  const totalPages = Math.ceil(filteredSchedules.length / itemsPerPage)
  const paginatedSchedules = filteredSchedules.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const resetFilters = () => {
    setSearchTerm("")
    setStatusFilter("all-statuses")
    setProjectFilter("all-projects")
    setCurrentPage(1)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header y botón */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button
              variant="ghost"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white hover:text-white transition-all duration-200 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Cronogramas de Compras</h1>
        </div>
        <Button
          onClick={() => setOpenModal(true)}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 px-6"
        >
          + Nuevo Cronograma
        </Button>
      </div>
      <CreateScheduleModal open={openModal} onClose={() => setOpenModal(false)} onSuccess={refetch} />
      {/* Filtros */}
      <div className="bg-white rounded-lg border border-purple-200 p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Adjusted grid for 4 columns */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar cronogramas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-300 rounded-lg h-10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full bg-white border-gray-300 rounded-lg h-10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-gray-200 shadow-lg">
                <SelectItem value="all-statuses">Todos los estados</SelectItem>
                <SelectItem value="WIP">WIP</SelectItem>
                <SelectItem value="Waiting">Waiting</SelectItem>
                <SelectItem value="Close">Close</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Proyecto</label>
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="w-full bg-white border-gray-300 rounded-lg h-10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                <SelectValue placeholder="Proyecto" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-gray-200 shadow-lg">
                <SelectItem value="all-projects">Todos los proyectos</SelectItem>
                {[...new Set(schedules.map((s) => s.project_id))].map((projectId) => (
                  <SelectItem key={projectId} value={projectId}>
                    {projectId}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            {/* Removed label, aligned with other inputs */}
            <Button
              variant="outline"
              onClick={resetFilters}
              className="h-10 px-3 rounded-lg border-gray-300 hover:bg-gray-50 transition-all duration-200 bg-transparent w-full" // Added w-full for consistent width
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      {/* Estados de carga */}
      {loading && <p className="text-muted-foreground">Cargando cronogramas...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && paginatedSchedules.length === 0 && (
        <p className="text-muted-foreground">No hay cronogramas cargados.</p>
      )}
      {/* Tabla de resultados + paginación */}
      {paginatedSchedules.length > 0 && (
        <div className="space-y-4">
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 text-center font-medium text-gray-700">ID</th>
                <th className="p-4 text-center font-medium text-gray-700">Descripción</th>
                <th className="p-4 text-center font-medium text-gray-700">Proyecto</th>
                <th className="p-4 text-center font-medium text-gray-700">PM</th>
                <th className="p-4 text-center font-medium text-gray-700">Fecha</th>
                <th className="p-4 text-center font-medium text-gray-700">Estado</th>
                <th className="p-4 text-center font-medium text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSchedules.map((s) => (
                <tr key={s._id} className="border-b hover:bg-gray-50 transition-colors duration-150">
                  {/* ScheduleRow is assumed to render its content centered or will need adjustment */}
                  <ScheduleRow schedule={s} />
                  <td className="p-4 text-center border-b border-gray-100">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedCcId(s.cc_id)}
                      title="Editar líneas del cronograma"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-blue-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Acción verde"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-green-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Paginación */}
          <div className="flex justify-center items-center gap-4">
            <Button
              variant="outline"
              className="rounded-lg border-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 px-4 py-2 bg-white transition-all duration-200"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Anterior
            </Button>
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg px-4 py-2">
              <span className="text-sm font-medium text-gray-700">
                Página <span className="font-bold text-purple-600">{currentPage}</span> de{" "}
                <span className="font-bold">{totalPages}</span>
              </span>
            </div>
            <Button
              variant="outline"
              className="rounded-lg border-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 px-4 py-2 bg-white transition-all duration-200"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Siguiente
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
      <SchedulePurTableModal open={!!selectedCcId} cc_id={selectedCcId || ""} onClose={() => setSelectedCcId(null)} />
    </div>
  )
}
