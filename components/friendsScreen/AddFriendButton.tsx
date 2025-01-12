import Colors from "../../constants/Colors";
import {Pressable, Text, View} from "react-native";
import {Entypo} from "@expo/vector-icons";
import React from "react";

const AddFriendButton = (props: { onPress: () => void }) => {
    return <Pressable android_ripple={{color: Colors.rippleColor}}
                      onPress={props.onPress}
                      style={{
                          flexDirection: "row",
                          paddingVertical: 15,
                          paddingHorizontal: 20,
                          gap: "10",
                          backgroundColor: "rgba(59,95,255,0.07)"
                      }}>
        <View style={{
            width: 55,
            height: 55,
            backgroundColor: "rgba(59,95,255,0.18)",
            borderRadius: 250,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: "#3b5fff",
            borderStyle: "dashed"
        }}>
            <Entypo name="plus" size={24} color="#3b5fff"/>
        </View>
        <View style={{alignItems: "center", justifyContent: "center"}}>
            <Text style={{fontSize: 18, fontWeight: "600", color: "#3b5fff"}}>Add a friend</Text>
        </View>
    </Pressable>
}

export default AddFriendButton;