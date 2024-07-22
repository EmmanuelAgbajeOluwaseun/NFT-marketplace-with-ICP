import "@walletconnect/react-native-compat";
import { WagmiConfig, useAccount } from "wagmi";
import { goerli, mainnet, polygon, arbitrum, sepolia } from "viem/chains";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  W3mAccountButton,
  W3mButton,
  W3mNetworkButton,
  Web3Modal,
} from "@web3modal/wagmi-react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";

// 1. Get projectId from https://cloud.walletconnect.com
// const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const projectId = "ecb15083d8dfecb97c3270a5ece45e35";

// 2. Create config
const metadata = {
  name: "icp-nft-markeplace",
  description: "icp-nft-markeplace",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

const chains = [mainnet, polygon, arbitrum, goerli, sepolia];

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// const {address,isConnected,isDisconnected,isReconnecting } = useAccount({
//   onConnect({ address, connector, isReconnected }) {
//     console.log("Connected", { address, connector, isReconnected });
//   },
//   onDisconnect() {
//     console.log("Disconnected");
//   },
// });

// function navigate() {
//   const { address, isConnecting, isDisconnected, isConnected } = useAccount();

//   if (isConnecting) {
//     console.log("connecting");
//   }
//   if (isDisconnected) {
//     console.log("Disconnected");
//   }
//   if (isConnected) {
//     console.log("connected");
//   }
//   // return <Text>{address}</Text>
//   return console.log({ address });
// }

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  // <Slot />;

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <WagmiConfig config={wagmiConfig}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="connect" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="details/[circleId]"
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="TransactionDetails"
            options={{ headerShown: false }}
          /> */}

          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
      <Web3Modal />
    </WagmiConfig>
  );
}
