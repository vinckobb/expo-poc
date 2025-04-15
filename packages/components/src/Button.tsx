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
    className: "py-4 px-6 rounded-md",
    textClassName: "text-center font-bold",
  },
  primary: {
    className: "bg-primary-400 dark:bg-white",
    textClassName: "text-white dark:text-primary-400",
  },
  secondary: {
    className: "border border-solid border-primary-400 dark:border-white",
    textClassName: "text-primary-400 dark:text-white",
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
