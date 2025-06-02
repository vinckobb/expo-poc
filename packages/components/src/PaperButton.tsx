import { Button } from "react-native-paper";
import { cssInterop, remapProps } from "nativewind";
import { classNameMerge } from "@monorepo/utils";

type Variant = 'default' | 'primary' | 'secondary';

type ButtonVariant = {
  className: string;
  textClassName: string;
};

const variantStyles: Record<Variant, ButtonVariant> = {
  default: {
    className: "py-4 px-6 rounded-none border-4 border-red",
    textClassName: "text-center font-bold",
  },
  primary: {
    className: "bg-blue-400 dark:bg-white",
    textClassName: "text-white dark:text-blue-400",
  },
  secondary: {
    className: "border-none border-solid border-blue-400 dark:border-white",
    textClassName: "text-blue-400 dark:text-white",
  }
};

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  className?: string;
  textClassName?: string;
};

type EnhancedButtonProps = React.ComponentProps<typeof Button> & 
{
  contentClassName?: string;
  className?: string;
};

const EnhancedButton = Button as React.ForwardRefExoticComponent<EnhancedButtonProps>;

remapProps(Button, {
  className: "style",
  contentClassName: "contentStyle",
});

cssInterop(Button, {
  className: "style",
  contentClassName: "contentStyle",
});

export function PapButton({
  title,
  onPress,
  variant = "primary",
  className,
}: ButtonProps) {
  return (
      <EnhancedButton
        onPress={onPress}
        labelStyle={{ color: "white" }}
        mode="outlined"
        className={classNameMerge(
          variantStyles.default.className,
          variantStyles[variant].className,
          className
        )}
        contentClassName="bg-blue-400"
      >
        {title}
      </EnhancedButton>
  )

}
