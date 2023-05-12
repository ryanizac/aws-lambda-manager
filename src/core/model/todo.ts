export class ToDo {
  private _data: ToDo.Data;

  constructor(data: ToDo.Data) {
    this._data = {
      id: data.id,
      title: data.title,
      description: data.description,
      finished: data.finished,
    };
  }

  get data() {
    return this._data;
  }
}

export namespace ToDo {
  export type Data = {
    id: string;
    title: string;
    description: string;
    finished: boolean;
  };
}
