import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

interface ErrorComponentProps {
  error: string | null;
  duration?: number; // ms
}

export function ErrorComponent({
  error,
  duration = 3000,
}: ErrorComponentProps) {
  const [visible, setVisible] = useState(false);
  const translateY = new Animated.Value(100);

  useEffect(() => {
    if (!error) return;

    setVisible(true);

    Animated.timing(translateY, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(translateY, {
        toValue: 100,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }, duration);

    return () => clearTimeout(timer);
  }, [error]);

  if (!visible || !error) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY }] },
      ]}
    >
      <Text style={styles.title}>Erro</Text>
      <Text style={styles.description}>{error}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: "#360000",
    borderColor: "#701212",
    borderWidth: 1,
    padding: 14,
    borderRadius: 8,
    zIndex: 999,
  },
  title: {
    color: "#eacaca",
    fontWeight: "700",
    marginBottom: 4,
  },
  description: {
    color: "#f1c1c1",
    fontSize: 14,
  },
});
