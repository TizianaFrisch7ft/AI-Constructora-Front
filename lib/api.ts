import type { SchedulePurLine, Vendor } from "../app/types/purchasingTypes";


export async function getAllSchedulePurLines(): Promise<SchedulePurLine[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedule-lines`);
  if (!res.ok) throw new Error("Error al cargar líneas");
  const data = await res.json();
  return data; 
}


export async function getVendors(): Promise<Vendor[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vendors`);
  if (!res.ok) throw new Error("Error al cargar proveedores");
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export const generateQuotes = async (selectedLines: SchedulePurLine[]) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quote-request/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ selectedLines }),
  });

  if (!res.ok) throw new Error("Error generando cotizaciones");
  return res.json();
};
