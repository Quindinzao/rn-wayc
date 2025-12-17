// components/TextInputComponent.tsx
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface TextInputComponentProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export function TextInputComponent({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  autoCapitalize = 'none',
}: TextInputComponentProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 12,
  },
  label: {
    marginBottom: 2,
    fontSize: 14,
    color: '#dfdfdf',
  },
  input: {
    height: 56,
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#cfcfcf',
    backgroundColor: '#212121',
  },
});
