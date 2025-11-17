import { EntityManager, FindOptionsWhere, ObjectLiteral } from 'typeorm';

export type DeleteRecordGeneric<T extends ObjectLiteral> = {
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
