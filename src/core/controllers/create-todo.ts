import { CreateTodo } from "../service";
import { Controller } from "./contracts";

export class CreateTodoController implements Controller {
  constructor(private readonly createTodo: CreateTodo) {}

  async execute(request: Controller.Request): Promise<Controller.Response> {
    try {
      const data = await this.createTodo.execute({
        title: request.body.title,
        description: request.body.description,
      });

      return { code: 200, data };
    } catch (error) {
      if (error instanceof Error) {
        if (!["DatabaseError"].includes(error.name)) {
          return { code: 400, data: error.message };
        }
      }

      return { code: 500, data: "internal error" };
    }
  }
}
