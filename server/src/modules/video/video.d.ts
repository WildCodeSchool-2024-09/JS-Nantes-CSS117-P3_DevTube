export type Video = {
  name: string;
  duration: number;
  thumbnail: string;
  preview_image: string;
  description: string;
  category_id: number;
  is_freemium: 0 | 1;
  added_date: string;
  is_heroSlide: 0 | 1;
  is_popular: 0 | 1;
};
