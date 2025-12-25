"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUserMode } from "@/hooks/use-user-mode";
import {
  type CrusadeSubMode,
  getModeConfig,
  MODE_CONFIGS,
  type UserMode,
} from "@/lib/modes";
import { cn } from "@/lib/utils";

export function ModeSelector() {
  const { currentMode, currentSubMode, switchMode } = useUserMode();
  const [open, setOpen] = useState(false);

  const currentModeConfig = getModeConfig(currentMode);
  const CurrentIcon = currentModeConfig.icon;

  const handleModeChange = (mode: UserMode, subMode?: CrusadeSubMode) => {
    switchMode(mode, subMode);
    setOpen(false);
    toast.success("Mode switched", {
      description: `Switched to ${getModeConfig(mode).label}${subMode ? ` - ${subMode}` : ""}`,
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-start gap-2"
        >
          <CurrentIcon className={cn("h-4 w-4", currentModeConfig.color)} />
          <span className="flex-1 text-left">
            {currentModeConfig.label}
            {currentSubMode && (
              <span className="text-muted-foreground ml-1">
                ({currentSubMode})
              </span>
            )}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="end">
        <Command>
          <CommandInput placeholder="Search modes..." />
          <CommandList>
            <CommandEmpty>No mode found.</CommandEmpty>
            <CommandGroup heading="Modes">
              {Object.values(MODE_CONFIGS).map((mode) => {
                const Icon = mode.icon;
                const isSelected = currentMode === mode.id && !mode.subModes;

                return (
                  <div key={mode.id}>
                    <CommandItem
                      value={mode.id}
                      onSelect={() => handleModeChange(mode.id)}
                      className="cursor-pointer"
                    >
                      <Icon className={cn("mr-2 h-4 w-4", mode.color)} />
                      <div className="flex-1">
                        <div className="font-medium">{mode.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {mode.description}
                        </div>
                      </div>
                      {isSelected && <Check className="ml-2 h-4 w-4" />}
                    </CommandItem>

                    {/* Sub-modes for Crusade */}
                    {mode.subModes && mode.id === "crusade" && (
                      <>
                        <CommandSeparator />
                        <CommandGroup heading="Crusade Sub-modes">
                          {mode.subModes.map((subMode) => {
                            const SubIcon = subMode.icon;
                            const isSubSelected =
                              currentMode === mode.id &&
                              currentSubMode === subMode.id;

                            return (
                              <CommandItem
                                key={subMode.id}
                                value={`${mode.id}-${subMode.id}`}
                                onSelect={() =>
                                  handleModeChange(mode.id, subMode.id)
                                }
                                className="cursor-pointer pl-8"
                              >
                                <SubIcon className="mr-2 h-4 w-4" />
                                <div className="flex-1">
                                  <div className="font-medium">
                                    {subMode.label}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {subMode.description}
                                  </div>
                                </div>
                                {isSubSelected && (
                                  <Check className="ml-2 h-4 w-4" />
                                )}
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </>
                    )}
                  </div>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
