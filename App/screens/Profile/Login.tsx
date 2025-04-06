import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { AntDesign } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();


export default function Login() {
    // const [request, response, promptAsync] = Google.useAuthRequest({
    //     webClientId: ,
    //     androidClientId: ,
    //   });

    // useEffect(() => {
    //     if (response?.type === 'success') {
    //       const { authentication } = response;
    //       console.log('구글 로그인 성공:', authentication);
    //       // 여기서 토큰을 백엔드에 전달하거나 사용자 상태 저장 가능
    //     }
    //   }, [response]);
    
    //   const handleGoogleLogin = () => {
    //     console.log(AuthSession.makeRedirectUri());
    //     promptAsync();
    //   };

    return (
        <View style={styles.container}>

        <Text style={styles.title}>회사 비교 서비스</Text>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
            <AntDesign name="google" size={24} color="white" />
            <Text style={styles.buttonText}>Google로 로그인</Text>
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
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 50,
        fontWeight: 'bold',
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4285F4',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '600',
    },
    });
