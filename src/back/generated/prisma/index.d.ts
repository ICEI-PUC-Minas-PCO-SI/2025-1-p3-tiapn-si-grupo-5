
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model chamado
 * 
 */
export type chamado = $Result.DefaultSelection<Prisma.$chamadoPayload>
/**
 * Model gerencia
 * 
 */
export type gerencia = $Result.DefaultSelection<Prisma.$gerenciaPayload>
/**
 * Model logatividade
 * 
 */
export type logatividade = $Result.DefaultSelection<Prisma.$logatividadePayload>
/**
 * Model msgchamado
 * 
 */
export type msgchamado = $Result.DefaultSelection<Prisma.$msgchamadoPayload>
/**
 * Model notificacao
 * 
 */
export type notificacao = $Result.DefaultSelection<Prisma.$notificacaoPayload>
/**
 * Model prioridadechamado
 * 
 */
export type prioridadechamado = $Result.DefaultSelection<Prisma.$prioridadechamadoPayload>
/**
 * Model statuschamado
 * 
 */
export type statuschamado = $Result.DefaultSelection<Prisma.$statuschamadoPayload>
/**
 * Model tipochamado
 * 
 */
export type tipochamado = $Result.DefaultSelection<Prisma.$tipochamadoPayload>
/**
 * Model tipousuario
 * 
 */
export type tipousuario = $Result.DefaultSelection<Prisma.$tipousuarioPayload>
/**
 * Model usuario
 * 
 */
export type usuario = $Result.DefaultSelection<Prisma.$usuarioPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const msgchamado_remetente: {
  usuario: 'usuario',
  analista: 'analista'
};

export type msgchamado_remetente = (typeof msgchamado_remetente)[keyof typeof msgchamado_remetente]

}

export type msgchamado_remetente = $Enums.msgchamado_remetente

export const msgchamado_remetente: typeof $Enums.msgchamado_remetente

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Chamados
 * const chamados = await prisma.chamado.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Chamados
   * const chamados = await prisma.chamado.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.chamado`: Exposes CRUD operations for the **chamado** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Chamados
    * const chamados = await prisma.chamado.findMany()
    * ```
    */
  get chamado(): Prisma.chamadoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gerencia`: Exposes CRUD operations for the **gerencia** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Gerencias
    * const gerencias = await prisma.gerencia.findMany()
    * ```
    */
  get gerencia(): Prisma.gerenciaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.logatividade`: Exposes CRUD operations for the **logatividade** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Logatividades
    * const logatividades = await prisma.logatividade.findMany()
    * ```
    */
  get logatividade(): Prisma.logatividadeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.msgchamado`: Exposes CRUD operations for the **msgchamado** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Msgchamados
    * const msgchamados = await prisma.msgchamado.findMany()
    * ```
    */
  get msgchamado(): Prisma.msgchamadoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notificacao`: Exposes CRUD operations for the **notificacao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notificacaos
    * const notificacaos = await prisma.notificacao.findMany()
    * ```
    */
  get notificacao(): Prisma.notificacaoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.prioridadechamado`: Exposes CRUD operations for the **prioridadechamado** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prioridadechamados
    * const prioridadechamados = await prisma.prioridadechamado.findMany()
    * ```
    */
  get prioridadechamado(): Prisma.prioridadechamadoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.statuschamado`: Exposes CRUD operations for the **statuschamado** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Statuschamados
    * const statuschamados = await prisma.statuschamado.findMany()
    * ```
    */
  get statuschamado(): Prisma.statuschamadoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tipochamado`: Exposes CRUD operations for the **tipochamado** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tipochamados
    * const tipochamados = await prisma.tipochamado.findMany()
    * ```
    */
  get tipochamado(): Prisma.tipochamadoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tipousuario`: Exposes CRUD operations for the **tipousuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tipousuarios
    * const tipousuarios = await prisma.tipousuario.findMany()
    * ```
    */
  get tipousuario(): Prisma.tipousuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usuario`: Exposes CRUD operations for the **usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.usuarioDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    chamado: 'chamado',
    gerencia: 'gerencia',
    logatividade: 'logatividade',
    msgchamado: 'msgchamado',
    notificacao: 'notificacao',
    prioridadechamado: 'prioridadechamado',
    statuschamado: 'statuschamado',
    tipochamado: 'tipochamado',
    tipousuario: 'tipousuario',
    usuario: 'usuario'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "chamado" | "gerencia" | "logatividade" | "msgchamado" | "notificacao" | "prioridadechamado" | "statuschamado" | "tipochamado" | "tipousuario" | "usuario"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      chamado: {
        payload: Prisma.$chamadoPayload<ExtArgs>
        fields: Prisma.chamadoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.chamadoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chamadoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.chamadoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chamadoPayload>
          }
          findFirst: {
            args: Prisma.chamadoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chamadoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.chamadoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chamadoPayload>
          }
          findMany: {
            args: Prisma.chamadoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chamadoPayload>[]
          }
          create: {
            args: Prisma.chamadoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chamadoPayload>
          }
          createMany: {
            args: Prisma.chamadoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.chamadoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chamadoPayload>
          }
          update: {
            args: Prisma.chamadoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chamadoPayload>
          }
          deleteMany: {
            args: Prisma.chamadoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.chamadoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.chamadoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chamadoPayload>
          }
          aggregate: {
            args: Prisma.ChamadoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChamado>
          }
          groupBy: {
            args: Prisma.chamadoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChamadoGroupByOutputType>[]
          }
          count: {
            args: Prisma.chamadoCountArgs<ExtArgs>
            result: $Utils.Optional<ChamadoCountAggregateOutputType> | number
          }
        }
      }
      gerencia: {
        payload: Prisma.$gerenciaPayload<ExtArgs>
        fields: Prisma.gerenciaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.gerenciaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gerenciaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.gerenciaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gerenciaPayload>
          }
          findFirst: {
            args: Prisma.gerenciaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gerenciaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.gerenciaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gerenciaPayload>
          }
          findMany: {
            args: Prisma.gerenciaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gerenciaPayload>[]
          }
          create: {
            args: Prisma.gerenciaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gerenciaPayload>
          }
          createMany: {
            args: Prisma.gerenciaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.gerenciaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gerenciaPayload>
          }
          update: {
            args: Prisma.gerenciaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gerenciaPayload>
          }
          deleteMany: {
            args: Prisma.gerenciaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.gerenciaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.gerenciaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gerenciaPayload>
          }
          aggregate: {
            args: Prisma.GerenciaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGerencia>
          }
          groupBy: {
            args: Prisma.gerenciaGroupByArgs<ExtArgs>
            result: $Utils.Optional<GerenciaGroupByOutputType>[]
          }
          count: {
            args: Prisma.gerenciaCountArgs<ExtArgs>
            result: $Utils.Optional<GerenciaCountAggregateOutputType> | number
          }
        }
      }
      logatividade: {
        payload: Prisma.$logatividadePayload<ExtArgs>
        fields: Prisma.logatividadeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.logatividadeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$logatividadePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.logatividadeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$logatividadePayload>
          }
          findFirst: {
            args: Prisma.logatividadeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$logatividadePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.logatividadeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$logatividadePayload>
          }
          findMany: {
            args: Prisma.logatividadeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$logatividadePayload>[]
          }
          create: {
            args: Prisma.logatividadeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$logatividadePayload>
          }
          createMany: {
            args: Prisma.logatividadeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.logatividadeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$logatividadePayload>
          }
          update: {
            args: Prisma.logatividadeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$logatividadePayload>
          }
          deleteMany: {
            args: Prisma.logatividadeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.logatividadeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.logatividadeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$logatividadePayload>
          }
          aggregate: {
            args: Prisma.LogatividadeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLogatividade>
          }
          groupBy: {
            args: Prisma.logatividadeGroupByArgs<ExtArgs>
            result: $Utils.Optional<LogatividadeGroupByOutputType>[]
          }
          count: {
            args: Prisma.logatividadeCountArgs<ExtArgs>
            result: $Utils.Optional<LogatividadeCountAggregateOutputType> | number
          }
        }
      }
      msgchamado: {
        payload: Prisma.$msgchamadoPayload<ExtArgs>
        fields: Prisma.msgchamadoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.msgchamadoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$msgchamadoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.msgchamadoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$msgchamadoPayload>
          }
          findFirst: {
            args: Prisma.msgchamadoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$msgchamadoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.msgchamadoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$msgchamadoPayload>
          }
          findMany: {
            args: Prisma.msgchamadoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$msgchamadoPayload>[]
          }
          create: {
            args: Prisma.msgchamadoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$msgchamadoPayload>
          }
          createMany: {
            args: Prisma.msgchamadoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.msgchamadoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$msgchamadoPayload>
          }
          update: {
            args: Prisma.msgchamadoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$msgchamadoPayload>
          }
          deleteMany: {
            args: Prisma.msgchamadoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.msgchamadoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.msgchamadoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$msgchamadoPayload>
          }
          aggregate: {
            args: Prisma.MsgchamadoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMsgchamado>
          }
          groupBy: {
            args: Prisma.msgchamadoGroupByArgs<ExtArgs>
            result: $Utils.Optional<MsgchamadoGroupByOutputType>[]
          }
          count: {
            args: Prisma.msgchamadoCountArgs<ExtArgs>
            result: $Utils.Optional<MsgchamadoCountAggregateOutputType> | number
          }
        }
      }
      notificacao: {
        payload: Prisma.$notificacaoPayload<ExtArgs>
        fields: Prisma.notificacaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.notificacaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificacaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.notificacaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificacaoPayload>
          }
          findFirst: {
            args: Prisma.notificacaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificacaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.notificacaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificacaoPayload>
          }
          findMany: {
            args: Prisma.notificacaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificacaoPayload>[]
          }
          create: {
            args: Prisma.notificacaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificacaoPayload>
          }
          createMany: {
            args: Prisma.notificacaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.notificacaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificacaoPayload>
          }
          update: {
            args: Prisma.notificacaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificacaoPayload>
          }
          deleteMany: {
            args: Prisma.notificacaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.notificacaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.notificacaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificacaoPayload>
          }
          aggregate: {
            args: Prisma.NotificacaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificacao>
          }
          groupBy: {
            args: Prisma.notificacaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificacaoGroupByOutputType>[]
          }
          count: {
            args: Prisma.notificacaoCountArgs<ExtArgs>
            result: $Utils.Optional<NotificacaoCountAggregateOutputType> | number
          }
        }
      }
      prioridadechamado: {
        payload: Prisma.$prioridadechamadoPayload<ExtArgs>
        fields: Prisma.prioridadechamadoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.prioridadechamadoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prioridadechamadoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.prioridadechamadoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prioridadechamadoPayload>
          }
          findFirst: {
            args: Prisma.prioridadechamadoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prioridadechamadoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.prioridadechamadoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prioridadechamadoPayload>
          }
          findMany: {
            args: Prisma.prioridadechamadoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prioridadechamadoPayload>[]
          }
          create: {
            args: Prisma.prioridadechamadoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prioridadechamadoPayload>
          }
          createMany: {
            args: Prisma.prioridadechamadoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.prioridadechamadoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prioridadechamadoPayload>
          }
          update: {
            args: Prisma.prioridadechamadoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prioridadechamadoPayload>
          }
          deleteMany: {
            args: Prisma.prioridadechamadoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.prioridadechamadoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.prioridadechamadoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prioridadechamadoPayload>
          }
          aggregate: {
            args: Prisma.PrioridadechamadoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrioridadechamado>
          }
          groupBy: {
            args: Prisma.prioridadechamadoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrioridadechamadoGroupByOutputType>[]
          }
          count: {
            args: Prisma.prioridadechamadoCountArgs<ExtArgs>
            result: $Utils.Optional<PrioridadechamadoCountAggregateOutputType> | number
          }
        }
      }
      statuschamado: {
        payload: Prisma.$statuschamadoPayload<ExtArgs>
        fields: Prisma.statuschamadoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.statuschamadoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$statuschamadoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.statuschamadoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$statuschamadoPayload>
          }
          findFirst: {
            args: Prisma.statuschamadoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$statuschamadoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.statuschamadoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$statuschamadoPayload>
          }
          findMany: {
            args: Prisma.statuschamadoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$statuschamadoPayload>[]
          }
          create: {
            args: Prisma.statuschamadoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$statuschamadoPayload>
          }
          createMany: {
            args: Prisma.statuschamadoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.statuschamadoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$statuschamadoPayload>
          }
          update: {
            args: Prisma.statuschamadoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$statuschamadoPayload>
          }
          deleteMany: {
            args: Prisma.statuschamadoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.statuschamadoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.statuschamadoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$statuschamadoPayload>
          }
          aggregate: {
            args: Prisma.StatuschamadoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStatuschamado>
          }
          groupBy: {
            args: Prisma.statuschamadoGroupByArgs<ExtArgs>
            result: $Utils.Optional<StatuschamadoGroupByOutputType>[]
          }
          count: {
            args: Prisma.statuschamadoCountArgs<ExtArgs>
            result: $Utils.Optional<StatuschamadoCountAggregateOutputType> | number
          }
        }
      }
      tipochamado: {
        payload: Prisma.$tipochamadoPayload<ExtArgs>
        fields: Prisma.tipochamadoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tipochamadoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipochamadoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tipochamadoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipochamadoPayload>
          }
          findFirst: {
            args: Prisma.tipochamadoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipochamadoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tipochamadoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipochamadoPayload>
          }
          findMany: {
            args: Prisma.tipochamadoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipochamadoPayload>[]
          }
          create: {
            args: Prisma.tipochamadoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipochamadoPayload>
          }
          createMany: {
            args: Prisma.tipochamadoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.tipochamadoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipochamadoPayload>
          }
          update: {
            args: Prisma.tipochamadoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipochamadoPayload>
          }
          deleteMany: {
            args: Prisma.tipochamadoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tipochamadoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.tipochamadoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipochamadoPayload>
          }
          aggregate: {
            args: Prisma.TipochamadoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTipochamado>
          }
          groupBy: {
            args: Prisma.tipochamadoGroupByArgs<ExtArgs>
            result: $Utils.Optional<TipochamadoGroupByOutputType>[]
          }
          count: {
            args: Prisma.tipochamadoCountArgs<ExtArgs>
            result: $Utils.Optional<TipochamadoCountAggregateOutputType> | number
          }
        }
      }
      tipousuario: {
        payload: Prisma.$tipousuarioPayload<ExtArgs>
        fields: Prisma.tipousuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tipousuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipousuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tipousuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipousuarioPayload>
          }
          findFirst: {
            args: Prisma.tipousuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipousuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tipousuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipousuarioPayload>
          }
          findMany: {
            args: Prisma.tipousuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipousuarioPayload>[]
          }
          create: {
            args: Prisma.tipousuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipousuarioPayload>
          }
          createMany: {
            args: Prisma.tipousuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.tipousuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipousuarioPayload>
          }
          update: {
            args: Prisma.tipousuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipousuarioPayload>
          }
          deleteMany: {
            args: Prisma.tipousuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tipousuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.tipousuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipousuarioPayload>
          }
          aggregate: {
            args: Prisma.TipousuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTipousuario>
          }
          groupBy: {
            args: Prisma.tipousuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<TipousuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.tipousuarioCountArgs<ExtArgs>
            result: $Utils.Optional<TipousuarioCountAggregateOutputType> | number
          }
        }
      }
      usuario: {
        payload: Prisma.$usuarioPayload<ExtArgs>
        fields: Prisma.usuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarioPayload>
          }
          findFirst: {
            args: Prisma.usuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarioPayload>
          }
          findMany: {
            args: Prisma.usuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarioPayload>[]
          }
          create: {
            args: Prisma.usuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarioPayload>
          }
          createMany: {
            args: Prisma.usuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.usuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarioPayload>
          }
          update: {
            args: Prisma.usuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarioPayload>
          }
          deleteMany: {
            args: Prisma.usuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.usuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.usuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.usuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    chamado?: chamadoOmit
    gerencia?: gerenciaOmit
    logatividade?: logatividadeOmit
    msgchamado?: msgchamadoOmit
    notificacao?: notificacaoOmit
    prioridadechamado?: prioridadechamadoOmit
    statuschamado?: statuschamadoOmit
    tipochamado?: tipochamadoOmit
    tipousuario?: tipousuarioOmit
    usuario?: usuarioOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ChamadoCountOutputType
   */

  export type ChamadoCountOutputType = {
    msgchamado: number
    notificacao: number
  }

  export type ChamadoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    msgchamado?: boolean | ChamadoCountOutputTypeCountMsgchamadoArgs
    notificacao?: boolean | ChamadoCountOutputTypeCountNotificacaoArgs
  }

  // Custom InputTypes
  /**
   * ChamadoCountOutputType without action
   */
  export type ChamadoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChamadoCountOutputType
     */
    select?: ChamadoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChamadoCountOutputType without action
   */
  export type ChamadoCountOutputTypeCountMsgchamadoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: msgchamadoWhereInput
  }

  /**
   * ChamadoCountOutputType without action
   */
  export type ChamadoCountOutputTypeCountNotificacaoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: notificacaoWhereInput
  }


  /**
   * Count Type GerenciaCountOutputType
   */

  export type GerenciaCountOutputType = {
    usuario: number
  }

  export type GerenciaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | GerenciaCountOutputTypeCountUsuarioArgs
  }

  // Custom InputTypes
  /**
   * GerenciaCountOutputType without action
   */
  export type GerenciaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GerenciaCountOutputType
     */
    select?: GerenciaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GerenciaCountOutputType without action
   */
  export type GerenciaCountOutputTypeCountUsuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usuarioWhereInput
  }


  /**
   * Count Type PrioridadechamadoCountOutputType
   */

  export type PrioridadechamadoCountOutputType = {
    chamado: number
  }

  export type PrioridadechamadoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chamado?: boolean | PrioridadechamadoCountOutputTypeCountChamadoArgs
  }

  // Custom InputTypes
  /**
   * PrioridadechamadoCountOutputType without action
   */
  export type PrioridadechamadoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrioridadechamadoCountOutputType
     */
    select?: PrioridadechamadoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PrioridadechamadoCountOutputType without action
   */
  export type PrioridadechamadoCountOutputTypeCountChamadoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: chamadoWhereInput
  }


  /**
   * Count Type StatuschamadoCountOutputType
   */

  export type StatuschamadoCountOutputType = {
    chamado: number
  }

  export type StatuschamadoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chamado?: boolean | StatuschamadoCountOutputTypeCountChamadoArgs
  }

  // Custom InputTypes
  /**
   * StatuschamadoCountOutputType without action
   */
  export type StatuschamadoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatuschamadoCountOutputType
     */
    select?: StatuschamadoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StatuschamadoCountOutputType without action
   */
  export type StatuschamadoCountOutputTypeCountChamadoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: chamadoWhereInput
  }


  /**
   * Count Type TipochamadoCountOutputType
   */

  export type TipochamadoCountOutputType = {
    chamado: number
  }

  export type TipochamadoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chamado?: boolean | TipochamadoCountOutputTypeCountChamadoArgs
  }

  // Custom InputTypes
  /**
   * TipochamadoCountOutputType without action
   */
  export type TipochamadoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipochamadoCountOutputType
     */
    select?: TipochamadoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TipochamadoCountOutputType without action
   */
  export type TipochamadoCountOutputTypeCountChamadoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: chamadoWhereInput
  }


  /**
   * Count Type TipousuarioCountOutputType
   */

  export type TipousuarioCountOutputType = {
    usuario: number
  }

  export type TipousuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | TipousuarioCountOutputTypeCountUsuarioArgs
  }

  // Custom InputTypes
  /**
   * TipousuarioCountOutputType without action
   */
  export type TipousuarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipousuarioCountOutputType
     */
    select?: TipousuarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TipousuarioCountOutputType without action
   */
  export type TipousuarioCountOutputTypeCountUsuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usuarioWhereInput
  }


  /**
   * Count Type UsuarioCountOutputType
   */

  export type UsuarioCountOutputType = {
    chamado_chamado_idSolicitanteTousuario: number
    chamado_chamado_idAnalistaTousuario: number
    logatividade: number
    msgchamado: number
    notificacao: number
  }

  export type UsuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chamado_chamado_idSolicitanteTousuario?: boolean | UsuarioCountOutputTypeCountChamado_chamado_idSolicitanteTousuarioArgs
    chamado_chamado_idAnalistaTousuario?: boolean | UsuarioCountOutputTypeCountChamado_chamado_idAnalistaTousuarioArgs
    logatividade?: boolean | UsuarioCountOutputTypeCountLogatividadeArgs
    msgchamado?: boolean | UsuarioCountOutputTypeCountMsgchamadoArgs
    notificacao?: boolean | UsuarioCountOutputTypeCountNotificacaoArgs
  }

  // Custom InputTypes
  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuarioCountOutputType
     */
    select?: UsuarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountChamado_chamado_idSolicitanteTousuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: chamadoWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountChamado_chamado_idAnalistaTousuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: chamadoWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountLogatividadeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: logatividadeWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountMsgchamadoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: msgchamadoWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountNotificacaoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: notificacaoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model chamado
   */

  export type AggregateChamado = {
    _count: ChamadoCountAggregateOutputType | null
    _avg: ChamadoAvgAggregateOutputType | null
    _sum: ChamadoSumAggregateOutputType | null
    _min: ChamadoMinAggregateOutputType | null
    _max: ChamadoMaxAggregateOutputType | null
  }

  export type ChamadoAvgAggregateOutputType = {
    idChamado: number | null
    idSolicitante: number | null
    idAnalista: number | null
    idTipoChamado: number | null
    idStatus: number | null
    idPrioridade: number | null
  }

  export type ChamadoSumAggregateOutputType = {
    idChamado: number | null
    idSolicitante: number | null
    idAnalista: number | null
    idTipoChamado: number | null
    idStatus: number | null
    idPrioridade: number | null
  }

  export type ChamadoMinAggregateOutputType = {
    idChamado: number | null
    protocolo: string | null
    assunto: string | null
    descricao: string | null
    dataAbertura: Date | null
    dataAtualizacao: Date | null
    dataFechamento: Date | null
    idSolicitante: number | null
    idAnalista: number | null
    idTipoChamado: number | null
    idStatus: number | null
    idPrioridade: number | null
  }

  export type ChamadoMaxAggregateOutputType = {
    idChamado: number | null
    protocolo: string | null
    assunto: string | null
    descricao: string | null
    dataAbertura: Date | null
    dataAtualizacao: Date | null
    dataFechamento: Date | null
    idSolicitante: number | null
    idAnalista: number | null
    idTipoChamado: number | null
    idStatus: number | null
    idPrioridade: number | null
  }

  export type ChamadoCountAggregateOutputType = {
    idChamado: number
    protocolo: number
    assunto: number
    descricao: number
    dataAbertura: number
    dataAtualizacao: number
    dataFechamento: number
    idSolicitante: number
    idAnalista: number
    idTipoChamado: number
    idStatus: number
    idPrioridade: number
    _all: number
  }


  export type ChamadoAvgAggregateInputType = {
    idChamado?: true
    idSolicitante?: true
    idAnalista?: true
    idTipoChamado?: true
    idStatus?: true
    idPrioridade?: true
  }

  export type ChamadoSumAggregateInputType = {
    idChamado?: true
    idSolicitante?: true
    idAnalista?: true
    idTipoChamado?: true
    idStatus?: true
    idPrioridade?: true
  }

  export type ChamadoMinAggregateInputType = {
    idChamado?: true
    protocolo?: true
    assunto?: true
    descricao?: true
    dataAbertura?: true
    dataAtualizacao?: true
    dataFechamento?: true
    idSolicitante?: true
    idAnalista?: true
    idTipoChamado?: true
    idStatus?: true
    idPrioridade?: true
  }

  export type ChamadoMaxAggregateInputType = {
    idChamado?: true
    protocolo?: true
    assunto?: true
    descricao?: true
    dataAbertura?: true
    dataAtualizacao?: true
    dataFechamento?: true
    idSolicitante?: true
    idAnalista?: true
    idTipoChamado?: true
    idStatus?: true
    idPrioridade?: true
  }

  export type ChamadoCountAggregateInputType = {
    idChamado?: true
    protocolo?: true
    assunto?: true
    descricao?: true
    dataAbertura?: true
    dataAtualizacao?: true
    dataFechamento?: true
    idSolicitante?: true
    idAnalista?: true
    idTipoChamado?: true
    idStatus?: true
    idPrioridade?: true
    _all?: true
  }

  export type ChamadoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which chamado to aggregate.
     */
    where?: chamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chamados to fetch.
     */
    orderBy?: chamadoOrderByWithRelationInput | chamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: chamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chamados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned chamados
    **/
    _count?: true | ChamadoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChamadoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChamadoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChamadoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChamadoMaxAggregateInputType
  }

  export type GetChamadoAggregateType<T extends ChamadoAggregateArgs> = {
        [P in keyof T & keyof AggregateChamado]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChamado[P]>
      : GetScalarType<T[P], AggregateChamado[P]>
  }




  export type chamadoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: chamadoWhereInput
    orderBy?: chamadoOrderByWithAggregationInput | chamadoOrderByWithAggregationInput[]
    by: ChamadoScalarFieldEnum[] | ChamadoScalarFieldEnum
    having?: chamadoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChamadoCountAggregateInputType | true
    _avg?: ChamadoAvgAggregateInputType
    _sum?: ChamadoSumAggregateInputType
    _min?: ChamadoMinAggregateInputType
    _max?: ChamadoMaxAggregateInputType
  }

  export type ChamadoGroupByOutputType = {
    idChamado: number
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura: Date
    dataAtualizacao: Date | null
    dataFechamento: Date | null
    idSolicitante: number | null
    idAnalista: number | null
    idTipoChamado: number | null
    idStatus: number | null
    idPrioridade: number | null
    _count: ChamadoCountAggregateOutputType | null
    _avg: ChamadoAvgAggregateOutputType | null
    _sum: ChamadoSumAggregateOutputType | null
    _min: ChamadoMinAggregateOutputType | null
    _max: ChamadoMaxAggregateOutputType | null
  }

  type GetChamadoGroupByPayload<T extends chamadoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChamadoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChamadoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChamadoGroupByOutputType[P]>
            : GetScalarType<T[P], ChamadoGroupByOutputType[P]>
        }
      >
    >


  export type chamadoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idChamado?: boolean
    protocolo?: boolean
    assunto?: boolean
    descricao?: boolean
    dataAbertura?: boolean
    dataAtualizacao?: boolean
    dataFechamento?: boolean
    idSolicitante?: boolean
    idAnalista?: boolean
    idTipoChamado?: boolean
    idStatus?: boolean
    idPrioridade?: boolean
    usuario_chamado_idSolicitanteTousuario?: boolean | chamado$usuario_chamado_idSolicitanteTousuarioArgs<ExtArgs>
    usuario_chamado_idAnalistaTousuario?: boolean | chamado$usuario_chamado_idAnalistaTousuarioArgs<ExtArgs>
    tipochamado?: boolean | chamado$tipochamadoArgs<ExtArgs>
    statuschamado?: boolean | chamado$statuschamadoArgs<ExtArgs>
    prioridadechamado?: boolean | chamado$prioridadechamadoArgs<ExtArgs>
    msgchamado?: boolean | chamado$msgchamadoArgs<ExtArgs>
    notificacao?: boolean | chamado$notificacaoArgs<ExtArgs>
    _count?: boolean | ChamadoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chamado"]>



  export type chamadoSelectScalar = {
    idChamado?: boolean
    protocolo?: boolean
    assunto?: boolean
    descricao?: boolean
    dataAbertura?: boolean
    dataAtualizacao?: boolean
    dataFechamento?: boolean
    idSolicitante?: boolean
    idAnalista?: boolean
    idTipoChamado?: boolean
    idStatus?: boolean
    idPrioridade?: boolean
  }

  export type chamadoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idChamado" | "protocolo" | "assunto" | "descricao" | "dataAbertura" | "dataAtualizacao" | "dataFechamento" | "idSolicitante" | "idAnalista" | "idTipoChamado" | "idStatus" | "idPrioridade", ExtArgs["result"]["chamado"]>
  export type chamadoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario_chamado_idSolicitanteTousuario?: boolean | chamado$usuario_chamado_idSolicitanteTousuarioArgs<ExtArgs>
    usuario_chamado_idAnalistaTousuario?: boolean | chamado$usuario_chamado_idAnalistaTousuarioArgs<ExtArgs>
    tipochamado?: boolean | chamado$tipochamadoArgs<ExtArgs>
    statuschamado?: boolean | chamado$statuschamadoArgs<ExtArgs>
    prioridadechamado?: boolean | chamado$prioridadechamadoArgs<ExtArgs>
    msgchamado?: boolean | chamado$msgchamadoArgs<ExtArgs>
    notificacao?: boolean | chamado$notificacaoArgs<ExtArgs>
    _count?: boolean | ChamadoCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $chamadoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "chamado"
    objects: {
      usuario_chamado_idSolicitanteTousuario: Prisma.$usuarioPayload<ExtArgs> | null
      usuario_chamado_idAnalistaTousuario: Prisma.$usuarioPayload<ExtArgs> | null
      tipochamado: Prisma.$tipochamadoPayload<ExtArgs> | null
      statuschamado: Prisma.$statuschamadoPayload<ExtArgs> | null
      prioridadechamado: Prisma.$prioridadechamadoPayload<ExtArgs> | null
      msgchamado: Prisma.$msgchamadoPayload<ExtArgs>[]
      notificacao: Prisma.$notificacaoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      idChamado: number
      protocolo: string
      assunto: string
      descricao: string
      dataAbertura: Date
      dataAtualizacao: Date | null
      dataFechamento: Date | null
      idSolicitante: number | null
      idAnalista: number | null
      idTipoChamado: number | null
      idStatus: number | null
      idPrioridade: number | null
    }, ExtArgs["result"]["chamado"]>
    composites: {}
  }

  type chamadoGetPayload<S extends boolean | null | undefined | chamadoDefaultArgs> = $Result.GetResult<Prisma.$chamadoPayload, S>

  type chamadoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<chamadoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChamadoCountAggregateInputType | true
    }

  export interface chamadoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['chamado'], meta: { name: 'chamado' } }
    /**
     * Find zero or one Chamado that matches the filter.
     * @param {chamadoFindUniqueArgs} args - Arguments to find a Chamado
     * @example
     * // Get one Chamado
     * const chamado = await prisma.chamado.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends chamadoFindUniqueArgs>(args: SelectSubset<T, chamadoFindUniqueArgs<ExtArgs>>): Prisma__chamadoClient<$Result.GetResult<Prisma.$chamadoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Chamado that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {chamadoFindUniqueOrThrowArgs} args - Arguments to find a Chamado
     * @example
     * // Get one Chamado
     * const chamado = await prisma.chamado.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends chamadoFindUniqueOrThrowArgs>(args: SelectSubset<T, chamadoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__chamadoClient<$Result.GetResult<Prisma.$chamadoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chamado that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chamadoFindFirstArgs} args - Arguments to find a Chamado
     * @example
     * // Get one Chamado
     * const chamado = await prisma.chamado.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends chamadoFindFirstArgs>(args?: SelectSubset<T, chamadoFindFirstArgs<ExtArgs>>): Prisma__chamadoClient<$Result.GetResult<Prisma.$chamadoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chamado that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chamadoFindFirstOrThrowArgs} args - Arguments to find a Chamado
     * @example
     * // Get one Chamado
     * const chamado = await prisma.chamado.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends chamadoFindFirstOrThrowArgs>(args?: SelectSubset<T, chamadoFindFirstOrThrowArgs<ExtArgs>>): Prisma__chamadoClient<$Result.GetResult<Prisma.$chamadoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Chamados that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chamadoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Chamados
     * const chamados = await prisma.chamado.findMany()
     * 
     * // Get first 10 Chamados
     * const chamados = await prisma.chamado.findMany({ take: 10 })
     * 
     * // Only select the `idChamado`
     * const chamadoWithIdChamadoOnly = await prisma.chamado.findMany({ select: { idChamado: true } })
     * 
     */
    findMany<T extends chamadoFindManyArgs>(args?: SelectSubset<T, chamadoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chamadoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Chamado.
     * @param {chamadoCreateArgs} args - Arguments to create a Chamado.
     * @example
     * // Create one Chamado
     * const Chamado = await prisma.chamado.create({
     *   data: {
     *     // ... data to create a Chamado
     *   }
     * })
     * 
     */
    create<T extends chamadoCreateArgs>(args: SelectSubset<T, chamadoCreateArgs<ExtArgs>>): Prisma__chamadoClient<$Result.GetResult<Prisma.$chamadoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Chamados.
     * @param {chamadoCreateManyArgs} args - Arguments to create many Chamados.
     * @example
     * // Create many Chamados
     * const chamado = await prisma.chamado.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends chamadoCreateManyArgs>(args?: SelectSubset<T, chamadoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Chamado.
     * @param {chamadoDeleteArgs} args - Arguments to delete one Chamado.
     * @example
     * // Delete one Chamado
     * const Chamado = await prisma.chamado.delete({
     *   where: {
     *     // ... filter to delete one Chamado
     *   }
     * })
     * 
     */
    delete<T extends chamadoDeleteArgs>(args: SelectSubset<T, chamadoDeleteArgs<ExtArgs>>): Prisma__chamadoClient<$Result.GetResult<Prisma.$chamadoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Chamado.
     * @param {chamadoUpdateArgs} args - Arguments to update one Chamado.
     * @example
     * // Update one Chamado
     * const chamado = await prisma.chamado.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends chamadoUpdateArgs>(args: SelectSubset<T, chamadoUpdateArgs<ExtArgs>>): Prisma__chamadoClient<$Result.GetResult<Prisma.$chamadoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Chamados.
     * @param {chamadoDeleteManyArgs} args - Arguments to filter Chamados to delete.
     * @example
     * // Delete a few Chamados
     * const { count } = await prisma.chamado.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends chamadoDeleteManyArgs>(args?: SelectSubset<T, chamadoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chamados.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chamadoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Chamados
     * const chamado = await prisma.chamado.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends chamadoUpdateManyArgs>(args: SelectSubset<T, chamadoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Chamado.
     * @param {chamadoUpsertArgs} args - Arguments to update or create a Chamado.
     * @example
     * // Update or create a Chamado
     * const chamado = await prisma.chamado.upsert({
     *   create: {
     *     // ... data to create a Chamado
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chamado we want to update
     *   }
     * })
     */
    upsert<T extends chamadoUpsertArgs>(args: SelectSubset<T, chamadoUpsertArgs<ExtArgs>>): Prisma__chamadoClient<$Result.GetResult<Prisma.$chamadoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Chamados.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chamadoCountArgs} args - Arguments to filter Chamados to count.
     * @example
     * // Count the number of Chamados
     * const count = await prisma.chamado.count({
     *   where: {
     *     // ... the filter for the Chamados we want to count
     *   }
     * })
    **/
    count<T extends chamadoCountArgs>(
      args?: Subset<T, chamadoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChamadoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Chamado.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChamadoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChamadoAggregateArgs>(args: Subset<T, ChamadoAggregateArgs>): Prisma.PrismaPromise<GetChamadoAggregateType<T>>

    /**
     * Group by Chamado.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chamadoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends chamadoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: chamadoGroupByArgs['orderBy'] }
        : { orderBy?: chamadoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, chamadoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChamadoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the chamado model
   */
  readonly fields: chamadoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for chamado.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__chamadoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario_chamado_idSolicitanteTousuario<T extends chamado$usuario_chamado_idSolicitanteTousuarioArgs<ExtArgs> = {}>(args?: Subset<T, chamado$usuario_chamado_idSolicitanteTousuarioArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    usuario_chamado_idAnalistaTousuario<T extends chamado$usuario_chamado_idAnalistaTousuarioArgs<ExtArgs> = {}>(args?: Subset<T, chamado$usuario_chamado_idAnalistaTousuarioArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    tipochamado<T extends chamado$tipochamadoArgs<ExtArgs> = {}>(args?: Subset<T, chamado$tipochamadoArgs<ExtArgs>>): Prisma__tipochamadoClient<$Result.GetResult<Prisma.$tipochamadoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    statuschamado<T extends chamado$statuschamadoArgs<ExtArgs> = {}>(args?: Subset<T, chamado$statuschamadoArgs<ExtArgs>>): Prisma__statuschamadoClient<$Result.GetResult<Prisma.$statuschamadoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    prioridadechamado<T extends chamado$prioridadechamadoArgs<ExtArgs> = {}>(args?: Subset<T, chamado$prioridadechamadoArgs<ExtArgs>>): Prisma__prioridadechamadoClient<$Result.GetResult<Prisma.$prioridadechamadoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    msgchamado<T extends chamado$msgchamadoArgs<ExtArgs> = {}>(args?: Subset<T, chamado$msgchamadoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$msgchamadoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notificacao<T extends chamado$notificacaoArgs<ExtArgs> = {}>(args?: Subset<T, chamado$notificacaoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the chamado model
   */
  interface chamadoFieldRefs {
    readonly idChamado: FieldRef<"chamado", 'Int'>
    readonly protocolo: FieldRef<"chamado", 'String'>
    readonly assunto: FieldRef<"chamado", 'String'>
    readonly descricao: FieldRef<"chamado", 'String'>
    readonly dataAbertura: FieldRef<"chamado", 'DateTime'>
    readonly dataAtualizacao: FieldRef<"chamado", 'DateTime'>
    readonly dataFechamento: FieldRef<"chamado", 'DateTime'>
    readonly idSolicitante: FieldRef<"chamado", 'Int'>
    readonly idAnalista: FieldRef<"chamado", 'Int'>
    readonly idTipoChamado: FieldRef<"chamado", 'Int'>
    readonly idStatus: FieldRef<"chamado", 'Int'>
    readonly idPrioridade: FieldRef<"chamado", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * chamado findUnique
   */
  export type chamadoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chamado
     */
    select?: chamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chamado
     */
    omit?: chamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chamadoInclude<ExtArgs> | null
    /**
     * Filter, which chamado to fetch.
     */
    where: chamadoWhereUniqueInput
  }

  /**
   * chamado findUniqueOrThrow
   */
  export type chamadoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chamado
     */
    select?: chamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chamado
     */
    omit?: chamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chamadoInclude<ExtArgs> | null
    /**
     * Filter, which chamado to fetch.
     */
    where: chamadoWhereUniqueInput
  }

  /**
   * chamado findFirst
   */
  export type chamadoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chamado
     */
    select?: chamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chamado
     */
    omit?: chamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chamadoInclude<ExtArgs> | null
    /**
     * Filter, which chamado to fetch.
     */
    where?: chamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chamados to fetch.
     */
    orderBy?: chamadoOrderByWithRelationInput | chamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for chamados.
     */
    cursor?: chamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chamados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of chamados.
     */
    distinct?: ChamadoScalarFieldEnum | ChamadoScalarFieldEnum[]
  }

  /**
   * chamado findFirstOrThrow
   */
  export type chamadoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chamado
     */
    select?: chamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chamado
     */
    omit?: chamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chamadoInclude<ExtArgs> | null
    /**
     * Filter, which chamado to fetch.
     */
    where?: chamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chamados to fetch.
     */
    orderBy?: chamadoOrderByWithRelationInput | chamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for chamados.
     */
    cursor?: chamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chamados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of chamados.
     */
    distinct?: ChamadoScalarFieldEnum | ChamadoScalarFieldEnum[]
  }

  /**
   * chamado findMany
   */
  export type chamadoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chamado
     */
    select?: chamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chamado
     */
    omit?: chamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chamadoInclude<ExtArgs> | null
    /**
     * Filter, which chamados to fetch.
     */
    where?: chamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chamados to fetch.
     */
    orderBy?: chamadoOrderByWithRelationInput | chamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing chamados.
     */
    cursor?: chamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chamados.
     */
    skip?: number
    distinct?: ChamadoScalarFieldEnum | ChamadoScalarFieldEnum[]
  }

  /**
   * chamado create
   */
  export type chamadoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chamado
     */
    select?: chamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chamado
     */
    omit?: chamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chamadoInclude<ExtArgs> | null
    /**
     * The data needed to create a chamado.
     */
    data: XOR<chamadoCreateInput, chamadoUncheckedCreateInput>
  }

  /**
   * chamado createMany
   */
  export type chamadoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many chamados.
     */
    data: chamadoCreateManyInput | chamadoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * chamado update
   */
  export type chamadoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chamado
     */
    select?: chamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chamado
     */
    omit?: chamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chamadoInclude<ExtArgs> | null
    /**
     * The data needed to update a chamado.
     */
    data: XOR<chamadoUpdateInput, chamadoUncheckedUpdateInput>
    /**
     * Choose, which chamado to update.
     */
    where: chamadoWhereUniqueInput
  }

  /**
   * chamado updateMany
   */
  export type chamadoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update chamados.
     */
    data: XOR<chamadoUpdateManyMutationInput, chamadoUncheckedUpdateManyInput>
    /**
     * Filter which chamados to update
     */
    where?: chamadoWhereInput
    /**
     * Limit how many chamados to update.
     */
    limit?: number
  }

  /**
   * chamado upsert
   */
  export type chamadoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chamado
     */
    select?: chamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chamado
     */
    omit?: chamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chamadoInclude<ExtArgs> | null
    /**
     * The filter to search for the chamado to update in case it exists.
     */
    where: chamadoWhereUniqueInput
    /**
     * In case the chamado found by the `where` argument doesn't exist, create a new chamado with this data.
     */
    create: XOR<chamadoCreateInput, chamadoUncheckedCreateInput>
    /**
     * In case the chamado was found with the provided `where` argument, update it with this data.
     */
    update: XOR<chamadoUpdateInput, chamadoUncheckedUpdateInput>
  }

  /**
   * chamado delete
   */
  export type chamadoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chamado
     */
    select?: chamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chamado
     */
    omit?: chamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chamadoInclude<ExtArgs> | null
    /**
     * Filter which chamado to delete.
     */
    where: chamadoWhereUniqueInput
  }

  /**
   * chamado deleteMany
   */
  export type chamadoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which chamados to delete
     */
    where?: chamadoWhereInput
    /**
     * Limit how many chamados to delete.
     */
    limit?: number
  }

  /**
   * chamado.usuario_chamado_idSolicitanteTousuario
   */
  export type chamado$usuario_chamado_idSolicitanteTousuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    where?: usuarioWhereInput
  }

  /**
   * chamado.usuario_chamado_idAnalistaTousuario
   */
  export type chamado$usuario_chamado_idAnalistaTousuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    where?: usuarioWhereInput
  }

  /**
   * chamado.tipochamado
   */
  export type chamado$tipochamadoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipochamado
     */
    select?: tipochamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipochamado
     */
    omit?: tipochamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipochamadoInclude<ExtArgs> | null
    where?: tipochamadoWhereInput
  }

  /**
   * chamado.statuschamado
   */
  export type chamado$statuschamadoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the statuschamado
     */
    select?: statuschamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the statuschamado
     */
    omit?: statuschamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: statuschamadoInclude<ExtArgs> | null
    where?: statuschamadoWhereInput
  }

  /**
   * chamado.prioridadechamado
   */
  export type chamado$prioridadechamadoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prioridadechamado
     */
    select?: prioridadechamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prioridadechamado
     */
    omit?: prioridadechamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prioridadechamadoInclude<ExtArgs> | null
    where?: prioridadechamadoWhereInput
  }

  /**
   * chamado.msgchamado
   */
  export type chamado$msgchamadoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the msgchamado
     */
    select?: msgchamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the msgchamado
     */
    omit?: msgchamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: msgchamadoInclude<ExtArgs> | null
    where?: msgchamadoWhereInput
    orderBy?: msgchamadoOrderByWithRelationInput | msgchamadoOrderByWithRelationInput[]
    cursor?: msgchamadoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MsgchamadoScalarFieldEnum | MsgchamadoScalarFieldEnum[]
  }

  /**
   * chamado.notificacao
   */
  export type chamado$notificacaoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notificacao
     */
    select?: notificacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notificacao
     */
    omit?: notificacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificacaoInclude<ExtArgs> | null
    where?: notificacaoWhereInput
    orderBy?: notificacaoOrderByWithRelationInput | notificacaoOrderByWithRelationInput[]
    cursor?: notificacaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificacaoScalarFieldEnum | NotificacaoScalarFieldEnum[]
  }

  /**
   * chamado without action
   */
  export type chamadoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chamado
     */
    select?: chamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chamado
     */
    omit?: chamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chamadoInclude<ExtArgs> | null
  }


  /**
   * Model gerencia
   */

  export type AggregateGerencia = {
    _count: GerenciaCountAggregateOutputType | null
    _avg: GerenciaAvgAggregateOutputType | null
    _sum: GerenciaSumAggregateOutputType | null
    _min: GerenciaMinAggregateOutputType | null
    _max: GerenciaMaxAggregateOutputType | null
  }

  export type GerenciaAvgAggregateOutputType = {
    idGerencia: number | null
    ativo: number | null
  }

  export type GerenciaSumAggregateOutputType = {
    idGerencia: number | null
    ativo: number | null
  }

  export type GerenciaMinAggregateOutputType = {
    idGerencia: number | null
    nomeGerencia: string | null
    ativo: number | null
  }

  export type GerenciaMaxAggregateOutputType = {
    idGerencia: number | null
    nomeGerencia: string | null
    ativo: number | null
  }

  export type GerenciaCountAggregateOutputType = {
    idGerencia: number
    nomeGerencia: number
    ativo: number
    _all: number
  }


  export type GerenciaAvgAggregateInputType = {
    idGerencia?: true
    ativo?: true
  }

  export type GerenciaSumAggregateInputType = {
    idGerencia?: true
    ativo?: true
  }

  export type GerenciaMinAggregateInputType = {
    idGerencia?: true
    nomeGerencia?: true
    ativo?: true
  }

  export type GerenciaMaxAggregateInputType = {
    idGerencia?: true
    nomeGerencia?: true
    ativo?: true
  }

  export type GerenciaCountAggregateInputType = {
    idGerencia?: true
    nomeGerencia?: true
    ativo?: true
    _all?: true
  }

  export type GerenciaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which gerencia to aggregate.
     */
    where?: gerenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of gerencias to fetch.
     */
    orderBy?: gerenciaOrderByWithRelationInput | gerenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: gerenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` gerencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` gerencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned gerencias
    **/
    _count?: true | GerenciaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GerenciaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GerenciaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GerenciaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GerenciaMaxAggregateInputType
  }

  export type GetGerenciaAggregateType<T extends GerenciaAggregateArgs> = {
        [P in keyof T & keyof AggregateGerencia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGerencia[P]>
      : GetScalarType<T[P], AggregateGerencia[P]>
  }




  export type gerenciaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: gerenciaWhereInput
    orderBy?: gerenciaOrderByWithAggregationInput | gerenciaOrderByWithAggregationInput[]
    by: GerenciaScalarFieldEnum[] | GerenciaScalarFieldEnum
    having?: gerenciaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GerenciaCountAggregateInputType | true
    _avg?: GerenciaAvgAggregateInputType
    _sum?: GerenciaSumAggregateInputType
    _min?: GerenciaMinAggregateInputType
    _max?: GerenciaMaxAggregateInputType
  }

  export type GerenciaGroupByOutputType = {
    idGerencia: number
    nomeGerencia: string
    ativo: number
    _count: GerenciaCountAggregateOutputType | null
    _avg: GerenciaAvgAggregateOutputType | null
    _sum: GerenciaSumAggregateOutputType | null
    _min: GerenciaMinAggregateOutputType | null
    _max: GerenciaMaxAggregateOutputType | null
  }

  type GetGerenciaGroupByPayload<T extends gerenciaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GerenciaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GerenciaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GerenciaGroupByOutputType[P]>
            : GetScalarType<T[P], GerenciaGroupByOutputType[P]>
        }
      >
    >


  export type gerenciaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idGerencia?: boolean
    nomeGerencia?: boolean
    ativo?: boolean
    usuario?: boolean | gerencia$usuarioArgs<ExtArgs>
    _count?: boolean | GerenciaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gerencia"]>



  export type gerenciaSelectScalar = {
    idGerencia?: boolean
    nomeGerencia?: boolean
    ativo?: boolean
  }

  export type gerenciaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idGerencia" | "nomeGerencia" | "ativo", ExtArgs["result"]["gerencia"]>
  export type gerenciaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | gerencia$usuarioArgs<ExtArgs>
    _count?: boolean | GerenciaCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $gerenciaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "gerencia"
    objects: {
      usuario: Prisma.$usuarioPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      idGerencia: number
      nomeGerencia: string
      ativo: number
    }, ExtArgs["result"]["gerencia"]>
    composites: {}
  }

  type gerenciaGetPayload<S extends boolean | null | undefined | gerenciaDefaultArgs> = $Result.GetResult<Prisma.$gerenciaPayload, S>

  type gerenciaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<gerenciaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GerenciaCountAggregateInputType | true
    }

  export interface gerenciaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['gerencia'], meta: { name: 'gerencia' } }
    /**
     * Find zero or one Gerencia that matches the filter.
     * @param {gerenciaFindUniqueArgs} args - Arguments to find a Gerencia
     * @example
     * // Get one Gerencia
     * const gerencia = await prisma.gerencia.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends gerenciaFindUniqueArgs>(args: SelectSubset<T, gerenciaFindUniqueArgs<ExtArgs>>): Prisma__gerenciaClient<$Result.GetResult<Prisma.$gerenciaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Gerencia that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {gerenciaFindUniqueOrThrowArgs} args - Arguments to find a Gerencia
     * @example
     * // Get one Gerencia
     * const gerencia = await prisma.gerencia.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends gerenciaFindUniqueOrThrowArgs>(args: SelectSubset<T, gerenciaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__gerenciaClient<$Result.GetResult<Prisma.$gerenciaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Gerencia that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {gerenciaFindFirstArgs} args - Arguments to find a Gerencia
     * @example
     * // Get one Gerencia
     * const gerencia = await prisma.gerencia.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends gerenciaFindFirstArgs>(args?: SelectSubset<T, gerenciaFindFirstArgs<ExtArgs>>): Prisma__gerenciaClient<$Result.GetResult<Prisma.$gerenciaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Gerencia that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {gerenciaFindFirstOrThrowArgs} args - Arguments to find a Gerencia
     * @example
     * // Get one Gerencia
     * const gerencia = await prisma.gerencia.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends gerenciaFindFirstOrThrowArgs>(args?: SelectSubset<T, gerenciaFindFirstOrThrowArgs<ExtArgs>>): Prisma__gerenciaClient<$Result.GetResult<Prisma.$gerenciaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Gerencias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {gerenciaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Gerencias
     * const gerencias = await prisma.gerencia.findMany()
     * 
     * // Get first 10 Gerencias
     * const gerencias = await prisma.gerencia.findMany({ take: 10 })
     * 
     * // Only select the `idGerencia`
     * const gerenciaWithIdGerenciaOnly = await prisma.gerencia.findMany({ select: { idGerencia: true } })
     * 
     */
    findMany<T extends gerenciaFindManyArgs>(args?: SelectSubset<T, gerenciaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$gerenciaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Gerencia.
     * @param {gerenciaCreateArgs} args - Arguments to create a Gerencia.
     * @example
     * // Create one Gerencia
     * const Gerencia = await prisma.gerencia.create({
     *   data: {
     *     // ... data to create a Gerencia
     *   }
     * })
     * 
     */
    create<T extends gerenciaCreateArgs>(args: SelectSubset<T, gerenciaCreateArgs<ExtArgs>>): Prisma__gerenciaClient<$Result.GetResult<Prisma.$gerenciaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Gerencias.
     * @param {gerenciaCreateManyArgs} args - Arguments to create many Gerencias.
     * @example
     * // Create many Gerencias
     * const gerencia = await prisma.gerencia.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends gerenciaCreateManyArgs>(args?: SelectSubset<T, gerenciaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Gerencia.
     * @param {gerenciaDeleteArgs} args - Arguments to delete one Gerencia.
     * @example
     * // Delete one Gerencia
     * const Gerencia = await prisma.gerencia.delete({
     *   where: {
     *     // ... filter to delete one Gerencia
     *   }
     * })
     * 
     */
    delete<T extends gerenciaDeleteArgs>(args: SelectSubset<T, gerenciaDeleteArgs<ExtArgs>>): Prisma__gerenciaClient<$Result.GetResult<Prisma.$gerenciaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Gerencia.
     * @param {gerenciaUpdateArgs} args - Arguments to update one Gerencia.
     * @example
     * // Update one Gerencia
     * const gerencia = await prisma.gerencia.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends gerenciaUpdateArgs>(args: SelectSubset<T, gerenciaUpdateArgs<ExtArgs>>): Prisma__gerenciaClient<$Result.GetResult<Prisma.$gerenciaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Gerencias.
     * @param {gerenciaDeleteManyArgs} args - Arguments to filter Gerencias to delete.
     * @example
     * // Delete a few Gerencias
     * const { count } = await prisma.gerencia.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends gerenciaDeleteManyArgs>(args?: SelectSubset<T, gerenciaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Gerencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {gerenciaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Gerencias
     * const gerencia = await prisma.gerencia.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends gerenciaUpdateManyArgs>(args: SelectSubset<T, gerenciaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Gerencia.
     * @param {gerenciaUpsertArgs} args - Arguments to update or create a Gerencia.
     * @example
     * // Update or create a Gerencia
     * const gerencia = await prisma.gerencia.upsert({
     *   create: {
     *     // ... data to create a Gerencia
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Gerencia we want to update
     *   }
     * })
     */
    upsert<T extends gerenciaUpsertArgs>(args: SelectSubset<T, gerenciaUpsertArgs<ExtArgs>>): Prisma__gerenciaClient<$Result.GetResult<Prisma.$gerenciaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Gerencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {gerenciaCountArgs} args - Arguments to filter Gerencias to count.
     * @example
     * // Count the number of Gerencias
     * const count = await prisma.gerencia.count({
     *   where: {
     *     // ... the filter for the Gerencias we want to count
     *   }
     * })
    **/
    count<T extends gerenciaCountArgs>(
      args?: Subset<T, gerenciaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GerenciaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Gerencia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GerenciaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GerenciaAggregateArgs>(args: Subset<T, GerenciaAggregateArgs>): Prisma.PrismaPromise<GetGerenciaAggregateType<T>>

    /**
     * Group by Gerencia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {gerenciaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends gerenciaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: gerenciaGroupByArgs['orderBy'] }
        : { orderBy?: gerenciaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, gerenciaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGerenciaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the gerencia model
   */
  readonly fields: gerenciaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for gerencia.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__gerenciaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends gerencia$usuarioArgs<ExtArgs> = {}>(args?: Subset<T, gerencia$usuarioArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the gerencia model
   */
  interface gerenciaFieldRefs {
    readonly idGerencia: FieldRef<"gerencia", 'Int'>
    readonly nomeGerencia: FieldRef<"gerencia", 'String'>
    readonly ativo: FieldRef<"gerencia", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * gerencia findUnique
   */
  export type gerenciaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gerencia
     */
    select?: gerenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the gerencia
     */
    omit?: gerenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: gerenciaInclude<ExtArgs> | null
    /**
     * Filter, which gerencia to fetch.
     */
    where: gerenciaWhereUniqueInput
  }

  /**
   * gerencia findUniqueOrThrow
   */
  export type gerenciaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gerencia
     */
    select?: gerenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the gerencia
     */
    omit?: gerenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: gerenciaInclude<ExtArgs> | null
    /**
     * Filter, which gerencia to fetch.
     */
    where: gerenciaWhereUniqueInput
  }

  /**
   * gerencia findFirst
   */
  export type gerenciaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gerencia
     */
    select?: gerenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the gerencia
     */
    omit?: gerenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: gerenciaInclude<ExtArgs> | null
    /**
     * Filter, which gerencia to fetch.
     */
    where?: gerenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of gerencias to fetch.
     */
    orderBy?: gerenciaOrderByWithRelationInput | gerenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for gerencias.
     */
    cursor?: gerenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` gerencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` gerencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of gerencias.
     */
    distinct?: GerenciaScalarFieldEnum | GerenciaScalarFieldEnum[]
  }

  /**
   * gerencia findFirstOrThrow
   */
  export type gerenciaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gerencia
     */
    select?: gerenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the gerencia
     */
    omit?: gerenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: gerenciaInclude<ExtArgs> | null
    /**
     * Filter, which gerencia to fetch.
     */
    where?: gerenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of gerencias to fetch.
     */
    orderBy?: gerenciaOrderByWithRelationInput | gerenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for gerencias.
     */
    cursor?: gerenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` gerencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` gerencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of gerencias.
     */
    distinct?: GerenciaScalarFieldEnum | GerenciaScalarFieldEnum[]
  }

  /**
   * gerencia findMany
   */
  export type gerenciaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gerencia
     */
    select?: gerenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the gerencia
     */
    omit?: gerenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: gerenciaInclude<ExtArgs> | null
    /**
     * Filter, which gerencias to fetch.
     */
    where?: gerenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of gerencias to fetch.
     */
    orderBy?: gerenciaOrderByWithRelationInput | gerenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing gerencias.
     */
    cursor?: gerenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` gerencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` gerencias.
     */
    skip?: number
    distinct?: GerenciaScalarFieldEnum | GerenciaScalarFieldEnum[]
  }

  /**
   * gerencia create
   */
  export type gerenciaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gerencia
     */
    select?: gerenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the gerencia
     */
    omit?: gerenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: gerenciaInclude<ExtArgs> | null
    /**
     * The data needed to create a gerencia.
     */
    data: XOR<gerenciaCreateInput, gerenciaUncheckedCreateInput>
  }

  /**
   * gerencia createMany
   */
  export type gerenciaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many gerencias.
     */
    data: gerenciaCreateManyInput | gerenciaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * gerencia update
   */
  export type gerenciaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gerencia
     */
    select?: gerenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the gerencia
     */
    omit?: gerenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: gerenciaInclude<ExtArgs> | null
    /**
     * The data needed to update a gerencia.
     */
    data: XOR<gerenciaUpdateInput, gerenciaUncheckedUpdateInput>
    /**
     * Choose, which gerencia to update.
     */
    where: gerenciaWhereUniqueInput
  }

  /**
   * gerencia updateMany
   */
  export type gerenciaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update gerencias.
     */
    data: XOR<gerenciaUpdateManyMutationInput, gerenciaUncheckedUpdateManyInput>
    /**
     * Filter which gerencias to update
     */
    where?: gerenciaWhereInput
    /**
     * Limit how many gerencias to update.
     */
    limit?: number
  }

  /**
   * gerencia upsert
   */
  export type gerenciaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gerencia
     */
    select?: gerenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the gerencia
     */
    omit?: gerenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: gerenciaInclude<ExtArgs> | null
    /**
     * The filter to search for the gerencia to update in case it exists.
     */
    where: gerenciaWhereUniqueInput
    /**
     * In case the gerencia found by the `where` argument doesn't exist, create a new gerencia with this data.
     */
    create: XOR<gerenciaCreateInput, gerenciaUncheckedCreateInput>
    /**
     * In case the gerencia was found with the provided `where` argument, update it with this data.
     */
    update: XOR<gerenciaUpdateInput, gerenciaUncheckedUpdateInput>
  }

  /**
   * gerencia delete
   */
  export type gerenciaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gerencia
     */
    select?: gerenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the gerencia
     */
    omit?: gerenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: gerenciaInclude<ExtArgs> | null
    /**
     * Filter which gerencia to delete.
     */
    where: gerenciaWhereUniqueInput
  }

  /**
   * gerencia deleteMany
   */
  export type gerenciaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which gerencias to delete
     */
    where?: gerenciaWhereInput
    /**
     * Limit how many gerencias to delete.
     */
    limit?: number
  }

  /**
   * gerencia.usuario
   */
  export type gerencia$usuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    where?: usuarioWhereInput
    orderBy?: usuarioOrderByWithRelationInput | usuarioOrderByWithRelationInput[]
    cursor?: usuarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * gerencia without action
   */
  export type gerenciaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gerencia
     */
    select?: gerenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the gerencia
     */
    omit?: gerenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: gerenciaInclude<ExtArgs> | null
  }


  /**
   * Model logatividade
   */

  export type AggregateLogatividade = {
    _count: LogatividadeCountAggregateOutputType | null
    _avg: LogatividadeAvgAggregateOutputType | null
    _sum: LogatividadeSumAggregateOutputType | null
    _min: LogatividadeMinAggregateOutputType | null
    _max: LogatividadeMaxAggregateOutputType | null
  }

  export type LogatividadeAvgAggregateOutputType = {
    idLog: number | null
    idUsuario: number | null
  }

  export type LogatividadeSumAggregateOutputType = {
    idLog: number | null
    idUsuario: number | null
  }

  export type LogatividadeMinAggregateOutputType = {
    idLog: number | null
    descricao: string | null
    dataHora: Date | null
    idUsuario: number | null
  }

  export type LogatividadeMaxAggregateOutputType = {
    idLog: number | null
    descricao: string | null
    dataHora: Date | null
    idUsuario: number | null
  }

  export type LogatividadeCountAggregateOutputType = {
    idLog: number
    descricao: number
    dataHora: number
    idUsuario: number
    _all: number
  }


  export type LogatividadeAvgAggregateInputType = {
    idLog?: true
    idUsuario?: true
  }

  export type LogatividadeSumAggregateInputType = {
    idLog?: true
    idUsuario?: true
  }

  export type LogatividadeMinAggregateInputType = {
    idLog?: true
    descricao?: true
    dataHora?: true
    idUsuario?: true
  }

  export type LogatividadeMaxAggregateInputType = {
    idLog?: true
    descricao?: true
    dataHora?: true
    idUsuario?: true
  }

  export type LogatividadeCountAggregateInputType = {
    idLog?: true
    descricao?: true
    dataHora?: true
    idUsuario?: true
    _all?: true
  }

  export type LogatividadeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which logatividade to aggregate.
     */
    where?: logatividadeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of logatividades to fetch.
     */
    orderBy?: logatividadeOrderByWithRelationInput | logatividadeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: logatividadeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` logatividades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` logatividades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned logatividades
    **/
    _count?: true | LogatividadeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LogatividadeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LogatividadeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LogatividadeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LogatividadeMaxAggregateInputType
  }

  export type GetLogatividadeAggregateType<T extends LogatividadeAggregateArgs> = {
        [P in keyof T & keyof AggregateLogatividade]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLogatividade[P]>
      : GetScalarType<T[P], AggregateLogatividade[P]>
  }




  export type logatividadeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: logatividadeWhereInput
    orderBy?: logatividadeOrderByWithAggregationInput | logatividadeOrderByWithAggregationInput[]
    by: LogatividadeScalarFieldEnum[] | LogatividadeScalarFieldEnum
    having?: logatividadeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LogatividadeCountAggregateInputType | true
    _avg?: LogatividadeAvgAggregateInputType
    _sum?: LogatividadeSumAggregateInputType
    _min?: LogatividadeMinAggregateInputType
    _max?: LogatividadeMaxAggregateInputType
  }

  export type LogatividadeGroupByOutputType = {
    idLog: number
    descricao: string
    dataHora: Date | null
    idUsuario: number | null
    _count: LogatividadeCountAggregateOutputType | null
    _avg: LogatividadeAvgAggregateOutputType | null
    _sum: LogatividadeSumAggregateOutputType | null
    _min: LogatividadeMinAggregateOutputType | null
    _max: LogatividadeMaxAggregateOutputType | null
  }

  type GetLogatividadeGroupByPayload<T extends logatividadeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LogatividadeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LogatividadeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LogatividadeGroupByOutputType[P]>
            : GetScalarType<T[P], LogatividadeGroupByOutputType[P]>
        }
      >
    >


  export type logatividadeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idLog?: boolean
    descricao?: boolean
    dataHora?: boolean
    idUsuario?: boolean
    usuario?: boolean | logatividade$usuarioArgs<ExtArgs>
  }, ExtArgs["result"]["logatividade"]>



  export type logatividadeSelectScalar = {
    idLog?: boolean
    descricao?: boolean
    dataHora?: boolean
    idUsuario?: boolean
  }

  export type logatividadeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idLog" | "descricao" | "dataHora" | "idUsuario", ExtArgs["result"]["logatividade"]>
  export type logatividadeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | logatividade$usuarioArgs<ExtArgs>
  }

  export type $logatividadePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "logatividade"
    objects: {
      usuario: Prisma.$usuarioPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      idLog: number
      descricao: string
      dataHora: Date | null
      idUsuario: number | null
    }, ExtArgs["result"]["logatividade"]>
    composites: {}
  }

  type logatividadeGetPayload<S extends boolean | null | undefined | logatividadeDefaultArgs> = $Result.GetResult<Prisma.$logatividadePayload, S>

  type logatividadeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<logatividadeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LogatividadeCountAggregateInputType | true
    }

  export interface logatividadeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['logatividade'], meta: { name: 'logatividade' } }
    /**
     * Find zero or one Logatividade that matches the filter.
     * @param {logatividadeFindUniqueArgs} args - Arguments to find a Logatividade
     * @example
     * // Get one Logatividade
     * const logatividade = await prisma.logatividade.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends logatividadeFindUniqueArgs>(args: SelectSubset<T, logatividadeFindUniqueArgs<ExtArgs>>): Prisma__logatividadeClient<$Result.GetResult<Prisma.$logatividadePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Logatividade that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {logatividadeFindUniqueOrThrowArgs} args - Arguments to find a Logatividade
     * @example
     * // Get one Logatividade
     * const logatividade = await prisma.logatividade.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends logatividadeFindUniqueOrThrowArgs>(args: SelectSubset<T, logatividadeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__logatividadeClient<$Result.GetResult<Prisma.$logatividadePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Logatividade that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {logatividadeFindFirstArgs} args - Arguments to find a Logatividade
     * @example
     * // Get one Logatividade
     * const logatividade = await prisma.logatividade.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends logatividadeFindFirstArgs>(args?: SelectSubset<T, logatividadeFindFirstArgs<ExtArgs>>): Prisma__logatividadeClient<$Result.GetResult<Prisma.$logatividadePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Logatividade that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {logatividadeFindFirstOrThrowArgs} args - Arguments to find a Logatividade
     * @example
     * // Get one Logatividade
     * const logatividade = await prisma.logatividade.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends logatividadeFindFirstOrThrowArgs>(args?: SelectSubset<T, logatividadeFindFirstOrThrowArgs<ExtArgs>>): Prisma__logatividadeClient<$Result.GetResult<Prisma.$logatividadePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Logatividades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {logatividadeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Logatividades
     * const logatividades = await prisma.logatividade.findMany()
     * 
     * // Get first 10 Logatividades
     * const logatividades = await prisma.logatividade.findMany({ take: 10 })
     * 
     * // Only select the `idLog`
     * const logatividadeWithIdLogOnly = await prisma.logatividade.findMany({ select: { idLog: true } })
     * 
     */
    findMany<T extends logatividadeFindManyArgs>(args?: SelectSubset<T, logatividadeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$logatividadePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Logatividade.
     * @param {logatividadeCreateArgs} args - Arguments to create a Logatividade.
     * @example
     * // Create one Logatividade
     * const Logatividade = await prisma.logatividade.create({
     *   data: {
     *     // ... data to create a Logatividade
     *   }
     * })
     * 
     */
    create<T extends logatividadeCreateArgs>(args: SelectSubset<T, logatividadeCreateArgs<ExtArgs>>): Prisma__logatividadeClient<$Result.GetResult<Prisma.$logatividadePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Logatividades.
     * @param {logatividadeCreateManyArgs} args - Arguments to create many Logatividades.
     * @example
     * // Create many Logatividades
     * const logatividade = await prisma.logatividade.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends logatividadeCreateManyArgs>(args?: SelectSubset<T, logatividadeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Logatividade.
     * @param {logatividadeDeleteArgs} args - Arguments to delete one Logatividade.
     * @example
     * // Delete one Logatividade
     * const Logatividade = await prisma.logatividade.delete({
     *   where: {
     *     // ... filter to delete one Logatividade
     *   }
     * })
     * 
     */
    delete<T extends logatividadeDeleteArgs>(args: SelectSubset<T, logatividadeDeleteArgs<ExtArgs>>): Prisma__logatividadeClient<$Result.GetResult<Prisma.$logatividadePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Logatividade.
     * @param {logatividadeUpdateArgs} args - Arguments to update one Logatividade.
     * @example
     * // Update one Logatividade
     * const logatividade = await prisma.logatividade.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends logatividadeUpdateArgs>(args: SelectSubset<T, logatividadeUpdateArgs<ExtArgs>>): Prisma__logatividadeClient<$Result.GetResult<Prisma.$logatividadePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Logatividades.
     * @param {logatividadeDeleteManyArgs} args - Arguments to filter Logatividades to delete.
     * @example
     * // Delete a few Logatividades
     * const { count } = await prisma.logatividade.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends logatividadeDeleteManyArgs>(args?: SelectSubset<T, logatividadeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Logatividades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {logatividadeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Logatividades
     * const logatividade = await prisma.logatividade.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends logatividadeUpdateManyArgs>(args: SelectSubset<T, logatividadeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Logatividade.
     * @param {logatividadeUpsertArgs} args - Arguments to update or create a Logatividade.
     * @example
     * // Update or create a Logatividade
     * const logatividade = await prisma.logatividade.upsert({
     *   create: {
     *     // ... data to create a Logatividade
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Logatividade we want to update
     *   }
     * })
     */
    upsert<T extends logatividadeUpsertArgs>(args: SelectSubset<T, logatividadeUpsertArgs<ExtArgs>>): Prisma__logatividadeClient<$Result.GetResult<Prisma.$logatividadePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Logatividades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {logatividadeCountArgs} args - Arguments to filter Logatividades to count.
     * @example
     * // Count the number of Logatividades
     * const count = await prisma.logatividade.count({
     *   where: {
     *     // ... the filter for the Logatividades we want to count
     *   }
     * })
    **/
    count<T extends logatividadeCountArgs>(
      args?: Subset<T, logatividadeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LogatividadeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Logatividade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogatividadeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LogatividadeAggregateArgs>(args: Subset<T, LogatividadeAggregateArgs>): Prisma.PrismaPromise<GetLogatividadeAggregateType<T>>

    /**
     * Group by Logatividade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {logatividadeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends logatividadeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: logatividadeGroupByArgs['orderBy'] }
        : { orderBy?: logatividadeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, logatividadeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLogatividadeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the logatividade model
   */
  readonly fields: logatividadeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for logatividade.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__logatividadeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends logatividade$usuarioArgs<ExtArgs> = {}>(args?: Subset<T, logatividade$usuarioArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the logatividade model
   */
  interface logatividadeFieldRefs {
    readonly idLog: FieldRef<"logatividade", 'Int'>
    readonly descricao: FieldRef<"logatividade", 'String'>
    readonly dataHora: FieldRef<"logatividade", 'DateTime'>
    readonly idUsuario: FieldRef<"logatividade", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * logatividade findUnique
   */
  export type logatividadeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logatividade
     */
    select?: logatividadeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the logatividade
     */
    omit?: logatividadeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: logatividadeInclude<ExtArgs> | null
    /**
     * Filter, which logatividade to fetch.
     */
    where: logatividadeWhereUniqueInput
  }

  /**
   * logatividade findUniqueOrThrow
   */
  export type logatividadeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logatividade
     */
    select?: logatividadeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the logatividade
     */
    omit?: logatividadeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: logatividadeInclude<ExtArgs> | null
    /**
     * Filter, which logatividade to fetch.
     */
    where: logatividadeWhereUniqueInput
  }

  /**
   * logatividade findFirst
   */
  export type logatividadeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logatividade
     */
    select?: logatividadeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the logatividade
     */
    omit?: logatividadeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: logatividadeInclude<ExtArgs> | null
    /**
     * Filter, which logatividade to fetch.
     */
    where?: logatividadeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of logatividades to fetch.
     */
    orderBy?: logatividadeOrderByWithRelationInput | logatividadeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for logatividades.
     */
    cursor?: logatividadeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` logatividades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` logatividades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of logatividades.
     */
    distinct?: LogatividadeScalarFieldEnum | LogatividadeScalarFieldEnum[]
  }

  /**
   * logatividade findFirstOrThrow
   */
  export type logatividadeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logatividade
     */
    select?: logatividadeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the logatividade
     */
    omit?: logatividadeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: logatividadeInclude<ExtArgs> | null
    /**
     * Filter, which logatividade to fetch.
     */
    where?: logatividadeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of logatividades to fetch.
     */
    orderBy?: logatividadeOrderByWithRelationInput | logatividadeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for logatividades.
     */
    cursor?: logatividadeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` logatividades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` logatividades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of logatividades.
     */
    distinct?: LogatividadeScalarFieldEnum | LogatividadeScalarFieldEnum[]
  }

  /**
   * logatividade findMany
   */
  export type logatividadeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logatividade
     */
    select?: logatividadeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the logatividade
     */
    omit?: logatividadeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: logatividadeInclude<ExtArgs> | null
    /**
     * Filter, which logatividades to fetch.
     */
    where?: logatividadeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of logatividades to fetch.
     */
    orderBy?: logatividadeOrderByWithRelationInput | logatividadeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing logatividades.
     */
    cursor?: logatividadeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` logatividades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` logatividades.
     */
    skip?: number
    distinct?: LogatividadeScalarFieldEnum | LogatividadeScalarFieldEnum[]
  }

  /**
   * logatividade create
   */
  export type logatividadeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logatividade
     */
    select?: logatividadeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the logatividade
     */
    omit?: logatividadeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: logatividadeInclude<ExtArgs> | null
    /**
     * The data needed to create a logatividade.
     */
    data: XOR<logatividadeCreateInput, logatividadeUncheckedCreateInput>
  }

  /**
   * logatividade createMany
   */
  export type logatividadeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many logatividades.
     */
    data: logatividadeCreateManyInput | logatividadeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * logatividade update
   */
  export type logatividadeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logatividade
     */
    select?: logatividadeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the logatividade
     */
    omit?: logatividadeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: logatividadeInclude<ExtArgs> | null
    /**
     * The data needed to update a logatividade.
     */
    data: XOR<logatividadeUpdateInput, logatividadeUncheckedUpdateInput>
    /**
     * Choose, which logatividade to update.
     */
    where: logatividadeWhereUniqueInput
  }

  /**
   * logatividade updateMany
   */
  export type logatividadeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update logatividades.
     */
    data: XOR<logatividadeUpdateManyMutationInput, logatividadeUncheckedUpdateManyInput>
    /**
     * Filter which logatividades to update
     */
    where?: logatividadeWhereInput
    /**
     * Limit how many logatividades to update.
     */
    limit?: number
  }

  /**
   * logatividade upsert
   */
  export type logatividadeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logatividade
     */
    select?: logatividadeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the logatividade
     */
    omit?: logatividadeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: logatividadeInclude<ExtArgs> | null
    /**
     * The filter to search for the logatividade to update in case it exists.
     */
    where: logatividadeWhereUniqueInput
    /**
     * In case the logatividade found by the `where` argument doesn't exist, create a new logatividade with this data.
     */
    create: XOR<logatividadeCreateInput, logatividadeUncheckedCreateInput>
    /**
     * In case the logatividade was found with the provided `where` argument, update it with this data.
     */
    update: XOR<logatividadeUpdateInput, logatividadeUncheckedUpdateInput>
  }

  /**
   * logatividade delete
   */
  export type logatividadeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logatividade
     */
    select?: logatividadeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the logatividade
     */
    omit?: logatividadeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: logatividadeInclude<ExtArgs> | null
    /**
     * Filter which logatividade to delete.
     */
    where: logatividadeWhereUniqueInput
  }

  /**
   * logatividade deleteMany
   */
  export type logatividadeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which logatividades to delete
     */
    where?: logatividadeWhereInput
    /**
     * Limit how many logatividades to delete.
     */
    limit?: number
  }

  /**
   * logatividade.usuario
   */
  export type logatividade$usuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    where?: usuarioWhereInput
  }

  /**
   * logatividade without action
   */
  export type logatividadeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logatividade
     */
    select?: logatividadeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the logatividade
     */
    omit?: logatividadeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: logatividadeInclude<ExtArgs> | null
  }


  /**
   * Model msgchamado
   */

  export type AggregateMsgchamado = {
    _count: MsgchamadoCountAggregateOutputType | null
    _avg: MsgchamadoAvgAggregateOutputType | null
    _sum: MsgchamadoSumAggregateOutputType | null
    _min: MsgchamadoMinAggregateOutputType | null
    _max: MsgchamadoMaxAggregateOutputType | null
  }

  export type MsgchamadoAvgAggregateOutputType = {
    idMensagem: number | null
    idChamado: number | null
    idRemetente: number | null
  }

  export type MsgchamadoSumAggregateOutputType = {
    idMensagem: number | null
    idChamado: number | null
    idRemetente: number | null
  }

  export type MsgchamadoMinAggregateOutputType = {
    idMensagem: number | null
    mensagem: string | null
    timestamp: Date | null
    remetente: $Enums.msgchamado_remetente | null
    urlAnexo: string | null
    nomeArquivo: string | null
    idChamado: number | null
    idRemetente: number | null
  }

  export type MsgchamadoMaxAggregateOutputType = {
    idMensagem: number | null
    mensagem: string | null
    timestamp: Date | null
    remetente: $Enums.msgchamado_remetente | null
    urlAnexo: string | null
    nomeArquivo: string | null
    idChamado: number | null
    idRemetente: number | null
  }

  export type MsgchamadoCountAggregateOutputType = {
    idMensagem: number
    mensagem: number
    timestamp: number
    remetente: number
    urlAnexo: number
    nomeArquivo: number
    idChamado: number
    idRemetente: number
    _all: number
  }


  export type MsgchamadoAvgAggregateInputType = {
    idMensagem?: true
    idChamado?: true
    idRemetente?: true
  }

  export type MsgchamadoSumAggregateInputType = {
    idMensagem?: true
    idChamado?: true
    idRemetente?: true
  }

  export type MsgchamadoMinAggregateInputType = {
    idMensagem?: true
    mensagem?: true
    timestamp?: true
    remetente?: true
    urlAnexo?: true
    nomeArquivo?: true
    idChamado?: true
    idRemetente?: true
  }

  export type MsgchamadoMaxAggregateInputType = {
    idMensagem?: true
    mensagem?: true
    timestamp?: true
    remetente?: true
    urlAnexo?: true
    nomeArquivo?: true
    idChamado?: true
    idRemetente?: true
  }

  export type MsgchamadoCountAggregateInputType = {
    idMensagem?: true
    mensagem?: true
    timestamp?: true
    remetente?: true
    urlAnexo?: true
    nomeArquivo?: true
    idChamado?: true
    idRemetente?: true
    _all?: true
  }

  export type MsgchamadoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which msgchamado to aggregate.
     */
    where?: msgchamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of msgchamados to fetch.
     */
    orderBy?: msgchamadoOrderByWithRelationInput | msgchamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: msgchamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` msgchamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` msgchamados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned msgchamados
    **/
    _count?: true | MsgchamadoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MsgchamadoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MsgchamadoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MsgchamadoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MsgchamadoMaxAggregateInputType
  }

  export type GetMsgchamadoAggregateType<T extends MsgchamadoAggregateArgs> = {
        [P in keyof T & keyof AggregateMsgchamado]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMsgchamado[P]>
      : GetScalarType<T[P], AggregateMsgchamado[P]>
  }




  export type msgchamadoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: msgchamadoWhereInput
    orderBy?: msgchamadoOrderByWithAggregationInput | msgchamadoOrderByWithAggregationInput[]
    by: MsgchamadoScalarFieldEnum[] | MsgchamadoScalarFieldEnum
    having?: msgchamadoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MsgchamadoCountAggregateInputType | true
    _avg?: MsgchamadoAvgAggregateInputType
    _sum?: MsgchamadoSumAggregateInputType
    _min?: MsgchamadoMinAggregateInputType
    _max?: MsgchamadoMaxAggregateInputType
  }

  export type MsgchamadoGroupByOutputType = {
    idMensagem: number
    mensagem: string
    timestamp: Date | null
    remetente: $Enums.msgchamado_remetente
    urlAnexo: string | null
    nomeArquivo: string | null
    idChamado: number
    idRemetente: number
    _count: MsgchamadoCountAggregateOutputType | null
    _avg: MsgchamadoAvgAggregateOutputType | null
    _sum: MsgchamadoSumAggregateOutputType | null
    _min: MsgchamadoMinAggregateOutputType | null
    _max: MsgchamadoMaxAggregateOutputType | null
  }

  type GetMsgchamadoGroupByPayload<T extends msgchamadoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MsgchamadoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MsgchamadoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MsgchamadoGroupByOutputType[P]>
            : GetScalarType<T[P], MsgchamadoGroupByOutputType[P]>
        }
      >
    >


  export type msgchamadoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idMensagem?: boolean
    mensagem?: boolean
    timestamp?: boolean
    remetente?: boolean
    urlAnexo?: boolean
    nomeArquivo?: boolean
    idChamado?: boolean
    idRemetente?: boolean
    chamado?: boolean | chamadoDefaultArgs<ExtArgs>
    usuario?: boolean | usuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["msgchamado"]>



  export type msgchamadoSelectScalar = {
    idMensagem?: boolean
    mensagem?: boolean
    timestamp?: boolean
    remetente?: boolean
    urlAnexo?: boolean
    nomeArquivo?: boolean
    idChamado?: boolean
    idRemetente?: boolean
  }

  export type msgchamadoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idMensagem" | "mensagem" | "timestamp" | "remetente" | "urlAnexo" | "nomeArquivo" | "idChamado" | "idRemetente", ExtArgs["result"]["msgchamado"]>
  export type msgchamadoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chamado?: boolean | chamadoDefaultArgs<ExtArgs>
    usuario?: boolean | usuarioDefaultArgs<ExtArgs>
  }

  export type $msgchamadoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "msgchamado"
    objects: {
      chamado: Prisma.$chamadoPayload<ExtArgs>
      usuario: Prisma.$usuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      idMensagem: number
      mensagem: string
      timestamp: Date | null
      remetente: $Enums.msgchamado_remetente
      urlAnexo: string | null
      nomeArquivo: string | null
      idChamado: number
      idRemetente: number
    }, ExtArgs["result"]["msgchamado"]>
    composites: {}
  }

  type msgchamadoGetPayload<S extends boolean | null | undefined | msgchamadoDefaultArgs> = $Result.GetResult<Prisma.$msgchamadoPayload, S>

  type msgchamadoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<msgchamadoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MsgchamadoCountAggregateInputType | true
    }

  export interface msgchamadoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['msgchamado'], meta: { name: 'msgchamado' } }
    /**
     * Find zero or one Msgchamado that matches the filter.
     * @param {msgchamadoFindUniqueArgs} args - Arguments to find a Msgchamado
     * @example
     * // Get one Msgchamado
     * const msgchamado = await prisma.msgchamado.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends msgchamadoFindUniqueArgs>(args: SelectSubset<T, msgchamadoFindUniqueArgs<ExtArgs>>): Prisma__msgchamadoClient<$Result.GetResult<Prisma.$msgchamadoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Msgchamado that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {msgchamadoFindUniqueOrThrowArgs} args - Arguments to find a Msgchamado
     * @example
     * // Get one Msgchamado
     * const msgchamado = await prisma.msgchamado.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends msgchamadoFindUniqueOrThrowArgs>(args: SelectSubset<T, msgchamadoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__msgchamadoClient<$Result.GetResult<Prisma.$msgchamadoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Msgchamado that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {msgchamadoFindFirstArgs} args - Arguments to find a Msgchamado
     * @example
     * // Get one Msgchamado
     * const msgchamado = await prisma.msgchamado.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends msgchamadoFindFirstArgs>(args?: SelectSubset<T, msgchamadoFindFirstArgs<ExtArgs>>): Prisma__msgchamadoClient<$Result.GetResult<Prisma.$msgchamadoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Msgchamado that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {msgchamadoFindFirstOrThrowArgs} args - Arguments to find a Msgchamado
     * @example
     * // Get one Msgchamado
     * const msgchamado = await prisma.msgchamado.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends msgchamadoFindFirstOrThrowArgs>(args?: SelectSubset<T, msgchamadoFindFirstOrThrowArgs<ExtArgs>>): Prisma__msgchamadoClient<$Result.GetResult<Prisma.$msgchamadoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Msgchamados that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {msgchamadoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Msgchamados
     * const msgchamados = await prisma.msgchamado.findMany()
     * 
     * // Get first 10 Msgchamados
     * const msgchamados = await prisma.msgchamado.findMany({ take: 10 })
     * 
     * // Only select the `idMensagem`
     * const msgchamadoWithIdMensagemOnly = await prisma.msgchamado.findMany({ select: { idMensagem: true } })
     * 
     */
    findMany<T extends msgchamadoFindManyArgs>(args?: SelectSubset<T, msgchamadoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$msgchamadoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Msgchamado.
     * @param {msgchamadoCreateArgs} args - Arguments to create a Msgchamado.
     * @example
     * // Create one Msgchamado
     * const Msgchamado = await prisma.msgchamado.create({
     *   data: {
     *     // ... data to create a Msgchamado
     *   }
     * })
     * 
     */
    create<T extends msgchamadoCreateArgs>(args: SelectSubset<T, msgchamadoCreateArgs<ExtArgs>>): Prisma__msgchamadoClient<$Result.GetResult<Prisma.$msgchamadoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Msgchamados.
     * @param {msgchamadoCreateManyArgs} args - Arguments to create many Msgchamados.
     * @example
     * // Create many Msgchamados
     * const msgchamado = await prisma.msgchamado.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends msgchamadoCreateManyArgs>(args?: SelectSubset<T, msgchamadoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Msgchamado.
     * @param {msgchamadoDeleteArgs} args - Arguments to delete one Msgchamado.
     * @example
     * // Delete one Msgchamado
     * const Msgchamado = await prisma.msgchamado.delete({
     *   where: {
     *     // ... filter to delete one Msgchamado
     *   }
     * })
     * 
     */
    delete<T extends msgchamadoDeleteArgs>(args: SelectSubset<T, msgchamadoDeleteArgs<ExtArgs>>): Prisma__msgchamadoClient<$Result.GetResult<Prisma.$msgchamadoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Msgchamado.
     * @param {msgchamadoUpdateArgs} args - Arguments to update one Msgchamado.
     * @example
     * // Update one Msgchamado
     * const msgchamado = await prisma.msgchamado.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends msgchamadoUpdateArgs>(args: SelectSubset<T, msgchamadoUpdateArgs<ExtArgs>>): Prisma__msgchamadoClient<$Result.GetResult<Prisma.$msgchamadoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Msgchamados.
     * @param {msgchamadoDeleteManyArgs} args - Arguments to filter Msgchamados to delete.
     * @example
     * // Delete a few Msgchamados
     * const { count } = await prisma.msgchamado.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends msgchamadoDeleteManyArgs>(args?: SelectSubset<T, msgchamadoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Msgchamados.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {msgchamadoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Msgchamados
     * const msgchamado = await prisma.msgchamado.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends msgchamadoUpdateManyArgs>(args: SelectSubset<T, msgchamadoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Msgchamado.
     * @param {msgchamadoUpsertArgs} args - Arguments to update or create a Msgchamado.
     * @example
     * // Update or create a Msgchamado
     * const msgchamado = await prisma.msgchamado.upsert({
     *   create: {
     *     // ... data to create a Msgchamado
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Msgchamado we want to update
     *   }
     * })
     */
    upsert<T extends msgchamadoUpsertArgs>(args: SelectSubset<T, msgchamadoUpsertArgs<ExtArgs>>): Prisma__msgchamadoClient<$Result.GetResult<Prisma.$msgchamadoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Msgchamados.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {msgchamadoCountArgs} args - Arguments to filter Msgchamados to count.
     * @example
     * // Count the number of Msgchamados
     * const count = await prisma.msgchamado.count({
     *   where: {
     *     // ... the filter for the Msgchamados we want to count
     *   }
     * })
    **/
    count<T extends msgchamadoCountArgs>(
      args?: Subset<T, msgchamadoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MsgchamadoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Msgchamado.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MsgchamadoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MsgchamadoAggregateArgs>(args: Subset<T, MsgchamadoAggregateArgs>): Prisma.PrismaPromise<GetMsgchamadoAggregateType<T>>

    /**
     * Group by Msgchamado.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {msgchamadoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends msgchamadoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: msgchamadoGroupByArgs['orderBy'] }
        : { orderBy?: msgchamadoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, msgchamadoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMsgchamadoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the msgchamado model
   */
  readonly fields: msgchamadoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for msgchamado.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__msgchamadoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chamado<T extends chamadoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, chamadoDefaultArgs<ExtArgs>>): Prisma__chamadoClient<$Result.GetResult<Prisma.$chamadoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    usuario<T extends usuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usuarioDefaultArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the msgchamado model
   */
  interface msgchamadoFieldRefs {
    readonly idMensagem: FieldRef<"msgchamado", 'Int'>
    readonly mensagem: FieldRef<"msgchamado", 'String'>
    readonly timestamp: FieldRef<"msgchamado", 'DateTime'>
    readonly remetente: FieldRef<"msgchamado", 'msgchamado_remetente'>
    readonly urlAnexo: FieldRef<"msgchamado", 'String'>
    readonly nomeArquivo: FieldRef<"msgchamado", 'String'>
    readonly idChamado: FieldRef<"msgchamado", 'Int'>
    readonly idRemetente: FieldRef<"msgchamado", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * msgchamado findUnique
   */
  export type msgchamadoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the msgchamado
     */
    select?: msgchamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the msgchamado
     */
    omit?: msgchamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: msgchamadoInclude<ExtArgs> | null
    /**
     * Filter, which msgchamado to fetch.
     */
    where: msgchamadoWhereUniqueInput
  }

  /**
   * msgchamado findUniqueOrThrow
   */
  export type msgchamadoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the msgchamado
     */
    select?: msgchamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the msgchamado
     */
    omit?: msgchamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: msgchamadoInclude<ExtArgs> | null
    /**
     * Filter, which msgchamado to fetch.
     */
    where: msgchamadoWhereUniqueInput
  }

  /**
   * msgchamado findFirst
   */
  export type msgchamadoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the msgchamado
     */
    select?: msgchamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the msgchamado
     */
    omit?: msgchamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: msgchamadoInclude<ExtArgs> | null
    /**
     * Filter, which msgchamado to fetch.
     */
    where?: msgchamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of msgchamados to fetch.
     */
    orderBy?: msgchamadoOrderByWithRelationInput | msgchamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for msgchamados.
     */
    cursor?: msgchamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` msgchamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` msgchamados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of msgchamados.
     */
    distinct?: MsgchamadoScalarFieldEnum | MsgchamadoScalarFieldEnum[]
  }

  /**
   * msgchamado findFirstOrThrow
   */
  export type msgchamadoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the msgchamado
     */
    select?: msgchamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the msgchamado
     */
    omit?: msgchamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: msgchamadoInclude<ExtArgs> | null
    /**
     * Filter, which msgchamado to fetch.
     */
    where?: msgchamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of msgchamados to fetch.
     */
    orderBy?: msgchamadoOrderByWithRelationInput | msgchamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for msgchamados.
     */
    cursor?: msgchamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` msgchamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` msgchamados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of msgchamados.
     */
    distinct?: MsgchamadoScalarFieldEnum | MsgchamadoScalarFieldEnum[]
  }

  /**
   * msgchamado findMany
   */
  export type msgchamadoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the msgchamado
     */
    select?: msgchamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the msgchamado
     */
    omit?: msgchamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: msgchamadoInclude<ExtArgs> | null
    /**
     * Filter, which msgchamados to fetch.
     */
    where?: msgchamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of msgchamados to fetch.
     */
    orderBy?: msgchamadoOrderByWithRelationInput | msgchamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing msgchamados.
     */
    cursor?: msgchamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` msgchamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` msgchamados.
     */
    skip?: number
    distinct?: MsgchamadoScalarFieldEnum | MsgchamadoScalarFieldEnum[]
  }

  /**
   * msgchamado create
   */
  export type msgchamadoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the msgchamado
     */
    select?: msgchamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the msgchamado
     */
    omit?: msgchamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: msgchamadoInclude<ExtArgs> | null
    /**
     * The data needed to create a msgchamado.
     */
    data: XOR<msgchamadoCreateInput, msgchamadoUncheckedCreateInput>
  }

  /**
   * msgchamado createMany
   */
  export type msgchamadoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many msgchamados.
     */
    data: msgchamadoCreateManyInput | msgchamadoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * msgchamado update
   */
  export type msgchamadoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the msgchamado
     */
    select?: msgchamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the msgchamado
     */
    omit?: msgchamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: msgchamadoInclude<ExtArgs> | null
    /**
     * The data needed to update a msgchamado.
     */
    data: XOR<msgchamadoUpdateInput, msgchamadoUncheckedUpdateInput>
    /**
     * Choose, which msgchamado to update.
     */
    where: msgchamadoWhereUniqueInput
  }

  /**
   * msgchamado updateMany
   */
  export type msgchamadoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update msgchamados.
     */
    data: XOR<msgchamadoUpdateManyMutationInput, msgchamadoUncheckedUpdateManyInput>
    /**
     * Filter which msgchamados to update
     */
    where?: msgchamadoWhereInput
    /**
     * Limit how many msgchamados to update.
     */
    limit?: number
  }

  /**
   * msgchamado upsert
   */
  export type msgchamadoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the msgchamado
     */
    select?: msgchamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the msgchamado
     */
    omit?: msgchamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: msgchamadoInclude<ExtArgs> | null
    /**
     * The filter to search for the msgchamado to update in case it exists.
     */
    where: msgchamadoWhereUniqueInput
    /**
     * In case the msgchamado found by the `where` argument doesn't exist, create a new msgchamado with this data.
     */
    create: XOR<msgchamadoCreateInput, msgchamadoUncheckedCreateInput>
    /**
     * In case the msgchamado was found with the provided `where` argument, update it with this data.
     */
    update: XOR<msgchamadoUpdateInput, msgchamadoUncheckedUpdateInput>
  }

  /**
   * msgchamado delete
   */
  export type msgchamadoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the msgchamado
     */
    select?: msgchamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the msgchamado
     */
    omit?: msgchamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: msgchamadoInclude<ExtArgs> | null
    /**
     * Filter which msgchamado to delete.
     */
    where: msgchamadoWhereUniqueInput
  }

  /**
   * msgchamado deleteMany
   */
  export type msgchamadoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which msgchamados to delete
     */
    where?: msgchamadoWhereInput
    /**
     * Limit how many msgchamados to delete.
     */
    limit?: number
  }

  /**
   * msgchamado without action
   */
  export type msgchamadoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the msgchamado
     */
    select?: msgchamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the msgchamado
     */
    omit?: msgchamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: msgchamadoInclude<ExtArgs> | null
  }


  /**
   * Model notificacao
   */

  export type AggregateNotificacao = {
    _count: NotificacaoCountAggregateOutputType | null
    _avg: NotificacaoAvgAggregateOutputType | null
    _sum: NotificacaoSumAggregateOutputType | null
    _min: NotificacaoMinAggregateOutputType | null
    _max: NotificacaoMaxAggregateOutputType | null
  }

  export type NotificacaoAvgAggregateOutputType = {
    idNotificacao: number | null
    lida: number | null
    idUsuario: number | null
    idChamado: number | null
  }

  export type NotificacaoSumAggregateOutputType = {
    idNotificacao: number | null
    lida: number | null
    idUsuario: number | null
    idChamado: number | null
  }

  export type NotificacaoMinAggregateOutputType = {
    idNotificacao: number | null
    titulo: string | null
    mensagem: string | null
    lida: number | null
    dataHora: Date | null
    idUsuario: number | null
    idChamado: number | null
  }

  export type NotificacaoMaxAggregateOutputType = {
    idNotificacao: number | null
    titulo: string | null
    mensagem: string | null
    lida: number | null
    dataHora: Date | null
    idUsuario: number | null
    idChamado: number | null
  }

  export type NotificacaoCountAggregateOutputType = {
    idNotificacao: number
    titulo: number
    mensagem: number
    lida: number
    dataHora: number
    idUsuario: number
    idChamado: number
    _all: number
  }


  export type NotificacaoAvgAggregateInputType = {
    idNotificacao?: true
    lida?: true
    idUsuario?: true
    idChamado?: true
  }

  export type NotificacaoSumAggregateInputType = {
    idNotificacao?: true
    lida?: true
    idUsuario?: true
    idChamado?: true
  }

  export type NotificacaoMinAggregateInputType = {
    idNotificacao?: true
    titulo?: true
    mensagem?: true
    lida?: true
    dataHora?: true
    idUsuario?: true
    idChamado?: true
  }

  export type NotificacaoMaxAggregateInputType = {
    idNotificacao?: true
    titulo?: true
    mensagem?: true
    lida?: true
    dataHora?: true
    idUsuario?: true
    idChamado?: true
  }

  export type NotificacaoCountAggregateInputType = {
    idNotificacao?: true
    titulo?: true
    mensagem?: true
    lida?: true
    dataHora?: true
    idUsuario?: true
    idChamado?: true
    _all?: true
  }

  export type NotificacaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which notificacao to aggregate.
     */
    where?: notificacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notificacaos to fetch.
     */
    orderBy?: notificacaoOrderByWithRelationInput | notificacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: notificacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notificacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notificacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned notificacaos
    **/
    _count?: true | NotificacaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificacaoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificacaoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificacaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificacaoMaxAggregateInputType
  }

  export type GetNotificacaoAggregateType<T extends NotificacaoAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificacao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificacao[P]>
      : GetScalarType<T[P], AggregateNotificacao[P]>
  }




  export type notificacaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: notificacaoWhereInput
    orderBy?: notificacaoOrderByWithAggregationInput | notificacaoOrderByWithAggregationInput[]
    by: NotificacaoScalarFieldEnum[] | NotificacaoScalarFieldEnum
    having?: notificacaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificacaoCountAggregateInputType | true
    _avg?: NotificacaoAvgAggregateInputType
    _sum?: NotificacaoSumAggregateInputType
    _min?: NotificacaoMinAggregateInputType
    _max?: NotificacaoMaxAggregateInputType
  }

  export type NotificacaoGroupByOutputType = {
    idNotificacao: number
    titulo: string
    mensagem: string
    lida: number
    dataHora: Date | null
    idUsuario: number
    idChamado: number | null
    _count: NotificacaoCountAggregateOutputType | null
    _avg: NotificacaoAvgAggregateOutputType | null
    _sum: NotificacaoSumAggregateOutputType | null
    _min: NotificacaoMinAggregateOutputType | null
    _max: NotificacaoMaxAggregateOutputType | null
  }

  type GetNotificacaoGroupByPayload<T extends notificacaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificacaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificacaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificacaoGroupByOutputType[P]>
            : GetScalarType<T[P], NotificacaoGroupByOutputType[P]>
        }
      >
    >


  export type notificacaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idNotificacao?: boolean
    titulo?: boolean
    mensagem?: boolean
    lida?: boolean
    dataHora?: boolean
    idUsuario?: boolean
    idChamado?: boolean
    usuario?: boolean | usuarioDefaultArgs<ExtArgs>
    chamado?: boolean | notificacao$chamadoArgs<ExtArgs>
  }, ExtArgs["result"]["notificacao"]>



  export type notificacaoSelectScalar = {
    idNotificacao?: boolean
    titulo?: boolean
    mensagem?: boolean
    lida?: boolean
    dataHora?: boolean
    idUsuario?: boolean
    idChamado?: boolean
  }

  export type notificacaoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idNotificacao" | "titulo" | "mensagem" | "lida" | "dataHora" | "idUsuario" | "idChamado", ExtArgs["result"]["notificacao"]>
  export type notificacaoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | usuarioDefaultArgs<ExtArgs>
    chamado?: boolean | notificacao$chamadoArgs<ExtArgs>
  }

  export type $notificacaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "notificacao"
    objects: {
      usuario: Prisma.$usuarioPayload<ExtArgs>
      chamado: Prisma.$chamadoPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      idNotificacao: number
      titulo: string
      mensagem: string
      lida: number
      dataHora: Date | null
      idUsuario: number
      idChamado: number | null
    }, ExtArgs["result"]["notificacao"]>
    composites: {}
  }

  type notificacaoGetPayload<S extends boolean | null | undefined | notificacaoDefaultArgs> = $Result.GetResult<Prisma.$notificacaoPayload, S>

  type notificacaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<notificacaoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificacaoCountAggregateInputType | true
    }

  export interface notificacaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['notificacao'], meta: { name: 'notificacao' } }
    /**
     * Find zero or one Notificacao that matches the filter.
     * @param {notificacaoFindUniqueArgs} args - Arguments to find a Notificacao
     * @example
     * // Get one Notificacao
     * const notificacao = await prisma.notificacao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends notificacaoFindUniqueArgs>(args: SelectSubset<T, notificacaoFindUniqueArgs<ExtArgs>>): Prisma__notificacaoClient<$Result.GetResult<Prisma.$notificacaoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notificacao that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {notificacaoFindUniqueOrThrowArgs} args - Arguments to find a Notificacao
     * @example
     * // Get one Notificacao
     * const notificacao = await prisma.notificacao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends notificacaoFindUniqueOrThrowArgs>(args: SelectSubset<T, notificacaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__notificacaoClient<$Result.GetResult<Prisma.$notificacaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notificacao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificacaoFindFirstArgs} args - Arguments to find a Notificacao
     * @example
     * // Get one Notificacao
     * const notificacao = await prisma.notificacao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends notificacaoFindFirstArgs>(args?: SelectSubset<T, notificacaoFindFirstArgs<ExtArgs>>): Prisma__notificacaoClient<$Result.GetResult<Prisma.$notificacaoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notificacao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificacaoFindFirstOrThrowArgs} args - Arguments to find a Notificacao
     * @example
     * // Get one Notificacao
     * const notificacao = await prisma.notificacao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends notificacaoFindFirstOrThrowArgs>(args?: SelectSubset<T, notificacaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__notificacaoClient<$Result.GetResult<Prisma.$notificacaoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notificacaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificacaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notificacaos
     * const notificacaos = await prisma.notificacao.findMany()
     * 
     * // Get first 10 Notificacaos
     * const notificacaos = await prisma.notificacao.findMany({ take: 10 })
     * 
     * // Only select the `idNotificacao`
     * const notificacaoWithIdNotificacaoOnly = await prisma.notificacao.findMany({ select: { idNotificacao: true } })
     * 
     */
    findMany<T extends notificacaoFindManyArgs>(args?: SelectSubset<T, notificacaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notificacao.
     * @param {notificacaoCreateArgs} args - Arguments to create a Notificacao.
     * @example
     * // Create one Notificacao
     * const Notificacao = await prisma.notificacao.create({
     *   data: {
     *     // ... data to create a Notificacao
     *   }
     * })
     * 
     */
    create<T extends notificacaoCreateArgs>(args: SelectSubset<T, notificacaoCreateArgs<ExtArgs>>): Prisma__notificacaoClient<$Result.GetResult<Prisma.$notificacaoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notificacaos.
     * @param {notificacaoCreateManyArgs} args - Arguments to create many Notificacaos.
     * @example
     * // Create many Notificacaos
     * const notificacao = await prisma.notificacao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends notificacaoCreateManyArgs>(args?: SelectSubset<T, notificacaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Notificacao.
     * @param {notificacaoDeleteArgs} args - Arguments to delete one Notificacao.
     * @example
     * // Delete one Notificacao
     * const Notificacao = await prisma.notificacao.delete({
     *   where: {
     *     // ... filter to delete one Notificacao
     *   }
     * })
     * 
     */
    delete<T extends notificacaoDeleteArgs>(args: SelectSubset<T, notificacaoDeleteArgs<ExtArgs>>): Prisma__notificacaoClient<$Result.GetResult<Prisma.$notificacaoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notificacao.
     * @param {notificacaoUpdateArgs} args - Arguments to update one Notificacao.
     * @example
     * // Update one Notificacao
     * const notificacao = await prisma.notificacao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends notificacaoUpdateArgs>(args: SelectSubset<T, notificacaoUpdateArgs<ExtArgs>>): Prisma__notificacaoClient<$Result.GetResult<Prisma.$notificacaoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notificacaos.
     * @param {notificacaoDeleteManyArgs} args - Arguments to filter Notificacaos to delete.
     * @example
     * // Delete a few Notificacaos
     * const { count } = await prisma.notificacao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends notificacaoDeleteManyArgs>(args?: SelectSubset<T, notificacaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notificacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificacaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notificacaos
     * const notificacao = await prisma.notificacao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends notificacaoUpdateManyArgs>(args: SelectSubset<T, notificacaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notificacao.
     * @param {notificacaoUpsertArgs} args - Arguments to update or create a Notificacao.
     * @example
     * // Update or create a Notificacao
     * const notificacao = await prisma.notificacao.upsert({
     *   create: {
     *     // ... data to create a Notificacao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notificacao we want to update
     *   }
     * })
     */
    upsert<T extends notificacaoUpsertArgs>(args: SelectSubset<T, notificacaoUpsertArgs<ExtArgs>>): Prisma__notificacaoClient<$Result.GetResult<Prisma.$notificacaoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notificacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificacaoCountArgs} args - Arguments to filter Notificacaos to count.
     * @example
     * // Count the number of Notificacaos
     * const count = await prisma.notificacao.count({
     *   where: {
     *     // ... the filter for the Notificacaos we want to count
     *   }
     * })
    **/
    count<T extends notificacaoCountArgs>(
      args?: Subset<T, notificacaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificacaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notificacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificacaoAggregateArgs>(args: Subset<T, NotificacaoAggregateArgs>): Prisma.PrismaPromise<GetNotificacaoAggregateType<T>>

    /**
     * Group by Notificacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificacaoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends notificacaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: notificacaoGroupByArgs['orderBy'] }
        : { orderBy?: notificacaoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, notificacaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificacaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the notificacao model
   */
  readonly fields: notificacaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for notificacao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__notificacaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends usuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usuarioDefaultArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    chamado<T extends notificacao$chamadoArgs<ExtArgs> = {}>(args?: Subset<T, notificacao$chamadoArgs<ExtArgs>>): Prisma__chamadoClient<$Result.GetResult<Prisma.$chamadoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the notificacao model
   */
  interface notificacaoFieldRefs {
    readonly idNotificacao: FieldRef<"notificacao", 'Int'>
    readonly titulo: FieldRef<"notificacao", 'String'>
    readonly mensagem: FieldRef<"notificacao", 'String'>
    readonly lida: FieldRef<"notificacao", 'Int'>
    readonly dataHora: FieldRef<"notificacao", 'DateTime'>
    readonly idUsuario: FieldRef<"notificacao", 'Int'>
    readonly idChamado: FieldRef<"notificacao", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * notificacao findUnique
   */
  export type notificacaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notificacao
     */
    select?: notificacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notificacao
     */
    omit?: notificacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificacaoInclude<ExtArgs> | null
    /**
     * Filter, which notificacao to fetch.
     */
    where: notificacaoWhereUniqueInput
  }

  /**
   * notificacao findUniqueOrThrow
   */
  export type notificacaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notificacao
     */
    select?: notificacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notificacao
     */
    omit?: notificacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificacaoInclude<ExtArgs> | null
    /**
     * Filter, which notificacao to fetch.
     */
    where: notificacaoWhereUniqueInput
  }

  /**
   * notificacao findFirst
   */
  export type notificacaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notificacao
     */
    select?: notificacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notificacao
     */
    omit?: notificacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificacaoInclude<ExtArgs> | null
    /**
     * Filter, which notificacao to fetch.
     */
    where?: notificacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notificacaos to fetch.
     */
    orderBy?: notificacaoOrderByWithRelationInput | notificacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for notificacaos.
     */
    cursor?: notificacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notificacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notificacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of notificacaos.
     */
    distinct?: NotificacaoScalarFieldEnum | NotificacaoScalarFieldEnum[]
  }

  /**
   * notificacao findFirstOrThrow
   */
  export type notificacaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notificacao
     */
    select?: notificacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notificacao
     */
    omit?: notificacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificacaoInclude<ExtArgs> | null
    /**
     * Filter, which notificacao to fetch.
     */
    where?: notificacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notificacaos to fetch.
     */
    orderBy?: notificacaoOrderByWithRelationInput | notificacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for notificacaos.
     */
    cursor?: notificacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notificacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notificacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of notificacaos.
     */
    distinct?: NotificacaoScalarFieldEnum | NotificacaoScalarFieldEnum[]
  }

  /**
   * notificacao findMany
   */
  export type notificacaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notificacao
     */
    select?: notificacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notificacao
     */
    omit?: notificacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificacaoInclude<ExtArgs> | null
    /**
     * Filter, which notificacaos to fetch.
     */
    where?: notificacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notificacaos to fetch.
     */
    orderBy?: notificacaoOrderByWithRelationInput | notificacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing notificacaos.
     */
    cursor?: notificacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notificacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notificacaos.
     */
    skip?: number
    distinct?: NotificacaoScalarFieldEnum | NotificacaoScalarFieldEnum[]
  }

  /**
   * notificacao create
   */
  export type notificacaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notificacao
     */
    select?: notificacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notificacao
     */
    omit?: notificacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificacaoInclude<ExtArgs> | null
    /**
     * The data needed to create a notificacao.
     */
    data: XOR<notificacaoCreateInput, notificacaoUncheckedCreateInput>
  }

  /**
   * notificacao createMany
   */
  export type notificacaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many notificacaos.
     */
    data: notificacaoCreateManyInput | notificacaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * notificacao update
   */
  export type notificacaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notificacao
     */
    select?: notificacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notificacao
     */
    omit?: notificacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificacaoInclude<ExtArgs> | null
    /**
     * The data needed to update a notificacao.
     */
    data: XOR<notificacaoUpdateInput, notificacaoUncheckedUpdateInput>
    /**
     * Choose, which notificacao to update.
     */
    where: notificacaoWhereUniqueInput
  }

  /**
   * notificacao updateMany
   */
  export type notificacaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update notificacaos.
     */
    data: XOR<notificacaoUpdateManyMutationInput, notificacaoUncheckedUpdateManyInput>
    /**
     * Filter which notificacaos to update
     */
    where?: notificacaoWhereInput
    /**
     * Limit how many notificacaos to update.
     */
    limit?: number
  }

  /**
   * notificacao upsert
   */
  export type notificacaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notificacao
     */
    select?: notificacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notificacao
     */
    omit?: notificacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificacaoInclude<ExtArgs> | null
    /**
     * The filter to search for the notificacao to update in case it exists.
     */
    where: notificacaoWhereUniqueInput
    /**
     * In case the notificacao found by the `where` argument doesn't exist, create a new notificacao with this data.
     */
    create: XOR<notificacaoCreateInput, notificacaoUncheckedCreateInput>
    /**
     * In case the notificacao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<notificacaoUpdateInput, notificacaoUncheckedUpdateInput>
  }

  /**
   * notificacao delete
   */
  export type notificacaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notificacao
     */
    select?: notificacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notificacao
     */
    omit?: notificacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificacaoInclude<ExtArgs> | null
    /**
     * Filter which notificacao to delete.
     */
    where: notificacaoWhereUniqueInput
  }

  /**
   * notificacao deleteMany
   */
  export type notificacaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which notificacaos to delete
     */
    where?: notificacaoWhereInput
    /**
     * Limit how many notificacaos to delete.
     */
    limit?: number
  }

  /**
   * notificacao.chamado
   */
  export type notificacao$chamadoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chamado
     */
    select?: chamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chamado
     */
    omit?: chamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chamadoInclude<ExtArgs> | null
    where?: chamadoWhereInput
  }

  /**
   * notificacao without action
   */
  export type notificacaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notificacao
     */
    select?: notificacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notificacao
     */
    omit?: notificacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificacaoInclude<ExtArgs> | null
  }


  /**
   * Model prioridadechamado
   */

  export type AggregatePrioridadechamado = {
    _count: PrioridadechamadoCountAggregateOutputType | null
    _avg: PrioridadechamadoAvgAggregateOutputType | null
    _sum: PrioridadechamadoSumAggregateOutputType | null
    _min: PrioridadechamadoMinAggregateOutputType | null
    _max: PrioridadechamadoMaxAggregateOutputType | null
  }

  export type PrioridadechamadoAvgAggregateOutputType = {
    idPrioridade: number | null
    ativo: number | null
  }

  export type PrioridadechamadoSumAggregateOutputType = {
    idPrioridade: number | null
    ativo: number | null
  }

  export type PrioridadechamadoMinAggregateOutputType = {
    idPrioridade: number | null
    nomePrioridade: string | null
    ativo: number | null
    hexCorPrimaria: string | null
    hexCorSecundaria: string | null
  }

  export type PrioridadechamadoMaxAggregateOutputType = {
    idPrioridade: number | null
    nomePrioridade: string | null
    ativo: number | null
    hexCorPrimaria: string | null
    hexCorSecundaria: string | null
  }

  export type PrioridadechamadoCountAggregateOutputType = {
    idPrioridade: number
    nomePrioridade: number
    ativo: number
    hexCorPrimaria: number
    hexCorSecundaria: number
    _all: number
  }


  export type PrioridadechamadoAvgAggregateInputType = {
    idPrioridade?: true
    ativo?: true
  }

  export type PrioridadechamadoSumAggregateInputType = {
    idPrioridade?: true
    ativo?: true
  }

  export type PrioridadechamadoMinAggregateInputType = {
    idPrioridade?: true
    nomePrioridade?: true
    ativo?: true
    hexCorPrimaria?: true
    hexCorSecundaria?: true
  }

  export type PrioridadechamadoMaxAggregateInputType = {
    idPrioridade?: true
    nomePrioridade?: true
    ativo?: true
    hexCorPrimaria?: true
    hexCorSecundaria?: true
  }

  export type PrioridadechamadoCountAggregateInputType = {
    idPrioridade?: true
    nomePrioridade?: true
    ativo?: true
    hexCorPrimaria?: true
    hexCorSecundaria?: true
    _all?: true
  }

  export type PrioridadechamadoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which prioridadechamado to aggregate.
     */
    where?: prioridadechamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of prioridadechamados to fetch.
     */
    orderBy?: prioridadechamadoOrderByWithRelationInput | prioridadechamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: prioridadechamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` prioridadechamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` prioridadechamados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned prioridadechamados
    **/
    _count?: true | PrioridadechamadoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PrioridadechamadoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PrioridadechamadoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrioridadechamadoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrioridadechamadoMaxAggregateInputType
  }

  export type GetPrioridadechamadoAggregateType<T extends PrioridadechamadoAggregateArgs> = {
        [P in keyof T & keyof AggregatePrioridadechamado]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrioridadechamado[P]>
      : GetScalarType<T[P], AggregatePrioridadechamado[P]>
  }




  export type prioridadechamadoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: prioridadechamadoWhereInput
    orderBy?: prioridadechamadoOrderByWithAggregationInput | prioridadechamadoOrderByWithAggregationInput[]
    by: PrioridadechamadoScalarFieldEnum[] | PrioridadechamadoScalarFieldEnum
    having?: prioridadechamadoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrioridadechamadoCountAggregateInputType | true
    _avg?: PrioridadechamadoAvgAggregateInputType
    _sum?: PrioridadechamadoSumAggregateInputType
    _min?: PrioridadechamadoMinAggregateInputType
    _max?: PrioridadechamadoMaxAggregateInputType
  }

  export type PrioridadechamadoGroupByOutputType = {
    idPrioridade: number
    nomePrioridade: string
    ativo: number
    hexCorPrimaria: string
    hexCorSecundaria: string
    _count: PrioridadechamadoCountAggregateOutputType | null
    _avg: PrioridadechamadoAvgAggregateOutputType | null
    _sum: PrioridadechamadoSumAggregateOutputType | null
    _min: PrioridadechamadoMinAggregateOutputType | null
    _max: PrioridadechamadoMaxAggregateOutputType | null
  }

  type GetPrioridadechamadoGroupByPayload<T extends prioridadechamadoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrioridadechamadoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrioridadechamadoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrioridadechamadoGroupByOutputType[P]>
            : GetScalarType<T[P], PrioridadechamadoGroupByOutputType[P]>
        }
      >
    >


  export type prioridadechamadoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idPrioridade?: boolean
    nomePrioridade?: boolean
    ativo?: boolean
    hexCorPrimaria?: boolean
    hexCorSecundaria?: boolean
    chamado?: boolean | prioridadechamado$chamadoArgs<ExtArgs>
    _count?: boolean | PrioridadechamadoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prioridadechamado"]>



  export type prioridadechamadoSelectScalar = {
    idPrioridade?: boolean
    nomePrioridade?: boolean
    ativo?: boolean
    hexCorPrimaria?: boolean
    hexCorSecundaria?: boolean
  }

  export type prioridadechamadoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idPrioridade" | "nomePrioridade" | "ativo" | "hexCorPrimaria" | "hexCorSecundaria", ExtArgs["result"]["prioridadechamado"]>
  export type prioridadechamadoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chamado?: boolean | prioridadechamado$chamadoArgs<ExtArgs>
    _count?: boolean | PrioridadechamadoCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $prioridadechamadoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "prioridadechamado"
    objects: {
      chamado: Prisma.$chamadoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      idPrioridade: number
      nomePrioridade: string
      ativo: number
      hexCorPrimaria: string
      hexCorSecundaria: string
    }, ExtArgs["result"]["prioridadechamado"]>
    composites: {}
  }

  type prioridadechamadoGetPayload<S extends boolean | null | undefined | prioridadechamadoDefaultArgs> = $Result.GetResult<Prisma.$prioridadechamadoPayload, S>

  type prioridadechamadoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<prioridadechamadoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PrioridadechamadoCountAggregateInputType | true
    }

  export interface prioridadechamadoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['prioridadechamado'], meta: { name: 'prioridadechamado' } }
    /**
     * Find zero or one Prioridadechamado that matches the filter.
     * @param {prioridadechamadoFindUniqueArgs} args - Arguments to find a Prioridadechamado
     * @example
     * // Get one Prioridadechamado
     * const prioridadechamado = await prisma.prioridadechamado.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends prioridadechamadoFindUniqueArgs>(args: SelectSubset<T, prioridadechamadoFindUniqueArgs<ExtArgs>>): Prisma__prioridadechamadoClient<$Result.GetResult<Prisma.$prioridadechamadoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Prioridadechamado that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {prioridadechamadoFindUniqueOrThrowArgs} args - Arguments to find a Prioridadechamado
     * @example
     * // Get one Prioridadechamado
     * const prioridadechamado = await prisma.prioridadechamado.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends prioridadechamadoFindUniqueOrThrowArgs>(args: SelectSubset<T, prioridadechamadoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__prioridadechamadoClient<$Result.GetResult<Prisma.$prioridadechamadoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prioridadechamado that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prioridadechamadoFindFirstArgs} args - Arguments to find a Prioridadechamado
     * @example
     * // Get one Prioridadechamado
     * const prioridadechamado = await prisma.prioridadechamado.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends prioridadechamadoFindFirstArgs>(args?: SelectSubset<T, prioridadechamadoFindFirstArgs<ExtArgs>>): Prisma__prioridadechamadoClient<$Result.GetResult<Prisma.$prioridadechamadoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prioridadechamado that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prioridadechamadoFindFirstOrThrowArgs} args - Arguments to find a Prioridadechamado
     * @example
     * // Get one Prioridadechamado
     * const prioridadechamado = await prisma.prioridadechamado.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends prioridadechamadoFindFirstOrThrowArgs>(args?: SelectSubset<T, prioridadechamadoFindFirstOrThrowArgs<ExtArgs>>): Prisma__prioridadechamadoClient<$Result.GetResult<Prisma.$prioridadechamadoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Prioridadechamados that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prioridadechamadoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prioridadechamados
     * const prioridadechamados = await prisma.prioridadechamado.findMany()
     * 
     * // Get first 10 Prioridadechamados
     * const prioridadechamados = await prisma.prioridadechamado.findMany({ take: 10 })
     * 
     * // Only select the `idPrioridade`
     * const prioridadechamadoWithIdPrioridadeOnly = await prisma.prioridadechamado.findMany({ select: { idPrioridade: true } })
     * 
     */
    findMany<T extends prioridadechamadoFindManyArgs>(args?: SelectSubset<T, prioridadechamadoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$prioridadechamadoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Prioridadechamado.
     * @param {prioridadechamadoCreateArgs} args - Arguments to create a Prioridadechamado.
     * @example
     * // Create one Prioridadechamado
     * const Prioridadechamado = await prisma.prioridadechamado.create({
     *   data: {
     *     // ... data to create a Prioridadechamado
     *   }
     * })
     * 
     */
    create<T extends prioridadechamadoCreateArgs>(args: SelectSubset<T, prioridadechamadoCreateArgs<ExtArgs>>): Prisma__prioridadechamadoClient<$Result.GetResult<Prisma.$prioridadechamadoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Prioridadechamados.
     * @param {prioridadechamadoCreateManyArgs} args - Arguments to create many Prioridadechamados.
     * @example
     * // Create many Prioridadechamados
     * const prioridadechamado = await prisma.prioridadechamado.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends prioridadechamadoCreateManyArgs>(args?: SelectSubset<T, prioridadechamadoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Prioridadechamado.
     * @param {prioridadechamadoDeleteArgs} args - Arguments to delete one Prioridadechamado.
     * @example
     * // Delete one Prioridadechamado
     * const Prioridadechamado = await prisma.prioridadechamado.delete({
     *   where: {
     *     // ... filter to delete one Prioridadechamado
     *   }
     * })
     * 
     */
    delete<T extends prioridadechamadoDeleteArgs>(args: SelectSubset<T, prioridadechamadoDeleteArgs<ExtArgs>>): Prisma__prioridadechamadoClient<$Result.GetResult<Prisma.$prioridadechamadoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Prioridadechamado.
     * @param {prioridadechamadoUpdateArgs} args - Arguments to update one Prioridadechamado.
     * @example
     * // Update one Prioridadechamado
     * const prioridadechamado = await prisma.prioridadechamado.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends prioridadechamadoUpdateArgs>(args: SelectSubset<T, prioridadechamadoUpdateArgs<ExtArgs>>): Prisma__prioridadechamadoClient<$Result.GetResult<Prisma.$prioridadechamadoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Prioridadechamados.
     * @param {prioridadechamadoDeleteManyArgs} args - Arguments to filter Prioridadechamados to delete.
     * @example
     * // Delete a few Prioridadechamados
     * const { count } = await prisma.prioridadechamado.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends prioridadechamadoDeleteManyArgs>(args?: SelectSubset<T, prioridadechamadoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prioridadechamados.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prioridadechamadoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prioridadechamados
     * const prioridadechamado = await prisma.prioridadechamado.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends prioridadechamadoUpdateManyArgs>(args: SelectSubset<T, prioridadechamadoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Prioridadechamado.
     * @param {prioridadechamadoUpsertArgs} args - Arguments to update or create a Prioridadechamado.
     * @example
     * // Update or create a Prioridadechamado
     * const prioridadechamado = await prisma.prioridadechamado.upsert({
     *   create: {
     *     // ... data to create a Prioridadechamado
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Prioridadechamado we want to update
     *   }
     * })
     */
    upsert<T extends prioridadechamadoUpsertArgs>(args: SelectSubset<T, prioridadechamadoUpsertArgs<ExtArgs>>): Prisma__prioridadechamadoClient<$Result.GetResult<Prisma.$prioridadechamadoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Prioridadechamados.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prioridadechamadoCountArgs} args - Arguments to filter Prioridadechamados to count.
     * @example
     * // Count the number of Prioridadechamados
     * const count = await prisma.prioridadechamado.count({
     *   where: {
     *     // ... the filter for the Prioridadechamados we want to count
     *   }
     * })
    **/
    count<T extends prioridadechamadoCountArgs>(
      args?: Subset<T, prioridadechamadoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrioridadechamadoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Prioridadechamado.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrioridadechamadoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PrioridadechamadoAggregateArgs>(args: Subset<T, PrioridadechamadoAggregateArgs>): Prisma.PrismaPromise<GetPrioridadechamadoAggregateType<T>>

    /**
     * Group by Prioridadechamado.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prioridadechamadoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends prioridadechamadoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: prioridadechamadoGroupByArgs['orderBy'] }
        : { orderBy?: prioridadechamadoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, prioridadechamadoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrioridadechamadoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the prioridadechamado model
   */
  readonly fields: prioridadechamadoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for prioridadechamado.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__prioridadechamadoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chamado<T extends prioridadechamado$chamadoArgs<ExtArgs> = {}>(args?: Subset<T, prioridadechamado$chamadoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chamadoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the prioridadechamado model
   */
  interface prioridadechamadoFieldRefs {
    readonly idPrioridade: FieldRef<"prioridadechamado", 'Int'>
    readonly nomePrioridade: FieldRef<"prioridadechamado", 'String'>
    readonly ativo: FieldRef<"prioridadechamado", 'Int'>
    readonly hexCorPrimaria: FieldRef<"prioridadechamado", 'String'>
    readonly hexCorSecundaria: FieldRef<"prioridadechamado", 'String'>
  }
    

  // Custom InputTypes
  /**
   * prioridadechamado findUnique
   */
  export type prioridadechamadoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prioridadechamado
     */
    select?: prioridadechamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prioridadechamado
     */
    omit?: prioridadechamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prioridadechamadoInclude<ExtArgs> | null
    /**
     * Filter, which prioridadechamado to fetch.
     */
    where: prioridadechamadoWhereUniqueInput
  }

  /**
   * prioridadechamado findUniqueOrThrow
   */
  export type prioridadechamadoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prioridadechamado
     */
    select?: prioridadechamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prioridadechamado
     */
    omit?: prioridadechamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prioridadechamadoInclude<ExtArgs> | null
    /**
     * Filter, which prioridadechamado to fetch.
     */
    where: prioridadechamadoWhereUniqueInput
  }

  /**
   * prioridadechamado findFirst
   */
  export type prioridadechamadoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prioridadechamado
     */
    select?: prioridadechamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prioridadechamado
     */
    omit?: prioridadechamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prioridadechamadoInclude<ExtArgs> | null
    /**
     * Filter, which prioridadechamado to fetch.
     */
    where?: prioridadechamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of prioridadechamados to fetch.
     */
    orderBy?: prioridadechamadoOrderByWithRelationInput | prioridadechamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for prioridadechamados.
     */
    cursor?: prioridadechamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` prioridadechamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` prioridadechamados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of prioridadechamados.
     */
    distinct?: PrioridadechamadoScalarFieldEnum | PrioridadechamadoScalarFieldEnum[]
  }

  /**
   * prioridadechamado findFirstOrThrow
   */
  export type prioridadechamadoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prioridadechamado
     */
    select?: prioridadechamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prioridadechamado
     */
    omit?: prioridadechamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prioridadechamadoInclude<ExtArgs> | null
    /**
     * Filter, which prioridadechamado to fetch.
     */
    where?: prioridadechamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of prioridadechamados to fetch.
     */
    orderBy?: prioridadechamadoOrderByWithRelationInput | prioridadechamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for prioridadechamados.
     */
    cursor?: prioridadechamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` prioridadechamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` prioridadechamados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of prioridadechamados.
     */
    distinct?: PrioridadechamadoScalarFieldEnum | PrioridadechamadoScalarFieldEnum[]
  }

  /**
   * prioridadechamado findMany
   */
  export type prioridadechamadoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prioridadechamado
     */
    select?: prioridadechamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prioridadechamado
     */
    omit?: prioridadechamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prioridadechamadoInclude<ExtArgs> | null
    /**
     * Filter, which prioridadechamados to fetch.
     */
    where?: prioridadechamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of prioridadechamados to fetch.
     */
    orderBy?: prioridadechamadoOrderByWithRelationInput | prioridadechamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing prioridadechamados.
     */
    cursor?: prioridadechamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` prioridadechamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` prioridadechamados.
     */
    skip?: number
    distinct?: PrioridadechamadoScalarFieldEnum | PrioridadechamadoScalarFieldEnum[]
  }

  /**
   * prioridadechamado create
   */
  export type prioridadechamadoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prioridadechamado
     */
    select?: prioridadechamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prioridadechamado
     */
    omit?: prioridadechamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prioridadechamadoInclude<ExtArgs> | null
    /**
     * The data needed to create a prioridadechamado.
     */
    data: XOR<prioridadechamadoCreateInput, prioridadechamadoUncheckedCreateInput>
  }

  /**
   * prioridadechamado createMany
   */
  export type prioridadechamadoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many prioridadechamados.
     */
    data: prioridadechamadoCreateManyInput | prioridadechamadoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * prioridadechamado update
   */
  export type prioridadechamadoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prioridadechamado
     */
    select?: prioridadechamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prioridadechamado
     */
    omit?: prioridadechamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prioridadechamadoInclude<ExtArgs> | null
    /**
     * The data needed to update a prioridadechamado.
     */
    data: XOR<prioridadechamadoUpdateInput, prioridadechamadoUncheckedUpdateInput>
    /**
     * Choose, which prioridadechamado to update.
     */
    where: prioridadechamadoWhereUniqueInput
  }

  /**
   * prioridadechamado updateMany
   */
  export type prioridadechamadoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update prioridadechamados.
     */
    data: XOR<prioridadechamadoUpdateManyMutationInput, prioridadechamadoUncheckedUpdateManyInput>
    /**
     * Filter which prioridadechamados to update
     */
    where?: prioridadechamadoWhereInput
    /**
     * Limit how many prioridadechamados to update.
     */
    limit?: number
  }

  /**
   * prioridadechamado upsert
   */
  export type prioridadechamadoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prioridadechamado
     */
    select?: prioridadechamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prioridadechamado
     */
    omit?: prioridadechamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prioridadechamadoInclude<ExtArgs> | null
    /**
     * The filter to search for the prioridadechamado to update in case it exists.
     */
    where: prioridadechamadoWhereUniqueInput
    /**
     * In case the prioridadechamado found by the `where` argument doesn't exist, create a new prioridadechamado with this data.
     */
    create: XOR<prioridadechamadoCreateInput, prioridadechamadoUncheckedCreateInput>
    /**
     * In case the prioridadechamado was found with the provided `where` argument, update it with this data.
     */
    update: XOR<prioridadechamadoUpdateInput, prioridadechamadoUncheckedUpdateInput>
  }

  /**
   * prioridadechamado delete
   */
  export type prioridadechamadoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prioridadechamado
     */
    select?: prioridadechamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prioridadechamado
     */
    omit?: prioridadechamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prioridadechamadoInclude<ExtArgs> | null
    /**
     * Filter which prioridadechamado to delete.
     */
    where: prioridadechamadoWhereUniqueInput
  }

  /**
   * prioridadechamado deleteMany
   */
  export type prioridadechamadoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which prioridadechamados to delete
     */
    where?: prioridadechamadoWhereInput
    /**
     * Limit how many prioridadechamados to delete.
     */
    limit?: number
  }

  /**
   * prioridadechamado.chamado
   */
  export type prioridadechamado$chamadoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chamado
     */
    select?: chamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chamado
     */
    omit?: chamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chamadoInclude<ExtArgs> | null
    where?: chamadoWhereInput
    orderBy?: chamadoOrderByWithRelationInput | chamadoOrderByWithRelationInput[]
    cursor?: chamadoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChamadoScalarFieldEnum | ChamadoScalarFieldEnum[]
  }

  /**
   * prioridadechamado without action
   */
  export type prioridadechamadoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prioridadechamado
     */
    select?: prioridadechamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prioridadechamado
     */
    omit?: prioridadechamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prioridadechamadoInclude<ExtArgs> | null
  }


  /**
   * Model statuschamado
   */

  export type AggregateStatuschamado = {
    _count: StatuschamadoCountAggregateOutputType | null
    _avg: StatuschamadoAvgAggregateOutputType | null
    _sum: StatuschamadoSumAggregateOutputType | null
    _min: StatuschamadoMinAggregateOutputType | null
    _max: StatuschamadoMaxAggregateOutputType | null
  }

  export type StatuschamadoAvgAggregateOutputType = {
    idStatus: number | null
    ativo: number | null
  }

  export type StatuschamadoSumAggregateOutputType = {
    idStatus: number | null
    ativo: number | null
  }

  export type StatuschamadoMinAggregateOutputType = {
    idStatus: number | null
    nomeStatus: string | null
    ativo: number | null
    hexCorPrimaria: string | null
    hexCorSecundaria: string | null
  }

  export type StatuschamadoMaxAggregateOutputType = {
    idStatus: number | null
    nomeStatus: string | null
    ativo: number | null
    hexCorPrimaria: string | null
    hexCorSecundaria: string | null
  }

  export type StatuschamadoCountAggregateOutputType = {
    idStatus: number
    nomeStatus: number
    ativo: number
    hexCorPrimaria: number
    hexCorSecundaria: number
    _all: number
  }


  export type StatuschamadoAvgAggregateInputType = {
    idStatus?: true
    ativo?: true
  }

  export type StatuschamadoSumAggregateInputType = {
    idStatus?: true
    ativo?: true
  }

  export type StatuschamadoMinAggregateInputType = {
    idStatus?: true
    nomeStatus?: true
    ativo?: true
    hexCorPrimaria?: true
    hexCorSecundaria?: true
  }

  export type StatuschamadoMaxAggregateInputType = {
    idStatus?: true
    nomeStatus?: true
    ativo?: true
    hexCorPrimaria?: true
    hexCorSecundaria?: true
  }

  export type StatuschamadoCountAggregateInputType = {
    idStatus?: true
    nomeStatus?: true
    ativo?: true
    hexCorPrimaria?: true
    hexCorSecundaria?: true
    _all?: true
  }

  export type StatuschamadoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which statuschamado to aggregate.
     */
    where?: statuschamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of statuschamados to fetch.
     */
    orderBy?: statuschamadoOrderByWithRelationInput | statuschamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: statuschamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` statuschamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` statuschamados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned statuschamados
    **/
    _count?: true | StatuschamadoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StatuschamadoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StatuschamadoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StatuschamadoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StatuschamadoMaxAggregateInputType
  }

  export type GetStatuschamadoAggregateType<T extends StatuschamadoAggregateArgs> = {
        [P in keyof T & keyof AggregateStatuschamado]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStatuschamado[P]>
      : GetScalarType<T[P], AggregateStatuschamado[P]>
  }




  export type statuschamadoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: statuschamadoWhereInput
    orderBy?: statuschamadoOrderByWithAggregationInput | statuschamadoOrderByWithAggregationInput[]
    by: StatuschamadoScalarFieldEnum[] | StatuschamadoScalarFieldEnum
    having?: statuschamadoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StatuschamadoCountAggregateInputType | true
    _avg?: StatuschamadoAvgAggregateInputType
    _sum?: StatuschamadoSumAggregateInputType
    _min?: StatuschamadoMinAggregateInputType
    _max?: StatuschamadoMaxAggregateInputType
  }

  export type StatuschamadoGroupByOutputType = {
    idStatus: number
    nomeStatus: string
    ativo: number
    hexCorPrimaria: string
    hexCorSecundaria: string
    _count: StatuschamadoCountAggregateOutputType | null
    _avg: StatuschamadoAvgAggregateOutputType | null
    _sum: StatuschamadoSumAggregateOutputType | null
    _min: StatuschamadoMinAggregateOutputType | null
    _max: StatuschamadoMaxAggregateOutputType | null
  }

  type GetStatuschamadoGroupByPayload<T extends statuschamadoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StatuschamadoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StatuschamadoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StatuschamadoGroupByOutputType[P]>
            : GetScalarType<T[P], StatuschamadoGroupByOutputType[P]>
        }
      >
    >


  export type statuschamadoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idStatus?: boolean
    nomeStatus?: boolean
    ativo?: boolean
    hexCorPrimaria?: boolean
    hexCorSecundaria?: boolean
    chamado?: boolean | statuschamado$chamadoArgs<ExtArgs>
    _count?: boolean | StatuschamadoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["statuschamado"]>



  export type statuschamadoSelectScalar = {
    idStatus?: boolean
    nomeStatus?: boolean
    ativo?: boolean
    hexCorPrimaria?: boolean
    hexCorSecundaria?: boolean
  }

  export type statuschamadoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idStatus" | "nomeStatus" | "ativo" | "hexCorPrimaria" | "hexCorSecundaria", ExtArgs["result"]["statuschamado"]>
  export type statuschamadoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chamado?: boolean | statuschamado$chamadoArgs<ExtArgs>
    _count?: boolean | StatuschamadoCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $statuschamadoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "statuschamado"
    objects: {
      chamado: Prisma.$chamadoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      idStatus: number
      nomeStatus: string
      ativo: number
      hexCorPrimaria: string
      hexCorSecundaria: string
    }, ExtArgs["result"]["statuschamado"]>
    composites: {}
  }

  type statuschamadoGetPayload<S extends boolean | null | undefined | statuschamadoDefaultArgs> = $Result.GetResult<Prisma.$statuschamadoPayload, S>

  type statuschamadoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<statuschamadoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StatuschamadoCountAggregateInputType | true
    }

  export interface statuschamadoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['statuschamado'], meta: { name: 'statuschamado' } }
    /**
     * Find zero or one Statuschamado that matches the filter.
     * @param {statuschamadoFindUniqueArgs} args - Arguments to find a Statuschamado
     * @example
     * // Get one Statuschamado
     * const statuschamado = await prisma.statuschamado.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends statuschamadoFindUniqueArgs>(args: SelectSubset<T, statuschamadoFindUniqueArgs<ExtArgs>>): Prisma__statuschamadoClient<$Result.GetResult<Prisma.$statuschamadoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Statuschamado that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {statuschamadoFindUniqueOrThrowArgs} args - Arguments to find a Statuschamado
     * @example
     * // Get one Statuschamado
     * const statuschamado = await prisma.statuschamado.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends statuschamadoFindUniqueOrThrowArgs>(args: SelectSubset<T, statuschamadoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__statuschamadoClient<$Result.GetResult<Prisma.$statuschamadoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Statuschamado that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {statuschamadoFindFirstArgs} args - Arguments to find a Statuschamado
     * @example
     * // Get one Statuschamado
     * const statuschamado = await prisma.statuschamado.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends statuschamadoFindFirstArgs>(args?: SelectSubset<T, statuschamadoFindFirstArgs<ExtArgs>>): Prisma__statuschamadoClient<$Result.GetResult<Prisma.$statuschamadoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Statuschamado that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {statuschamadoFindFirstOrThrowArgs} args - Arguments to find a Statuschamado
     * @example
     * // Get one Statuschamado
     * const statuschamado = await prisma.statuschamado.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends statuschamadoFindFirstOrThrowArgs>(args?: SelectSubset<T, statuschamadoFindFirstOrThrowArgs<ExtArgs>>): Prisma__statuschamadoClient<$Result.GetResult<Prisma.$statuschamadoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Statuschamados that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {statuschamadoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Statuschamados
     * const statuschamados = await prisma.statuschamado.findMany()
     * 
     * // Get first 10 Statuschamados
     * const statuschamados = await prisma.statuschamado.findMany({ take: 10 })
     * 
     * // Only select the `idStatus`
     * const statuschamadoWithIdStatusOnly = await prisma.statuschamado.findMany({ select: { idStatus: true } })
     * 
     */
    findMany<T extends statuschamadoFindManyArgs>(args?: SelectSubset<T, statuschamadoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$statuschamadoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Statuschamado.
     * @param {statuschamadoCreateArgs} args - Arguments to create a Statuschamado.
     * @example
     * // Create one Statuschamado
     * const Statuschamado = await prisma.statuschamado.create({
     *   data: {
     *     // ... data to create a Statuschamado
     *   }
     * })
     * 
     */
    create<T extends statuschamadoCreateArgs>(args: SelectSubset<T, statuschamadoCreateArgs<ExtArgs>>): Prisma__statuschamadoClient<$Result.GetResult<Prisma.$statuschamadoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Statuschamados.
     * @param {statuschamadoCreateManyArgs} args - Arguments to create many Statuschamados.
     * @example
     * // Create many Statuschamados
     * const statuschamado = await prisma.statuschamado.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends statuschamadoCreateManyArgs>(args?: SelectSubset<T, statuschamadoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Statuschamado.
     * @param {statuschamadoDeleteArgs} args - Arguments to delete one Statuschamado.
     * @example
     * // Delete one Statuschamado
     * const Statuschamado = await prisma.statuschamado.delete({
     *   where: {
     *     // ... filter to delete one Statuschamado
     *   }
     * })
     * 
     */
    delete<T extends statuschamadoDeleteArgs>(args: SelectSubset<T, statuschamadoDeleteArgs<ExtArgs>>): Prisma__statuschamadoClient<$Result.GetResult<Prisma.$statuschamadoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Statuschamado.
     * @param {statuschamadoUpdateArgs} args - Arguments to update one Statuschamado.
     * @example
     * // Update one Statuschamado
     * const statuschamado = await prisma.statuschamado.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends statuschamadoUpdateArgs>(args: SelectSubset<T, statuschamadoUpdateArgs<ExtArgs>>): Prisma__statuschamadoClient<$Result.GetResult<Prisma.$statuschamadoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Statuschamados.
     * @param {statuschamadoDeleteManyArgs} args - Arguments to filter Statuschamados to delete.
     * @example
     * // Delete a few Statuschamados
     * const { count } = await prisma.statuschamado.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends statuschamadoDeleteManyArgs>(args?: SelectSubset<T, statuschamadoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Statuschamados.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {statuschamadoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Statuschamados
     * const statuschamado = await prisma.statuschamado.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends statuschamadoUpdateManyArgs>(args: SelectSubset<T, statuschamadoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Statuschamado.
     * @param {statuschamadoUpsertArgs} args - Arguments to update or create a Statuschamado.
     * @example
     * // Update or create a Statuschamado
     * const statuschamado = await prisma.statuschamado.upsert({
     *   create: {
     *     // ... data to create a Statuschamado
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Statuschamado we want to update
     *   }
     * })
     */
    upsert<T extends statuschamadoUpsertArgs>(args: SelectSubset<T, statuschamadoUpsertArgs<ExtArgs>>): Prisma__statuschamadoClient<$Result.GetResult<Prisma.$statuschamadoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Statuschamados.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {statuschamadoCountArgs} args - Arguments to filter Statuschamados to count.
     * @example
     * // Count the number of Statuschamados
     * const count = await prisma.statuschamado.count({
     *   where: {
     *     // ... the filter for the Statuschamados we want to count
     *   }
     * })
    **/
    count<T extends statuschamadoCountArgs>(
      args?: Subset<T, statuschamadoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StatuschamadoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Statuschamado.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatuschamadoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StatuschamadoAggregateArgs>(args: Subset<T, StatuschamadoAggregateArgs>): Prisma.PrismaPromise<GetStatuschamadoAggregateType<T>>

    /**
     * Group by Statuschamado.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {statuschamadoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends statuschamadoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: statuschamadoGroupByArgs['orderBy'] }
        : { orderBy?: statuschamadoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, statuschamadoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStatuschamadoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the statuschamado model
   */
  readonly fields: statuschamadoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for statuschamado.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__statuschamadoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chamado<T extends statuschamado$chamadoArgs<ExtArgs> = {}>(args?: Subset<T, statuschamado$chamadoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chamadoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the statuschamado model
   */
  interface statuschamadoFieldRefs {
    readonly idStatus: FieldRef<"statuschamado", 'Int'>
    readonly nomeStatus: FieldRef<"statuschamado", 'String'>
    readonly ativo: FieldRef<"statuschamado", 'Int'>
    readonly hexCorPrimaria: FieldRef<"statuschamado", 'String'>
    readonly hexCorSecundaria: FieldRef<"statuschamado", 'String'>
  }
    

  // Custom InputTypes
  /**
   * statuschamado findUnique
   */
  export type statuschamadoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the statuschamado
     */
    select?: statuschamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the statuschamado
     */
    omit?: statuschamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: statuschamadoInclude<ExtArgs> | null
    /**
     * Filter, which statuschamado to fetch.
     */
    where: statuschamadoWhereUniqueInput
  }

  /**
   * statuschamado findUniqueOrThrow
   */
  export type statuschamadoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the statuschamado
     */
    select?: statuschamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the statuschamado
     */
    omit?: statuschamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: statuschamadoInclude<ExtArgs> | null
    /**
     * Filter, which statuschamado to fetch.
     */
    where: statuschamadoWhereUniqueInput
  }

  /**
   * statuschamado findFirst
   */
  export type statuschamadoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the statuschamado
     */
    select?: statuschamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the statuschamado
     */
    omit?: statuschamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: statuschamadoInclude<ExtArgs> | null
    /**
     * Filter, which statuschamado to fetch.
     */
    where?: statuschamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of statuschamados to fetch.
     */
    orderBy?: statuschamadoOrderByWithRelationInput | statuschamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for statuschamados.
     */
    cursor?: statuschamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` statuschamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` statuschamados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of statuschamados.
     */
    distinct?: StatuschamadoScalarFieldEnum | StatuschamadoScalarFieldEnum[]
  }

  /**
   * statuschamado findFirstOrThrow
   */
  export type statuschamadoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the statuschamado
     */
    select?: statuschamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the statuschamado
     */
    omit?: statuschamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: statuschamadoInclude<ExtArgs> | null
    /**
     * Filter, which statuschamado to fetch.
     */
    where?: statuschamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of statuschamados to fetch.
     */
    orderBy?: statuschamadoOrderByWithRelationInput | statuschamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for statuschamados.
     */
    cursor?: statuschamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` statuschamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` statuschamados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of statuschamados.
     */
    distinct?: StatuschamadoScalarFieldEnum | StatuschamadoScalarFieldEnum[]
  }

  /**
   * statuschamado findMany
   */
  export type statuschamadoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the statuschamado
     */
    select?: statuschamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the statuschamado
     */
    omit?: statuschamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: statuschamadoInclude<ExtArgs> | null
    /**
     * Filter, which statuschamados to fetch.
     */
    where?: statuschamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of statuschamados to fetch.
     */
    orderBy?: statuschamadoOrderByWithRelationInput | statuschamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing statuschamados.
     */
    cursor?: statuschamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` statuschamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` statuschamados.
     */
    skip?: number
    distinct?: StatuschamadoScalarFieldEnum | StatuschamadoScalarFieldEnum[]
  }

  /**
   * statuschamado create
   */
  export type statuschamadoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the statuschamado
     */
    select?: statuschamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the statuschamado
     */
    omit?: statuschamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: statuschamadoInclude<ExtArgs> | null
    /**
     * The data needed to create a statuschamado.
     */
    data: XOR<statuschamadoCreateInput, statuschamadoUncheckedCreateInput>
  }

  /**
   * statuschamado createMany
   */
  export type statuschamadoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many statuschamados.
     */
    data: statuschamadoCreateManyInput | statuschamadoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * statuschamado update
   */
  export type statuschamadoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the statuschamado
     */
    select?: statuschamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the statuschamado
     */
    omit?: statuschamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: statuschamadoInclude<ExtArgs> | null
    /**
     * The data needed to update a statuschamado.
     */
    data: XOR<statuschamadoUpdateInput, statuschamadoUncheckedUpdateInput>
    /**
     * Choose, which statuschamado to update.
     */
    where: statuschamadoWhereUniqueInput
  }

  /**
   * statuschamado updateMany
   */
  export type statuschamadoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update statuschamados.
     */
    data: XOR<statuschamadoUpdateManyMutationInput, statuschamadoUncheckedUpdateManyInput>
    /**
     * Filter which statuschamados to update
     */
    where?: statuschamadoWhereInput
    /**
     * Limit how many statuschamados to update.
     */
    limit?: number
  }

  /**
   * statuschamado upsert
   */
  export type statuschamadoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the statuschamado
     */
    select?: statuschamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the statuschamado
     */
    omit?: statuschamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: statuschamadoInclude<ExtArgs> | null
    /**
     * The filter to search for the statuschamado to update in case it exists.
     */
    where: statuschamadoWhereUniqueInput
    /**
     * In case the statuschamado found by the `where` argument doesn't exist, create a new statuschamado with this data.
     */
    create: XOR<statuschamadoCreateInput, statuschamadoUncheckedCreateInput>
    /**
     * In case the statuschamado was found with the provided `where` argument, update it with this data.
     */
    update: XOR<statuschamadoUpdateInput, statuschamadoUncheckedUpdateInput>
  }

  /**
   * statuschamado delete
   */
  export type statuschamadoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the statuschamado
     */
    select?: statuschamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the statuschamado
     */
    omit?: statuschamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: statuschamadoInclude<ExtArgs> | null
    /**
     * Filter which statuschamado to delete.
     */
    where: statuschamadoWhereUniqueInput
  }

  /**
   * statuschamado deleteMany
   */
  export type statuschamadoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which statuschamados to delete
     */
    where?: statuschamadoWhereInput
    /**
     * Limit how many statuschamados to delete.
     */
    limit?: number
  }

  /**
   * statuschamado.chamado
   */
  export type statuschamado$chamadoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chamado
     */
    select?: chamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chamado
     */
    omit?: chamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chamadoInclude<ExtArgs> | null
    where?: chamadoWhereInput
    orderBy?: chamadoOrderByWithRelationInput | chamadoOrderByWithRelationInput[]
    cursor?: chamadoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChamadoScalarFieldEnum | ChamadoScalarFieldEnum[]
  }

  /**
   * statuschamado without action
   */
  export type statuschamadoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the statuschamado
     */
    select?: statuschamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the statuschamado
     */
    omit?: statuschamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: statuschamadoInclude<ExtArgs> | null
  }


  /**
   * Model tipochamado
   */

  export type AggregateTipochamado = {
    _count: TipochamadoCountAggregateOutputType | null
    _avg: TipochamadoAvgAggregateOutputType | null
    _sum: TipochamadoSumAggregateOutputType | null
    _min: TipochamadoMinAggregateOutputType | null
    _max: TipochamadoMaxAggregateOutputType | null
  }

  export type TipochamadoAvgAggregateOutputType = {
    idTipoChamado: number | null
    ativo: number | null
  }

  export type TipochamadoSumAggregateOutputType = {
    idTipoChamado: number | null
    ativo: number | null
  }

  export type TipochamadoMinAggregateOutputType = {
    idTipoChamado: number | null
    nomeTipo: string | null
    ativo: number | null
  }

  export type TipochamadoMaxAggregateOutputType = {
    idTipoChamado: number | null
    nomeTipo: string | null
    ativo: number | null
  }

  export type TipochamadoCountAggregateOutputType = {
    idTipoChamado: number
    nomeTipo: number
    ativo: number
    _all: number
  }


  export type TipochamadoAvgAggregateInputType = {
    idTipoChamado?: true
    ativo?: true
  }

  export type TipochamadoSumAggregateInputType = {
    idTipoChamado?: true
    ativo?: true
  }

  export type TipochamadoMinAggregateInputType = {
    idTipoChamado?: true
    nomeTipo?: true
    ativo?: true
  }

  export type TipochamadoMaxAggregateInputType = {
    idTipoChamado?: true
    nomeTipo?: true
    ativo?: true
  }

  export type TipochamadoCountAggregateInputType = {
    idTipoChamado?: true
    nomeTipo?: true
    ativo?: true
    _all?: true
  }

  export type TipochamadoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tipochamado to aggregate.
     */
    where?: tipochamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tipochamados to fetch.
     */
    orderBy?: tipochamadoOrderByWithRelationInput | tipochamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tipochamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tipochamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tipochamados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tipochamados
    **/
    _count?: true | TipochamadoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TipochamadoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TipochamadoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TipochamadoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TipochamadoMaxAggregateInputType
  }

  export type GetTipochamadoAggregateType<T extends TipochamadoAggregateArgs> = {
        [P in keyof T & keyof AggregateTipochamado]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTipochamado[P]>
      : GetScalarType<T[P], AggregateTipochamado[P]>
  }




  export type tipochamadoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tipochamadoWhereInput
    orderBy?: tipochamadoOrderByWithAggregationInput | tipochamadoOrderByWithAggregationInput[]
    by: TipochamadoScalarFieldEnum[] | TipochamadoScalarFieldEnum
    having?: tipochamadoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TipochamadoCountAggregateInputType | true
    _avg?: TipochamadoAvgAggregateInputType
    _sum?: TipochamadoSumAggregateInputType
    _min?: TipochamadoMinAggregateInputType
    _max?: TipochamadoMaxAggregateInputType
  }

  export type TipochamadoGroupByOutputType = {
    idTipoChamado: number
    nomeTipo: string
    ativo: number
    _count: TipochamadoCountAggregateOutputType | null
    _avg: TipochamadoAvgAggregateOutputType | null
    _sum: TipochamadoSumAggregateOutputType | null
    _min: TipochamadoMinAggregateOutputType | null
    _max: TipochamadoMaxAggregateOutputType | null
  }

  type GetTipochamadoGroupByPayload<T extends tipochamadoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TipochamadoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TipochamadoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TipochamadoGroupByOutputType[P]>
            : GetScalarType<T[P], TipochamadoGroupByOutputType[P]>
        }
      >
    >


  export type tipochamadoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idTipoChamado?: boolean
    nomeTipo?: boolean
    ativo?: boolean
    chamado?: boolean | tipochamado$chamadoArgs<ExtArgs>
    _count?: boolean | TipochamadoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tipochamado"]>



  export type tipochamadoSelectScalar = {
    idTipoChamado?: boolean
    nomeTipo?: boolean
    ativo?: boolean
  }

  export type tipochamadoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idTipoChamado" | "nomeTipo" | "ativo", ExtArgs["result"]["tipochamado"]>
  export type tipochamadoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chamado?: boolean | tipochamado$chamadoArgs<ExtArgs>
    _count?: boolean | TipochamadoCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $tipochamadoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tipochamado"
    objects: {
      chamado: Prisma.$chamadoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      idTipoChamado: number
      nomeTipo: string
      ativo: number
    }, ExtArgs["result"]["tipochamado"]>
    composites: {}
  }

  type tipochamadoGetPayload<S extends boolean | null | undefined | tipochamadoDefaultArgs> = $Result.GetResult<Prisma.$tipochamadoPayload, S>

  type tipochamadoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tipochamadoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TipochamadoCountAggregateInputType | true
    }

  export interface tipochamadoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tipochamado'], meta: { name: 'tipochamado' } }
    /**
     * Find zero or one Tipochamado that matches the filter.
     * @param {tipochamadoFindUniqueArgs} args - Arguments to find a Tipochamado
     * @example
     * // Get one Tipochamado
     * const tipochamado = await prisma.tipochamado.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tipochamadoFindUniqueArgs>(args: SelectSubset<T, tipochamadoFindUniqueArgs<ExtArgs>>): Prisma__tipochamadoClient<$Result.GetResult<Prisma.$tipochamadoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tipochamado that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tipochamadoFindUniqueOrThrowArgs} args - Arguments to find a Tipochamado
     * @example
     * // Get one Tipochamado
     * const tipochamado = await prisma.tipochamado.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tipochamadoFindUniqueOrThrowArgs>(args: SelectSubset<T, tipochamadoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tipochamadoClient<$Result.GetResult<Prisma.$tipochamadoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tipochamado that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipochamadoFindFirstArgs} args - Arguments to find a Tipochamado
     * @example
     * // Get one Tipochamado
     * const tipochamado = await prisma.tipochamado.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tipochamadoFindFirstArgs>(args?: SelectSubset<T, tipochamadoFindFirstArgs<ExtArgs>>): Prisma__tipochamadoClient<$Result.GetResult<Prisma.$tipochamadoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tipochamado that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipochamadoFindFirstOrThrowArgs} args - Arguments to find a Tipochamado
     * @example
     * // Get one Tipochamado
     * const tipochamado = await prisma.tipochamado.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tipochamadoFindFirstOrThrowArgs>(args?: SelectSubset<T, tipochamadoFindFirstOrThrowArgs<ExtArgs>>): Prisma__tipochamadoClient<$Result.GetResult<Prisma.$tipochamadoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tipochamados that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipochamadoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tipochamados
     * const tipochamados = await prisma.tipochamado.findMany()
     * 
     * // Get first 10 Tipochamados
     * const tipochamados = await prisma.tipochamado.findMany({ take: 10 })
     * 
     * // Only select the `idTipoChamado`
     * const tipochamadoWithIdTipoChamadoOnly = await prisma.tipochamado.findMany({ select: { idTipoChamado: true } })
     * 
     */
    findMany<T extends tipochamadoFindManyArgs>(args?: SelectSubset<T, tipochamadoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tipochamadoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tipochamado.
     * @param {tipochamadoCreateArgs} args - Arguments to create a Tipochamado.
     * @example
     * // Create one Tipochamado
     * const Tipochamado = await prisma.tipochamado.create({
     *   data: {
     *     // ... data to create a Tipochamado
     *   }
     * })
     * 
     */
    create<T extends tipochamadoCreateArgs>(args: SelectSubset<T, tipochamadoCreateArgs<ExtArgs>>): Prisma__tipochamadoClient<$Result.GetResult<Prisma.$tipochamadoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tipochamados.
     * @param {tipochamadoCreateManyArgs} args - Arguments to create many Tipochamados.
     * @example
     * // Create many Tipochamados
     * const tipochamado = await prisma.tipochamado.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tipochamadoCreateManyArgs>(args?: SelectSubset<T, tipochamadoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tipochamado.
     * @param {tipochamadoDeleteArgs} args - Arguments to delete one Tipochamado.
     * @example
     * // Delete one Tipochamado
     * const Tipochamado = await prisma.tipochamado.delete({
     *   where: {
     *     // ... filter to delete one Tipochamado
     *   }
     * })
     * 
     */
    delete<T extends tipochamadoDeleteArgs>(args: SelectSubset<T, tipochamadoDeleteArgs<ExtArgs>>): Prisma__tipochamadoClient<$Result.GetResult<Prisma.$tipochamadoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tipochamado.
     * @param {tipochamadoUpdateArgs} args - Arguments to update one Tipochamado.
     * @example
     * // Update one Tipochamado
     * const tipochamado = await prisma.tipochamado.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tipochamadoUpdateArgs>(args: SelectSubset<T, tipochamadoUpdateArgs<ExtArgs>>): Prisma__tipochamadoClient<$Result.GetResult<Prisma.$tipochamadoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tipochamados.
     * @param {tipochamadoDeleteManyArgs} args - Arguments to filter Tipochamados to delete.
     * @example
     * // Delete a few Tipochamados
     * const { count } = await prisma.tipochamado.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tipochamadoDeleteManyArgs>(args?: SelectSubset<T, tipochamadoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tipochamados.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipochamadoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tipochamados
     * const tipochamado = await prisma.tipochamado.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tipochamadoUpdateManyArgs>(args: SelectSubset<T, tipochamadoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tipochamado.
     * @param {tipochamadoUpsertArgs} args - Arguments to update or create a Tipochamado.
     * @example
     * // Update or create a Tipochamado
     * const tipochamado = await prisma.tipochamado.upsert({
     *   create: {
     *     // ... data to create a Tipochamado
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tipochamado we want to update
     *   }
     * })
     */
    upsert<T extends tipochamadoUpsertArgs>(args: SelectSubset<T, tipochamadoUpsertArgs<ExtArgs>>): Prisma__tipochamadoClient<$Result.GetResult<Prisma.$tipochamadoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tipochamados.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipochamadoCountArgs} args - Arguments to filter Tipochamados to count.
     * @example
     * // Count the number of Tipochamados
     * const count = await prisma.tipochamado.count({
     *   where: {
     *     // ... the filter for the Tipochamados we want to count
     *   }
     * })
    **/
    count<T extends tipochamadoCountArgs>(
      args?: Subset<T, tipochamadoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TipochamadoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tipochamado.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipochamadoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TipochamadoAggregateArgs>(args: Subset<T, TipochamadoAggregateArgs>): Prisma.PrismaPromise<GetTipochamadoAggregateType<T>>

    /**
     * Group by Tipochamado.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipochamadoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends tipochamadoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tipochamadoGroupByArgs['orderBy'] }
        : { orderBy?: tipochamadoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, tipochamadoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTipochamadoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tipochamado model
   */
  readonly fields: tipochamadoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tipochamado.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tipochamadoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chamado<T extends tipochamado$chamadoArgs<ExtArgs> = {}>(args?: Subset<T, tipochamado$chamadoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chamadoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the tipochamado model
   */
  interface tipochamadoFieldRefs {
    readonly idTipoChamado: FieldRef<"tipochamado", 'Int'>
    readonly nomeTipo: FieldRef<"tipochamado", 'String'>
    readonly ativo: FieldRef<"tipochamado", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * tipochamado findUnique
   */
  export type tipochamadoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipochamado
     */
    select?: tipochamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipochamado
     */
    omit?: tipochamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipochamadoInclude<ExtArgs> | null
    /**
     * Filter, which tipochamado to fetch.
     */
    where: tipochamadoWhereUniqueInput
  }

  /**
   * tipochamado findUniqueOrThrow
   */
  export type tipochamadoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipochamado
     */
    select?: tipochamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipochamado
     */
    omit?: tipochamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipochamadoInclude<ExtArgs> | null
    /**
     * Filter, which tipochamado to fetch.
     */
    where: tipochamadoWhereUniqueInput
  }

  /**
   * tipochamado findFirst
   */
  export type tipochamadoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipochamado
     */
    select?: tipochamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipochamado
     */
    omit?: tipochamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipochamadoInclude<ExtArgs> | null
    /**
     * Filter, which tipochamado to fetch.
     */
    where?: tipochamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tipochamados to fetch.
     */
    orderBy?: tipochamadoOrderByWithRelationInput | tipochamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tipochamados.
     */
    cursor?: tipochamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tipochamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tipochamados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tipochamados.
     */
    distinct?: TipochamadoScalarFieldEnum | TipochamadoScalarFieldEnum[]
  }

  /**
   * tipochamado findFirstOrThrow
   */
  export type tipochamadoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipochamado
     */
    select?: tipochamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipochamado
     */
    omit?: tipochamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipochamadoInclude<ExtArgs> | null
    /**
     * Filter, which tipochamado to fetch.
     */
    where?: tipochamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tipochamados to fetch.
     */
    orderBy?: tipochamadoOrderByWithRelationInput | tipochamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tipochamados.
     */
    cursor?: tipochamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tipochamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tipochamados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tipochamados.
     */
    distinct?: TipochamadoScalarFieldEnum | TipochamadoScalarFieldEnum[]
  }

  /**
   * tipochamado findMany
   */
  export type tipochamadoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipochamado
     */
    select?: tipochamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipochamado
     */
    omit?: tipochamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipochamadoInclude<ExtArgs> | null
    /**
     * Filter, which tipochamados to fetch.
     */
    where?: tipochamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tipochamados to fetch.
     */
    orderBy?: tipochamadoOrderByWithRelationInput | tipochamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tipochamados.
     */
    cursor?: tipochamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tipochamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tipochamados.
     */
    skip?: number
    distinct?: TipochamadoScalarFieldEnum | TipochamadoScalarFieldEnum[]
  }

  /**
   * tipochamado create
   */
  export type tipochamadoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipochamado
     */
    select?: tipochamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipochamado
     */
    omit?: tipochamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipochamadoInclude<ExtArgs> | null
    /**
     * The data needed to create a tipochamado.
     */
    data: XOR<tipochamadoCreateInput, tipochamadoUncheckedCreateInput>
  }

  /**
   * tipochamado createMany
   */
  export type tipochamadoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tipochamados.
     */
    data: tipochamadoCreateManyInput | tipochamadoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tipochamado update
   */
  export type tipochamadoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipochamado
     */
    select?: tipochamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipochamado
     */
    omit?: tipochamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipochamadoInclude<ExtArgs> | null
    /**
     * The data needed to update a tipochamado.
     */
    data: XOR<tipochamadoUpdateInput, tipochamadoUncheckedUpdateInput>
    /**
     * Choose, which tipochamado to update.
     */
    where: tipochamadoWhereUniqueInput
  }

  /**
   * tipochamado updateMany
   */
  export type tipochamadoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tipochamados.
     */
    data: XOR<tipochamadoUpdateManyMutationInput, tipochamadoUncheckedUpdateManyInput>
    /**
     * Filter which tipochamados to update
     */
    where?: tipochamadoWhereInput
    /**
     * Limit how many tipochamados to update.
     */
    limit?: number
  }

  /**
   * tipochamado upsert
   */
  export type tipochamadoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipochamado
     */
    select?: tipochamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipochamado
     */
    omit?: tipochamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipochamadoInclude<ExtArgs> | null
    /**
     * The filter to search for the tipochamado to update in case it exists.
     */
    where: tipochamadoWhereUniqueInput
    /**
     * In case the tipochamado found by the `where` argument doesn't exist, create a new tipochamado with this data.
     */
    create: XOR<tipochamadoCreateInput, tipochamadoUncheckedCreateInput>
    /**
     * In case the tipochamado was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tipochamadoUpdateInput, tipochamadoUncheckedUpdateInput>
  }

  /**
   * tipochamado delete
   */
  export type tipochamadoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipochamado
     */
    select?: tipochamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipochamado
     */
    omit?: tipochamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipochamadoInclude<ExtArgs> | null
    /**
     * Filter which tipochamado to delete.
     */
    where: tipochamadoWhereUniqueInput
  }

  /**
   * tipochamado deleteMany
   */
  export type tipochamadoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tipochamados to delete
     */
    where?: tipochamadoWhereInput
    /**
     * Limit how many tipochamados to delete.
     */
    limit?: number
  }

  /**
   * tipochamado.chamado
   */
  export type tipochamado$chamadoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chamado
     */
    select?: chamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chamado
     */
    omit?: chamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chamadoInclude<ExtArgs> | null
    where?: chamadoWhereInput
    orderBy?: chamadoOrderByWithRelationInput | chamadoOrderByWithRelationInput[]
    cursor?: chamadoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChamadoScalarFieldEnum | ChamadoScalarFieldEnum[]
  }

  /**
   * tipochamado without action
   */
  export type tipochamadoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipochamado
     */
    select?: tipochamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipochamado
     */
    omit?: tipochamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipochamadoInclude<ExtArgs> | null
  }


  /**
   * Model tipousuario
   */

  export type AggregateTipousuario = {
    _count: TipousuarioCountAggregateOutputType | null
    _avg: TipousuarioAvgAggregateOutputType | null
    _sum: TipousuarioSumAggregateOutputType | null
    _min: TipousuarioMinAggregateOutputType | null
    _max: TipousuarioMaxAggregateOutputType | null
  }

  export type TipousuarioAvgAggregateOutputType = {
    idTipoUsuario: number | null
  }

  export type TipousuarioSumAggregateOutputType = {
    idTipoUsuario: number | null
  }

  export type TipousuarioMinAggregateOutputType = {
    idTipoUsuario: number | null
    tipoUsuario: string | null
  }

  export type TipousuarioMaxAggregateOutputType = {
    idTipoUsuario: number | null
    tipoUsuario: string | null
  }

  export type TipousuarioCountAggregateOutputType = {
    idTipoUsuario: number
    tipoUsuario: number
    _all: number
  }


  export type TipousuarioAvgAggregateInputType = {
    idTipoUsuario?: true
  }

  export type TipousuarioSumAggregateInputType = {
    idTipoUsuario?: true
  }

  export type TipousuarioMinAggregateInputType = {
    idTipoUsuario?: true
    tipoUsuario?: true
  }

  export type TipousuarioMaxAggregateInputType = {
    idTipoUsuario?: true
    tipoUsuario?: true
  }

  export type TipousuarioCountAggregateInputType = {
    idTipoUsuario?: true
    tipoUsuario?: true
    _all?: true
  }

  export type TipousuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tipousuario to aggregate.
     */
    where?: tipousuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tipousuarios to fetch.
     */
    orderBy?: tipousuarioOrderByWithRelationInput | tipousuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tipousuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tipousuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tipousuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tipousuarios
    **/
    _count?: true | TipousuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TipousuarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TipousuarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TipousuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TipousuarioMaxAggregateInputType
  }

  export type GetTipousuarioAggregateType<T extends TipousuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateTipousuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTipousuario[P]>
      : GetScalarType<T[P], AggregateTipousuario[P]>
  }




  export type tipousuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tipousuarioWhereInput
    orderBy?: tipousuarioOrderByWithAggregationInput | tipousuarioOrderByWithAggregationInput[]
    by: TipousuarioScalarFieldEnum[] | TipousuarioScalarFieldEnum
    having?: tipousuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TipousuarioCountAggregateInputType | true
    _avg?: TipousuarioAvgAggregateInputType
    _sum?: TipousuarioSumAggregateInputType
    _min?: TipousuarioMinAggregateInputType
    _max?: TipousuarioMaxAggregateInputType
  }

  export type TipousuarioGroupByOutputType = {
    idTipoUsuario: number
    tipoUsuario: string
    _count: TipousuarioCountAggregateOutputType | null
    _avg: TipousuarioAvgAggregateOutputType | null
    _sum: TipousuarioSumAggregateOutputType | null
    _min: TipousuarioMinAggregateOutputType | null
    _max: TipousuarioMaxAggregateOutputType | null
  }

  type GetTipousuarioGroupByPayload<T extends tipousuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TipousuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TipousuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TipousuarioGroupByOutputType[P]>
            : GetScalarType<T[P], TipousuarioGroupByOutputType[P]>
        }
      >
    >


  export type tipousuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idTipoUsuario?: boolean
    tipoUsuario?: boolean
    usuario?: boolean | tipousuario$usuarioArgs<ExtArgs>
    _count?: boolean | TipousuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tipousuario"]>



  export type tipousuarioSelectScalar = {
    idTipoUsuario?: boolean
    tipoUsuario?: boolean
  }

  export type tipousuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idTipoUsuario" | "tipoUsuario", ExtArgs["result"]["tipousuario"]>
  export type tipousuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | tipousuario$usuarioArgs<ExtArgs>
    _count?: boolean | TipousuarioCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $tipousuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tipousuario"
    objects: {
      usuario: Prisma.$usuarioPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      idTipoUsuario: number
      tipoUsuario: string
    }, ExtArgs["result"]["tipousuario"]>
    composites: {}
  }

  type tipousuarioGetPayload<S extends boolean | null | undefined | tipousuarioDefaultArgs> = $Result.GetResult<Prisma.$tipousuarioPayload, S>

  type tipousuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tipousuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TipousuarioCountAggregateInputType | true
    }

  export interface tipousuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tipousuario'], meta: { name: 'tipousuario' } }
    /**
     * Find zero or one Tipousuario that matches the filter.
     * @param {tipousuarioFindUniqueArgs} args - Arguments to find a Tipousuario
     * @example
     * // Get one Tipousuario
     * const tipousuario = await prisma.tipousuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tipousuarioFindUniqueArgs>(args: SelectSubset<T, tipousuarioFindUniqueArgs<ExtArgs>>): Prisma__tipousuarioClient<$Result.GetResult<Prisma.$tipousuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tipousuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tipousuarioFindUniqueOrThrowArgs} args - Arguments to find a Tipousuario
     * @example
     * // Get one Tipousuario
     * const tipousuario = await prisma.tipousuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tipousuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, tipousuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tipousuarioClient<$Result.GetResult<Prisma.$tipousuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tipousuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipousuarioFindFirstArgs} args - Arguments to find a Tipousuario
     * @example
     * // Get one Tipousuario
     * const tipousuario = await prisma.tipousuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tipousuarioFindFirstArgs>(args?: SelectSubset<T, tipousuarioFindFirstArgs<ExtArgs>>): Prisma__tipousuarioClient<$Result.GetResult<Prisma.$tipousuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tipousuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipousuarioFindFirstOrThrowArgs} args - Arguments to find a Tipousuario
     * @example
     * // Get one Tipousuario
     * const tipousuario = await prisma.tipousuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tipousuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, tipousuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__tipousuarioClient<$Result.GetResult<Prisma.$tipousuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tipousuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipousuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tipousuarios
     * const tipousuarios = await prisma.tipousuario.findMany()
     * 
     * // Get first 10 Tipousuarios
     * const tipousuarios = await prisma.tipousuario.findMany({ take: 10 })
     * 
     * // Only select the `idTipoUsuario`
     * const tipousuarioWithIdTipoUsuarioOnly = await prisma.tipousuario.findMany({ select: { idTipoUsuario: true } })
     * 
     */
    findMany<T extends tipousuarioFindManyArgs>(args?: SelectSubset<T, tipousuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tipousuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tipousuario.
     * @param {tipousuarioCreateArgs} args - Arguments to create a Tipousuario.
     * @example
     * // Create one Tipousuario
     * const Tipousuario = await prisma.tipousuario.create({
     *   data: {
     *     // ... data to create a Tipousuario
     *   }
     * })
     * 
     */
    create<T extends tipousuarioCreateArgs>(args: SelectSubset<T, tipousuarioCreateArgs<ExtArgs>>): Prisma__tipousuarioClient<$Result.GetResult<Prisma.$tipousuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tipousuarios.
     * @param {tipousuarioCreateManyArgs} args - Arguments to create many Tipousuarios.
     * @example
     * // Create many Tipousuarios
     * const tipousuario = await prisma.tipousuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tipousuarioCreateManyArgs>(args?: SelectSubset<T, tipousuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tipousuario.
     * @param {tipousuarioDeleteArgs} args - Arguments to delete one Tipousuario.
     * @example
     * // Delete one Tipousuario
     * const Tipousuario = await prisma.tipousuario.delete({
     *   where: {
     *     // ... filter to delete one Tipousuario
     *   }
     * })
     * 
     */
    delete<T extends tipousuarioDeleteArgs>(args: SelectSubset<T, tipousuarioDeleteArgs<ExtArgs>>): Prisma__tipousuarioClient<$Result.GetResult<Prisma.$tipousuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tipousuario.
     * @param {tipousuarioUpdateArgs} args - Arguments to update one Tipousuario.
     * @example
     * // Update one Tipousuario
     * const tipousuario = await prisma.tipousuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tipousuarioUpdateArgs>(args: SelectSubset<T, tipousuarioUpdateArgs<ExtArgs>>): Prisma__tipousuarioClient<$Result.GetResult<Prisma.$tipousuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tipousuarios.
     * @param {tipousuarioDeleteManyArgs} args - Arguments to filter Tipousuarios to delete.
     * @example
     * // Delete a few Tipousuarios
     * const { count } = await prisma.tipousuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tipousuarioDeleteManyArgs>(args?: SelectSubset<T, tipousuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tipousuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipousuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tipousuarios
     * const tipousuario = await prisma.tipousuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tipousuarioUpdateManyArgs>(args: SelectSubset<T, tipousuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tipousuario.
     * @param {tipousuarioUpsertArgs} args - Arguments to update or create a Tipousuario.
     * @example
     * // Update or create a Tipousuario
     * const tipousuario = await prisma.tipousuario.upsert({
     *   create: {
     *     // ... data to create a Tipousuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tipousuario we want to update
     *   }
     * })
     */
    upsert<T extends tipousuarioUpsertArgs>(args: SelectSubset<T, tipousuarioUpsertArgs<ExtArgs>>): Prisma__tipousuarioClient<$Result.GetResult<Prisma.$tipousuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tipousuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipousuarioCountArgs} args - Arguments to filter Tipousuarios to count.
     * @example
     * // Count the number of Tipousuarios
     * const count = await prisma.tipousuario.count({
     *   where: {
     *     // ... the filter for the Tipousuarios we want to count
     *   }
     * })
    **/
    count<T extends tipousuarioCountArgs>(
      args?: Subset<T, tipousuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TipousuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tipousuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipousuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TipousuarioAggregateArgs>(args: Subset<T, TipousuarioAggregateArgs>): Prisma.PrismaPromise<GetTipousuarioAggregateType<T>>

    /**
     * Group by Tipousuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipousuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends tipousuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tipousuarioGroupByArgs['orderBy'] }
        : { orderBy?: tipousuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, tipousuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTipousuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tipousuario model
   */
  readonly fields: tipousuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tipousuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tipousuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends tipousuario$usuarioArgs<ExtArgs> = {}>(args?: Subset<T, tipousuario$usuarioArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the tipousuario model
   */
  interface tipousuarioFieldRefs {
    readonly idTipoUsuario: FieldRef<"tipousuario", 'Int'>
    readonly tipoUsuario: FieldRef<"tipousuario", 'String'>
  }
    

  // Custom InputTypes
  /**
   * tipousuario findUnique
   */
  export type tipousuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipousuario
     */
    select?: tipousuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipousuario
     */
    omit?: tipousuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipousuarioInclude<ExtArgs> | null
    /**
     * Filter, which tipousuario to fetch.
     */
    where: tipousuarioWhereUniqueInput
  }

  /**
   * tipousuario findUniqueOrThrow
   */
  export type tipousuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipousuario
     */
    select?: tipousuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipousuario
     */
    omit?: tipousuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipousuarioInclude<ExtArgs> | null
    /**
     * Filter, which tipousuario to fetch.
     */
    where: tipousuarioWhereUniqueInput
  }

  /**
   * tipousuario findFirst
   */
  export type tipousuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipousuario
     */
    select?: tipousuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipousuario
     */
    omit?: tipousuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipousuarioInclude<ExtArgs> | null
    /**
     * Filter, which tipousuario to fetch.
     */
    where?: tipousuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tipousuarios to fetch.
     */
    orderBy?: tipousuarioOrderByWithRelationInput | tipousuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tipousuarios.
     */
    cursor?: tipousuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tipousuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tipousuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tipousuarios.
     */
    distinct?: TipousuarioScalarFieldEnum | TipousuarioScalarFieldEnum[]
  }

  /**
   * tipousuario findFirstOrThrow
   */
  export type tipousuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipousuario
     */
    select?: tipousuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipousuario
     */
    omit?: tipousuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipousuarioInclude<ExtArgs> | null
    /**
     * Filter, which tipousuario to fetch.
     */
    where?: tipousuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tipousuarios to fetch.
     */
    orderBy?: tipousuarioOrderByWithRelationInput | tipousuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tipousuarios.
     */
    cursor?: tipousuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tipousuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tipousuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tipousuarios.
     */
    distinct?: TipousuarioScalarFieldEnum | TipousuarioScalarFieldEnum[]
  }

  /**
   * tipousuario findMany
   */
  export type tipousuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipousuario
     */
    select?: tipousuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipousuario
     */
    omit?: tipousuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipousuarioInclude<ExtArgs> | null
    /**
     * Filter, which tipousuarios to fetch.
     */
    where?: tipousuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tipousuarios to fetch.
     */
    orderBy?: tipousuarioOrderByWithRelationInput | tipousuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tipousuarios.
     */
    cursor?: tipousuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tipousuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tipousuarios.
     */
    skip?: number
    distinct?: TipousuarioScalarFieldEnum | TipousuarioScalarFieldEnum[]
  }

  /**
   * tipousuario create
   */
  export type tipousuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipousuario
     */
    select?: tipousuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipousuario
     */
    omit?: tipousuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipousuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a tipousuario.
     */
    data: XOR<tipousuarioCreateInput, tipousuarioUncheckedCreateInput>
  }

  /**
   * tipousuario createMany
   */
  export type tipousuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tipousuarios.
     */
    data: tipousuarioCreateManyInput | tipousuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tipousuario update
   */
  export type tipousuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipousuario
     */
    select?: tipousuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipousuario
     */
    omit?: tipousuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipousuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a tipousuario.
     */
    data: XOR<tipousuarioUpdateInput, tipousuarioUncheckedUpdateInput>
    /**
     * Choose, which tipousuario to update.
     */
    where: tipousuarioWhereUniqueInput
  }

  /**
   * tipousuario updateMany
   */
  export type tipousuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tipousuarios.
     */
    data: XOR<tipousuarioUpdateManyMutationInput, tipousuarioUncheckedUpdateManyInput>
    /**
     * Filter which tipousuarios to update
     */
    where?: tipousuarioWhereInput
    /**
     * Limit how many tipousuarios to update.
     */
    limit?: number
  }

  /**
   * tipousuario upsert
   */
  export type tipousuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipousuario
     */
    select?: tipousuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipousuario
     */
    omit?: tipousuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipousuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the tipousuario to update in case it exists.
     */
    where: tipousuarioWhereUniqueInput
    /**
     * In case the tipousuario found by the `where` argument doesn't exist, create a new tipousuario with this data.
     */
    create: XOR<tipousuarioCreateInput, tipousuarioUncheckedCreateInput>
    /**
     * In case the tipousuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tipousuarioUpdateInput, tipousuarioUncheckedUpdateInput>
  }

  /**
   * tipousuario delete
   */
  export type tipousuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipousuario
     */
    select?: tipousuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipousuario
     */
    omit?: tipousuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipousuarioInclude<ExtArgs> | null
    /**
     * Filter which tipousuario to delete.
     */
    where: tipousuarioWhereUniqueInput
  }

  /**
   * tipousuario deleteMany
   */
  export type tipousuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tipousuarios to delete
     */
    where?: tipousuarioWhereInput
    /**
     * Limit how many tipousuarios to delete.
     */
    limit?: number
  }

  /**
   * tipousuario.usuario
   */
  export type tipousuario$usuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    where?: usuarioWhereInput
    orderBy?: usuarioOrderByWithRelationInput | usuarioOrderByWithRelationInput[]
    cursor?: usuarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * tipousuario without action
   */
  export type tipousuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipousuario
     */
    select?: tipousuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipousuario
     */
    omit?: tipousuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipousuarioInclude<ExtArgs> | null
  }


  /**
   * Model usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioAvgAggregateOutputType = {
    idUsuario: number | null
    ativo: number | null
    idGerencia: number | null
    idTipoUsuario: number | null
  }

  export type UsuarioSumAggregateOutputType = {
    idUsuario: number | null
    ativo: number | null
    idGerencia: number | null
    idTipoUsuario: number | null
  }

  export type UsuarioMinAggregateOutputType = {
    idUsuario: number | null
    matricula: string | null
    nomeUsuario: string | null
    email: string | null
    senha: string | null
    dataCadastro: Date | null
    ativo: number | null
    ramal: string | null
    fotoPerfil: string | null
    idGerencia: number | null
    idTipoUsuario: number | null
  }

  export type UsuarioMaxAggregateOutputType = {
    idUsuario: number | null
    matricula: string | null
    nomeUsuario: string | null
    email: string | null
    senha: string | null
    dataCadastro: Date | null
    ativo: number | null
    ramal: string | null
    fotoPerfil: string | null
    idGerencia: number | null
    idTipoUsuario: number | null
  }

  export type UsuarioCountAggregateOutputType = {
    idUsuario: number
    matricula: number
    nomeUsuario: number
    email: number
    senha: number
    dataCadastro: number
    ativo: number
    ramal: number
    fotoPerfil: number
    idGerencia: number
    idTipoUsuario: number
    _all: number
  }


  export type UsuarioAvgAggregateInputType = {
    idUsuario?: true
    ativo?: true
    idGerencia?: true
    idTipoUsuario?: true
  }

  export type UsuarioSumAggregateInputType = {
    idUsuario?: true
    ativo?: true
    idGerencia?: true
    idTipoUsuario?: true
  }

  export type UsuarioMinAggregateInputType = {
    idUsuario?: true
    matricula?: true
    nomeUsuario?: true
    email?: true
    senha?: true
    dataCadastro?: true
    ativo?: true
    ramal?: true
    fotoPerfil?: true
    idGerencia?: true
    idTipoUsuario?: true
  }

  export type UsuarioMaxAggregateInputType = {
    idUsuario?: true
    matricula?: true
    nomeUsuario?: true
    email?: true
    senha?: true
    dataCadastro?: true
    ativo?: true
    ramal?: true
    fotoPerfil?: true
    idGerencia?: true
    idTipoUsuario?: true
  }

  export type UsuarioCountAggregateInputType = {
    idUsuario?: true
    matricula?: true
    nomeUsuario?: true
    email?: true
    senha?: true
    dataCadastro?: true
    ativo?: true
    ramal?: true
    fotoPerfil?: true
    idGerencia?: true
    idTipoUsuario?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which usuario to aggregate.
     */
    where?: usuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuarioOrderByWithRelationInput | usuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsuarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsuarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type usuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usuarioWhereInput
    orderBy?: usuarioOrderByWithAggregationInput | usuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: usuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _avg?: UsuarioAvgAggregateInputType
    _sum?: UsuarioSumAggregateInputType
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    idUsuario: number
    matricula: string
    nomeUsuario: string
    email: string
    senha: string
    dataCadastro: Date
    ativo: number
    ramal: string | null
    fotoPerfil: string | null
    idGerencia: number | null
    idTipoUsuario: number | null
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends usuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type usuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idUsuario?: boolean
    matricula?: boolean
    nomeUsuario?: boolean
    email?: boolean
    senha?: boolean
    dataCadastro?: boolean
    ativo?: boolean
    ramal?: boolean
    fotoPerfil?: boolean
    idGerencia?: boolean
    idTipoUsuario?: boolean
    chamado_chamado_idSolicitanteTousuario?: boolean | usuario$chamado_chamado_idSolicitanteTousuarioArgs<ExtArgs>
    chamado_chamado_idAnalistaTousuario?: boolean | usuario$chamado_chamado_idAnalistaTousuarioArgs<ExtArgs>
    logatividade?: boolean | usuario$logatividadeArgs<ExtArgs>
    msgchamado?: boolean | usuario$msgchamadoArgs<ExtArgs>
    notificacao?: boolean | usuario$notificacaoArgs<ExtArgs>
    gerencia?: boolean | usuario$gerenciaArgs<ExtArgs>
    tipousuario?: boolean | usuario$tipousuarioArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>



  export type usuarioSelectScalar = {
    idUsuario?: boolean
    matricula?: boolean
    nomeUsuario?: boolean
    email?: boolean
    senha?: boolean
    dataCadastro?: boolean
    ativo?: boolean
    ramal?: boolean
    fotoPerfil?: boolean
    idGerencia?: boolean
    idTipoUsuario?: boolean
  }

  export type usuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idUsuario" | "matricula" | "nomeUsuario" | "email" | "senha" | "dataCadastro" | "ativo" | "ramal" | "fotoPerfil" | "idGerencia" | "idTipoUsuario", ExtArgs["result"]["usuario"]>
  export type usuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chamado_chamado_idSolicitanteTousuario?: boolean | usuario$chamado_chamado_idSolicitanteTousuarioArgs<ExtArgs>
    chamado_chamado_idAnalistaTousuario?: boolean | usuario$chamado_chamado_idAnalistaTousuarioArgs<ExtArgs>
    logatividade?: boolean | usuario$logatividadeArgs<ExtArgs>
    msgchamado?: boolean | usuario$msgchamadoArgs<ExtArgs>
    notificacao?: boolean | usuario$notificacaoArgs<ExtArgs>
    gerencia?: boolean | usuario$gerenciaArgs<ExtArgs>
    tipousuario?: boolean | usuario$tipousuarioArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $usuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "usuario"
    objects: {
      chamado_chamado_idSolicitanteTousuario: Prisma.$chamadoPayload<ExtArgs>[]
      chamado_chamado_idAnalistaTousuario: Prisma.$chamadoPayload<ExtArgs>[]
      logatividade: Prisma.$logatividadePayload<ExtArgs>[]
      msgchamado: Prisma.$msgchamadoPayload<ExtArgs>[]
      notificacao: Prisma.$notificacaoPayload<ExtArgs>[]
      gerencia: Prisma.$gerenciaPayload<ExtArgs> | null
      tipousuario: Prisma.$tipousuarioPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      idUsuario: number
      matricula: string
      nomeUsuario: string
      email: string
      senha: string
      dataCadastro: Date
      ativo: number
      ramal: string | null
      fotoPerfil: string | null
      idGerencia: number | null
      idTipoUsuario: number | null
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type usuarioGetPayload<S extends boolean | null | undefined | usuarioDefaultArgs> = $Result.GetResult<Prisma.$usuarioPayload, S>

  type usuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface usuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['usuario'], meta: { name: 'usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {usuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usuarioFindUniqueArgs>(args: SelectSubset<T, usuarioFindUniqueArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, usuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usuarioFindFirstArgs>(args?: SelectSubset<T, usuarioFindFirstArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, usuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `idUsuario`
     * const usuarioWithIdUsuarioOnly = await prisma.usuario.findMany({ select: { idUsuario: true } })
     * 
     */
    findMany<T extends usuarioFindManyArgs>(args?: SelectSubset<T, usuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {usuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends usuarioCreateArgs>(args: SelectSubset<T, usuarioCreateArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {usuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usuarioCreateManyArgs>(args?: SelectSubset<T, usuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Usuario.
     * @param {usuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends usuarioDeleteArgs>(args: SelectSubset<T, usuarioDeleteArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {usuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usuarioUpdateArgs>(args: SelectSubset<T, usuarioUpdateArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {usuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usuarioDeleteManyArgs>(args?: SelectSubset<T, usuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usuarioUpdateManyArgs>(args: SelectSubset<T, usuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Usuario.
     * @param {usuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends usuarioUpsertArgs>(args: SelectSubset<T, usuarioUpsertArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends usuarioCountArgs>(
      args?: Subset<T, usuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usuarioGroupByArgs['orderBy'] }
        : { orderBy?: usuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the usuario model
   */
  readonly fields: usuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chamado_chamado_idSolicitanteTousuario<T extends usuario$chamado_chamado_idSolicitanteTousuarioArgs<ExtArgs> = {}>(args?: Subset<T, usuario$chamado_chamado_idSolicitanteTousuarioArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chamadoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    chamado_chamado_idAnalistaTousuario<T extends usuario$chamado_chamado_idAnalistaTousuarioArgs<ExtArgs> = {}>(args?: Subset<T, usuario$chamado_chamado_idAnalistaTousuarioArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chamadoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    logatividade<T extends usuario$logatividadeArgs<ExtArgs> = {}>(args?: Subset<T, usuario$logatividadeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$logatividadePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    msgchamado<T extends usuario$msgchamadoArgs<ExtArgs> = {}>(args?: Subset<T, usuario$msgchamadoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$msgchamadoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notificacao<T extends usuario$notificacaoArgs<ExtArgs> = {}>(args?: Subset<T, usuario$notificacaoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    gerencia<T extends usuario$gerenciaArgs<ExtArgs> = {}>(args?: Subset<T, usuario$gerenciaArgs<ExtArgs>>): Prisma__gerenciaClient<$Result.GetResult<Prisma.$gerenciaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    tipousuario<T extends usuario$tipousuarioArgs<ExtArgs> = {}>(args?: Subset<T, usuario$tipousuarioArgs<ExtArgs>>): Prisma__tipousuarioClient<$Result.GetResult<Prisma.$tipousuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the usuario model
   */
  interface usuarioFieldRefs {
    readonly idUsuario: FieldRef<"usuario", 'Int'>
    readonly matricula: FieldRef<"usuario", 'String'>
    readonly nomeUsuario: FieldRef<"usuario", 'String'>
    readonly email: FieldRef<"usuario", 'String'>
    readonly senha: FieldRef<"usuario", 'String'>
    readonly dataCadastro: FieldRef<"usuario", 'DateTime'>
    readonly ativo: FieldRef<"usuario", 'Int'>
    readonly ramal: FieldRef<"usuario", 'String'>
    readonly fotoPerfil: FieldRef<"usuario", 'String'>
    readonly idGerencia: FieldRef<"usuario", 'Int'>
    readonly idTipoUsuario: FieldRef<"usuario", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * usuario findUnique
   */
  export type usuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    /**
     * Filter, which usuario to fetch.
     */
    where: usuarioWhereUniqueInput
  }

  /**
   * usuario findUniqueOrThrow
   */
  export type usuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    /**
     * Filter, which usuario to fetch.
     */
    where: usuarioWhereUniqueInput
  }

  /**
   * usuario findFirst
   */
  export type usuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    /**
     * Filter, which usuario to fetch.
     */
    where?: usuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuarioOrderByWithRelationInput | usuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for usuarios.
     */
    cursor?: usuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * usuario findFirstOrThrow
   */
  export type usuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    /**
     * Filter, which usuario to fetch.
     */
    where?: usuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuarioOrderByWithRelationInput | usuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for usuarios.
     */
    cursor?: usuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * usuario findMany
   */
  export type usuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where?: usuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuarioOrderByWithRelationInput | usuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing usuarios.
     */
    cursor?: usuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * usuario create
   */
  export type usuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a usuario.
     */
    data: XOR<usuarioCreateInput, usuarioUncheckedCreateInput>
  }

  /**
   * usuario createMany
   */
  export type usuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many usuarios.
     */
    data: usuarioCreateManyInput | usuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * usuario update
   */
  export type usuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a usuario.
     */
    data: XOR<usuarioUpdateInput, usuarioUncheckedUpdateInput>
    /**
     * Choose, which usuario to update.
     */
    where: usuarioWhereUniqueInput
  }

  /**
   * usuario updateMany
   */
  export type usuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update usuarios.
     */
    data: XOR<usuarioUpdateManyMutationInput, usuarioUncheckedUpdateManyInput>
    /**
     * Filter which usuarios to update
     */
    where?: usuarioWhereInput
    /**
     * Limit how many usuarios to update.
     */
    limit?: number
  }

  /**
   * usuario upsert
   */
  export type usuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the usuario to update in case it exists.
     */
    where: usuarioWhereUniqueInput
    /**
     * In case the usuario found by the `where` argument doesn't exist, create a new usuario with this data.
     */
    create: XOR<usuarioCreateInput, usuarioUncheckedCreateInput>
    /**
     * In case the usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usuarioUpdateInput, usuarioUncheckedUpdateInput>
  }

  /**
   * usuario delete
   */
  export type usuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    /**
     * Filter which usuario to delete.
     */
    where: usuarioWhereUniqueInput
  }

  /**
   * usuario deleteMany
   */
  export type usuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which usuarios to delete
     */
    where?: usuarioWhereInput
    /**
     * Limit how many usuarios to delete.
     */
    limit?: number
  }

  /**
   * usuario.chamado_chamado_idSolicitanteTousuario
   */
  export type usuario$chamado_chamado_idSolicitanteTousuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chamado
     */
    select?: chamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chamado
     */
    omit?: chamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chamadoInclude<ExtArgs> | null
    where?: chamadoWhereInput
    orderBy?: chamadoOrderByWithRelationInput | chamadoOrderByWithRelationInput[]
    cursor?: chamadoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChamadoScalarFieldEnum | ChamadoScalarFieldEnum[]
  }

  /**
   * usuario.chamado_chamado_idAnalistaTousuario
   */
  export type usuario$chamado_chamado_idAnalistaTousuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chamado
     */
    select?: chamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chamado
     */
    omit?: chamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chamadoInclude<ExtArgs> | null
    where?: chamadoWhereInput
    orderBy?: chamadoOrderByWithRelationInput | chamadoOrderByWithRelationInput[]
    cursor?: chamadoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChamadoScalarFieldEnum | ChamadoScalarFieldEnum[]
  }

  /**
   * usuario.logatividade
   */
  export type usuario$logatividadeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logatividade
     */
    select?: logatividadeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the logatividade
     */
    omit?: logatividadeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: logatividadeInclude<ExtArgs> | null
    where?: logatividadeWhereInput
    orderBy?: logatividadeOrderByWithRelationInput | logatividadeOrderByWithRelationInput[]
    cursor?: logatividadeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LogatividadeScalarFieldEnum | LogatividadeScalarFieldEnum[]
  }

  /**
   * usuario.msgchamado
   */
  export type usuario$msgchamadoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the msgchamado
     */
    select?: msgchamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the msgchamado
     */
    omit?: msgchamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: msgchamadoInclude<ExtArgs> | null
    where?: msgchamadoWhereInput
    orderBy?: msgchamadoOrderByWithRelationInput | msgchamadoOrderByWithRelationInput[]
    cursor?: msgchamadoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MsgchamadoScalarFieldEnum | MsgchamadoScalarFieldEnum[]
  }

  /**
   * usuario.notificacao
   */
  export type usuario$notificacaoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notificacao
     */
    select?: notificacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notificacao
     */
    omit?: notificacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificacaoInclude<ExtArgs> | null
    where?: notificacaoWhereInput
    orderBy?: notificacaoOrderByWithRelationInput | notificacaoOrderByWithRelationInput[]
    cursor?: notificacaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificacaoScalarFieldEnum | NotificacaoScalarFieldEnum[]
  }

  /**
   * usuario.gerencia
   */
  export type usuario$gerenciaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gerencia
     */
    select?: gerenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the gerencia
     */
    omit?: gerenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: gerenciaInclude<ExtArgs> | null
    where?: gerenciaWhereInput
  }

  /**
   * usuario.tipousuario
   */
  export type usuario$tipousuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipousuario
     */
    select?: tipousuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipousuario
     */
    omit?: tipousuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipousuarioInclude<ExtArgs> | null
    where?: tipousuarioWhereInput
  }

  /**
   * usuario without action
   */
  export type usuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ChamadoScalarFieldEnum: {
    idChamado: 'idChamado',
    protocolo: 'protocolo',
    assunto: 'assunto',
    descricao: 'descricao',
    dataAbertura: 'dataAbertura',
    dataAtualizacao: 'dataAtualizacao',
    dataFechamento: 'dataFechamento',
    idSolicitante: 'idSolicitante',
    idAnalista: 'idAnalista',
    idTipoChamado: 'idTipoChamado',
    idStatus: 'idStatus',
    idPrioridade: 'idPrioridade'
  };

  export type ChamadoScalarFieldEnum = (typeof ChamadoScalarFieldEnum)[keyof typeof ChamadoScalarFieldEnum]


  export const GerenciaScalarFieldEnum: {
    idGerencia: 'idGerencia',
    nomeGerencia: 'nomeGerencia',
    ativo: 'ativo'
  };

  export type GerenciaScalarFieldEnum = (typeof GerenciaScalarFieldEnum)[keyof typeof GerenciaScalarFieldEnum]


  export const LogatividadeScalarFieldEnum: {
    idLog: 'idLog',
    descricao: 'descricao',
    dataHora: 'dataHora',
    idUsuario: 'idUsuario'
  };

  export type LogatividadeScalarFieldEnum = (typeof LogatividadeScalarFieldEnum)[keyof typeof LogatividadeScalarFieldEnum]


  export const MsgchamadoScalarFieldEnum: {
    idMensagem: 'idMensagem',
    mensagem: 'mensagem',
    timestamp: 'timestamp',
    remetente: 'remetente',
    urlAnexo: 'urlAnexo',
    nomeArquivo: 'nomeArquivo',
    idChamado: 'idChamado',
    idRemetente: 'idRemetente'
  };

  export type MsgchamadoScalarFieldEnum = (typeof MsgchamadoScalarFieldEnum)[keyof typeof MsgchamadoScalarFieldEnum]


  export const NotificacaoScalarFieldEnum: {
    idNotificacao: 'idNotificacao',
    titulo: 'titulo',
    mensagem: 'mensagem',
    lida: 'lida',
    dataHora: 'dataHora',
    idUsuario: 'idUsuario',
    idChamado: 'idChamado'
  };

  export type NotificacaoScalarFieldEnum = (typeof NotificacaoScalarFieldEnum)[keyof typeof NotificacaoScalarFieldEnum]


  export const PrioridadechamadoScalarFieldEnum: {
    idPrioridade: 'idPrioridade',
    nomePrioridade: 'nomePrioridade',
    ativo: 'ativo',
    hexCorPrimaria: 'hexCorPrimaria',
    hexCorSecundaria: 'hexCorSecundaria'
  };

  export type PrioridadechamadoScalarFieldEnum = (typeof PrioridadechamadoScalarFieldEnum)[keyof typeof PrioridadechamadoScalarFieldEnum]


  export const StatuschamadoScalarFieldEnum: {
    idStatus: 'idStatus',
    nomeStatus: 'nomeStatus',
    ativo: 'ativo',
    hexCorPrimaria: 'hexCorPrimaria',
    hexCorSecundaria: 'hexCorSecundaria'
  };

  export type StatuschamadoScalarFieldEnum = (typeof StatuschamadoScalarFieldEnum)[keyof typeof StatuschamadoScalarFieldEnum]


  export const TipochamadoScalarFieldEnum: {
    idTipoChamado: 'idTipoChamado',
    nomeTipo: 'nomeTipo',
    ativo: 'ativo'
  };

  export type TipochamadoScalarFieldEnum = (typeof TipochamadoScalarFieldEnum)[keyof typeof TipochamadoScalarFieldEnum]


  export const TipousuarioScalarFieldEnum: {
    idTipoUsuario: 'idTipoUsuario',
    tipoUsuario: 'tipoUsuario'
  };

  export type TipousuarioScalarFieldEnum = (typeof TipousuarioScalarFieldEnum)[keyof typeof TipousuarioScalarFieldEnum]


  export const UsuarioScalarFieldEnum: {
    idUsuario: 'idUsuario',
    matricula: 'matricula',
    nomeUsuario: 'nomeUsuario',
    email: 'email',
    senha: 'senha',
    dataCadastro: 'dataCadastro',
    ativo: 'ativo',
    ramal: 'ramal',
    fotoPerfil: 'fotoPerfil',
    idGerencia: 'idGerencia',
    idTipoUsuario: 'idTipoUsuario'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const chamadoOrderByRelevanceFieldEnum: {
    protocolo: 'protocolo',
    assunto: 'assunto',
    descricao: 'descricao'
  };

  export type chamadoOrderByRelevanceFieldEnum = (typeof chamadoOrderByRelevanceFieldEnum)[keyof typeof chamadoOrderByRelevanceFieldEnum]


  export const gerenciaOrderByRelevanceFieldEnum: {
    nomeGerencia: 'nomeGerencia'
  };

  export type gerenciaOrderByRelevanceFieldEnum = (typeof gerenciaOrderByRelevanceFieldEnum)[keyof typeof gerenciaOrderByRelevanceFieldEnum]


  export const logatividadeOrderByRelevanceFieldEnum: {
    descricao: 'descricao'
  };

  export type logatividadeOrderByRelevanceFieldEnum = (typeof logatividadeOrderByRelevanceFieldEnum)[keyof typeof logatividadeOrderByRelevanceFieldEnum]


  export const msgchamadoOrderByRelevanceFieldEnum: {
    mensagem: 'mensagem',
    urlAnexo: 'urlAnexo',
    nomeArquivo: 'nomeArquivo'
  };

  export type msgchamadoOrderByRelevanceFieldEnum = (typeof msgchamadoOrderByRelevanceFieldEnum)[keyof typeof msgchamadoOrderByRelevanceFieldEnum]


  export const notificacaoOrderByRelevanceFieldEnum: {
    titulo: 'titulo',
    mensagem: 'mensagem'
  };

  export type notificacaoOrderByRelevanceFieldEnum = (typeof notificacaoOrderByRelevanceFieldEnum)[keyof typeof notificacaoOrderByRelevanceFieldEnum]


  export const prioridadechamadoOrderByRelevanceFieldEnum: {
    nomePrioridade: 'nomePrioridade',
    hexCorPrimaria: 'hexCorPrimaria',
    hexCorSecundaria: 'hexCorSecundaria'
  };

  export type prioridadechamadoOrderByRelevanceFieldEnum = (typeof prioridadechamadoOrderByRelevanceFieldEnum)[keyof typeof prioridadechamadoOrderByRelevanceFieldEnum]


  export const statuschamadoOrderByRelevanceFieldEnum: {
    nomeStatus: 'nomeStatus',
    hexCorPrimaria: 'hexCorPrimaria',
    hexCorSecundaria: 'hexCorSecundaria'
  };

  export type statuschamadoOrderByRelevanceFieldEnum = (typeof statuschamadoOrderByRelevanceFieldEnum)[keyof typeof statuschamadoOrderByRelevanceFieldEnum]


  export const tipochamadoOrderByRelevanceFieldEnum: {
    nomeTipo: 'nomeTipo'
  };

  export type tipochamadoOrderByRelevanceFieldEnum = (typeof tipochamadoOrderByRelevanceFieldEnum)[keyof typeof tipochamadoOrderByRelevanceFieldEnum]


  export const tipousuarioOrderByRelevanceFieldEnum: {
    tipoUsuario: 'tipoUsuario'
  };

  export type tipousuarioOrderByRelevanceFieldEnum = (typeof tipousuarioOrderByRelevanceFieldEnum)[keyof typeof tipousuarioOrderByRelevanceFieldEnum]


  export const usuarioOrderByRelevanceFieldEnum: {
    matricula: 'matricula',
    nomeUsuario: 'nomeUsuario',
    email: 'email',
    senha: 'senha',
    ramal: 'ramal',
    fotoPerfil: 'fotoPerfil'
  };

  export type usuarioOrderByRelevanceFieldEnum = (typeof usuarioOrderByRelevanceFieldEnum)[keyof typeof usuarioOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'msgchamado_remetente'
   */
  export type Enummsgchamado_remetenteFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'msgchamado_remetente'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type chamadoWhereInput = {
    AND?: chamadoWhereInput | chamadoWhereInput[]
    OR?: chamadoWhereInput[]
    NOT?: chamadoWhereInput | chamadoWhereInput[]
    idChamado?: IntFilter<"chamado"> | number
    protocolo?: StringFilter<"chamado"> | string
    assunto?: StringFilter<"chamado"> | string
    descricao?: StringFilter<"chamado"> | string
    dataAbertura?: DateTimeFilter<"chamado"> | Date | string
    dataAtualizacao?: DateTimeNullableFilter<"chamado"> | Date | string | null
    dataFechamento?: DateTimeNullableFilter<"chamado"> | Date | string | null
    idSolicitante?: IntNullableFilter<"chamado"> | number | null
    idAnalista?: IntNullableFilter<"chamado"> | number | null
    idTipoChamado?: IntNullableFilter<"chamado"> | number | null
    idStatus?: IntNullableFilter<"chamado"> | number | null
    idPrioridade?: IntNullableFilter<"chamado"> | number | null
    usuario_chamado_idSolicitanteTousuario?: XOR<UsuarioNullableScalarRelationFilter, usuarioWhereInput> | null
    usuario_chamado_idAnalistaTousuario?: XOR<UsuarioNullableScalarRelationFilter, usuarioWhereInput> | null
    tipochamado?: XOR<TipochamadoNullableScalarRelationFilter, tipochamadoWhereInput> | null
    statuschamado?: XOR<StatuschamadoNullableScalarRelationFilter, statuschamadoWhereInput> | null
    prioridadechamado?: XOR<PrioridadechamadoNullableScalarRelationFilter, prioridadechamadoWhereInput> | null
    msgchamado?: MsgchamadoListRelationFilter
    notificacao?: NotificacaoListRelationFilter
  }

  export type chamadoOrderByWithRelationInput = {
    idChamado?: SortOrder
    protocolo?: SortOrder
    assunto?: SortOrder
    descricao?: SortOrder
    dataAbertura?: SortOrder
    dataAtualizacao?: SortOrderInput | SortOrder
    dataFechamento?: SortOrderInput | SortOrder
    idSolicitante?: SortOrderInput | SortOrder
    idAnalista?: SortOrderInput | SortOrder
    idTipoChamado?: SortOrderInput | SortOrder
    idStatus?: SortOrderInput | SortOrder
    idPrioridade?: SortOrderInput | SortOrder
    usuario_chamado_idSolicitanteTousuario?: usuarioOrderByWithRelationInput
    usuario_chamado_idAnalistaTousuario?: usuarioOrderByWithRelationInput
    tipochamado?: tipochamadoOrderByWithRelationInput
    statuschamado?: statuschamadoOrderByWithRelationInput
    prioridadechamado?: prioridadechamadoOrderByWithRelationInput
    msgchamado?: msgchamadoOrderByRelationAggregateInput
    notificacao?: notificacaoOrderByRelationAggregateInput
    _relevance?: chamadoOrderByRelevanceInput
  }

  export type chamadoWhereUniqueInput = Prisma.AtLeast<{
    idChamado?: number
    protocolo?: string
    AND?: chamadoWhereInput | chamadoWhereInput[]
    OR?: chamadoWhereInput[]
    NOT?: chamadoWhereInput | chamadoWhereInput[]
    assunto?: StringFilter<"chamado"> | string
    descricao?: StringFilter<"chamado"> | string
    dataAbertura?: DateTimeFilter<"chamado"> | Date | string
    dataAtualizacao?: DateTimeNullableFilter<"chamado"> | Date | string | null
    dataFechamento?: DateTimeNullableFilter<"chamado"> | Date | string | null
    idSolicitante?: IntNullableFilter<"chamado"> | number | null
    idAnalista?: IntNullableFilter<"chamado"> | number | null
    idTipoChamado?: IntNullableFilter<"chamado"> | number | null
    idStatus?: IntNullableFilter<"chamado"> | number | null
    idPrioridade?: IntNullableFilter<"chamado"> | number | null
    usuario_chamado_idSolicitanteTousuario?: XOR<UsuarioNullableScalarRelationFilter, usuarioWhereInput> | null
    usuario_chamado_idAnalistaTousuario?: XOR<UsuarioNullableScalarRelationFilter, usuarioWhereInput> | null
    tipochamado?: XOR<TipochamadoNullableScalarRelationFilter, tipochamadoWhereInput> | null
    statuschamado?: XOR<StatuschamadoNullableScalarRelationFilter, statuschamadoWhereInput> | null
    prioridadechamado?: XOR<PrioridadechamadoNullableScalarRelationFilter, prioridadechamadoWhereInput> | null
    msgchamado?: MsgchamadoListRelationFilter
    notificacao?: NotificacaoListRelationFilter
  }, "idChamado" | "protocolo">

  export type chamadoOrderByWithAggregationInput = {
    idChamado?: SortOrder
    protocolo?: SortOrder
    assunto?: SortOrder
    descricao?: SortOrder
    dataAbertura?: SortOrder
    dataAtualizacao?: SortOrderInput | SortOrder
    dataFechamento?: SortOrderInput | SortOrder
    idSolicitante?: SortOrderInput | SortOrder
    idAnalista?: SortOrderInput | SortOrder
    idTipoChamado?: SortOrderInput | SortOrder
    idStatus?: SortOrderInput | SortOrder
    idPrioridade?: SortOrderInput | SortOrder
    _count?: chamadoCountOrderByAggregateInput
    _avg?: chamadoAvgOrderByAggregateInput
    _max?: chamadoMaxOrderByAggregateInput
    _min?: chamadoMinOrderByAggregateInput
    _sum?: chamadoSumOrderByAggregateInput
  }

  export type chamadoScalarWhereWithAggregatesInput = {
    AND?: chamadoScalarWhereWithAggregatesInput | chamadoScalarWhereWithAggregatesInput[]
    OR?: chamadoScalarWhereWithAggregatesInput[]
    NOT?: chamadoScalarWhereWithAggregatesInput | chamadoScalarWhereWithAggregatesInput[]
    idChamado?: IntWithAggregatesFilter<"chamado"> | number
    protocolo?: StringWithAggregatesFilter<"chamado"> | string
    assunto?: StringWithAggregatesFilter<"chamado"> | string
    descricao?: StringWithAggregatesFilter<"chamado"> | string
    dataAbertura?: DateTimeWithAggregatesFilter<"chamado"> | Date | string
    dataAtualizacao?: DateTimeNullableWithAggregatesFilter<"chamado"> | Date | string | null
    dataFechamento?: DateTimeNullableWithAggregatesFilter<"chamado"> | Date | string | null
    idSolicitante?: IntNullableWithAggregatesFilter<"chamado"> | number | null
    idAnalista?: IntNullableWithAggregatesFilter<"chamado"> | number | null
    idTipoChamado?: IntNullableWithAggregatesFilter<"chamado"> | number | null
    idStatus?: IntNullableWithAggregatesFilter<"chamado"> | number | null
    idPrioridade?: IntNullableWithAggregatesFilter<"chamado"> | number | null
  }

  export type gerenciaWhereInput = {
    AND?: gerenciaWhereInput | gerenciaWhereInput[]
    OR?: gerenciaWhereInput[]
    NOT?: gerenciaWhereInput | gerenciaWhereInput[]
    idGerencia?: IntFilter<"gerencia"> | number
    nomeGerencia?: StringFilter<"gerencia"> | string
    ativo?: IntFilter<"gerencia"> | number
    usuario?: UsuarioListRelationFilter
  }

  export type gerenciaOrderByWithRelationInput = {
    idGerencia?: SortOrder
    nomeGerencia?: SortOrder
    ativo?: SortOrder
    usuario?: usuarioOrderByRelationAggregateInput
    _relevance?: gerenciaOrderByRelevanceInput
  }

  export type gerenciaWhereUniqueInput = Prisma.AtLeast<{
    idGerencia?: number
    AND?: gerenciaWhereInput | gerenciaWhereInput[]
    OR?: gerenciaWhereInput[]
    NOT?: gerenciaWhereInput | gerenciaWhereInput[]
    nomeGerencia?: StringFilter<"gerencia"> | string
    ativo?: IntFilter<"gerencia"> | number
    usuario?: UsuarioListRelationFilter
  }, "idGerencia">

  export type gerenciaOrderByWithAggregationInput = {
    idGerencia?: SortOrder
    nomeGerencia?: SortOrder
    ativo?: SortOrder
    _count?: gerenciaCountOrderByAggregateInput
    _avg?: gerenciaAvgOrderByAggregateInput
    _max?: gerenciaMaxOrderByAggregateInput
    _min?: gerenciaMinOrderByAggregateInput
    _sum?: gerenciaSumOrderByAggregateInput
  }

  export type gerenciaScalarWhereWithAggregatesInput = {
    AND?: gerenciaScalarWhereWithAggregatesInput | gerenciaScalarWhereWithAggregatesInput[]
    OR?: gerenciaScalarWhereWithAggregatesInput[]
    NOT?: gerenciaScalarWhereWithAggregatesInput | gerenciaScalarWhereWithAggregatesInput[]
    idGerencia?: IntWithAggregatesFilter<"gerencia"> | number
    nomeGerencia?: StringWithAggregatesFilter<"gerencia"> | string
    ativo?: IntWithAggregatesFilter<"gerencia"> | number
  }

  export type logatividadeWhereInput = {
    AND?: logatividadeWhereInput | logatividadeWhereInput[]
    OR?: logatividadeWhereInput[]
    NOT?: logatividadeWhereInput | logatividadeWhereInput[]
    idLog?: IntFilter<"logatividade"> | number
    descricao?: StringFilter<"logatividade"> | string
    dataHora?: DateTimeNullableFilter<"logatividade"> | Date | string | null
    idUsuario?: IntNullableFilter<"logatividade"> | number | null
    usuario?: XOR<UsuarioNullableScalarRelationFilter, usuarioWhereInput> | null
  }

  export type logatividadeOrderByWithRelationInput = {
    idLog?: SortOrder
    descricao?: SortOrder
    dataHora?: SortOrderInput | SortOrder
    idUsuario?: SortOrderInput | SortOrder
    usuario?: usuarioOrderByWithRelationInput
    _relevance?: logatividadeOrderByRelevanceInput
  }

  export type logatividadeWhereUniqueInput = Prisma.AtLeast<{
    idLog?: number
    AND?: logatividadeWhereInput | logatividadeWhereInput[]
    OR?: logatividadeWhereInput[]
    NOT?: logatividadeWhereInput | logatividadeWhereInput[]
    descricao?: StringFilter<"logatividade"> | string
    dataHora?: DateTimeNullableFilter<"logatividade"> | Date | string | null
    idUsuario?: IntNullableFilter<"logatividade"> | number | null
    usuario?: XOR<UsuarioNullableScalarRelationFilter, usuarioWhereInput> | null
  }, "idLog">

  export type logatividadeOrderByWithAggregationInput = {
    idLog?: SortOrder
    descricao?: SortOrder
    dataHora?: SortOrderInput | SortOrder
    idUsuario?: SortOrderInput | SortOrder
    _count?: logatividadeCountOrderByAggregateInput
    _avg?: logatividadeAvgOrderByAggregateInput
    _max?: logatividadeMaxOrderByAggregateInput
    _min?: logatividadeMinOrderByAggregateInput
    _sum?: logatividadeSumOrderByAggregateInput
  }

  export type logatividadeScalarWhereWithAggregatesInput = {
    AND?: logatividadeScalarWhereWithAggregatesInput | logatividadeScalarWhereWithAggregatesInput[]
    OR?: logatividadeScalarWhereWithAggregatesInput[]
    NOT?: logatividadeScalarWhereWithAggregatesInput | logatividadeScalarWhereWithAggregatesInput[]
    idLog?: IntWithAggregatesFilter<"logatividade"> | number
    descricao?: StringWithAggregatesFilter<"logatividade"> | string
    dataHora?: DateTimeNullableWithAggregatesFilter<"logatividade"> | Date | string | null
    idUsuario?: IntNullableWithAggregatesFilter<"logatividade"> | number | null
  }

  export type msgchamadoWhereInput = {
    AND?: msgchamadoWhereInput | msgchamadoWhereInput[]
    OR?: msgchamadoWhereInput[]
    NOT?: msgchamadoWhereInput | msgchamadoWhereInput[]
    idMensagem?: IntFilter<"msgchamado"> | number
    mensagem?: StringFilter<"msgchamado"> | string
    timestamp?: DateTimeNullableFilter<"msgchamado"> | Date | string | null
    remetente?: Enummsgchamado_remetenteFilter<"msgchamado"> | $Enums.msgchamado_remetente
    urlAnexo?: StringNullableFilter<"msgchamado"> | string | null
    nomeArquivo?: StringNullableFilter<"msgchamado"> | string | null
    idChamado?: IntFilter<"msgchamado"> | number
    idRemetente?: IntFilter<"msgchamado"> | number
    chamado?: XOR<ChamadoScalarRelationFilter, chamadoWhereInput>
    usuario?: XOR<UsuarioScalarRelationFilter, usuarioWhereInput>
  }

  export type msgchamadoOrderByWithRelationInput = {
    idMensagem?: SortOrder
    mensagem?: SortOrder
    timestamp?: SortOrderInput | SortOrder
    remetente?: SortOrder
    urlAnexo?: SortOrderInput | SortOrder
    nomeArquivo?: SortOrderInput | SortOrder
    idChamado?: SortOrder
    idRemetente?: SortOrder
    chamado?: chamadoOrderByWithRelationInput
    usuario?: usuarioOrderByWithRelationInput
    _relevance?: msgchamadoOrderByRelevanceInput
  }

  export type msgchamadoWhereUniqueInput = Prisma.AtLeast<{
    idMensagem?: number
    AND?: msgchamadoWhereInput | msgchamadoWhereInput[]
    OR?: msgchamadoWhereInput[]
    NOT?: msgchamadoWhereInput | msgchamadoWhereInput[]
    mensagem?: StringFilter<"msgchamado"> | string
    timestamp?: DateTimeNullableFilter<"msgchamado"> | Date | string | null
    remetente?: Enummsgchamado_remetenteFilter<"msgchamado"> | $Enums.msgchamado_remetente
    urlAnexo?: StringNullableFilter<"msgchamado"> | string | null
    nomeArquivo?: StringNullableFilter<"msgchamado"> | string | null
    idChamado?: IntFilter<"msgchamado"> | number
    idRemetente?: IntFilter<"msgchamado"> | number
    chamado?: XOR<ChamadoScalarRelationFilter, chamadoWhereInput>
    usuario?: XOR<UsuarioScalarRelationFilter, usuarioWhereInput>
  }, "idMensagem">

  export type msgchamadoOrderByWithAggregationInput = {
    idMensagem?: SortOrder
    mensagem?: SortOrder
    timestamp?: SortOrderInput | SortOrder
    remetente?: SortOrder
    urlAnexo?: SortOrderInput | SortOrder
    nomeArquivo?: SortOrderInput | SortOrder
    idChamado?: SortOrder
    idRemetente?: SortOrder
    _count?: msgchamadoCountOrderByAggregateInput
    _avg?: msgchamadoAvgOrderByAggregateInput
    _max?: msgchamadoMaxOrderByAggregateInput
    _min?: msgchamadoMinOrderByAggregateInput
    _sum?: msgchamadoSumOrderByAggregateInput
  }

  export type msgchamadoScalarWhereWithAggregatesInput = {
    AND?: msgchamadoScalarWhereWithAggregatesInput | msgchamadoScalarWhereWithAggregatesInput[]
    OR?: msgchamadoScalarWhereWithAggregatesInput[]
    NOT?: msgchamadoScalarWhereWithAggregatesInput | msgchamadoScalarWhereWithAggregatesInput[]
    idMensagem?: IntWithAggregatesFilter<"msgchamado"> | number
    mensagem?: StringWithAggregatesFilter<"msgchamado"> | string
    timestamp?: DateTimeNullableWithAggregatesFilter<"msgchamado"> | Date | string | null
    remetente?: Enummsgchamado_remetenteWithAggregatesFilter<"msgchamado"> | $Enums.msgchamado_remetente
    urlAnexo?: StringNullableWithAggregatesFilter<"msgchamado"> | string | null
    nomeArquivo?: StringNullableWithAggregatesFilter<"msgchamado"> | string | null
    idChamado?: IntWithAggregatesFilter<"msgchamado"> | number
    idRemetente?: IntWithAggregatesFilter<"msgchamado"> | number
  }

  export type notificacaoWhereInput = {
    AND?: notificacaoWhereInput | notificacaoWhereInput[]
    OR?: notificacaoWhereInput[]
    NOT?: notificacaoWhereInput | notificacaoWhereInput[]
    idNotificacao?: IntFilter<"notificacao"> | number
    titulo?: StringFilter<"notificacao"> | string
    mensagem?: StringFilter<"notificacao"> | string
    lida?: IntFilter<"notificacao"> | number
    dataHora?: DateTimeNullableFilter<"notificacao"> | Date | string | null
    idUsuario?: IntFilter<"notificacao"> | number
    idChamado?: IntNullableFilter<"notificacao"> | number | null
    usuario?: XOR<UsuarioScalarRelationFilter, usuarioWhereInput>
    chamado?: XOR<ChamadoNullableScalarRelationFilter, chamadoWhereInput> | null
  }

  export type notificacaoOrderByWithRelationInput = {
    idNotificacao?: SortOrder
    titulo?: SortOrder
    mensagem?: SortOrder
    lida?: SortOrder
    dataHora?: SortOrderInput | SortOrder
    idUsuario?: SortOrder
    idChamado?: SortOrderInput | SortOrder
    usuario?: usuarioOrderByWithRelationInput
    chamado?: chamadoOrderByWithRelationInput
    _relevance?: notificacaoOrderByRelevanceInput
  }

  export type notificacaoWhereUniqueInput = Prisma.AtLeast<{
    idNotificacao?: number
    AND?: notificacaoWhereInput | notificacaoWhereInput[]
    OR?: notificacaoWhereInput[]
    NOT?: notificacaoWhereInput | notificacaoWhereInput[]
    titulo?: StringFilter<"notificacao"> | string
    mensagem?: StringFilter<"notificacao"> | string
    lida?: IntFilter<"notificacao"> | number
    dataHora?: DateTimeNullableFilter<"notificacao"> | Date | string | null
    idUsuario?: IntFilter<"notificacao"> | number
    idChamado?: IntNullableFilter<"notificacao"> | number | null
    usuario?: XOR<UsuarioScalarRelationFilter, usuarioWhereInput>
    chamado?: XOR<ChamadoNullableScalarRelationFilter, chamadoWhereInput> | null
  }, "idNotificacao">

  export type notificacaoOrderByWithAggregationInput = {
    idNotificacao?: SortOrder
    titulo?: SortOrder
    mensagem?: SortOrder
    lida?: SortOrder
    dataHora?: SortOrderInput | SortOrder
    idUsuario?: SortOrder
    idChamado?: SortOrderInput | SortOrder
    _count?: notificacaoCountOrderByAggregateInput
    _avg?: notificacaoAvgOrderByAggregateInput
    _max?: notificacaoMaxOrderByAggregateInput
    _min?: notificacaoMinOrderByAggregateInput
    _sum?: notificacaoSumOrderByAggregateInput
  }

  export type notificacaoScalarWhereWithAggregatesInput = {
    AND?: notificacaoScalarWhereWithAggregatesInput | notificacaoScalarWhereWithAggregatesInput[]
    OR?: notificacaoScalarWhereWithAggregatesInput[]
    NOT?: notificacaoScalarWhereWithAggregatesInput | notificacaoScalarWhereWithAggregatesInput[]
    idNotificacao?: IntWithAggregatesFilter<"notificacao"> | number
    titulo?: StringWithAggregatesFilter<"notificacao"> | string
    mensagem?: StringWithAggregatesFilter<"notificacao"> | string
    lida?: IntWithAggregatesFilter<"notificacao"> | number
    dataHora?: DateTimeNullableWithAggregatesFilter<"notificacao"> | Date | string | null
    idUsuario?: IntWithAggregatesFilter<"notificacao"> | number
    idChamado?: IntNullableWithAggregatesFilter<"notificacao"> | number | null
  }

  export type prioridadechamadoWhereInput = {
    AND?: prioridadechamadoWhereInput | prioridadechamadoWhereInput[]
    OR?: prioridadechamadoWhereInput[]
    NOT?: prioridadechamadoWhereInput | prioridadechamadoWhereInput[]
    idPrioridade?: IntFilter<"prioridadechamado"> | number
    nomePrioridade?: StringFilter<"prioridadechamado"> | string
    ativo?: IntFilter<"prioridadechamado"> | number
    hexCorPrimaria?: StringFilter<"prioridadechamado"> | string
    hexCorSecundaria?: StringFilter<"prioridadechamado"> | string
    chamado?: ChamadoListRelationFilter
  }

  export type prioridadechamadoOrderByWithRelationInput = {
    idPrioridade?: SortOrder
    nomePrioridade?: SortOrder
    ativo?: SortOrder
    hexCorPrimaria?: SortOrder
    hexCorSecundaria?: SortOrder
    chamado?: chamadoOrderByRelationAggregateInput
    _relevance?: prioridadechamadoOrderByRelevanceInput
  }

  export type prioridadechamadoWhereUniqueInput = Prisma.AtLeast<{
    idPrioridade?: number
    AND?: prioridadechamadoWhereInput | prioridadechamadoWhereInput[]
    OR?: prioridadechamadoWhereInput[]
    NOT?: prioridadechamadoWhereInput | prioridadechamadoWhereInput[]
    nomePrioridade?: StringFilter<"prioridadechamado"> | string
    ativo?: IntFilter<"prioridadechamado"> | number
    hexCorPrimaria?: StringFilter<"prioridadechamado"> | string
    hexCorSecundaria?: StringFilter<"prioridadechamado"> | string
    chamado?: ChamadoListRelationFilter
  }, "idPrioridade">

  export type prioridadechamadoOrderByWithAggregationInput = {
    idPrioridade?: SortOrder
    nomePrioridade?: SortOrder
    ativo?: SortOrder
    hexCorPrimaria?: SortOrder
    hexCorSecundaria?: SortOrder
    _count?: prioridadechamadoCountOrderByAggregateInput
    _avg?: prioridadechamadoAvgOrderByAggregateInput
    _max?: prioridadechamadoMaxOrderByAggregateInput
    _min?: prioridadechamadoMinOrderByAggregateInput
    _sum?: prioridadechamadoSumOrderByAggregateInput
  }

  export type prioridadechamadoScalarWhereWithAggregatesInput = {
    AND?: prioridadechamadoScalarWhereWithAggregatesInput | prioridadechamadoScalarWhereWithAggregatesInput[]
    OR?: prioridadechamadoScalarWhereWithAggregatesInput[]
    NOT?: prioridadechamadoScalarWhereWithAggregatesInput | prioridadechamadoScalarWhereWithAggregatesInput[]
    idPrioridade?: IntWithAggregatesFilter<"prioridadechamado"> | number
    nomePrioridade?: StringWithAggregatesFilter<"prioridadechamado"> | string
    ativo?: IntWithAggregatesFilter<"prioridadechamado"> | number
    hexCorPrimaria?: StringWithAggregatesFilter<"prioridadechamado"> | string
    hexCorSecundaria?: StringWithAggregatesFilter<"prioridadechamado"> | string
  }

  export type statuschamadoWhereInput = {
    AND?: statuschamadoWhereInput | statuschamadoWhereInput[]
    OR?: statuschamadoWhereInput[]
    NOT?: statuschamadoWhereInput | statuschamadoWhereInput[]
    idStatus?: IntFilter<"statuschamado"> | number
    nomeStatus?: StringFilter<"statuschamado"> | string
    ativo?: IntFilter<"statuschamado"> | number
    hexCorPrimaria?: StringFilter<"statuschamado"> | string
    hexCorSecundaria?: StringFilter<"statuschamado"> | string
    chamado?: ChamadoListRelationFilter
  }

  export type statuschamadoOrderByWithRelationInput = {
    idStatus?: SortOrder
    nomeStatus?: SortOrder
    ativo?: SortOrder
    hexCorPrimaria?: SortOrder
    hexCorSecundaria?: SortOrder
    chamado?: chamadoOrderByRelationAggregateInput
    _relevance?: statuschamadoOrderByRelevanceInput
  }

  export type statuschamadoWhereUniqueInput = Prisma.AtLeast<{
    idStatus?: number
    AND?: statuschamadoWhereInput | statuschamadoWhereInput[]
    OR?: statuschamadoWhereInput[]
    NOT?: statuschamadoWhereInput | statuschamadoWhereInput[]
    nomeStatus?: StringFilter<"statuschamado"> | string
    ativo?: IntFilter<"statuschamado"> | number
    hexCorPrimaria?: StringFilter<"statuschamado"> | string
    hexCorSecundaria?: StringFilter<"statuschamado"> | string
    chamado?: ChamadoListRelationFilter
  }, "idStatus">

  export type statuschamadoOrderByWithAggregationInput = {
    idStatus?: SortOrder
    nomeStatus?: SortOrder
    ativo?: SortOrder
    hexCorPrimaria?: SortOrder
    hexCorSecundaria?: SortOrder
    _count?: statuschamadoCountOrderByAggregateInput
    _avg?: statuschamadoAvgOrderByAggregateInput
    _max?: statuschamadoMaxOrderByAggregateInput
    _min?: statuschamadoMinOrderByAggregateInput
    _sum?: statuschamadoSumOrderByAggregateInput
  }

  export type statuschamadoScalarWhereWithAggregatesInput = {
    AND?: statuschamadoScalarWhereWithAggregatesInput | statuschamadoScalarWhereWithAggregatesInput[]
    OR?: statuschamadoScalarWhereWithAggregatesInput[]
    NOT?: statuschamadoScalarWhereWithAggregatesInput | statuschamadoScalarWhereWithAggregatesInput[]
    idStatus?: IntWithAggregatesFilter<"statuschamado"> | number
    nomeStatus?: StringWithAggregatesFilter<"statuschamado"> | string
    ativo?: IntWithAggregatesFilter<"statuschamado"> | number
    hexCorPrimaria?: StringWithAggregatesFilter<"statuschamado"> | string
    hexCorSecundaria?: StringWithAggregatesFilter<"statuschamado"> | string
  }

  export type tipochamadoWhereInput = {
    AND?: tipochamadoWhereInput | tipochamadoWhereInput[]
    OR?: tipochamadoWhereInput[]
    NOT?: tipochamadoWhereInput | tipochamadoWhereInput[]
    idTipoChamado?: IntFilter<"tipochamado"> | number
    nomeTipo?: StringFilter<"tipochamado"> | string
    ativo?: IntFilter<"tipochamado"> | number
    chamado?: ChamadoListRelationFilter
  }

  export type tipochamadoOrderByWithRelationInput = {
    idTipoChamado?: SortOrder
    nomeTipo?: SortOrder
    ativo?: SortOrder
    chamado?: chamadoOrderByRelationAggregateInput
    _relevance?: tipochamadoOrderByRelevanceInput
  }

  export type tipochamadoWhereUniqueInput = Prisma.AtLeast<{
    idTipoChamado?: number
    AND?: tipochamadoWhereInput | tipochamadoWhereInput[]
    OR?: tipochamadoWhereInput[]
    NOT?: tipochamadoWhereInput | tipochamadoWhereInput[]
    nomeTipo?: StringFilter<"tipochamado"> | string
    ativo?: IntFilter<"tipochamado"> | number
    chamado?: ChamadoListRelationFilter
  }, "idTipoChamado">

  export type tipochamadoOrderByWithAggregationInput = {
    idTipoChamado?: SortOrder
    nomeTipo?: SortOrder
    ativo?: SortOrder
    _count?: tipochamadoCountOrderByAggregateInput
    _avg?: tipochamadoAvgOrderByAggregateInput
    _max?: tipochamadoMaxOrderByAggregateInput
    _min?: tipochamadoMinOrderByAggregateInput
    _sum?: tipochamadoSumOrderByAggregateInput
  }

  export type tipochamadoScalarWhereWithAggregatesInput = {
    AND?: tipochamadoScalarWhereWithAggregatesInput | tipochamadoScalarWhereWithAggregatesInput[]
    OR?: tipochamadoScalarWhereWithAggregatesInput[]
    NOT?: tipochamadoScalarWhereWithAggregatesInput | tipochamadoScalarWhereWithAggregatesInput[]
    idTipoChamado?: IntWithAggregatesFilter<"tipochamado"> | number
    nomeTipo?: StringWithAggregatesFilter<"tipochamado"> | string
    ativo?: IntWithAggregatesFilter<"tipochamado"> | number
  }

  export type tipousuarioWhereInput = {
    AND?: tipousuarioWhereInput | tipousuarioWhereInput[]
    OR?: tipousuarioWhereInput[]
    NOT?: tipousuarioWhereInput | tipousuarioWhereInput[]
    idTipoUsuario?: IntFilter<"tipousuario"> | number
    tipoUsuario?: StringFilter<"tipousuario"> | string
    usuario?: UsuarioListRelationFilter
  }

  export type tipousuarioOrderByWithRelationInput = {
    idTipoUsuario?: SortOrder
    tipoUsuario?: SortOrder
    usuario?: usuarioOrderByRelationAggregateInput
    _relevance?: tipousuarioOrderByRelevanceInput
  }

  export type tipousuarioWhereUniqueInput = Prisma.AtLeast<{
    idTipoUsuario?: number
    AND?: tipousuarioWhereInput | tipousuarioWhereInput[]
    OR?: tipousuarioWhereInput[]
    NOT?: tipousuarioWhereInput | tipousuarioWhereInput[]
    tipoUsuario?: StringFilter<"tipousuario"> | string
    usuario?: UsuarioListRelationFilter
  }, "idTipoUsuario">

  export type tipousuarioOrderByWithAggregationInput = {
    idTipoUsuario?: SortOrder
    tipoUsuario?: SortOrder
    _count?: tipousuarioCountOrderByAggregateInput
    _avg?: tipousuarioAvgOrderByAggregateInput
    _max?: tipousuarioMaxOrderByAggregateInput
    _min?: tipousuarioMinOrderByAggregateInput
    _sum?: tipousuarioSumOrderByAggregateInput
  }

  export type tipousuarioScalarWhereWithAggregatesInput = {
    AND?: tipousuarioScalarWhereWithAggregatesInput | tipousuarioScalarWhereWithAggregatesInput[]
    OR?: tipousuarioScalarWhereWithAggregatesInput[]
    NOT?: tipousuarioScalarWhereWithAggregatesInput | tipousuarioScalarWhereWithAggregatesInput[]
    idTipoUsuario?: IntWithAggregatesFilter<"tipousuario"> | number
    tipoUsuario?: StringWithAggregatesFilter<"tipousuario"> | string
  }

  export type usuarioWhereInput = {
    AND?: usuarioWhereInput | usuarioWhereInput[]
    OR?: usuarioWhereInput[]
    NOT?: usuarioWhereInput | usuarioWhereInput[]
    idUsuario?: IntFilter<"usuario"> | number
    matricula?: StringFilter<"usuario"> | string
    nomeUsuario?: StringFilter<"usuario"> | string
    email?: StringFilter<"usuario"> | string
    senha?: StringFilter<"usuario"> | string
    dataCadastro?: DateTimeFilter<"usuario"> | Date | string
    ativo?: IntFilter<"usuario"> | number
    ramal?: StringNullableFilter<"usuario"> | string | null
    fotoPerfil?: StringNullableFilter<"usuario"> | string | null
    idGerencia?: IntNullableFilter<"usuario"> | number | null
    idTipoUsuario?: IntNullableFilter<"usuario"> | number | null
    chamado_chamado_idSolicitanteTousuario?: ChamadoListRelationFilter
    chamado_chamado_idAnalistaTousuario?: ChamadoListRelationFilter
    logatividade?: LogatividadeListRelationFilter
    msgchamado?: MsgchamadoListRelationFilter
    notificacao?: NotificacaoListRelationFilter
    gerencia?: XOR<GerenciaNullableScalarRelationFilter, gerenciaWhereInput> | null
    tipousuario?: XOR<TipousuarioNullableScalarRelationFilter, tipousuarioWhereInput> | null
  }

  export type usuarioOrderByWithRelationInput = {
    idUsuario?: SortOrder
    matricula?: SortOrder
    nomeUsuario?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    dataCadastro?: SortOrder
    ativo?: SortOrder
    ramal?: SortOrderInput | SortOrder
    fotoPerfil?: SortOrderInput | SortOrder
    idGerencia?: SortOrderInput | SortOrder
    idTipoUsuario?: SortOrderInput | SortOrder
    chamado_chamado_idSolicitanteTousuario?: chamadoOrderByRelationAggregateInput
    chamado_chamado_idAnalistaTousuario?: chamadoOrderByRelationAggregateInput
    logatividade?: logatividadeOrderByRelationAggregateInput
    msgchamado?: msgchamadoOrderByRelationAggregateInput
    notificacao?: notificacaoOrderByRelationAggregateInput
    gerencia?: gerenciaOrderByWithRelationInput
    tipousuario?: tipousuarioOrderByWithRelationInput
    _relevance?: usuarioOrderByRelevanceInput
  }

  export type usuarioWhereUniqueInput = Prisma.AtLeast<{
    idUsuario?: number
    matricula?: string
    email?: string
    AND?: usuarioWhereInput | usuarioWhereInput[]
    OR?: usuarioWhereInput[]
    NOT?: usuarioWhereInput | usuarioWhereInput[]
    nomeUsuario?: StringFilter<"usuario"> | string
    senha?: StringFilter<"usuario"> | string
    dataCadastro?: DateTimeFilter<"usuario"> | Date | string
    ativo?: IntFilter<"usuario"> | number
    ramal?: StringNullableFilter<"usuario"> | string | null
    fotoPerfil?: StringNullableFilter<"usuario"> | string | null
    idGerencia?: IntNullableFilter<"usuario"> | number | null
    idTipoUsuario?: IntNullableFilter<"usuario"> | number | null
    chamado_chamado_idSolicitanteTousuario?: ChamadoListRelationFilter
    chamado_chamado_idAnalistaTousuario?: ChamadoListRelationFilter
    logatividade?: LogatividadeListRelationFilter
    msgchamado?: MsgchamadoListRelationFilter
    notificacao?: NotificacaoListRelationFilter
    gerencia?: XOR<GerenciaNullableScalarRelationFilter, gerenciaWhereInput> | null
    tipousuario?: XOR<TipousuarioNullableScalarRelationFilter, tipousuarioWhereInput> | null
  }, "idUsuario" | "matricula" | "email">

  export type usuarioOrderByWithAggregationInput = {
    idUsuario?: SortOrder
    matricula?: SortOrder
    nomeUsuario?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    dataCadastro?: SortOrder
    ativo?: SortOrder
    ramal?: SortOrderInput | SortOrder
    fotoPerfil?: SortOrderInput | SortOrder
    idGerencia?: SortOrderInput | SortOrder
    idTipoUsuario?: SortOrderInput | SortOrder
    _count?: usuarioCountOrderByAggregateInput
    _avg?: usuarioAvgOrderByAggregateInput
    _max?: usuarioMaxOrderByAggregateInput
    _min?: usuarioMinOrderByAggregateInput
    _sum?: usuarioSumOrderByAggregateInput
  }

  export type usuarioScalarWhereWithAggregatesInput = {
    AND?: usuarioScalarWhereWithAggregatesInput | usuarioScalarWhereWithAggregatesInput[]
    OR?: usuarioScalarWhereWithAggregatesInput[]
    NOT?: usuarioScalarWhereWithAggregatesInput | usuarioScalarWhereWithAggregatesInput[]
    idUsuario?: IntWithAggregatesFilter<"usuario"> | number
    matricula?: StringWithAggregatesFilter<"usuario"> | string
    nomeUsuario?: StringWithAggregatesFilter<"usuario"> | string
    email?: StringWithAggregatesFilter<"usuario"> | string
    senha?: StringWithAggregatesFilter<"usuario"> | string
    dataCadastro?: DateTimeWithAggregatesFilter<"usuario"> | Date | string
    ativo?: IntWithAggregatesFilter<"usuario"> | number
    ramal?: StringNullableWithAggregatesFilter<"usuario"> | string | null
    fotoPerfil?: StringNullableWithAggregatesFilter<"usuario"> | string | null
    idGerencia?: IntNullableWithAggregatesFilter<"usuario"> | number | null
    idTipoUsuario?: IntNullableWithAggregatesFilter<"usuario"> | number | null
  }

  export type chamadoCreateInput = {
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura?: Date | string
    dataAtualizacao?: Date | string | null
    dataFechamento?: Date | string | null
    usuario_chamado_idSolicitanteTousuario?: usuarioCreateNestedOneWithoutChamado_chamado_idSolicitanteTousuarioInput
    usuario_chamado_idAnalistaTousuario?: usuarioCreateNestedOneWithoutChamado_chamado_idAnalistaTousuarioInput
    tipochamado?: tipochamadoCreateNestedOneWithoutChamadoInput
    statuschamado?: statuschamadoCreateNestedOneWithoutChamadoInput
    prioridadechamado?: prioridadechamadoCreateNestedOneWithoutChamadoInput
    msgchamado?: msgchamadoCreateNestedManyWithoutChamadoInput
    notificacao?: notificacaoCreateNestedManyWithoutChamadoInput
  }

  export type chamadoUncheckedCreateInput = {
    idChamado?: number
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura?: Date | string
    dataAtualizacao?: Date | string | null
    dataFechamento?: Date | string | null
    idSolicitante?: number | null
    idAnalista?: number | null
    idTipoChamado?: number | null
    idStatus?: number | null
    idPrioridade?: number | null
    msgchamado?: msgchamadoUncheckedCreateNestedManyWithoutChamadoInput
    notificacao?: notificacaoUncheckedCreateNestedManyWithoutChamadoInput
  }

  export type chamadoUpdateInput = {
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usuario_chamado_idSolicitanteTousuario?: usuarioUpdateOneWithoutChamado_chamado_idSolicitanteTousuarioNestedInput
    usuario_chamado_idAnalistaTousuario?: usuarioUpdateOneWithoutChamado_chamado_idAnalistaTousuarioNestedInput
    tipochamado?: tipochamadoUpdateOneWithoutChamadoNestedInput
    statuschamado?: statuschamadoUpdateOneWithoutChamadoNestedInput
    prioridadechamado?: prioridadechamadoUpdateOneWithoutChamadoNestedInput
    msgchamado?: msgchamadoUpdateManyWithoutChamadoNestedInput
    notificacao?: notificacaoUpdateManyWithoutChamadoNestedInput
  }

  export type chamadoUncheckedUpdateInput = {
    idChamado?: IntFieldUpdateOperationsInput | number
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idSolicitante?: NullableIntFieldUpdateOperationsInput | number | null
    idAnalista?: NullableIntFieldUpdateOperationsInput | number | null
    idTipoChamado?: NullableIntFieldUpdateOperationsInput | number | null
    idStatus?: NullableIntFieldUpdateOperationsInput | number | null
    idPrioridade?: NullableIntFieldUpdateOperationsInput | number | null
    msgchamado?: msgchamadoUncheckedUpdateManyWithoutChamadoNestedInput
    notificacao?: notificacaoUncheckedUpdateManyWithoutChamadoNestedInput
  }

  export type chamadoCreateManyInput = {
    idChamado?: number
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura?: Date | string
    dataAtualizacao?: Date | string | null
    dataFechamento?: Date | string | null
    idSolicitante?: number | null
    idAnalista?: number | null
    idTipoChamado?: number | null
    idStatus?: number | null
    idPrioridade?: number | null
  }

  export type chamadoUpdateManyMutationInput = {
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type chamadoUncheckedUpdateManyInput = {
    idChamado?: IntFieldUpdateOperationsInput | number
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idSolicitante?: NullableIntFieldUpdateOperationsInput | number | null
    idAnalista?: NullableIntFieldUpdateOperationsInput | number | null
    idTipoChamado?: NullableIntFieldUpdateOperationsInput | number | null
    idStatus?: NullableIntFieldUpdateOperationsInput | number | null
    idPrioridade?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type gerenciaCreateInput = {
    nomeGerencia: string
    ativo?: number
    usuario?: usuarioCreateNestedManyWithoutGerenciaInput
  }

  export type gerenciaUncheckedCreateInput = {
    idGerencia?: number
    nomeGerencia: string
    ativo?: number
    usuario?: usuarioUncheckedCreateNestedManyWithoutGerenciaInput
  }

  export type gerenciaUpdateInput = {
    nomeGerencia?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
    usuario?: usuarioUpdateManyWithoutGerenciaNestedInput
  }

  export type gerenciaUncheckedUpdateInput = {
    idGerencia?: IntFieldUpdateOperationsInput | number
    nomeGerencia?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
    usuario?: usuarioUncheckedUpdateManyWithoutGerenciaNestedInput
  }

  export type gerenciaCreateManyInput = {
    idGerencia?: number
    nomeGerencia: string
    ativo?: number
  }

  export type gerenciaUpdateManyMutationInput = {
    nomeGerencia?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
  }

  export type gerenciaUncheckedUpdateManyInput = {
    idGerencia?: IntFieldUpdateOperationsInput | number
    nomeGerencia?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
  }

  export type logatividadeCreateInput = {
    descricao: string
    dataHora?: Date | string | null
    usuario?: usuarioCreateNestedOneWithoutLogatividadeInput
  }

  export type logatividadeUncheckedCreateInput = {
    idLog?: number
    descricao: string
    dataHora?: Date | string | null
    idUsuario?: number | null
  }

  export type logatividadeUpdateInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usuario?: usuarioUpdateOneWithoutLogatividadeNestedInput
  }

  export type logatividadeUncheckedUpdateInput = {
    idLog?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idUsuario?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type logatividadeCreateManyInput = {
    idLog?: number
    descricao: string
    dataHora?: Date | string | null
    idUsuario?: number | null
  }

  export type logatividadeUpdateManyMutationInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type logatividadeUncheckedUpdateManyInput = {
    idLog?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idUsuario?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type msgchamadoCreateInput = {
    mensagem: string
    timestamp?: Date | string | null
    remetente: $Enums.msgchamado_remetente
    urlAnexo?: string | null
    nomeArquivo?: string | null
    chamado: chamadoCreateNestedOneWithoutMsgchamadoInput
    usuario: usuarioCreateNestedOneWithoutMsgchamadoInput
  }

  export type msgchamadoUncheckedCreateInput = {
    idMensagem?: number
    mensagem: string
    timestamp?: Date | string | null
    remetente: $Enums.msgchamado_remetente
    urlAnexo?: string | null
    nomeArquivo?: string | null
    idChamado: number
    idRemetente: number
  }

  export type msgchamadoUpdateInput = {
    mensagem?: StringFieldUpdateOperationsInput | string
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remetente?: Enummsgchamado_remetenteFieldUpdateOperationsInput | $Enums.msgchamado_remetente
    urlAnexo?: NullableStringFieldUpdateOperationsInput | string | null
    nomeArquivo?: NullableStringFieldUpdateOperationsInput | string | null
    chamado?: chamadoUpdateOneRequiredWithoutMsgchamadoNestedInput
    usuario?: usuarioUpdateOneRequiredWithoutMsgchamadoNestedInput
  }

  export type msgchamadoUncheckedUpdateInput = {
    idMensagem?: IntFieldUpdateOperationsInput | number
    mensagem?: StringFieldUpdateOperationsInput | string
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remetente?: Enummsgchamado_remetenteFieldUpdateOperationsInput | $Enums.msgchamado_remetente
    urlAnexo?: NullableStringFieldUpdateOperationsInput | string | null
    nomeArquivo?: NullableStringFieldUpdateOperationsInput | string | null
    idChamado?: IntFieldUpdateOperationsInput | number
    idRemetente?: IntFieldUpdateOperationsInput | number
  }

  export type msgchamadoCreateManyInput = {
    idMensagem?: number
    mensagem: string
    timestamp?: Date | string | null
    remetente: $Enums.msgchamado_remetente
    urlAnexo?: string | null
    nomeArquivo?: string | null
    idChamado: number
    idRemetente: number
  }

  export type msgchamadoUpdateManyMutationInput = {
    mensagem?: StringFieldUpdateOperationsInput | string
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remetente?: Enummsgchamado_remetenteFieldUpdateOperationsInput | $Enums.msgchamado_remetente
    urlAnexo?: NullableStringFieldUpdateOperationsInput | string | null
    nomeArquivo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type msgchamadoUncheckedUpdateManyInput = {
    idMensagem?: IntFieldUpdateOperationsInput | number
    mensagem?: StringFieldUpdateOperationsInput | string
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remetente?: Enummsgchamado_remetenteFieldUpdateOperationsInput | $Enums.msgchamado_remetente
    urlAnexo?: NullableStringFieldUpdateOperationsInput | string | null
    nomeArquivo?: NullableStringFieldUpdateOperationsInput | string | null
    idChamado?: IntFieldUpdateOperationsInput | number
    idRemetente?: IntFieldUpdateOperationsInput | number
  }

  export type notificacaoCreateInput = {
    titulo: string
    mensagem: string
    lida?: number
    dataHora?: Date | string | null
    usuario: usuarioCreateNestedOneWithoutNotificacaoInput
    chamado?: chamadoCreateNestedOneWithoutNotificacaoInput
  }

  export type notificacaoUncheckedCreateInput = {
    idNotificacao?: number
    titulo: string
    mensagem: string
    lida?: number
    dataHora?: Date | string | null
    idUsuario: number
    idChamado?: number | null
  }

  export type notificacaoUpdateInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    lida?: IntFieldUpdateOperationsInput | number
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usuario?: usuarioUpdateOneRequiredWithoutNotificacaoNestedInput
    chamado?: chamadoUpdateOneWithoutNotificacaoNestedInput
  }

  export type notificacaoUncheckedUpdateInput = {
    idNotificacao?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    lida?: IntFieldUpdateOperationsInput | number
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idUsuario?: IntFieldUpdateOperationsInput | number
    idChamado?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type notificacaoCreateManyInput = {
    idNotificacao?: number
    titulo: string
    mensagem: string
    lida?: number
    dataHora?: Date | string | null
    idUsuario: number
    idChamado?: number | null
  }

  export type notificacaoUpdateManyMutationInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    lida?: IntFieldUpdateOperationsInput | number
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type notificacaoUncheckedUpdateManyInput = {
    idNotificacao?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    lida?: IntFieldUpdateOperationsInput | number
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idUsuario?: IntFieldUpdateOperationsInput | number
    idChamado?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type prioridadechamadoCreateInput = {
    nomePrioridade: string
    ativo?: number
    hexCorPrimaria: string
    hexCorSecundaria: string
    chamado?: chamadoCreateNestedManyWithoutPrioridadechamadoInput
  }

  export type prioridadechamadoUncheckedCreateInput = {
    idPrioridade?: number
    nomePrioridade: string
    ativo?: number
    hexCorPrimaria: string
    hexCorSecundaria: string
    chamado?: chamadoUncheckedCreateNestedManyWithoutPrioridadechamadoInput
  }

  export type prioridadechamadoUpdateInput = {
    nomePrioridade?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
    hexCorPrimaria?: StringFieldUpdateOperationsInput | string
    hexCorSecundaria?: StringFieldUpdateOperationsInput | string
    chamado?: chamadoUpdateManyWithoutPrioridadechamadoNestedInput
  }

  export type prioridadechamadoUncheckedUpdateInput = {
    idPrioridade?: IntFieldUpdateOperationsInput | number
    nomePrioridade?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
    hexCorPrimaria?: StringFieldUpdateOperationsInput | string
    hexCorSecundaria?: StringFieldUpdateOperationsInput | string
    chamado?: chamadoUncheckedUpdateManyWithoutPrioridadechamadoNestedInput
  }

  export type prioridadechamadoCreateManyInput = {
    idPrioridade?: number
    nomePrioridade: string
    ativo?: number
    hexCorPrimaria: string
    hexCorSecundaria: string
  }

  export type prioridadechamadoUpdateManyMutationInput = {
    nomePrioridade?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
    hexCorPrimaria?: StringFieldUpdateOperationsInput | string
    hexCorSecundaria?: StringFieldUpdateOperationsInput | string
  }

  export type prioridadechamadoUncheckedUpdateManyInput = {
    idPrioridade?: IntFieldUpdateOperationsInput | number
    nomePrioridade?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
    hexCorPrimaria?: StringFieldUpdateOperationsInput | string
    hexCorSecundaria?: StringFieldUpdateOperationsInput | string
  }

  export type statuschamadoCreateInput = {
    nomeStatus: string
    ativo?: number
    hexCorPrimaria: string
    hexCorSecundaria: string
    chamado?: chamadoCreateNestedManyWithoutStatuschamadoInput
  }

  export type statuschamadoUncheckedCreateInput = {
    idStatus?: number
    nomeStatus: string
    ativo?: number
    hexCorPrimaria: string
    hexCorSecundaria: string
    chamado?: chamadoUncheckedCreateNestedManyWithoutStatuschamadoInput
  }

  export type statuschamadoUpdateInput = {
    nomeStatus?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
    hexCorPrimaria?: StringFieldUpdateOperationsInput | string
    hexCorSecundaria?: StringFieldUpdateOperationsInput | string
    chamado?: chamadoUpdateManyWithoutStatuschamadoNestedInput
  }

  export type statuschamadoUncheckedUpdateInput = {
    idStatus?: IntFieldUpdateOperationsInput | number
    nomeStatus?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
    hexCorPrimaria?: StringFieldUpdateOperationsInput | string
    hexCorSecundaria?: StringFieldUpdateOperationsInput | string
    chamado?: chamadoUncheckedUpdateManyWithoutStatuschamadoNestedInput
  }

  export type statuschamadoCreateManyInput = {
    idStatus?: number
    nomeStatus: string
    ativo?: number
    hexCorPrimaria: string
    hexCorSecundaria: string
  }

  export type statuschamadoUpdateManyMutationInput = {
    nomeStatus?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
    hexCorPrimaria?: StringFieldUpdateOperationsInput | string
    hexCorSecundaria?: StringFieldUpdateOperationsInput | string
  }

  export type statuschamadoUncheckedUpdateManyInput = {
    idStatus?: IntFieldUpdateOperationsInput | number
    nomeStatus?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
    hexCorPrimaria?: StringFieldUpdateOperationsInput | string
    hexCorSecundaria?: StringFieldUpdateOperationsInput | string
  }

  export type tipochamadoCreateInput = {
    nomeTipo: string
    ativo?: number
    chamado?: chamadoCreateNestedManyWithoutTipochamadoInput
  }

  export type tipochamadoUncheckedCreateInput = {
    idTipoChamado?: number
    nomeTipo: string
    ativo?: number
    chamado?: chamadoUncheckedCreateNestedManyWithoutTipochamadoInput
  }

  export type tipochamadoUpdateInput = {
    nomeTipo?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
    chamado?: chamadoUpdateManyWithoutTipochamadoNestedInput
  }

  export type tipochamadoUncheckedUpdateInput = {
    idTipoChamado?: IntFieldUpdateOperationsInput | number
    nomeTipo?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
    chamado?: chamadoUncheckedUpdateManyWithoutTipochamadoNestedInput
  }

  export type tipochamadoCreateManyInput = {
    idTipoChamado?: number
    nomeTipo: string
    ativo?: number
  }

  export type tipochamadoUpdateManyMutationInput = {
    nomeTipo?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
  }

  export type tipochamadoUncheckedUpdateManyInput = {
    idTipoChamado?: IntFieldUpdateOperationsInput | number
    nomeTipo?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
  }

  export type tipousuarioCreateInput = {
    tipoUsuario: string
    usuario?: usuarioCreateNestedManyWithoutTipousuarioInput
  }

  export type tipousuarioUncheckedCreateInput = {
    idTipoUsuario?: number
    tipoUsuario: string
    usuario?: usuarioUncheckedCreateNestedManyWithoutTipousuarioInput
  }

  export type tipousuarioUpdateInput = {
    tipoUsuario?: StringFieldUpdateOperationsInput | string
    usuario?: usuarioUpdateManyWithoutTipousuarioNestedInput
  }

  export type tipousuarioUncheckedUpdateInput = {
    idTipoUsuario?: IntFieldUpdateOperationsInput | number
    tipoUsuario?: StringFieldUpdateOperationsInput | string
    usuario?: usuarioUncheckedUpdateManyWithoutTipousuarioNestedInput
  }

  export type tipousuarioCreateManyInput = {
    idTipoUsuario?: number
    tipoUsuario: string
  }

  export type tipousuarioUpdateManyMutationInput = {
    tipoUsuario?: StringFieldUpdateOperationsInput | string
  }

  export type tipousuarioUncheckedUpdateManyInput = {
    idTipoUsuario?: IntFieldUpdateOperationsInput | number
    tipoUsuario?: StringFieldUpdateOperationsInput | string
  }

  export type usuarioCreateInput = {
    matricula: string
    nomeUsuario: string
    email: string
    senha: string
    dataCadastro?: Date | string
    ativo?: number
    ramal?: string | null
    fotoPerfil?: string | null
    chamado_chamado_idSolicitanteTousuario?: chamadoCreateNestedManyWithoutUsuario_chamado_idSolicitanteTousuarioInput
    chamado_chamado_idAnalistaTousuario?: chamadoCreateNestedManyWithoutUsuario_chamado_idAnalistaTousuarioInput
    logatividade?: logatividadeCreateNestedManyWithoutUsuarioInput
    msgchamado?: msgchamadoCreateNestedManyWithoutUsuarioInput
    notificacao?: notificacaoCreateNestedManyWithoutUsuarioInput
    gerencia?: gerenciaCreateNestedOneWithoutUsuarioInput
    tipousuario?: tipousuarioCreateNestedOneWithoutUsuarioInput
  }

  export type usuarioUncheckedCreateInput = {
    idUsuario?: number
    matricula: string
    nomeUsuario: string
    email: string
    senha: string
    dataCadastro?: Date | string
    ativo?: number
    ramal?: string | null
    fotoPerfil?: string | null
    idGerencia?: number | null
    idTipoUsuario?: number | null
    chamado_chamado_idSolicitanteTousuario?: chamadoUncheckedCreateNestedManyWithoutUsuario_chamado_idSolicitanteTousuarioInput
    chamado_chamado_idAnalistaTousuario?: chamadoUncheckedCreateNestedManyWithoutUsuario_chamado_idAnalistaTousuarioInput
    logatividade?: logatividadeUncheckedCreateNestedManyWithoutUsuarioInput
    msgchamado?: msgchamadoUncheckedCreateNestedManyWithoutUsuarioInput
    notificacao?: notificacaoUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type usuarioUpdateInput = {
    matricula?: StringFieldUpdateOperationsInput | string
    nomeUsuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: IntFieldUpdateOperationsInput | number
    ramal?: NullableStringFieldUpdateOperationsInput | string | null
    fotoPerfil?: NullableStringFieldUpdateOperationsInput | string | null
    chamado_chamado_idSolicitanteTousuario?: chamadoUpdateManyWithoutUsuario_chamado_idSolicitanteTousuarioNestedInput
    chamado_chamado_idAnalistaTousuario?: chamadoUpdateManyWithoutUsuario_chamado_idAnalistaTousuarioNestedInput
    logatividade?: logatividadeUpdateManyWithoutUsuarioNestedInput
    msgchamado?: msgchamadoUpdateManyWithoutUsuarioNestedInput
    notificacao?: notificacaoUpdateManyWithoutUsuarioNestedInput
    gerencia?: gerenciaUpdateOneWithoutUsuarioNestedInput
    tipousuario?: tipousuarioUpdateOneWithoutUsuarioNestedInput
  }

  export type usuarioUncheckedUpdateInput = {
    idUsuario?: IntFieldUpdateOperationsInput | number
    matricula?: StringFieldUpdateOperationsInput | string
    nomeUsuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: IntFieldUpdateOperationsInput | number
    ramal?: NullableStringFieldUpdateOperationsInput | string | null
    fotoPerfil?: NullableStringFieldUpdateOperationsInput | string | null
    idGerencia?: NullableIntFieldUpdateOperationsInput | number | null
    idTipoUsuario?: NullableIntFieldUpdateOperationsInput | number | null
    chamado_chamado_idSolicitanteTousuario?: chamadoUncheckedUpdateManyWithoutUsuario_chamado_idSolicitanteTousuarioNestedInput
    chamado_chamado_idAnalistaTousuario?: chamadoUncheckedUpdateManyWithoutUsuario_chamado_idAnalistaTousuarioNestedInput
    logatividade?: logatividadeUncheckedUpdateManyWithoutUsuarioNestedInput
    msgchamado?: msgchamadoUncheckedUpdateManyWithoutUsuarioNestedInput
    notificacao?: notificacaoUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type usuarioCreateManyInput = {
    idUsuario?: number
    matricula: string
    nomeUsuario: string
    email: string
    senha: string
    dataCadastro?: Date | string
    ativo?: number
    ramal?: string | null
    fotoPerfil?: string | null
    idGerencia?: number | null
    idTipoUsuario?: number | null
  }

  export type usuarioUpdateManyMutationInput = {
    matricula?: StringFieldUpdateOperationsInput | string
    nomeUsuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: IntFieldUpdateOperationsInput | number
    ramal?: NullableStringFieldUpdateOperationsInput | string | null
    fotoPerfil?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usuarioUncheckedUpdateManyInput = {
    idUsuario?: IntFieldUpdateOperationsInput | number
    matricula?: StringFieldUpdateOperationsInput | string
    nomeUsuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: IntFieldUpdateOperationsInput | number
    ramal?: NullableStringFieldUpdateOperationsInput | string | null
    fotoPerfil?: NullableStringFieldUpdateOperationsInput | string | null
    idGerencia?: NullableIntFieldUpdateOperationsInput | number | null
    idTipoUsuario?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UsuarioNullableScalarRelationFilter = {
    is?: usuarioWhereInput | null
    isNot?: usuarioWhereInput | null
  }

  export type TipochamadoNullableScalarRelationFilter = {
    is?: tipochamadoWhereInput | null
    isNot?: tipochamadoWhereInput | null
  }

  export type StatuschamadoNullableScalarRelationFilter = {
    is?: statuschamadoWhereInput | null
    isNot?: statuschamadoWhereInput | null
  }

  export type PrioridadechamadoNullableScalarRelationFilter = {
    is?: prioridadechamadoWhereInput | null
    isNot?: prioridadechamadoWhereInput | null
  }

  export type MsgchamadoListRelationFilter = {
    every?: msgchamadoWhereInput
    some?: msgchamadoWhereInput
    none?: msgchamadoWhereInput
  }

  export type NotificacaoListRelationFilter = {
    every?: notificacaoWhereInput
    some?: notificacaoWhereInput
    none?: notificacaoWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type msgchamadoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type notificacaoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type chamadoOrderByRelevanceInput = {
    fields: chamadoOrderByRelevanceFieldEnum | chamadoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type chamadoCountOrderByAggregateInput = {
    idChamado?: SortOrder
    protocolo?: SortOrder
    assunto?: SortOrder
    descricao?: SortOrder
    dataAbertura?: SortOrder
    dataAtualizacao?: SortOrder
    dataFechamento?: SortOrder
    idSolicitante?: SortOrder
    idAnalista?: SortOrder
    idTipoChamado?: SortOrder
    idStatus?: SortOrder
    idPrioridade?: SortOrder
  }

  export type chamadoAvgOrderByAggregateInput = {
    idChamado?: SortOrder
    idSolicitante?: SortOrder
    idAnalista?: SortOrder
    idTipoChamado?: SortOrder
    idStatus?: SortOrder
    idPrioridade?: SortOrder
  }

  export type chamadoMaxOrderByAggregateInput = {
    idChamado?: SortOrder
    protocolo?: SortOrder
    assunto?: SortOrder
    descricao?: SortOrder
    dataAbertura?: SortOrder
    dataAtualizacao?: SortOrder
    dataFechamento?: SortOrder
    idSolicitante?: SortOrder
    idAnalista?: SortOrder
    idTipoChamado?: SortOrder
    idStatus?: SortOrder
    idPrioridade?: SortOrder
  }

  export type chamadoMinOrderByAggregateInput = {
    idChamado?: SortOrder
    protocolo?: SortOrder
    assunto?: SortOrder
    descricao?: SortOrder
    dataAbertura?: SortOrder
    dataAtualizacao?: SortOrder
    dataFechamento?: SortOrder
    idSolicitante?: SortOrder
    idAnalista?: SortOrder
    idTipoChamado?: SortOrder
    idStatus?: SortOrder
    idPrioridade?: SortOrder
  }

  export type chamadoSumOrderByAggregateInput = {
    idChamado?: SortOrder
    idSolicitante?: SortOrder
    idAnalista?: SortOrder
    idTipoChamado?: SortOrder
    idStatus?: SortOrder
    idPrioridade?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type UsuarioListRelationFilter = {
    every?: usuarioWhereInput
    some?: usuarioWhereInput
    none?: usuarioWhereInput
  }

  export type usuarioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type gerenciaOrderByRelevanceInput = {
    fields: gerenciaOrderByRelevanceFieldEnum | gerenciaOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type gerenciaCountOrderByAggregateInput = {
    idGerencia?: SortOrder
    nomeGerencia?: SortOrder
    ativo?: SortOrder
  }

  export type gerenciaAvgOrderByAggregateInput = {
    idGerencia?: SortOrder
    ativo?: SortOrder
  }

  export type gerenciaMaxOrderByAggregateInput = {
    idGerencia?: SortOrder
    nomeGerencia?: SortOrder
    ativo?: SortOrder
  }

  export type gerenciaMinOrderByAggregateInput = {
    idGerencia?: SortOrder
    nomeGerencia?: SortOrder
    ativo?: SortOrder
  }

  export type gerenciaSumOrderByAggregateInput = {
    idGerencia?: SortOrder
    ativo?: SortOrder
  }

  export type logatividadeOrderByRelevanceInput = {
    fields: logatividadeOrderByRelevanceFieldEnum | logatividadeOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type logatividadeCountOrderByAggregateInput = {
    idLog?: SortOrder
    descricao?: SortOrder
    dataHora?: SortOrder
    idUsuario?: SortOrder
  }

  export type logatividadeAvgOrderByAggregateInput = {
    idLog?: SortOrder
    idUsuario?: SortOrder
  }

  export type logatividadeMaxOrderByAggregateInput = {
    idLog?: SortOrder
    descricao?: SortOrder
    dataHora?: SortOrder
    idUsuario?: SortOrder
  }

  export type logatividadeMinOrderByAggregateInput = {
    idLog?: SortOrder
    descricao?: SortOrder
    dataHora?: SortOrder
    idUsuario?: SortOrder
  }

  export type logatividadeSumOrderByAggregateInput = {
    idLog?: SortOrder
    idUsuario?: SortOrder
  }

  export type Enummsgchamado_remetenteFilter<$PrismaModel = never> = {
    equals?: $Enums.msgchamado_remetente | Enummsgchamado_remetenteFieldRefInput<$PrismaModel>
    in?: $Enums.msgchamado_remetente[]
    notIn?: $Enums.msgchamado_remetente[]
    not?: NestedEnummsgchamado_remetenteFilter<$PrismaModel> | $Enums.msgchamado_remetente
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type ChamadoScalarRelationFilter = {
    is?: chamadoWhereInput
    isNot?: chamadoWhereInput
  }

  export type UsuarioScalarRelationFilter = {
    is?: usuarioWhereInput
    isNot?: usuarioWhereInput
  }

  export type msgchamadoOrderByRelevanceInput = {
    fields: msgchamadoOrderByRelevanceFieldEnum | msgchamadoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type msgchamadoCountOrderByAggregateInput = {
    idMensagem?: SortOrder
    mensagem?: SortOrder
    timestamp?: SortOrder
    remetente?: SortOrder
    urlAnexo?: SortOrder
    nomeArquivo?: SortOrder
    idChamado?: SortOrder
    idRemetente?: SortOrder
  }

  export type msgchamadoAvgOrderByAggregateInput = {
    idMensagem?: SortOrder
    idChamado?: SortOrder
    idRemetente?: SortOrder
  }

  export type msgchamadoMaxOrderByAggregateInput = {
    idMensagem?: SortOrder
    mensagem?: SortOrder
    timestamp?: SortOrder
    remetente?: SortOrder
    urlAnexo?: SortOrder
    nomeArquivo?: SortOrder
    idChamado?: SortOrder
    idRemetente?: SortOrder
  }

  export type msgchamadoMinOrderByAggregateInput = {
    idMensagem?: SortOrder
    mensagem?: SortOrder
    timestamp?: SortOrder
    remetente?: SortOrder
    urlAnexo?: SortOrder
    nomeArquivo?: SortOrder
    idChamado?: SortOrder
    idRemetente?: SortOrder
  }

  export type msgchamadoSumOrderByAggregateInput = {
    idMensagem?: SortOrder
    idChamado?: SortOrder
    idRemetente?: SortOrder
  }

  export type Enummsgchamado_remetenteWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.msgchamado_remetente | Enummsgchamado_remetenteFieldRefInput<$PrismaModel>
    in?: $Enums.msgchamado_remetente[]
    notIn?: $Enums.msgchamado_remetente[]
    not?: NestedEnummsgchamado_remetenteWithAggregatesFilter<$PrismaModel> | $Enums.msgchamado_remetente
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnummsgchamado_remetenteFilter<$PrismaModel>
    _max?: NestedEnummsgchamado_remetenteFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ChamadoNullableScalarRelationFilter = {
    is?: chamadoWhereInput | null
    isNot?: chamadoWhereInput | null
  }

  export type notificacaoOrderByRelevanceInput = {
    fields: notificacaoOrderByRelevanceFieldEnum | notificacaoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type notificacaoCountOrderByAggregateInput = {
    idNotificacao?: SortOrder
    titulo?: SortOrder
    mensagem?: SortOrder
    lida?: SortOrder
    dataHora?: SortOrder
    idUsuario?: SortOrder
    idChamado?: SortOrder
  }

  export type notificacaoAvgOrderByAggregateInput = {
    idNotificacao?: SortOrder
    lida?: SortOrder
    idUsuario?: SortOrder
    idChamado?: SortOrder
  }

  export type notificacaoMaxOrderByAggregateInput = {
    idNotificacao?: SortOrder
    titulo?: SortOrder
    mensagem?: SortOrder
    lida?: SortOrder
    dataHora?: SortOrder
    idUsuario?: SortOrder
    idChamado?: SortOrder
  }

  export type notificacaoMinOrderByAggregateInput = {
    idNotificacao?: SortOrder
    titulo?: SortOrder
    mensagem?: SortOrder
    lida?: SortOrder
    dataHora?: SortOrder
    idUsuario?: SortOrder
    idChamado?: SortOrder
  }

  export type notificacaoSumOrderByAggregateInput = {
    idNotificacao?: SortOrder
    lida?: SortOrder
    idUsuario?: SortOrder
    idChamado?: SortOrder
  }

  export type ChamadoListRelationFilter = {
    every?: chamadoWhereInput
    some?: chamadoWhereInput
    none?: chamadoWhereInput
  }

  export type chamadoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type prioridadechamadoOrderByRelevanceInput = {
    fields: prioridadechamadoOrderByRelevanceFieldEnum | prioridadechamadoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type prioridadechamadoCountOrderByAggregateInput = {
    idPrioridade?: SortOrder
    nomePrioridade?: SortOrder
    ativo?: SortOrder
    hexCorPrimaria?: SortOrder
    hexCorSecundaria?: SortOrder
  }

  export type prioridadechamadoAvgOrderByAggregateInput = {
    idPrioridade?: SortOrder
    ativo?: SortOrder
  }

  export type prioridadechamadoMaxOrderByAggregateInput = {
    idPrioridade?: SortOrder
    nomePrioridade?: SortOrder
    ativo?: SortOrder
    hexCorPrimaria?: SortOrder
    hexCorSecundaria?: SortOrder
  }

  export type prioridadechamadoMinOrderByAggregateInput = {
    idPrioridade?: SortOrder
    nomePrioridade?: SortOrder
    ativo?: SortOrder
    hexCorPrimaria?: SortOrder
    hexCorSecundaria?: SortOrder
  }

  export type prioridadechamadoSumOrderByAggregateInput = {
    idPrioridade?: SortOrder
    ativo?: SortOrder
  }

  export type statuschamadoOrderByRelevanceInput = {
    fields: statuschamadoOrderByRelevanceFieldEnum | statuschamadoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type statuschamadoCountOrderByAggregateInput = {
    idStatus?: SortOrder
    nomeStatus?: SortOrder
    ativo?: SortOrder
    hexCorPrimaria?: SortOrder
    hexCorSecundaria?: SortOrder
  }

  export type statuschamadoAvgOrderByAggregateInput = {
    idStatus?: SortOrder
    ativo?: SortOrder
  }

  export type statuschamadoMaxOrderByAggregateInput = {
    idStatus?: SortOrder
    nomeStatus?: SortOrder
    ativo?: SortOrder
    hexCorPrimaria?: SortOrder
    hexCorSecundaria?: SortOrder
  }

  export type statuschamadoMinOrderByAggregateInput = {
    idStatus?: SortOrder
    nomeStatus?: SortOrder
    ativo?: SortOrder
    hexCorPrimaria?: SortOrder
    hexCorSecundaria?: SortOrder
  }

  export type statuschamadoSumOrderByAggregateInput = {
    idStatus?: SortOrder
    ativo?: SortOrder
  }

  export type tipochamadoOrderByRelevanceInput = {
    fields: tipochamadoOrderByRelevanceFieldEnum | tipochamadoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type tipochamadoCountOrderByAggregateInput = {
    idTipoChamado?: SortOrder
    nomeTipo?: SortOrder
    ativo?: SortOrder
  }

  export type tipochamadoAvgOrderByAggregateInput = {
    idTipoChamado?: SortOrder
    ativo?: SortOrder
  }

  export type tipochamadoMaxOrderByAggregateInput = {
    idTipoChamado?: SortOrder
    nomeTipo?: SortOrder
    ativo?: SortOrder
  }

  export type tipochamadoMinOrderByAggregateInput = {
    idTipoChamado?: SortOrder
    nomeTipo?: SortOrder
    ativo?: SortOrder
  }

  export type tipochamadoSumOrderByAggregateInput = {
    idTipoChamado?: SortOrder
    ativo?: SortOrder
  }

  export type tipousuarioOrderByRelevanceInput = {
    fields: tipousuarioOrderByRelevanceFieldEnum | tipousuarioOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type tipousuarioCountOrderByAggregateInput = {
    idTipoUsuario?: SortOrder
    tipoUsuario?: SortOrder
  }

  export type tipousuarioAvgOrderByAggregateInput = {
    idTipoUsuario?: SortOrder
  }

  export type tipousuarioMaxOrderByAggregateInput = {
    idTipoUsuario?: SortOrder
    tipoUsuario?: SortOrder
  }

  export type tipousuarioMinOrderByAggregateInput = {
    idTipoUsuario?: SortOrder
    tipoUsuario?: SortOrder
  }

  export type tipousuarioSumOrderByAggregateInput = {
    idTipoUsuario?: SortOrder
  }

  export type LogatividadeListRelationFilter = {
    every?: logatividadeWhereInput
    some?: logatividadeWhereInput
    none?: logatividadeWhereInput
  }

  export type GerenciaNullableScalarRelationFilter = {
    is?: gerenciaWhereInput | null
    isNot?: gerenciaWhereInput | null
  }

  export type TipousuarioNullableScalarRelationFilter = {
    is?: tipousuarioWhereInput | null
    isNot?: tipousuarioWhereInput | null
  }

  export type logatividadeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usuarioOrderByRelevanceInput = {
    fields: usuarioOrderByRelevanceFieldEnum | usuarioOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type usuarioCountOrderByAggregateInput = {
    idUsuario?: SortOrder
    matricula?: SortOrder
    nomeUsuario?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    dataCadastro?: SortOrder
    ativo?: SortOrder
    ramal?: SortOrder
    fotoPerfil?: SortOrder
    idGerencia?: SortOrder
    idTipoUsuario?: SortOrder
  }

  export type usuarioAvgOrderByAggregateInput = {
    idUsuario?: SortOrder
    ativo?: SortOrder
    idGerencia?: SortOrder
    idTipoUsuario?: SortOrder
  }

  export type usuarioMaxOrderByAggregateInput = {
    idUsuario?: SortOrder
    matricula?: SortOrder
    nomeUsuario?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    dataCadastro?: SortOrder
    ativo?: SortOrder
    ramal?: SortOrder
    fotoPerfil?: SortOrder
    idGerencia?: SortOrder
    idTipoUsuario?: SortOrder
  }

  export type usuarioMinOrderByAggregateInput = {
    idUsuario?: SortOrder
    matricula?: SortOrder
    nomeUsuario?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    dataCadastro?: SortOrder
    ativo?: SortOrder
    ramal?: SortOrder
    fotoPerfil?: SortOrder
    idGerencia?: SortOrder
    idTipoUsuario?: SortOrder
  }

  export type usuarioSumOrderByAggregateInput = {
    idUsuario?: SortOrder
    ativo?: SortOrder
    idGerencia?: SortOrder
    idTipoUsuario?: SortOrder
  }

  export type usuarioCreateNestedOneWithoutChamado_chamado_idSolicitanteTousuarioInput = {
    create?: XOR<usuarioCreateWithoutChamado_chamado_idSolicitanteTousuarioInput, usuarioUncheckedCreateWithoutChamado_chamado_idSolicitanteTousuarioInput>
    connectOrCreate?: usuarioCreateOrConnectWithoutChamado_chamado_idSolicitanteTousuarioInput
    connect?: usuarioWhereUniqueInput
  }

  export type usuarioCreateNestedOneWithoutChamado_chamado_idAnalistaTousuarioInput = {
    create?: XOR<usuarioCreateWithoutChamado_chamado_idAnalistaTousuarioInput, usuarioUncheckedCreateWithoutChamado_chamado_idAnalistaTousuarioInput>
    connectOrCreate?: usuarioCreateOrConnectWithoutChamado_chamado_idAnalistaTousuarioInput
    connect?: usuarioWhereUniqueInput
  }

  export type tipochamadoCreateNestedOneWithoutChamadoInput = {
    create?: XOR<tipochamadoCreateWithoutChamadoInput, tipochamadoUncheckedCreateWithoutChamadoInput>
    connectOrCreate?: tipochamadoCreateOrConnectWithoutChamadoInput
    connect?: tipochamadoWhereUniqueInput
  }

  export type statuschamadoCreateNestedOneWithoutChamadoInput = {
    create?: XOR<statuschamadoCreateWithoutChamadoInput, statuschamadoUncheckedCreateWithoutChamadoInput>
    connectOrCreate?: statuschamadoCreateOrConnectWithoutChamadoInput
    connect?: statuschamadoWhereUniqueInput
  }

  export type prioridadechamadoCreateNestedOneWithoutChamadoInput = {
    create?: XOR<prioridadechamadoCreateWithoutChamadoInput, prioridadechamadoUncheckedCreateWithoutChamadoInput>
    connectOrCreate?: prioridadechamadoCreateOrConnectWithoutChamadoInput
    connect?: prioridadechamadoWhereUniqueInput
  }

  export type msgchamadoCreateNestedManyWithoutChamadoInput = {
    create?: XOR<msgchamadoCreateWithoutChamadoInput, msgchamadoUncheckedCreateWithoutChamadoInput> | msgchamadoCreateWithoutChamadoInput[] | msgchamadoUncheckedCreateWithoutChamadoInput[]
    connectOrCreate?: msgchamadoCreateOrConnectWithoutChamadoInput | msgchamadoCreateOrConnectWithoutChamadoInput[]
    createMany?: msgchamadoCreateManyChamadoInputEnvelope
    connect?: msgchamadoWhereUniqueInput | msgchamadoWhereUniqueInput[]
  }

  export type notificacaoCreateNestedManyWithoutChamadoInput = {
    create?: XOR<notificacaoCreateWithoutChamadoInput, notificacaoUncheckedCreateWithoutChamadoInput> | notificacaoCreateWithoutChamadoInput[] | notificacaoUncheckedCreateWithoutChamadoInput[]
    connectOrCreate?: notificacaoCreateOrConnectWithoutChamadoInput | notificacaoCreateOrConnectWithoutChamadoInput[]
    createMany?: notificacaoCreateManyChamadoInputEnvelope
    connect?: notificacaoWhereUniqueInput | notificacaoWhereUniqueInput[]
  }

  export type msgchamadoUncheckedCreateNestedManyWithoutChamadoInput = {
    create?: XOR<msgchamadoCreateWithoutChamadoInput, msgchamadoUncheckedCreateWithoutChamadoInput> | msgchamadoCreateWithoutChamadoInput[] | msgchamadoUncheckedCreateWithoutChamadoInput[]
    connectOrCreate?: msgchamadoCreateOrConnectWithoutChamadoInput | msgchamadoCreateOrConnectWithoutChamadoInput[]
    createMany?: msgchamadoCreateManyChamadoInputEnvelope
    connect?: msgchamadoWhereUniqueInput | msgchamadoWhereUniqueInput[]
  }

  export type notificacaoUncheckedCreateNestedManyWithoutChamadoInput = {
    create?: XOR<notificacaoCreateWithoutChamadoInput, notificacaoUncheckedCreateWithoutChamadoInput> | notificacaoCreateWithoutChamadoInput[] | notificacaoUncheckedCreateWithoutChamadoInput[]
    connectOrCreate?: notificacaoCreateOrConnectWithoutChamadoInput | notificacaoCreateOrConnectWithoutChamadoInput[]
    createMany?: notificacaoCreateManyChamadoInputEnvelope
    connect?: notificacaoWhereUniqueInput | notificacaoWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type usuarioUpdateOneWithoutChamado_chamado_idSolicitanteTousuarioNestedInput = {
    create?: XOR<usuarioCreateWithoutChamado_chamado_idSolicitanteTousuarioInput, usuarioUncheckedCreateWithoutChamado_chamado_idSolicitanteTousuarioInput>
    connectOrCreate?: usuarioCreateOrConnectWithoutChamado_chamado_idSolicitanteTousuarioInput
    upsert?: usuarioUpsertWithoutChamado_chamado_idSolicitanteTousuarioInput
    disconnect?: usuarioWhereInput | boolean
    delete?: usuarioWhereInput | boolean
    connect?: usuarioWhereUniqueInput
    update?: XOR<XOR<usuarioUpdateToOneWithWhereWithoutChamado_chamado_idSolicitanteTousuarioInput, usuarioUpdateWithoutChamado_chamado_idSolicitanteTousuarioInput>, usuarioUncheckedUpdateWithoutChamado_chamado_idSolicitanteTousuarioInput>
  }

  export type usuarioUpdateOneWithoutChamado_chamado_idAnalistaTousuarioNestedInput = {
    create?: XOR<usuarioCreateWithoutChamado_chamado_idAnalistaTousuarioInput, usuarioUncheckedCreateWithoutChamado_chamado_idAnalistaTousuarioInput>
    connectOrCreate?: usuarioCreateOrConnectWithoutChamado_chamado_idAnalistaTousuarioInput
    upsert?: usuarioUpsertWithoutChamado_chamado_idAnalistaTousuarioInput
    disconnect?: usuarioWhereInput | boolean
    delete?: usuarioWhereInput | boolean
    connect?: usuarioWhereUniqueInput
    update?: XOR<XOR<usuarioUpdateToOneWithWhereWithoutChamado_chamado_idAnalistaTousuarioInput, usuarioUpdateWithoutChamado_chamado_idAnalistaTousuarioInput>, usuarioUncheckedUpdateWithoutChamado_chamado_idAnalistaTousuarioInput>
  }

  export type tipochamadoUpdateOneWithoutChamadoNestedInput = {
    create?: XOR<tipochamadoCreateWithoutChamadoInput, tipochamadoUncheckedCreateWithoutChamadoInput>
    connectOrCreate?: tipochamadoCreateOrConnectWithoutChamadoInput
    upsert?: tipochamadoUpsertWithoutChamadoInput
    disconnect?: tipochamadoWhereInput | boolean
    delete?: tipochamadoWhereInput | boolean
    connect?: tipochamadoWhereUniqueInput
    update?: XOR<XOR<tipochamadoUpdateToOneWithWhereWithoutChamadoInput, tipochamadoUpdateWithoutChamadoInput>, tipochamadoUncheckedUpdateWithoutChamadoInput>
  }

  export type statuschamadoUpdateOneWithoutChamadoNestedInput = {
    create?: XOR<statuschamadoCreateWithoutChamadoInput, statuschamadoUncheckedCreateWithoutChamadoInput>
    connectOrCreate?: statuschamadoCreateOrConnectWithoutChamadoInput
    upsert?: statuschamadoUpsertWithoutChamadoInput
    disconnect?: statuschamadoWhereInput | boolean
    delete?: statuschamadoWhereInput | boolean
    connect?: statuschamadoWhereUniqueInput
    update?: XOR<XOR<statuschamadoUpdateToOneWithWhereWithoutChamadoInput, statuschamadoUpdateWithoutChamadoInput>, statuschamadoUncheckedUpdateWithoutChamadoInput>
  }

  export type prioridadechamadoUpdateOneWithoutChamadoNestedInput = {
    create?: XOR<prioridadechamadoCreateWithoutChamadoInput, prioridadechamadoUncheckedCreateWithoutChamadoInput>
    connectOrCreate?: prioridadechamadoCreateOrConnectWithoutChamadoInput
    upsert?: prioridadechamadoUpsertWithoutChamadoInput
    disconnect?: prioridadechamadoWhereInput | boolean
    delete?: prioridadechamadoWhereInput | boolean
    connect?: prioridadechamadoWhereUniqueInput
    update?: XOR<XOR<prioridadechamadoUpdateToOneWithWhereWithoutChamadoInput, prioridadechamadoUpdateWithoutChamadoInput>, prioridadechamadoUncheckedUpdateWithoutChamadoInput>
  }

  export type msgchamadoUpdateManyWithoutChamadoNestedInput = {
    create?: XOR<msgchamadoCreateWithoutChamadoInput, msgchamadoUncheckedCreateWithoutChamadoInput> | msgchamadoCreateWithoutChamadoInput[] | msgchamadoUncheckedCreateWithoutChamadoInput[]
    connectOrCreate?: msgchamadoCreateOrConnectWithoutChamadoInput | msgchamadoCreateOrConnectWithoutChamadoInput[]
    upsert?: msgchamadoUpsertWithWhereUniqueWithoutChamadoInput | msgchamadoUpsertWithWhereUniqueWithoutChamadoInput[]
    createMany?: msgchamadoCreateManyChamadoInputEnvelope
    set?: msgchamadoWhereUniqueInput | msgchamadoWhereUniqueInput[]
    disconnect?: msgchamadoWhereUniqueInput | msgchamadoWhereUniqueInput[]
    delete?: msgchamadoWhereUniqueInput | msgchamadoWhereUniqueInput[]
    connect?: msgchamadoWhereUniqueInput | msgchamadoWhereUniqueInput[]
    update?: msgchamadoUpdateWithWhereUniqueWithoutChamadoInput | msgchamadoUpdateWithWhereUniqueWithoutChamadoInput[]
    updateMany?: msgchamadoUpdateManyWithWhereWithoutChamadoInput | msgchamadoUpdateManyWithWhereWithoutChamadoInput[]
    deleteMany?: msgchamadoScalarWhereInput | msgchamadoScalarWhereInput[]
  }

  export type notificacaoUpdateManyWithoutChamadoNestedInput = {
    create?: XOR<notificacaoCreateWithoutChamadoInput, notificacaoUncheckedCreateWithoutChamadoInput> | notificacaoCreateWithoutChamadoInput[] | notificacaoUncheckedCreateWithoutChamadoInput[]
    connectOrCreate?: notificacaoCreateOrConnectWithoutChamadoInput | notificacaoCreateOrConnectWithoutChamadoInput[]
    upsert?: notificacaoUpsertWithWhereUniqueWithoutChamadoInput | notificacaoUpsertWithWhereUniqueWithoutChamadoInput[]
    createMany?: notificacaoCreateManyChamadoInputEnvelope
    set?: notificacaoWhereUniqueInput | notificacaoWhereUniqueInput[]
    disconnect?: notificacaoWhereUniqueInput | notificacaoWhereUniqueInput[]
    delete?: notificacaoWhereUniqueInput | notificacaoWhereUniqueInput[]
    connect?: notificacaoWhereUniqueInput | notificacaoWhereUniqueInput[]
    update?: notificacaoUpdateWithWhereUniqueWithoutChamadoInput | notificacaoUpdateWithWhereUniqueWithoutChamadoInput[]
    updateMany?: notificacaoUpdateManyWithWhereWithoutChamadoInput | notificacaoUpdateManyWithWhereWithoutChamadoInput[]
    deleteMany?: notificacaoScalarWhereInput | notificacaoScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type msgchamadoUncheckedUpdateManyWithoutChamadoNestedInput = {
    create?: XOR<msgchamadoCreateWithoutChamadoInput, msgchamadoUncheckedCreateWithoutChamadoInput> | msgchamadoCreateWithoutChamadoInput[] | msgchamadoUncheckedCreateWithoutChamadoInput[]
    connectOrCreate?: msgchamadoCreateOrConnectWithoutChamadoInput | msgchamadoCreateOrConnectWithoutChamadoInput[]
    upsert?: msgchamadoUpsertWithWhereUniqueWithoutChamadoInput | msgchamadoUpsertWithWhereUniqueWithoutChamadoInput[]
    createMany?: msgchamadoCreateManyChamadoInputEnvelope
    set?: msgchamadoWhereUniqueInput | msgchamadoWhereUniqueInput[]
    disconnect?: msgchamadoWhereUniqueInput | msgchamadoWhereUniqueInput[]
    delete?: msgchamadoWhereUniqueInput | msgchamadoWhereUniqueInput[]
    connect?: msgchamadoWhereUniqueInput | msgchamadoWhereUniqueInput[]
    update?: msgchamadoUpdateWithWhereUniqueWithoutChamadoInput | msgchamadoUpdateWithWhereUniqueWithoutChamadoInput[]
    updateMany?: msgchamadoUpdateManyWithWhereWithoutChamadoInput | msgchamadoUpdateManyWithWhereWithoutChamadoInput[]
    deleteMany?: msgchamadoScalarWhereInput | msgchamadoScalarWhereInput[]
  }

  export type notificacaoUncheckedUpdateManyWithoutChamadoNestedInput = {
    create?: XOR<notificacaoCreateWithoutChamadoInput, notificacaoUncheckedCreateWithoutChamadoInput> | notificacaoCreateWithoutChamadoInput[] | notificacaoUncheckedCreateWithoutChamadoInput[]
    connectOrCreate?: notificacaoCreateOrConnectWithoutChamadoInput | notificacaoCreateOrConnectWithoutChamadoInput[]
    upsert?: notificacaoUpsertWithWhereUniqueWithoutChamadoInput | notificacaoUpsertWithWhereUniqueWithoutChamadoInput[]
    createMany?: notificacaoCreateManyChamadoInputEnvelope
    set?: notificacaoWhereUniqueInput | notificacaoWhereUniqueInput[]
    disconnect?: notificacaoWhereUniqueInput | notificacaoWhereUniqueInput[]
    delete?: notificacaoWhereUniqueInput | notificacaoWhereUniqueInput[]
    connect?: notificacaoWhereUniqueInput | notificacaoWhereUniqueInput[]
    update?: notificacaoUpdateWithWhereUniqueWithoutChamadoInput | notificacaoUpdateWithWhereUniqueWithoutChamadoInput[]
    updateMany?: notificacaoUpdateManyWithWhereWithoutChamadoInput | notificacaoUpdateManyWithWhereWithoutChamadoInput[]
    deleteMany?: notificacaoScalarWhereInput | notificacaoScalarWhereInput[]
  }

  export type usuarioCreateNestedManyWithoutGerenciaInput = {
    create?: XOR<usuarioCreateWithoutGerenciaInput, usuarioUncheckedCreateWithoutGerenciaInput> | usuarioCreateWithoutGerenciaInput[] | usuarioUncheckedCreateWithoutGerenciaInput[]
    connectOrCreate?: usuarioCreateOrConnectWithoutGerenciaInput | usuarioCreateOrConnectWithoutGerenciaInput[]
    createMany?: usuarioCreateManyGerenciaInputEnvelope
    connect?: usuarioWhereUniqueInput | usuarioWhereUniqueInput[]
  }

  export type usuarioUncheckedCreateNestedManyWithoutGerenciaInput = {
    create?: XOR<usuarioCreateWithoutGerenciaInput, usuarioUncheckedCreateWithoutGerenciaInput> | usuarioCreateWithoutGerenciaInput[] | usuarioUncheckedCreateWithoutGerenciaInput[]
    connectOrCreate?: usuarioCreateOrConnectWithoutGerenciaInput | usuarioCreateOrConnectWithoutGerenciaInput[]
    createMany?: usuarioCreateManyGerenciaInputEnvelope
    connect?: usuarioWhereUniqueInput | usuarioWhereUniqueInput[]
  }

  export type usuarioUpdateManyWithoutGerenciaNestedInput = {
    create?: XOR<usuarioCreateWithoutGerenciaInput, usuarioUncheckedCreateWithoutGerenciaInput> | usuarioCreateWithoutGerenciaInput[] | usuarioUncheckedCreateWithoutGerenciaInput[]
    connectOrCreate?: usuarioCreateOrConnectWithoutGerenciaInput | usuarioCreateOrConnectWithoutGerenciaInput[]
    upsert?: usuarioUpsertWithWhereUniqueWithoutGerenciaInput | usuarioUpsertWithWhereUniqueWithoutGerenciaInput[]
    createMany?: usuarioCreateManyGerenciaInputEnvelope
    set?: usuarioWhereUniqueInput | usuarioWhereUniqueInput[]
    disconnect?: usuarioWhereUniqueInput | usuarioWhereUniqueInput[]
    delete?: usuarioWhereUniqueInput | usuarioWhereUniqueInput[]
    connect?: usuarioWhereUniqueInput | usuarioWhereUniqueInput[]
    update?: usuarioUpdateWithWhereUniqueWithoutGerenciaInput | usuarioUpdateWithWhereUniqueWithoutGerenciaInput[]
    updateMany?: usuarioUpdateManyWithWhereWithoutGerenciaInput | usuarioUpdateManyWithWhereWithoutGerenciaInput[]
    deleteMany?: usuarioScalarWhereInput | usuarioScalarWhereInput[]
  }

  export type usuarioUncheckedUpdateManyWithoutGerenciaNestedInput = {
    create?: XOR<usuarioCreateWithoutGerenciaInput, usuarioUncheckedCreateWithoutGerenciaInput> | usuarioCreateWithoutGerenciaInput[] | usuarioUncheckedCreateWithoutGerenciaInput[]
    connectOrCreate?: usuarioCreateOrConnectWithoutGerenciaInput | usuarioCreateOrConnectWithoutGerenciaInput[]
    upsert?: usuarioUpsertWithWhereUniqueWithoutGerenciaInput | usuarioUpsertWithWhereUniqueWithoutGerenciaInput[]
    createMany?: usuarioCreateManyGerenciaInputEnvelope
    set?: usuarioWhereUniqueInput | usuarioWhereUniqueInput[]
    disconnect?: usuarioWhereUniqueInput | usuarioWhereUniqueInput[]
    delete?: usuarioWhereUniqueInput | usuarioWhereUniqueInput[]
    connect?: usuarioWhereUniqueInput | usuarioWhereUniqueInput[]
    update?: usuarioUpdateWithWhereUniqueWithoutGerenciaInput | usuarioUpdateWithWhereUniqueWithoutGerenciaInput[]
    updateMany?: usuarioUpdateManyWithWhereWithoutGerenciaInput | usuarioUpdateManyWithWhereWithoutGerenciaInput[]
    deleteMany?: usuarioScalarWhereInput | usuarioScalarWhereInput[]
  }

  export type usuarioCreateNestedOneWithoutLogatividadeInput = {
    create?: XOR<usuarioCreateWithoutLogatividadeInput, usuarioUncheckedCreateWithoutLogatividadeInput>
    connectOrCreate?: usuarioCreateOrConnectWithoutLogatividadeInput
    connect?: usuarioWhereUniqueInput
  }

  export type usuarioUpdateOneWithoutLogatividadeNestedInput = {
    create?: XOR<usuarioCreateWithoutLogatividadeInput, usuarioUncheckedCreateWithoutLogatividadeInput>
    connectOrCreate?: usuarioCreateOrConnectWithoutLogatividadeInput
    upsert?: usuarioUpsertWithoutLogatividadeInput
    disconnect?: usuarioWhereInput | boolean
    delete?: usuarioWhereInput | boolean
    connect?: usuarioWhereUniqueInput
    update?: XOR<XOR<usuarioUpdateToOneWithWhereWithoutLogatividadeInput, usuarioUpdateWithoutLogatividadeInput>, usuarioUncheckedUpdateWithoutLogatividadeInput>
  }

  export type chamadoCreateNestedOneWithoutMsgchamadoInput = {
    create?: XOR<chamadoCreateWithoutMsgchamadoInput, chamadoUncheckedCreateWithoutMsgchamadoInput>
    connectOrCreate?: chamadoCreateOrConnectWithoutMsgchamadoInput
    connect?: chamadoWhereUniqueInput
  }

  export type usuarioCreateNestedOneWithoutMsgchamadoInput = {
    create?: XOR<usuarioCreateWithoutMsgchamadoInput, usuarioUncheckedCreateWithoutMsgchamadoInput>
    connectOrCreate?: usuarioCreateOrConnectWithoutMsgchamadoInput
    connect?: usuarioWhereUniqueInput
  }

  export type Enummsgchamado_remetenteFieldUpdateOperationsInput = {
    set?: $Enums.msgchamado_remetente
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type chamadoUpdateOneRequiredWithoutMsgchamadoNestedInput = {
    create?: XOR<chamadoCreateWithoutMsgchamadoInput, chamadoUncheckedCreateWithoutMsgchamadoInput>
    connectOrCreate?: chamadoCreateOrConnectWithoutMsgchamadoInput
    upsert?: chamadoUpsertWithoutMsgchamadoInput
    connect?: chamadoWhereUniqueInput
    update?: XOR<XOR<chamadoUpdateToOneWithWhereWithoutMsgchamadoInput, chamadoUpdateWithoutMsgchamadoInput>, chamadoUncheckedUpdateWithoutMsgchamadoInput>
  }

  export type usuarioUpdateOneRequiredWithoutMsgchamadoNestedInput = {
    create?: XOR<usuarioCreateWithoutMsgchamadoInput, usuarioUncheckedCreateWithoutMsgchamadoInput>
    connectOrCreate?: usuarioCreateOrConnectWithoutMsgchamadoInput
    upsert?: usuarioUpsertWithoutMsgchamadoInput
    connect?: usuarioWhereUniqueInput
    update?: XOR<XOR<usuarioUpdateToOneWithWhereWithoutMsgchamadoInput, usuarioUpdateWithoutMsgchamadoInput>, usuarioUncheckedUpdateWithoutMsgchamadoInput>
  }

  export type usuarioCreateNestedOneWithoutNotificacaoInput = {
    create?: XOR<usuarioCreateWithoutNotificacaoInput, usuarioUncheckedCreateWithoutNotificacaoInput>
    connectOrCreate?: usuarioCreateOrConnectWithoutNotificacaoInput
    connect?: usuarioWhereUniqueInput
  }

  export type chamadoCreateNestedOneWithoutNotificacaoInput = {
    create?: XOR<chamadoCreateWithoutNotificacaoInput, chamadoUncheckedCreateWithoutNotificacaoInput>
    connectOrCreate?: chamadoCreateOrConnectWithoutNotificacaoInput
    connect?: chamadoWhereUniqueInput
  }

  export type usuarioUpdateOneRequiredWithoutNotificacaoNestedInput = {
    create?: XOR<usuarioCreateWithoutNotificacaoInput, usuarioUncheckedCreateWithoutNotificacaoInput>
    connectOrCreate?: usuarioCreateOrConnectWithoutNotificacaoInput
    upsert?: usuarioUpsertWithoutNotificacaoInput
    connect?: usuarioWhereUniqueInput
    update?: XOR<XOR<usuarioUpdateToOneWithWhereWithoutNotificacaoInput, usuarioUpdateWithoutNotificacaoInput>, usuarioUncheckedUpdateWithoutNotificacaoInput>
  }

  export type chamadoUpdateOneWithoutNotificacaoNestedInput = {
    create?: XOR<chamadoCreateWithoutNotificacaoInput, chamadoUncheckedCreateWithoutNotificacaoInput>
    connectOrCreate?: chamadoCreateOrConnectWithoutNotificacaoInput
    upsert?: chamadoUpsertWithoutNotificacaoInput
    disconnect?: chamadoWhereInput | boolean
    delete?: chamadoWhereInput | boolean
    connect?: chamadoWhereUniqueInput
    update?: XOR<XOR<chamadoUpdateToOneWithWhereWithoutNotificacaoInput, chamadoUpdateWithoutNotificacaoInput>, chamadoUncheckedUpdateWithoutNotificacaoInput>
  }

  export type chamadoCreateNestedManyWithoutPrioridadechamadoInput = {
    create?: XOR<chamadoCreateWithoutPrioridadechamadoInput, chamadoUncheckedCreateWithoutPrioridadechamadoInput> | chamadoCreateWithoutPrioridadechamadoInput[] | chamadoUncheckedCreateWithoutPrioridadechamadoInput[]
    connectOrCreate?: chamadoCreateOrConnectWithoutPrioridadechamadoInput | chamadoCreateOrConnectWithoutPrioridadechamadoInput[]
    createMany?: chamadoCreateManyPrioridadechamadoInputEnvelope
    connect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
  }

  export type chamadoUncheckedCreateNestedManyWithoutPrioridadechamadoInput = {
    create?: XOR<chamadoCreateWithoutPrioridadechamadoInput, chamadoUncheckedCreateWithoutPrioridadechamadoInput> | chamadoCreateWithoutPrioridadechamadoInput[] | chamadoUncheckedCreateWithoutPrioridadechamadoInput[]
    connectOrCreate?: chamadoCreateOrConnectWithoutPrioridadechamadoInput | chamadoCreateOrConnectWithoutPrioridadechamadoInput[]
    createMany?: chamadoCreateManyPrioridadechamadoInputEnvelope
    connect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
  }

  export type chamadoUpdateManyWithoutPrioridadechamadoNestedInput = {
    create?: XOR<chamadoCreateWithoutPrioridadechamadoInput, chamadoUncheckedCreateWithoutPrioridadechamadoInput> | chamadoCreateWithoutPrioridadechamadoInput[] | chamadoUncheckedCreateWithoutPrioridadechamadoInput[]
    connectOrCreate?: chamadoCreateOrConnectWithoutPrioridadechamadoInput | chamadoCreateOrConnectWithoutPrioridadechamadoInput[]
    upsert?: chamadoUpsertWithWhereUniqueWithoutPrioridadechamadoInput | chamadoUpsertWithWhereUniqueWithoutPrioridadechamadoInput[]
    createMany?: chamadoCreateManyPrioridadechamadoInputEnvelope
    set?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    disconnect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    delete?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    connect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    update?: chamadoUpdateWithWhereUniqueWithoutPrioridadechamadoInput | chamadoUpdateWithWhereUniqueWithoutPrioridadechamadoInput[]
    updateMany?: chamadoUpdateManyWithWhereWithoutPrioridadechamadoInput | chamadoUpdateManyWithWhereWithoutPrioridadechamadoInput[]
    deleteMany?: chamadoScalarWhereInput | chamadoScalarWhereInput[]
  }

  export type chamadoUncheckedUpdateManyWithoutPrioridadechamadoNestedInput = {
    create?: XOR<chamadoCreateWithoutPrioridadechamadoInput, chamadoUncheckedCreateWithoutPrioridadechamadoInput> | chamadoCreateWithoutPrioridadechamadoInput[] | chamadoUncheckedCreateWithoutPrioridadechamadoInput[]
    connectOrCreate?: chamadoCreateOrConnectWithoutPrioridadechamadoInput | chamadoCreateOrConnectWithoutPrioridadechamadoInput[]
    upsert?: chamadoUpsertWithWhereUniqueWithoutPrioridadechamadoInput | chamadoUpsertWithWhereUniqueWithoutPrioridadechamadoInput[]
    createMany?: chamadoCreateManyPrioridadechamadoInputEnvelope
    set?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    disconnect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    delete?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    connect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    update?: chamadoUpdateWithWhereUniqueWithoutPrioridadechamadoInput | chamadoUpdateWithWhereUniqueWithoutPrioridadechamadoInput[]
    updateMany?: chamadoUpdateManyWithWhereWithoutPrioridadechamadoInput | chamadoUpdateManyWithWhereWithoutPrioridadechamadoInput[]
    deleteMany?: chamadoScalarWhereInput | chamadoScalarWhereInput[]
  }

  export type chamadoCreateNestedManyWithoutStatuschamadoInput = {
    create?: XOR<chamadoCreateWithoutStatuschamadoInput, chamadoUncheckedCreateWithoutStatuschamadoInput> | chamadoCreateWithoutStatuschamadoInput[] | chamadoUncheckedCreateWithoutStatuschamadoInput[]
    connectOrCreate?: chamadoCreateOrConnectWithoutStatuschamadoInput | chamadoCreateOrConnectWithoutStatuschamadoInput[]
    createMany?: chamadoCreateManyStatuschamadoInputEnvelope
    connect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
  }

  export type chamadoUncheckedCreateNestedManyWithoutStatuschamadoInput = {
    create?: XOR<chamadoCreateWithoutStatuschamadoInput, chamadoUncheckedCreateWithoutStatuschamadoInput> | chamadoCreateWithoutStatuschamadoInput[] | chamadoUncheckedCreateWithoutStatuschamadoInput[]
    connectOrCreate?: chamadoCreateOrConnectWithoutStatuschamadoInput | chamadoCreateOrConnectWithoutStatuschamadoInput[]
    createMany?: chamadoCreateManyStatuschamadoInputEnvelope
    connect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
  }

  export type chamadoUpdateManyWithoutStatuschamadoNestedInput = {
    create?: XOR<chamadoCreateWithoutStatuschamadoInput, chamadoUncheckedCreateWithoutStatuschamadoInput> | chamadoCreateWithoutStatuschamadoInput[] | chamadoUncheckedCreateWithoutStatuschamadoInput[]
    connectOrCreate?: chamadoCreateOrConnectWithoutStatuschamadoInput | chamadoCreateOrConnectWithoutStatuschamadoInput[]
    upsert?: chamadoUpsertWithWhereUniqueWithoutStatuschamadoInput | chamadoUpsertWithWhereUniqueWithoutStatuschamadoInput[]
    createMany?: chamadoCreateManyStatuschamadoInputEnvelope
    set?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    disconnect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    delete?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    connect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    update?: chamadoUpdateWithWhereUniqueWithoutStatuschamadoInput | chamadoUpdateWithWhereUniqueWithoutStatuschamadoInput[]
    updateMany?: chamadoUpdateManyWithWhereWithoutStatuschamadoInput | chamadoUpdateManyWithWhereWithoutStatuschamadoInput[]
    deleteMany?: chamadoScalarWhereInput | chamadoScalarWhereInput[]
  }

  export type chamadoUncheckedUpdateManyWithoutStatuschamadoNestedInput = {
    create?: XOR<chamadoCreateWithoutStatuschamadoInput, chamadoUncheckedCreateWithoutStatuschamadoInput> | chamadoCreateWithoutStatuschamadoInput[] | chamadoUncheckedCreateWithoutStatuschamadoInput[]
    connectOrCreate?: chamadoCreateOrConnectWithoutStatuschamadoInput | chamadoCreateOrConnectWithoutStatuschamadoInput[]
    upsert?: chamadoUpsertWithWhereUniqueWithoutStatuschamadoInput | chamadoUpsertWithWhereUniqueWithoutStatuschamadoInput[]
    createMany?: chamadoCreateManyStatuschamadoInputEnvelope
    set?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    disconnect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    delete?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    connect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    update?: chamadoUpdateWithWhereUniqueWithoutStatuschamadoInput | chamadoUpdateWithWhereUniqueWithoutStatuschamadoInput[]
    updateMany?: chamadoUpdateManyWithWhereWithoutStatuschamadoInput | chamadoUpdateManyWithWhereWithoutStatuschamadoInput[]
    deleteMany?: chamadoScalarWhereInput | chamadoScalarWhereInput[]
  }

  export type chamadoCreateNestedManyWithoutTipochamadoInput = {
    create?: XOR<chamadoCreateWithoutTipochamadoInput, chamadoUncheckedCreateWithoutTipochamadoInput> | chamadoCreateWithoutTipochamadoInput[] | chamadoUncheckedCreateWithoutTipochamadoInput[]
    connectOrCreate?: chamadoCreateOrConnectWithoutTipochamadoInput | chamadoCreateOrConnectWithoutTipochamadoInput[]
    createMany?: chamadoCreateManyTipochamadoInputEnvelope
    connect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
  }

  export type chamadoUncheckedCreateNestedManyWithoutTipochamadoInput = {
    create?: XOR<chamadoCreateWithoutTipochamadoInput, chamadoUncheckedCreateWithoutTipochamadoInput> | chamadoCreateWithoutTipochamadoInput[] | chamadoUncheckedCreateWithoutTipochamadoInput[]
    connectOrCreate?: chamadoCreateOrConnectWithoutTipochamadoInput | chamadoCreateOrConnectWithoutTipochamadoInput[]
    createMany?: chamadoCreateManyTipochamadoInputEnvelope
    connect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
  }

  export type chamadoUpdateManyWithoutTipochamadoNestedInput = {
    create?: XOR<chamadoCreateWithoutTipochamadoInput, chamadoUncheckedCreateWithoutTipochamadoInput> | chamadoCreateWithoutTipochamadoInput[] | chamadoUncheckedCreateWithoutTipochamadoInput[]
    connectOrCreate?: chamadoCreateOrConnectWithoutTipochamadoInput | chamadoCreateOrConnectWithoutTipochamadoInput[]
    upsert?: chamadoUpsertWithWhereUniqueWithoutTipochamadoInput | chamadoUpsertWithWhereUniqueWithoutTipochamadoInput[]
    createMany?: chamadoCreateManyTipochamadoInputEnvelope
    set?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    disconnect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    delete?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    connect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    update?: chamadoUpdateWithWhereUniqueWithoutTipochamadoInput | chamadoUpdateWithWhereUniqueWithoutTipochamadoInput[]
    updateMany?: chamadoUpdateManyWithWhereWithoutTipochamadoInput | chamadoUpdateManyWithWhereWithoutTipochamadoInput[]
    deleteMany?: chamadoScalarWhereInput | chamadoScalarWhereInput[]
  }

  export type chamadoUncheckedUpdateManyWithoutTipochamadoNestedInput = {
    create?: XOR<chamadoCreateWithoutTipochamadoInput, chamadoUncheckedCreateWithoutTipochamadoInput> | chamadoCreateWithoutTipochamadoInput[] | chamadoUncheckedCreateWithoutTipochamadoInput[]
    connectOrCreate?: chamadoCreateOrConnectWithoutTipochamadoInput | chamadoCreateOrConnectWithoutTipochamadoInput[]
    upsert?: chamadoUpsertWithWhereUniqueWithoutTipochamadoInput | chamadoUpsertWithWhereUniqueWithoutTipochamadoInput[]
    createMany?: chamadoCreateManyTipochamadoInputEnvelope
    set?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    disconnect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    delete?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    connect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    update?: chamadoUpdateWithWhereUniqueWithoutTipochamadoInput | chamadoUpdateWithWhereUniqueWithoutTipochamadoInput[]
    updateMany?: chamadoUpdateManyWithWhereWithoutTipochamadoInput | chamadoUpdateManyWithWhereWithoutTipochamadoInput[]
    deleteMany?: chamadoScalarWhereInput | chamadoScalarWhereInput[]
  }

  export type usuarioCreateNestedManyWithoutTipousuarioInput = {
    create?: XOR<usuarioCreateWithoutTipousuarioInput, usuarioUncheckedCreateWithoutTipousuarioInput> | usuarioCreateWithoutTipousuarioInput[] | usuarioUncheckedCreateWithoutTipousuarioInput[]
    connectOrCreate?: usuarioCreateOrConnectWithoutTipousuarioInput | usuarioCreateOrConnectWithoutTipousuarioInput[]
    createMany?: usuarioCreateManyTipousuarioInputEnvelope
    connect?: usuarioWhereUniqueInput | usuarioWhereUniqueInput[]
  }

  export type usuarioUncheckedCreateNestedManyWithoutTipousuarioInput = {
    create?: XOR<usuarioCreateWithoutTipousuarioInput, usuarioUncheckedCreateWithoutTipousuarioInput> | usuarioCreateWithoutTipousuarioInput[] | usuarioUncheckedCreateWithoutTipousuarioInput[]
    connectOrCreate?: usuarioCreateOrConnectWithoutTipousuarioInput | usuarioCreateOrConnectWithoutTipousuarioInput[]
    createMany?: usuarioCreateManyTipousuarioInputEnvelope
    connect?: usuarioWhereUniqueInput | usuarioWhereUniqueInput[]
  }

  export type usuarioUpdateManyWithoutTipousuarioNestedInput = {
    create?: XOR<usuarioCreateWithoutTipousuarioInput, usuarioUncheckedCreateWithoutTipousuarioInput> | usuarioCreateWithoutTipousuarioInput[] | usuarioUncheckedCreateWithoutTipousuarioInput[]
    connectOrCreate?: usuarioCreateOrConnectWithoutTipousuarioInput | usuarioCreateOrConnectWithoutTipousuarioInput[]
    upsert?: usuarioUpsertWithWhereUniqueWithoutTipousuarioInput | usuarioUpsertWithWhereUniqueWithoutTipousuarioInput[]
    createMany?: usuarioCreateManyTipousuarioInputEnvelope
    set?: usuarioWhereUniqueInput | usuarioWhereUniqueInput[]
    disconnect?: usuarioWhereUniqueInput | usuarioWhereUniqueInput[]
    delete?: usuarioWhereUniqueInput | usuarioWhereUniqueInput[]
    connect?: usuarioWhereUniqueInput | usuarioWhereUniqueInput[]
    update?: usuarioUpdateWithWhereUniqueWithoutTipousuarioInput | usuarioUpdateWithWhereUniqueWithoutTipousuarioInput[]
    updateMany?: usuarioUpdateManyWithWhereWithoutTipousuarioInput | usuarioUpdateManyWithWhereWithoutTipousuarioInput[]
    deleteMany?: usuarioScalarWhereInput | usuarioScalarWhereInput[]
  }

  export type usuarioUncheckedUpdateManyWithoutTipousuarioNestedInput = {
    create?: XOR<usuarioCreateWithoutTipousuarioInput, usuarioUncheckedCreateWithoutTipousuarioInput> | usuarioCreateWithoutTipousuarioInput[] | usuarioUncheckedCreateWithoutTipousuarioInput[]
    connectOrCreate?: usuarioCreateOrConnectWithoutTipousuarioInput | usuarioCreateOrConnectWithoutTipousuarioInput[]
    upsert?: usuarioUpsertWithWhereUniqueWithoutTipousuarioInput | usuarioUpsertWithWhereUniqueWithoutTipousuarioInput[]
    createMany?: usuarioCreateManyTipousuarioInputEnvelope
    set?: usuarioWhereUniqueInput | usuarioWhereUniqueInput[]
    disconnect?: usuarioWhereUniqueInput | usuarioWhereUniqueInput[]
    delete?: usuarioWhereUniqueInput | usuarioWhereUniqueInput[]
    connect?: usuarioWhereUniqueInput | usuarioWhereUniqueInput[]
    update?: usuarioUpdateWithWhereUniqueWithoutTipousuarioInput | usuarioUpdateWithWhereUniqueWithoutTipousuarioInput[]
    updateMany?: usuarioUpdateManyWithWhereWithoutTipousuarioInput | usuarioUpdateManyWithWhereWithoutTipousuarioInput[]
    deleteMany?: usuarioScalarWhereInput | usuarioScalarWhereInput[]
  }

  export type chamadoCreateNestedManyWithoutUsuario_chamado_idSolicitanteTousuarioInput = {
    create?: XOR<chamadoCreateWithoutUsuario_chamado_idSolicitanteTousuarioInput, chamadoUncheckedCreateWithoutUsuario_chamado_idSolicitanteTousuarioInput> | chamadoCreateWithoutUsuario_chamado_idSolicitanteTousuarioInput[] | chamadoUncheckedCreateWithoutUsuario_chamado_idSolicitanteTousuarioInput[]
    connectOrCreate?: chamadoCreateOrConnectWithoutUsuario_chamado_idSolicitanteTousuarioInput | chamadoCreateOrConnectWithoutUsuario_chamado_idSolicitanteTousuarioInput[]
    createMany?: chamadoCreateManyUsuario_chamado_idSolicitanteTousuarioInputEnvelope
    connect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
  }

  export type chamadoCreateNestedManyWithoutUsuario_chamado_idAnalistaTousuarioInput = {
    create?: XOR<chamadoCreateWithoutUsuario_chamado_idAnalistaTousuarioInput, chamadoUncheckedCreateWithoutUsuario_chamado_idAnalistaTousuarioInput> | chamadoCreateWithoutUsuario_chamado_idAnalistaTousuarioInput[] | chamadoUncheckedCreateWithoutUsuario_chamado_idAnalistaTousuarioInput[]
    connectOrCreate?: chamadoCreateOrConnectWithoutUsuario_chamado_idAnalistaTousuarioInput | chamadoCreateOrConnectWithoutUsuario_chamado_idAnalistaTousuarioInput[]
    createMany?: chamadoCreateManyUsuario_chamado_idAnalistaTousuarioInputEnvelope
    connect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
  }

  export type logatividadeCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<logatividadeCreateWithoutUsuarioInput, logatividadeUncheckedCreateWithoutUsuarioInput> | logatividadeCreateWithoutUsuarioInput[] | logatividadeUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: logatividadeCreateOrConnectWithoutUsuarioInput | logatividadeCreateOrConnectWithoutUsuarioInput[]
    createMany?: logatividadeCreateManyUsuarioInputEnvelope
    connect?: logatividadeWhereUniqueInput | logatividadeWhereUniqueInput[]
  }

  export type msgchamadoCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<msgchamadoCreateWithoutUsuarioInput, msgchamadoUncheckedCreateWithoutUsuarioInput> | msgchamadoCreateWithoutUsuarioInput[] | msgchamadoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: msgchamadoCreateOrConnectWithoutUsuarioInput | msgchamadoCreateOrConnectWithoutUsuarioInput[]
    createMany?: msgchamadoCreateManyUsuarioInputEnvelope
    connect?: msgchamadoWhereUniqueInput | msgchamadoWhereUniqueInput[]
  }

  export type notificacaoCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<notificacaoCreateWithoutUsuarioInput, notificacaoUncheckedCreateWithoutUsuarioInput> | notificacaoCreateWithoutUsuarioInput[] | notificacaoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: notificacaoCreateOrConnectWithoutUsuarioInput | notificacaoCreateOrConnectWithoutUsuarioInput[]
    createMany?: notificacaoCreateManyUsuarioInputEnvelope
    connect?: notificacaoWhereUniqueInput | notificacaoWhereUniqueInput[]
  }

  export type gerenciaCreateNestedOneWithoutUsuarioInput = {
    create?: XOR<gerenciaCreateWithoutUsuarioInput, gerenciaUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: gerenciaCreateOrConnectWithoutUsuarioInput
    connect?: gerenciaWhereUniqueInput
  }

  export type tipousuarioCreateNestedOneWithoutUsuarioInput = {
    create?: XOR<tipousuarioCreateWithoutUsuarioInput, tipousuarioUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: tipousuarioCreateOrConnectWithoutUsuarioInput
    connect?: tipousuarioWhereUniqueInput
  }

  export type chamadoUncheckedCreateNestedManyWithoutUsuario_chamado_idSolicitanteTousuarioInput = {
    create?: XOR<chamadoCreateWithoutUsuario_chamado_idSolicitanteTousuarioInput, chamadoUncheckedCreateWithoutUsuario_chamado_idSolicitanteTousuarioInput> | chamadoCreateWithoutUsuario_chamado_idSolicitanteTousuarioInput[] | chamadoUncheckedCreateWithoutUsuario_chamado_idSolicitanteTousuarioInput[]
    connectOrCreate?: chamadoCreateOrConnectWithoutUsuario_chamado_idSolicitanteTousuarioInput | chamadoCreateOrConnectWithoutUsuario_chamado_idSolicitanteTousuarioInput[]
    createMany?: chamadoCreateManyUsuario_chamado_idSolicitanteTousuarioInputEnvelope
    connect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
  }

  export type chamadoUncheckedCreateNestedManyWithoutUsuario_chamado_idAnalistaTousuarioInput = {
    create?: XOR<chamadoCreateWithoutUsuario_chamado_idAnalistaTousuarioInput, chamadoUncheckedCreateWithoutUsuario_chamado_idAnalistaTousuarioInput> | chamadoCreateWithoutUsuario_chamado_idAnalistaTousuarioInput[] | chamadoUncheckedCreateWithoutUsuario_chamado_idAnalistaTousuarioInput[]
    connectOrCreate?: chamadoCreateOrConnectWithoutUsuario_chamado_idAnalistaTousuarioInput | chamadoCreateOrConnectWithoutUsuario_chamado_idAnalistaTousuarioInput[]
    createMany?: chamadoCreateManyUsuario_chamado_idAnalistaTousuarioInputEnvelope
    connect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
  }

  export type logatividadeUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<logatividadeCreateWithoutUsuarioInput, logatividadeUncheckedCreateWithoutUsuarioInput> | logatividadeCreateWithoutUsuarioInput[] | logatividadeUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: logatividadeCreateOrConnectWithoutUsuarioInput | logatividadeCreateOrConnectWithoutUsuarioInput[]
    createMany?: logatividadeCreateManyUsuarioInputEnvelope
    connect?: logatividadeWhereUniqueInput | logatividadeWhereUniqueInput[]
  }

  export type msgchamadoUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<msgchamadoCreateWithoutUsuarioInput, msgchamadoUncheckedCreateWithoutUsuarioInput> | msgchamadoCreateWithoutUsuarioInput[] | msgchamadoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: msgchamadoCreateOrConnectWithoutUsuarioInput | msgchamadoCreateOrConnectWithoutUsuarioInput[]
    createMany?: msgchamadoCreateManyUsuarioInputEnvelope
    connect?: msgchamadoWhereUniqueInput | msgchamadoWhereUniqueInput[]
  }

  export type notificacaoUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<notificacaoCreateWithoutUsuarioInput, notificacaoUncheckedCreateWithoutUsuarioInput> | notificacaoCreateWithoutUsuarioInput[] | notificacaoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: notificacaoCreateOrConnectWithoutUsuarioInput | notificacaoCreateOrConnectWithoutUsuarioInput[]
    createMany?: notificacaoCreateManyUsuarioInputEnvelope
    connect?: notificacaoWhereUniqueInput | notificacaoWhereUniqueInput[]
  }

  export type chamadoUpdateManyWithoutUsuario_chamado_idSolicitanteTousuarioNestedInput = {
    create?: XOR<chamadoCreateWithoutUsuario_chamado_idSolicitanteTousuarioInput, chamadoUncheckedCreateWithoutUsuario_chamado_idSolicitanteTousuarioInput> | chamadoCreateWithoutUsuario_chamado_idSolicitanteTousuarioInput[] | chamadoUncheckedCreateWithoutUsuario_chamado_idSolicitanteTousuarioInput[]
    connectOrCreate?: chamadoCreateOrConnectWithoutUsuario_chamado_idSolicitanteTousuarioInput | chamadoCreateOrConnectWithoutUsuario_chamado_idSolicitanteTousuarioInput[]
    upsert?: chamadoUpsertWithWhereUniqueWithoutUsuario_chamado_idSolicitanteTousuarioInput | chamadoUpsertWithWhereUniqueWithoutUsuario_chamado_idSolicitanteTousuarioInput[]
    createMany?: chamadoCreateManyUsuario_chamado_idSolicitanteTousuarioInputEnvelope
    set?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    disconnect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    delete?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    connect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    update?: chamadoUpdateWithWhereUniqueWithoutUsuario_chamado_idSolicitanteTousuarioInput | chamadoUpdateWithWhereUniqueWithoutUsuario_chamado_idSolicitanteTousuarioInput[]
    updateMany?: chamadoUpdateManyWithWhereWithoutUsuario_chamado_idSolicitanteTousuarioInput | chamadoUpdateManyWithWhereWithoutUsuario_chamado_idSolicitanteTousuarioInput[]
    deleteMany?: chamadoScalarWhereInput | chamadoScalarWhereInput[]
  }

  export type chamadoUpdateManyWithoutUsuario_chamado_idAnalistaTousuarioNestedInput = {
    create?: XOR<chamadoCreateWithoutUsuario_chamado_idAnalistaTousuarioInput, chamadoUncheckedCreateWithoutUsuario_chamado_idAnalistaTousuarioInput> | chamadoCreateWithoutUsuario_chamado_idAnalistaTousuarioInput[] | chamadoUncheckedCreateWithoutUsuario_chamado_idAnalistaTousuarioInput[]
    connectOrCreate?: chamadoCreateOrConnectWithoutUsuario_chamado_idAnalistaTousuarioInput | chamadoCreateOrConnectWithoutUsuario_chamado_idAnalistaTousuarioInput[]
    upsert?: chamadoUpsertWithWhereUniqueWithoutUsuario_chamado_idAnalistaTousuarioInput | chamadoUpsertWithWhereUniqueWithoutUsuario_chamado_idAnalistaTousuarioInput[]
    createMany?: chamadoCreateManyUsuario_chamado_idAnalistaTousuarioInputEnvelope
    set?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    disconnect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    delete?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    connect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    update?: chamadoUpdateWithWhereUniqueWithoutUsuario_chamado_idAnalistaTousuarioInput | chamadoUpdateWithWhereUniqueWithoutUsuario_chamado_idAnalistaTousuarioInput[]
    updateMany?: chamadoUpdateManyWithWhereWithoutUsuario_chamado_idAnalistaTousuarioInput | chamadoUpdateManyWithWhereWithoutUsuario_chamado_idAnalistaTousuarioInput[]
    deleteMany?: chamadoScalarWhereInput | chamadoScalarWhereInput[]
  }

  export type logatividadeUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<logatividadeCreateWithoutUsuarioInput, logatividadeUncheckedCreateWithoutUsuarioInput> | logatividadeCreateWithoutUsuarioInput[] | logatividadeUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: logatividadeCreateOrConnectWithoutUsuarioInput | logatividadeCreateOrConnectWithoutUsuarioInput[]
    upsert?: logatividadeUpsertWithWhereUniqueWithoutUsuarioInput | logatividadeUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: logatividadeCreateManyUsuarioInputEnvelope
    set?: logatividadeWhereUniqueInput | logatividadeWhereUniqueInput[]
    disconnect?: logatividadeWhereUniqueInput | logatividadeWhereUniqueInput[]
    delete?: logatividadeWhereUniqueInput | logatividadeWhereUniqueInput[]
    connect?: logatividadeWhereUniqueInput | logatividadeWhereUniqueInput[]
    update?: logatividadeUpdateWithWhereUniqueWithoutUsuarioInput | logatividadeUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: logatividadeUpdateManyWithWhereWithoutUsuarioInput | logatividadeUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: logatividadeScalarWhereInput | logatividadeScalarWhereInput[]
  }

  export type msgchamadoUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<msgchamadoCreateWithoutUsuarioInput, msgchamadoUncheckedCreateWithoutUsuarioInput> | msgchamadoCreateWithoutUsuarioInput[] | msgchamadoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: msgchamadoCreateOrConnectWithoutUsuarioInput | msgchamadoCreateOrConnectWithoutUsuarioInput[]
    upsert?: msgchamadoUpsertWithWhereUniqueWithoutUsuarioInput | msgchamadoUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: msgchamadoCreateManyUsuarioInputEnvelope
    set?: msgchamadoWhereUniqueInput | msgchamadoWhereUniqueInput[]
    disconnect?: msgchamadoWhereUniqueInput | msgchamadoWhereUniqueInput[]
    delete?: msgchamadoWhereUniqueInput | msgchamadoWhereUniqueInput[]
    connect?: msgchamadoWhereUniqueInput | msgchamadoWhereUniqueInput[]
    update?: msgchamadoUpdateWithWhereUniqueWithoutUsuarioInput | msgchamadoUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: msgchamadoUpdateManyWithWhereWithoutUsuarioInput | msgchamadoUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: msgchamadoScalarWhereInput | msgchamadoScalarWhereInput[]
  }

  export type notificacaoUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<notificacaoCreateWithoutUsuarioInput, notificacaoUncheckedCreateWithoutUsuarioInput> | notificacaoCreateWithoutUsuarioInput[] | notificacaoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: notificacaoCreateOrConnectWithoutUsuarioInput | notificacaoCreateOrConnectWithoutUsuarioInput[]
    upsert?: notificacaoUpsertWithWhereUniqueWithoutUsuarioInput | notificacaoUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: notificacaoCreateManyUsuarioInputEnvelope
    set?: notificacaoWhereUniqueInput | notificacaoWhereUniqueInput[]
    disconnect?: notificacaoWhereUniqueInput | notificacaoWhereUniqueInput[]
    delete?: notificacaoWhereUniqueInput | notificacaoWhereUniqueInput[]
    connect?: notificacaoWhereUniqueInput | notificacaoWhereUniqueInput[]
    update?: notificacaoUpdateWithWhereUniqueWithoutUsuarioInput | notificacaoUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: notificacaoUpdateManyWithWhereWithoutUsuarioInput | notificacaoUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: notificacaoScalarWhereInput | notificacaoScalarWhereInput[]
  }

  export type gerenciaUpdateOneWithoutUsuarioNestedInput = {
    create?: XOR<gerenciaCreateWithoutUsuarioInput, gerenciaUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: gerenciaCreateOrConnectWithoutUsuarioInput
    upsert?: gerenciaUpsertWithoutUsuarioInput
    disconnect?: gerenciaWhereInput | boolean
    delete?: gerenciaWhereInput | boolean
    connect?: gerenciaWhereUniqueInput
    update?: XOR<XOR<gerenciaUpdateToOneWithWhereWithoutUsuarioInput, gerenciaUpdateWithoutUsuarioInput>, gerenciaUncheckedUpdateWithoutUsuarioInput>
  }

  export type tipousuarioUpdateOneWithoutUsuarioNestedInput = {
    create?: XOR<tipousuarioCreateWithoutUsuarioInput, tipousuarioUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: tipousuarioCreateOrConnectWithoutUsuarioInput
    upsert?: tipousuarioUpsertWithoutUsuarioInput
    disconnect?: tipousuarioWhereInput | boolean
    delete?: tipousuarioWhereInput | boolean
    connect?: tipousuarioWhereUniqueInput
    update?: XOR<XOR<tipousuarioUpdateToOneWithWhereWithoutUsuarioInput, tipousuarioUpdateWithoutUsuarioInput>, tipousuarioUncheckedUpdateWithoutUsuarioInput>
  }

  export type chamadoUncheckedUpdateManyWithoutUsuario_chamado_idSolicitanteTousuarioNestedInput = {
    create?: XOR<chamadoCreateWithoutUsuario_chamado_idSolicitanteTousuarioInput, chamadoUncheckedCreateWithoutUsuario_chamado_idSolicitanteTousuarioInput> | chamadoCreateWithoutUsuario_chamado_idSolicitanteTousuarioInput[] | chamadoUncheckedCreateWithoutUsuario_chamado_idSolicitanteTousuarioInput[]
    connectOrCreate?: chamadoCreateOrConnectWithoutUsuario_chamado_idSolicitanteTousuarioInput | chamadoCreateOrConnectWithoutUsuario_chamado_idSolicitanteTousuarioInput[]
    upsert?: chamadoUpsertWithWhereUniqueWithoutUsuario_chamado_idSolicitanteTousuarioInput | chamadoUpsertWithWhereUniqueWithoutUsuario_chamado_idSolicitanteTousuarioInput[]
    createMany?: chamadoCreateManyUsuario_chamado_idSolicitanteTousuarioInputEnvelope
    set?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    disconnect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    delete?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    connect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    update?: chamadoUpdateWithWhereUniqueWithoutUsuario_chamado_idSolicitanteTousuarioInput | chamadoUpdateWithWhereUniqueWithoutUsuario_chamado_idSolicitanteTousuarioInput[]
    updateMany?: chamadoUpdateManyWithWhereWithoutUsuario_chamado_idSolicitanteTousuarioInput | chamadoUpdateManyWithWhereWithoutUsuario_chamado_idSolicitanteTousuarioInput[]
    deleteMany?: chamadoScalarWhereInput | chamadoScalarWhereInput[]
  }

  export type chamadoUncheckedUpdateManyWithoutUsuario_chamado_idAnalistaTousuarioNestedInput = {
    create?: XOR<chamadoCreateWithoutUsuario_chamado_idAnalistaTousuarioInput, chamadoUncheckedCreateWithoutUsuario_chamado_idAnalistaTousuarioInput> | chamadoCreateWithoutUsuario_chamado_idAnalistaTousuarioInput[] | chamadoUncheckedCreateWithoutUsuario_chamado_idAnalistaTousuarioInput[]
    connectOrCreate?: chamadoCreateOrConnectWithoutUsuario_chamado_idAnalistaTousuarioInput | chamadoCreateOrConnectWithoutUsuario_chamado_idAnalistaTousuarioInput[]
    upsert?: chamadoUpsertWithWhereUniqueWithoutUsuario_chamado_idAnalistaTousuarioInput | chamadoUpsertWithWhereUniqueWithoutUsuario_chamado_idAnalistaTousuarioInput[]
    createMany?: chamadoCreateManyUsuario_chamado_idAnalistaTousuarioInputEnvelope
    set?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    disconnect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    delete?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    connect?: chamadoWhereUniqueInput | chamadoWhereUniqueInput[]
    update?: chamadoUpdateWithWhereUniqueWithoutUsuario_chamado_idAnalistaTousuarioInput | chamadoUpdateWithWhereUniqueWithoutUsuario_chamado_idAnalistaTousuarioInput[]
    updateMany?: chamadoUpdateManyWithWhereWithoutUsuario_chamado_idAnalistaTousuarioInput | chamadoUpdateManyWithWhereWithoutUsuario_chamado_idAnalistaTousuarioInput[]
    deleteMany?: chamadoScalarWhereInput | chamadoScalarWhereInput[]
  }

  export type logatividadeUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<logatividadeCreateWithoutUsuarioInput, logatividadeUncheckedCreateWithoutUsuarioInput> | logatividadeCreateWithoutUsuarioInput[] | logatividadeUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: logatividadeCreateOrConnectWithoutUsuarioInput | logatividadeCreateOrConnectWithoutUsuarioInput[]
    upsert?: logatividadeUpsertWithWhereUniqueWithoutUsuarioInput | logatividadeUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: logatividadeCreateManyUsuarioInputEnvelope
    set?: logatividadeWhereUniqueInput | logatividadeWhereUniqueInput[]
    disconnect?: logatividadeWhereUniqueInput | logatividadeWhereUniqueInput[]
    delete?: logatividadeWhereUniqueInput | logatividadeWhereUniqueInput[]
    connect?: logatividadeWhereUniqueInput | logatividadeWhereUniqueInput[]
    update?: logatividadeUpdateWithWhereUniqueWithoutUsuarioInput | logatividadeUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: logatividadeUpdateManyWithWhereWithoutUsuarioInput | logatividadeUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: logatividadeScalarWhereInput | logatividadeScalarWhereInput[]
  }

  export type msgchamadoUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<msgchamadoCreateWithoutUsuarioInput, msgchamadoUncheckedCreateWithoutUsuarioInput> | msgchamadoCreateWithoutUsuarioInput[] | msgchamadoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: msgchamadoCreateOrConnectWithoutUsuarioInput | msgchamadoCreateOrConnectWithoutUsuarioInput[]
    upsert?: msgchamadoUpsertWithWhereUniqueWithoutUsuarioInput | msgchamadoUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: msgchamadoCreateManyUsuarioInputEnvelope
    set?: msgchamadoWhereUniqueInput | msgchamadoWhereUniqueInput[]
    disconnect?: msgchamadoWhereUniqueInput | msgchamadoWhereUniqueInput[]
    delete?: msgchamadoWhereUniqueInput | msgchamadoWhereUniqueInput[]
    connect?: msgchamadoWhereUniqueInput | msgchamadoWhereUniqueInput[]
    update?: msgchamadoUpdateWithWhereUniqueWithoutUsuarioInput | msgchamadoUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: msgchamadoUpdateManyWithWhereWithoutUsuarioInput | msgchamadoUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: msgchamadoScalarWhereInput | msgchamadoScalarWhereInput[]
  }

  export type notificacaoUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<notificacaoCreateWithoutUsuarioInput, notificacaoUncheckedCreateWithoutUsuarioInput> | notificacaoCreateWithoutUsuarioInput[] | notificacaoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: notificacaoCreateOrConnectWithoutUsuarioInput | notificacaoCreateOrConnectWithoutUsuarioInput[]
    upsert?: notificacaoUpsertWithWhereUniqueWithoutUsuarioInput | notificacaoUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: notificacaoCreateManyUsuarioInputEnvelope
    set?: notificacaoWhereUniqueInput | notificacaoWhereUniqueInput[]
    disconnect?: notificacaoWhereUniqueInput | notificacaoWhereUniqueInput[]
    delete?: notificacaoWhereUniqueInput | notificacaoWhereUniqueInput[]
    connect?: notificacaoWhereUniqueInput | notificacaoWhereUniqueInput[]
    update?: notificacaoUpdateWithWhereUniqueWithoutUsuarioInput | notificacaoUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: notificacaoUpdateManyWithWhereWithoutUsuarioInput | notificacaoUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: notificacaoScalarWhereInput | notificacaoScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnummsgchamado_remetenteFilter<$PrismaModel = never> = {
    equals?: $Enums.msgchamado_remetente | Enummsgchamado_remetenteFieldRefInput<$PrismaModel>
    in?: $Enums.msgchamado_remetente[]
    notIn?: $Enums.msgchamado_remetente[]
    not?: NestedEnummsgchamado_remetenteFilter<$PrismaModel> | $Enums.msgchamado_remetente
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnummsgchamado_remetenteWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.msgchamado_remetente | Enummsgchamado_remetenteFieldRefInput<$PrismaModel>
    in?: $Enums.msgchamado_remetente[]
    notIn?: $Enums.msgchamado_remetente[]
    not?: NestedEnummsgchamado_remetenteWithAggregatesFilter<$PrismaModel> | $Enums.msgchamado_remetente
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnummsgchamado_remetenteFilter<$PrismaModel>
    _max?: NestedEnummsgchamado_remetenteFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type usuarioCreateWithoutChamado_chamado_idSolicitanteTousuarioInput = {
    matricula: string
    nomeUsuario: string
    email: string
    senha: string
    dataCadastro?: Date | string
    ativo?: number
    ramal?: string | null
    fotoPerfil?: string | null
    chamado_chamado_idAnalistaTousuario?: chamadoCreateNestedManyWithoutUsuario_chamado_idAnalistaTousuarioInput
    logatividade?: logatividadeCreateNestedManyWithoutUsuarioInput
    msgchamado?: msgchamadoCreateNestedManyWithoutUsuarioInput
    notificacao?: notificacaoCreateNestedManyWithoutUsuarioInput
    gerencia?: gerenciaCreateNestedOneWithoutUsuarioInput
    tipousuario?: tipousuarioCreateNestedOneWithoutUsuarioInput
  }

  export type usuarioUncheckedCreateWithoutChamado_chamado_idSolicitanteTousuarioInput = {
    idUsuario?: number
    matricula: string
    nomeUsuario: string
    email: string
    senha: string
    dataCadastro?: Date | string
    ativo?: number
    ramal?: string | null
    fotoPerfil?: string | null
    idGerencia?: number | null
    idTipoUsuario?: number | null
    chamado_chamado_idAnalistaTousuario?: chamadoUncheckedCreateNestedManyWithoutUsuario_chamado_idAnalistaTousuarioInput
    logatividade?: logatividadeUncheckedCreateNestedManyWithoutUsuarioInput
    msgchamado?: msgchamadoUncheckedCreateNestedManyWithoutUsuarioInput
    notificacao?: notificacaoUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type usuarioCreateOrConnectWithoutChamado_chamado_idSolicitanteTousuarioInput = {
    where: usuarioWhereUniqueInput
    create: XOR<usuarioCreateWithoutChamado_chamado_idSolicitanteTousuarioInput, usuarioUncheckedCreateWithoutChamado_chamado_idSolicitanteTousuarioInput>
  }

  export type usuarioCreateWithoutChamado_chamado_idAnalistaTousuarioInput = {
    matricula: string
    nomeUsuario: string
    email: string
    senha: string
    dataCadastro?: Date | string
    ativo?: number
    ramal?: string | null
    fotoPerfil?: string | null
    chamado_chamado_idSolicitanteTousuario?: chamadoCreateNestedManyWithoutUsuario_chamado_idSolicitanteTousuarioInput
    logatividade?: logatividadeCreateNestedManyWithoutUsuarioInput
    msgchamado?: msgchamadoCreateNestedManyWithoutUsuarioInput
    notificacao?: notificacaoCreateNestedManyWithoutUsuarioInput
    gerencia?: gerenciaCreateNestedOneWithoutUsuarioInput
    tipousuario?: tipousuarioCreateNestedOneWithoutUsuarioInput
  }

  export type usuarioUncheckedCreateWithoutChamado_chamado_idAnalistaTousuarioInput = {
    idUsuario?: number
    matricula: string
    nomeUsuario: string
    email: string
    senha: string
    dataCadastro?: Date | string
    ativo?: number
    ramal?: string | null
    fotoPerfil?: string | null
    idGerencia?: number | null
    idTipoUsuario?: number | null
    chamado_chamado_idSolicitanteTousuario?: chamadoUncheckedCreateNestedManyWithoutUsuario_chamado_idSolicitanteTousuarioInput
    logatividade?: logatividadeUncheckedCreateNestedManyWithoutUsuarioInput
    msgchamado?: msgchamadoUncheckedCreateNestedManyWithoutUsuarioInput
    notificacao?: notificacaoUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type usuarioCreateOrConnectWithoutChamado_chamado_idAnalistaTousuarioInput = {
    where: usuarioWhereUniqueInput
    create: XOR<usuarioCreateWithoutChamado_chamado_idAnalistaTousuarioInput, usuarioUncheckedCreateWithoutChamado_chamado_idAnalistaTousuarioInput>
  }

  export type tipochamadoCreateWithoutChamadoInput = {
    nomeTipo: string
    ativo?: number
  }

  export type tipochamadoUncheckedCreateWithoutChamadoInput = {
    idTipoChamado?: number
    nomeTipo: string
    ativo?: number
  }

  export type tipochamadoCreateOrConnectWithoutChamadoInput = {
    where: tipochamadoWhereUniqueInput
    create: XOR<tipochamadoCreateWithoutChamadoInput, tipochamadoUncheckedCreateWithoutChamadoInput>
  }

  export type statuschamadoCreateWithoutChamadoInput = {
    nomeStatus: string
    ativo?: number
    hexCorPrimaria: string
    hexCorSecundaria: string
  }

  export type statuschamadoUncheckedCreateWithoutChamadoInput = {
    idStatus?: number
    nomeStatus: string
    ativo?: number
    hexCorPrimaria: string
    hexCorSecundaria: string
  }

  export type statuschamadoCreateOrConnectWithoutChamadoInput = {
    where: statuschamadoWhereUniqueInput
    create: XOR<statuschamadoCreateWithoutChamadoInput, statuschamadoUncheckedCreateWithoutChamadoInput>
  }

  export type prioridadechamadoCreateWithoutChamadoInput = {
    nomePrioridade: string
    ativo?: number
    hexCorPrimaria: string
    hexCorSecundaria: string
  }

  export type prioridadechamadoUncheckedCreateWithoutChamadoInput = {
    idPrioridade?: number
    nomePrioridade: string
    ativo?: number
    hexCorPrimaria: string
    hexCorSecundaria: string
  }

  export type prioridadechamadoCreateOrConnectWithoutChamadoInput = {
    where: prioridadechamadoWhereUniqueInput
    create: XOR<prioridadechamadoCreateWithoutChamadoInput, prioridadechamadoUncheckedCreateWithoutChamadoInput>
  }

  export type msgchamadoCreateWithoutChamadoInput = {
    mensagem: string
    timestamp?: Date | string | null
    remetente: $Enums.msgchamado_remetente
    urlAnexo?: string | null
    nomeArquivo?: string | null
    usuario: usuarioCreateNestedOneWithoutMsgchamadoInput
  }

  export type msgchamadoUncheckedCreateWithoutChamadoInput = {
    idMensagem?: number
    mensagem: string
    timestamp?: Date | string | null
    remetente: $Enums.msgchamado_remetente
    urlAnexo?: string | null
    nomeArquivo?: string | null
    idRemetente: number
  }

  export type msgchamadoCreateOrConnectWithoutChamadoInput = {
    where: msgchamadoWhereUniqueInput
    create: XOR<msgchamadoCreateWithoutChamadoInput, msgchamadoUncheckedCreateWithoutChamadoInput>
  }

  export type msgchamadoCreateManyChamadoInputEnvelope = {
    data: msgchamadoCreateManyChamadoInput | msgchamadoCreateManyChamadoInput[]
    skipDuplicates?: boolean
  }

  export type notificacaoCreateWithoutChamadoInput = {
    titulo: string
    mensagem: string
    lida?: number
    dataHora?: Date | string | null
    usuario: usuarioCreateNestedOneWithoutNotificacaoInput
  }

  export type notificacaoUncheckedCreateWithoutChamadoInput = {
    idNotificacao?: number
    titulo: string
    mensagem: string
    lida?: number
    dataHora?: Date | string | null
    idUsuario: number
  }

  export type notificacaoCreateOrConnectWithoutChamadoInput = {
    where: notificacaoWhereUniqueInput
    create: XOR<notificacaoCreateWithoutChamadoInput, notificacaoUncheckedCreateWithoutChamadoInput>
  }

  export type notificacaoCreateManyChamadoInputEnvelope = {
    data: notificacaoCreateManyChamadoInput | notificacaoCreateManyChamadoInput[]
    skipDuplicates?: boolean
  }

  export type usuarioUpsertWithoutChamado_chamado_idSolicitanteTousuarioInput = {
    update: XOR<usuarioUpdateWithoutChamado_chamado_idSolicitanteTousuarioInput, usuarioUncheckedUpdateWithoutChamado_chamado_idSolicitanteTousuarioInput>
    create: XOR<usuarioCreateWithoutChamado_chamado_idSolicitanteTousuarioInput, usuarioUncheckedCreateWithoutChamado_chamado_idSolicitanteTousuarioInput>
    where?: usuarioWhereInput
  }

  export type usuarioUpdateToOneWithWhereWithoutChamado_chamado_idSolicitanteTousuarioInput = {
    where?: usuarioWhereInput
    data: XOR<usuarioUpdateWithoutChamado_chamado_idSolicitanteTousuarioInput, usuarioUncheckedUpdateWithoutChamado_chamado_idSolicitanteTousuarioInput>
  }

  export type usuarioUpdateWithoutChamado_chamado_idSolicitanteTousuarioInput = {
    matricula?: StringFieldUpdateOperationsInput | string
    nomeUsuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: IntFieldUpdateOperationsInput | number
    ramal?: NullableStringFieldUpdateOperationsInput | string | null
    fotoPerfil?: NullableStringFieldUpdateOperationsInput | string | null
    chamado_chamado_idAnalistaTousuario?: chamadoUpdateManyWithoutUsuario_chamado_idAnalistaTousuarioNestedInput
    logatividade?: logatividadeUpdateManyWithoutUsuarioNestedInput
    msgchamado?: msgchamadoUpdateManyWithoutUsuarioNestedInput
    notificacao?: notificacaoUpdateManyWithoutUsuarioNestedInput
    gerencia?: gerenciaUpdateOneWithoutUsuarioNestedInput
    tipousuario?: tipousuarioUpdateOneWithoutUsuarioNestedInput
  }

  export type usuarioUncheckedUpdateWithoutChamado_chamado_idSolicitanteTousuarioInput = {
    idUsuario?: IntFieldUpdateOperationsInput | number
    matricula?: StringFieldUpdateOperationsInput | string
    nomeUsuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: IntFieldUpdateOperationsInput | number
    ramal?: NullableStringFieldUpdateOperationsInput | string | null
    fotoPerfil?: NullableStringFieldUpdateOperationsInput | string | null
    idGerencia?: NullableIntFieldUpdateOperationsInput | number | null
    idTipoUsuario?: NullableIntFieldUpdateOperationsInput | number | null
    chamado_chamado_idAnalistaTousuario?: chamadoUncheckedUpdateManyWithoutUsuario_chamado_idAnalistaTousuarioNestedInput
    logatividade?: logatividadeUncheckedUpdateManyWithoutUsuarioNestedInput
    msgchamado?: msgchamadoUncheckedUpdateManyWithoutUsuarioNestedInput
    notificacao?: notificacaoUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type usuarioUpsertWithoutChamado_chamado_idAnalistaTousuarioInput = {
    update: XOR<usuarioUpdateWithoutChamado_chamado_idAnalistaTousuarioInput, usuarioUncheckedUpdateWithoutChamado_chamado_idAnalistaTousuarioInput>
    create: XOR<usuarioCreateWithoutChamado_chamado_idAnalistaTousuarioInput, usuarioUncheckedCreateWithoutChamado_chamado_idAnalistaTousuarioInput>
    where?: usuarioWhereInput
  }

  export type usuarioUpdateToOneWithWhereWithoutChamado_chamado_idAnalistaTousuarioInput = {
    where?: usuarioWhereInput
    data: XOR<usuarioUpdateWithoutChamado_chamado_idAnalistaTousuarioInput, usuarioUncheckedUpdateWithoutChamado_chamado_idAnalistaTousuarioInput>
  }

  export type usuarioUpdateWithoutChamado_chamado_idAnalistaTousuarioInput = {
    matricula?: StringFieldUpdateOperationsInput | string
    nomeUsuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: IntFieldUpdateOperationsInput | number
    ramal?: NullableStringFieldUpdateOperationsInput | string | null
    fotoPerfil?: NullableStringFieldUpdateOperationsInput | string | null
    chamado_chamado_idSolicitanteTousuario?: chamadoUpdateManyWithoutUsuario_chamado_idSolicitanteTousuarioNestedInput
    logatividade?: logatividadeUpdateManyWithoutUsuarioNestedInput
    msgchamado?: msgchamadoUpdateManyWithoutUsuarioNestedInput
    notificacao?: notificacaoUpdateManyWithoutUsuarioNestedInput
    gerencia?: gerenciaUpdateOneWithoutUsuarioNestedInput
    tipousuario?: tipousuarioUpdateOneWithoutUsuarioNestedInput
  }

  export type usuarioUncheckedUpdateWithoutChamado_chamado_idAnalistaTousuarioInput = {
    idUsuario?: IntFieldUpdateOperationsInput | number
    matricula?: StringFieldUpdateOperationsInput | string
    nomeUsuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: IntFieldUpdateOperationsInput | number
    ramal?: NullableStringFieldUpdateOperationsInput | string | null
    fotoPerfil?: NullableStringFieldUpdateOperationsInput | string | null
    idGerencia?: NullableIntFieldUpdateOperationsInput | number | null
    idTipoUsuario?: NullableIntFieldUpdateOperationsInput | number | null
    chamado_chamado_idSolicitanteTousuario?: chamadoUncheckedUpdateManyWithoutUsuario_chamado_idSolicitanteTousuarioNestedInput
    logatividade?: logatividadeUncheckedUpdateManyWithoutUsuarioNestedInput
    msgchamado?: msgchamadoUncheckedUpdateManyWithoutUsuarioNestedInput
    notificacao?: notificacaoUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type tipochamadoUpsertWithoutChamadoInput = {
    update: XOR<tipochamadoUpdateWithoutChamadoInput, tipochamadoUncheckedUpdateWithoutChamadoInput>
    create: XOR<tipochamadoCreateWithoutChamadoInput, tipochamadoUncheckedCreateWithoutChamadoInput>
    where?: tipochamadoWhereInput
  }

  export type tipochamadoUpdateToOneWithWhereWithoutChamadoInput = {
    where?: tipochamadoWhereInput
    data: XOR<tipochamadoUpdateWithoutChamadoInput, tipochamadoUncheckedUpdateWithoutChamadoInput>
  }

  export type tipochamadoUpdateWithoutChamadoInput = {
    nomeTipo?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
  }

  export type tipochamadoUncheckedUpdateWithoutChamadoInput = {
    idTipoChamado?: IntFieldUpdateOperationsInput | number
    nomeTipo?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
  }

  export type statuschamadoUpsertWithoutChamadoInput = {
    update: XOR<statuschamadoUpdateWithoutChamadoInput, statuschamadoUncheckedUpdateWithoutChamadoInput>
    create: XOR<statuschamadoCreateWithoutChamadoInput, statuschamadoUncheckedCreateWithoutChamadoInput>
    where?: statuschamadoWhereInput
  }

  export type statuschamadoUpdateToOneWithWhereWithoutChamadoInput = {
    where?: statuschamadoWhereInput
    data: XOR<statuschamadoUpdateWithoutChamadoInput, statuschamadoUncheckedUpdateWithoutChamadoInput>
  }

  export type statuschamadoUpdateWithoutChamadoInput = {
    nomeStatus?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
    hexCorPrimaria?: StringFieldUpdateOperationsInput | string
    hexCorSecundaria?: StringFieldUpdateOperationsInput | string
  }

  export type statuschamadoUncheckedUpdateWithoutChamadoInput = {
    idStatus?: IntFieldUpdateOperationsInput | number
    nomeStatus?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
    hexCorPrimaria?: StringFieldUpdateOperationsInput | string
    hexCorSecundaria?: StringFieldUpdateOperationsInput | string
  }

  export type prioridadechamadoUpsertWithoutChamadoInput = {
    update: XOR<prioridadechamadoUpdateWithoutChamadoInput, prioridadechamadoUncheckedUpdateWithoutChamadoInput>
    create: XOR<prioridadechamadoCreateWithoutChamadoInput, prioridadechamadoUncheckedCreateWithoutChamadoInput>
    where?: prioridadechamadoWhereInput
  }

  export type prioridadechamadoUpdateToOneWithWhereWithoutChamadoInput = {
    where?: prioridadechamadoWhereInput
    data: XOR<prioridadechamadoUpdateWithoutChamadoInput, prioridadechamadoUncheckedUpdateWithoutChamadoInput>
  }

  export type prioridadechamadoUpdateWithoutChamadoInput = {
    nomePrioridade?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
    hexCorPrimaria?: StringFieldUpdateOperationsInput | string
    hexCorSecundaria?: StringFieldUpdateOperationsInput | string
  }

  export type prioridadechamadoUncheckedUpdateWithoutChamadoInput = {
    idPrioridade?: IntFieldUpdateOperationsInput | number
    nomePrioridade?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
    hexCorPrimaria?: StringFieldUpdateOperationsInput | string
    hexCorSecundaria?: StringFieldUpdateOperationsInput | string
  }

  export type msgchamadoUpsertWithWhereUniqueWithoutChamadoInput = {
    where: msgchamadoWhereUniqueInput
    update: XOR<msgchamadoUpdateWithoutChamadoInput, msgchamadoUncheckedUpdateWithoutChamadoInput>
    create: XOR<msgchamadoCreateWithoutChamadoInput, msgchamadoUncheckedCreateWithoutChamadoInput>
  }

  export type msgchamadoUpdateWithWhereUniqueWithoutChamadoInput = {
    where: msgchamadoWhereUniqueInput
    data: XOR<msgchamadoUpdateWithoutChamadoInput, msgchamadoUncheckedUpdateWithoutChamadoInput>
  }

  export type msgchamadoUpdateManyWithWhereWithoutChamadoInput = {
    where: msgchamadoScalarWhereInput
    data: XOR<msgchamadoUpdateManyMutationInput, msgchamadoUncheckedUpdateManyWithoutChamadoInput>
  }

  export type msgchamadoScalarWhereInput = {
    AND?: msgchamadoScalarWhereInput | msgchamadoScalarWhereInput[]
    OR?: msgchamadoScalarWhereInput[]
    NOT?: msgchamadoScalarWhereInput | msgchamadoScalarWhereInput[]
    idMensagem?: IntFilter<"msgchamado"> | number
    mensagem?: StringFilter<"msgchamado"> | string
    timestamp?: DateTimeNullableFilter<"msgchamado"> | Date | string | null
    remetente?: Enummsgchamado_remetenteFilter<"msgchamado"> | $Enums.msgchamado_remetente
    urlAnexo?: StringNullableFilter<"msgchamado"> | string | null
    nomeArquivo?: StringNullableFilter<"msgchamado"> | string | null
    idChamado?: IntFilter<"msgchamado"> | number
    idRemetente?: IntFilter<"msgchamado"> | number
  }

  export type notificacaoUpsertWithWhereUniqueWithoutChamadoInput = {
    where: notificacaoWhereUniqueInput
    update: XOR<notificacaoUpdateWithoutChamadoInput, notificacaoUncheckedUpdateWithoutChamadoInput>
    create: XOR<notificacaoCreateWithoutChamadoInput, notificacaoUncheckedCreateWithoutChamadoInput>
  }

  export type notificacaoUpdateWithWhereUniqueWithoutChamadoInput = {
    where: notificacaoWhereUniqueInput
    data: XOR<notificacaoUpdateWithoutChamadoInput, notificacaoUncheckedUpdateWithoutChamadoInput>
  }

  export type notificacaoUpdateManyWithWhereWithoutChamadoInput = {
    where: notificacaoScalarWhereInput
    data: XOR<notificacaoUpdateManyMutationInput, notificacaoUncheckedUpdateManyWithoutChamadoInput>
  }

  export type notificacaoScalarWhereInput = {
    AND?: notificacaoScalarWhereInput | notificacaoScalarWhereInput[]
    OR?: notificacaoScalarWhereInput[]
    NOT?: notificacaoScalarWhereInput | notificacaoScalarWhereInput[]
    idNotificacao?: IntFilter<"notificacao"> | number
    titulo?: StringFilter<"notificacao"> | string
    mensagem?: StringFilter<"notificacao"> | string
    lida?: IntFilter<"notificacao"> | number
    dataHora?: DateTimeNullableFilter<"notificacao"> | Date | string | null
    idUsuario?: IntFilter<"notificacao"> | number
    idChamado?: IntNullableFilter<"notificacao"> | number | null
  }

  export type usuarioCreateWithoutGerenciaInput = {
    matricula: string
    nomeUsuario: string
    email: string
    senha: string
    dataCadastro?: Date | string
    ativo?: number
    ramal?: string | null
    fotoPerfil?: string | null
    chamado_chamado_idSolicitanteTousuario?: chamadoCreateNestedManyWithoutUsuario_chamado_idSolicitanteTousuarioInput
    chamado_chamado_idAnalistaTousuario?: chamadoCreateNestedManyWithoutUsuario_chamado_idAnalistaTousuarioInput
    logatividade?: logatividadeCreateNestedManyWithoutUsuarioInput
    msgchamado?: msgchamadoCreateNestedManyWithoutUsuarioInput
    notificacao?: notificacaoCreateNestedManyWithoutUsuarioInput
    tipousuario?: tipousuarioCreateNestedOneWithoutUsuarioInput
  }

  export type usuarioUncheckedCreateWithoutGerenciaInput = {
    idUsuario?: number
    matricula: string
    nomeUsuario: string
    email: string
    senha: string
    dataCadastro?: Date | string
    ativo?: number
    ramal?: string | null
    fotoPerfil?: string | null
    idTipoUsuario?: number | null
    chamado_chamado_idSolicitanteTousuario?: chamadoUncheckedCreateNestedManyWithoutUsuario_chamado_idSolicitanteTousuarioInput
    chamado_chamado_idAnalistaTousuario?: chamadoUncheckedCreateNestedManyWithoutUsuario_chamado_idAnalistaTousuarioInput
    logatividade?: logatividadeUncheckedCreateNestedManyWithoutUsuarioInput
    msgchamado?: msgchamadoUncheckedCreateNestedManyWithoutUsuarioInput
    notificacao?: notificacaoUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type usuarioCreateOrConnectWithoutGerenciaInput = {
    where: usuarioWhereUniqueInput
    create: XOR<usuarioCreateWithoutGerenciaInput, usuarioUncheckedCreateWithoutGerenciaInput>
  }

  export type usuarioCreateManyGerenciaInputEnvelope = {
    data: usuarioCreateManyGerenciaInput | usuarioCreateManyGerenciaInput[]
    skipDuplicates?: boolean
  }

  export type usuarioUpsertWithWhereUniqueWithoutGerenciaInput = {
    where: usuarioWhereUniqueInput
    update: XOR<usuarioUpdateWithoutGerenciaInput, usuarioUncheckedUpdateWithoutGerenciaInput>
    create: XOR<usuarioCreateWithoutGerenciaInput, usuarioUncheckedCreateWithoutGerenciaInput>
  }

  export type usuarioUpdateWithWhereUniqueWithoutGerenciaInput = {
    where: usuarioWhereUniqueInput
    data: XOR<usuarioUpdateWithoutGerenciaInput, usuarioUncheckedUpdateWithoutGerenciaInput>
  }

  export type usuarioUpdateManyWithWhereWithoutGerenciaInput = {
    where: usuarioScalarWhereInput
    data: XOR<usuarioUpdateManyMutationInput, usuarioUncheckedUpdateManyWithoutGerenciaInput>
  }

  export type usuarioScalarWhereInput = {
    AND?: usuarioScalarWhereInput | usuarioScalarWhereInput[]
    OR?: usuarioScalarWhereInput[]
    NOT?: usuarioScalarWhereInput | usuarioScalarWhereInput[]
    idUsuario?: IntFilter<"usuario"> | number
    matricula?: StringFilter<"usuario"> | string
    nomeUsuario?: StringFilter<"usuario"> | string
    email?: StringFilter<"usuario"> | string
    senha?: StringFilter<"usuario"> | string
    dataCadastro?: DateTimeFilter<"usuario"> | Date | string
    ativo?: IntFilter<"usuario"> | number
    ramal?: StringNullableFilter<"usuario"> | string | null
    fotoPerfil?: StringNullableFilter<"usuario"> | string | null
    idGerencia?: IntNullableFilter<"usuario"> | number | null
    idTipoUsuario?: IntNullableFilter<"usuario"> | number | null
  }

  export type usuarioCreateWithoutLogatividadeInput = {
    matricula: string
    nomeUsuario: string
    email: string
    senha: string
    dataCadastro?: Date | string
    ativo?: number
    ramal?: string | null
    fotoPerfil?: string | null
    chamado_chamado_idSolicitanteTousuario?: chamadoCreateNestedManyWithoutUsuario_chamado_idSolicitanteTousuarioInput
    chamado_chamado_idAnalistaTousuario?: chamadoCreateNestedManyWithoutUsuario_chamado_idAnalistaTousuarioInput
    msgchamado?: msgchamadoCreateNestedManyWithoutUsuarioInput
    notificacao?: notificacaoCreateNestedManyWithoutUsuarioInput
    gerencia?: gerenciaCreateNestedOneWithoutUsuarioInput
    tipousuario?: tipousuarioCreateNestedOneWithoutUsuarioInput
  }

  export type usuarioUncheckedCreateWithoutLogatividadeInput = {
    idUsuario?: number
    matricula: string
    nomeUsuario: string
    email: string
    senha: string
    dataCadastro?: Date | string
    ativo?: number
    ramal?: string | null
    fotoPerfil?: string | null
    idGerencia?: number | null
    idTipoUsuario?: number | null
    chamado_chamado_idSolicitanteTousuario?: chamadoUncheckedCreateNestedManyWithoutUsuario_chamado_idSolicitanteTousuarioInput
    chamado_chamado_idAnalistaTousuario?: chamadoUncheckedCreateNestedManyWithoutUsuario_chamado_idAnalistaTousuarioInput
    msgchamado?: msgchamadoUncheckedCreateNestedManyWithoutUsuarioInput
    notificacao?: notificacaoUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type usuarioCreateOrConnectWithoutLogatividadeInput = {
    where: usuarioWhereUniqueInput
    create: XOR<usuarioCreateWithoutLogatividadeInput, usuarioUncheckedCreateWithoutLogatividadeInput>
  }

  export type usuarioUpsertWithoutLogatividadeInput = {
    update: XOR<usuarioUpdateWithoutLogatividadeInput, usuarioUncheckedUpdateWithoutLogatividadeInput>
    create: XOR<usuarioCreateWithoutLogatividadeInput, usuarioUncheckedCreateWithoutLogatividadeInput>
    where?: usuarioWhereInput
  }

  export type usuarioUpdateToOneWithWhereWithoutLogatividadeInput = {
    where?: usuarioWhereInput
    data: XOR<usuarioUpdateWithoutLogatividadeInput, usuarioUncheckedUpdateWithoutLogatividadeInput>
  }

  export type usuarioUpdateWithoutLogatividadeInput = {
    matricula?: StringFieldUpdateOperationsInput | string
    nomeUsuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: IntFieldUpdateOperationsInput | number
    ramal?: NullableStringFieldUpdateOperationsInput | string | null
    fotoPerfil?: NullableStringFieldUpdateOperationsInput | string | null
    chamado_chamado_idSolicitanteTousuario?: chamadoUpdateManyWithoutUsuario_chamado_idSolicitanteTousuarioNestedInput
    chamado_chamado_idAnalistaTousuario?: chamadoUpdateManyWithoutUsuario_chamado_idAnalistaTousuarioNestedInput
    msgchamado?: msgchamadoUpdateManyWithoutUsuarioNestedInput
    notificacao?: notificacaoUpdateManyWithoutUsuarioNestedInput
    gerencia?: gerenciaUpdateOneWithoutUsuarioNestedInput
    tipousuario?: tipousuarioUpdateOneWithoutUsuarioNestedInput
  }

  export type usuarioUncheckedUpdateWithoutLogatividadeInput = {
    idUsuario?: IntFieldUpdateOperationsInput | number
    matricula?: StringFieldUpdateOperationsInput | string
    nomeUsuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: IntFieldUpdateOperationsInput | number
    ramal?: NullableStringFieldUpdateOperationsInput | string | null
    fotoPerfil?: NullableStringFieldUpdateOperationsInput | string | null
    idGerencia?: NullableIntFieldUpdateOperationsInput | number | null
    idTipoUsuario?: NullableIntFieldUpdateOperationsInput | number | null
    chamado_chamado_idSolicitanteTousuario?: chamadoUncheckedUpdateManyWithoutUsuario_chamado_idSolicitanteTousuarioNestedInput
    chamado_chamado_idAnalistaTousuario?: chamadoUncheckedUpdateManyWithoutUsuario_chamado_idAnalistaTousuarioNestedInput
    msgchamado?: msgchamadoUncheckedUpdateManyWithoutUsuarioNestedInput
    notificacao?: notificacaoUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type chamadoCreateWithoutMsgchamadoInput = {
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura?: Date | string
    dataAtualizacao?: Date | string | null
    dataFechamento?: Date | string | null
    usuario_chamado_idSolicitanteTousuario?: usuarioCreateNestedOneWithoutChamado_chamado_idSolicitanteTousuarioInput
    usuario_chamado_idAnalistaTousuario?: usuarioCreateNestedOneWithoutChamado_chamado_idAnalistaTousuarioInput
    tipochamado?: tipochamadoCreateNestedOneWithoutChamadoInput
    statuschamado?: statuschamadoCreateNestedOneWithoutChamadoInput
    prioridadechamado?: prioridadechamadoCreateNestedOneWithoutChamadoInput
    notificacao?: notificacaoCreateNestedManyWithoutChamadoInput
  }

  export type chamadoUncheckedCreateWithoutMsgchamadoInput = {
    idChamado?: number
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura?: Date | string
    dataAtualizacao?: Date | string | null
    dataFechamento?: Date | string | null
    idSolicitante?: number | null
    idAnalista?: number | null
    idTipoChamado?: number | null
    idStatus?: number | null
    idPrioridade?: number | null
    notificacao?: notificacaoUncheckedCreateNestedManyWithoutChamadoInput
  }

  export type chamadoCreateOrConnectWithoutMsgchamadoInput = {
    where: chamadoWhereUniqueInput
    create: XOR<chamadoCreateWithoutMsgchamadoInput, chamadoUncheckedCreateWithoutMsgchamadoInput>
  }

  export type usuarioCreateWithoutMsgchamadoInput = {
    matricula: string
    nomeUsuario: string
    email: string
    senha: string
    dataCadastro?: Date | string
    ativo?: number
    ramal?: string | null
    fotoPerfil?: string | null
    chamado_chamado_idSolicitanteTousuario?: chamadoCreateNestedManyWithoutUsuario_chamado_idSolicitanteTousuarioInput
    chamado_chamado_idAnalistaTousuario?: chamadoCreateNestedManyWithoutUsuario_chamado_idAnalistaTousuarioInput
    logatividade?: logatividadeCreateNestedManyWithoutUsuarioInput
    notificacao?: notificacaoCreateNestedManyWithoutUsuarioInput
    gerencia?: gerenciaCreateNestedOneWithoutUsuarioInput
    tipousuario?: tipousuarioCreateNestedOneWithoutUsuarioInput
  }

  export type usuarioUncheckedCreateWithoutMsgchamadoInput = {
    idUsuario?: number
    matricula: string
    nomeUsuario: string
    email: string
    senha: string
    dataCadastro?: Date | string
    ativo?: number
    ramal?: string | null
    fotoPerfil?: string | null
    idGerencia?: number | null
    idTipoUsuario?: number | null
    chamado_chamado_idSolicitanteTousuario?: chamadoUncheckedCreateNestedManyWithoutUsuario_chamado_idSolicitanteTousuarioInput
    chamado_chamado_idAnalistaTousuario?: chamadoUncheckedCreateNestedManyWithoutUsuario_chamado_idAnalistaTousuarioInput
    logatividade?: logatividadeUncheckedCreateNestedManyWithoutUsuarioInput
    notificacao?: notificacaoUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type usuarioCreateOrConnectWithoutMsgchamadoInput = {
    where: usuarioWhereUniqueInput
    create: XOR<usuarioCreateWithoutMsgchamadoInput, usuarioUncheckedCreateWithoutMsgchamadoInput>
  }

  export type chamadoUpsertWithoutMsgchamadoInput = {
    update: XOR<chamadoUpdateWithoutMsgchamadoInput, chamadoUncheckedUpdateWithoutMsgchamadoInput>
    create: XOR<chamadoCreateWithoutMsgchamadoInput, chamadoUncheckedCreateWithoutMsgchamadoInput>
    where?: chamadoWhereInput
  }

  export type chamadoUpdateToOneWithWhereWithoutMsgchamadoInput = {
    where?: chamadoWhereInput
    data: XOR<chamadoUpdateWithoutMsgchamadoInput, chamadoUncheckedUpdateWithoutMsgchamadoInput>
  }

  export type chamadoUpdateWithoutMsgchamadoInput = {
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usuario_chamado_idSolicitanteTousuario?: usuarioUpdateOneWithoutChamado_chamado_idSolicitanteTousuarioNestedInput
    usuario_chamado_idAnalistaTousuario?: usuarioUpdateOneWithoutChamado_chamado_idAnalistaTousuarioNestedInput
    tipochamado?: tipochamadoUpdateOneWithoutChamadoNestedInput
    statuschamado?: statuschamadoUpdateOneWithoutChamadoNestedInput
    prioridadechamado?: prioridadechamadoUpdateOneWithoutChamadoNestedInput
    notificacao?: notificacaoUpdateManyWithoutChamadoNestedInput
  }

  export type chamadoUncheckedUpdateWithoutMsgchamadoInput = {
    idChamado?: IntFieldUpdateOperationsInput | number
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idSolicitante?: NullableIntFieldUpdateOperationsInput | number | null
    idAnalista?: NullableIntFieldUpdateOperationsInput | number | null
    idTipoChamado?: NullableIntFieldUpdateOperationsInput | number | null
    idStatus?: NullableIntFieldUpdateOperationsInput | number | null
    idPrioridade?: NullableIntFieldUpdateOperationsInput | number | null
    notificacao?: notificacaoUncheckedUpdateManyWithoutChamadoNestedInput
  }

  export type usuarioUpsertWithoutMsgchamadoInput = {
    update: XOR<usuarioUpdateWithoutMsgchamadoInput, usuarioUncheckedUpdateWithoutMsgchamadoInput>
    create: XOR<usuarioCreateWithoutMsgchamadoInput, usuarioUncheckedCreateWithoutMsgchamadoInput>
    where?: usuarioWhereInput
  }

  export type usuarioUpdateToOneWithWhereWithoutMsgchamadoInput = {
    where?: usuarioWhereInput
    data: XOR<usuarioUpdateWithoutMsgchamadoInput, usuarioUncheckedUpdateWithoutMsgchamadoInput>
  }

  export type usuarioUpdateWithoutMsgchamadoInput = {
    matricula?: StringFieldUpdateOperationsInput | string
    nomeUsuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: IntFieldUpdateOperationsInput | number
    ramal?: NullableStringFieldUpdateOperationsInput | string | null
    fotoPerfil?: NullableStringFieldUpdateOperationsInput | string | null
    chamado_chamado_idSolicitanteTousuario?: chamadoUpdateManyWithoutUsuario_chamado_idSolicitanteTousuarioNestedInput
    chamado_chamado_idAnalistaTousuario?: chamadoUpdateManyWithoutUsuario_chamado_idAnalistaTousuarioNestedInput
    logatividade?: logatividadeUpdateManyWithoutUsuarioNestedInput
    notificacao?: notificacaoUpdateManyWithoutUsuarioNestedInput
    gerencia?: gerenciaUpdateOneWithoutUsuarioNestedInput
    tipousuario?: tipousuarioUpdateOneWithoutUsuarioNestedInput
  }

  export type usuarioUncheckedUpdateWithoutMsgchamadoInput = {
    idUsuario?: IntFieldUpdateOperationsInput | number
    matricula?: StringFieldUpdateOperationsInput | string
    nomeUsuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: IntFieldUpdateOperationsInput | number
    ramal?: NullableStringFieldUpdateOperationsInput | string | null
    fotoPerfil?: NullableStringFieldUpdateOperationsInput | string | null
    idGerencia?: NullableIntFieldUpdateOperationsInput | number | null
    idTipoUsuario?: NullableIntFieldUpdateOperationsInput | number | null
    chamado_chamado_idSolicitanteTousuario?: chamadoUncheckedUpdateManyWithoutUsuario_chamado_idSolicitanteTousuarioNestedInput
    chamado_chamado_idAnalistaTousuario?: chamadoUncheckedUpdateManyWithoutUsuario_chamado_idAnalistaTousuarioNestedInput
    logatividade?: logatividadeUncheckedUpdateManyWithoutUsuarioNestedInput
    notificacao?: notificacaoUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type usuarioCreateWithoutNotificacaoInput = {
    matricula: string
    nomeUsuario: string
    email: string
    senha: string
    dataCadastro?: Date | string
    ativo?: number
    ramal?: string | null
    fotoPerfil?: string | null
    chamado_chamado_idSolicitanteTousuario?: chamadoCreateNestedManyWithoutUsuario_chamado_idSolicitanteTousuarioInput
    chamado_chamado_idAnalistaTousuario?: chamadoCreateNestedManyWithoutUsuario_chamado_idAnalistaTousuarioInput
    logatividade?: logatividadeCreateNestedManyWithoutUsuarioInput
    msgchamado?: msgchamadoCreateNestedManyWithoutUsuarioInput
    gerencia?: gerenciaCreateNestedOneWithoutUsuarioInput
    tipousuario?: tipousuarioCreateNestedOneWithoutUsuarioInput
  }

  export type usuarioUncheckedCreateWithoutNotificacaoInput = {
    idUsuario?: number
    matricula: string
    nomeUsuario: string
    email: string
    senha: string
    dataCadastro?: Date | string
    ativo?: number
    ramal?: string | null
    fotoPerfil?: string | null
    idGerencia?: number | null
    idTipoUsuario?: number | null
    chamado_chamado_idSolicitanteTousuario?: chamadoUncheckedCreateNestedManyWithoutUsuario_chamado_idSolicitanteTousuarioInput
    chamado_chamado_idAnalistaTousuario?: chamadoUncheckedCreateNestedManyWithoutUsuario_chamado_idAnalistaTousuarioInput
    logatividade?: logatividadeUncheckedCreateNestedManyWithoutUsuarioInput
    msgchamado?: msgchamadoUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type usuarioCreateOrConnectWithoutNotificacaoInput = {
    where: usuarioWhereUniqueInput
    create: XOR<usuarioCreateWithoutNotificacaoInput, usuarioUncheckedCreateWithoutNotificacaoInput>
  }

  export type chamadoCreateWithoutNotificacaoInput = {
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura?: Date | string
    dataAtualizacao?: Date | string | null
    dataFechamento?: Date | string | null
    usuario_chamado_idSolicitanteTousuario?: usuarioCreateNestedOneWithoutChamado_chamado_idSolicitanteTousuarioInput
    usuario_chamado_idAnalistaTousuario?: usuarioCreateNestedOneWithoutChamado_chamado_idAnalistaTousuarioInput
    tipochamado?: tipochamadoCreateNestedOneWithoutChamadoInput
    statuschamado?: statuschamadoCreateNestedOneWithoutChamadoInput
    prioridadechamado?: prioridadechamadoCreateNestedOneWithoutChamadoInput
    msgchamado?: msgchamadoCreateNestedManyWithoutChamadoInput
  }

  export type chamadoUncheckedCreateWithoutNotificacaoInput = {
    idChamado?: number
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura?: Date | string
    dataAtualizacao?: Date | string | null
    dataFechamento?: Date | string | null
    idSolicitante?: number | null
    idAnalista?: number | null
    idTipoChamado?: number | null
    idStatus?: number | null
    idPrioridade?: number | null
    msgchamado?: msgchamadoUncheckedCreateNestedManyWithoutChamadoInput
  }

  export type chamadoCreateOrConnectWithoutNotificacaoInput = {
    where: chamadoWhereUniqueInput
    create: XOR<chamadoCreateWithoutNotificacaoInput, chamadoUncheckedCreateWithoutNotificacaoInput>
  }

  export type usuarioUpsertWithoutNotificacaoInput = {
    update: XOR<usuarioUpdateWithoutNotificacaoInput, usuarioUncheckedUpdateWithoutNotificacaoInput>
    create: XOR<usuarioCreateWithoutNotificacaoInput, usuarioUncheckedCreateWithoutNotificacaoInput>
    where?: usuarioWhereInput
  }

  export type usuarioUpdateToOneWithWhereWithoutNotificacaoInput = {
    where?: usuarioWhereInput
    data: XOR<usuarioUpdateWithoutNotificacaoInput, usuarioUncheckedUpdateWithoutNotificacaoInput>
  }

  export type usuarioUpdateWithoutNotificacaoInput = {
    matricula?: StringFieldUpdateOperationsInput | string
    nomeUsuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: IntFieldUpdateOperationsInput | number
    ramal?: NullableStringFieldUpdateOperationsInput | string | null
    fotoPerfil?: NullableStringFieldUpdateOperationsInput | string | null
    chamado_chamado_idSolicitanteTousuario?: chamadoUpdateManyWithoutUsuario_chamado_idSolicitanteTousuarioNestedInput
    chamado_chamado_idAnalistaTousuario?: chamadoUpdateManyWithoutUsuario_chamado_idAnalistaTousuarioNestedInput
    logatividade?: logatividadeUpdateManyWithoutUsuarioNestedInput
    msgchamado?: msgchamadoUpdateManyWithoutUsuarioNestedInput
    gerencia?: gerenciaUpdateOneWithoutUsuarioNestedInput
    tipousuario?: tipousuarioUpdateOneWithoutUsuarioNestedInput
  }

  export type usuarioUncheckedUpdateWithoutNotificacaoInput = {
    idUsuario?: IntFieldUpdateOperationsInput | number
    matricula?: StringFieldUpdateOperationsInput | string
    nomeUsuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: IntFieldUpdateOperationsInput | number
    ramal?: NullableStringFieldUpdateOperationsInput | string | null
    fotoPerfil?: NullableStringFieldUpdateOperationsInput | string | null
    idGerencia?: NullableIntFieldUpdateOperationsInput | number | null
    idTipoUsuario?: NullableIntFieldUpdateOperationsInput | number | null
    chamado_chamado_idSolicitanteTousuario?: chamadoUncheckedUpdateManyWithoutUsuario_chamado_idSolicitanteTousuarioNestedInput
    chamado_chamado_idAnalistaTousuario?: chamadoUncheckedUpdateManyWithoutUsuario_chamado_idAnalistaTousuarioNestedInput
    logatividade?: logatividadeUncheckedUpdateManyWithoutUsuarioNestedInput
    msgchamado?: msgchamadoUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type chamadoUpsertWithoutNotificacaoInput = {
    update: XOR<chamadoUpdateWithoutNotificacaoInput, chamadoUncheckedUpdateWithoutNotificacaoInput>
    create: XOR<chamadoCreateWithoutNotificacaoInput, chamadoUncheckedCreateWithoutNotificacaoInput>
    where?: chamadoWhereInput
  }

  export type chamadoUpdateToOneWithWhereWithoutNotificacaoInput = {
    where?: chamadoWhereInput
    data: XOR<chamadoUpdateWithoutNotificacaoInput, chamadoUncheckedUpdateWithoutNotificacaoInput>
  }

  export type chamadoUpdateWithoutNotificacaoInput = {
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usuario_chamado_idSolicitanteTousuario?: usuarioUpdateOneWithoutChamado_chamado_idSolicitanteTousuarioNestedInput
    usuario_chamado_idAnalistaTousuario?: usuarioUpdateOneWithoutChamado_chamado_idAnalistaTousuarioNestedInput
    tipochamado?: tipochamadoUpdateOneWithoutChamadoNestedInput
    statuschamado?: statuschamadoUpdateOneWithoutChamadoNestedInput
    prioridadechamado?: prioridadechamadoUpdateOneWithoutChamadoNestedInput
    msgchamado?: msgchamadoUpdateManyWithoutChamadoNestedInput
  }

  export type chamadoUncheckedUpdateWithoutNotificacaoInput = {
    idChamado?: IntFieldUpdateOperationsInput | number
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idSolicitante?: NullableIntFieldUpdateOperationsInput | number | null
    idAnalista?: NullableIntFieldUpdateOperationsInput | number | null
    idTipoChamado?: NullableIntFieldUpdateOperationsInput | number | null
    idStatus?: NullableIntFieldUpdateOperationsInput | number | null
    idPrioridade?: NullableIntFieldUpdateOperationsInput | number | null
    msgchamado?: msgchamadoUncheckedUpdateManyWithoutChamadoNestedInput
  }

  export type chamadoCreateWithoutPrioridadechamadoInput = {
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura?: Date | string
    dataAtualizacao?: Date | string | null
    dataFechamento?: Date | string | null
    usuario_chamado_idSolicitanteTousuario?: usuarioCreateNestedOneWithoutChamado_chamado_idSolicitanteTousuarioInput
    usuario_chamado_idAnalistaTousuario?: usuarioCreateNestedOneWithoutChamado_chamado_idAnalistaTousuarioInput
    tipochamado?: tipochamadoCreateNestedOneWithoutChamadoInput
    statuschamado?: statuschamadoCreateNestedOneWithoutChamadoInput
    msgchamado?: msgchamadoCreateNestedManyWithoutChamadoInput
    notificacao?: notificacaoCreateNestedManyWithoutChamadoInput
  }

  export type chamadoUncheckedCreateWithoutPrioridadechamadoInput = {
    idChamado?: number
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura?: Date | string
    dataAtualizacao?: Date | string | null
    dataFechamento?: Date | string | null
    idSolicitante?: number | null
    idAnalista?: number | null
    idTipoChamado?: number | null
    idStatus?: number | null
    msgchamado?: msgchamadoUncheckedCreateNestedManyWithoutChamadoInput
    notificacao?: notificacaoUncheckedCreateNestedManyWithoutChamadoInput
  }

  export type chamadoCreateOrConnectWithoutPrioridadechamadoInput = {
    where: chamadoWhereUniqueInput
    create: XOR<chamadoCreateWithoutPrioridadechamadoInput, chamadoUncheckedCreateWithoutPrioridadechamadoInput>
  }

  export type chamadoCreateManyPrioridadechamadoInputEnvelope = {
    data: chamadoCreateManyPrioridadechamadoInput | chamadoCreateManyPrioridadechamadoInput[]
    skipDuplicates?: boolean
  }

  export type chamadoUpsertWithWhereUniqueWithoutPrioridadechamadoInput = {
    where: chamadoWhereUniqueInput
    update: XOR<chamadoUpdateWithoutPrioridadechamadoInput, chamadoUncheckedUpdateWithoutPrioridadechamadoInput>
    create: XOR<chamadoCreateWithoutPrioridadechamadoInput, chamadoUncheckedCreateWithoutPrioridadechamadoInput>
  }

  export type chamadoUpdateWithWhereUniqueWithoutPrioridadechamadoInput = {
    where: chamadoWhereUniqueInput
    data: XOR<chamadoUpdateWithoutPrioridadechamadoInput, chamadoUncheckedUpdateWithoutPrioridadechamadoInput>
  }

  export type chamadoUpdateManyWithWhereWithoutPrioridadechamadoInput = {
    where: chamadoScalarWhereInput
    data: XOR<chamadoUpdateManyMutationInput, chamadoUncheckedUpdateManyWithoutPrioridadechamadoInput>
  }

  export type chamadoScalarWhereInput = {
    AND?: chamadoScalarWhereInput | chamadoScalarWhereInput[]
    OR?: chamadoScalarWhereInput[]
    NOT?: chamadoScalarWhereInput | chamadoScalarWhereInput[]
    idChamado?: IntFilter<"chamado"> | number
    protocolo?: StringFilter<"chamado"> | string
    assunto?: StringFilter<"chamado"> | string
    descricao?: StringFilter<"chamado"> | string
    dataAbertura?: DateTimeFilter<"chamado"> | Date | string
    dataAtualizacao?: DateTimeNullableFilter<"chamado"> | Date | string | null
    dataFechamento?: DateTimeNullableFilter<"chamado"> | Date | string | null
    idSolicitante?: IntNullableFilter<"chamado"> | number | null
    idAnalista?: IntNullableFilter<"chamado"> | number | null
    idTipoChamado?: IntNullableFilter<"chamado"> | number | null
    idStatus?: IntNullableFilter<"chamado"> | number | null
    idPrioridade?: IntNullableFilter<"chamado"> | number | null
  }

  export type chamadoCreateWithoutStatuschamadoInput = {
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura?: Date | string
    dataAtualizacao?: Date | string | null
    dataFechamento?: Date | string | null
    usuario_chamado_idSolicitanteTousuario?: usuarioCreateNestedOneWithoutChamado_chamado_idSolicitanteTousuarioInput
    usuario_chamado_idAnalistaTousuario?: usuarioCreateNestedOneWithoutChamado_chamado_idAnalistaTousuarioInput
    tipochamado?: tipochamadoCreateNestedOneWithoutChamadoInput
    prioridadechamado?: prioridadechamadoCreateNestedOneWithoutChamadoInput
    msgchamado?: msgchamadoCreateNestedManyWithoutChamadoInput
    notificacao?: notificacaoCreateNestedManyWithoutChamadoInput
  }

  export type chamadoUncheckedCreateWithoutStatuschamadoInput = {
    idChamado?: number
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura?: Date | string
    dataAtualizacao?: Date | string | null
    dataFechamento?: Date | string | null
    idSolicitante?: number | null
    idAnalista?: number | null
    idTipoChamado?: number | null
    idPrioridade?: number | null
    msgchamado?: msgchamadoUncheckedCreateNestedManyWithoutChamadoInput
    notificacao?: notificacaoUncheckedCreateNestedManyWithoutChamadoInput
  }

  export type chamadoCreateOrConnectWithoutStatuschamadoInput = {
    where: chamadoWhereUniqueInput
    create: XOR<chamadoCreateWithoutStatuschamadoInput, chamadoUncheckedCreateWithoutStatuschamadoInput>
  }

  export type chamadoCreateManyStatuschamadoInputEnvelope = {
    data: chamadoCreateManyStatuschamadoInput | chamadoCreateManyStatuschamadoInput[]
    skipDuplicates?: boolean
  }

  export type chamadoUpsertWithWhereUniqueWithoutStatuschamadoInput = {
    where: chamadoWhereUniqueInput
    update: XOR<chamadoUpdateWithoutStatuschamadoInput, chamadoUncheckedUpdateWithoutStatuschamadoInput>
    create: XOR<chamadoCreateWithoutStatuschamadoInput, chamadoUncheckedCreateWithoutStatuschamadoInput>
  }

  export type chamadoUpdateWithWhereUniqueWithoutStatuschamadoInput = {
    where: chamadoWhereUniqueInput
    data: XOR<chamadoUpdateWithoutStatuschamadoInput, chamadoUncheckedUpdateWithoutStatuschamadoInput>
  }

  export type chamadoUpdateManyWithWhereWithoutStatuschamadoInput = {
    where: chamadoScalarWhereInput
    data: XOR<chamadoUpdateManyMutationInput, chamadoUncheckedUpdateManyWithoutStatuschamadoInput>
  }

  export type chamadoCreateWithoutTipochamadoInput = {
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura?: Date | string
    dataAtualizacao?: Date | string | null
    dataFechamento?: Date | string | null
    usuario_chamado_idSolicitanteTousuario?: usuarioCreateNestedOneWithoutChamado_chamado_idSolicitanteTousuarioInput
    usuario_chamado_idAnalistaTousuario?: usuarioCreateNestedOneWithoutChamado_chamado_idAnalistaTousuarioInput
    statuschamado?: statuschamadoCreateNestedOneWithoutChamadoInput
    prioridadechamado?: prioridadechamadoCreateNestedOneWithoutChamadoInput
    msgchamado?: msgchamadoCreateNestedManyWithoutChamadoInput
    notificacao?: notificacaoCreateNestedManyWithoutChamadoInput
  }

  export type chamadoUncheckedCreateWithoutTipochamadoInput = {
    idChamado?: number
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura?: Date | string
    dataAtualizacao?: Date | string | null
    dataFechamento?: Date | string | null
    idSolicitante?: number | null
    idAnalista?: number | null
    idStatus?: number | null
    idPrioridade?: number | null
    msgchamado?: msgchamadoUncheckedCreateNestedManyWithoutChamadoInput
    notificacao?: notificacaoUncheckedCreateNestedManyWithoutChamadoInput
  }

  export type chamadoCreateOrConnectWithoutTipochamadoInput = {
    where: chamadoWhereUniqueInput
    create: XOR<chamadoCreateWithoutTipochamadoInput, chamadoUncheckedCreateWithoutTipochamadoInput>
  }

  export type chamadoCreateManyTipochamadoInputEnvelope = {
    data: chamadoCreateManyTipochamadoInput | chamadoCreateManyTipochamadoInput[]
    skipDuplicates?: boolean
  }

  export type chamadoUpsertWithWhereUniqueWithoutTipochamadoInput = {
    where: chamadoWhereUniqueInput
    update: XOR<chamadoUpdateWithoutTipochamadoInput, chamadoUncheckedUpdateWithoutTipochamadoInput>
    create: XOR<chamadoCreateWithoutTipochamadoInput, chamadoUncheckedCreateWithoutTipochamadoInput>
  }

  export type chamadoUpdateWithWhereUniqueWithoutTipochamadoInput = {
    where: chamadoWhereUniqueInput
    data: XOR<chamadoUpdateWithoutTipochamadoInput, chamadoUncheckedUpdateWithoutTipochamadoInput>
  }

  export type chamadoUpdateManyWithWhereWithoutTipochamadoInput = {
    where: chamadoScalarWhereInput
    data: XOR<chamadoUpdateManyMutationInput, chamadoUncheckedUpdateManyWithoutTipochamadoInput>
  }

  export type usuarioCreateWithoutTipousuarioInput = {
    matricula: string
    nomeUsuario: string
    email: string
    senha: string
    dataCadastro?: Date | string
    ativo?: number
    ramal?: string | null
    fotoPerfil?: string | null
    chamado_chamado_idSolicitanteTousuario?: chamadoCreateNestedManyWithoutUsuario_chamado_idSolicitanteTousuarioInput
    chamado_chamado_idAnalistaTousuario?: chamadoCreateNestedManyWithoutUsuario_chamado_idAnalistaTousuarioInput
    logatividade?: logatividadeCreateNestedManyWithoutUsuarioInput
    msgchamado?: msgchamadoCreateNestedManyWithoutUsuarioInput
    notificacao?: notificacaoCreateNestedManyWithoutUsuarioInput
    gerencia?: gerenciaCreateNestedOneWithoutUsuarioInput
  }

  export type usuarioUncheckedCreateWithoutTipousuarioInput = {
    idUsuario?: number
    matricula: string
    nomeUsuario: string
    email: string
    senha: string
    dataCadastro?: Date | string
    ativo?: number
    ramal?: string | null
    fotoPerfil?: string | null
    idGerencia?: number | null
    chamado_chamado_idSolicitanteTousuario?: chamadoUncheckedCreateNestedManyWithoutUsuario_chamado_idSolicitanteTousuarioInput
    chamado_chamado_idAnalistaTousuario?: chamadoUncheckedCreateNestedManyWithoutUsuario_chamado_idAnalistaTousuarioInput
    logatividade?: logatividadeUncheckedCreateNestedManyWithoutUsuarioInput
    msgchamado?: msgchamadoUncheckedCreateNestedManyWithoutUsuarioInput
    notificacao?: notificacaoUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type usuarioCreateOrConnectWithoutTipousuarioInput = {
    where: usuarioWhereUniqueInput
    create: XOR<usuarioCreateWithoutTipousuarioInput, usuarioUncheckedCreateWithoutTipousuarioInput>
  }

  export type usuarioCreateManyTipousuarioInputEnvelope = {
    data: usuarioCreateManyTipousuarioInput | usuarioCreateManyTipousuarioInput[]
    skipDuplicates?: boolean
  }

  export type usuarioUpsertWithWhereUniqueWithoutTipousuarioInput = {
    where: usuarioWhereUniqueInput
    update: XOR<usuarioUpdateWithoutTipousuarioInput, usuarioUncheckedUpdateWithoutTipousuarioInput>
    create: XOR<usuarioCreateWithoutTipousuarioInput, usuarioUncheckedCreateWithoutTipousuarioInput>
  }

  export type usuarioUpdateWithWhereUniqueWithoutTipousuarioInput = {
    where: usuarioWhereUniqueInput
    data: XOR<usuarioUpdateWithoutTipousuarioInput, usuarioUncheckedUpdateWithoutTipousuarioInput>
  }

  export type usuarioUpdateManyWithWhereWithoutTipousuarioInput = {
    where: usuarioScalarWhereInput
    data: XOR<usuarioUpdateManyMutationInput, usuarioUncheckedUpdateManyWithoutTipousuarioInput>
  }

  export type chamadoCreateWithoutUsuario_chamado_idSolicitanteTousuarioInput = {
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura?: Date | string
    dataAtualizacao?: Date | string | null
    dataFechamento?: Date | string | null
    usuario_chamado_idAnalistaTousuario?: usuarioCreateNestedOneWithoutChamado_chamado_idAnalistaTousuarioInput
    tipochamado?: tipochamadoCreateNestedOneWithoutChamadoInput
    statuschamado?: statuschamadoCreateNestedOneWithoutChamadoInput
    prioridadechamado?: prioridadechamadoCreateNestedOneWithoutChamadoInput
    msgchamado?: msgchamadoCreateNestedManyWithoutChamadoInput
    notificacao?: notificacaoCreateNestedManyWithoutChamadoInput
  }

  export type chamadoUncheckedCreateWithoutUsuario_chamado_idSolicitanteTousuarioInput = {
    idChamado?: number
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura?: Date | string
    dataAtualizacao?: Date | string | null
    dataFechamento?: Date | string | null
    idAnalista?: number | null
    idTipoChamado?: number | null
    idStatus?: number | null
    idPrioridade?: number | null
    msgchamado?: msgchamadoUncheckedCreateNestedManyWithoutChamadoInput
    notificacao?: notificacaoUncheckedCreateNestedManyWithoutChamadoInput
  }

  export type chamadoCreateOrConnectWithoutUsuario_chamado_idSolicitanteTousuarioInput = {
    where: chamadoWhereUniqueInput
    create: XOR<chamadoCreateWithoutUsuario_chamado_idSolicitanteTousuarioInput, chamadoUncheckedCreateWithoutUsuario_chamado_idSolicitanteTousuarioInput>
  }

  export type chamadoCreateManyUsuario_chamado_idSolicitanteTousuarioInputEnvelope = {
    data: chamadoCreateManyUsuario_chamado_idSolicitanteTousuarioInput | chamadoCreateManyUsuario_chamado_idSolicitanteTousuarioInput[]
    skipDuplicates?: boolean
  }

  export type chamadoCreateWithoutUsuario_chamado_idAnalistaTousuarioInput = {
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura?: Date | string
    dataAtualizacao?: Date | string | null
    dataFechamento?: Date | string | null
    usuario_chamado_idSolicitanteTousuario?: usuarioCreateNestedOneWithoutChamado_chamado_idSolicitanteTousuarioInput
    tipochamado?: tipochamadoCreateNestedOneWithoutChamadoInput
    statuschamado?: statuschamadoCreateNestedOneWithoutChamadoInput
    prioridadechamado?: prioridadechamadoCreateNestedOneWithoutChamadoInput
    msgchamado?: msgchamadoCreateNestedManyWithoutChamadoInput
    notificacao?: notificacaoCreateNestedManyWithoutChamadoInput
  }

  export type chamadoUncheckedCreateWithoutUsuario_chamado_idAnalistaTousuarioInput = {
    idChamado?: number
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura?: Date | string
    dataAtualizacao?: Date | string | null
    dataFechamento?: Date | string | null
    idSolicitante?: number | null
    idTipoChamado?: number | null
    idStatus?: number | null
    idPrioridade?: number | null
    msgchamado?: msgchamadoUncheckedCreateNestedManyWithoutChamadoInput
    notificacao?: notificacaoUncheckedCreateNestedManyWithoutChamadoInput
  }

  export type chamadoCreateOrConnectWithoutUsuario_chamado_idAnalistaTousuarioInput = {
    where: chamadoWhereUniqueInput
    create: XOR<chamadoCreateWithoutUsuario_chamado_idAnalistaTousuarioInput, chamadoUncheckedCreateWithoutUsuario_chamado_idAnalistaTousuarioInput>
  }

  export type chamadoCreateManyUsuario_chamado_idAnalistaTousuarioInputEnvelope = {
    data: chamadoCreateManyUsuario_chamado_idAnalistaTousuarioInput | chamadoCreateManyUsuario_chamado_idAnalistaTousuarioInput[]
    skipDuplicates?: boolean
  }

  export type logatividadeCreateWithoutUsuarioInput = {
    descricao: string
    dataHora?: Date | string | null
  }

  export type logatividadeUncheckedCreateWithoutUsuarioInput = {
    idLog?: number
    descricao: string
    dataHora?: Date | string | null
  }

  export type logatividadeCreateOrConnectWithoutUsuarioInput = {
    where: logatividadeWhereUniqueInput
    create: XOR<logatividadeCreateWithoutUsuarioInput, logatividadeUncheckedCreateWithoutUsuarioInput>
  }

  export type logatividadeCreateManyUsuarioInputEnvelope = {
    data: logatividadeCreateManyUsuarioInput | logatividadeCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type msgchamadoCreateWithoutUsuarioInput = {
    mensagem: string
    timestamp?: Date | string | null
    remetente: $Enums.msgchamado_remetente
    urlAnexo?: string | null
    nomeArquivo?: string | null
    chamado: chamadoCreateNestedOneWithoutMsgchamadoInput
  }

  export type msgchamadoUncheckedCreateWithoutUsuarioInput = {
    idMensagem?: number
    mensagem: string
    timestamp?: Date | string | null
    remetente: $Enums.msgchamado_remetente
    urlAnexo?: string | null
    nomeArquivo?: string | null
    idChamado: number
  }

  export type msgchamadoCreateOrConnectWithoutUsuarioInput = {
    where: msgchamadoWhereUniqueInput
    create: XOR<msgchamadoCreateWithoutUsuarioInput, msgchamadoUncheckedCreateWithoutUsuarioInput>
  }

  export type msgchamadoCreateManyUsuarioInputEnvelope = {
    data: msgchamadoCreateManyUsuarioInput | msgchamadoCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type notificacaoCreateWithoutUsuarioInput = {
    titulo: string
    mensagem: string
    lida?: number
    dataHora?: Date | string | null
    chamado?: chamadoCreateNestedOneWithoutNotificacaoInput
  }

  export type notificacaoUncheckedCreateWithoutUsuarioInput = {
    idNotificacao?: number
    titulo: string
    mensagem: string
    lida?: number
    dataHora?: Date | string | null
    idChamado?: number | null
  }

  export type notificacaoCreateOrConnectWithoutUsuarioInput = {
    where: notificacaoWhereUniqueInput
    create: XOR<notificacaoCreateWithoutUsuarioInput, notificacaoUncheckedCreateWithoutUsuarioInput>
  }

  export type notificacaoCreateManyUsuarioInputEnvelope = {
    data: notificacaoCreateManyUsuarioInput | notificacaoCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type gerenciaCreateWithoutUsuarioInput = {
    nomeGerencia: string
    ativo?: number
  }

  export type gerenciaUncheckedCreateWithoutUsuarioInput = {
    idGerencia?: number
    nomeGerencia: string
    ativo?: number
  }

  export type gerenciaCreateOrConnectWithoutUsuarioInput = {
    where: gerenciaWhereUniqueInput
    create: XOR<gerenciaCreateWithoutUsuarioInput, gerenciaUncheckedCreateWithoutUsuarioInput>
  }

  export type tipousuarioCreateWithoutUsuarioInput = {
    tipoUsuario: string
  }

  export type tipousuarioUncheckedCreateWithoutUsuarioInput = {
    idTipoUsuario?: number
    tipoUsuario: string
  }

  export type tipousuarioCreateOrConnectWithoutUsuarioInput = {
    where: tipousuarioWhereUniqueInput
    create: XOR<tipousuarioCreateWithoutUsuarioInput, tipousuarioUncheckedCreateWithoutUsuarioInput>
  }

  export type chamadoUpsertWithWhereUniqueWithoutUsuario_chamado_idSolicitanteTousuarioInput = {
    where: chamadoWhereUniqueInput
    update: XOR<chamadoUpdateWithoutUsuario_chamado_idSolicitanteTousuarioInput, chamadoUncheckedUpdateWithoutUsuario_chamado_idSolicitanteTousuarioInput>
    create: XOR<chamadoCreateWithoutUsuario_chamado_idSolicitanteTousuarioInput, chamadoUncheckedCreateWithoutUsuario_chamado_idSolicitanteTousuarioInput>
  }

  export type chamadoUpdateWithWhereUniqueWithoutUsuario_chamado_idSolicitanteTousuarioInput = {
    where: chamadoWhereUniqueInput
    data: XOR<chamadoUpdateWithoutUsuario_chamado_idSolicitanteTousuarioInput, chamadoUncheckedUpdateWithoutUsuario_chamado_idSolicitanteTousuarioInput>
  }

  export type chamadoUpdateManyWithWhereWithoutUsuario_chamado_idSolicitanteTousuarioInput = {
    where: chamadoScalarWhereInput
    data: XOR<chamadoUpdateManyMutationInput, chamadoUncheckedUpdateManyWithoutUsuario_chamado_idSolicitanteTousuarioInput>
  }

  export type chamadoUpsertWithWhereUniqueWithoutUsuario_chamado_idAnalistaTousuarioInput = {
    where: chamadoWhereUniqueInput
    update: XOR<chamadoUpdateWithoutUsuario_chamado_idAnalistaTousuarioInput, chamadoUncheckedUpdateWithoutUsuario_chamado_idAnalistaTousuarioInput>
    create: XOR<chamadoCreateWithoutUsuario_chamado_idAnalistaTousuarioInput, chamadoUncheckedCreateWithoutUsuario_chamado_idAnalistaTousuarioInput>
  }

  export type chamadoUpdateWithWhereUniqueWithoutUsuario_chamado_idAnalistaTousuarioInput = {
    where: chamadoWhereUniqueInput
    data: XOR<chamadoUpdateWithoutUsuario_chamado_idAnalistaTousuarioInput, chamadoUncheckedUpdateWithoutUsuario_chamado_idAnalistaTousuarioInput>
  }

  export type chamadoUpdateManyWithWhereWithoutUsuario_chamado_idAnalistaTousuarioInput = {
    where: chamadoScalarWhereInput
    data: XOR<chamadoUpdateManyMutationInput, chamadoUncheckedUpdateManyWithoutUsuario_chamado_idAnalistaTousuarioInput>
  }

  export type logatividadeUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: logatividadeWhereUniqueInput
    update: XOR<logatividadeUpdateWithoutUsuarioInput, logatividadeUncheckedUpdateWithoutUsuarioInput>
    create: XOR<logatividadeCreateWithoutUsuarioInput, logatividadeUncheckedCreateWithoutUsuarioInput>
  }

  export type logatividadeUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: logatividadeWhereUniqueInput
    data: XOR<logatividadeUpdateWithoutUsuarioInput, logatividadeUncheckedUpdateWithoutUsuarioInput>
  }

  export type logatividadeUpdateManyWithWhereWithoutUsuarioInput = {
    where: logatividadeScalarWhereInput
    data: XOR<logatividadeUpdateManyMutationInput, logatividadeUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type logatividadeScalarWhereInput = {
    AND?: logatividadeScalarWhereInput | logatividadeScalarWhereInput[]
    OR?: logatividadeScalarWhereInput[]
    NOT?: logatividadeScalarWhereInput | logatividadeScalarWhereInput[]
    idLog?: IntFilter<"logatividade"> | number
    descricao?: StringFilter<"logatividade"> | string
    dataHora?: DateTimeNullableFilter<"logatividade"> | Date | string | null
    idUsuario?: IntNullableFilter<"logatividade"> | number | null
  }

  export type msgchamadoUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: msgchamadoWhereUniqueInput
    update: XOR<msgchamadoUpdateWithoutUsuarioInput, msgchamadoUncheckedUpdateWithoutUsuarioInput>
    create: XOR<msgchamadoCreateWithoutUsuarioInput, msgchamadoUncheckedCreateWithoutUsuarioInput>
  }

  export type msgchamadoUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: msgchamadoWhereUniqueInput
    data: XOR<msgchamadoUpdateWithoutUsuarioInput, msgchamadoUncheckedUpdateWithoutUsuarioInput>
  }

  export type msgchamadoUpdateManyWithWhereWithoutUsuarioInput = {
    where: msgchamadoScalarWhereInput
    data: XOR<msgchamadoUpdateManyMutationInput, msgchamadoUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type notificacaoUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: notificacaoWhereUniqueInput
    update: XOR<notificacaoUpdateWithoutUsuarioInput, notificacaoUncheckedUpdateWithoutUsuarioInput>
    create: XOR<notificacaoCreateWithoutUsuarioInput, notificacaoUncheckedCreateWithoutUsuarioInput>
  }

  export type notificacaoUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: notificacaoWhereUniqueInput
    data: XOR<notificacaoUpdateWithoutUsuarioInput, notificacaoUncheckedUpdateWithoutUsuarioInput>
  }

  export type notificacaoUpdateManyWithWhereWithoutUsuarioInput = {
    where: notificacaoScalarWhereInput
    data: XOR<notificacaoUpdateManyMutationInput, notificacaoUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type gerenciaUpsertWithoutUsuarioInput = {
    update: XOR<gerenciaUpdateWithoutUsuarioInput, gerenciaUncheckedUpdateWithoutUsuarioInput>
    create: XOR<gerenciaCreateWithoutUsuarioInput, gerenciaUncheckedCreateWithoutUsuarioInput>
    where?: gerenciaWhereInput
  }

  export type gerenciaUpdateToOneWithWhereWithoutUsuarioInput = {
    where?: gerenciaWhereInput
    data: XOR<gerenciaUpdateWithoutUsuarioInput, gerenciaUncheckedUpdateWithoutUsuarioInput>
  }

  export type gerenciaUpdateWithoutUsuarioInput = {
    nomeGerencia?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
  }

  export type gerenciaUncheckedUpdateWithoutUsuarioInput = {
    idGerencia?: IntFieldUpdateOperationsInput | number
    nomeGerencia?: StringFieldUpdateOperationsInput | string
    ativo?: IntFieldUpdateOperationsInput | number
  }

  export type tipousuarioUpsertWithoutUsuarioInput = {
    update: XOR<tipousuarioUpdateWithoutUsuarioInput, tipousuarioUncheckedUpdateWithoutUsuarioInput>
    create: XOR<tipousuarioCreateWithoutUsuarioInput, tipousuarioUncheckedCreateWithoutUsuarioInput>
    where?: tipousuarioWhereInput
  }

  export type tipousuarioUpdateToOneWithWhereWithoutUsuarioInput = {
    where?: tipousuarioWhereInput
    data: XOR<tipousuarioUpdateWithoutUsuarioInput, tipousuarioUncheckedUpdateWithoutUsuarioInput>
  }

  export type tipousuarioUpdateWithoutUsuarioInput = {
    tipoUsuario?: StringFieldUpdateOperationsInput | string
  }

  export type tipousuarioUncheckedUpdateWithoutUsuarioInput = {
    idTipoUsuario?: IntFieldUpdateOperationsInput | number
    tipoUsuario?: StringFieldUpdateOperationsInput | string
  }

  export type msgchamadoCreateManyChamadoInput = {
    idMensagem?: number
    mensagem: string
    timestamp?: Date | string | null
    remetente: $Enums.msgchamado_remetente
    urlAnexo?: string | null
    nomeArquivo?: string | null
    idRemetente: number
  }

  export type notificacaoCreateManyChamadoInput = {
    idNotificacao?: number
    titulo: string
    mensagem: string
    lida?: number
    dataHora?: Date | string | null
    idUsuario: number
  }

  export type msgchamadoUpdateWithoutChamadoInput = {
    mensagem?: StringFieldUpdateOperationsInput | string
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remetente?: Enummsgchamado_remetenteFieldUpdateOperationsInput | $Enums.msgchamado_remetente
    urlAnexo?: NullableStringFieldUpdateOperationsInput | string | null
    nomeArquivo?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: usuarioUpdateOneRequiredWithoutMsgchamadoNestedInput
  }

  export type msgchamadoUncheckedUpdateWithoutChamadoInput = {
    idMensagem?: IntFieldUpdateOperationsInput | number
    mensagem?: StringFieldUpdateOperationsInput | string
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remetente?: Enummsgchamado_remetenteFieldUpdateOperationsInput | $Enums.msgchamado_remetente
    urlAnexo?: NullableStringFieldUpdateOperationsInput | string | null
    nomeArquivo?: NullableStringFieldUpdateOperationsInput | string | null
    idRemetente?: IntFieldUpdateOperationsInput | number
  }

  export type msgchamadoUncheckedUpdateManyWithoutChamadoInput = {
    idMensagem?: IntFieldUpdateOperationsInput | number
    mensagem?: StringFieldUpdateOperationsInput | string
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remetente?: Enummsgchamado_remetenteFieldUpdateOperationsInput | $Enums.msgchamado_remetente
    urlAnexo?: NullableStringFieldUpdateOperationsInput | string | null
    nomeArquivo?: NullableStringFieldUpdateOperationsInput | string | null
    idRemetente?: IntFieldUpdateOperationsInput | number
  }

  export type notificacaoUpdateWithoutChamadoInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    lida?: IntFieldUpdateOperationsInput | number
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usuario?: usuarioUpdateOneRequiredWithoutNotificacaoNestedInput
  }

  export type notificacaoUncheckedUpdateWithoutChamadoInput = {
    idNotificacao?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    lida?: IntFieldUpdateOperationsInput | number
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idUsuario?: IntFieldUpdateOperationsInput | number
  }

  export type notificacaoUncheckedUpdateManyWithoutChamadoInput = {
    idNotificacao?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    lida?: IntFieldUpdateOperationsInput | number
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idUsuario?: IntFieldUpdateOperationsInput | number
  }

  export type usuarioCreateManyGerenciaInput = {
    idUsuario?: number
    matricula: string
    nomeUsuario: string
    email: string
    senha: string
    dataCadastro?: Date | string
    ativo?: number
    ramal?: string | null
    fotoPerfil?: string | null
    idTipoUsuario?: number | null
  }

  export type usuarioUpdateWithoutGerenciaInput = {
    matricula?: StringFieldUpdateOperationsInput | string
    nomeUsuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: IntFieldUpdateOperationsInput | number
    ramal?: NullableStringFieldUpdateOperationsInput | string | null
    fotoPerfil?: NullableStringFieldUpdateOperationsInput | string | null
    chamado_chamado_idSolicitanteTousuario?: chamadoUpdateManyWithoutUsuario_chamado_idSolicitanteTousuarioNestedInput
    chamado_chamado_idAnalistaTousuario?: chamadoUpdateManyWithoutUsuario_chamado_idAnalistaTousuarioNestedInput
    logatividade?: logatividadeUpdateManyWithoutUsuarioNestedInput
    msgchamado?: msgchamadoUpdateManyWithoutUsuarioNestedInput
    notificacao?: notificacaoUpdateManyWithoutUsuarioNestedInput
    tipousuario?: tipousuarioUpdateOneWithoutUsuarioNestedInput
  }

  export type usuarioUncheckedUpdateWithoutGerenciaInput = {
    idUsuario?: IntFieldUpdateOperationsInput | number
    matricula?: StringFieldUpdateOperationsInput | string
    nomeUsuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: IntFieldUpdateOperationsInput | number
    ramal?: NullableStringFieldUpdateOperationsInput | string | null
    fotoPerfil?: NullableStringFieldUpdateOperationsInput | string | null
    idTipoUsuario?: NullableIntFieldUpdateOperationsInput | number | null
    chamado_chamado_idSolicitanteTousuario?: chamadoUncheckedUpdateManyWithoutUsuario_chamado_idSolicitanteTousuarioNestedInput
    chamado_chamado_idAnalistaTousuario?: chamadoUncheckedUpdateManyWithoutUsuario_chamado_idAnalistaTousuarioNestedInput
    logatividade?: logatividadeUncheckedUpdateManyWithoutUsuarioNestedInput
    msgchamado?: msgchamadoUncheckedUpdateManyWithoutUsuarioNestedInput
    notificacao?: notificacaoUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type usuarioUncheckedUpdateManyWithoutGerenciaInput = {
    idUsuario?: IntFieldUpdateOperationsInput | number
    matricula?: StringFieldUpdateOperationsInput | string
    nomeUsuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: IntFieldUpdateOperationsInput | number
    ramal?: NullableStringFieldUpdateOperationsInput | string | null
    fotoPerfil?: NullableStringFieldUpdateOperationsInput | string | null
    idTipoUsuario?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type chamadoCreateManyPrioridadechamadoInput = {
    idChamado?: number
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura?: Date | string
    dataAtualizacao?: Date | string | null
    dataFechamento?: Date | string | null
    idSolicitante?: number | null
    idAnalista?: number | null
    idTipoChamado?: number | null
    idStatus?: number | null
  }

  export type chamadoUpdateWithoutPrioridadechamadoInput = {
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usuario_chamado_idSolicitanteTousuario?: usuarioUpdateOneWithoutChamado_chamado_idSolicitanteTousuarioNestedInput
    usuario_chamado_idAnalistaTousuario?: usuarioUpdateOneWithoutChamado_chamado_idAnalistaTousuarioNestedInput
    tipochamado?: tipochamadoUpdateOneWithoutChamadoNestedInput
    statuschamado?: statuschamadoUpdateOneWithoutChamadoNestedInput
    msgchamado?: msgchamadoUpdateManyWithoutChamadoNestedInput
    notificacao?: notificacaoUpdateManyWithoutChamadoNestedInput
  }

  export type chamadoUncheckedUpdateWithoutPrioridadechamadoInput = {
    idChamado?: IntFieldUpdateOperationsInput | number
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idSolicitante?: NullableIntFieldUpdateOperationsInput | number | null
    idAnalista?: NullableIntFieldUpdateOperationsInput | number | null
    idTipoChamado?: NullableIntFieldUpdateOperationsInput | number | null
    idStatus?: NullableIntFieldUpdateOperationsInput | number | null
    msgchamado?: msgchamadoUncheckedUpdateManyWithoutChamadoNestedInput
    notificacao?: notificacaoUncheckedUpdateManyWithoutChamadoNestedInput
  }

  export type chamadoUncheckedUpdateManyWithoutPrioridadechamadoInput = {
    idChamado?: IntFieldUpdateOperationsInput | number
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idSolicitante?: NullableIntFieldUpdateOperationsInput | number | null
    idAnalista?: NullableIntFieldUpdateOperationsInput | number | null
    idTipoChamado?: NullableIntFieldUpdateOperationsInput | number | null
    idStatus?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type chamadoCreateManyStatuschamadoInput = {
    idChamado?: number
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura?: Date | string
    dataAtualizacao?: Date | string | null
    dataFechamento?: Date | string | null
    idSolicitante?: number | null
    idAnalista?: number | null
    idTipoChamado?: number | null
    idPrioridade?: number | null
  }

  export type chamadoUpdateWithoutStatuschamadoInput = {
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usuario_chamado_idSolicitanteTousuario?: usuarioUpdateOneWithoutChamado_chamado_idSolicitanteTousuarioNestedInput
    usuario_chamado_idAnalistaTousuario?: usuarioUpdateOneWithoutChamado_chamado_idAnalistaTousuarioNestedInput
    tipochamado?: tipochamadoUpdateOneWithoutChamadoNestedInput
    prioridadechamado?: prioridadechamadoUpdateOneWithoutChamadoNestedInput
    msgchamado?: msgchamadoUpdateManyWithoutChamadoNestedInput
    notificacao?: notificacaoUpdateManyWithoutChamadoNestedInput
  }

  export type chamadoUncheckedUpdateWithoutStatuschamadoInput = {
    idChamado?: IntFieldUpdateOperationsInput | number
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idSolicitante?: NullableIntFieldUpdateOperationsInput | number | null
    idAnalista?: NullableIntFieldUpdateOperationsInput | number | null
    idTipoChamado?: NullableIntFieldUpdateOperationsInput | number | null
    idPrioridade?: NullableIntFieldUpdateOperationsInput | number | null
    msgchamado?: msgchamadoUncheckedUpdateManyWithoutChamadoNestedInput
    notificacao?: notificacaoUncheckedUpdateManyWithoutChamadoNestedInput
  }

  export type chamadoUncheckedUpdateManyWithoutStatuschamadoInput = {
    idChamado?: IntFieldUpdateOperationsInput | number
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idSolicitante?: NullableIntFieldUpdateOperationsInput | number | null
    idAnalista?: NullableIntFieldUpdateOperationsInput | number | null
    idTipoChamado?: NullableIntFieldUpdateOperationsInput | number | null
    idPrioridade?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type chamadoCreateManyTipochamadoInput = {
    idChamado?: number
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura?: Date | string
    dataAtualizacao?: Date | string | null
    dataFechamento?: Date | string | null
    idSolicitante?: number | null
    idAnalista?: number | null
    idStatus?: number | null
    idPrioridade?: number | null
  }

  export type chamadoUpdateWithoutTipochamadoInput = {
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usuario_chamado_idSolicitanteTousuario?: usuarioUpdateOneWithoutChamado_chamado_idSolicitanteTousuarioNestedInput
    usuario_chamado_idAnalistaTousuario?: usuarioUpdateOneWithoutChamado_chamado_idAnalistaTousuarioNestedInput
    statuschamado?: statuschamadoUpdateOneWithoutChamadoNestedInput
    prioridadechamado?: prioridadechamadoUpdateOneWithoutChamadoNestedInput
    msgchamado?: msgchamadoUpdateManyWithoutChamadoNestedInput
    notificacao?: notificacaoUpdateManyWithoutChamadoNestedInput
  }

  export type chamadoUncheckedUpdateWithoutTipochamadoInput = {
    idChamado?: IntFieldUpdateOperationsInput | number
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idSolicitante?: NullableIntFieldUpdateOperationsInput | number | null
    idAnalista?: NullableIntFieldUpdateOperationsInput | number | null
    idStatus?: NullableIntFieldUpdateOperationsInput | number | null
    idPrioridade?: NullableIntFieldUpdateOperationsInput | number | null
    msgchamado?: msgchamadoUncheckedUpdateManyWithoutChamadoNestedInput
    notificacao?: notificacaoUncheckedUpdateManyWithoutChamadoNestedInput
  }

  export type chamadoUncheckedUpdateManyWithoutTipochamadoInput = {
    idChamado?: IntFieldUpdateOperationsInput | number
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idSolicitante?: NullableIntFieldUpdateOperationsInput | number | null
    idAnalista?: NullableIntFieldUpdateOperationsInput | number | null
    idStatus?: NullableIntFieldUpdateOperationsInput | number | null
    idPrioridade?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type usuarioCreateManyTipousuarioInput = {
    idUsuario?: number
    matricula: string
    nomeUsuario: string
    email: string
    senha: string
    dataCadastro?: Date | string
    ativo?: number
    ramal?: string | null
    fotoPerfil?: string | null
    idGerencia?: number | null
  }

  export type usuarioUpdateWithoutTipousuarioInput = {
    matricula?: StringFieldUpdateOperationsInput | string
    nomeUsuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: IntFieldUpdateOperationsInput | number
    ramal?: NullableStringFieldUpdateOperationsInput | string | null
    fotoPerfil?: NullableStringFieldUpdateOperationsInput | string | null
    chamado_chamado_idSolicitanteTousuario?: chamadoUpdateManyWithoutUsuario_chamado_idSolicitanteTousuarioNestedInput
    chamado_chamado_idAnalistaTousuario?: chamadoUpdateManyWithoutUsuario_chamado_idAnalistaTousuarioNestedInput
    logatividade?: logatividadeUpdateManyWithoutUsuarioNestedInput
    msgchamado?: msgchamadoUpdateManyWithoutUsuarioNestedInput
    notificacao?: notificacaoUpdateManyWithoutUsuarioNestedInput
    gerencia?: gerenciaUpdateOneWithoutUsuarioNestedInput
  }

  export type usuarioUncheckedUpdateWithoutTipousuarioInput = {
    idUsuario?: IntFieldUpdateOperationsInput | number
    matricula?: StringFieldUpdateOperationsInput | string
    nomeUsuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: IntFieldUpdateOperationsInput | number
    ramal?: NullableStringFieldUpdateOperationsInput | string | null
    fotoPerfil?: NullableStringFieldUpdateOperationsInput | string | null
    idGerencia?: NullableIntFieldUpdateOperationsInput | number | null
    chamado_chamado_idSolicitanteTousuario?: chamadoUncheckedUpdateManyWithoutUsuario_chamado_idSolicitanteTousuarioNestedInput
    chamado_chamado_idAnalistaTousuario?: chamadoUncheckedUpdateManyWithoutUsuario_chamado_idAnalistaTousuarioNestedInput
    logatividade?: logatividadeUncheckedUpdateManyWithoutUsuarioNestedInput
    msgchamado?: msgchamadoUncheckedUpdateManyWithoutUsuarioNestedInput
    notificacao?: notificacaoUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type usuarioUncheckedUpdateManyWithoutTipousuarioInput = {
    idUsuario?: IntFieldUpdateOperationsInput | number
    matricula?: StringFieldUpdateOperationsInput | string
    nomeUsuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    dataCadastro?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: IntFieldUpdateOperationsInput | number
    ramal?: NullableStringFieldUpdateOperationsInput | string | null
    fotoPerfil?: NullableStringFieldUpdateOperationsInput | string | null
    idGerencia?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type chamadoCreateManyUsuario_chamado_idSolicitanteTousuarioInput = {
    idChamado?: number
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura?: Date | string
    dataAtualizacao?: Date | string | null
    dataFechamento?: Date | string | null
    idAnalista?: number | null
    idTipoChamado?: number | null
    idStatus?: number | null
    idPrioridade?: number | null
  }

  export type chamadoCreateManyUsuario_chamado_idAnalistaTousuarioInput = {
    idChamado?: number
    protocolo: string
    assunto: string
    descricao: string
    dataAbertura?: Date | string
    dataAtualizacao?: Date | string | null
    dataFechamento?: Date | string | null
    idSolicitante?: number | null
    idTipoChamado?: number | null
    idStatus?: number | null
    idPrioridade?: number | null
  }

  export type logatividadeCreateManyUsuarioInput = {
    idLog?: number
    descricao: string
    dataHora?: Date | string | null
  }

  export type msgchamadoCreateManyUsuarioInput = {
    idMensagem?: number
    mensagem: string
    timestamp?: Date | string | null
    remetente: $Enums.msgchamado_remetente
    urlAnexo?: string | null
    nomeArquivo?: string | null
    idChamado: number
  }

  export type notificacaoCreateManyUsuarioInput = {
    idNotificacao?: number
    titulo: string
    mensagem: string
    lida?: number
    dataHora?: Date | string | null
    idChamado?: number | null
  }

  export type chamadoUpdateWithoutUsuario_chamado_idSolicitanteTousuarioInput = {
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usuario_chamado_idAnalistaTousuario?: usuarioUpdateOneWithoutChamado_chamado_idAnalistaTousuarioNestedInput
    tipochamado?: tipochamadoUpdateOneWithoutChamadoNestedInput
    statuschamado?: statuschamadoUpdateOneWithoutChamadoNestedInput
    prioridadechamado?: prioridadechamadoUpdateOneWithoutChamadoNestedInput
    msgchamado?: msgchamadoUpdateManyWithoutChamadoNestedInput
    notificacao?: notificacaoUpdateManyWithoutChamadoNestedInput
  }

  export type chamadoUncheckedUpdateWithoutUsuario_chamado_idSolicitanteTousuarioInput = {
    idChamado?: IntFieldUpdateOperationsInput | number
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idAnalista?: NullableIntFieldUpdateOperationsInput | number | null
    idTipoChamado?: NullableIntFieldUpdateOperationsInput | number | null
    idStatus?: NullableIntFieldUpdateOperationsInput | number | null
    idPrioridade?: NullableIntFieldUpdateOperationsInput | number | null
    msgchamado?: msgchamadoUncheckedUpdateManyWithoutChamadoNestedInput
    notificacao?: notificacaoUncheckedUpdateManyWithoutChamadoNestedInput
  }

  export type chamadoUncheckedUpdateManyWithoutUsuario_chamado_idSolicitanteTousuarioInput = {
    idChamado?: IntFieldUpdateOperationsInput | number
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idAnalista?: NullableIntFieldUpdateOperationsInput | number | null
    idTipoChamado?: NullableIntFieldUpdateOperationsInput | number | null
    idStatus?: NullableIntFieldUpdateOperationsInput | number | null
    idPrioridade?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type chamadoUpdateWithoutUsuario_chamado_idAnalistaTousuarioInput = {
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usuario_chamado_idSolicitanteTousuario?: usuarioUpdateOneWithoutChamado_chamado_idSolicitanteTousuarioNestedInput
    tipochamado?: tipochamadoUpdateOneWithoutChamadoNestedInput
    statuschamado?: statuschamadoUpdateOneWithoutChamadoNestedInput
    prioridadechamado?: prioridadechamadoUpdateOneWithoutChamadoNestedInput
    msgchamado?: msgchamadoUpdateManyWithoutChamadoNestedInput
    notificacao?: notificacaoUpdateManyWithoutChamadoNestedInput
  }

  export type chamadoUncheckedUpdateWithoutUsuario_chamado_idAnalistaTousuarioInput = {
    idChamado?: IntFieldUpdateOperationsInput | number
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idSolicitante?: NullableIntFieldUpdateOperationsInput | number | null
    idTipoChamado?: NullableIntFieldUpdateOperationsInput | number | null
    idStatus?: NullableIntFieldUpdateOperationsInput | number | null
    idPrioridade?: NullableIntFieldUpdateOperationsInput | number | null
    msgchamado?: msgchamadoUncheckedUpdateManyWithoutChamadoNestedInput
    notificacao?: notificacaoUncheckedUpdateManyWithoutChamadoNestedInput
  }

  export type chamadoUncheckedUpdateManyWithoutUsuario_chamado_idAnalistaTousuarioInput = {
    idChamado?: IntFieldUpdateOperationsInput | number
    protocolo?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    dataAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFechamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idSolicitante?: NullableIntFieldUpdateOperationsInput | number | null
    idTipoChamado?: NullableIntFieldUpdateOperationsInput | number | null
    idStatus?: NullableIntFieldUpdateOperationsInput | number | null
    idPrioridade?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type logatividadeUpdateWithoutUsuarioInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type logatividadeUncheckedUpdateWithoutUsuarioInput = {
    idLog?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type logatividadeUncheckedUpdateManyWithoutUsuarioInput = {
    idLog?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type msgchamadoUpdateWithoutUsuarioInput = {
    mensagem?: StringFieldUpdateOperationsInput | string
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remetente?: Enummsgchamado_remetenteFieldUpdateOperationsInput | $Enums.msgchamado_remetente
    urlAnexo?: NullableStringFieldUpdateOperationsInput | string | null
    nomeArquivo?: NullableStringFieldUpdateOperationsInput | string | null
    chamado?: chamadoUpdateOneRequiredWithoutMsgchamadoNestedInput
  }

  export type msgchamadoUncheckedUpdateWithoutUsuarioInput = {
    idMensagem?: IntFieldUpdateOperationsInput | number
    mensagem?: StringFieldUpdateOperationsInput | string
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remetente?: Enummsgchamado_remetenteFieldUpdateOperationsInput | $Enums.msgchamado_remetente
    urlAnexo?: NullableStringFieldUpdateOperationsInput | string | null
    nomeArquivo?: NullableStringFieldUpdateOperationsInput | string | null
    idChamado?: IntFieldUpdateOperationsInput | number
  }

  export type msgchamadoUncheckedUpdateManyWithoutUsuarioInput = {
    idMensagem?: IntFieldUpdateOperationsInput | number
    mensagem?: StringFieldUpdateOperationsInput | string
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remetente?: Enummsgchamado_remetenteFieldUpdateOperationsInput | $Enums.msgchamado_remetente
    urlAnexo?: NullableStringFieldUpdateOperationsInput | string | null
    nomeArquivo?: NullableStringFieldUpdateOperationsInput | string | null
    idChamado?: IntFieldUpdateOperationsInput | number
  }

  export type notificacaoUpdateWithoutUsuarioInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    lida?: IntFieldUpdateOperationsInput | number
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chamado?: chamadoUpdateOneWithoutNotificacaoNestedInput
  }

  export type notificacaoUncheckedUpdateWithoutUsuarioInput = {
    idNotificacao?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    lida?: IntFieldUpdateOperationsInput | number
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idChamado?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type notificacaoUncheckedUpdateManyWithoutUsuarioInput = {
    idNotificacao?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    lida?: IntFieldUpdateOperationsInput | number
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idChamado?: NullableIntFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}