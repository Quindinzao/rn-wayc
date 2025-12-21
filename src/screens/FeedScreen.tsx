import { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
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
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadPosts(showLoader = true) {
    try {
      if (showLoader) setLoading(true);

      const data = await postService.getAll(1);
      setPosts(data);
      setError(null);
    } catch (err: any) {
      setError('Erro ao carregar postagens');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function onRefresh() {
    setRefreshing(true);
    loadPosts(false);
  }

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
        renderItem={({ item }) => <PostCardComponent item={item} />}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListEmptyComponent={() => <EmptyComponent />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
            colors={['#4e948f']}
          />
        }
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Feed</Text>

      {renderContent()}

      <CircleButtonComponent
        onPress={() => navigation.navigate('CreatePost')}
      />
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
    fontFamily: 'Nunito_700Bold',
  },
  error: {
    color: '#ff6b6b',
    textAlign: 'center',
    marginTop: 40,
  },
});
