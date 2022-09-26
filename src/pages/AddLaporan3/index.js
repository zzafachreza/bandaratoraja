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
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { showMessage } from 'react-native-flash-message';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import { maskJs, maskCurrency } from 'mask-js';

export default function ({ navigation, route }) {
    const [loading, setLoading] = useState(false);
    const [kirim, setKirim] = useState({
        kode: route.params.kode,
        cuaca: 'Cerah'
    });

    const sendServer = () => {
        setLoading(true);

        setTimeout(() => {

            console.log('send', kirim);

            axios.post(urlAPI + 'v1_add_cuaca.php', kirim).then(res => {
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
                }}>Kondisi Cuaca</Text>
            </View>
            <ScrollView style={{
                padding: 10,
            }} showsVerticalScrollIndicator={false}>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1,
                        paddingRight: 10,
                    }}>

                        <MyInput maxLength={5} value={kirim.jam_mulai} keyboardType='number-pad' icon={false} label="Jam Mulai" onChangeText={x => setKirim({
                            ...kirim,
                            jam_mulai: maskJs('99:99', x)
                        })} />
                    </View>


                    <View style={{
                        flex: 1,
                        paddingLeft: 10,
                    }}>
                        <MyInput maxLength={5} value={kirim.jam_selesai} keyboardType='number-pad' icon={false} label="Jam Selesai" onChangeText={x => setKirim({
                            ...kirim,
                            jam_selesai: maskJs('99:99', x)
                        })} />
                    </View>

                </View>


                <MyPicker label="Cuaca" onValueChange={x => setKirim({
                    ...kirim,
                    cuaca: x
                })} data={[
                    {
                        value: 'Cerah',
                        label: 'Cerah'
                    },
                    {
                        value: 'Berawan',
                        label: 'Berawan'
                    }, {
                        value: 'Hujan',
                        label: 'Hujan'
                    },
                    {
                        value: 'Basah',
                        label: 'Basah'
                    },
                    {
                        value: 'Kering',
                        label: 'Kering'
                    }
                ]} />

                <MyGap jarak={20} />








                {!loading && <MyButton onPress={sendServer} title="SUBMIT" warna={colors.primary} Icons="create-outline" />}
                {loading && <ActivityIndicator size="large" color={colors.primary} />}
            </ScrollView>


        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})