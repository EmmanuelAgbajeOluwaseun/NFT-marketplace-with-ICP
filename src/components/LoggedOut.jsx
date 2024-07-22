import React from "react";
import { View, Text, Pressable, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useAuth } from "../hooks/useAuth";

export default function LoggedOut() {
  const [busy, setBusy] = React.useState(false);
  const { login } = useAuth();

  function handlePress() {
    setBusy(true);
    login().then(() => {
      setBusy(false);
    });
  }

  return (
  
      <TouchableOpacity
          onPress={handlePress}
          style={styles.ButtonContainer}
        >
                <Image
        style={styles.logo}
        source={require("../../assets/images/icp.png")}
      />
          <Text style={styles.ButtonText}>Continue with ICP</Text>
        </TouchableOpacity>
   
  );
}
const styles = StyleSheet.create({

  // logo: {
  //   alignSelf: "center",
  //   marginRight: "10",
  //   zIndex: 1,
  //   width: "30%",
  //   height: "30%",
  //   resizeMode: "contain",
    
  // },


  ButtonContainer: {
    backgroundColor: "#0067f3",
    width: "100%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    height:60,
    flexDirection: 'row',
    // justifyContent:"space-around"
  
  
  },

  logo: {
    width: 40,  // Adjust width as needed
    height: 40, // Adjust height as needed
    marginRight: 50, // Space between the image and the text
    marginLeft: 20, // Space between the image and the text
  },


  ButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
    alignSelf: "center",
    textTransform: "uppercase",
    // zIndex:"100"
  },
});