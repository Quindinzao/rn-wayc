import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface CircleButtonComponentProps {
  onPress: () => void;
}
export default function CircleButtonComponent({
  onPress
} : CircleButtonComponentProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.fab}
      onPress={onPress}
    >
      <Text style={styles.fabText}>＋</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4e948f',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 36,
    fontFamily: 'Nunito_600SemiBold'
  },
});
