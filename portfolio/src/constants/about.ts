/** Text of the About page. Edit it here instead of in the view. */

export interface AboutStat {
  value: string
  label: string
}

export interface AboutSection {
  title: string
  paragraphs: string[]
}

export const ABOUT_NAME = 'Daniel Serrano'

export const ABOUT_HEADLINE =
  'I build software that holds up, and I’m working my way down to the hardware and toward quantum computers.'

export const ABOUT_INTRO =
  'I’m a software developer at IBM and a Computer Engineering student at the Instituto Tecnológico de Costa Rica (TEC), where I’m completing a Licenciatura focused on computer architecture and embedded systems: the layer where code meets the hardware that runs it.'

export const EXPECTED_GRADUATION_YEAR = 2030

/** The project count is added by the view, from the projects list. */
export const ABOUT_STATS: AboutStat[] = [
  { value: '1+ year', label: 'as a software developer at IBM' },
  {
    value: String(EXPECTED_GRADUATION_YEAR),
    label: 'expected graduation, with a master’s in quantum computing next',
  },
]

export const ABOUT_SECTIONS: AboutSection[] = [
  {
    title: 'Today',
    paragraphs: [
      'At IBM I’ve spent more than a year building software as a developer. At TEC I’m studying how computers work from the circuits up, with a focus on computer architecture and embedded systems.',
      'The two feed each other: work keeps my code practical, and the degree keeps me curious about what happens underneath it.',
    ],
  },
  {
    title: 'Quantum computing',
    paragraphs: [
      'This is where I’m headed. I’m studying quantum computer architecture, building connections with people who work in the field in other countries so I can learn from first-hand sources, and working to bring a quantum computing workshop to IBM.',
      `If all goes to plan, I graduate in ${EXPECTED_GRADUATION_YEAR} and continue with a master’s degree in quantum computing.`,
    ],
  },
  {
    title: 'How I build',
    paragraphs: [
      'When there’s a problem, I find a way to build the solution, and I hold every project to the same three standards: it has to be secure, the code has to stay organized, and the person using it shouldn’t sit through long loading screens or lose their work to a crash.',
      'Every project on this site was built on my own time, and some of them started before my first job in the industry.',
    ],
  },
  {
    title: 'Working with AI',
    paragraphs: [
      'I use AI agents to move faster without lowering that bar. I’ve written my own set of engineering rules, covering security, code structure, design and releases, and I attach them to every agent I give a task, so its work follows the same standards as mine.',
      'I’m also learning to improve how agents analyze data, using a GitHub repository analyzer, Skills and MCP servers to give them better context and keep their work to standard.',
    ],
  },
]

export const ABOUT_LANGUAGES = ['Python', 'JavaScript', 'TypeScript', 'Rust']

export const ABOUT_INTERESTS = [
  'Computer architecture',
  'Embedded systems',
  'Quantum computing',
  'Secure software',
  'AI-assisted development',
]
