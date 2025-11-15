import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../styles/theme";

export default function Login() {
  const navigation = useNavigation<any>();
  const { darkMode } = useTheme();
  const theme = darkMode ? darkTheme : lightTheme;


  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={{
          uri: "https://i.ibb.co/mXg6xNL/dollar1.jpg", 
        }}
        style={styles.image}
      />

      <Text style={styles.title}>SplitEase</Text>

      <Text style={styles.subtitle}>
        Split bills effortlessly. Scan receipts, assign items, and settle up
        with friends.
      </Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Ionicons name="mail-outline" size={20} color="#fff" />
        <Text style={styles.primaryText}>Continue with Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Ionicons name="logo-google" size={20} color="#555" />
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Ionicons name="logo-apple" size={20} color="#555" />
        <Text style={styles.socialText}>Continue with Apple</Text>
      </TouchableOpacity>

      <Text style={styles.terms}>
        By continuing, you agree to our{" "}
        <Text style={styles.link}>Terms & Privacy Policy</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 5,
    color: "#111",
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 25,
    lineHeight: 22,
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#2FB195",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
  },
  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  socialButton: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    marginBottom: 12,
  },
  socialText: {
    color: "#333",
    fontSize: 15,
    fontWeight: "500",
  },
  terms: {
    marginTop: 15,
    fontSize: 13,
    color: "#777",
    textAlign: "center",
  },
  link: {
    textDecorationLine: "underline",
    color: "#2FB195",
  },
});
