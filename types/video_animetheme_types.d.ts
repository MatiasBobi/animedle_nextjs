

export interface AnimeThemesData {
  findAnimeByExternalSite: AnimeVideosInfo[];
}

export interface AnimeVideosInfo {
  id: number;
  animethemes: AnimeTheme[];
}

export interface AnimeTheme {
  slug: string;
  type: "OP" | "ED"; // Puedes agregar más tipos si es necesario
  song: Song;
  animethemeentries: AnimeThemeEntry[];
}

export interface Song {
  id: number;
  title: string;
}

export interface AnimeThemeEntry {
  videos: Videos;
}

export interface Videos {
  nodes: VideoNode[];
  edges: VideoEdge[];
}

export interface VideoNode {
  audio: Audio;
  link: string;
}

export interface Audio {
  id: number;
  link: string;
}

export interface VideoEdge {
  node: VideoEdgeNode;
}

export interface VideoEdgeNode {
  basename: string;
}