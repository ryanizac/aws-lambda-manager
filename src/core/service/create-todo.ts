import { ToDo } from "../model";
import { IdGenerator, TodoRepository } from "./ports";

export class CreateTodo {
  constructor(
    private idGenerator: IdGenerator,
    private todoRepository: TodoRepository,
  ) {}

  private validateTitle(value: any): string {
    if (typeof value !== "string") {
      throw new Error("The title of todo must be a string");
    }

    const title = value.replace(/ {2,}/g, " ").trim();

    if (title.length < 4) {
      throw new Error("The title must be at least 4 letters");
    }

    if (title.length > 50) {
      throw new Error("The title must have a maximum of 50 letters");
    }

    return title;
  }

  private validateDescription(value: any): string {
    if (typeof value !== "string") {
      throw new Error("The description of todo must be a string");
    }

    const description = value.replace(/ {2,}/g, " ").trim();

    if (description.length < 10) {
      throw new Error("The description must be at least 10 letters");
    }

    if (description.length > 255) {
      throw new Error("The description must have a maximum of 255 letters");
    }

    return description;
  }

  async execute(args: CreateTodo.Args) {
    const title = this.validateTitle(args.title);
    const description = this.validateDescription(args.description);
    const id = await this.idGenerator.generate();
    const finished = false;

    const todo = new ToDo({
      id,
      title,
      description,
      finished,
    });

    await this.todoRepository.create(todo.data);

    return todo.data;
  }
}

export namespace CreateTodo {
  export type Args = {
    title: string;
    description: string;
  };

  export type Result = ToDo.Data;
}
