import { existsSync, readFileSync, writeFileSync } from "fs";

const DATA_FILE = "../../expenses.json";

export class Config {
  constructor() {
    this.EXPENSES_FILE = "../../expenses.json";
    this.CATEGORIES = [
      "Food",
      "Transportation",
      "Housing",
      "Utilities",
      "Entertainment",
      "Shopping",
      "Healthcare",
      "Education",
      "Travel",
      "Other",
    ];
  }

  loadExpenses() {
    try {
      const data = readFileSync(this.EXPENSES_FILE, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        writeFileSync(this.EXPENSES_FILE, JSON.stringify([], null, 2));
        return [];
      }

      console.error("Error loading expenses:", error);
      process.exit(1);
    }
  }

  saveExpenses(expenses) {
    writeFileSync(this.EXPENSES_FILE, JSON.stringify(expenses, null, 2));
  }

  generateId(expenses) {
    return expenses.length > 0 ? Math.max(...expenses.map((e) => e.id)) + 1 : 1;
  }

  info(message) {
    console.log(message);
  }

  getCategories() {
    return this.CATEGORIES;
  }

  isValidCategory(category) {
    return this.CATEGORIES.map((category) => category.toLowerCase()).includes(
      category.toLowerCase()
    );
  }
}
