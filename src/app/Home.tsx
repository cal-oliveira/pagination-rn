import { View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";

export function Home() {
  const database = useSQLiteContext();

  async function loadProducts() {
    try {
      const result = await database.getAllAsync(` 
            SELECT * FROM products
        `);

      console.log(result);
    } catch (error) {
      console.log("erro ao carregar produtos: ", error);
    } finally {
    }
  }

  useEffect(() => {
    loadProducts();
  });

  return <View></View>;
}
