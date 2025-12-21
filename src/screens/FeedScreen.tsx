import { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LogOut } from 'lucide-react-native';

import postService from '@/services/postService';
import { Post } from '@/types/Post';
import PostCardComponent from '@/components/PostCardComponent';
import EmptyComponent from '@/components/EmptyComponent';
import PostCardSkeletonComponent from '@/components/PostCardSkeletonComponent';
import CircleButtonComponent from '@/components/CircleButtonComponent';
import { useAuth } from '@/contexts/AuthContext';

export default function FeedScreen() {
  const navigation = useNavigation<any>();
  const { signOut } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  async function loadPosts(
    pageToLoad: number,
    options?: { refresh?: boolean }
  ) {
    try {
      if (pageToLoad === 1 && !options?.refresh) {
        setLoading(true);
      }

      const data = await postService.getAll(pageToLoad);

      if (pageToLoad === 1) {
        setPosts(data);
      } else {
        setPosts((prev) => [...prev, ...data]);
      }

      setHasMore(data.length > 0);
      setError(null);
    } catch {
      setError('Erro ao carregar postagens');
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadPosts(1);
  }, []);

  function onRefresh() {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    loadPosts(1, { refresh: true });
  }

  function loadMore() {
    if (loadingMore || loading || refreshing || !hasMore) return;

    const nextPage = page + 1;
    setLoadingMore(true);
    setPage(nextPage);
    loadPosts(nextPage);
  }

  function renderFooter() {
    if (!loadingMore) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="small" color="#4e948f" />
      </View>
    );
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
        contentContainerStyle={{ paddingBottom: 80 }}
        ListEmptyComponent={() => <EmptyComponent />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
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
      <View style={styles.header}>
        <Text style={styles.title}>Publicações</Text>

        <TouchableOpacity
          onPress={signOut}
          activeOpacity={0.7}
          style={styles.logoutButton}
        >
          <LogOut size={22} color="#ff6b6b" />
        </TouchableOpacity>
      </View>

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Nunito_700Bold',
  },
  logoutButton: {
    padding: 6,
  },
  error: {
    color: '#ff6b6b',
    textAlign: 'center',
    marginTop: 40,
  },
});
