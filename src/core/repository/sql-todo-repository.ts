import { TodoRepository } from "../service";
import { Repository } from "./contracts";

export class SQLTodoRepository implements TodoRepository {
  constructor(private readonly repository: Repository) {}

  async create(args: TodoRepository.CreateArgs) {
    await this.repository.query(
      `INSERT INTO todo_db.todo(id, title, description, finished) VALUES (?, ?, ?, ?)`,
      [args.id, args.title, args.description, args.finished],
    );
  }
}
