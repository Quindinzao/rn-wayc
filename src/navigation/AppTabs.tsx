import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '@/screens/FeedScreen';
import AddPhotoScreen from '@/screens/AddPhotosScreen';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="AddPhoto" component={AddPhotoScreen} />
    </Tab.Navigator>
  );
}
