"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, ArrowLeft, Search, Filter, ChevronLeft, FileText, Send } from "lucide-react"
import Link from "next/link"
import type { QuoteRequest, QuoteRequestLine } from "../app/types/purchasingTypes"

const statusColorMap: Record<string, string> = {
  win: "bg-green-100 text-green-800",
  close: "bg-yellow-100 text-yellow-800",
  done: "bg-blue-100 text-blue-800",
  waiting: "bg-gray-100 text-gray-600",
}

export default function Quotes() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [vendors, setVendors] = useState<string[]>([])
  const [filteredQuotes, setFilteredQuotes] = useState<QuoteRequest[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [quoteLines, setQuoteLines] = useState<Record<string, QuoteRequestLine[]>>({})
  const [allQuoteLines, setAllQuoteLines] = useState<Record<string, QuoteRequestLine[]>>({})
  const [filters, setFilters] = useState({ vendor: "", quoteLineStatus: "all" })
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchQuotes = async () => {
      const res = await fetch(`${API_URL}/quote-request`)
      const data = await res.json()
      setQuotes(data)
      setFilteredQuotes(data)

      const uniqueVendors = [...new Set(data.map((q: QuoteRequest) => q.vendor_id))] as string[]
      setVendors(uniqueVendors)

      // 🚀 Fetch de todas las líneas para cada quote
      const allLines: Record<string, QuoteRequestLine[]> = {}
      for (const quote of data) {
        const resLines = await fetch(`${API_URL}/quote-request/${quote.qr_id}/lines`)
        const lines = await resLines.json()
        allLines[quote.qr_id] = lines
      }
      setAllQuoteLines(allLines)
    }

    fetchQuotes()
  }, [])

  const toggleExpand = async (qr_id: string) => {
    if (expanded === qr_id) return setExpanded(null)
    if (!quoteLines[qr_id]) {
      const res = await fetch(`${API_URL}/quote-request/${qr_id}/lines`)
      const lines = await res.json()
      if (Array.isArray(lines)) setQuoteLines((prev) => ({ ...prev, [qr_id]: lines }))
    }
    setExpanded(qr_id)
  }

  const applyFilters = () => {
    const filtered = quotes.filter((quote) => {
      const matchVendor = !filters.vendor || quote.vendor_id === filters.vendor

      const matchLineStatus =
        filters.quoteLineStatus === "all" ||
        (allQuoteLines[quote.qr_id]?.some((line) => line.status === filters.quoteLineStatus) ?? false)

      return matchVendor && matchLineStatus
    })

    setFilteredQuotes(filtered)
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(filteredQuotes.length / pageSize)
  const paginatedQuotes = filteredQuotes.slice((currentPage - 1) * pageSize, currentPage * pageSize)

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
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Cotizaciones</h1>
                <p className="text-sm text-gray-500">Gestiona las cotizaciones de proveedores</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="max-w-none mx-auto space-y-6">
          {/* Filtros alineados */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Proveedor</label>
                <Select onValueChange={(value) => setFilters((f) => ({ ...f, vendor: value }))}>
                  <SelectTrigger className="w-full bg-white border-gray-300 rounded-lg h-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Seleccionar proveedor" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg border-gray-200 shadow-lg">
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor} value={vendor} className="rounded-md">
                        {vendor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Reemplazo input de referencia por Select de estado */}
              <div className="md:col-span-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado de Línea</label>
                <Select
                  onValueChange={(value) => setFilters((f) => ({ ...f, quoteLineStatus: value }))}
                  value={filters.quoteLineStatus}
                >
                  <SelectTrigger className="w-full bg-white border-gray-300 rounded-lg h-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg border-gray-200 shadow-lg">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="waiting">Waiting</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                    <SelectItem value="win">WIN</SelectItem>
                    <SelectItem value="close">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-3">
                <Button
                  onClick={applyFilters}
                  className="w-full h-10 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <Filter className="w-4 h-4" />
                  Filtrar
                </Button>
              </div>
            </div>
          </div>

          {/* Tabla principal - contenido centrado */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="w-12 p-4 text-center font-medium text-gray-700"></th>
                    <th className="p-4 text-center font-medium text-gray-700">QR ID</th>
                    <th className="p-4 text-center font-medium text-gray-700">Proveedor</th>
                    <th className="p-4 text-center font-medium text-gray-700">Fecha</th>
                    <th className="p-3 text-center font-medium text-gray-700">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedQuotes.map((quote, index) => (
                    <React.Fragment key={quote.qr_id}>
                      <tr
                        key={quote.qr_id}
                        className={`hover:bg-gray-50 transition-colors duration-150 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                        }`}
                      >
                        <td className="p-4 text-center border-b border-gray-100">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => toggleExpand(quote.qr_id)}
                            className="w-8 h-8 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-all duration-200"
                          >
                            <div
                              className={`transition-transform duration-200 ${expanded === quote.qr_id ? "rotate-90" : ""}`}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </Button>
                        </td>
                        <td className="p-4 text-center border-b border-gray-100">
                          <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-gray-700">
                            {quote.qr_id}
                          </span>
                        </td>
                        <td className="p-4 text-center border-b border-gray-100 font-medium text-gray-900">
                          {quote.vendor_id}
                        </td>
                        <td className="p-4 text-center border-b border-gray-100 text-gray-600">
                          {new Date(quote.date).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="p-4 text-center border-b border-gray-100">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => alert("SE HA CREADO LA PO Y ENVIADO A SU ERP")}
                            className="w-8 h-8 rounded-md hover:bg-gray-100 text-blue-600 hover:text-blue-800 transition-all duration-200"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                      {expanded === quote.qr_id && (
                        <tr>
                          <td colSpan={6} className="bg-gray-50/50 border-b border-gray-200">
                            <div className="p-6">
                              {Array.isArray(quoteLines[quote.qr_id]) && quoteLines[quote.qr_id].length > 0 ? (
                                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                          <th className="p-3 text-center font-medium text-gray-700">Línea</th>
                                          <th className="p-3 text-center font-medium text-gray-700">Producto</th>
                                          <th className="p-3 text-center font-medium text-gray-700">Referencia</th>
                                          <th className="p-3 text-center font-medium text-gray-700">Cantidad</th>
                                          <th className="p-3 text-center font-medium text-gray-700">UM</th>
                                          <th className="p-3 text-center font-medium text-gray-700">Precio Ref.</th>
                                          <th className="p-3 text-center font-medium text-gray-700">Precio Unitario</th>
                                          <th className="p-3 text-center font-medium text-gray-700">Fecha deseada</th>
                                          <th className="p-3 text-center font-medium text-gray-700">Estado</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {quoteLines[quote.qr_id].map((line, lineIndex) => (
                                          <tr
                                            key={line._id}
                                            className={`hover:bg-gray-50 transition-colors duration-150 ${
                                              lineIndex % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                                            }`}
                                          >
                                            <td className="p-3 text-center border-b border-gray-100">
                                              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                                                {line.line_no}
                                              </span>
                                            </td>
                                            <td className="p-3 text-center border-b border-gray-100 font-medium text-gray-900">
                                              {line.product_id}
                                            </td>
                                            {/* Eliminar referencia y agregar botón */}
                                            <td className="p-3 text-center border-b border-gray-100">
                                              <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => alert("SE HA CREADO LA PO Y ENVIADO A SU ERP")}
                                                className="w-8 h-8 rounded-md hover:bg-gray-100 text-blue-600 hover:text-blue-800 transition-all duration-200"
                                              >
                                                <Send className="w-4 h-4" />
                                              </Button>
                                            </td>
                                            <td className="p-3 text-center border-b border-gray-100 text-gray-600">
                                              {line.qty}
                                            </td>
                                            <td className="p-3 text-center border-b border-gray-100 text-gray-600">
                                              {line.um}
                                            </td>
                                            <td className="p-3 text-center border-b border-gray-100 font-medium text-gray-900">
                                              {line.reference_price}
                                            </td>
                                            <td className="p-3 text-center border-b border-gray-100">
                                              {line.status === "waiting" ? (
                                                <div className="flex items-center justify-center gap-2">
                                                  <Input
                                                    type="number"
                                                    step="0.01"
                                                  defaultValue={line.unit_price !== undefined && !isNaN(line.unit_price) ? String(line.unit_price) : ""}

                                                    className="w-24 h-8 text-sm"
                                                    onChange={(e) => {
                                                      const value = parseFloat(e.target.value)
                                                      setQuoteLines((prev) => ({
                                                        ...prev,
                                                        [quote.qr_id]: prev[quote.qr_id].map((l) =>
                                                          l._id === line._id ? { ...l, unit_price: value } : l
                                                        ),
                                                      }))
                                                    }}
                                                  />
                                                  <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={async () => {
                                                     const updatedLine = quoteLines[quote.qr_id].find((l) => l._id === line._id)
if (!updatedLine) return

const res = await fetch(`${API_URL}/quote-request-lines/${line._id}`, {
  method: "PATCH", // ✅ cambio de PUT a PATCH
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    unit_price: updatedLine.unit_price,
    status: "done",
  }),
})

                                                      if (res.ok) {
                                                        setQuoteLines((prev) => ({
                                                          ...prev,
                                                          [quote.qr_id]: prev[quote.qr_id].map((l) =>
                                                            l._id === line._id ? { ...l, status: "done" } : l
                                                          ),
                                                        }))
                                                      }
                                                    }}
                                                    className="text-xs"
                                                  >
                                                    Guardar
                                                  </Button>
                                                </div>
                                              ) : (
                                                <span className="text-gray-700 font-medium">{line.unit_price ?? "-"}</span>
                                              )}
                                            </td>

                                            <td className="p-3 text-center border-b border-gray-100 text-gray-600">
                                              {line.desired_date?.split("T")[0]}
                                            </td>
                                            <td className="p-3 text-center border-b border-gray-100">
                                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColorMap[line.status] || "bg-gray-100 text-gray-600"}`}>
                                                {line.status}
                                              </span>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center py-8">
                                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Search className="w-5 h-5 text-gray-400" />
                                  </div>
                                  <p className="text-gray-500 text-sm">
                                    No hay líneas disponibles para esta cotización
                                  </p>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
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
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Anterior
            </Button>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg px-4 py-2">
              <span className="text-sm font-medium text-gray-700">
                Página <span className="font-bold text-blue-600">{currentPage}</span> de{" "}
                <span className="font-bold">{totalPages}</span>
              </span>
            </div>

            <Button
              variant="outline"
              className="rounded-lg border-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 px-4 py-2 bg-white transition-all duration-200"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
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