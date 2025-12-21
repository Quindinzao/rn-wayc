import { supabase } from '@/services/supabase';
import { CreatePostPayload, Post } from '@/types/Post';

const PAGE_SIZE = 10;

const postService = {
  // CREATE
  async create(payload: CreatePostPayload): Promise<Post> {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw {
        title: 'Não autenticado',
        description: 'Você precisa estar logado para criar um post',
      };
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({
        user_id: user.id,
        title: payload.title,
        description: payload.description,
        image_url: payload.image_base64 ?? null,
        latitude: payload.latitude,
        longitude: payload.longitude,
        accuracy_m: payload.accuracy_m ?? null,
        device_timestamp: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw {
        title: 'Erro ao criar post',
        description: error.message,
      };
    }

    return data;
  },

  // LIST (paginação)
  async getAll(page = 1): Promise<Post[]> {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      throw {
        title: 'Erro ao buscar posts',
        description: error.message,
      };
    }

    return data ?? [];
  },

  // GET BY ID
  async getById(id: string): Promise<Post> {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw {
        title: 'Post não encontrado',
        description: error.message,
      };
    }

    return data;
  },
};

export default postService;
