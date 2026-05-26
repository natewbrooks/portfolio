export type Role = {
  title: string;
  date: { start: string; end: string };
  description: string;
};

export type WorkItem = {
  company: string;
  colorClass: string; // Tailwind text-{color} class
  logo: string;
  roles: Role[]; // newest first
};

// GoPanda: intern role promotes to full SWE on Jun 1, 2026
const gopandaPromotionDate = new Date("2026-06-01T00:00:00");
const isPromoted = new Date() >= gopandaPromotionDate;

const gopandaInternRole: Role = {
  title: "Software Engineer Intern",
  date: {
    start: "Nov 2025",
    end: isPromoted ? "May 2026" : "Present"
  },
  description: "Recruited by my Web Programming professor to support production contract development on a small engineering team. Contribute to full-stack web applications using React, NodeJS, Redis, RESTful APIs, and relational databases."
};

const gopandaSweRole: Role = {
  title: "Software Engineer",
  date: { start: "Jun 2026", end: "Present" },
  description: ""
};

const gopandaRoles: Role[] = isPromoted
  ? [gopandaSweRole, gopandaInternRole]
  : [gopandaInternRole];

export const workExperience: WorkItem[] = [
  {
    company: "GoPanda",
    colorClass: "purple",
    logo: "/images/logos/fortinet.png",
    roles: gopandaRoles
  },
  {
    company: "Fortinet Federal",
    colorClass: "pink",
    logo: "/images/logos/fortinet.png",
    roles: [
      {
        title: "Product Management & Cloud Intern",
        date: { start: "Jun 2025", end: "Aug 2025" },
        description:
          "Architected and built a proprietary, policy compliant full-stack automation platform for FortiGate configuration and isolated network provisioning."
      }
    ]
  },
  {
    company: "Kite Technology Group",
    colorClass: "orange",
    logo: "/images/logos/kite.png",
    roles: [
      {
        title: "Security & Operations Intern",
        date: { start: "May 2024", end: "May 2025" },
        description:
          "Oversaw the Network Operations Center (NOC) board by proactively and reactively addressing automated cybersecurity alerts from clients, ensuring the integrity and security of their networks."
      }
    ]
  },
  {
    company: "Self Employed",
    colorClass: "blue",
    logo: "/images/logos/nwb.png",
    roles: [
      {
        title: "Freelance Web Developer",
        date: { start: "Jan 2024", end: "May 2024" },
        description:
          "Worked with customers to create high-quality and tailored websites that promoted their company through beautiful design, optimized SEO, and performance improvements."
      }
    ]
  }
];
