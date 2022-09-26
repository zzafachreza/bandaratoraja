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
        nama_unit: 'MG-01',
        nama_vendor: 'ACI',
        unit: 'RFU'
    });


    const _unit = [
        { label: 'MG-01', value: 'MG-01' },
        { label: 'MG-02', value: 'MG-02' },
        { label: 'MG-03', value: 'MG-03' },
        { label: 'MG-04', value: 'MG-04' },
        { label: 'MG-05', value: 'MG-05' },
        { label: 'MG-06', value: 'MG-06' },
        { label: 'MG-07', value: 'MG-07' },
        { label: 'MG-08', value: 'MG-08' },
        { label: 'VC-01', value: 'VC-01' },
        { label: 'VC-02', value: 'VC-02' },
        { label: 'VC-03', value: 'VC-03' },
        { label: 'VC-04', value: 'VC-04' },
        { label: 'VC-05', value: 'VC-05' },
        { label: 'VC-06', value: 'VC-06' },
        { label: 'VC-07', value: 'VC-07' },
        { label: 'VC-08', value: 'VC-08' },
        { label: 'WT-01', value: 'WT-01' },
        { label: 'WT-02', value: 'WT-02' },
        { label: 'WT-03', value: 'WT-03' },
        { label: 'DT-01', value: 'DT-01' },
        { label: 'DT-02', value: 'DT-02' },
        { label: 'DT-03', value: 'DT-03' },
        { label: 'DT-04', value: 'DT-04' },
        { label: 'DT-05', value: 'DT-05' },
        { label: 'DT-06', value: 'DT-06' },
        { label: 'DT-07', value: 'DT-07' },
        { label: 'DT-08', value: 'DT-08' },
        { label: 'DT-09', value: 'DT-09' },
        { label: 'DT-10', value: 'DT-10' },
        { label: 'EX-01', value: 'EX-01' },
        { label: 'EX-02', value: 'EX-02' },
        { label: 'TR-01', value: 'TR-01' },
        { label: 'TR-02', value: 'TR-02' },
        { label: 'FT-01', value: 'FT-01' },

    ]

    const _vendor = [
        { label: 'ACI', value: 'ACI' },
        { label: 'ATN', value: 'ATN' },
        { label: 'FBS', value: 'FBS' },
        { label: 'GIP', value: 'GIP' },
        { label: 'MESP', value: 'MESP' },
        { label: 'MJR', value: 'MJR' },
        { label: 'MMJ', value: 'MMJ' },
        { label: 'PKA', value: 'PKA' },
        { label: 'RPM', value: 'RPM' },
        { label: 'SMU', value: 'SMU' },

    ]
    const sendServer = () => {
        setLoading(true);

        setTimeout(() => {

            console.log('send', kirim);

            axios.post(urlAPI + 'v1_add_unit.php', kirim).then(res => {
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
                }}>MA & UA Unit</Text>
            </View>
            <ScrollView style={{
                padding: 10,
            }} showsVerticalScrollIndicator={false}>



                <MyPicker label="Nama Unit" onValueChange={x => setKirim({
                    ...kirim,
                    nama_unit: x
                })} data={_unit} />

                <MyGap jarak={10} />

                <MyPicker label="Nama Vendor" onValueChange={x => setKirim({
                    ...kirim,
                    nama_vendor: x
                })} data={_vendor} />

                <MyGap jarak={10} />


                <MyPicker label="MA & UA Unit" onValueChange={x => setKirim({
                    ...kirim,
                    unit: x
                })} data={[
                    {
                        value: 'RFU',
                        label: 'RFU'
                    },
                    {
                        value: 'BD',
                        label: 'BD'
                    },
                ]} />


                <MyGap jarak={10} />
                <MyInput multiline icon={false} label="Keterangan" onChangeText={x => setKirim({
                    ...kirim,
                    keterangan: x
                })} />



                <MyGap jarak={20} />








                {!loading && <MyButton onPress={sendServer} title="SUBMIT" warna={colors.primary} Icons="create-outline" />}
                {loading && <ActivityIndicator size="large" color={colors.primary} />}
            </ScrollView>


        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})