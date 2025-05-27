import { Text, TextProps } from "react-native";

type Props = TextProps & {
    children: React.ReactNode;
};

export function PlatformSpecific({ children, ...rest }: Props) {
  return <Text {...rest}>{children} - default platform</Text>;
}
