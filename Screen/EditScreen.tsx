import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    TextInput
} from "react-native";
import axios from "axios";
// import CheckBox from "@react-native-community/checkbox";
import Checkbox from 'expo-checkbox';

const WIDTH: number = Dimensions.get("screen").width;

const EditScreen = ({ navigation, route }) => {

    const [data, setData] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = React.useState("");
    const [isSelected, setSelection] = React.useState(false);

    useEffect(() => {
        getDATA()
    }, []);

    const getDATA = (): void => {
        // setData([])
        axios.get("https://61c0221033f24c001782313a.mockapi.io/api/Todo/" + route.params.id)
            .then((response) => {
                setId(response.data.id);
                setName(response.data.name);
                setSelection(Boolean(response.data.status));
                console.log(response.data);
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    };

    const updateTodo = (): void => {
        if (name == "") {
            alert("Input name");
        } else {
            axios.put("https://61c0221033f24c001782313a.mockapi.io/api/Todo/" + id, {
                name: name,
                status: isSelected
            })
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    navigation.replace("Home");
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.t_title} > Update Todo </Text>

            <Text style={styles.t_id} > {id} </Text>

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
                onPress={() => updateTodo()}
            >
                <Text style={{ fontSize: 20, color: "white" }}> Update </Text>
            </TouchableOpacity>

        </SafeAreaView>
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
        minHeight: 40,
        paddingLeft: 20,
        fontSize: 20
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

    t_title: {
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 50
    },

    t_id: {
        fontSize: 20,
        borderWidth: 1,
        width: 300,
        marginBottom: 10,
        minHeight: 40,
        paddingLeft: 12,
        paddingTop: 7
    },

});

export default EditScreen;