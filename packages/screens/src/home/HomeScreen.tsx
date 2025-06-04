import { SafeAreaView } from "react-native";
import { Map } from "@monorepo/components/map";
import { HomeViewModel } from "./HomeViewModel";

type HomeProps = {
  viewModel: HomeViewModel;
};

export default function Home({ viewModel }: HomeProps) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Map onMarkerPress={() => viewModel.onActionButton()} />
    </SafeAreaView>
  );
}
