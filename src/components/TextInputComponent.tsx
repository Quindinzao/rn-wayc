import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface TextInputComponentProps extends TextInputProps {
  label?: string;
  error?: string | null;
}

export function TextInputComponent({
  label,
  error,
  ...props
}: TextInputComponentProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        {...props}
        style={[
          styles.input,
          error && styles.inputError,
        ]}
        placeholderTextColor="#9CA3AF"
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
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
    fontFamily: 'Nunito_400Regular'
  },
  input: {
    height: 56,
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#cfcfcf',
    backgroundColor: '#212121',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    fontFamily: 'Nunito_400Regular'
  },
  inputError: {
    borderColor: '#b91c1c',
    fontFamily: 'Nunito_400Regular'
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#fca5a5',
    fontFamily: 'Nunito_400Regular'
  },
});
