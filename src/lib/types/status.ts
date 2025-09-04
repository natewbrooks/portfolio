import IconSpotify from '~icons/mdi/spotify'
import IconBrain from '~icons/mdi/brain'
import IconMovie from '~icons/bx/bxs-camera-movie'
import IconTrophy from '~icons/material-symbols/trophy'
import IconPodcast from '~icons/mdi/microphone'
import IconGit from '~icons/mdi/git'
import IconGame from '~icons/solar/gamepad-bold'


export type StatusItem = {
  /** The imported icon component (from unplugin-icons) */
  icon: typeof IconSpotify; 
  /** Tailwind color class for the icon */
  colorClass: string;
  /** Text to render inside the <p> */
  label: string;
  // The answer
  status: string;
  /** Optional sub-label or highlight (like "x12") */
  subLabel?: string;
};

export const statusItems: StatusItem[] = [
  {
    icon: IconSpotify,
    colorClass: "text-green",
    label: "listening to:",
    status: "the sweet escape", 
  },
  {
    icon: IconPodcast,
    colorClass: "text-purple",
    label: "favorite podcast:",
    status: "the yard",
  },
  {
    icon: IconTrophy,
    colorClass: "text-orange",
    label: "song of the week:",
    status: "punkrocker",
    subLabel: "x12",
  },
  {
    icon: IconBrain,
    colorClass: "text-pink",
    label: "currently learning:",
    status: "guitar",
  },
  {
    icon: IconGit,
    colorClass: "text-purple",
    label: "last commit repo:",
    status: "joust",
  },
  {
    icon: IconGame,
    colorClass: "text-orange",
    label: "favorite game:",
    status: "super smash bros. melee",
  },
];