import { useEffect, useLayoutEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUnit } from "effector-react";
import { RoutesViewModel } from "./RoutesViewModel";
import { Route, RouteFilter } from "./types";

export function Routes({ viewModel }: { viewModel: RoutesViewModel }) {
  const routes = useUnit(viewModel.$routes);
  const isLoading = useUnit(viewModel.$isLoading);
  const error = useUnit(viewModel.$error);
  const filter = useUnit(viewModel.$filter);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => viewModel.events.openFavorites()}
          style={{ marginRight: 16 }}
        >
          <Text style={{ color: "#007AFF", fontSize: 16 }}>Obľúbené</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    viewModel.events.mounted();

    return () => {
      viewModel.events.unmounted();
    };
  }, []);

  const handleSearch = (text: string) => {
    viewModel.events.searchChanged(text);
  };

  const handleSortChange = (sortBy: "number" | "name" | "custom") => {
    viewModel.events.sortChanged(sortBy);
  };

  const renderItem = ({ item }: { item: Route }) => (
    <TouchableOpacity
      style={[styles.routeItem, { borderLeftColor: item.color || "#ccc" }]}
      onPress={() => viewModel.events.selectRoute(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.routeHeader}>
        <View
          style={[styles.routeBadge, { backgroundColor: item.color || "#ccc" }]}
        >
          <Text style={styles.routeNumber}>{item.number}</Text>
        </View>
        <Text style={styles.routeName}>{item.name}</Text>
      </View>

      <View style={styles.routeDetails}>
        <Text style={styles.routeEndpoints}>
          {item.startPoint} → {item.endPoint}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trasy</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Hľadať trasu"
          value={filter.searchText}
          onChangeText={handleSearch}
        />

        <View style={styles.sortButtons}>
          <TouchableOpacity
            style={[
              styles.sortButton,
              filter.sortBy === "number" && styles.sortButtonActive,
            ]}
            onPress={() => handleSortChange("number")}
          >
            <Text>Číslo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sortButton,
              filter.sortBy === "name" && styles.sortButtonActive,
            ]}
            onPress={() => handleSortChange("name")}
          >
            <Text>Názov</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loaderText}>Načítavam trasy...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => viewModel.events.retry()}
          >
            <Text style={styles.retryButtonText}>Skúsiť znova</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={routes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshing={isLoading}
          onRefresh={() => viewModel.events.loadRoutes()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenašli sa žiadne trasy</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  sortButtons: {
    flexDirection: "row",
  },
  sortButton: {
    flex: 1,
    padding: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    marginHorizontal: 4,
  },
  sortButtonActive: {
    backgroundColor: "#e0e0e0",
    borderColor: "#bbb",
  },
  listContent: {
    padding: 16,
  },
  routeItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: "hidden",
  },
  routeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  routeBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  routeNumber: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  routeName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  routeDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  routeEndpoints: {
    color: "#666",
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    color: "#e74c3c",
    marginBottom: 16,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#3498db",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  retryButtonText: {
    color: "#fff",
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 32,
  },
});
