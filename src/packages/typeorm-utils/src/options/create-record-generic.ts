import { DeepPartial, EntityManager, ObjectLiteral } from 'typeorm';

export type CreateRecordGeneric<T extends ObjectLiteral> = {
  createPayload: DeepPartial<T>;
  transactionOptions:
    | {
        useTransaction: false;
      }
    | {
        useTransaction: true;
        transaction: EntityManager;
      };
};
