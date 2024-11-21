import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginPress = () => {
        // Aquí la lógica para manejar el inicio de sesión
        // login(email, password);
        console.log("Datos login:", email, password);
        router.push("/(tabs)/one");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <Image source={require('../assets/images/foco_logo.png')} style={styles.logo} />
                <Text style={styles.title}>Lumos</Text>
                <Text style={styles.subtitle}>Inicia Sesión</Text>
                <TextInput
                    style={styles.input}
                    label="Correo electrónico"
                    placeholder="Ingresa tu correo"
                    placeholderTextColor="#B0BEC5"
                    value={email}
                    onChangeText={setEmail}
                    theme={{ colors: { primary: "#2196F3" } }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    label="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    theme={{ colors: { primary: "#2196F3" } }}
                    secureTextEntry
                />
                <TouchableOpacity onPress={handleLoginPress} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: width * 0.08,
    },
    logo: {
        width: 170,
        height: 170,
        marginBottom: height * 0.03,
    },
    title: {
        fontSize: width * 0.12,
        fontWeight: "bold",
        marginBottom: height * 0.01,
        color: "#2B9DCF", // Azul más oscuro para el título
        textAlign: "center",
    },
    subtitle: {
        fontSize: width * 0.05,
        marginBottom: height * 0.02,
        color: "#047AC0", // Celeste
        textAlign: "center",
    },
    input: {
        width: "100%",
        height: height * 0.08,
        borderColor: "#43CBF9", // Borde celeste
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: width * 0.04,
        marginBottom: height * 0.02,
        fontSize: width * 0.04,
        backgroundColor: "#fff", // Fondo blanco
    },
    loginButton: {
        backgroundColor: "#2B9DCF", // Botón azul
        width: "80%",
        paddingVertical: height * 0.02,
        borderRadius: 10,
        alignItems: "center",
        marginTop: height * 0.02,
    },
    loginButtonText: {
        color: "#fff",
        fontSize: width * 0.045,
        fontWeight: "bold",
    },
});
