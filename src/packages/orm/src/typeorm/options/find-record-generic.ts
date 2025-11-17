import {
  EntityManager,
  FindOptionsOrder,
  FindOptionsWhere,
  ObjectLiteral,
} from 'typeorm';

export type FindRecordGeneric<T extends ObjectLiteral> = {
  findOptions?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
  transactionOptions:
    | {
        useTransaction: false;
      }
    | {
        useTransaction: true;
        transaction: EntityManager;
      };
  paginationPayload?: {
    limit: number;
    page: number;
  };
  order?: FindOptionsOrder<T>;
};
