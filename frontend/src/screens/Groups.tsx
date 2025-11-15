import React from "react";
import { View, Text, StyleSheet, TouchableOpacity,ScrollView} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../styles/theme";


export default function Groups() {
  const groups = [
    {
      id: 1,
      name: "Roommates",
      members: ["S", "A", "D"],
      created: "Oct 2025",
    },
    {
      id: 2,
      name: "Girls Trip",
      members: ["S", "M", "K", "L"],
      created: "Nov 2025",
    },
    {
      id: 3,
      name: "Work Lunch Crew",
      members: ["P", "R"],
      created: "Nov 2025",
    },
  ];
  const { darkMode } = useTheme();
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.title}>My Groups</Text>
        <Text style={styles.subtitle}>
          Manage your bill-splitting groups and shared expenses.
        </Text>

        <TouchableOpacity style={styles.createButton}>
          <Ionicons name="add-circle-outline" size={22} color="#fff" />
          <Text style={styles.createText}>Create New Group</Text>
        </TouchableOpacity>

        <View style={styles.groupList}>
          {groups.map((group) => (
            <TouchableOpacity key={group.id} style={styles.groupCard}>
              <View>
                <Text style={styles.groupName}>{group.name}</Text>

                <View style={styles.membersRow}>
                  {group.members.map((m, index) => (
                    <View key={index} style={styles.memberBubble}>
                      <Text style={styles.memberText}>{m}</Text>
                    </View>
                  ))}
                </View>

                <Text style={styles.groupDate}>Created: {group.created}</Text>
              </View>

              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="#bbb"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 15,
    color: "#666",
    marginBottom: 20,
  },

  createButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#2FB195",
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: "center",
    marginBottom: 25,
  },
  createText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  groupList: {
    marginTop: 5,
  },

  groupCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  groupName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
  groupDate: {
    marginTop: 6,
    fontSize: 13,
    color: "#888",
  },

  membersRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 8,
  },
  memberBubble: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#2FB19520",
    justifyContent: "center",
    alignItems: "center",
  },
  memberText: {
    fontWeight: "700",
    color: "#2FB195",
  },
});
