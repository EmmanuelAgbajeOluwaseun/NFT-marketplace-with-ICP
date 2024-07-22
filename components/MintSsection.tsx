import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import mintABI from "../components/abis/MintABI.json";
import { useRouter } from "expo-router";

export default function MintSection() {
  const router = useRouter();
  // Reading the Contract
  const {
    data: contractName,
    isError,
    isLoading,
    isSuccess,
  } = useContractRead({
    address: "0x109BD37a751A2e3Acc7437846d103Cf11a54B640",
    abi: mintABI,
    functionName: "name",
  });

  // Writing to the Contract
  const { config } = usePrepareContractWrite({
    address: "0x109BD37a751A2e3Acc7437846d103Cf11a54B640",
    abi: mintABI,
    functionName: "safeMint",
    args: ["0xFD1C53772CFB9fbc6D55dE98D651b77393bC3a3a"],
  });

  const {
    data: mintData,
    isLoading: isLoadingMint,
    isSuccess: isSuccessMint,
    write: mint,
  } = useContractWrite(config);

  const onJoinPressed = () => {
    mint?.();
    router.back();

    // navigation.navigate("SignupScreen");
  };

  return (
    <View style={styles.marginVertical}>
      <View style={styles.marginVertical}>
        {isLoading && <Text>Loading</Text>}
        {isSuccess && <Text>Name: {contractName?.toString()}</Text>}
        {isError && <Text>Error reading contract</Text>}
      </View>

      <TouchableOpacity style={styles.button} onPress={onJoinPressed}>
        <Text style={styles.centerText}>Join Circle</Text>
      </TouchableOpacity>
      {isLoading && <Text>Check Wallet</Text>}
      <TouchableOpacity style={styles.ButtonContainer2} onPress={onJoinPressed}>
        <Text style={styles.ButtonText}>Transaction:</Text>
        {isSuccess && (
          <Text style={{ textAlign: "center" }}>
            {JSON.stringify(mintData)}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
  },
  marginVertical: {
    marginVertical: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  centerText: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
  button: {
    backgroundColor: "#0067f3",
    width: "100%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },

  ButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
    alignSelf: "center",
    textTransform: "uppercase",
  },

  ButtonContainer2: {
    backgroundColor: "#e63b60",
    width: "100%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    // marginTop: 10,
  },
});
