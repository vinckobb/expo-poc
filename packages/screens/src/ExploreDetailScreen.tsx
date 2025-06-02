import { ScrollView, View } from "react-native";
import { Button, Card, Header, Section, Text } from "@monorepo/components";

export function ExploreDetailScreen() {
  return (
    <View className="dark:bg-green-500" style={{flex: 1}}>
      <Header title="POI Detail" />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Section title="Place Info">
          <Card>
            <Text variant="title" style={{ marginBottom: 8 }}>
              Central Park
            </Text>
            <Text variant="body" style={{ marginBottom: 4 }}>
              📍 New York City, NY
            </Text>
            <Text variant="body">
              A large public park in the middle of Manhattan. Great for walking,
              relaxing, and taking in some fresh air.
            </Text>
          </Card>
        </Section>

        <Section title="Actions">
          <Card>
            <Button
              title="Open in Maps"
              onPress={() => alert("Opening map...")}
              variant="primary"
            />
          </Card>
        </Section>
      </ScrollView>
    </View>
  );
}
