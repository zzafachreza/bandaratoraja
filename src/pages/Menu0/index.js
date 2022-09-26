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
    ActivityIndicator
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
import { maskJs, maskCurrency } from 'mask-js';

export default function Menu0({ navigation }) {

    const [kirim, setKirim] = useState({
        unit: '',
        waktu_tidur: '',
        tensi: '',
        koridor: ''
    });
    const myDate = new Date();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        getData('user').then(res => {
            setUser(res);
            setKirim({
                ...kirim,
                fid_user: res.id
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

        var weekdays = new Array(7);
        weekdays[0] = "Minggu";
        weekdays[1] = "Senin";
        weekdays[2] = "Selasa";
        weekdays[3] = "Rabu";
        weekdays[4] = "Kamis";
        weekdays[5] = "Jumat";
        weekdays[6] = "Sabtu";




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
        var dateTime = weekdays[now.getDay()] + ', ' + day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
        return dateTime;
    }

    const [today, setToday] = useState(getToday());

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
            }}>MONITORING KESEHATAN</Text>

            <View style={{
                padding: 10,
                backgroundColor: colors.secondary,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 20,
                    color: colors.primary,
                }}>{user.nama_lengkap}</Text>
                <Text style={{
                    borderBottomColor: colors.border,
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 25,
                    color: colors.tertiary,
                }}>
                    {today}
                </Text>
            </View>
            <ScrollView style={{
                paddingHorizontal: 10,
            }} showsVerticalScrollIndicator={false}>





                <View style={{
                    paddingVertical: 5,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        flex: 1,
                    }}>Kode Unit</Text>
                    <TextInput autoCapitalize='none' placeholder='masukan unit' style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                    }} value={kirim.unit} onChangeText={x => setKirim({
                        ...kirim,
                        unit: x
                    })} />
                </View>

                <View style={{
                    paddingVertical: 5,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        flex: 1,
                    }}>Durasi Tidur</Text>
                    <TextInput autoCapitalize='none' placeholder='masukan waktu tidur' style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                    }} value={kirim.waktu_tidur} onChangeText={x => setKirim({
                        ...kirim,
                        waktu_tidur: x
                    })} />
                </View>


                <View style={{
                    paddingVertical: 5,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        flex: 1,
                    }}>Tensi</Text>
                    <TextInput autoCapitalize='none' placeholder=' ( . . . / . . . )' style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                    }} value={kirim.tensi} onChangeText={x => {


                        setKirim({
                            ...kirim,
                            tensi: maskJs('999/99', x)
                        })
                    }} />
                </View>

                <View style={{
                    paddingVertical: 5,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        flex: 1,
                    }}>Koridor</Text>
                    <TextInput autoCapitalize='none' placeholder='masukan koridor' style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                    }} value={kirim.koridor} onChangeText={x => setKirim({
                        ...kirim,
                        koridor: x
                    })} />
                </View>



                <MyGap jarak={10} />
                {!loading && <MyButton onPress={() => {

                    if (kirim.unit.length === 0) {
                        showMessage({
                            message: 'Maaf kode unit masih kosong !',
                        });
                    } else if (kirim.waktu_tidur.length === 0) {
                        showMessage({
                            message: 'Maaf durasi tidur masih kosong !',
                        });
                    } else if (kirim.tensi.length === 0) {
                        showMessage({
                            message: 'Maaf tensi masih kosong !',
                        });
                    } else if (kirim.koridor.length === 0) {
                        showMessage({
                            message: 'Maaf koridor masih kosong !',
                        });
                    } else {
                        setLoading(true);

                        console.log(kirim);

                        axios.post(urlAPI + '/1add_kesehatan.php', kirim).then(res => {
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
                    }



                }} title="SUBMIT" warna={colors.primary} Icons="create-outline" />}
                {loading && <ActivityIndicator size="large" color={colors.primary} />}
            </ScrollView>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})