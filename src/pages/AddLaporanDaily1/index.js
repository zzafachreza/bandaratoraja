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
                }}>Checklist Harian Mobil Foam Tender 1 (F1)</Text>
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



                {kirim.form == 1 && (
                    <View>
                        {/* olimesin */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={1} soal="Oli Mesin" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            olimesin: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.olimesin == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            olimesin: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.olimesin == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            olimesin: 'Penuh'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.olimesin == 'Penuh' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Penuh</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            olimesin: 'Kurang'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.olimesin == 'Kurang' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Kurang</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {/* olipowersteering */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={2} soal="Oli Power Steering" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            olipowersteering: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.olipowersteering == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            olipowersteering: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.olipowersteering == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            olipowersteering: 'Penuh'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.olipowersteering == 'Penuh' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Penuh</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            olipowersteering: 'Kurang'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.olipowersteering == 'Kurang' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Kurang</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/* Transmisi */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={3} soal="Transmisi" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            transmisi: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.transmisi == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            transmisi: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.transmisi == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            transmisi: 'Penuh'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.transmisi == 'Penuh' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Penuh</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            transmisi: 'Kurang'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.transmisi == 'Kurang' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Kurang</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>


                        {/* Bahan Bakar */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={4} soal="Bahan Bakar" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            bahan_bakar: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.bahan_bakar == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            bahan_bakar: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.bahan_bakar == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            bahan_bakar: 'Penuh'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.bahan_bakar == 'Penuh' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Penuh</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            bahan_bakar: 'Kurang'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.bahan_bakar == 'Kurang' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Kurang</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                )}

                {kirim.form == 2 && (
                    <View>
                        <MyInput label="1. Tekanan Tabung (1)" icon={false} placeholder="jumlah" keyboardType="number-pad" value={kirim.tekanan_tabung1} onChangeText={
                            x => setKirim({
                                ...kirim,
                                tekanan_tabung1: x
                            })
                        } />
                        <MyGap jarak={10} />
                        <MyInput label="2. Tekanan Tabung (2)" icon={false} placeholder="jumlah" keyboardType="number-pad" value={kirim.tekanan_tabung2} onChangeText={
                            x => setKirim({
                                ...kirim,
                                tekanan_tabung2: x
                            })
                        } />
                        <MyGap jarak={10} />
                        <MyInput label="3. Tekanan Tabung (P)" icon={false} placeholder="jumlah" keyboardType="number-pad" value={kirim.tekanan_tabungp} onChangeText={
                            x => setKirim({
                                ...kirim,
                                tekanan_tabungp: x
                            })
                        } />
                        <MyGap jarak={10} />
                        <MyInput label="4. Suhu Oli Gearbox" icon={false} placeholder="jumlah" keyboardType="number-pad" value={kirim.suhuoligearbox} onChangeText={
                            x => setKirim({
                                ...kirim,
                                suhuoligearbox: x
                            })
                        } />
                        <MyGap jarak={10} />
                        <MyInput label="5. Tegangan Baterai" icon={false} placeholder="jumlah" keyboardType="number-pad" value={kirim.teganganbaterai} onChangeText={
                            x => setKirim({
                                ...kirim,
                                teganganbaterai: x
                            })
                        } />
                        <MyGap jarak={10} />
                        <MyInput label="6. Konsumsi Bahan Bakar" icon={false} placeholder="jumlah" keyboardType="number-pad" value={kirim.konsumsibahanbakar} onChangeText={
                            x => setKirim({
                                ...kirim,
                                konsumsibahanbakar: x
                            })
                        } />
                        <MyGap jarak={10} />
                        <MyInput label="Keterangan Lama Pemanasan" multiline icon={false} value={kirim.keteranganlamapemanasan} onChangeText={
                            x => setKirim({
                                ...kirim,
                                keteranganlamapemanasan: x
                            })
                        } placeholder="Masukan keterangan" />
                        <MyGap jarak={10} />

                    </View>
                )}

                {kirim.form == 3 && (
                    <View>
                        {/* Foam */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={1} soal="Foam" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            foam: 'Penuh'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.foam == 'Penuh' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Penuh</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            foam: 'Kurang'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.foam == 'Kurang' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Kurang</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>480 Liter</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* drypower */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={2} soal="Dry Power" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            drypower: 'Penuh'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.drypower == 'Penuh' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Penuh</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            drypower: 'Kurang'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.drypower == 'Kurang' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Kurang</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>250 Kg</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* air */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={3} soal="Air" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            air: 'Penuh'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.air == 'Penuh' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Penuh</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            air: 'Kurang'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.air == 'Kurang' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Kurang</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>4.000 Liter</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )}

                {kirim.form == 4 && (
                    <View>
                        {/* lampudepan */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={1} soal="Lampu Depan" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            lampudepan: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.lampudepan == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            lampudepan: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.lampudepan == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Saklar</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* lampuweser */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={2} soal="Lampu Weser" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            lampuweser: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.lampuweser == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            lampuweser: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.lampuweser == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Saklar</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* lamputandahatihati */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={3} soal="Lampu Tanda Hati-Hati" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            lamputandahatihati: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.lamputandahatihati == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            lamputandahatihati: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.lamputandahatihati == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Saklar</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* lamporotari */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={4} soal="Lampu Rotari" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            lamporotari: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.lamporotari == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            lamporotari: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.lamporotari == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Saklar</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* klaksontrompet */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={5} soal="Klakson Trompet" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            klaksontrompet: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.klaksontrompet == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            klaksontrompet: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.klaksontrompet == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Saklar</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* klaksonkecil */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={6} soal="Klakson Kecil" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            klaksonkecil: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.klaksonkecil == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            klaksonkecil: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.klaksonkecil == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Saklar</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* sirine */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={7} soal="Sirine" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            sirine: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.sirine == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            sirine: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.sirine == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Saklar</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* wipper */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={8} soal="Wipper" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            wipper: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.wipper == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            wipper: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.wipper == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Saklar</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* lampusorot */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={9} soal="Lampu Sorot" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            lampusorot: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.lampusorot == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            lampusorot: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.lampusorot == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Saklar</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* radiokomuinikasi */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={10} soal="Radio komunikasi" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            radiokomuinikasi: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.radiokomuinikasi == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            radiokomuinikasi: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.radiokomuinikasi == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* bajutahanapipengemudi */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={11} soal="Baju Tahan Api" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            bajutahanapipengemudi: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.bajutahanapipengemudi == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            bajutahanapipengemudi: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.bajutahanapipengemudi == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>5 Set</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )}

                {kirim.form == 5 && (
                    <View>
                        {/* tabungbazkanan */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={1} soal="Tabung BAZ" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            tabungbazkanan: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.tabungbazkanan == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            tabungbazkanan: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.tabungbazkanan == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>2 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* tabungnitrogen */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={2} soal="Tabung Nitrogen" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            tabungnitrogen: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.tabungnitrogen == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            tabungnitrogen: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.tabungnitrogen == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Saklar</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* hoserell */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={3} soal="Hose Rell DCP / Nozzel" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            hoserell: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.hoserell == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            hoserell: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.hoserell == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Roll</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* pengukurtekanankanan */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={4} soal="Pengukur Tekanan " />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            pengukurtekanankanan: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.pengukurtekanankanan == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            pengukurtekanankanan: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.pengukurtekanankanan == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* handline */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={5} soal="Handline" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            handline: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.handline == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            handline: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.handline == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>2 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* chainsaw */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={6} soal="Chainsaw" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            chainsaw: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.chainsaw == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            chainsaw: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.chainsaw == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* tali */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={7} soal="Tali" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            tali: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.tali == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            tali: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.tali == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>2 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )}

                {kirim.form == 6 && (
                    <View>
                        {/* tabungbazkiri */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={1} soal="Tabung BAZ" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            tabungbazkiri: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.tabungbazkiri == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            tabungbazkiri: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.tabungbazkiri == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>2 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* selangrubber */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={2} soal="Selang Rubber" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            selangrubber: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.selangrubber == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            selangrubber: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.selangrubber == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>6 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* pengukurtekanankiri */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={3} soal="Pengukur Tekanan " />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            pengukurtekanankiri: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.pengukurtekanankiri == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            pengukurtekanankiri: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.pengukurtekanankiri == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>2 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* suctionport */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={4} soal="Suction Port" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            suctionport: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.suctionport == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            suctionport: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.suctionport == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Set</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* valvehandline */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={5} soal="Valve Hand Line" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            valvehandline: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.valvehandline == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            valvehandline: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.valvehandline == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>2 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* kapakbesar */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={6} soal="Kapak Besar" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            kapakbesar: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.kapakbesar == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            kapakbesar: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.kapakbesar == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* linggis */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={7} soal="Linggis" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            linggis: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.linggis == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            linggis: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.linggis == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* nozzel */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={8} soal="Nozzel" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            nozzel: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.nozzel == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            nozzel: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.nozzel == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>2 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* kuncikopling */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={9} soal="Kunci Kopling " />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            kuncikopling: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.kuncikopling == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            kuncikopling: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.kuncikopling == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>2 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* kapakkecil */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={10} soal="Kapak Kecil" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            kapakkecil: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.kapakkecil == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            kapakkecil: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.kapakkecil == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* palu */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={11} soal="Palu" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            palu: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.palu == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            palu: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.palu == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* hosereelair */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={12} soal="Hosereel Air" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            hosereelair: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.hosereelair == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            hosereelair: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.hosereelair == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Set</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* cutting */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={13} soal="Cutting" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            cutting: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.cutting == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            cutting: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.cutting == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>
                )}


                {kirim.form == 7 && (
                    <View>

                        {/* selanghidrolik */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={1} soal="Selang Hidrolik" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            selanghidrolik: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.selanghidrolik == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            selanghidrolik: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.selanghidrolik == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* selangrubberbelakang */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={2} soal="Selang Rubber" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            selangrubberbelakang: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.selangrubberbelakang == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            selangrubberbelakang: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.selangrubberbelakang == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>5 Roll</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* terpal */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={3} soal="Terpal" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            terpal: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.terpal == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            terpal: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.terpal == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>2 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* pelampung_filter */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={4} soal="Pelampung / Filter" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            pelampung_filter: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.pelampung_filter == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            pelampung_filter: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.pelampung_filter == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* wheelchock */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={5} soal="Wheel Chock" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            wheelchock: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.wheelchock == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            wheelchock: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.wheelchock == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>2 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* bajutahanapibelakang */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={6} soal="Baju Tahan Apir" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            bajutahanapibelakang: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.bajutahanapibelakang == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            bajutahanapibelakang: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.bajutahanapibelakang == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>2 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* fireblanket */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={7} soal="Fire Blanket" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            fireblanket: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.fireblanket == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            fireblanket: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.fireblanket == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>4 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* cuttinghidrolik */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={8} soal="Cutting Hidrolik" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            cuttinghidrolik: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.cuttinghidrolik == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            cuttinghidrolik: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.cuttinghidrolik == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* tandulipat */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={9} soal="Tandu Lipat" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            tandulipat: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.tandulipat == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            tandulipat: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.tandulipat == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>2 Set</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* compressorbaz */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={10} soal="Compressor BAZ" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            compressorbaz: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.compressorbaz == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            compressorbaz: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.compressorbaz == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* mesinhidrolik */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={11} soal="Mesin Hidrolik" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            mesinhidrolik: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.mesinhidrolik == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            mesinhidrolik: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.mesinhidrolik == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>
                )}

                {kirim.form == 8 && (
                    <View>
                        {/* linggisatas */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={1} soal="Linggis" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            linggisatas: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.linggisatas == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            linggisatas: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.linggisatas == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* hook */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={2} soal="Hook" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            hook: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.hook == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            hook: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.hook == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>1 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* tangga */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={3} soal="Tangga" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            tangga: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.tangga == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            tangga: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.tangga == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>2 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* selangsupply */}
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <MySoal nomor={4} soal="Selang Supply" />
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>

                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            selangsupply: 'Baik'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.selangsupply == 'Baik' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Baik</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setKirim({
                                            ...kirim,
                                            selangsupply: 'Rusak'
                                        })
                                    }} style={styles.box}>
                                        <Icon type='ionicon' name={kirim.selangsupply == 'Rusak' ? 'checkmark-circle' : 'checkmark-circle-outline'} color={colors.primary} />
                                        <Text style={styles.p1}>Rusak</Text>
                                    </TouchableOpacity>
                                    <View style={{
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
                                    }}>

                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: fonts.secondary[600]
                                        }}>2 Buah</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

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
    }
})