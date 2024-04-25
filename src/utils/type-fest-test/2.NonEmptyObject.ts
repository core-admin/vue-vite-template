/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NonEmptyObject } from 'type-fest';

type User = {
  name: string;
  surname: string;
  id: number;
};

type UpdateRequest<Entity extends object> = NonEmptyObject<Partial<Entity>>;

const update1: UpdateRequest<User> = {
  name: 'Alice',
  surname: 'Acme',
};

const update2: UpdateRequest<User> = {
  name: 'Alice',
};

const update3: UpdateRequest<User> = {};

/**
 * 将 `T` 中的所有属性设置为可选的，但至少需要一个属性。
 */
