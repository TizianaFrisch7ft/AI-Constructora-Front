// components/AgentResultMessage.tsx
import { Badge as EntityBadge } from "@/components/ui/badge"
import ReactMarkdown from "react-markdown"

interface Entity {
  type: string
  value?: string
  name?: string
  rut?: string
}

interface BotContent {
  answer: string
  entities: Entity[]
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
  return (
    <div className="space-y-3 mt-2">
      <div className="prose prose-sm text-gray-800">
        <ReactMarkdown>{result.answer}</ReactMarkdown>
      </div>

      {result.entities?.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500">Entidades detectadas:</p>
          <div className="flex flex-col gap-1">
            {result.entities.map((entity, index) => (
              <EntityBadge
                key={index}
                className={`${getBadgeClass(entity.type)} text-xs font-medium w-fit`}
              >
         {entity.type === "Vendor" && entity.name ? (
          <span className="flex flex-col text-start leading-tight">
            <span className="font-semibold">
              Vendor: {entity.name}
            </span>
            {entity.rut && (
              <span className="text-[10px] text-gray-600">RUT: {entity.rut}</span>
            )}
          </span>
        ) : entity.name ? (
          `${entity.type}: ${entity.name}`
        ) : entity.value ? (
          `${entity.type}: ${entity.value}`
        ) : (
          entity.type
        )}



              </EntityBadge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
