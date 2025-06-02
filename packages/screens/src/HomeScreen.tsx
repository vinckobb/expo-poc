import { ScrollView, View } from "react-native";
import { Header, Section, Card, Text, Button, Theme } from "@monorepo/components";
import { Button as PaperButton } from "react-native-paper";
import { PapButton } from "components/src/PaperButton";

export function HomeScreen() {


  return (
    <View className="dark:bg-secondary-500 flex" style={{ flex: 1 }}>
      <Header title="Home" />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
          gap: 24,
        }}
      >

        <PaperButton
          mode="outlined"
          onPress={() => { }}
          style={{ backgroundColor: "#1d4ed8" }}
          labelStyle={{ color: "white" }}
        >
          Klikni ma
        </PaperButton>

        <View className="bg-red-500 p-2 rounded-lg">
          <PaperButton
            mode="contained"
            onPress={() => console.log("Klik!")}
            labelStyle={{ color: "white" }}
            style={{ backgroundColor: "transparent" }} // alebo žiadny background, nech sa vidí obal
          >
            Klikni ma
          </PaperButton>
        </View>

        <PapButton
          title="Press me too Now"
          variant="primary"
          onPress={() => console.log("Pressed!")}
        />

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
            <Button title="Do something" onPress={() => alert("Action!")} />
          </Card>

          <Card variant="secondary">
            <Text variant="subtitle" style={{ marginBottom: 8 }}>
              Another Thing
            </Text>
            <Button
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
              <Button
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
              <Button
                title="Christmas button"
                className="mb-4"
                variant="primary"
                onPress={() => alert("Christmas action")}
              />
              <Theme name="brand">
                <Button
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
