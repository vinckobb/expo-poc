import { ReactNode } from "react";

import { Text } from "./Text";
import { View } from "./View";

type Props = {
  title: string;
  children: ReactNode;
};

export function Section({ title, children }: Props) {
  return (
    <View className="mb-8">
      <Text variant="subtitle" className="mb-4">
        {title} - test
      </Text>
      {children}
    </View>
  );
}
