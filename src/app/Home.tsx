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
        data={products} // array de produtos que serão passados para o componente                      *
        keyExtractor={(item) => item.id.toString()} // key para cada item da lista                     *
        renderItem={({ item }) => <Card product={item} />} // componente usado para cada item da lista *
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 62,
          gap: 16,
        }}
      />
    </View>
  );
}
