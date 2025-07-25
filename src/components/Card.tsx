import { Text, View } from "react-native";

export function Card({ product }: { product: Product }) {
  return (
    <View
      style={{
        padding: 16,
        borderRadius: 10,
        backgroundColor: "#CECECE",
        gap: 12,
      }}
    >
      <Text>{product.id}</Text>
      <Text>{product.name}</Text>
    </View>
  );
}
