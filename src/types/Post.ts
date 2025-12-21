
export interface CreatePostPayload {
  title: string;
  description?: string;
  image_base64?: string;
  latitude: number;
  longitude: number;
  accuracy_m?: number;
  device_timestamp: string;
}

export interface Post {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  latitude: number;
  longitude: number;
  accuracy_m: number | null;
  created_at: string;
  device_timestamp: string;
}