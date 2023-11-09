import { Routes } from "./src/routes";
import { AuthProvider } from "./src/hooks/useAuth";
import { SafeAreaView } from "react-native";

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Routes />
      </SafeAreaView>
    </AuthProvider>
  );
}
