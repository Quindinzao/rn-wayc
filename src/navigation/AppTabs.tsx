import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from '@/screens/FeedScreen';
import AddPhotoScreen from '@/screens/AddPhotosScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="AddPhoto" component={AddPhotoScreen} />
    </Stack.Navigator>
  );
}
