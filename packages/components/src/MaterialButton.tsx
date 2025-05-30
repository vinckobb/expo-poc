import { Pressable } from "react-native";
import { classNameMerge } from "@monorepo/utils/src";
// import { Button } from "react-native-material/core";

import { Text } from "./Text";
import { Button } from "@react-native-material/core";

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
    className: "border border-solid border-primary-400 dark:border-white bg-blue-500",
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

export function MaterialButton({
  title,
  onPress,
  variant = "primary",
  className,
  textClassName,
}: Props) {
  return (
    <Button
        title={title}
        onPress={onPress}
        // color="blue"
        className={classNameMerge(variantStyles.default.className, variantStyles[variant].className, className)}
        // className="bg-blue-500 text-white"
      />
  );
}
