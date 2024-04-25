import { ExtractPropTypes, CSSProperties, defineComponent } from 'vue';

type RemoveReadonly<T> = {
  -readonly [key in keyof T]: T[key];
};

export type ExtractPublicPropTypes<T> = Partial<RemoveReadonly<ExtractPropTypes<T>>>;

export type ExtractInternalPropTypes<T> = Partial<ExtractPropTypes<T>>;

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

export type SpinProps = ExtractPublicPropTypes<typeof spinProps>;

export default defineComponent({
  name: 'Spin',
  props: spinProps,
  setup() {
    return () => {
      return <div>Spin</div>;
    };
  },
});
