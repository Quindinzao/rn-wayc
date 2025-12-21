import { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import postService from '@/services/postService';
import { Post } from '@/types/Post';
import PostCardComponent from '@/components/PostCardComponent';
import EmptyComponent from '@/components/EmptyComponent';
import PostCardSkeletonComponent from '@/components/PostCardSkeletonComponent';
import CircleButtonComponent from '@/components/CircleButtonComponent';

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

  function renderContent() {
    if (loading) {
      return (
        <>
          <PostCardSkeletonComponent />
          <PostCardSkeletonComponent />
          <PostCardSkeletonComponent />
        </>
      );
    }

    if (error) {
      return <Text style={styles.error}>{error}</Text>;
    }

    return (
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={(e) => <PostCardComponent item={e.item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => <EmptyComponent />}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Feed</Text>
      {renderContent()}

      <CircleButtonComponent onPress={() => navigation.navigate("CreatePost")} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 12,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    paddingTop: 40,
    paddingBottom: 12,
    fontFamily: 'Nunito_700Bold'
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
});
