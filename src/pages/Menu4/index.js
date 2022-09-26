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

export default function Menu3({ navigation }) {


    const myDate = new Date();
    const [loading, setLoading] = useState(false);


    useState(() => {
        getData('user').then(u => {
            setKirim({
                ...kirim,
                fid_user: u.id
            })
        })
    }, [])

    const getToday = () => {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        if (month.toString().length == 1) {
            month = '0' + month;
        }
        if (day.toString().length == 1) {
            day = '0' + day;
        }
        if (hour.toString().length == 1) {
            hour = '0' + hour;
        }
        if (minute.toString().length == 1) {
            minute = '0' + minute;
        }
        if (second.toString().length == 1) {
            second = '0' + second;
        }
        var dateTime = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
        return dateTime;
    }

    const [today, setToday] = useState(getToday());

    const [kirim, setKirim] = useState({
        foto: foto
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
                marginBottom: 20,
            }}>LAPORAN EVDAL</Text>
            <ScrollView style={{
                padding: 10,
            }} showsVerticalScrollIndicator={false}>


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
                        {today}
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
                    <TextInput autoCapitalize='none' placeholder='masukan nama inspektor' style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                    }} value={kirim.nama_inspektor} onChangeText={x => setKirim({
                        ...kirim,
                        nama_inspektor: x
                    })} />
                </View>

                <View style={{
                    paddingVertical: 5,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        flex: 1,
                    }}>Nomor Body</Text>
                    <TextInput autoCapitalize='none' placeholder='masukan nomor body' style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                    }} value={kirim.nomor_body} onChangeText={x => setKirim({
                        ...kirim,
                        nomor_body: x
                    })} />
                </View>


                <View style={{
                    paddingVertical: 5,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        flex: 1,
                    }}>Kilometer Bus</Text>
                    <TextInput autoCapitalize='none' placeholder='masukan kilometer bus' style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                    }} value={kirim.kilometer} onChangeText={x => setKirim({
                        ...kirim,
                        kilometer: x
                    })} />
                </View>



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
                                        foto: [...foto, {
                                            nama: `data:${response.type};base64, ${response.base64}`,
                                            keterangan: kirim.keterangan
                                        }],
                                        keterangan: '',

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
                    setTimeout(() => {
                        axios.post(urlAPI + '/1add_evdal.php', kirim).then(res => {
                            console.log(res.data);
                            // setTimeout(() => {
                            setLoading(false);
                            navigation.replace('MainApp');
                            showMessage({
                                message: 'Data berhasil dikirm !',
                                type: 'success'
                            })
                            // }, 1000)

                        })
                    }, 1500)

                }} title="SUBMIT" warna={colors.primary} Icons="create-outline" />}
                {loading && <ActivityIndicator size="large" color={colors.primary} />}
            </ScrollView>


        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})