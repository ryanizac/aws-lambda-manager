export type Controller = {
  execute(request: Controller.Request): Promise<Controller.Response>;
};

export namespace Controller {
  export type Request = {
    body: any;
    params: any;
    query: any;
    headers: any;
  };

  export type Response = {
    code: number;
    data: any;
  };
}
