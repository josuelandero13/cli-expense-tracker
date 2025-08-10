import { program } from "commander";
import { CommandsFunctions } from "./commandsFunctions.js";

const commandsFunctions = new CommandsFunctions();

program
  .command("add")
  .description("Agregar un nuevo gasto")
  .requiredOption("--description <desc>", "Descripción del gasto")
  .requiredOption("--amount <amount>", "Monto del gasto")
  .option("--category <category>", "Categoría del gasto", "General")
  .action((options) => commandsFunctions.generateExpense(options));

program
  .command("list")
  .description("Listar todos los gastos")
  .option("--category <category>", "Filtrar por categoría")
  .action((options) => commandsFunctions.listToExpenses(options));

program
  .command("delete")
  .description("Eliminar un gasto")
  .requiredOption("--id <id>", "ID del gasto a eliminar")
  .action((options) => commandsFunctions.deleteExpense(options));

program
  .command("update")
  .description("Actualizar un gasto existente")
  .requiredOption("--id <id>", "ID del gasto")
  .option("--description <desc>", "Nueva descripción")
  .option("--amount <amount>", "Nuevo monto")
  .option("--category <category>", "Nueva categoría")
  .action((options) => commandsFunctions.updateExpense(options));

program
  .command("summary")
  .description("Mostrar resumen de gastos")
  .option("--month <month>", "Mes específico (1-12)")
  .action((options) => commandsFunctions.getExpensesSummary(options));

program.parse(process.argv);
