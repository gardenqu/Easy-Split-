import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function Profile() {
    const { darkMode, toggleTheme } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: darkMode ? "#111" : "#fff" }}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={[styles.profileCard, darkMode && styles.darkCard]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitial}>S</Text>
          </View>

          <Text style={[styles.name, darkMode && styles.darkText]}>
            Sarah Johnson
          </Text>

          <Text style={[styles.email, darkMode && styles.darkSubtext]}>
            sarah.j@example.com
          </Text>
        </View>

        <Text
          style={[styles.sectionTitle, darkMode && styles.darkText]}
        >
          Account Settings
        </Text>

        <View style={styles.menuBox}>
          <MenuItem
            icon="person-outline"
            label="Edit Profile"
            dark={darkMode}
          />

          <MenuItem
            icon="card-outline"
            label="Payment Methods"
            dark={darkMode}
          />

          <MenuItem
            icon="notifications-outline"
            label="Notifications"
            dark={darkMode}
          />

          <MenuItem
            icon="shield-outline"
            label="Privacy & Security"
            dark={darkMode}
          />

          <MenuItem
            icon="help-circle-outline"
            label="Help Center"
            dark={darkMode}
          />
        </View>

        {/* Dark Mode Toggle */}
        <View style={[styles.toggleRow, darkMode && styles.darkCard]}>
          <View style={styles.toggleLeft}>
            <Ionicons
              name="moon-outline"
              size={22}
              color={darkMode ? "#ddd" : "#444"}
            />
            <Text style={[styles.toggleLabel, darkMode && styles.darkText]}>
              Dark Mode
            </Text>
          </View>

          <Switch
            value={darkMode}
            onValueChange={toggleTheme}
            thumbColor={darkMode ? "#2FB195" : "#fff"}
            trackColor={{ false: "#ccc", true: "#1A6D5F" }}
            />

        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={22} color="#ff4d4f" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function MenuItem({ icon, label, dark }: any) {
  return (
    <TouchableOpacity style={styles.menuRow}>
      <Ionicons name={icon} size={22} color={dark ? "#ddd" : "#444"} />
      <Text style={[styles.menuText, dark && styles.darkText]}>{label}</Text>
      <Ionicons
        name="chevron-forward-outline"
        size={20}
        color={dark ? "#777" : "#bbb"}
        style={{ marginLeft: "auto" }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  /* PROFILE CARD */
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    paddingVertical: 35,
    alignItems: "center",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  darkCard: {
    backgroundColor: "#1b1b1b",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#2FB195",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarInitial: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "700",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },
  email: {
    marginTop: 4,
    fontSize: 15,
    color: "#777",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 12,
  },

  menuBox: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 4,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 0.4,
    borderColor: "#eee",
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#444",
    fontWeight: "500",
  },

  toggleRow: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  toggleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
  },

  /* LOGOUT */
  logoutButton: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  logoutText: {
    color: "#ff4d4f",
    fontSize: 17,
    fontWeight: "600",
  },

  darkText: {
    color: "#eee",
  },
  darkSubtext: {
    color: "#bbb",
  },
});
