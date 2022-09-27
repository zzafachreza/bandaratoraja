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
import { useIsFocused } from '@react-navigation/native';

export default function ({ navigation, route }) {
    const isFocused = useIsFocused();
    const kode = route.params.kode;
    const item = route.params;
    const [catatan, setCatatan] = useState(route.params.catatan);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (isFocused) {

        }
    }, [isFocused])

    const SaveCatatan = () => {
        setLoading(true);
        setTimeout(() => {
            axios.post(urlAPI + 'v1_add_catatan.php', {
                kode: route.params.kode,
                catatan: catatan
            }).then(res => {
                setLoading(false);
                if (res.data.status == 200) {
                    Alert.alert('ARFF TORAJA AIRPORT', res.data.messege);
                    navigation.goBack();
                } else {
                    console.warn(res.data.messege);
                }
                console.log(res.data);
            })
        }, 1200)
    }









    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 10,
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{
                    margin: 10,
                    padding: 10,
                    backgroundColor: colors.white,
                    borderRadius: 10,
                    marginVertical: 5,
                    flexDirection: 'row'

                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                            color: colors.primary,
                        }}>{item.hari}, {item.tanggal} {item.jam.substring(0, 5)}</Text>
                        <View style={{
                            flexDirection: 'row',
                            marginVertical: 3,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: 12,
                                flex: 0.4,
                            }}>Kendaraan</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: 12,
                                flex: 0.1,
                            }}>:</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: 12,
                                flex: 1,
                            }}>{item.kendaraan} / FOAM TENDER</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            marginVertical: 3,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: 12,
                                flex: 0.4,
                            }}>Pembuat</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: 12,
                                flex: 0.1,
                            }}>:</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: 12,
                                flex: 1,
                            }}>{item.username} / {item.nama_lengkap}</Text>
                        </View>
                    </View>
                </View>

                <MyButton warna={colors.primary} title="Pemeriksaan Sebelum Menyalakan Mesin" onPress={() => navigation.navigate('AddLaporanDaily1', {
                    kode: item.kode,
                    menu: 'Pemeriksaan Sebelum Menyalakan Mesin',
                    form: 1
                })} />
                <MyGap jarak={5} />
                <MyButton warna={colors.primary} title="Pemeriksaan Setelah Menyalakan Mesin" onPress={() => navigation.navigate('AddLaporanDaily1', {
                    kode: item.kode,
                    menu: 'Pemeriksaan Setelah Menyalakan Mesin',
                    form: 2
                })} />
                <MyGap jarak={5} />
                <MyButton warna={colors.primary} title="Jumlah Bahan Pemadam" onPress={() => navigation.navigate('AddLaporanDaily1', {
                    kode: item.kode,
                    menu: 'Jumlah Bahan Pemadam',
                    form: 3
                })} />
                <MyGap jarak={5} />
                <MyButton warna={colors.primary} title="Ruangan Cabin Pengemudi" onPress={() => navigation.navigate('AddLaporanDaily1', {
                    kode: item.kode,
                    menu: 'Ruangan Cabin Pengemudi',
                    form: 4
                })} />
                <MyGap jarak={5} />
                <MyButton warna={colors.primary} title="Ruangan Cabin Kanan" onPress={() => navigation.navigate('AddLaporanDaily1', {
                    kode: item.kode,
                    menu: 'Ruangan Cabin Kanan',
                    form: 5
                })} />
                <MyGap jarak={5} />
                <MyButton warna={colors.primary} title="Ruangan Cabin Kiri" onPress={() => navigation.navigate('AddLaporanDaily1', {
                    kode: item.kode,
                    menu: 'Ruangan Cabin Kiri',
                    form: 6
                })} />
                <MyGap jarak={5} />
                <MyButton warna={colors.primary} title="Ruangan Cabin Belakang" onPress={() => navigation.navigate('AddLaporanDaily1', {
                    kode: item.kode,
                    menu: 'Ruangan Cabin Belakang',
                    form: 7
                })} />
                <MyGap jarak={5} />
                <MyButton warna={colors.primary} title="Ruangan Cabin Atas" onPress={() => navigation.navigate('AddLaporanDaily1', {
                    kode: item.kode,
                    menu: 'Ruangan Cabin Atas',
                    form: 8
                })} />
                <MyGap jarak={5} />
                <MyInput label="Catatan" value={catatan} onChangeText={x => {
                    setCatatan(x)
                }} icon={false} multiline />
                <MyGap jarak={10} />

                {!loading && <MyButton onPress={SaveCatatan} warna={colors.primary} title="Simpan Selesai" Icons="checkmark-circle-outline" />}

                {loading && <ActivityIndicator color={colors.primary} size="large" />}



            </ScrollView>
        </SafeAreaView >

    )
}

const styles = StyleSheet.create({})