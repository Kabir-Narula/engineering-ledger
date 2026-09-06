export interface ExperienceEntry {
  role: string;
  organization: string;
  location: string;
  start: string;
  end: string;
  contributions: string[];
  focus: string[];
}

export interface EducationEntry {
  institution: string;
  credential: string;
  location: string;
  expected: string;
  coursework: string[];
}

export interface Achievement {
  headline: string;
  detail: string;
}

export interface CapabilityGroup {
  label: string;
  items: string[];
}

export interface Profile {
  name: string;
  location: string;
  email: string;
  phone: string;
  links: {
    github: string;
    linkedin: string;
  };
  positioning: string;
  availability: string;
}
