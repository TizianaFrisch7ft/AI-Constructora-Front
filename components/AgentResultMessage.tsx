"use client"

import React, { useState } from "react"
import { Badge as EntityBadge } from "@/components/ui/badge"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Button } from "@/components/ui/button"
import ReactMarkdown from "react-markdown"
import { useToast } from "@/components/ui/use-toast"

interface Entity {
  type: string
  id?: string
  name: string
  rut?: string
  surname?: string
  email?: string
}

interface Recipient {
  name: string
  email: string
}

interface BotContent {
  answer: string
  entities: Entity[]
  offerReminder?: boolean
  reminderRecipients?: Recipient[]
  rfqId?: string
}

function getBadgeClass(type: string) {
  switch (type) {
    case "Project":
      return "bg-green-100 text-green-800 border-green-300"
    case "Vendor":
      return "bg-red-100 text-red-800 border-red-300"
    case "QuoteRequest":
      return "bg-blue-100 text-blue-800 border-blue-300"
    case "QuoteRequestLine":
      return "bg-sky-100 text-sky-800 border-sky-300"
    case "Eval":
      return "bg-violet-100 text-violet-800 border-violet-300"
    case "EvalLine":
      return "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300"
    case "ProjectVendor":
      return "bg-orange-100 text-orange-800 border-orange-300"
    case "PM":
      return "bg-yellow-100 text-yellow-800 border-yellow-300"
    case "ProjectPM":
      return "bg-lime-100 text-lime-800 border-lime-300"
    case "SchedulePur":
      return "bg-teal-100 text-teal-800 border-teal-300"
    case "SchedulePurLine":
      return "bg-cyan-100 text-cyan-800 border-cyan-300"
    default:
      return "bg-gray-100 text-gray-800 border-gray-300"
  }
}

export default function AgentResultMessage({ result }: { result: BotContent }) {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [selected, setSelected] = useState<Set<number>>(
    new Set(result.reminderRecipients?.map((_, i) => i) ?? [])
  )
  const { toast } = useToast()

  const toggle = (i: number) =>
    setSelected((s) => {
      const copy = new Set(s)
      copy.has(i) ? copy.delete(i) : copy.add(i)
      return copy
    })

  const sendReminders = async () => {
    if (!result.reminderRecipients || !result.rfqId) return
    const recipients = Array.from(selected).map((i) => result.reminderRecipients![i])

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send-reminder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rfqId: result.rfqId, recipients }),
      })

      if (!res.ok) throw new Error("Fallo en la solicitud")

      toast({
        title: "✅ Recordatorios enviados",
        description: `${recipients.length} recordatorio(s) fueron enviados correctamente.`,
      })

      setSent(true)
      setOpen(false)
    } catch {
      toast({
        title: "❌ Error al enviar",
        description: "Hubo un problema enviando los recordatorios.",
      })
    }
  }

  return (
    <div className="space-y-3 mt-2">
      <div className="prose prose-sm text-gray-800">
        <ReactMarkdown>{result.answer}</ReactMarkdown>
      </div>

      {result.entities?.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500">Entidades detectadas:</p>
          <div className="flex flex-col gap-1">
            {result.entities.map((e, idx) => (
              <EntityBadge
                key={idx}
                className={`${getBadgeClass(e.type)} text-xs font-medium w-fit`}
              >
                {e.type === "Vendor" ? (
                  <span className="flex flex-col text-start leading-tight">
                    <span className="font-semibold">Vendor: {e.name}</span>
                    {e.rut && (
                      <span className="text-[10px] text-gray-600">RUT: {e.rut}</span>
                    )}
                  </span>
                ) : e.type === "PM" && e.surname ? (
                  <span className="flex flex-col text-start leading-tight">
                    <span className="font-semibold">{`PM: ${e.name} ${e.surname}`}</span>
                    {e.email && (
                      <span className="text-[10px] text-gray-600">{e.email}</span>
                    )}
                  </span>
                ) : (
                  `${e.type}: ${e.name}`
                )}
              </EntityBadge>
            ))}
          </div>
        </div>
      )}

      {result.offerReminder && result.reminderRecipients?.length ? (
        <div className="mt-2">
          {sent ? (
            <EntityBadge className="bg-green-200 text-green-900 border-green-300 text-xs font-medium">
              Recordatorios enviados ✅
            </EntityBadge>
          ) : (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <EntityBadge className="cursor-pointer bg-yellow-200 text-yellow-900 border-yellow-300 text-xs font-medium">
                  Enviar recordatorios
                </EntityBadge>
              </DialogTrigger>

              {open && (
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Recordatorios pendientes</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2 mt-2">
                    {result.reminderRecipients.map((pm, i) => (
                      <label key={i} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selected.has(i)}
                          onChange={() => toggle(i)}
                          className="h-4 w-4"
                        />
                        <span>
                          {pm.name} —{" "}
                          <span className="text-[10px] text-gray-600">{pm.email}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                  <DialogFooter className="space-x-2">
                    <Button onClick={sendReminders}>Confirmar envío</Button>
                    <Button variant="ghost" onClick={() => setOpen(false)}>
                      Cancelar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              )}
            </Dialog>
          )}
        </div>
      ) : null}
    </div>
  )
}
