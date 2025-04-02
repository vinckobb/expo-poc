import { StyleSheet } from "react-native";
import MapView, { Marker, UrlTile } from "react-native-maps";

const POIS = [
  {
    id: "1",
    title: "Hlavné námestie",
    description: "Main square of Bratislava",
    coordinate: { latitude: 48.143889, longitude: 17.109722 },
  },
  {
    id: "2",
    title: "Bratislavský hrad",
    description: "Bratislava Castle",
    coordinate: { latitude: 48.141944, longitude: 17.100833 },
  },
  {
    id: "3",
    title: "Most SNP",
    description: "Bridge with UFO tower",
    coordinate: { latitude: 48.138889, longitude: 17.104722 },
  },
];

export function Map({ onMarkerPress }: { onMarkerPress: () => void }) {
  return (
    <MapView
      style={StyleSheet.absoluteFill}
      initialRegion={{
        latitude: 48.143,
        longitude: 17.107,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      showsUserLocation
      showsMyLocationButton
    >
      <UrlTile
        urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maximumZ={19}
        flipY={false}
      />

      {POIS.map((poi) => (
        <Marker
          key={poi.id}
          coordinate={poi.coordinate}
          title={poi.title}
          description={poi.description}
          onPress={onMarkerPress}
        />
      ))}
    </MapView>
  );
}
