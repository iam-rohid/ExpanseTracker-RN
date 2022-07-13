import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { Provider as ReduxProvider } from "react-redux";
import RootNavigator from "./src/navigator/RootNavigator";
import { store } from "./src/store";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <RootNavigator />
      <StatusBar style="dark" />
    </ReduxProvider>
  );
}
