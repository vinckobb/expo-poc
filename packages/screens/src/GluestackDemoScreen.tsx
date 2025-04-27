import { ScrollView, View } from "react-native";
import { Button, ButtonText, Header } from "@monorepo/components";

export function GluestackDemoScreen() {

  return (
    <View className="dark:bg-secondary-500" style={{flex: 1}}>
      <Header title="Gluestack" />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Button size="md" variant="solid" action="primary">
          <ButtonText>Hello World!</ButtonText>
        </Button>
      </ScrollView>
    </View>
  );
}
