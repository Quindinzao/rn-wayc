import { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import postService from '@/services/postService';
import { Post } from '@/types/Post';

export default function FeedScreen() {
  const navigation = useNavigation<any>();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadPosts() {
    try {
      setLoading(true);
      const data = await postService.getAll(1);
      setPosts(data);
      setError(null);
    } catch (err: any) {
      setError('Erro ao carregar postagens');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function resolveBase64Image(base64?: string | null) {
    if (!base64) return null;

    if (base64.startsWith('data:image')) {
      return base64;
    }

    return `data:image/jpeg;base64,${base64}`;
  }

  function renderItem({ item }: { item: Post }) {
    const imageUri = resolveBase64Image(item.image_url);

    return (
      <View style={styles.card}>
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        <Text style={styles.title}>{item.title}</Text>

        {item.description && (
          <Text style={styles.description}>{item.description}</Text>
        )}

        <Text style={styles.meta}>
          Lat: {item.latitude.toFixed(4)} | Lng:{' '}
          {item.longitude.toFixed(4)}
        </Text>
      </View>
    );
  }

  function renderContent() {
    if (loading) {
      return <Text style={styles.info}>Carregando...</Text>;
    }

    if (error) {
      return <Text style={styles.error}>{error}</Text>;
    }

    if (posts.length === 0) {
      return (
        <Text style={styles.info}>
          Nenhuma postagem encontrada 📭
        </Text>
      );
    }

    return (
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    );
  }

  return (
    <View style={styles.container}>
      {renderContent()}

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePost')}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 12,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#000',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    color: '#cfcfcf',
    marginTop: 4,
  },
  meta: {
    marginTop: 6,
    fontSize: 12,
    color: '#9ca3af',
  },
  info: {
    color: '#cfcfcf',
    textAlign: 'center',
    marginTop: 40,
  },
  error: {
    color: '#ff6b6b',
    textAlign: 'center',
    marginTop: 40,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4f46e5',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    lineHeight: 36,
  },
});
