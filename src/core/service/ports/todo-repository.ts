import { ToDo } from "../../model";

export type TodoRepository = {
  create(args: TodoRepository.CreateArgs): Promise<void>;
};

export namespace TodoRepository {
  export type CreateArgs = ToDo.Data;
}
