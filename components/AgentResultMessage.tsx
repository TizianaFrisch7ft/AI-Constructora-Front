"use client";

import React from "react";
import ReactMarkdown from "react-markdown";

interface AgentResultMessageProps {
  result: {
    answer: string;
    table?: {
      headers: string[];
      rows: string[][];
    };
  };
}

export default function AgentResultMessage({ result }: AgentResultMessageProps) {
  const { answer, table } = result;

  return (
    <div className="bg-muted border border-muted/40 rounded-md p-4 shadow-sm text-sm text-gray-800">
      {/* Si no hay tabla, muestro Markdown */}
      {!table && (
        <div className="prose prose-sm max-w-none mb-3">
          <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
      )}

      {/* Si hay tabla, la renderizo */}
      {table && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm border border-gray-200 rounded">
            <thead className="bg-gray-100 text-gray-800 font-semibold">
              <tr>
                {table.headers.map((header, idx) => (
                  <th key={idx} className="px-3 py-2 border-b border-gray-300">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-2 border-b border-gray-200">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
