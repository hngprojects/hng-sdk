/* eslint-disable @typescript-eslint/no-unsafe-return */

type GetDelegate<TClient, TModel extends keyof TClient> = TClient[TModel];

type GetPayload<
  TClient,
  TModel extends keyof TClient,
> = TClient[TModel] extends { findUnique: (args: any) => Promise<infer P> }
  ? NonNullable<P>
  : never;

type GetFindUniqueArgs<
  TClient,
  TModel extends keyof TClient,
> = TClient[TModel] extends { findUnique: (args: infer A) => any } ? A : never;

type GetFindManyArgs<
  TClient,
  TModel extends keyof TClient,
> = TClient[TModel] extends { findMany: (args?: infer A) => any } ? A : never;

type GetDeleteArgs<
  TClient,
  TModel extends keyof TClient,
> = TClient[TModel] extends { delete: (args: infer A) => any } ? A : never;

type GetCountArgs<
  TClient,
  TModel extends keyof TClient,
> = TClient[TModel] extends { count: (args?: infer A) => any } ? A : never;

type GetUpsertArgs<
  TClient,
  TModel extends keyof TClient,
> = TClient[TModel] extends { upsert: (args: infer A) => any } ? A : never;

type GetCreateManyArgs<
  TClient,
  TModel extends keyof TClient,
> = TClient[TModel] extends { createMany: (args: infer A) => any } ? A : never;

type GetUpdateManyArgs<
  TClient,
  TModel extends keyof TClient,
> = TClient[TModel] extends { updateMany: (args: infer A) => any } ? A : never;

type GetDeleteManyArgs<
  TClient,
  TModel extends keyof TClient,
> = TClient[TModel] extends { deleteMany: (args?: infer A) => any } ? A : never;

type WhereInput<T> = T extends { where?: infer W } ? W : never;

export class PrismaBaseDal<
  TClient extends { [K in keyof TClient]: any },
  TModel extends keyof TClient,
