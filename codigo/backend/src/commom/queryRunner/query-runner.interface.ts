import { Post } from "src/post/entities/post.entity";
////////////////////////////////////////////////////////////////////////////////

export interface QueryRunnerInterface {
  connect(): Promise<void>;
  startTransaction(): Promise<void>;
  commitTransaction(obj: Post): Promise<void>;
  rollbackTransaction(): Promise<void>;
  release(): Promise<void>;
}
