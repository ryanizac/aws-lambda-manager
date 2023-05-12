import { v4 as uuid } from "uuid";
import { IdGenerator } from "../service";

export class UUIDGenerator implements IdGenerator {
  async generate() {
    return uuid();
  }
}
