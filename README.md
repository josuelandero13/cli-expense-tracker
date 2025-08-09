# 💰 Expense Tracker

Este es un proyecto de consola para gestionar tus gastos personales de manera sencilla y eficiente. Permite registrar, listar, y organizar tus gastos por categorías, todo almacenado en un archivo local.

## ✨ Características
- ➕ **Agregar** nuevos gastos con descripción, monto, fecha y categoría.
- 📋 **Listar** todos los gastos registrados.
- 🔍 **Filtrar** por categoría o fecha.
- 🗑️ **Eliminar** gastos por ID.
- 💾 **Persistencia** de datos en un archivo JSON.

## 📦 Instalación

1. 📥 **Clonar el repositorio** o descargar el código fuente:
   ```bash
   git clone https://github.com/josuelandero13/expense-tracker.git
   cd expense-tracker
   ```
2. ⚙️ **Instalar dependencias** usando [pnpm](https://pnpm.io/):
   ```bash
   pnpm install
   ```

## Uso

Ejecuta el archivo principal desde la terminal:

```bash
node src/index.js <comando> [opciones]
```

## Comandos Disponibles

- `add` o `agregar`: Agrega un nuevo gasto.
  - Opciones:
    - `--description` o `-d`: Descripción del gasto (requerido)
    - `--amount` o `-a`: Monto del gasto (requerido)
    - `--category` o `-c`: Categoría del gasto (requerido)

- `list` o `listar`: Muestra todos los gastos registrados.
  - Opciones:
    - `--category` o `-c`: Filtra por categoría
    - `--date` o `-f`: Filtra por fecha (YYYY-MM-DD)

- `remove` o `eliminar`: Elimina un gasto por su ID.
  - Opciones:
    - `--id` o `-i`: ID del gasto a eliminar (requerido)

- `help`: Muestra la ayuda de los comandos disponibles.

## Estructura del Proyecto

```
expense-tracker/
├── package.json
├── pnpm-lock.yaml
├── README.md
├── src/
│   ├── commandsFunctions.js
│   ├── expenses.json
│   ├── index.js
│   └── utils/
│       ├── config.js
│       └── ...
```

## 📚 Dependencias principales
- 📅 [dayjs](https://www.npmjs.com/package/dayjs) → Manejo de fechas.
- 🎨 [chalk](https://www.npmjs.com/package/chalk) → Colores en consola.
- 📦 [pnpm](https://pnpm.io/) → Gestión de paquetes.

## Notas
- Todos los datos se almacenan en `src/expenses.json`.
- Asegúrate de tener Node.js instalado.

---

¡Contribuciones y sugerencias son bienvenidas!
