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

export default function Menu3({ navigation }) {

    const [kirim, setKirim] = useState({});
    const myDate = new Date();
    const [loading, setLoading] = useState(false);

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

    setInterval(() => {
        setToday(getToday());
    }, 1000)

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
            }}>LAPORAN PEMERIKSAAN SETELAH OPERASI</Text>
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
                    }}>Nama Pramudi</Text>
                    <TextInput autoCapitalize='none' placeholder='masukan nama pramudi' style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                    }} value={kirim.nama_pramudi} onChangeText={x => setKirim({
                        ...kirim,
                        nama_pramudi: x
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

                <View style={{
                    paddingVertical: 5,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        flex: 1,
                    }}>Keluhan</Text>
                    <TextInput autoCapitalize='none' placeholder='masukan keluhan' style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                    }} multiline value={kirim.keluhan} onChangeText={x => setKirim({
                        ...kirim,
                        keluhan: x
                    })} />
                </View>

                <MyGap jarak={10} />
                {!loading && <MyButton onPress={() => {

                    setLoading(true);

                    console.log(kirim);

                    axios.post(urlAPI + '/1add_operasi.php', kirim).then(res => {
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
            </ScrollView>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})