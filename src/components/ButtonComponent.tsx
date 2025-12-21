import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonComponentProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export function ButtonComponent({
  title,
  onPress,
  disabled = false,
}: ButtonComponentProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 56,
    borderRadius: 4,
    backgroundColor: "#4e948f",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: 'Nunito_600SemiBold'
  },
});
