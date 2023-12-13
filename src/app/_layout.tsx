import { StatusBar } from "expo-status-bar";

import App from ".";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <App />
    </>
  );
}
