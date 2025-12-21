import { ButtonComponent } from '@/components/ButtonComponent';
import { TextInputComponent } from '@/components/TextInputComponent';
import { useAuth } from '@/contexts/AuthContext';
import { loginSchema } from '@/utils/validators/auth';
import { showErrorToast } from '@/utils/toast';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AuthScreen() {
  const { signIn, signUp } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  function validateForm() {
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;

      setEmailError(errors.email?.[0] ?? null);
      setPasswordError(errors.password?.[0] ?? null);

      showErrorToast('Verifique os campos');
      return false;
    }

    setEmailError(null);
    setPasswordError(null);
    return true;
  }

  async function handleLogin() {
    if (!validateForm()) return;

    try {
      await signIn(email, password);
    } catch (err: any) {
      showErrorToast(err?.description || 'Erro ao autenticar');
    }
  }

  async function handleRegister() {
    if (!validateForm()) return;

    try {
      await signUp(email, password);
      showErrorToast('Conta criada com sucesso');
    } catch (err: any) {
      showErrorToast(err?.description || 'Erro ao criar conta');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WAYC</Text>
      <TextInputComponent
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="email@exemplo.com"
        keyboardType="email-address"
        error={emailError}
      />

      <TextInputComponent
        label="Senha"
        value={password}
        onChangeText={setPassword}
        placeholder="********"
        secureTextEntry
        error={passwordError}
      />

      <ButtonComponent
        title="Entrar"
        onPress={handleLogin}
      />

      <ButtonComponent
        title="Criar conta"
        onPress={handleRegister}
      />
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
  title: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Nunito_700Bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});
