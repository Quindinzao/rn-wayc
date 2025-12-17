import { ButtonComponent } from '@/components/ButtonComponent';
import { ErrorComponent } from '@/components/ErrorComponent';
import { TextInputComponent } from '@/components/TextInputComponent';
import { useAuth } from '@/contexts/AuthContext';
import { loginSchema } from '@/utils/validators/auth';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function AuthScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    try {
      await signIn(email, password);
      setError(null);
    } catch (err: any) {
      console.log(err);
      setError(err?.description || "Erro ao autenticar");
    }
  }

  return (
    <View style={styles.container}>
      <TextInputComponent
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="email@exemplo.com"
      />

      <TextInputComponent
        label="Senha"
        value={password}
        onChangeText={setPassword}
        placeholder="********"
        secureTextEntry
      />

      <ButtonComponent
        title="Entrar"
        onPress={handleLogin}
      />

      <ErrorComponent error={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#1b1b1b',
  },
});
