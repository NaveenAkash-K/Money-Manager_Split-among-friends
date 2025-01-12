import Colors from "../../constants/Colors";
import {Pressable, Text, View} from "react-native";
import React from "react";
import Friend from "../../models/Friend";

const FriendsListItem = (props: { friend: Friend }) => {
    return <Pressable android_ripple={{color: Colors.rippleColor}}
                      style={{
                          flexDirection: "row",
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                          gap: "20"
                      }}>
        <View style={{
            width: 55,
            height: 55,
            backgroundColor: "rgba(59,95,255,0.18)",
            borderRadius: 250,
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Text style={{
                textAlign: "center",
                fontSize: 24,
                color: "#3b5fff",
                fontWeight: "bold"
            }}>{props.friend.name.at(0)}</Text>
        </View>
        <View style={{
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Text style={{
                fontSize: 18,
                fontWeight: "600",
                color: Colors.grey["900"]
            }}>{props.friend.name}</Text>
        </View>
    </Pressable>
}

export default FriendsListItem;