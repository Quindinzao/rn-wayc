import { useFonts as useExpoFonts } from 'expo-font';
import {
  Nunito_400Regular,
  Nunito_700Bold,
  Nunito_600SemiBold,
} from '@expo-google-fonts/nunito';

export function useFonts() {
  const [loaded] = useExpoFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  return loaded;
}
