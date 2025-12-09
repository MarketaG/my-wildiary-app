export type Observation = {
  _id: string;
  title: string;
  description: string;
  habitat?: string;
  weather?: string;
  created_at: string;
  image_url?: string;
  animal?: {
    _id: string;
    commonName: string;
    species: string;
  };
  user?: {
    _id: string;
    name: string;
  };
};
