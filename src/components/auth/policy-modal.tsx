"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PolicyModalProps {
  title: string;
  content: string;
  triggerText?: string;
}

export function PolicyModal({
  title,
  content,
  triggerText = "Read Policy",
}: PolicyModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 h-auto font-normal text-primary">
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col max-w-[800px] h-[80vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Please read the following policy carefully.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full max-h-full overflow-y-auto mt-4 p-4 border rounded-md whitespace-pre-wrap text-sm leading-relaxed">
          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
}
