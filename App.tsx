import { Home } from "./src/app/Home";
import { Loading } from "./src/components/Loading";
import { Suspense } from "react";
import { databaseInit } from "./src/database/databaseInit";
import { SQLiteProvider } from "expo-sqlite";

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <SQLiteProvider databaseName="myapp.db" onInit={databaseInit} useSuspense>
        <Home />
      </SQLiteProvider>
    </Suspense>
  );
}
