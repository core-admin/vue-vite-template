/* eslint-disable @typescript-eslint/no-unused-vars */
import type { OmitDeep } from 'type-fest';

type Info = {
  userInfo: {
    name: string;
    uselessInfo: {
      foo: string;
    };
  };
};

type UsefulInfo = OmitDeep<Info, 'userInfo.uselessInfo'>;
// type UsefulInfo = {
//   userInfo: {
//     name: string;
//   };
// };

// Supports array
type A = OmitDeep<[1, 'foo', 2], 1>;
// type A = [1, unknown, 2];

// Supports recursing into array

type Info1 = {
  address: [
    {
      street: string;
    },
    {
      street2: string;
      foo: string;
    },
  ];
};
type AddressInfo = OmitDeep<Info1, 'address.1.foo'>;
