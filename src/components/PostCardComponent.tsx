import { useBase64Image } from "@/hooks/useBase64Image";
import { Post } from "@/types/Post";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function PostCardComponent({ item }: { item: Post }) {
  const { resolveBase64Image } = useBase64Image();
  const imageUri = resolveBase64Image(item.image_url);

  return (
    <TouchableOpacity style={styles.card}>
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#000',
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
});
