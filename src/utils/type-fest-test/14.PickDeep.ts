/* eslint-disable @typescript-eslint/no-unused-vars */
import type { PickDeep, PartialDeep } from 'type-fest';

type Configuration = {
  userConfig: {
    name: string;
    age: number;
    address: [
      {
        city1: string;
        street1: string;
      },
      {
        city2: string;
        street2: string;
      },
    ];
  };
  otherConfig: any;
};

type NameConfig = PickDeep<Configuration, 'userConfig.name'>;

// type NameConfig = {
//   userConfig: {
//     name: string;
//   };
// };

// Supports optional properties
type User = PickDeep<PartialDeep<Configuration>, 'userConfig.name' | 'userConfig.age'>;

// type User = {
//   userConfig?: {
//     name?: string;
//     age?: number;
//   };
// };

// Supports array
type AddressConfig = PickDeep<Configuration, 'userConfig.address.0'>;

// type AddressConfig = {
//   userConfig: {
//     address: [
//       {
//         city1: string;
//         street1: string;
//       },
//     ];
//   };
// };

// Supports recurse into array
type Street = PickDeep<Configuration, 'userConfig.address.1.street2'>;
// type Street = {
//   userConfig: {
//     address: [unknown, { street2: string }];
//   };
// };
