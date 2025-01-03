import { WEBVIEW_URI } from "@/constants/uris";
import { useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import {
  requestTrackingPermissionsAsync,
  getAdvertisingId,
} from "expo-tracking-transparency";

export default function Index() {
  const webviewRef = useRef<WebView>(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const { status } = await requestTrackingPermissionsAsync();
      if (status === "granted") {
        const advertisingId = getAdvertisingId();
        if (webviewRef.current) {
          webviewRef.current.postMessage(
            JSON.stringify({
              type: "advertisingId",
              payload: advertisingId,
            }),
          );
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webviewRef}
        style={styles.webview}
        source={{ uri: WEBVIEW_URI }}
      />
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
