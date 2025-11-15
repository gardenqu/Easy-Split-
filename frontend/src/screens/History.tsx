import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../styles/theme";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

export default function History() {
  const { darkMode } = useTheme();
  const theme = darkMode ? darkTheme : lightTheme;

  const history = [
    {
      date: "Nov 14, 2025",
      total: "$92.80",
      transactions: [
        { id: 1, name: "Dinner at Joe’s Pizza", amount: "$32.50", icon: "fast-food-outline" },
        { id: 2, name: "Uber Ride", amount: "$18.30", icon: "car-outline" },
        { id: 3, name: "Groceries", amount: "$42.00", icon: "cart-outline" },
      ],
    },
    {
      date: "Nov 13, 2025",
      total: "$57.90",
      transactions: [
        { id: 4, name: "Coffee with Amy", amount: "$12.40", icon: "cafe-outline" },
        { id: 5, name: "Movie Tickets", amount: "$45.50", icon: "film-outline" },
      ],
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.bg }]}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: theme.text }]}>Spending History</Text>

      <View style={[styles.insightsCard, { backgroundColor: theme.card }]}>
        <Text style={[styles.insightsTitle, { color: theme.text }]}>Spending Insights</Text>

        <PieChart
            data={[
            {
                name: "Food",
                amount: 180,
                color: "#2FB195",
                legendFontColor: theme.text,
                legendFontSize: 14,
            },
            {
                name: "Transport",
                amount: 90,
                color: "#3B82F6",
                legendFontColor: theme.text,
                legendFontSize: 14,
            },
            {
                name: "Entertainment",
                amount: 120,
                color: "#F59E0B",
                legendFontColor: theme.text,
                legendFontSize: 14,
            },
            {
                name: "Other",
                amount: 60,
                color: "#8B5CF6",
                legendFontColor: theme.text,
                legendFontSize: 14,
            },
            ]}
            width={Dimensions.get("window").width - 40}
            height={180}
            chartConfig={{
            backgroundColor: theme.bg,
            backgroundGradientFrom: theme.bg,
            backgroundGradientTo: theme.bg,
            color: () => theme.text,
            strokeWidth: 2,
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="10"
            hasLegend={true}
            absolute
        />
        </View>

      {history.map((section) => (
        <View key={section.date} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionDate, { color: theme.text }]}>{section.date}</Text>
            <Text style={[styles.sectionTotal, { color: theme.subtext }]}>
              {section.total}
            </Text>
          </View>

          {section.transactions.map((t) => (
            <View key={t.id} style={[styles.card, { backgroundColor: theme.card }]}>
              <View style={styles.row}>
                <View style={[styles.iconCircle, { backgroundColor: darkMode ? "#2FB19530" : "#2FB19515" }]}>
                  <Ionicons name={t.icon as any} size={22} color="#2FB195" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.name, { color: theme.text }]}>{t.name}</Text>
                  <Text style={[styles.subtext, { color: theme.subtext }]}>Split with group</Text>
                </View>
                <Text style={[styles.amount, { color: theme.text }]}>{t.amount}</Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionDate: {
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTotal: {
    fontSize: 14,
  },
  card: {
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  subtext: {
    fontSize: 13,
    marginTop: 2,
  },
  amount: {
    fontSize: 15,
    fontWeight: "600",
  },
  insightsCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    alignItems: "center",
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },  
});
