export type SchoolItem = {
  school: string
  major: string
  startDate: string
  endDate: string
  gpa: number
  highlights: string[]
  img: string
}

export const school: SchoolItem[] = [
  {
    school: 'Towson University',
    major: 'Computer Science',
    startDate: 'Aug 2022',
    endDate: 'May 2026',
    gpa: 3.81,
    highlights: [
      'All A\'s in major related coursework',
      // 'Upper-division coursework in operating systems, computer graphics, compilers, databases, and real-time systems',
      // 'Strong emphasis on systems programming, algorithms, and software engineering fundamentals',
      // 'Project-heavy curriculum with focus on correctness, performance, and technical documentation'
    ],
    img: 'images/tu.webp',
  },
]
