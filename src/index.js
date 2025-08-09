import { program } from "commander";
import dayjs from "dayjs";
import chalk from "chalk";
import { CommandsFunctions } from "./commandsFunctions.js";

const commandsFunctions = new CommandsFunctions();

program
  .command("add")
  .description("Agregar un nuevo gasto")
  .requiredOption("--description <desc>", "Descripción del gasto")
  .requiredOption("--amount <amount>", "Monto del gasto")
  .option("--category <category>", "Categoría del gasto", "General")
  .action((options) => {
    commandsFunctions.generateExpense(options);
  });

program
  .command("list")
  .description("Listar todos los gastos")
  .option("--category <category>", "Filtrar por categoría")
  .action((options) => {
    let expenses = loadExpenses();
    if (options.category) {
      expenses = expenses.filter(
        (e) => e.category.toLowerCase() === options.category.toLowerCase()
      );
    }
    if (expenses.length === 0) {
      console.log(yellow("No expenses found."));
      return;
    }
    console.log(chalk.cyan("# ID  Date       Description       Amount    Category"));
    expenses.forEach((e) => {
      console.log(
        `${e.id}   ${e.date}  ${e.description}  $${e.amount}    ${e.category}`
      );
    });
  });

// Comando: Eliminar gasto
program
  .command("delete")
  .description("Eliminar un gasto")
  .requiredOption("--id <id>", "ID del gasto a eliminar")
  .action((options) => {
    let expenses = loadExpenses();
    const id = parseInt(options.id);
    const index = expenses.findIndex((e) => e.id === id);
    if (index === -1) {
      console.log(chalk.red("Expense not found"));
      return;
    }
    expenses.splice(index, 1);
    saveExpenses(expenses);
    console.log(chalk.green("Expense deleted successfully"));
  });

// Comando: Actualizar gasto
program
  .command("update")
  .description("Actualizar un gasto existente")
  .requiredOption("--id <id>", "ID del gasto")
  .option("--description <desc>", "Nueva descripción")
  .option("--amount <amount>", "Nuevo monto")
  .option("--category <category>", "Nueva categoría")
  .action((options) => {
    let expenses = loadExpenses();
    const expense = expenses.find((e) => e.id === parseInt(options.id));
    if (!expense) {
      console.log(chalk.red("Expense not found."));
      return;
    }
    if (options.description) expense.description = options.description;
    if (options.amount) expense.amount = parseFloat(options.amount);
    if (options.category) expense.category = options.category;
    saveExpenses(expenses);
    console.log(chalk.green("Expense updated successfully"));
  });

// Comando: Resumen
program
  .command("summary")
  .description("Mostrar resumen de gastos")
  .option("--month <month>", "Mes específico (1-12)")
  .action((options) => {
    let expenses = loadExpenses();
    if (options.month) {
      expenses = expenses.filter(
        (e) => dayjs(e.date).month() + 1 === parseInt(options.month)
      );
      const total = expenses.reduce((sum, e) => sum + e.amount, 0);
      console.log(chalk.blue(`Total expenses for month ${options.month}: $${total}`));
    } else {
      const total = expenses.reduce((sum, e) => sum + e.amount, 0);
      console.log(chalk.blue(`Total expenses: $${total}`));
    }
  });

program.parse(process.argv);
