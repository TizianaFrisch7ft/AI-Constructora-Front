import React, { useState } from "react"
import { Button } from "@/components/ui/button"

interface ResultMessageProps {
  result: any
}

export default function ResultMessage({ result }: ResultMessageProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-muted p-4 rounded-md shadow">
      <p>✅ Operación realizada correctamente.</p>

      <Button
        variant="ghost"
        className="mt-2 text-sm text-blue-600 hover:underline"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Ocultar detalles" : "Expandir detalles"}
      </Button>

      {expanded && (
        <pre className="mt-2 bg-background text-sm p-2 rounded overflow-x-auto whitespace-pre-wrap">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  )
}
