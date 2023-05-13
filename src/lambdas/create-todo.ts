import { makeCreateTodo } from "../core";
import { adaptController } from "./common";

export const handler = adaptController(makeCreateTodo);
