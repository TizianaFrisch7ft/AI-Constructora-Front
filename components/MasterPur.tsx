"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Search, ShoppingCart, ChevronLeft, ChevronRight, RotateCcw, Zap } from "lucide-react"
import Link from "next/link"
import { getAllSchedulePurLines, getVendors, generateQuotes } from "@/lib/api"
import type { SchedulePurLine, Vendor } from "../app/types/purchasingTypes"

const ITEMS_PER_PAGE = 10
const statusColorMap: Record<string, string> = {
  win: "bg-green-200 text-green-800",
  close: "bg-yellow-200 text-yellow-800",
  done: "bg-blue-200 text-blue-800",
  waiting: "bg-gray-200 text-gray-800",
}

export default function MasterPur() {
  const [lines, setLines] = useState<SchedulePurLine[]>([])
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [filteredLines, setFilteredLines] = useState<SchedulePurLine[]>([])
  const [selectedLines, setSelectedLines] = useState<string[]>([])
  const [filters, setFilters] = useState({
    project: "all-projects",
    quoteStatus: "all",
    product: "",
    desiredDate: "", // Changed from startDate/endDate to a single desiredDate
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [selectAllNotQuoted, setSelectAllNotQuoted] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const [lineRes, vendorRes] = await Promise.all([getAllSchedulePurLines(), getVendors()])
      setLines(lineRes)
      setFilteredLines(lineRes)
      setVendors(vendorRes)
    }
    fetchData()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, lines])

  const applyFilters = () => {
    const filtered = lines.filter((line) => {
      const matchProject = filters.project === "all-projects" || line.project_id === filters.project
      const matchProduct =
        !filters.product ||
        line.product_id?.toString().includes(filters.product) ||
        line.reference?.toLowerCase().includes(filters.product.toLowerCase())

      const quotedVendors = line.alreadyQuotedVendors || []
      const allVendorsQuoted = line.vendor_list.every((v) => quotedVendors.includes(v))

      let matchQuoteStatus = true
      if (filters.quoteStatus === "quoted") {
        matchQuoteStatus = allVendorsQuoted
      } else if (filters.quoteStatus === "not-quoted") {
        matchQuoteStatus = !allVendorsQuoted
      }

      // Updated date filter logic for a single desiredDate
     let matchDate = true
if (filters.desiredDate) {
  const filterDate = new Date(filters.desiredDate)
  const lineDate = line.desired_date ? new Date(line.desired_date) : null
  matchDate = lineDate ? lineDate >= filterDate : false
}


      return matchProject && matchProduct && matchQuoteStatus && matchDate
    })
    setFilteredLines(filtered)
    setCurrentPage(1)
  }

  const resetFilters = () => {
    setFilters({ project: "all-projects", quoteStatus: "all", product: "", desiredDate: "" }) // Reset single desiredDate
    setFilteredLines(lines)
    setCurrentPage(1)
  }

  const toggleLineSelection = (id: string) => {
    setSelectedLines((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const handleGenerateQuotes = async () => {
    const selected = lines.filter((line) => selectedLines.includes(line._id))
    const res = await generateQuotes(selected)
    console.log(res)
    alert("Cotizaciones generadas correctamente")
  }

  const getVendorNames = (ids: string[]) => {
    return ids.map((id) => vendors.find((v) => v.vendor_id === id)?.name || id).join(", ")
  }

  const paginatedLines = filteredLines.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  const totalPages = Math.ceil(filteredLines.length / ITEMS_PER_PAGE)

  const handleSelectAllNotQuotedChange = (checked: boolean) => {
    setSelectAllNotQuoted(checked)
    if (checked) {
      const notQuotedLineIds = filteredLines
        .filter((line) => {
          const quotedVendors = line.alreadyQuotedVendors || []
          const allVendorsQuoted = line.vendor_list.every((v) => quotedVendors.includes(v))
          return !allVendorsQuoted
        })
        .map((line) => line._id)
      setSelectedLines(notQuotedLineIds)
    } else {
      setSelectedLines([])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header profesional */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-none mx-auto flex items-center justify-between">
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
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <ShoppingCart className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Master de Compras</h1>
                <p className="text-sm text-gray-500">Gestiona las líneas de compra y genera cotizaciones</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-500">Total líneas</p>
              <p className="text-lg font-semibold text-gray-900">{filteredLines.length}</p>
            </div>
            <Button
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 px-6"
              onClick={handleGenerateQuotes}
              disabled={selectedLines.length === 0}
            >
              <Zap className="w-4 h-4 mr-2" />
              Generar cotizaciones ({selectedLines.length})
            </Button>
          </div>
        </div>
      </div>
      <div className="px-6 py-6">
        <div className="max-w-none mx-auto space-y-6">
          {/* Filtros alineados */}
          <div className="bg-white rounded-lg border border-purple-200 p-4 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Proyecto</label>
                <Select
                  onValueChange={(value) =>
                    setFilters((f) => ({ ...f, project: value === "all-projects" ? "" : value }))
                  }
                  value={filters.project === "" ? "all-projects" : filters.project}
                >
                  <SelectTrigger className="w-full bg-white border-gray-300 rounded-lg h-10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                    <SelectValue placeholder="Seleccionar proyecto" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg border-gray-200 shadow-lg">
                    <SelectItem value="all-projects" className="rounded-md">
                      Todas
                    </SelectItem>{" "}
                    {[...new Set(lines.map((l) => l.project_id).filter((p): p is string => !!p))].map((proj) => (
                      <SelectItem key={proj} value={proj} className="rounded-md">
                        {proj}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* New filter for Quote Status */}
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado de Cotización</label>
                <Select
                  value={filters.quoteStatus}
                  onValueChange={(value) => setFilters((f) => ({ ...f, quoteStatus: value }))}
                >
                  <SelectTrigger className="w-full bg-white border-gray-300 rounded-lg h-10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg border-gray-200 shadow-lg">
                    <SelectItem value="all" className="rounded-md">
                      Todas
                    </SelectItem>
                    <SelectItem value="quoted" className="rounded-md">
                      Cotizadas
                    </SelectItem>
                    <SelectItem value="not-quoted" className="rounded-md">
                      No Cotizadas
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Producto</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    className="pl-10 bg-white border-gray-300 rounded-lg h-10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    placeholder="Buscar producto..."
                    value={filters.product}
                    onChange={(e) => setFilters((f) => ({ ...f, product: e.target.value }))}
                  />
                </div>
              </div>
              {/* Single Date Filter and Reset Button in one column */}
              <div className="md:col-span-3 flex items-end gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Deseada</label>
                  <Input
                    type="date"
                    className="w-full bg-white border-gray-300 rounded-lg h-10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    value={filters.desiredDate}
                    onChange={(e) => setFilters((f) => ({ ...f, desiredDate: e.target.value }))}
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="h-10 px-3 rounded-lg border-gray-300 hover:bg-gray-50 transition-all duration-200 bg-transparent"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          {/* Tabla principal - contenido centrado */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-4 text-center font-medium text-gray-700">Proyecto</th>
                    <th className="p-4 text-center font-medium text-gray-700">Línea</th>
                    <th className="p-4 text-center font-medium text-gray-700">Cantidad</th>
                    <th className="p-4 text-center font-medium text-gray-700">UM</th>
                    <th className="p-4 text-center font-medium text-gray-700">Referencia</th>
                    <th className="p-4 text-center font-medium text-gray-700">Precio Ref.</th>
                    <th className="p-4 text-center font-medium text-gray-700">Moneda</th>
                    <th className="p-4 text-center font-medium text-gray-700">Fecha deseada</th>
                    <th className="p-4 text-center font-medium text-gray-700">Proveedores</th>
                    {/* <th className="p-4 text-center font-medium text-gray-700">Estado</th> */}
                    <th className="p-4 text-center font-medium text-gray-700">
                      <div className="flex items-center justify-center gap-2">
                        Seleccionar
                        <Checkbox
                          checked={selectAllNotQuoted}
                          onCheckedChange={handleSelectAllNotQuotedChange}
                          className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                          aria-label="Seleccionar todas las líneas no cotizadas"
                        />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLines.map((line, index) => (
                    <tr
                      key={line._id}
                      className={`hover:bg-gray-50 transition-colors duration-150 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                      }`}
                    >
                      <td className="p-4 text-center border-b border-gray-100 font-medium text-gray-900">
                        {line.project_id}
                      </td>
                      <td className="p-4 text-center border-b border-gray-100">
                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-gray-700">
                          {line.line_no}
                        </span>
                      </td>
                      <td className="p-4 text-center border-b border-gray-100 text-gray-600">{line.qty}</td>
                      <td className="p-4 text-center border-b border-gray-100 text-gray-600">{line.um}</td>
                      <td className="p-4 text-center border-b border-gray-100 text-gray-600">{line.reference}</td>
                      <td className="p-4 text-center border-b border-gray-100 font-medium text-gray-900">
                        {line.reference_price}
                      </td>
                      <td className="p-4 text-center border-b border-gray-100 text-gray-600">{line.currency}</td>
                      <td className="p-4 text-center border-b border-gray-100 text-gray-600">
                        {line.desired_date && line.desired_date !== "null"
                          ? new Date(line.desired_date).toLocaleDateString("es-AR")
                          : "-"}
                      </td>
                      <td className="p-4 text-center border-b border-gray-100 text-gray-600 max-w-xs truncate">
                        {getVendorNames(line.vendor_list)}
                      </td>
                      {/* <td className="p-4 text-center border-b border-gray-100">
                        <Badge
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            line.status
                              ? statusColorMap[line.status as keyof typeof statusColorMap]
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {line.status || "-"}
                        </Badge>
                      </td> */}
                      <td className="p-4 text-center border-b border-gray-100">
                        {(() => {
                          const quotedVendors = line.alreadyQuotedVendors || []
                          const allVendorsQuoted = line.vendor_list.every((v) => quotedVendors.includes(v))
                          if (allVendorsQuoted) {
                            return <span className="text-gray-400 text-xs">Cotizada</span>
                          }
                          return (
                            <Checkbox
                              checked={selectedLines.includes(line._id)}
                              onCheckedChange={() => toggleLineSelection(line._id)}
                              className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                            />
                          )
                        })()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Paginación con degradé */}
          <div className="flex justify-center items-center gap-4">
            <Button
              variant="outline"
              className="rounded-lg border-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 px-4 py-2 bg-white transition-all duration-200"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Siguiente
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
