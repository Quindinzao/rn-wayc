import { useState } from 'react';
import { Text, StyleSheet, View, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

import { ButtonComponent } from '@/components/ButtonComponent';
import { TextInputComponent } from '@/components/TextInputComponent';
import { showErrorToast } from '@/utils/toast';
import postService from '@/services/postService';

export default function CreatePostScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function pickImageFromGallery() {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      showErrorToast('Permissão de galeria negada');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageBase64(result.assets[0].base64 ?? null);
    }
  }

  async function takePhotoWithCamera() {
    const { status } =
      await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      showErrorToast('Permissão de câmera negada');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageBase64(result.assets[0].base64 ?? null);
    }
  }

  async function handleCreatePost() {
    if (!title.trim()) {
      showErrorToast('Título é obrigatório');
      return;
    }

    if (!imageBase64) {
      showErrorToast('Selecione ou tire uma foto');
      return;
    }

    setLoading(true);

    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        showErrorToast('Permissão de localização negada');
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      await postService.create({
        title,
        description,
        image_base64: imageBase64,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy_m: location.coords.accuracy ?? undefined,
        device_timestamp: new Date(
          location.timestamp
        ).toISOString(),
      });

      setTitle('');
      setDescription('');
      setImageBase64(null);

      Alert.alert('Sucesso', 'Postagem criada com sucesso');
    } catch (error: any) {
      showErrorToast(
        error?.description || 'Erro ao criar postagem'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicione uma publicação</Text>
      <TextInputComponent
        label="Título"
        value={title}
        onChangeText={setTitle}
        placeholder="Ex: Refatorando um hook"
      />

      <TextInputComponent
        label="Descrição"
        value={description}
        onChangeText={setDescription}
        placeholder="O que você está codando?"
        multiline
        style={{ height: 100 }}
      />

      <ButtonComponent
        title="Selecionar da galeria"
        onPress={pickImageFromGallery}
      />

      <ButtonComponent
        title="Tirar foto"
        onPress={takePhotoWithCamera}
      />

      {imageBase64 && (
        <Image
          source={{
            uri: `data:image/jpeg;base64,${imageBase64}`,
          }}
          style={styles.image}
        />
      )}

      <ButtonComponent
        title={loading ? 'Publicando...' : 'Publicar'}
        onPress={handleCreatePost}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#1b1b1b',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Nunito_700Bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    marginVertical: 12,
  },
});
