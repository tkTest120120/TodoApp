import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    FlatList,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Image
} from "react-native";
import axios from "axios";
// import CheckBox from "@react-native-community/checkbox";
import Checkbox from 'expo-checkbox';

const WIDTH: number = Dimensions.get("screen").width;

const AddScreen = ({ navigation, route }) => {
    const [isSelected, setSelection] = React.useState(false);
    const [name, setName] = React.useState("");

    const data: string = JSON.stringify({
        'name': 'moi nhe',
        'status': 'true'
    });

    const config: object = {
        method: 'post',
        url: 'https://61c0221033f24c001782313a.mockapi.io/api/Todo',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    const addTodo = (): void => {
        if(name == ""){
            alert("Input name");
        } else {
            axios.post("https://61c0221033f24c001782313a.mockapi.io/api/Todo", {
                name: name,
                status: isSelected
            })
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    navigation.replace("Home");
                })
                .catch(function (error) {
                    // console.log(error);
                });                
        }
    }

    return (
        <View style={styles.container}>

            <Text style={{
                fontSize: 40,
                fontWeight: "bold",
                marginBottom: 50
            }} > Add Todo </Text>

            <TextInput style={styles.edt_layout} placeholder={"Input name"}
                onChangeText={(text => setName(text))} value={name}
            />

            <View style={styles.cb_layout}>
                <Checkbox
                    value={isSelected}
                    onValueChange={(newValue) => {
                        setSelection(newValue)
                    }}
                />

                <Text style={styles.checkbox}>
                    Status
                </Text>
            </View>

            <TouchableOpacity style={styles.btn}
                onPress={() => {
                    addTodo()
                }}
            >
                <Text style={{ fontSize: 20, color: "white" }}> Add </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: WIDTH,
    },

    edt_layout: {
        borderColor: "black",
        borderWidth: 1,
        width: 300,
        minHeight : 40,
        paddingLeft: 20,
        fontSize : 20
    },

    cb_layout: {
        marginTop: 10,
        width: 300,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },

    checkbox: {
        fontSize: 24,
        marginLeft: 5,
        alignSelf: "center",
    },

    btn: {
        marginTop: 40,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "blue",
    },

    btn_xoa: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "blue",
        marginLeft: 40
    },

});

export default AddScreen;