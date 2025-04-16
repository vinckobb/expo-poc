import { ScrollView, View } from "react-native";
import { ButtonGluestack, ButtonText, Header } from "@monorepo/components";

export function GluestackDemoScreen() {

  return (
    <View className="dark:bg-secondary-500" style={{flex: 1}}>
      <Header title="Gluestack" />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <ButtonGluestack>
            <ButtonText>Test</ButtonText>
        </ButtonGluestack>
      </ScrollView>
    </View>
  );
}
