import { ScrollView, View } from "react-native";
import { Header, Section, Card, Text, LegacyButton, Theme } from "@monorepo/components";

export function HomeScreen() {
  return (
    <View className="dark:bg-secondary-500 flex" style={{flex: 1}}>
      <Header title="Home" />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
          gap: 24,
        }}
      >
        <Section title="Welcome">
          <Card>
            <Text variant="body">
              This is a sample home screen. You can build whatever you want
              here.
            </Text>
          </Card>
        </Section>

        <Section title="Actions">
          <Card className="mb-6">
            <Text variant="subtitle" className="mb-4">
              Quick Action
            </Text>
            <LegacyButton title="Do something" onPress={() => alert("Action!")} />
          </Card>

          <Card variant="secondary">
            <Text variant="subtitle" style={{ marginBottom: 8 }}>
              Another Thing
            </Text>
            <LegacyButton
              title="Press me too"
              variant="secondary"
              onPress={() => alert("Secondary action")}
            />
          </Card>
        </Section>

        <Theme name="brand">
          <Section title="Themed section with brand">
            <Card>
              <Text variant="body">
                This section is in brand colors
              </Text>
              <LegacyButton
                title="Branded button"
                variant="primary"
                onPress={() => alert("Branded action")}
              />
            </Card>
          </Section>
        </Theme>

        <Theme name="christmas">
          <Section title="Themed section with christmas">
            <Card>
              <Text variant="body">
                This section is in christmas colors
              </Text>
              <LegacyButton
                title="Christmas button"
                className="mb-4"
                variant="primary"
                onPress={() => alert("Christmas action")}
              />
              <Theme name="brand">
                <LegacyButton
                  title="Brand button inside christmas theme"
                  variant="primary"
                  onPress={() => alert("Christmas action")}
                />
              </Theme>
            </Card>
          </Section>
        </Theme>
      </ScrollView>
    </View>
  );
}
