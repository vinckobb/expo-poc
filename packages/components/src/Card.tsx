import { ReactNode } from "react";

import { View } from "./View";
import {classNameMerge} from "@monorepo/utils/src";

type Variant = 'default' | 'primary' | 'secondary';

const variantStyles: Record<Variant, string> = {
  default: "p-4 rounded-lg shadow-lg",
  primary: "bg-white dark:bg-green-600",
  secondary: "bg-blue-200 dark:bg-green-600",
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export function Card({ children, variant = 'primary', className = '' }: Props) {

  return (
    <View className={classNameMerge(variantStyles.default, variantStyles[variant], className)}>
      {children}
    </View>
  );
}
