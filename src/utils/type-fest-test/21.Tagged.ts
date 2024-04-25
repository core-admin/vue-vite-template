/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetTagMetadata, Tagged, UnwrapTagged } from 'type-fest';

/**
 * 为任意类型附加 "标签"。这样就可以为程序中的不同概念创建不可互相赋值的不同类型，即使它们的运行时值具有相同的类型，也不应该互换。(参见示例。）
 *
 * 由 `Tagged` 返回的类型可以再次传递给 `Tagged`，以创建具有多个标记的类型。
 * [阅读更多关于标签类型的信息。](https://medium.com/@KevinBGreene/surviving-the-typescript-ecosystem-branding-and-type-tagging-6cf6e516523d)
 *
 * 标签的名称通常是一个字符串（必须是字符串、数字或符号），但标签的每个应用也可以包含一个任意类型作为其 "元数据"。有关示例和解释，请参见 {@link GetTagMetadata}。
 *
 * 由 "标签 "返回的类型 "A "可以分配给由 "标签 "返回的另一个类型 "B"，当且仅当- `A` 的底层（无标记）类型可分配给 `B` 的底层类型； - `A` 至少包含 `B` 的所有标记； - `A` 的每个标记的元数据类型可分配给 `B` 对应标记的元数据类型。
 */

type AccountNumber = Tagged<number, 'AccountNumber'>;
type AccountBalance = Tagged<number, 'AccountBalance'>;

function createAccountNumber(): AccountNumber {
  // 可以看到，从 "数字"（被标记的底层类型）进行转换是允许的。
  return 2 as AccountNumber;
}

function getMoneyForAccount(accountNumber: AccountNumber): AccountBalance {
  return 4 as AccountBalance;
}

// 这将成功编译。
getMoneyForAccount(createAccountNumber());

// 但这不会，因为它必须作为“AccountNumber”类型显式传递！
// 至关重要的是，您不能意外地将“AccountBalance”用作“AccountNumber”。
getMoneyForAccount(2);

// 您也可以像使用底层无标记类型一样使用标记值。
// 也就是说，这将成功编译，因为 `AccountNumber` 可以用作普通的 `number` 。
// 从这个意义上说，底层的基本类型并没有被隐藏，这也是标记类型与其他语言中不透明类型的区别所在。
const accountNumber = createAccountNumber() + 2;

// ----------------------------------------------

// 通过重复使用 `Tagged` 可以对一个类型应用多个标记。
type Url = Tagged<string, 'URL'>;
type SpecialCacheKey = Tagged<Url, 'SpecialCacheKey'>;

// 您也可以传递标签名称的组合，因此这与上述方法等效，不过它不能为每个标签分配不同的元数据。
type SpecialCacheKey2 = Tagged<string, 'URL' | 'SpecialCacheKey'>;

// ----------------------------------------------

/**
 * 给定一个类型和一个标记名，返回该类型上与该标记相关的元数据。
 * 在下面的示例中，我们可以使用 `Tagged<string, 'JSON'>` 来表示 "一个有效的 JSON 字符串"。
 * 这种类型可能很有用--例如，它表明该值可以安全地传递给 `JSON.parse`，而不会抛出异常。
 * 然而，它并没有说明解析时会产生什么类型的值（有时是已知的）。`JsonOf<T>` 解决了这个问题；它表示 "一个有效的 JSON 字符串，如果解析，将产生一个 T 类型的值"。T 类型保存在与`'JSON'`标记相关联的元数据中
 */

type JsonOf<T> = Tagged<string, 'JSON', T>;

function stringify<T>(it: T) {
  return JSON.stringify(it) as JsonOf<T>;
}

function parse<T extends JsonOf<unknown>>(it: T) {
  return JSON.parse(it) as GetTagMetadata<T, 'JSON'>;
}

const x = stringify({ hello: 'world' });
const parsed = parse(x); // The type of `parsed` is { hello: string }

// ----------------------------------------------

/**
 * 通过删除所有标记，将标记类型还原为原始类型。
 * 为什么需要这样做？
 *   1.使用 "标记 "类型作为对象键
 *   2.防止出现 TS4058 错误："导出函数的返回类型已经或正在使用来自外部模块 Y 的名称 X，但无法命名"。
 */

type AccountType = Tagged<'SAVINGS' | 'CHECKING', 'AccountType'>;

const moneyByAccountType: Record<UnwrapTagged<AccountType>, number> = {
  SAVINGS: 99,
  CHECKING: 0.1,
};

// 如果没有 UnwrapTagged，下面的表达式就会出现类型错误。
const money = moneyByAccountType.SAVINGS; // TS error: Property 'SAVINGS' does not exist

// 如果试图向 UnwrapTagged 传递非标记类型，将引发类型错误。
type WontWork = UnwrapTagged<string>;

// ----------------------------------------------

/**
 * Opaque 类型与 Tagged 类型差异：
 *
 * 实现机制：
 *   Opaque 类型通过创建一个基于原始类型但添加了额外约束的新类型来实现，这种约束通常是不可见的，并且只能通过特定的方式来创建或操作；
 *   而 Tagged 类型通过向原始类型添加一个可见的、字面量类型的标记来实现类型的区分。
 * 用途：
 *   虽然两者都用于增加类型安全，但 Opaque 类型更侧重于创建一个从逻辑上与原始类型完全不同的新类型，这个新类型的创建和使用都受到严格控制；
 *   Tagged 类型则更侧重于在类型层面上区分那些结构上相似但逻辑上应当区分的类型。
 * 可见性：
 *   Opaque 类型的特殊标记或约束对使用者是不可见的，只有通过特定的构造函数或方法才能创建或操作；
 *   而 Tagged 类型的标记属性是可见的，且通常需要在创建对象时显式指定。
 */
