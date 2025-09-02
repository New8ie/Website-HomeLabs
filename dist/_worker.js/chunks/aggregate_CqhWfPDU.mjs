globalThis.process ??= {}; globalThis.process.env ??= {};
import { s as sql } from './db_C7UxkbIP.mjs';

function count(expression) {
  return sql`count(${sql.raw("*")})`.mapWith(Number);
}

export { count as c };
