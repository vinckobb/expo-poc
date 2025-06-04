import { Button, ButtonProps as PaperButtonProps } from "react-native-paper";
import { cssInterop, remapProps } from "nativewind";
import { classNameMerge } from "@monorepo/utils";
// import { $Omit } from 'react-native-paper/lib/typescript/types';

type Variant = 'default' | 'filled' | 'outlined' | 'text';

type ButtonVariant = {
  className: string;
  labelClassName: string;
  contentClassName?: string;
  mode?: 'contained' | 'outlined' | 'text';
};

const variantStyles: Record<Variant, ButtonVariant> = {
  default: {
    className: "rounded-full",
    labelClassName: "text-xl",
    contentClassName: "px-1.5 py-0.625",
  },
  filled: {
    className: "bg-blue-400 disabled:bg-grey-blue-200",
    labelClassName: "text-white disabled:grey-blue-900",
    mode: "contained",
  },
  outlined: {
    className: "border-1 border-blue-400",
    labelClassName: "text-blue-500",
    mode: "outlined",
  },
  text: {
    className: "",
    labelClassName: "text-blue-500",
    mode: "text",
  }
};

type ButtonProps = Pick<PaperButtonProps, Exclude<keyof PaperButtonProps, 'children'>> & 
{
  title: string;
  onPress: () => void;
  variant?: Variant;
  className?: string;
  labelClassName?: string;
};

type EnhancedButtonProps = PaperButtonProps & 
{
  contentClassName?: string;
  labelClassName?: string;
};

const EnhancedButton = Button as React.ForwardRefExoticComponent<EnhancedButtonProps>;

remapProps(Button, {
  className: "style",
  contentClassName: "contentStyle",
  labelClassName: "labelStyle",
});

cssInterop(Button, {
  className: "style",
  contentClassName: "contentStyle",
  labelClassName: "labelStyle",
});

export function PapButton({
  title,
  onPress,
  variant = "filled",
  className,
  icon,
  ...rest
}: ButtonProps) {
  return (
      <EnhancedButton
        icon={icon}
        onPress={onPress}
        mode={variantStyles[variant].mode}
        className={classNameMerge(
          variantStyles.default.className,
          variantStyles[variant].className,
          className
        )}
        labelClassName={classNameMerge(
          variantStyles.default.labelClassName,
          variantStyles[variant].labelClassName
        )}
        contentClassName={classNameMerge(
          variantStyles.default.contentClassName,
          variantStyles[variant].contentClassName
        )}
        {...rest}
      >
        {title}
      </EnhancedButton>
  )

}
