import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Dimensions,
    Animated,
    PermissionsAndroid,
    Alert
} from 'react-native';
import { fonts } from '../../utils/fonts';
import LottieView from 'lottie-react-native';
import { MyButton } from '../../components';
import { colors } from '../../utils/colors';
import { WebView } from 'react-native-webview';

export default function Download({ navigation, route }) {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const txt = new Animated.Value(-windowWidth);
    const [open, setOpen] = useState(false);

    Animated.timing(txt, {
        toValue: 10,
        duration: 800,
        useNativeDriver: false,
    }).start();


    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Izinkan Untuk Akses Penyimpanan',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.error("You can use the storage");
                setOpen(true);

            } else {

                Alert.alert('Izin Penyimpanan Belum Aktif', 'Izinkan sekarang agar bisa melakukan download',
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => requestCameraPermission() }
                    ])

                console.error("Camera permission denied");


            }
        } catch (err) {
            console.warn(err);

        }
    };

    useEffect(() => {

        requestCameraPermission();




    }, [])



    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}>
            {open &&
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        paddingBottom: 100,
                    }}>
                    <LottieView
                        source={require('../../assets/success.json')}
                        autoPlay
                        loop={false}
                    />

                    <WebView style={{
                        height: 1
                    }} source={{ uri: 'https://scaniadigital.zavalabs.com/pdf?kode=' + route.params.kode }} />
                </View>
            }

        </SafeAreaView>



    )
}
const styles = StyleSheet.create({})