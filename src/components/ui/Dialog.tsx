import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "./Button";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Dialog({ isOpen, onClose, title, children }: DialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-xl bg-white dark:bg-zinc-900 p-6 shadow-lg animate-in fade-in zoom-in duration-200 border dark:border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 dark:text-zinc-400">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2">
          {children}
        </div>
      </div>
    </div>
  );
}
