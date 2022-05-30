import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/common/Card';

const Tab = createBottomTabNavigator();

export function HomePage() {
  return (
    <View>
      <Card />
    </View>
  );
}
