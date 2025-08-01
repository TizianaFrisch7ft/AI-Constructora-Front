"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Save, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  open: boolean;
  cc_id: string;
  onClose: () => void;
}

interface Line {
  _id?: string;
  line_no: number;
  qty: number;
  um: string;
  product_id?: string;
  reference: string;
  reference_price?: number;
  currency: string;
  desired_date?: string;
  project_id: string;
  vendor_list: string[];
}

interface ApiResponse {
  success: boolean;
  lines: Line[];
}

const LINES_PER_PAGE = 10;

export default function SchedulePurTableModal({ open, cc_id, onClose }: Props) {
  const [lines, setLines] = useState<Line[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;

    const fetchLines = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedule-lines/${cc_id}`);
        const data: ApiResponse = await res.json();

        const linesData = Array.isArray(data.lines) && data.lines.length > 0
          ? data.lines
          : [getEmptyLine(1)];

        setLines(linesData);
        setCurrentPage(1); // Reset al abrir
      } catch (err) {
        console.error("Error al cargar líneas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLines();
  }, [open, cc_id]);

  const getEmptyLine = (line_no: number): Line => ({
    line_no,
    qty: 0,
    um: "",
    reference: "",
    reference_price: 0,
    currency: "usd",
    desired_date: "",
    project_id: "",
    vendor_list: [],
  });

  const handleChange = (idx: number, field: keyof Line, value: any) => {
    const globalIndex = (currentPage - 1) * LINES_PER_PAGE + idx;
    setLines((prev) =>
      prev.map((line, i) => (i === globalIndex ? { ...line, [field]: value } : line))
    );
  };

  const addNewLine = () => {
    const nextNumber = lines.length + 1;
    setLines([...lines, getEmptyLine(nextNumber)]);
    const nextPage = Math.ceil((lines.length + 1) / LINES_PER_PAGE);
    setCurrentPage(nextPage); // saltar a la última página si se agregó una línea
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedule-lines/${cc_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });

      const result = await res.json();
      if (result.success) {
        alert("✅ Guardado correctamente.");
        onClose();
      } else {
        alert("Error al guardar: " + result.error);
      }
    } catch (err) {
      console.error("Error al guardar líneas:", err);
    } finally {
      setSaving(false);
    }
  };

  const startIdx = (currentPage - 1) * LINES_PER_PAGE;
  const currentLines = lines.slice(startIdx, startIdx + LINES_PER_PAGE);
  const totalPages = Math.ceil(lines.length / LINES_PER_PAGE);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl px-4 py-6">
        <DialogTitle className="text-lg font-semibold">
          Líneas del Cronograma {cc_id}
        </DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground mb-4">
          Agregá o editá líneas para este cronograma.
        </DialogDescription>

        {loading ? (
          <p className="text-gray-600">Cargando líneas...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border text-sm bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Línea</th>
                  <th className="border p-2">Cantidad</th>
                  <th className="border p-2">UM</th>
                  <th className="border p-2">Referencia</th>
                  <th className="border p-2">Precio</th>
                  <th className="border p-2">Moneda</th>
                  <th className="border p-2">Fecha deseada</th>
                  <th className="border p-2">Proveedores</th>
                </tr>
              </thead>
              <tbody>
                {currentLines.map((line, idx) => (
                  <tr key={line._id || idx}>
                    <td className="border p-1 text-center">{startIdx + idx + 1}</td>
                    <td className="border p-1">
                      <Input
                        type="number"
                        className="bg-white text-black"
                        value={line.qty}
                        onChange={(e) => handleChange(idx, "qty", Number(e.target.value))}
                      />
                    </td>
                    <td className="border p-1">
                      <Input
                        className="bg-white text-black"
                        value={line.um}
                        onChange={(e) => handleChange(idx, "um", e.target.value)}
                      />
                    </td>
                    <td className="border p-1">
                      <Input
                        className="bg-white text-black"
                        value={line.reference}
                        onChange={(e) => handleChange(idx, "reference", e.target.value)}
                      />
                    </td>
                    <td className="border p-1">
                      <Input
                        type="number"
                        className="bg-white text-black"
                        value={line.reference_price ?? 0}
                        onChange={(e) => handleChange(idx, "reference_price", Number(e.target.value))}
                      />
                    </td>
                    <td className="border p-1">
                      <Input
                        className="bg-white text-black"
                        value={line.currency}
                        onChange={(e) => handleChange(idx, "currency", e.target.value)}
                      />
                    </td>
                    <td className="border p-1">
                      <Input
                        type="date"
                        className="bg-white text-black"
                        value={line.desired_date?.substring(0, 10) || ""}
                        onChange={(e) => handleChange(idx, "desired_date", e.target.value)}
                      />
                    </td>
                    <td className="border p-1">
                      <Input
                        className="bg-white text-black"
                        value={line.vendor_list.join(", ")}
                        onChange={(e) =>
                          handleChange(
                            idx,
                            "vendor_list",
                            e.target.value.split(",").map((v) => v.trim())
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINACIÓN */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 pt-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft className="w-4 h-4" /> Anterior
            </Button>
            <span className="text-sm">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="ghost"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Siguiente <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        <div className="flex justify-between items-center pt-4">
          <Button variant="secondary" onClick={addNewLine} className="flex gap-2">
            <Plus className="w-4 h-4" /> Agregar línea
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-1" />
              {saving ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
