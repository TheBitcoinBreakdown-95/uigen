"use client";

import { Loader2, Check } from "lucide-react";

interface ToolCallStatusProps {
  toolInvocation: {
    toolName: string;
    args: {
      command?: string;
      path?: string;
      new_path?: string;
    };
    state: string;
    result?: unknown;
  };
}

function extractFilename(path: string): string {
  if (!path) return "file";
  const parts = path.split("/");
  return parts[parts.length - 1] || "file";
}

function getStatusMessage(
  toolInvocation: ToolCallStatusProps["toolInvocation"],
  isCompleted: boolean
): string {
  const { args, toolName } = toolInvocation;
  const command = args?.command;
  const filename = extractFilename(args?.path || "");

  switch (command) {
    case "create":
      return isCompleted ? `Created ${filename}` : `Creating ${filename}`;
    case "str_replace":
    case "insert":
      return isCompleted ? `Edited ${filename}` : `Editing ${filename}`;
    case "view":
      return isCompleted ? `Read ${filename}` : `Reading ${filename}`;
    case "undo_edit":
      return isCompleted
        ? `Undid changes to ${filename}`
        : `Undoing changes to ${filename}`;
    case "rename": {
      const newFilename = extractFilename(args?.new_path || "");
      return isCompleted
        ? `Renamed ${filename} to ${newFilename}`
        : `Renaming ${filename} to ${newFilename}`;
    }
    case "delete":
      return isCompleted ? `Deleted ${filename}` : `Deleting ${filename}`;
    default:
      return toolName;
  }
}

export function ToolCallStatus({ toolInvocation }: ToolCallStatusProps) {
  const isCompleted = toolInvocation.state === "result" && toolInvocation.result;
  const message = getStatusMessage(toolInvocation, !!isCompleted);

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs border border-neutral-200">
      {isCompleted ? (
        <Check className="w-3 h-3 text-emerald-500" />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
      )}
      <span className="text-neutral-700">{message}</span>
    </div>
  );
}
