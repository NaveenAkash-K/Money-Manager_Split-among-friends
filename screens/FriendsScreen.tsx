import React, {useState} from "react";
import {View, Text, Pressable} from "react-native";
import Colors from "../constants/Colors";
import {Entypo, Feather} from "@expo/vector-icons";
import AddFriendsModal from "../components/friendsScreen/AddFriendsModal";
import FriendsListItem from "../components/friendsScreen/FriendsListItem";
import Friend from "../models/Friend";
import useFriendsStore from "../store/useFriendsStore";
import AddFriendButton from "../components/friendsScreen/AddFriendButton";

const FriendsScreen = () => {
    const [isAddFriendModalVisible, setIsAddFriendModalVisible] = useState(false);
    const {friends} = useFriendsStore();

    return <View>
        <AddFriendsModal isVisible={isAddFriendModalVisible}
                         onClose={() => setIsAddFriendModalVisible(false)}/>
        <AddFriendButton onPress={() => setIsAddFriendModalVisible(true)} />
        <View style={{
            height: 1,
            width: "90%",
            backgroundColor: Colors.grey["400"],
            marginHorizontal: 20,
            marginVertical: 5
        }}/>
        {friends.map((friend, index) =>
            <FriendsListItem key={index} friend={friend}/>
        )}
    </View>
}

export default FriendsScreen;