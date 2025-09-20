"use client";

import { Loader2, FileEdit, FileIcon, FolderIcon, TrashIcon } from "lucide-react";

interface ToolCallDisplayProps {
  toolName: string;
  toolArgs?: Record<string, any>;
  state: "partial-call" | "call" | "result";
  result?: any;
}

function getToolDisplayInfo(toolName: string, toolArgs?: Record<string, any>) {
  const fileName = toolArgs?.path ? toolArgs.path.split('/').pop() : '';

  switch (toolName) {
    case "str_replace_editor":
      const command = toolArgs?.command;
      switch (command) {
        case "create":
          return {
            icon: <FileIcon className="w-3 h-3" />,
            message: `Creating ${fileName || 'file'}`,
            color: "text-emerald-600"
          };
        case "str_replace":
          return {
            icon: <FileEdit className="w-3 h-3" />,
            message: `Editing ${fileName || 'file'}`,
            color: "text-blue-600"
          };
        case "view":
          return {
            icon: <FileIcon className="w-3 h-3" />,
            message: `Reading ${fileName || 'file'}`,
            color: "text-neutral-600"
          };
        case "insert":
          return {
            icon: <FileEdit className="w-3 h-3" />,
            message: `Adding to ${fileName || 'file'}`,
            color: "text-blue-600"
          };
        default:
          return {
            icon: <FileEdit className="w-3 h-3" />,
            message: `Modifying ${fileName || 'file'}`,
            color: "text-blue-600"
          };
      }

    case "file_manager":
      const fileCommand = toolArgs?.command;
      switch (fileCommand) {
        case "rename":
          const newFileName = toolArgs?.new_path ? toolArgs.new_path.split('/').pop() : '';
          return {
            icon: <FolderIcon className="w-3 h-3" />,
            message: `Renaming ${fileName} to ${newFileName}`,
            color: "text-amber-600"
          };
        case "delete":
          return {
            icon: <TrashIcon className="w-3 h-3" />,
            message: `Deleting ${fileName || 'file'}`,
            color: "text-red-600"
          };
        default:
          return {
            icon: <FolderIcon className="w-3 h-3" />,
            message: `Managing ${fileName || 'file'}`,
            color: "text-neutral-600"
          };
      }

    default:
      return {
        icon: <FileEdit className="w-3 h-3" />,
        message: toolName.replace(/_/g, ' '),
        color: "text-neutral-600"
      };
  }
}

export function ToolCallDisplay({ toolName, toolArgs, state, result }: ToolCallDisplayProps) {
  const { icon, message, color } = getToolDisplayInfo(toolName, toolArgs);

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200">
      {state === "result" && result ? (
        <>
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span className={color}>{icon}</span>
          <span className="text-neutral-700">{message}</span>
        </>
      ) : (
        <>
          <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
          <span className={color}>{icon}</span>
          <span className="text-neutral-700">{message}</span>
        </>
      )}
    </div>
  );
}