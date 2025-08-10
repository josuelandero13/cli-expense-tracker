import { existsSync, readFileSync, writeFileSync } from "fs";

const DATA_FILE = "../../expenses.json";

export class Config {
  loadExpenses() {
    console.log(existsSync(DATA_FILE))
    if (!existsSync(DATA_FILE)) return [];

    return JSON.parse(readFileSync(DATA_FILE));
  }

  saveExpenses(expenses) {
    writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2));
  }

  generateId(expenses) {
    return expenses.length > 0 ? Math.max(...expenses.map((e) => e.id)) + 1 : 1;
  }

  log(params) {
    console.log(...params);
  }
}

