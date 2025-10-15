import { EntityManager, FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export type UpdateRecordGeneric<T extends ObjectLiteral> = {
  updatePayload: QueryDeepPartialEntity<T>;
  identifierOptions: FindOptionsWhere<T>;
  transactionOptions:
    | {
        useTransaction: false;
      }
    | {
        useTransaction: true;
        transaction: EntityManager;
      };
};
