import { type SQLiteDatabase } from "expo-sqlite";

export async function databaseInit(database: SQLiteDatabase) {
  //Verifica se a tabela ja existe
  const result = await database.getFirstAsync<Product>(`
        SELECT name 
        FROM sqlite_master 
        WHERE type='table' AND name='prodcts';
    `);
  //Cria a tabela se ela não existe
  if (!result) {
    await database.execAsync(`
        CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );
    `);
  }
}
