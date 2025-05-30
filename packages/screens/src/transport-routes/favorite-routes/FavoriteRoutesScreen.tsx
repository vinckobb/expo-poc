import React, { useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "@react-navigation/native";
import { useUnit } from "effector-react";
import { FavoriteRoutesViewModel } from "./FavoriteRoutesViewModel";
import {FavoriteRouteResponse} from "@monorepo/data-access";

export function FavoriteRoutesScreen({
  viewModel,
}: {
  viewModel: FavoriteRoutesViewModel;
}) {
  const { t } = useTranslation();
  const routes = useUnit(viewModel.$routes);
  const isLoading = useUnit(viewModel.$isLoading);
  const error = useUnit(viewModel.$error);
  const filter = useUnit(viewModel.$filter);

  useEffect(() => {
    viewModel.events.mounted();

    return () => {
      viewModel.events.unmounted();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      viewModel.events.focused();
      return () => {};
    }, [])
  );

  const renderItem = ({ item }: { item: FavoriteRouteResponse }) => (
    <TouchableOpacity
      style={[
        styles.routeItem,
        { borderLeftColor: item.route.color || "#ccc" },
      ]}
      onPress={() => viewModel.events.routeSelected(item.routeId)}
    >
      <View style={styles.routeHeader}>
        <View
          style={[
            styles.routeBadge,
            { backgroundColor: item.route.color || "#ccc" },
          ]}
        >
          <Text style={styles.routeNumber}>{item.route.number}</Text>
        </View>
        <Text style={styles.routeName}>{item.route.name}</Text>
      </View>

      <View style={styles.routeDetails}>
        <Text style={styles.routeEndpoints}>
          {item.route.startPoint} → {item.route.endPoint}
        </Text>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => viewModel.events.removeFavorite(item.id)}
        >
          <Text style={styles.favoriteButtonText}>✓</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('favorite-routes.label.favorite-routes')}</Text>

        <TextInput
          style={styles.searchInput}
          placeholder={t('favorite-routes.placeholder.search-route')}
          value={filter.searchText}
          onChangeText={(text) => viewModel.events.searchChanged(text)}
        />

        <View style={styles.sortButtons}>
          <TouchableOpacity
            style={[
              styles.sortButton,
              filter.sortBy === "number" && styles.sortButtonActive,
            ]}
            onPress={() => viewModel.events.sortChanged("number")}
          >
            <Text>{t('favorite-routes.label.route-number')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sortButton,
              filter.sortBy === "name" && styles.sortButtonActive,
            ]}
            onPress={() => viewModel.events.sortChanged("name")}
          >
            <Text>{t('favorite-routes.label.route-name')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sortButton,
              filter.sortBy === "custom" && styles.sortButtonActive,
            ]}
            onPress={() => viewModel.events.sortChanged("custom")}
          >
            <Text>{t('favorite-routes.label.custom')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loaderText}>{t('favorite-routes.label.route-loading')}</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => viewModel.events.retry()}
          >
            <Text style={styles.retryButtonText}>{t('favorite-routes.label.retry')}</Text>
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
          onRefresh={() => viewModel.events.retry()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>{t('favorite-routes.label.no-favorites')}</Text>
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
  favoriteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
