import "react-native-get-random-values";
import "react-native-polyfill-globals/auto";
globalThis.TextEncoder = TextEncoder;
window.TextEncoder = TextEncoder;
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
// import { TextEncoder } from "text-encoding";
import LoggedOut from "../src/components/LoggedOut";
import LoggedIn from "../src/components/LoggedIn";

import { useAuth } from "../src/hooks/useAuth";

function Icp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { identity, isReady, logout } = useAuth();

  const triggerLogout = () => {
    setIsLoggedIn(false);
    logout();
  };

  useEffect(() => {
    if (identity) {
      setIsLoggedIn(true);
    }
  }, [identity]);

  if (!isReady) return null;

  return (
    <View style={styles.container} accessible={true}>
      {isLoggedIn ? <LoggedIn logout={triggerLogout} /> : <LoggedOut />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Icp;
