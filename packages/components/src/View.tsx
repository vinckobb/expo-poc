import { View as ReactNativeView, ViewProps as RNViewProps } from "react-native";
import React from "react";

interface ViewProps extends RNViewProps {
  children: React.ReactNode;
  className?: string;
}

export const View = React.forwardRef<React.ElementRef<typeof ReactNativeView>, ViewProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <ReactNativeView
        ref={ref}
        className={className}
        {...props}
      >
        {children}
      </ReactNativeView>
    );
  }
);

View.displayName = "View";
