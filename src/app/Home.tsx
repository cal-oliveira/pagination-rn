import { FlatList, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Loading } from "../components/Loading";

const ITEMS_PER_PAGE = 10;

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const database = useSQLiteContext();

  async function loadProducts() {
    if (isLoading) return;

    try {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const result = await database.getAllAsync<Product>(
        ` 
            SELECT id, name FROM products LIMIT ? OFFSET ?
        `,
        [ITEMS_PER_PAGE, products.length]
      );

      if (result.length === 0) {
        setHasMore(false);
        return;
      }

      setProducts((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const newItems = result.filter((p) => !existingIds.has(p.id));

        return [...prev, ...newItems];
      }); // products recebe tudo que ja havia antes + tudo que ha em result
    } catch (error) {
      console.log("erro ao carregar produtos: ", error);
    } finally {
      setIsLoading(false);
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
        onEndReached={() => {
          // quando chega ai final da lista executa o codigo que esta aqui dentro
          if (!isLoading && hasMore) {
            loadProducts();
          }
        }}
        onEndReachedThreshold={0.2} // Quando faltar 20% pro final da lista ele carrega novos dados
        ListFooterComponent={() => (isLoading ? <Loading /> : null)} // Footer enquanto mais dados são carregados
      />
    </View>
  );
}
