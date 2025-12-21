import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { StyleSheet } from 'react-native';

export default function PostCardSkeletonComponent() {
  return (
    <SkeletonPlaceholder
      backgroundColor="#1e1e1e"
      highlightColor="#2a2a2a"
    >
      <SkeletonPlaceholder.Item style={styles.card}>
        {/* Imagem */}
        <SkeletonPlaceholder.Item
          width="100%"
          height={200}
          borderRadius={6}
        />

        {/* Título */}
        <SkeletonPlaceholder.Item
          marginTop={10}
          width="70%"
          height={20}
          borderRadius={4}
        />

        {/* Descrição */}
        <SkeletonPlaceholder.Item
          marginTop={6}
          width="100%"
          height={14}
          borderRadius={4}
        />
        <SkeletonPlaceholder.Item
          marginTop={4}
          width="90%"
          height={14}
          borderRadius={4}
        />

        {/* Meta */}
        <SkeletonPlaceholder.Item
          marginTop={8}
          width="60%"
          height={12}
          borderRadius={4}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
});
