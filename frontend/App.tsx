import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigation/MainStack";
import { ThemeProvider } from "./src/context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
    </ThemeProvider>
  );
}
