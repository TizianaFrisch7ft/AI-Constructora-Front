import { Hammer } from "lucide-react"

export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-start space-x-2 sm:space-x-3">
        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
          <Hammer className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
        </div>
        <div className="bg-gradient-to-r from-white to-blue-50/50 rounded-2xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border border-blue-200/30 shadow-sm">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
