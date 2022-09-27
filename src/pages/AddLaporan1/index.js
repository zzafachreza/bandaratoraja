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
    const [kirim, setKirim] = useState(route.params);

    useEffect(() => {
        getDataTransaction();
    }, [])

    const getDataTransaction = () => {
        axios.post(urlAPI + 'v1_get_laporan.php', {
            kode: route.params.kode,
            menu: route.params.menu,
            form: route.params.form,
        }).then(res => {
            console.log(res.data);
            setKirim(res.data)
        })
    }


    const sendServer = () => {
        setLoading(true);

        setTimeout(() => {

            console.log('send', kirim);

            axios.post(urlAPI + 'v1_update_laporan.php', kirim).then(res => {
                console.log(res.data)

                if (res.data.status == 200) {
                    Alert.alert('ARFF TORAJA AIRPORT', res.data.messege);
                    navigation.goBack();
                }
            })

            setLoading(false)
        }, 1200)
    }

    const MySoal = ({ nomor, soal }) => {
        return (
            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 12,
                    color: colors.primary
                }}>{nomor}. </Text>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 12,
                    color: colors.primary
                }}>{soal}</Text>
            </View>
        )
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
                    fontSize: windowWidth / 25,
                    color: colors.white,
                    marginBottom: 5,
                }}>Checklist Harian Mobil Foam Tender 2 (F2)</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 25,
                    color: colors.white,
                    marginBottom: 10,
                }}>{kirim.menu}</Text>
            </View>
            <ScrollView style={{
                padding: 10,
            }} showsVerticalScrollIndicator={false}>



                {kirim.form == 9 && (
                    <View>



                        {/* jumlahbahankimia_bahanbakar */}
                        <View style={{ paddingVertical: 10 }}>
                            <MySoal nomor={1} soal="Bahan Bakar" />
                            <View>
                                <View style={styles.myrow}>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({ ...kirim, jumlahbahankimia_bahanbakar: 'Penuh' })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.jumlahbahankimia_bahanbakar == 'Penuh' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Penuh</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({ ...kirim, jumlahbahankimia_bahanbakar: 'Kurang' })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.jumlahbahankimia_bahanbakar == 'Kurang' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Kurang</Text>
                                    </TouchableOpacity>
                                    <View style={styles.paten}>
                                        <Text style={styles.pWhite}>200 Liter</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* jumlahbahankimia_foam */}
                        <View style={{ paddingVertical: 10 }}>
                            <MySoal nomor={2} soal="Foam" />
                            <View>
                                <View style={styles.myrow}>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({ ...kirim, jumlahbahankimia_foam: 'Penuh' })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.jumlahbahankimia_foam == 'Penuh' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Penuh</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({ ...kirim, jumlahbahankimia_foam: 'Kurang' })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.jumlahbahankimia_foam == 'Kurang' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Kurang</Text>
                                    </TouchableOpacity>
                                    <View style={styles.paten}>
                                        <Text style={styles.pWhite}>240 Liter</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* jumlahbahankimia_drypowder */}
                        <View style={{ paddingVertical: 10 }}>
                            <MySoal nomor={3} soal="Dry powder" />
                            <View>
                                <View style={styles.myrow}>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({ ...kirim, jumlahbahankimia_drypowder: 'Penuh' })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.jumlahbahankimia_drypowder == 'Penuh' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Penuh</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({ ...kirim, jumlahbahankimia_drypowder: 'Kurang' })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.jumlahbahankimia_drypowder == 'Kurang' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Kurang</Text>
                                    </TouchableOpacity>
                                    <View style={styles.paten}>
                                        <Text style={styles.pWhite}>250 Kg</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* jumlahbahankimia_air */}
                        <View style={{ paddingVertical: 10 }}>
                            <MySoal nomor={4} soal="Air" />
                            <View>
                                <View style={styles.myrow}>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({ ...kirim, jumlahbahankimia_air: 'Penuh' })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.jumlahbahankimia_air == 'Penuh' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Penuh</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({ ...kirim, jumlahbahankimia_air: 'Kurang' })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.jumlahbahankimia_air == 'Kurang' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Kurang</Text>
                                    </TouchableOpacity>
                                    <View style={styles.paten}>
                                        <Text style={styles.pWhite}>2.000 Liter</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <MyInput label="Keterangan Lama Pemanasan" icon={false} placeholder="masukan keterangan lama pemanasan" value={kirim.jumlahbahankimia_keteranganlamapemanasan} onChangeText={
                            x => setKirim({
                                ...kirim,
                                jumlahbahankimia_keteranganlamapemanasan: x
                            })
                        } />

                        <MyGap jarak={20} />



                    </View>
                )}

                {kirim.form == 10 && (
                    <View>

                        <View style={{ paddingVertical: 10 }}><MySoal nomor={1} soal='Lampu Depan' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinpengemudi_lampudepan: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinpengemudi_lampudepan == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinpengemudi_lampudepan: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinpengemudi_lampudepan == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Saklar</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={2} soal='Lampu Weser' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinpengemudi_lampuweser: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinpengemudi_lampuweser == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinpengemudi_lampuweser: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinpengemudi_lampuweser == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Saklar</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={3} soal='Lampu Tanda Hati-Hati' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinpengemudi_lamputandahatihati: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinpengemudi_lamputandahatihati == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinpengemudi_lamputandahatihati: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinpengemudi_lamputandahatihati == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Saklar</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={4} soal='Lampu Rotari' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinpengemudi_lampurotari: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinpengemudi_lampurotari == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinpengemudi_lampurotari: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinpengemudi_lampurotari == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Saklar</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={5} soal='Klakson Trompet' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinpengemudi_klaksontrompet: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinpengemudi_klaksontrompet == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinpengemudi_klaksontrompet: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinpengemudi_klaksontrompet == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Saklar</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={6} soal='Klakson Kecil' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinpengemudi_klaksonkecil: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinpengemudi_klaksonkecil == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinpengemudi_klaksonkecil: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinpengemudi_klaksonkecil == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Saklar</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={7} soal='Sirine' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinpengemudi_sirine: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinpengemudi_sirine == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinpengemudi_sirine: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinpengemudi_sirine == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Saklar</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={8} soal='Wipper' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinpengemudi_wipper: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinpengemudi_wipper == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinpengemudi_wipper: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinpengemudi_wipper == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Saklar</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={9} soal='Lampu Sorot' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinpengemudi_lampusorot: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinpengemudi_lampusorot == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinpengemudi_lampusorot: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinpengemudi_lampusorot == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Saklar</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={10} soal='Radio komunikasi' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinpengemudi_radiokomunikasi: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinpengemudi_radiokomunikasi == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinpengemudi_radiokomunikasi: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinpengemudi_radiokomunikasi == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Buah</Text></View></View></View></View>


                        <MyInput label="Keterangan Lama Pemanasan" icon={false} placeholder="masukan keterangan lama pemanasan" value={kirim.ruangancabinpengemudi_keteranganlamapemanasan} onChangeText={
                            x => setKirim({
                                ...kirim,
                                ruangancabinpengemudi_keteranganlamapemanasan: x
                            })
                        } />
                        <MyGap jarak={20} />

                    </View>
                )}

                {kirim.form == 11 && (
                    <View>

                        <View style={{ paddingVertical: 10 }}><MySoal nomor={1} soal='Tabung BAZ' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkanan_tabungbaz: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkanan_tabungbaz == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkanan_tabungbaz: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkanan_tabungbaz == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={2} soal='Sepatu Boots' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkanan_sepatuboots: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkanan_sepatuboots == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkanan_sepatuboots: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkanan_sepatuboots == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>2 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={3} soal='Baju Tahan Panas' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkanan_bajutahanpanas: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkanan_bajutahanpanas == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkanan_bajutahanpanas: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkanan_bajutahanpanas == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>3 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={4} soal='Sarung Tangan' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkanan_sarungtangan: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkanan_sarungtangan == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkanan_sarungtangan: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkanan_sarungtangan == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>3 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={5} soal='Helm ' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkanan_helm: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkanan_helm == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkanan_helm: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkanan_helm == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>3 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={6} soal='Tabung Nitrogen' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkanan_tabungnitrogen: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkanan_tabungnitrogen == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkanan_tabungnitrogen: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkanan_tabungnitrogen == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>2 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={7} soal='Hose Rell Foam / Air ' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkanan_hoserellfoamair: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkanan_hoserellfoamair == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkanan_hoserellfoamair: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkanan_hoserellfoamair == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Roll</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={8} soal='Hose Rell DCP / Nossel' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkanan_hoserelldcpnossel: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkanan_hoserelldcpnossel == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkanan_hoserelldcpnossel: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkanan_hoserelldcpnossel == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Setr</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={9} soal='Fan / Belalai ' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkanan_fanbelalai: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkanan_fanbelalai == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkanan_fanbelalai: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkanan_fanbelalai == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={10} soal='Pompa Hidrolik' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkanan_pompahidrolik: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkanan_pompahidrolik == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkanan_pompahidrolik: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkanan_pompahidrolik == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Unit</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={11} soal='Rantai Besi' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkanan_rantaibesi: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkanan_rantaibesi == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkanan_rantaibesi: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkanan_rantaibesi == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Buah</Text></View></View></View></View>

                        <MyInput label="Keterangan Lama Pemanasan" icon={false} placeholder="masukan keterangan lama pemanasan" value={kirim.ruangancabinkanan_keteranganlamapemanasan} onChangeText={
                            x => setKirim({
                                ...kirim,
                                ruangancabinkanan_keteranganlamapemanasan: x
                            })
                        } />
                        <MyGap jarak={20} />
                    </View>
                )}

                {kirim.form == 12 && (
                    <View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={1} soal='Tabung BAZ' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_tabungbaz: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_tabungbaz == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_tabungbaz: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_tabungbaz == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={2} soal='Sepatu boots' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_sepatuboots: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_sepatuboots == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_sepatuboots: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_sepatuboots == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>2 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={3} soal='Baju Tahan Panas' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_bajutahanpanas: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_bajutahanpanas == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_bajutahanpanas: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_bajutahanpanas == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>3 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={4} soal='Sarung Tangan' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_sarungtangan: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_sarungtangan == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_sarungtangan: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_sarungtangan == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>3 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={5} soal='Helm' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_helm: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_helm == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_helm: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_helm == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>3 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={6} soal='Suction Port' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_suctionport: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_suctionport == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_suctionport: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_suctionport == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={7} soal='Valve Hand line' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_valvehandline: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_valvehandline == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_valvehandline: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_valvehandline == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>2 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={8} soal='Hidran Suplai' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_hidransuplai: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_hidransuplai == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_hidransuplai: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_hidransuplai == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={9} soal='Sambungan Nozzel ' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_sambungannozzel: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_sambungannozzel == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_sambungannozzel: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_sambungannozzel == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>2 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={10} soal='Nozzel ' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_nozzel: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_nozzel == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_nozzel: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_nozzel == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>2 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={11} soal='Kunci Kopling ' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_kuncikopling: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_kuncikopling == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_kuncikopling: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_kuncikopling == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>7 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={12} soal='Tandu Lipat' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_tandulipat: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_tandulipat == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_tandulipat: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_tandulipat == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>2 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={13} soal='Entri suit' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_entrisuit: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_entrisuit == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_entrisuit: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_entrisuit == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>3 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={14} soal='Kompresor' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_kompresor: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_kompresor == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_kompresor: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_kompresor == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={15} soal='Fire Blanket ' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_fireblanket: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_fireblanket == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinkiri_fireblanket: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinkiri_fireblanket == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>2 Buah</Text></View></View></View></View>

                        <MyInput label="Keterangan Lama Pemanasan" icon={false} placeholder="masukan keterangan lama pemanasan" value={kirim.ruangancabinkiri_keteranganlamapemanasan} onChangeText={
                            x => setKirim({
                                ...kirim,
                                ruangancabinkiri_keteranganlamapemanasan: x
                            })
                        } />
                        <MyGap jarak={20} />
                    </View>
                )}


                {kirim.form == 13 && (
                    <View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={1} soal='Selang Hidrolik ' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_selanghidrolik: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_selanghidrolik == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_selanghidrolik: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_selanghidrolik == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={2} soal='Tali tambang' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_talitambang: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_talitambang == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_talitambang: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_talitambang == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>9 Roll</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={3} soal='Selang Rubber' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_selangrubber: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_selangrubber == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_selangrubber: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_selangrubber == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={4} soal='Terpal' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_terpal: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_terpal == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_terpal: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_terpal == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={5} soal='Dongkrak' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_dongkrak: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_dongkrak == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_dongkrak: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_dongkrak == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={6} soal='Pemotong Kawat' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_pemotongkawat: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_pemotongkawat == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_pemotongkawat: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_pemotongkawat == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={7} soal='Kapak Besar' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_kapakbesar: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_kapakbesar == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_kapakbesar: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_kapakbesar == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={8} soal='Linggis (CrowBar)' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_linggiscrowbar: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_linggiscrowbar == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_linggiscrowbar: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_linggiscrowbar == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={9} soal='Cutting Hidrolik' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_cuttinghidrolik: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_cuttinghidrolik == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_cuttinghidrolik: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_cuttinghidrolik == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={10} soal='Kapak Kecil ' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_kapakkecil: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_kapakkecil == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_kapakkecil: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_kapakkecil == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={11} soal='Sepatu Boots' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_sepatuboots: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_sepatuboots == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_sepatuboots: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_sepatuboots == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>2 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={12} soal='Apar' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_apar: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_apar == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinbelakang_apar: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinbelakang_apar == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Buah</Text></View></View></View></View>

                        <MyInput label="Keterangan Lama Pemanasan" icon={false} placeholder="masukan keterangan lama pemanasan" value={kirim.ruangancabinbelakang_keteranganlamapemanasan} onChangeText={
                            x => setKirim({
                                ...kirim,
                                ruangancabinbelakang_keteranganlamapemanasan: x
                            })
                        } />
                        <MyGap jarak={20} />
                    </View>
                )}


                {kirim.form == 14 && (
                    <View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={1} soal='Selang Suction' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinatas_selangsuction: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinatas_selangsuction == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinatas_selangsuction: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinatas_selangsuction == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>3 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={2} soal='Hook' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinatas_hook: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinatas_hook == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinatas_hook: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinatas_hook == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={3} soal='Tangga' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinatas_tangga: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinatas_tangga == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinatas_tangga: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinatas_tangga == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>1 Buah</Text></View></View></View></View>
                        <View style={{ paddingVertical: 10 }}><MySoal nomor={4} soal='Turret' /><View><View style={styles.myrow}><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinatas_turret: 'Baik' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinatas_turret == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Baik</Text></TouchableOpacity><TouchableOpacity onPress={() => { setKirim({ ...kirim, ruangancabinatas_turret: 'Rusak' }) }} style={styles.box}><Icon type='ionicon' name={kirim.ruangancabinatas_turret == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} /><Text style={styles.p1}>Rusak</Text></TouchableOpacity><View style={styles.paten}><Text style={styles.pWhite}>2 Buah</Text></View></View></View></View>

                        <MyInput label="Keterangan Lama Pemanasan" icon={false} placeholder="masukan keterangan lama pemanasan" value={kirim.ruangancabinatas_keteranganlamapemanasan} onChangeText={
                            x => setKirim({
                                ...kirim,
                                ruangancabinatas_keteranganlamapemanasan: x
                            })
                        } />
                        <MyGap jarak={20} />
                    </View>
                )}










                {!loading && <MyButton onPress={sendServer} title="SUBMIT" warna={colors.primary} Icons="create-outline" />}
                {loading && <ActivityIndicator size="large" color={colors.primary} />}
                <MyGap jarak={20} />
            </ScrollView>


        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    pOK: {
        fontFamily: fonts.secondary[600],
        fontSize: 12,
        left: 5,
        flex: 1,
        color: colors.white,
        textAlign: 'center'
    },

    p1: {
        flex: 0.8,
        left: 5,
        fontFamily: fonts.secondary[600],
        fontSize: 12,
        color: colors.primary,
        textAlign: 'center'
    },
    boxOK: {
        paddingLeft: 5,
        paddingVertical: 5,
        flexDirection: 'row',
        width: windowWidth / 4.5,
        marginVertical: 5,
        backgroundColor: colors.primary,

        borderWidth: 1,
        borderColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    box: {
        paddingLeft: 5,
        flexDirection: 'row',
        paddingVertical: 5,
        width: windowWidth / 4.5,
        marginVertical: 5,
        backgroundColor: colors.white,

        borderWidth: 1,
        borderColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    paten: {
        flex: 0.7,
        paddingLeft: 5,
        flexDirection: 'row',
        paddingVertical: 5,
        marginVertical: 5,
        backgroundColor: colors.black,

        borderWidth: 1,
        borderColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    pWhite: {
        color: colors.white,
        fontFamily: fonts.secondary[600]
    },
    myrow: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})