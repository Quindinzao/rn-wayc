import { StyleSheet, Text, View } from "react-native";

export default function EmptyComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nenhum item encontrado 📭</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});