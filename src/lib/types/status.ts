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