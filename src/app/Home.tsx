import { FlatList, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const database = useSQLiteContext();

  async function loadProducts() {
    try {
      const result = await database.getAllAsync<Product>(` 
            SELECT * FROM products
        `);

      setProducts(result);
    } catch (error) {
      console.log("erro ao carregar produtos: ", error);
    } finally {
    }
  }

  useEffect(() => {
    loadProducts();
  });

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card product={item} />}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 62,
          gap: 16,
        }}
      />
    </View>
  );
}