> {
  private readonly delegate: GetDelegate<TClient, TModel>;

  constructor(
    protected readonly prisma: TClient,
    protected readonly model: TModel,
  ) {
    this.delegate = this.prisma[this.model];
  }

  get<WhereInputType = WhereInput<GetFindUniqueArgs<TClient, TModel>>>(
    args: GetFindUniqueArgs<TClient, TModel> | WhereInputType,
    select?: GetFindManyArgs<TClient, TModel> extends { select?: infer I }
      ? I
      : never,
    include?: GetFindManyArgs<TClient, TModel> extends { include?: infer I }
      ? I
      : never,
  ): Promise<GetPayload<TClient, TModel> | null> {
    const prismaArgs = (
      args && typeof args === 'object' && 'where' in args
        ? { ...args, select, include }
        : { where: args, select, include }
    ) as GetFindUniqueArgs<TClient, TModel>;
    return (this.delegate as any).findUnique(prismaArgs);
  }

  list<WhereInputType = WhereInput<GetFindManyArgs<TClient, TModel>>>(
    args: WhereInputType,
    select?: GetFindManyArgs<TClient, TModel> extends { select?: infer S }
      ? S
      : never,
    include?: GetFindManyArgs<TClient, TModel> extends { include?: infer I }
      ? I
      : never,
  ): Promise<GetPayload<TClient, TModel>[]> {
    const prismaArgs = (
      args && typeof args === 'object' && 'where' in args
        ? { ...args, select, include }
        : { where: args, select, include }
    ) as GetFindManyArgs<TClient, TModel>;
    return (this.delegate as any).findMany(prismaArgs);
  }

  create(
    data: GetFindManyArgs<TClient, TModel> extends { data?: infer D }
      ? D
      : never,
  ): Promise<GetPayload<TClient, TModel>> {
    return (this.delegate as any).create({ data });
  }

  update<WhereInputType = WhereInput<GetFindManyArgs<TClient, TModel>>>(
    identifier: WhereInputType,
    data: GetFindManyArgs<TClient, TModel> extends { data?: infer D }
      ? D
      : never,
  ): Promise<GetPayload<TClient, TModel>> {
    return (this.delegate as any).update({
      where: identifier,
      data,
    });
  }

  delete(
    args: GetDeleteArgs<TClient, TModel> extends { where?: infer W }
      ? W
      : never,
  ): Promise<GetPayload<TClient, TModel>> {
    return (this.delegate as any).delete({ where: args });
  }

  count(
    args: GetCountArgs<TClient, TModel> extends { where?: infer W } ? W : never,
  ): Promise<number> {
    return (this.delegate as any).count({ where: args });
  }

  groupBy(
    groupBy: (keyof GetPayload<TClient, TModel>)[],
    query?: GetFindManyArgs<TClient, TModel> extends { where?: infer W }
      ? W
      : never,
  ) {
    const countQuery: any = {};
    groupBy.forEach((field) => {
      countQuery[field] = true;
    });

    return (this.delegate as any).groupBy({
      by: groupBy,
      where: query,
      _count: countQuery,
    });
  }

  upsert(
    filter: GetUpsertArgs<TClient, TModel> extends { where?: infer W }
      ? W
      : never,
    update: GetUpsertArgs<TClient, TModel> extends { update?: infer W }
      ? W
      : never,
  ): Promise<GetPayload<TClient, TModel>> {
    return (this.delegate as any).upsert({ where: filter, update });
  }

  async paginate(args: {
    where?: GetFindManyArgs<TClient, TModel> extends { where?: infer W }
      ? W
      : never;
    orderBy?: GetFindManyArgs<TClient, TModel> extends { orderBy?: infer O }
      ? O
      : never;
    include?: GetFindManyArgs<TClient, TModel> extends { include?: infer I }
      ? I
      : never;
    select?: GetFindManyArgs<TClient, TModel> extends { select?: infer S }
      ? S
      : never;
    page?: number;
    limit?: number;
    search?: string;
    searchFields?: (keyof GetPayload<TClient, TModel>)[];
  }): Promise<{
    data: GetPayload<TClient, TModel>[];
    meta: {
      total: number;
      currentPage: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  }> {
    const {
      page = 1,
      limit = 10,
      where,
      orderBy,
      include,
      select,
      searchFields,
      search,
    } = args;
    const skip = (page - 1) * limit;
    let searchQuery = {};
    if (searchFields && search && where) {
      searchQuery = {
        OR: [
          ...searchFields.map((field) => ({
            [field]: { contains: search, mode: 'insensitive' },
          })),
        ],
      };

      where['AND'] = searchQuery;
    }

    const [total, data] = await Promise.all([
      this.count(where as any),
      this.list({
        skip,
        take: limit,
        where,
        orderBy,
        include,
        select,
      } as GetFindManyArgs<TClient, TModel>),
    ]);

    const pageCount = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        currentPage: page,
        limit,
        totalPages: pageCount,
        hasNextPage: page < pageCount,
        hasPrevPage: page > 1,
      },
    };
  }

  async exists(
    args: GetFindUniqueArgs<TClient, TModel> extends { where?: infer O }
      ? O
      : never,
  ): Promise<boolean> {
    const result = await this.get(args);
    return result !== null;
  }

  createMany(
    data: GetCreateManyArgs<TClient, TModel> extends { data?: infer D }
      ? D
      : never,
  ) {
    return (this.delegate as any).createMany({ data });
  }

  updateMany(
    args: GetUpdateManyArgs<TClient, TModel> extends { where?: infer W }
      ? W
      : never,
    data: GetUpdateManyArgs<TClient, TModel> extends { data?: infer D }
      ? D
      : never,
  ) {
    return (this.delegate as any).updateMany({ where: args, data });
  }

  deleteMany(
    args?: GetDeleteManyArgs<TClient, TModel> extends { where?: infer W }
      ? W
      : never,
  ) {
    return (this.delegate as any).deleteMany({ where: args });
  }
}

export function createDal<
  TClient extends { [K in keyof TClient]: any },
  TModel extends keyof TClient,
>(prisma: TClient, model: TModel): PrismaBaseDal<TClient, TModel> {
  return new PrismaBaseDal(prisma, model);
}