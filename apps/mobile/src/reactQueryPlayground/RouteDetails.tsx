import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useUnit } from "effector-react";
import { RouteDetailsViewModel } from "./RouteDetailsViewModel";
import { Route } from "./types";

export function RouteDetails({
  viewModel,
}: {
  viewModel: RouteDetailsViewModel;
}) {
  const route = useUnit(viewModel.$route);
  const isLoading = useUnit(viewModel.$isLoading);
  const error = useUnit(viewModel.$error);
  const isFavorite = useUnit(viewModel.$isFavorite);
  const isTogglingFavorite = useUnit(viewModel.$isTogglingFavorite);

  useEffect(() => {
    viewModel.events.mounted();

    return () => {
      viewModel.events.unmounted();
    };
  }, []);

  const handleRetry = () => {
    viewModel.events.retry();
  };

  const handleToggleFavorite = () => {
    viewModel.events.toggleFavorite();
  };

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loaderText}>Načítavam detaily trasy...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={handleRetry}>
          <Text style={styles.buttonText}>Skúsiť znova</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!route) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>Trasa nebola nájdená</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, { backgroundColor: route.color }]}>
        <View style={styles.routeNumberContainer}>
          <Text style={styles.routeNumber}>{route.number}</Text>
        </View>
        <Text style={styles.routeName}>{route.name}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informácie o trase</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Začiatok:</Text>
            <Text style={styles.infoValue}>{route.startPoint}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Koniec:</Text>
            <Text style={styles.infoValue}>{route.endPoint}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Číslo trasy:</Text>
            <Text style={styles.infoValue}>{route.number}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, isFavorite && styles.removeButton]}
            onPress={handleToggleFavorite}
            disabled={isTogglingFavorite}
          >
            {isTogglingFavorite ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {isFavorite ? "Odstrániť z obľúbených" : "Pridať do obľúbených"}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => viewModel.events.openFavorites()}
          >
            <Text style={styles.secondaryButtonText}>Zobraziť obľúbené</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  routeNumberContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  routeNumber: {
    fontSize: 24,
    fontWeight: "bold",
  },
  routeName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoLabel: {
    width: 100,
    fontWeight: "500",
    color: "#666",
  },
  infoValue: {
    flex: 1,
    fontWeight: "400",
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: "#e74c3c",
  },
  secondaryButton: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  secondaryButtonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
  },
  loaderText: {
    marginTop: 10,
    color: "#666",
    fontSize: 16,
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});
