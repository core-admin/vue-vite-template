/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Opaque, UnwrapOpaque, Tagged, GetTagMetadata } from 'type-fest';

type AccountNumber = Opaque<number, 'AccountNumber'>;
type AccountBalance = Opaque<number, 'AccountBalance'>;

/**
 * Token "参数允许编译器区分不同类型，而 "unknown "则不能。例如，请考虑以下结构：
 */

type ThingOne = Opaque<string>;
type ThingTwo = Opaque<string>;

// 对于编译器来说，这些类型可以互相转换，因为它们具有相同的底层类型。它们都是 `string & { __opaque__: unknown }`。
// 为避免出现这种情况，可以像这样传递 "令牌 "参数。
type NewThingOne = Opaque<string, 'ThingOne'>;
type NewThingTwo = Opaque<string, 'ThingTwo'>;

// 现在它们是完全独立的类型，因此下面的代码将无法编译。
function createNewThingOne(): NewThingOne {
  // 正如您所看到的，仍然允许从字符串进行转换。但是，不能将 NewThingOne 转换为 NewThingTwo，反之亦然。
  return 'new thing one' as NewThingOne;
}

// 这将导致编译失败，因为它们在本质上是不同的类型。
const thingTwo = createNewThingOne() as NewThingTwo;

// 下面是另一个不透明键入的例子。
function createAccountNumber(): AccountNumber {
  return 2 as AccountNumber;
}

function getMoneyForAccount(accountNumber: AccountNumber): AccountBalance {
  return 4 as AccountBalance;
}
// 这将成功编译。
getMoneyForAccount(createAccountNumber());

// 但这不会，因为必须明确地以 `AccountNumber` 类型传递。
getMoneyForAccount(2);

// 您可以使用不透明的值，就像它们也不是不透明的一样。
const accountNumber = createAccountNumber();

// 这将成功编译。
const newAccountNumber = accountNumber + 2;

// 顺便提一句，你可以（也应该）在不透明类型中使用递归类型，使它们更强大，也更容易键入。
type Person = {
  id: Opaque<number, Person>;
  name: string;
};

const person: Person = {
  id: 1,
  name: 'Jon Snow',
};

/**
 * Opaque 类型是 type-fest 包提供的一种工具，用于创建不透明类型。
 * 不透明类型是一种类型安全的封装技术，它允许你创建一个特定的类型，这个类型与其它类型不兼容，即使它们底层的结构是相同的。
 * 这种技术可以用来创建更加类型安全的代码，防止类型之间的错误混用。
 *
 * 在 TypeScript 中，类型别名和接口默认是结构化的，意味着类型的兼容性是通过它们的结构来决定的，而不是它们的名称。
 * 这种特性在很多情况下是有用的，但在某些情况下，你可能希望创建一种类型，它只能通过特定的函数或方法来创建，而不能与其它相同结构的类型混用。这就是 Opaque 类型的用武之地。
 *
 * 在以上代码中，定义了一个 Person 类型，它有一个 id 属性和一个 name 属性。
 * id 的类型是 Opaque<number, Person>，这意味着 id 是一个基于 number 的不透明类型。
 * 尽管 id 在底层是一个数字，但你不能简单地将任意的 number 赋值给它，也不能将它赋值给任意的 number 类型的变量。
 * 这样做的目的是确保 id 只能通过特定的方式来创建和使用，从而增强类型安全。
 */

/**
 * 一个具体的使用场景是，当你想确保某些数据只能通过特定的函数来创建或修改时，不透明类型非常有用。
 * 例如，如果你有一个表示用户ID的类型，你可能不希望开发者直接使用数字来代表用户ID，而是希望他们通过一个函数来创建或验证用户ID。
 * 这样可以避免错误地将一个不正确的数字用作用户ID，或者将用户ID用于不应该使用它的地方。
 */

// 假设有一个函数用于创建Person的id
function createPersonId(id: number): Opaque<number, Person> {
  return id as Opaque<number, Person>;
}

// 使用这个函数来创建一个Person的id
const personId = createPersonId(123);

// 然后使用这个id来创建一个Person
const _person: Person = {
  id: personId, // 正确
  name: 'Alice',
};

// 直接使用number类型的值赋值将会导致类型错误
const wrongPerson: Person = {
  id: 456, // 类型错误
  name: 'Bob',
};

// 通过这种方式，Opaque 类型帮助你创建了一个更加类型安全的接口，使得代码更加健壮，减少了因类型错误导致的bug。

/**
 * 通过删除只读的 `[tag]`，将不透明或带标记的类型还原为原始类型。
 *
 * 为什么需要这样做？
 * 1.使用不透明类型作为对象键
 * 2.防止出现 TS4058 错误："导出函数的返回类型已经或正在使用来自外部模块 Y 的名称 X，但无法命名"。
 */

type AccountType = Opaque<'SAVINGS' | 'CHECKING', 'AccountType'>;

const moneyByAccountType: Record<UnwrapOpaque<AccountType>, number> = {
  SAVINGS: 99,
  CHECKING: 0.1,
};

// 如果没有 UnwrapOpaque，下面的表达式将产生类型错误。
const money = moneyByAccountType.SAVINGS; // TS error: Property 'SAVINGS' does not exist

// 如果试图向 UnwrapOpaque 传递非不透明类型，将引发类型错误。
type WontWork = UnwrapOpaque<string>;

// Using a Tagged type will work too.
type WillWork = UnwrapOpaque<Tagged<number, 'AccountNumber'>>; // number

// ------------------------------------------------------------------------------------------------
