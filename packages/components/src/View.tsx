import { View as ReactNativeView, ViewProps as RNViewProps } from "react-native";
import { cssInterop } from "nativewind";
import { classNameMerge } from "@monorepo/utils";
import React from "react";

interface ViewProps extends RNViewProps {
  children: React.ReactNode;
  className?: string;
}

cssInterop(ReactNativeView, {
  className: "style",
});

export const View = React.forwardRef<React.ElementRef<typeof ReactNativeView>, ViewProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <ReactNativeView
        ref={ref}
        className={classNameMerge(className)}
        {...props}
      >
        {children}
      </ReactNativeView>
    );
  }
);

View.displayName = "View";
