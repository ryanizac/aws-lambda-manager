export type Repository = {
  query(sql: string, values?: any[]): Promise<any>;
};
