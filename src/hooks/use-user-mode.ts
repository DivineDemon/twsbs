"use client";

import { useEffect, useState } from "react";
import type { CrusadeSubMode, UserMode } from "@/lib/modes";
import { DEFAULT_MODE } from "@/lib/modes";
import { trpc } from "@/lib/trpc/client";

const MODE_STORAGE_KEY = "user-mode";
const SUBMODE_STORAGE_KEY = "user-submode";

export function useUserMode() {
  const [currentMode, setCurrentMode] = useState<UserMode>(DEFAULT_MODE);
  const [currentSubMode, setCurrentSubMode] = useState<CrusadeSubMode | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const utils = trpc.useUtils();

  // Load mode from localStorage on mount
  useEffect(() => {
    const storedMode = localStorage.getItem(MODE_STORAGE_KEY) as UserMode;
    const storedSubMode = localStorage.getItem(
      SUBMODE_STORAGE_KEY,
    ) as CrusadeSubMode | null;

    if (storedMode) {
      setCurrentMode(storedMode);
    }
    if (storedSubMode) {
      setCurrentSubMode(storedSubMode);
    }
    setIsLoading(false);
  }, []);

  const updateModeMutation = trpc.user.updateMode.useMutation({
    onSuccess: () => {
      utils.user.getProfile.invalidate();
    },
  });

  const switchMode = (mode: UserMode, subMode?: CrusadeSubMode | null) => {
    setCurrentMode(mode);
    setCurrentSubMode(subMode || null);

    // Save to localStorage
    localStorage.setItem(MODE_STORAGE_KEY, mode);
    if (subMode) {
      localStorage.setItem(SUBMODE_STORAGE_KEY, subMode);
    } else {
      localStorage.removeItem(SUBMODE_STORAGE_KEY);
    }

    // Save to database
    updateModeMutation.mutate({
      defaultMode: mode,
      defaultSubMode: subMode || null,
    });
  };

  return {
    currentMode,
    currentSubMode,
    switchMode,
    isLoading,
  };
}
