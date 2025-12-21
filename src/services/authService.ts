/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/services/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthResponse {
  user: any;
  session: any;
}

const authService = {
  async loginWithEmail(
    email: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.session || !data.user) {
        throw error;
      }

      await AsyncStorage.setItem(
        'supabaseSession',
        JSON.stringify(data.session)
      );

      return {
        user: data.user,
        session: data.session,
      };
    } catch (error: any) {
      throw {
        title: 'Erro ao entrar na sua conta',
        description:
          error?.message || 'Erro no servidor, tente novamente mais tarde',
      };
    }
  },

  async registerWithEmail(
    email: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      return {
        user: data.user,
        session: data.session,
      };
    } catch (error: any) {
      throw {
        title: 'Erro ao criar conta',
        description:
          error?.message || 'Erro no servidor, tente novamente mais tarde',
      };
    }
  },

  async logout() {
    try {
      await supabase.auth.signOut();
      await AsyncStorage.removeItem('supabaseSession');
    } catch (error: any) {
      throw {
        title: 'Erro ao sair',
        description:
          error?.message || 'Erro no servidor, tente novamente mais tarde',
      };
    }
  },
};

export default authService;
