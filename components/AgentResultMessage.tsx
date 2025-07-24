// components/AgentResultMessage.tsx
import { Badge as EntityBadge } from "@/components/ui/badge"
import ReactMarkdown from "react-markdown"

interface Entity {
  type: string
  value: string
}

interface BotContent {
  answer: string
  entities: Entity[]
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
              <div key={index}>
              <EntityBadge className="bg-cyan-100 text-cyan-800 border-cyan-300 text-xs font-medium w-fit">
  {entity.type}: {entity.value}
</EntityBadge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
