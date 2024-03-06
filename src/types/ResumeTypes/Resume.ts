import { LifeHighlights, Skill } from '.';

interface Resume {
  /**
   * Persons name
   */
  name: string;

  /**
   * Persons email
   */
  email: string;

  /**
   * LinkedIn URL
   */
  linkedin: string;

  /**
   * Persons phone
   */
  phone: string;

  /**
   * Summary of persons career
   */
  summary: string;

  /**
   * Projects person has worked.
   */
  projects: LifeHighlights[];

  /**
   * Work experience
   */
  experience: LifeHighlights[];

  /**
   * Skills the person has
   */
  skills: Skill[];

  /**
   * Education information
   */
  education: LifeHighlights[];
}

export default Resume;
