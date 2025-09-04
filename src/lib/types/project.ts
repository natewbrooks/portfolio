// Icons (prefer mdi where available)
import IconGithub from '~icons/mdi/github'
import IconSvelte from '~icons/ri/svelte-line'                 // no mdi
import IconTailwind from '~icons/lineicons/tailwindcss'        // no mdi
import IconNode from '~icons/tabler/brand-nodejs'
import IconReact from '~icons/mdi/react'
import IconNextjs from '~icons/tabler/brand-nextjs'            // no mdi
import IconMysql from '~icons/tabler/sql'                  // mdi has db but not mysql logo
import IconDocker from '~icons/mdi/docker'
import IconPython from '~icons/mdi/language-python'
import IconFastapi from '~icons/devicon-plain/fastapi'             // no mdi
import IconTerraform from '~icons/mdi/terraform'         // no mdi
import IconThree from '~icons/tabler/brand-threejs'               // no mdi
import IconJava from '~icons/hugeicons/java'
import IconFirebase from '~icons/mdi/firebase'
import IconSocketIO from '~icons/tabler/brand-socket-io'        // no mdi
import IconGatsby from '~icons/mdi/gatsby'               // no mdi
import IconHTML from '~icons/mdi/language-html5'
import IconCSS from '~icons/tabler/brand-css3'
import IconJS from '~icons/mdi/language-javascript'
import IconTypescript from '~icons/mdi/language-typescript'

import type { ComponentType } from 'svelte'

/** Known technology keys */
export enum TECH {
  Github = 'Github',
  Svelte = 'Svelte',
  Tailwind = 'Tailwind',
  Typescript = 'Typescript',
  Node = 'Node',
  React = 'React',
  Nextjs = 'Next.js',
  MySQL = 'MySQL',
  Docker = 'Docker',
  Python = 'Python',
  FastAPI = 'FastAPI',
  Terraform = 'Terraform',
  Threejs = 'Three.js',
  Java = 'Java',
  Firebase = 'Firebase',
  Socketio = 'Socket.io',
  Gatsby = 'Gatsby',
  HTML = 'HTML',
  CSS = 'CSS',
  JavaScript = 'JavaScript',
}

/** Map TECH → icon component */
export const TechIcons: Record<TECH, ComponentType> = {
  [TECH.Github]: IconGithub,
  [TECH.Svelte]: IconSvelte,
  [TECH.Tailwind]: IconTailwind,
  [TECH.Typescript]: IconTypescript,
  [TECH.Node]: IconNode,
  [TECH.React]: IconReact,
  [TECH.Nextjs]: IconNextjs,
  [TECH.MySQL]: IconMysql,
  [TECH.Docker]: IconDocker,
  [TECH.Python]: IconPython,
  [TECH.FastAPI]: IconFastapi,
  [TECH.Terraform]: IconTerraform,
  [TECH.Threejs]: IconThree,
  [TECH.Java]: IconJava,
  [TECH.Firebase]: IconFirebase,
  [TECH.Socketio]: IconSocketIO,
  [TECH.Gatsby]: IconGatsby,
  [TECH.HTML]: IconHTML,
  [TECH.CSS]: IconCSS,
  [TECH.JavaScript]: IconJS,
}

export type Project = {
  name: string
  description: string
  year: number
  link: string
  technologies: TECH[]
  img: string
}

export const projects: Project[] = [
  {
    name: 'Updated Porfolio',
    description: 'Minimal portfolio with resume and stats tracked via API',
    year: 2025,
    link: '',
    technologies: [TECH.Svelte, TECH.Typescript],
    img: 'images/updatedPortfolio.webp',
  },
  {
    name: 'Automated Isolated Network Provisioner',
    description: 'Full-stack automation for FortiGate and isolated network provisioning.',
    year: 2025,
    link: '',
    technologies: [TECH.Docker, TECH.Svelte, TECH.Tailwind, TECH.Terraform, TECH.Python, TECH.FastAPI],
    img: 'images/management_tool.webp',
  },
  {
    name: 'JOUST',
    description: '3D jousting game with side-scroll and perspective combat.',
    year: 2025,
    link: 'https://github.com/natewbrooks/JOUST',
    technologies: [TECH.React, TECH.Threejs, TECH.Tailwind],
    img: 'images/joust.webp',
  },
  {
    name: 'Linganore United Methodist Church',
    description: 'Custom site with admin panel and configurable backend.',
    year: 2025,
    link: 'https://linganoreumc.com',
    technologies: [TECH.Docker, TECH.Nextjs, TECH.React, TECH.MySQL, TECH.Tailwind],
    img: 'images/linganoreumc.webp',
  },
  {
    name: 'DIMF AutoPoster',
    description: 'AI-assisted memorial post generator with Java + MySQL.',
    year: 2025,
    link: 'https://github.com/natewbrooks/dimf-autoposter',
    technologies: [TECH.Java, TECH.MySQL, TECH.Python, TECH.FastAPI],
    img: 'images/dimf.webp',
  },
  {
    name: 'Caption Creators',
    description: 'Multiplayer caption game with auth, lobbies, and leaderboard.',
    year: 2024,
    link: 'https://github.com/natewbrooks/caption-creators',
    technologies: [TECH.Nextjs, TECH.React, TECH.Firebase, TECH.Socketio, TECH.MySQL, TECH.Tailwind],
    img: 'images/caption-creators.webp',
  },
  {
    name: 'Positive Professionals',
    description: 'Commercial coaching site with Gatsby CMS.',
    year: 2024,
    link: 'https://positiveprofessionals.net',
    technologies: [TECH.Gatsby, TECH.React, TECH.Firebase, TECH.Tailwind],
    img: 'images/ppro.webp',
  },
  {
    name: 'Portfolio',
    description: 'Personal portfolio site.',
    year: 2023,
    link: 'https://github.com/natewbrooks/portfolio-website',
    technologies: [TECH.Nextjs, TECH.React, TECH.Tailwind],
    img: 'images/portfolioSite.webp',
  },
  {
    name: 'Chess',
    description: 'Two-player Java Swing chess app. Incomplete :D',
    year: 2022,
    link: 'https://github.com/natewbrooks/chess',
    technologies: [TECH.Java],
    img: 'images/chess.webp',
  },
  {
    name: 'Bombsniffer',
    description: 'Minesweeper clone in vanilla web tech.',
    year: 2021,
    link: 'https://github.com/natewbrooks/bombsniffer',
    technologies: [TECH.HTML, TECH.CSS, TECH.JavaScript],
    img: 'images/bombsniffer.webp',
  },
  {
    name: 'Termdle',
    description: 'Java Swing Wordle clone.',
    year: 2021,
    link: 'https://github.com/natewbrooks/termdle',
    technologies: [TECH.Java],
    img: 'images/termdleImg.webp',
  },
]
