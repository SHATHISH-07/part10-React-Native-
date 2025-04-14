import { SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";
import Main from "./src/components/Main";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f6f9",
  },
});

export default App;
