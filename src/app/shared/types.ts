export type JSONLike = { [key: string]: any };

export interface Todo {
  title: string;
  description: string;
  finished: Date;
  due: Date;
  progressing: boolean;
}
