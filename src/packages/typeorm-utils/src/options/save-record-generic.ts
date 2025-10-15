import { EntityManager, ObjectLiteral } from 'typeorm';

export type SaveRecordGeneric<T extends ObjectLiteral> = {
  entity: T;
  transactionOptions:
    | {
        useTransaction: false;
      }
    | {
        useTransaction: true;
        transaction: EntityManager;
      };
};
