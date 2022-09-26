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
    FlatList
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts, windowWidth } from '../../utils/fonts';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'
import { MyButton, MyGap } from '../../components';
import SignatureScreen from "react-native-signature-canvas";
import SignatureCapture from 'react-native-signature-capture';
import { showMessage } from 'react-native-flash-message';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


export default function Menu6({ navigation, route }) {
    const item = route.params;
    const [before, setBefore] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        axios.post(urlAPI + '/1data_foto1.php', {
            kode: route.params.kode
        }).then(res => {
            console.log(res.data);
            setBefore(res.data);
        })
    }, []);


    const __renderItem2 = ({ item, index }) => {
        return (
            <View style={{
                borderWidth: 1,
                margin: 2,
                flex: 0.25,
                borderColor: colors.secondary,
                // borderRadius: 10,
                overflow: 'hidden'
            }}>
                <Image source={{
                    uri: item.nama_foto
                }} style={{
                    width: '100%',
                    resizeMode: 'cover',
                    aspectRatio: 1,
                }} />
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 35,
                    maxWidth: 100,
                    padding: 2,
                }}>{item.keterangan}</Text>
                <TouchableOpacity onPress={() => {
                    console.log(index)

                    let value = index
                    let arr = foto;
                    arr = arr.map((e, i) => i !== value ? { nama: e.nama, keterangan: e.keterangan } : undefined).filter(x => x)
                    setFoto(arr);




                }} style={{
                    backgroundColor: colors.primary,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 35,
                        maxWidth: 100,
                        textAlign: 'center',
                        color: colors.white,
                        padding: 5,
                    }}>BEFORE</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const [kirim, setKirim] = useState({
        foto: foto,
        kode: route.params.kode
    });
    const [foto, setFoto] = useState([]);
    const __renderItem = ({ item, index }) => {
        return (
            <View style={{
                borderWidth: 1,
                margin: 2,
                flex: 0.25,
                borderColor: colors.secondary,
                // borderRadius: 10,
                overflow: 'hidden'
            }}>
                <Image source={{
                    uri: item.nama
                }} style={{
                    width: '100%',
                    resizeMode: 'cover',
                    aspectRatio: 1,
                }} />
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 35,
                    maxWidth: 100,
                    padding: 2,
                }}>{item.keterangan}</Text>
                <TouchableOpacity onPress={() => {
                    console.log(index)

                    let value = index
                    let arr = foto;
                    arr = arr.map((e, i) => i !== value ? { nama: e.nama, keterangan: e.keterangan } : undefined).filter(x => x)
                    setFoto(arr);




                }} style={{
                    backgroundColor: colors.danger,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 35,
                        maxWidth: 100,
                        textAlign: 'center',
                        color: colors.white,
                        padding: 5,
                    }}>Remove</Text>
                </TouchableOpacity>
            </View>
        )
    }
    const options = {
        includeBase64: true,
        quality: 0.3,
    };

    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 25,
                backgroundColor: colors.primary,
                padding: 20,
                textAlign: 'center',
                color: colors.white,
            }}>FEEDBACK EVDAL CHECK</Text>
            <ScrollView showsVerticalScrollIndicator={false} style={{
                padding: 10,
            }}>
                <View style={{
                    paddingVertical: 5,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        flex: 1,
                    }}>Tanggal & Waktu</Text>
                    <Text style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                        paddingVertical: 10,
                        color: colors.tertiary,
                    }}>
                        {item.tanggal} {item.jam}
                    </Text>
                </View>

                <View style={{
                    paddingVertical: 5,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        flex: 1,
                    }}>Nama Inspektor</Text>
                    <Text style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                        paddingVertical: 10,
                        color: colors.tertiary,
                    }}>
                        {item.nama_inspektor}
                    </Text>
                </View>
                <View style={{
                    paddingVertical: 5,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        flex: 1,
                    }}>Nomor Body</Text>
                    <Text style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                        paddingVertical: 10,
                        color: colors.tertiary,
                    }}>
                        {item.nomor_body}
                    </Text>
                </View>
                <View style={{
                    paddingVertical: 5,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        flex: 1,
                    }}>Kilometer</Text>
                    <Text style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                        paddingVertical: 10,
                        color: colors.tertiary,
                    }}>
                        {item.kilometer}
                    </Text>
                </View>
                <FlatList numColumns={4} data={before} renderItem={__renderItem2} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 30,
                    marginVertical: 10,
                    backgroundColor: colors.secondary,
                    padding: 10,
                    textAlign: 'center',
                    color: colors.black,
                }}>UPLOAD IMAGE</Text>
                <FlatList numColumns={4} data={foto} renderItem={__renderItem} />

                <MyGap jarak={10} />

                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        paddingVertical: 5,
                        flex: 2,
                    }}>

                        <TextInput autoCapitalize='none' placeholder='masukan keterangan foto' style={{
                            borderBottomWidth: 1,
                            borderBottomColor: colors.tertiary,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 35,
                        }} value={kirim.keterangan} onChangeText={x => setKirim({
                            ...kirim,
                            keterangan: x
                        })} />
                    </View>

                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                    }}>
                        <MyButton radius={0} onPress={() => {


                            launchCamera(options, response => {
                                if (response.didCancel) {
                                    console.log('User cancelled image picker');
                                } else if (response.error) {
                                    console.log('Image Picker Error: ', response.error);
                                } else {
                                    let source = { uri: response.uri };

                                    setFoto([...foto, {
                                        nama: `data:${response.type};base64, ${response.base64}`,
                                        keterangan: kirim.keterangan
                                    }]);
                                    setKirim({
                                        ...kirim,
                                        keterangan: '',
                                        foto: [...foto, {
                                            nama: `data:${response.type};base64, ${response.base64}`,
                                            keterangan: kirim.keterangan
                                        }]

                                    })


                                }
                            });





                        }} title="Upload" warna={colors.tertiary} Icons="camera" />
                    </View>
                </View>

                <MyGap jarak={10} />



                {!loading && <MyButton onPress={() => {

                    setLoading(true);


                    // console.log('send server', kirim)

                    axios.post(urlAPI + '/1add_evdal2.php', kirim).then(res => {
                        console.log(res.data);
                        setTimeout(() => {
                            setLoading(false);
                            navigation.replace('MainApp');
                            showMessage({
                                message: 'Data berhasil dikirm !',
                                type: 'success'
                            })
                        }, 1000)

                    })

                }} title="SUBMIT" warna={colors.primary} Icons="create-outline" />}
                {loading && <ActivityIndicator size="large" color={colors.primary} />}
                <MyGap jarak={20} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})