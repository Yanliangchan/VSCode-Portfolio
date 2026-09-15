export interface Project {
  title: string;
  description: string;
  logo: string;
  link: string;
  slug: string;
  /** 'game' ranks lower on the Projects page and shows `disclaimer`. */
  tier?: 'work' | 'game';
  /** Shown on 'game' projects — e.g. fan-made/unofficial, sourcing notes. */
  disclaimer?: string;
}

export interface Repo {
  id: number;
  name: string;
  description: string;
  language: string;
  watchers: number;
  forks: number;
  stargazers_count: number;
  html_url: string;
  homepage: string;
}

export interface User {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
}
