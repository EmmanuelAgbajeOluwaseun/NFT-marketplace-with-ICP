import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Slot, useRouter } from "expo-router";
import React, { useState } from "react";
import { W3mButton } from "@web3modal/wagmi-react-native";
import { NFTCard, HomeHeader, FocusedStatusBar } from "../../components";
import { COLORS, NFTData } from "../../constants";

export default function index() {
  const router = useRouter();

  const handlePress = () => {
    router.push({ pathname: "(tabs)" });

    // navigation.navigate("SignupScreen");
  };
  const cardPress = () => {
    router.push({ pathname: "(tabs)" });
  };

  const [nftData, setNftData] = useState(NFTData);

  const handleSearch = (value) => {
    if (value.length === 0) {
      setNftData(NFTData);
    }

    const filteredData = NFTData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length === 0) {
      setNftData(NFTData);
    } else {
      setNftData(filteredData);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={nftData}
            renderItem={({ item }) => <NFTCard data={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
          />
        </View>

        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View style={{ height: 300, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  );
}
