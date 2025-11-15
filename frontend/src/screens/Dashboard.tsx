import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../styles/theme";

export default function Dashboard() {
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
  
    const activities = [
      { id: 1, name: "Dinner at Joe’s Pizza", amount: "$32.50", icon: "fast-food-outline" },
      { id: 2, name: "Coffee with Amy", amount: "$12.40", icon: "cafe-outline" },
      { id: 3, name: "Grocery Run", amount: "$68.90", icon: "cart-outline" },
    ];
  
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.bg }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View>
              <Text style={[styles.welcome, { color: theme.subtext }]}>Welcome back,</Text>
              <Text style={[styles.name, { color: theme.text }]}>Sarah</Text>
            </View>
  
            <View style={[styles.profileCircle, { backgroundColor: "#2FB195" }]}>
              <Text style={styles.profileInitial}>S</Text>
            </View>
          </View>
  
          {/* Stats Card */}
          <View style={[styles.statsCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.statsTitle, { color: theme.subtext }]}>This Month</Text>
            <Text style={[styles.amount, { color: theme.text }]}>$487.50</Text>
  
            <View style={styles.rowBetween}>
              <View>
                <Text style={[styles.label, { color: theme.subtext }]}>Bills Split</Text>
                <Text style={[styles.value, { color: theme.text }]}>12</Text>
              </View>
  
              <View>
                <Text style={[styles.label, { color: theme.subtext }]}>Pending</Text>
                <Text style={[styles.value, { color: theme.text }]}>$23.50</Text>
              </View>
            </View>
  
            <Ionicons
              name="trending-up-outline"
              size={24}
              color="#2FB195"
              style={styles.trendIcon}
            />
          </View>
  
          {/* Quick Actions */}
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Quick Actions</Text>
          <View style={styles.grid}>
            <Action icon="cloud-upload-outline" color="#2FB195" label="Upload Receipt" bg="#2FB19520" />
            <Action icon="time-outline" color="#8B5CF6" label="View History" bg="#8B5CF620" />
            <Action icon="people-outline" color="#3B82F6" label="My Groups" bg="#3B82F620" />
            <Action icon="person-outline" color="#374151" label="Profile" bg="#37415120" />
          </View>
  
          {/* Recent Activity */}
          <View style={styles.recentRow}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Activity</Text>
            <Text style={styles.viewAll}>View All</Text>
          </View>
  
          <View style={styles.activityList}>
            {activities.map((a) => (
              <View key={a.id} style={[styles.activityCard, { backgroundColor: theme.card }]}>
                <View style={styles.row}>
                  <View style={[styles.iconCircle, { backgroundColor: darkMode ? "#2FB19530" : "#2FB19515" }]}>
                    <Ionicons name={a.icon as any} size={22} color="#2FB195" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.activityName, { color: theme.text }]}>{a.name}</Text>
                    <Text style={[styles.activitySub, { color: theme.subtext }]}>Split with friends</Text>
                  </View>
                  <Text style={[styles.activityAmount, { color: theme.text }]}>{a.amount}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
  
  function Action({ icon, color, label, bg }: any) {
    return (
      <TouchableOpacity style={styles.actionBox}>
        <View style={[styles.iconCircle, { backgroundColor: bg }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <Text style={styles.actionText}>{label}</Text>
      </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({
    container: { paddingTop: 60, paddingHorizontal: 20 },
  
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    welcome: { fontSize: 16 },
    name: { fontSize: 22, fontWeight: "700" },
    profileCircle: {
      width: 42, height: 42, borderRadius: 21,
      justifyContent: "center", alignItems: "center",
    },
    profileInitial: { color: "#fff", fontWeight: "700" },
  
    statsCard: {
      marginTop: 25, borderRadius: 20, padding: 20,
      shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, elevation: 3,
      position: "relative",
    },
    statsTitle: { fontSize: 15 },
    amount: { fontSize: 32, fontWeight: "700", marginTop: 5, marginBottom: 15 },
    rowBetween: { flexDirection: "row", justifyContent: "space-between" },
    label: { fontSize: 13 },
    value: { fontSize: 17, fontWeight: "600" },
    trendIcon: { position: "absolute", right: 20, top: 20 },
  
    sectionTitle: { fontSize: 17, fontWeight: "700", marginTop: 30 },
    grid: {
      marginTop: 15, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between",
    },
    actionBox: {
      width: "48%", backgroundColor: "#fff",
      paddingVertical: 25, borderRadius: 18, alignItems: "center", marginBottom: 15,
      shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
    },
    iconCircle: {
      width: 50, height: 50, borderRadius: 25,
      justifyContent: "center", alignItems: "center", marginBottom: 10,
    },
    actionText: { fontSize: 14, fontWeight: "600", textAlign: "center" },
  
    recentRow: {
      marginTop: 30, flexDirection: "row", justifyContent: "space-between",
    },
    viewAll: { color: "#2FB195", fontSize: 14, fontWeight: "600" },
  
    activityList: { marginTop: 15 },
    activityCard: {
      borderRadius: 16, paddingVertical: 14, paddingHorizontal: 14, marginBottom: 12,
      shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8, elevation: 3,
    },
    row: { flexDirection: "row", alignItems: "center", gap: 10 },
    activityName: { fontSize: 15, fontWeight: "600" },
    activitySub: { fontSize: 13, marginTop: 2 },
    activityAmount: { fontSize: 15, fontWeight: "600" },
  });