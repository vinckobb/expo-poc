import { Text as RNText, TextProps, TextStyle } from "react-native";
import { StyleProp } from "react-native";
import {classNameMerge} from "@monorepo/utils/src";

type Variant = 'title' | 'subtitle' | 'body';

const variantStyles: Record<Variant, string> = {
  title: "text-2xl font-bold text-black dark:text-white",
  subtitle: "text-xl font-semibold text-black dark:text-white",
  body: "text-black dark:text-white",
};

type Props = TextProps & {
  variant?: Variant;
  style?: StyleProp<TextStyle>;
};

export function Text({ variant = "body", className = '', ...props }: Props) {
  return <RNText className={classNameMerge(variantStyles[variant], className)} {...props} />;
}
