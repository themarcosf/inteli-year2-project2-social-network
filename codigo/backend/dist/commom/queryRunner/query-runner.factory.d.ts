import { DataSource } from "typeorm";
import { Post } from "src/post/entities/post.entity";
import { QueryRunnerInterface } from "./query-runner.interface";
export declare class QueryRunnerFactory implements QueryRunnerInterface {
    private readonly dataSource;
    private queryRunner;
    constructor(dataSource: DataSource);
    connect(): Promise<void>;
    startTransaction(): Promise<void>;
    commitTransaction(obj: Post): Promise<void>;
    rollbackTransaction(): Promise<void>;
    release(): Promise<void>;
}
