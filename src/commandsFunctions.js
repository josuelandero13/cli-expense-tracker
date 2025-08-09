import { Config } from "./utils/config.js";
import dayjs from "dayjs";
import chalk from "chalk";

export class CommandsFunctions {
  constructor() {
    this.config = new Config();
    this.generateExpense = this.generateExpense.bind(this);
  }

  generateExpense(options) {
    const expenses = this.config.loadExpenses();
    const newExpense = {
      id: this.config.generateId(expenses),
      date: dayjs().format("YYYY-MM-DD"),
      description: options.description,
      amount: parseFloat(options.amount),
      category: options.category,
    };
    this.config.saveExpenses(expenses.concat(newExpense));
    console.log(
      chalk.green(`Expense added successfully (ID: ${newExpense.id})`)
    );
  }
}
