import { Resume } from '@/types/ResumeTypes';

const resume: Resume = {
  name: 'Sonia Coronado Cuesta',
  email: 'scoronadocuesta@gmail.com',
  phone: '(857) 200-6930',
  summary:
    'Seasoned music designer currently working at PlayStation. Career spans six years with experience in game audio music leadership, cross-disciplinary creative collaborations between composers, dialogue designers, and sound designers, and developing editing and implementation resources. Shipped multiple AAA titles as a key contributor for audio teams in design and lead roles. Skilled in vision-keeping, process improvement for game music production, recording pipelines, and technical music design.',
  projects: [
    {
      id: 1,
      title: 'Music Production Lead, God of War Ragnarök (2023)',
      entity: 'PlayStation',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-12-31'),
      explanation:
        'Oversaw full scope of music production effort through the development pipeline including project initialization, tools configuration, design documentation and production planning.',
      city: 'Los Angeles',
      country: 'USA',
      online: false,
      subtitle: 'Music Production Lead',
      important: true,
      highlights: [
        'Oversaw full scope of music production efforts through the development pipeline including project initialization, tools configuration, design documentation and production planning.',
        "Collaborated directly with game director and audio director to fulfill the director's vision for the music and provided departmental guidance to sustain creative consistency through release.",
        "Maintained relationships between internal and external disciplines to ensure healthy collaborations with dialogue, music, and sound design teams, in-house supervisors, and the developer's leadership team.",
        'Responsible for design, editing, and implementation of complex interactive music systems using Wwise and Pro Tools, actively managed reviews, approvals, and deliveries.',
      ],
    },
    {
      id: 2,
      title: 'Music Editor, Ghost of Tsushima (2020)',
      entity: 'PlayStation',
      startDate: new Date('2020-01-01'),
      endDate: new Date('2020-12-31'),
      explanation:
        'Authored music assets from composer deliveries into interactive music and linear content for in-game use, as well as marketing material leading up to release using Pro Tools.',
      city: 'Los Angeles',
      country: 'USA',
      online: false,
      subtitle: 'Music Editor',
      important: true,
      highlights: [
        'Authored music assets from composer deliveries into interactive music and linear content for in game use, as well as marketing material leading up to release using Pro Tools.',
        'Collaborated with the internal music team to implement music assets using Wwise and proprietary tools for cinematic and gameplay content, as well as testing the game for music bugs and documenting those.',
        'Documented and updated game information throughout the last year of development to facilitate music implementation and testing for the internal music team.',
      ],
    },
    // Add more project highlights if needed
  ],
  experience: [
    {
      id: 1,
      title: 'Senior Music Designer at PlayStation Studios Creative Arts (June 2019 to present)',
      entity: 'PlayStation',
      startDate: new Date('2019-06-01'),
      endDate: undefined, // Ongoing
      explanation:
        'Organized and maintained concurrent relationships with external partners across PlayStation Studios to document, produce, and deliver music requests.',
      city: 'Los Angeles',
      country: 'USA',
      online: false,
      subtitle: 'Senior Music Designer',
      highlights: [
        'Organized and maintained concurrent relationships with external partners across PlayStation Studios to document, produce, and deliver music requests.',
        'Authored, coordinated, and facilitated team-wide professional development sessions covering music design and music editing best-practices.',
        'Represented the PlayStation Music team at industry engagement events, giving talks alongside dialogue and sound representatives on approaching the game audio mix for God of War Ragnarök.',
        'Additional credits include Ratchet & Clank: Rift Apart, MLB The Show 21, Sackboy: A Big Adventure, Spider-Man: Miles Morales, The Last of Us Part II, Death Stranding, Call of Duty: Modern Warfare.',
        'Outstanding Achievement in Music Editing – Game Music at the 70th MPSE Golden Reel Awards, and the Outstanding Achievement in Sound Editing – Computer Cinematic and Outstanding Achievement in Sound Editing – Computer Interactive Game Play awards at the 67th and 68th MPSE Golden Reel Awards.',
      ],
    },
    // Add more experience entries if needed
  ],
  skills: [
    { title: 'Music Production Leadership' },
    { title: 'Music Design and Implementation' },
    { title: 'Composition and Orchestration' },
    { title: 'Arranging and Editing' },
    { title: 'Documentation' },
    { title: 'Communication' },
    { title: 'Relationship Building' },
    { title: 'Creative Mentorship' },
    { title: 'Wwise' },
    { title: 'Pro Tools' },
    { title: 'Sibelius' },
    { title: 'Finale' },
    { title: 'Logic Pro' },
    { title: 'Microsoft Excel' },
    { title: 'PowerPoint' },
    { title: 'Confluence' },
    { title: 'Jira' },
    { title: 'Perforce' },
    // Add more skill if need
  ],
  education: [
    {
      id: 1,
      title: 'Master of Music, Screen Scoring',
      entity: 'University of Southern California',
      startDate: new Date('2019-01-01'),
      endDate: new Date('2019-12-31'),
      country: 'USA',
      online: false,
      subtitle: 'Screen Scoring',
    },
    {
      id: 2,
      title: 'Bachelor of Music, Film Scoring and Performance',
      entity: 'Berklee College of Music',
      startDate: new Date('2018-01-01'),
      endDate: new Date('2018-12-31'),
      country: 'USA',
      online: false,
      subtitle: 'Film Scoring and Performance',
    },
    // Add more education entries if needed
  ],
};

export default resume;
