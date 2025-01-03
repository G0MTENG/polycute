import { WEBVIEW_URI } from "@/constants/uris";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import {
  requestTrackingPermissionsAsync,
  getAdvertisingId,
} from "expo-tracking-transparency";

export default function Index() {
  useEffect(() => {
    (async () => {
      const { status } = await requestTrackingPermissionsAsync();
      if (status === "granted") {
        const advertisingId = getAdvertisingId();
        console.log("advertisingId", advertisingId);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <WebView style={styles.webview} source={{ uri: WEBVIEW_URI }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
