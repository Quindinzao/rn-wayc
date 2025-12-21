import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from '@/screens/FeedScreen';
import CreatePostScreen from '@/screens/CreatePostScreen';
import PostDetailScreen from '@/screens/PostDetailScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{ title: 'Detalhes' }}
      />
    </Stack.Navigator>
  );
}
