import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '@/contexts/AuthContext';
import AuthStack from '@/navigation/AuthStack';
import AppTabs from '@/navigation/AppTabs';

export default function RootNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}