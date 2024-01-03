import { StyleSheet, View, LogBox } from 'react-native';
import Otp from './src';

export default function App() {
  //console.disableYellowBox = true;
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();

  return (
    <View style={styles.container}>
      <Otp></Otp>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
