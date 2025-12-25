import {
  BookOpen,
  Globe,
  Heart,
  Home,
  type LucideIcon,
  MapPin,
  Users,
} from "lucide-react";

export type UserMode =
  | "movement"
  | "new_believer"
  | "evangelist"
  | "neighborhoods"
  | "crusade";

export type CrusadeSubMode =
  | "organizer"
  | "volunteer"
  | "church"
  | "new_believer_event";

export interface ModeConfig {
  id: UserMode;
  label: string;
  description: string;
  icon: LucideIcon;
  color: string;
  subModes?: SubModeConfig[];
}

export interface SubModeConfig {
  id: CrusadeSubMode;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const MODE_CONFIGS: Record<UserMode, ModeConfig> = {
  movement: {
    id: "movement",
    label: "Movement",
    description: "Build and manage your discipleship network",
    icon: Users,
    color: "text-blue-600",
  },
  new_believer: {
    id: "new_believer",
    label: "New Believer",
    description: "Start your journey of faith and growth",
    icon: BookOpen,
    color: "text-green-600",
  },
  evangelist: {
    id: "evangelist",
    label: "Evangelist",
    description: "Share the gospel and track decisions",
    icon: Heart,
    color: "text-red-600",
  },
  neighborhoods: {
    id: "neighborhoods",
    label: "Neighborhoods",
    description: "Reach your local community",
    icon: MapPin,
    color: "text-purple-600",
  },
  crusade: {
    id: "crusade",
    label: "Crusade",
    description: "Organize and participate in large-scale events",
    icon: Globe,
    color: "text-orange-600",
    subModes: [
      {
        id: "organizer",
        label: "Organizer",
        description: "Plan and manage crusade events",
        icon: Users,
      },
      {
        id: "volunteer",
        label: "Volunteer",
        description: "Serve at crusade events",
        icon: Heart,
      },
      {
        id: "church",
        label: "Church",
        description: "Partner church representative",
        icon: Home,
      },
      {
        id: "new_believer_event",
        label: "New Believer",
        description: "New believer from crusade event",
        icon: BookOpen,
      },
    ],
  },
};

export const DEFAULT_MODE: UserMode = "movement";

export function getModeConfig(mode: UserMode): ModeConfig {
  return MODE_CONFIGS[mode];
}

export function getSubModeConfig(
  mode: UserMode,
  subMode: CrusadeSubMode,
): SubModeConfig | undefined {
  const modeConfig = MODE_CONFIGS[mode];
  return modeConfig.subModes?.find((sm) => sm.id === subMode);
}
