export type WorkItem = {
  title: string, // Product Management and Cloud
  colorClass: string; // Tailwind text-{color} class
  role: string; // Intern
  date: {
    start: string,
    end: string
  },
  description: string,
  logo: string, //img src
};

export const workExperience: WorkItem[] = [
  {
    title: "Product Management & Cloud Intern",
    colorClass: "text-pink",
    role: "Fortinet Federal",
    date: {
      start: "Jun 2025",
      end: "Aug 2025"
    },
    description:
      "Architected and built a proprietary, policy compliant full-stack automation platform for FortiGate configuration and isolated network provisioning.",
    logo: "/images/logos/fortinet.png"
  },
  {
    title: "Security & Operations Intern",
    colorClass: "text-orange",
    role: "Kite Technology Group",
    date: {
      start: "May 2024",
      end: "May 2025"
    },
    description:
      "Oversaw the Network Operations Center (NOC) board by proactively and reactively addressing automated cybersecurity alerts from clients, ensuring the integrity and security of their networks.",
    logo: "/images/logos/kite.png"
  },
  {
    title: "Freelance Web Developer",
    colorClass: "text-blue",
    role: "Self Employed",
    date: {
      start: "Jan 2024",
      end: "May 2024"
    },
    description:
      "Worked with customers to create high-quality and tailored websites that promoted their company through beautiful design, optimized SEO, and performance improvements.",
    logo: "/images/logos/nwb.png"
  }
];
