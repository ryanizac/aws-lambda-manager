import { MySQLAdapter, UUIDGenerator } from "../adapters";
import { CreateTodoController } from "../controllers";
import { SQLTodoRepository } from "../repository";
import { CreateTodo } from "../service";

export function makeCreateTodo() {
  const idGenerator = new UUIDGenerator();
  const mysqlRepository = new MySQLAdapter({
    host: process.env.host as string,
    port: Number(process.env.port as string),
    user: process.env.user as string,
    password: process.env.password as string,
  });
  const todoRepository = new SQLTodoRepository(mysqlRepository);
  const createTodoService = new CreateTodo(idGenerator, todoRepository);
  const createTodoController = new CreateTodoController(createTodoService);

  return createTodoController;
}
