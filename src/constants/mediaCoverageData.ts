import { MediaData } from '@/types/ExperienceTypes';
import { imageLibrary } from '@/helpers';
const mediaData: MediaData[] = [
  {
    title: 'IMDB',
    description:
      'IMDb is a comprehensive online repository, providing information on movies, TV shows, and celebrities.',
    url: 'https://www.imdb.com/name/nm10863826/',
    srcImg: imageLibrary.imdb(),
  },
  {
    title: 'Develop: Brighton',
    description:
      'Inspirational conference for global game developers to connect, innovate, and share experiences.',
    url: 'https://www.developconference.com/speakers/sonia-coronado',
    srcImg: imageLibrary.develop(),
  },
  {
    title: 'USC Screen Scoring',
    description:
      'Where students master composing music for film, TV, and games through industry collaborations in LA.',
    url: 'https://uscscoring.com/students/2019/sonia-coronado',
    srcImg: imageLibrary.usc(),
  },
  {
    title: 'Playstation Official Blog',
    description: "Sony's official platform for news and updates on PlayStation games and consoles.",
    url: 'https://blog.de.playstation.com/2022/11/22/hinter-den-kulissen-von-god-of-war-ragnaroek-the-gods-of-scores/',
    srcImg: imageLibrary.playstation(),
  },
];

export default mediaData;
