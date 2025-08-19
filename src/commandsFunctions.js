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

    if (!this.config.isValidCategory(options.category)) {
      this.config.info(
        chalk.yellow(
          `Warning: '${options.category}' is not a predefined category. Using 'Other'.`
        )
      );
      options.category = "Other";
    }

    const newExpense = {
      id: this.config.generateId(expenses),
      date: dayjs().format("YYYY-MM-DD"),
      description: options.description,
      amount: parseFloat(options.amount),
      category: options.category,
    };

    this.config.saveExpenses(expenses.concat(newExpense));
    this.config.info(
      chalk.green(`Expense added successfully (ID: ${newExpense.id})`)
    );

    this.config.info(
      chalk.blue(
        `Available categories: ${this.config.getCategories().join(", ")}`
      )
    );
  }

  listToExpenses(options) {
    let expenses = this.config.loadExpenses();

    if (options.category) {
      if (!this.config.isValidCategory(options.category)) {
        this.config.info(
          chalk.yellow(`'${options.category}' is not a valid category.`)
        );
        this.config.info(
          chalk.blue(
            `Available categories: ${this.config.getCategories().join(", ")}`
          )
        );
        return;
      }

      expenses = expenses.filter(
        (expense) =>
          expense.category.toLowerCase() === options.category.toLowerCase()
      );
    }

    if (expenses.length === 0) {
      const categoryMsg = options.category
        ? ` in category '${options.category}'`
        : "";
      this.config.info(chalk.yellow(`No expenses found${categoryMsg}.`));
      return;
    }

    const groupedExpenses = {};
    expenses.forEach((expense) => {
      if (!groupedExpenses[expense.category]) {
        groupedExpenses[expense.category] = [];
      }
      groupedExpenses[expense.category].push(expense);
    });

    Object.entries(groupedExpenses).forEach(([category, categoryExpenses]) => {
      this.config.info(chalk.cyan(`\n=== ${category} ===`));
      this.config.info(chalk.cyan("ID  Date       Description       Amount"));

      categoryExpenses.forEach((expense) => {
        this.config.info(
          `${expense.id.toString().padEnd(3)} ${
            expense.date
          }  ${expense.description.padEnd(18)} $${expense.amount.toFixed(2)}`
        );
      });

      const categoryTotal = categoryExpenses.reduce(
        (sum, e) => sum + e.amount,
        0
      );
      this.config.info(chalk.cyan(`Total: $${categoryTotal.toFixed(2)}`));
    });
  }

  deleteExpense(options) {
    let expenses = this.config.loadExpenses();
    const id = parseInt(options.id);
    const index = expenses.findIndex((expense) => expense.id === id);

    if (index === -1) {
      this.config.info(chalk.red("Expense not found"));
      return;
    }

    expenses.splice(index, 1);
    this.config.saveExpenses(expenses);
    this.config.info(chalk.green("Expense deleted successfully"));
  }

  updateExpense(options) {
    let expenses = this.config.loadExpenses();
    const expense = expenses.find((e) => e.id === parseInt(options.id));

    if (!expense) {
      this.config.info(chalk.red("Expense not found."));
      return;
    }

    if (options.description) expense.description = options.description;
    if (options.amount) expense.amount = parseFloat(options.amount);

    if (options.category) {
      if (!this.config.isValidCategory(options.category)) {
        this.config.info(
          chalk.yellow(
            `'${options.category}' is not a valid category. Keeping previous category '${expense.category}'.`
          )
        );
        this.config.log(
          chalk.blue(
            `Available categories: ${this.config.getCategories().join(", ")}`
          )
        );
      } else {
        expense.category = options.category;
      }
    }

    this.config.saveExpenses(expenses);
    this.config.info(chalk.green("Expense updated successfully"));
  }

  getExpensesSummary(options) {
    let expenses = this.config.loadExpenses();

    if (options.month) {
      expenses = expenses.filter(
        (e) => dayjs(e.date).month() + 1 === parseInt(options.month)
      );
      this.config.info(
        chalk.cyan(`\n=== Expenses Summary for Month ${options.month} ===`)
      );
    } else {
      this.config.info(chalk.cyan("\n=== Expenses Summary ==="));
    }

    const summary = {};
    expenses.forEach((expense) => {
      if (!summary[expense.category]) {
        summary[expense.category] = 0;
      }
      summary[expense.category] += expense.amount;
    });

    let grandTotal = 0;
    Object.entries(summary)
      .sort((a, b) => b[1] - a[1])
      .forEach(([category, total]) => {
        this.config.info(`${category.padEnd(15)}: $${total.toFixed(2)}`);
        grandTotal += total;
      });

    this.config.info(chalk.green(`\nTotal: $${grandTotal.toFixed(2)}`));
  }
}
