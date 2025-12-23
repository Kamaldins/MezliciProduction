export interface GalleryImage {
  src: string;
  id: number;
}

export interface NavLink {
  label: string;
  path: string;
}

export enum ViewState {
  HOME = 'home',
  GALLERY = 'gallery',
  POLICY = 'policy'
}