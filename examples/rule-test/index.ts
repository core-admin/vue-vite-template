/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ExtractPropTypes,
  ExtractDefaultPropTypes,
  ExtractPublicPropTypes,
  CSSProperties,
} from 'vue';

export const spinProps = {
  contentClass: String,
  contentStyle: [Object, String] as PropType<CSSProperties | string>,
  description: String,
  stroke: String,
  size: {
    type: [String, Number] as PropType<'small' | 'medium' | 'large' | number>,
    default: 'medium',
  },
  show: {
    type: Boolean,
    default: true,
  },
  strokeWidth: Number,
  rotate: {
    type: Boolean,
    default: true,
  },
  spinning: {
    type: Boolean,
    validator: () => {
      return true;
    },
    default: undefined,
  },
  delay: Number,
};

type SpinProps = ExtractPropTypes<typeof spinProps>;

const propsOptions = {
  foo: String,
  foo2: Boolean,
  bar: {
    type: Boolean,
    required: true,
  },
  baz: {
    type: Number,
    default: 1,
  },
  qux: Number,
  qux2: Boolean,
} as const;

type Props = ExtractPropTypes<typeof propsOptions>;

type Props2 = ExtractPublicPropTypes<typeof propsOptions>;
