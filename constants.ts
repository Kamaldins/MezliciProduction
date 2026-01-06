import { GalleryImage, NavLink } from './types';

export const PHONE_NUMBER = "+371 29294621";
export const PHONE_HREF = "tel:+37129294621";
export const ADDRESS = "Ķeguma pagasts, Tome";
// Updated Google Maps link with &t=h to force Hybrid (Satellite + Labels) view when opened
export const MAPS_LINK = "https://www.google.com/maps/place/56%C2%B043'20.2%22N+24%C2%B043'26.0%22E/@56.7222882,24.7222041,310m/data=!3m1!1e3!4m4!3m3!8m2!3d56.722276!4d24.723883!5m1!1e4&t=h";
export const WAZE_LINK = "https://waze.com/ul?ll=56.722276,24.723883&navigate=yes";
export const APPLE_MAPS_LINK = "https://maps.apple.com/place?map=satellite&auid=15335768332464220734&address=Tomes+pag.%2C+LV-5020%2C+Latvia&coordinate=56.72231688210846%2C24.723812543411448&name=Marked+Location&lsp=7618";

export const NAV_LINKS: NavLink[] = [
  { label: 'Sākums', path: '/' },
  { label: 'Pirts', path: '/sauna' },
  { label: 'Galerija', path: '/gallery' },
  { label: 'Privātums', path: '/policy' },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 0, src: 'https://i.ibb.co/mVH0z4S8/Whats-App-Image-2025-10-25-at-16-40-18.jpg' },
  { id: 1, src: 'https://i.ibb.co/KcmJfL1n/Whats-App-Image-2025-10-25-at-16-40-16.jpg' },
  { id: 2, src: 'https://i.ibb.co/NgjfgHkc/Whats-App-Image-2025-10-25-at-16-40-17-1.jpg' },
  { id: 3, src: 'https://i.ibb.co/4gZrSHzK/Whats-App-Image-2025-10-25-at-16-40-17.jpg' },
  { id: 4, src: 'https://i.ibb.co/Y4gC9R3Q/Whats-App-Image-2025-10-25-at-16-40-18-1.jpg' },
  { id: 5, src: 'https://i.ibb.co/5XwtGY3v/Whats-App-Image-2025-10-25-at-16-40-18-2.jpg' },
  { id: 6, src: 'https://i.ibb.co/hxtqWnNq/Whats-App-Image-2025-10-25-at-16-40-19-4.jpg' },
  { id: 7, src: 'https://i.ibb.co/d4DR596B/Whats-App-Image-2025-10-25-at-16-40-18-4.jpg' },
  { id: 8, src: 'https://i.ibb.co/gZMBL05C/Whats-App-Image-2025-10-25-at-16-40-18-5.jpg' },
  { id: 9, src: 'https://i.ibb.co/tp1yRWNX/Whats-App-Image-2025-10-25-at-16-40-19-1.jpg' },
  { id: 10, src: 'https://i.ibb.co/GQyfN4LS/Whats-App-Image-2025-10-25-at-16-40-19-2.jpg' },
  { id: 11, src: 'https://i.ibb.co/fVr4nwTP/Whats-App-Image-2025-10-25-at-16-40-18-3.jpg' },
  { id: 12, src: 'https://i.ibb.co/XxTn4dsr/Whats-App-Image-2025-10-25-at-16-40-19-3.jpg' },
  { id: 13, src: 'https://i.ibb.co/hxztcMBq/Whats-App-Image-2025-10-25-at-16-40-19.jpg' }
];