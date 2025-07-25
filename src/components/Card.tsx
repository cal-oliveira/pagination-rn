import { Text, View } from "react-native";

export function Card({ id, name }: Product) {
  return (
    <View
      style={{
        padding: 16,
        borderRadius: 10,
        backgroundColor: "#CECECE",
        gap: 12,
      }}
    >
      <Text>{id}</Text>
      <Text>{name}</Text>
    </View>
  );
}
