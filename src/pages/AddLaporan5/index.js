import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput,
    ActivityIndicator,
    FlatList,
    Alert
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts, windowWidth } from '../../utils/fonts';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { MyButton, MyGap, MyInput } from '../../components';
import { showMessage } from 'react-native-flash-message';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import { maskJs, maskCurrency } from 'mask-js';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function ({ navigation, route }) {
    const [loading, setLoading] = useState(false);
    const [kirim, setKirim] = useState({
        kode: route.params.kode,
        foto_sebelum: null,
        foto_sesudah: null,
    });

    const sendServer = () => {
        setLoading(true);

        setTimeout(() => {

            console.log('send', kirim);

            axios.post(urlAPI + 'v1_add_foto.php', kirim).then(res => {
                console.log(res.data)

                if (res.data.status == 200) {
                    Alert.alert('Musi Mitra Jaya', res.data.messege);
                    navigation.goBack();
                }
            })

            setLoading(false)
        }, 1200)
    }


    return (
        <SafeAreaView style={{

            flex: 1,
        }}>
            <View style={{
                backgroundColor: colors.primary,
                padding: 20,
                justifyContent: 'center',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 20,
                    color: colors.white,
                    marginBottom: 5,
                }}>TAMBAH</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 25,
                    color: colors.white,
                    marginBottom: 10,
                }}>Foto Daily Activity</Text>
            </View>
            <ScrollView style={{
                padding: 10,
            }} showsVerticalScrollIndicator={false}>

                <Text style={{
                    marginHorizontal: 5,
                    marginVertical: 10,
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 20
                }}>
                    Foto Sebelum
                </Text>
                <TouchableOpacity onPress={() => {
                    Alert.alert(
                        "Musi Mitra Jaya",
                        "Pilih Ambil Foto",
                        [{
                            text: "BATAL",
                            onPress: () => console.log("Ask me later pressed"),
                            style: "cancel"
                        },
                        {
                            text: "GALLERY",
                            onPress: () => {
                                launchImageLibrary({
                                    quality: 0.8,
                                    maxWidth: 500,
                                    maxHeight: 500,
                                    includeBase64: true
                                }, x => {
                                    console.warn(x.base64);
                                    setKirim({
                                        ...kirim,
                                        foto_sebelum: `data:${x.type};base64, ${x.base64}`
                                    })
                                });
                            },
                            style: "cancel"
                        },
                        {
                            text: "CAMERA", onPress: () => {
                                launchCamera({
                                    quality: 0.8,
                                    maxWidth: 500,
                                    maxHeight: 500,
                                    includeBase64: true
                                }, x => {
                                    console.warn(x.base64);
                                    setKirim({
                                        ...kirim,
                                        foto_sebelum: `data:${x.type};base64, ${x.base64}`
                                    })
                                });
                            }
                        }
                        ]
                    );
                }} style={{
                    height: 300,
                    borderRadius: 10,
                    width: '100%',
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.secondary
                }}>
                    {kirim.foto_sebelum == null && <Icon type='ionicon' name='camera' color={colors.primary} size={windowWidth / 5} />}
                    {kirim.foto_sebelum != null && <Image source={{
                        uri: kirim.foto_sebelum
                    }} style={{
                        width: '100%',
                        height: '100%',
                    }} />}
                </TouchableOpacity>

                <MyGap jarak={20} />
                <Text style={{
                    marginHorizontal: 5,
                    marginVertical: 10,
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 20
                }}>
                    Foto Sesudah
                </Text>
                <TouchableOpacity onPress={() => {

                    Alert.alert(
                        "Musi Mitra Jaya",
                        "Pilih Ambil Foto",
                        [{
                            text: "BATAL",
                            onPress: () => console.log("Ask me later pressed"),
                            style: "cancel"
                        },
                        {
                            text: "GALLERY",
                            onPress: () => {
                                launchImageLibrary({
                                    quality: 0.8,
                                    maxWidth: 500,
                                    maxHeight: 500,
                                    includeBase64: true
                                }, x => {
                                    console.warn(x.base64);
                                    setKirim({
                                        ...kirim,
                                        foto_sesudah: `data:${x.type};base64, ${x.base64}`
                                    })
                                });
                            },
                            style: "cancel"
                        },
                        {
                            text: "CAMERA", onPress: () => {
                                launchCamera({
                                    quality: 0.8,
                                    maxWidth: 500,
                                    maxHeight: 500,
                                    includeBase64: true
                                }, x => {
                                    console.warn(x.base64);
                                    setKirim({
                                        ...kirim,
                                        foto_sesudah: `data:${x.type};base64, ${x.base64}`
                                    })
                                });
                            }
                        }
                        ]
                    );



                }} style={{
                    height: 300,
                    borderRadius: 10,
                    width: '100%',
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.secondary
                }}>
                    {kirim.foto_sesudah == null && <Icon type='ionicon' name='camera' color={colors.primary} size={windowWidth / 5} />}
                    {kirim.foto_sesudah != null && <Image source={{
                        uri: kirim.foto_sesudah
                    }} style={{
                        width: '100%',
                        height: '100%',
                    }} />}
                </TouchableOpacity>
                <MyGap jarak={20} />








                {!loading && <MyButton onPress={sendServer} title="SUBMIT" warna={colors.primary} Icons="create-outline" />}
                {loading && <ActivityIndicator size="large" color={colors.primary} />}
                <MyGap jarak={20} />
            </ScrollView>


        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})