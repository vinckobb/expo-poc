import { Pressable } from "react-native";
import { classNameMerge } from "@monorepo/utils/src";

import { Text } from "./Text";

type Variant = 'default' | 'primary' | 'secondary';

type ButtonVariant = {
  className: string;
  textClassName: string;
};

const variantStyles: Record<Variant, ButtonVariant> = {
  default: {
    className: "p-4 rounded-full",
    textClassName: "text-center",
  },
  primary: {
    className: "bg-blue-600 dark:bg-gray-100",
    textClassName: "text-white dark:text-black",
  },
  secondary: {
    className: "border border-solid border-blue-600 dark:border-gray-100",
    textClassName: "text-blue-600 dark:text-white",
  }
};

type Props = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  className?: string;
  textClassName?: string;
};

export function Button({
  title,
  onPress,
  variant = "primary",
  className,
  textClassName,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={classNameMerge(variantStyles.default.className, variantStyles[variant].className, className)}
    >
      <Text className={classNameMerge(variantStyles.default.textClassName, variantStyles[variant].textClassName, textClassName)}>{title}</Text>
    </Pressable>
  );
}
