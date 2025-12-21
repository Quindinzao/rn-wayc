import { RouteProp, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useBase64Image } from '@/hooks/useBase64Image';
import { Post } from '@/types/Post';

type RouteParams = {
  PostDetail: {
    post: Post;
  };
};

export default function PostDetailScreen() {
  const route = useRoute<RouteProp<RouteParams, 'PostDetail'>>();
  const { post } = route.params;

  const { resolveBase64Image } = useBase64Image();
  const imageUri = resolveBase64Image(post.image_url);

  return (
    <ScrollView style={styles.container}>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{post.title}</Text>

        {post.description && (
          <Text style={styles.description}>{post.description}</Text>
        )}

        <Text style={styles.meta}>
          Latitude: {post.latitude.toFixed(6)}
        </Text>
        <Text style={styles.meta}>
          Longitude: {post.longitude.toFixed(6)}
        </Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: post.latitude,
            longitude: post.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: post.latitude,
              longitude: post.longitude,
            }}
            title={post.title}
            description={post.description || 'Local do post'}
          />
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  image: {
    width: '100%',
    height: 240,
    backgroundColor: '#000',
  },
  content: {
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    color: '#cfcfcf',
    fontSize: 16,
    marginBottom: 12,
  },
  meta: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 2,
  },
  mapContainer: {
    height: 300,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
});
