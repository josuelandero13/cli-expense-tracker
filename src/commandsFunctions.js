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
    this.config.log(
      chalk.green(`Expense added successfully (ID: ${newExpense.id})`)
    );
  }

  listToExpenses(options) {
    let expenses = this.config.loadExpenses();

    if (options.category) {
      expenses = expenses.filter(
        (expense) =>
          expense.category.toLowerCase() === options.category.toLowerCase()
      );
    }

    if (expenses.length === 0) {
      console.log(chalk.yellow("No expenses found."));
      return;
    }

    console.log(
      chalk.cyan("# ID  Date       Description       Amount    Category")
    );

    expenses.forEach((expense) => {
      console.log(
        `${expense.id}   ${expense.date}  ${expense.description}  $${expense.amount}    ${expense.category}`
      );
    });
  }

  deleteExpense(options) {
    let expenses = this.config.loadExpenses();
    const id = parseInt(options.id);
    const index = expenses.findIndex((expense) => expense.id === id);

    if (index === -1) {
      console.log(chalk.red("Expense not found"));
      return;
    }

    expenses.splice(index, 1);
    this.config.saveExpenses(expenses);
    console.log(chalk.green("Expense deleted successfully"));
  }

  updateExpense(options) {
    let expenses = this.config.loadExpenses();
    const expense = expenses.find((e) => e.id === parseInt(options.id));

    if (!expense) {
      console.log(chalk.red("Expense not found."));
      return;
    }

    if (options.description) expense.description = options.description;

    if (options.amount) expense.amount = parseFloat(options.amount);

    if (options.category) expense.category = options.category;

    this.config.saveExpenses(expenses);
    console.log(chalk.green("Expense updated successfully"));
  }

  getExpensesSummary(options) {
    let expenses = this.config.loadExpenses();

    if (options.month) {
      expenses = expenses.filter(
        (e) => dayjs(e.date).month() + 1 === parseInt(options.month)
      );
      const total = expenses.reduce((sum, e) => sum + e.amount, 0);
      console.log(
        chalk.blue(`Total expenses for month ${options.month}: $${total}`)
      );
    } else {
      const total = expenses.reduce((sum, e) => sum + e.amount, 0);
      console.log(chalk.blue(`Total expenses: $${total}`));
    }
  }
}
