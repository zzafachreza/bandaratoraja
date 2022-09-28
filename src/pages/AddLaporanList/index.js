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
import { WebView } from 'react-native-webview';

export default function ({ navigation, route }) {
    const isFocused = useIsFocused();
    const kode = route.params.kode;

    const [catatan, setCatatan] = useState(route.params.catatan);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [download, setDownload] = useState(false);
    const [item, setItem] = useState(route.params);
    useEffect(() => {
        getData('user').then(u => {
            setUser(u);
        });
        axios.post(urlAPI + 'v1_get_laporan.php', {
            kode: route.params.kode,
        }).then(res => {
            setItem(res.data);
            console.log('get laporan', res.data);
        })
    }, [])

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

    const SaveDownload = () => {
        const urlDownload = 'https://bandaratoraja.zavalabs.com/pdf/f2_view.php?kode=' + item.kode + '&fid_user=' + user.id
        console.log(urlDownload);

        Alert.alert(
            "ARFF TORAJA AIRPORT",
            "Download Laporan ini ?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK", onPress: () => {
                        setDownload(true);



                        Alert.alert(
                            "ARFF TORAJA AIRPORT",
                            "Download Berhasil",
                            [

                                {
                                    text: "OK", onPress: () => {
                                        setDownload(false);

                                    }
                                }
                            ],

                        );

                    }
                }
            ],

        );



    }

    const SaveDone = () => {
        setLoading(true);
        setTimeout(() => {
            axios.post(urlAPI + 'v1_update_status.php', {
                kode: route.params.kode,
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
            backgroundColor: colors.white
        }}>

            {download && <WebView source={{
                uri: 'https://bandaratoraja.zavalabs.com/pdf/f2.php?kode=' + route.params.kode + '&fid_user=' + user.id
            }} />}

            {download && <View style={{ flex: 1, }}><ActivityIndicator color={colors.primary} size="large" /></View>}

            {!download && item.status != 'PROSES' &&
                <View style={{
                    flex: 1,
                    backgroundColor: 'red'
                }}>
                    <WebView source={{ uri: 'https://bandaratoraja.zavalabs.com/pdf/f2_view.php?kode=' + route.params.kode + '&fid_user=' + user.id }} />
                </View>}

            {item.status == 'PROSES' &&
                <ScrollView style={{
                    padding: 10,
                }} showsVerticalScrollIndicator={false}>

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

                    <MyButton warna={colors.primary} title="Jumlah Bahan Kimia" onPress={() => navigation.navigate('AddLaporan1', {
                        kode: item.kode,
                        menu: 'Jumlah Bahan Kimia',
                        form: 9
                    })} />
                    <MyGap jarak={5} />
                    <MyButton warna={colors.primary} title="Ruangan Cabin Pengemudi" onPress={() => navigation.navigate('AddLaporan1', {
                        kode: item.kode,
                        menu: 'Ruangan Cabin Pengemudi',
                        form: 10
                    })} />
                    <MyGap jarak={5} />
                    <MyButton warna={colors.primary} title="Ruangan Cabin Kanan" onPress={() => navigation.navigate('AddLaporan1', {
                        kode: item.kode,
                        menu: 'Ruangan Cabin Kanan',
                        form: 11
                    })} />
                    <MyGap jarak={5} />
                    <MyButton warna={colors.primary} title="Ruangan Cabin Kiri" onPress={() => navigation.navigate('AddLaporan1', {
                        kode: item.kode,
                        menu: 'Ruangan Cabin Kiri',
                        form: 12
                    })} />
                    <MyGap jarak={5} />
                    <MyButton warna={colors.primary} title="Ruangan Cabin Belakang" onPress={() => navigation.navigate('AddLaporan1', {
                        kode: item.kode,
                        menu: 'Ruangan Cabin Belakang',
                        form: 13
                    })} />
                    <MyGap jarak={5} />
                    <MyButton warna={colors.primary} title="Ruangan Cabin Atas" onPress={() => navigation.navigate('AddLaporan1', {
                        kode: item.kode,
                        menu: 'Ruangan Cabin Atas',
                        form: 14
                    })} />

                    <MyGap jarak={5} />
                    {item.status == 'MENUNGGU DIVERIFIKASI' &&
                        <View>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 30
                            }}>Catatan</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: windowWidth / 30
                            }}>{catatan}</Text>
                        </View>
                    }
                    {item.status == 'PROSES' && <MyInput label="Catatan" value={catatan} onChangeText={x => {
                        setCatatan(x)
                    }} icon={false} multiline />}

                    <MyGap jarak={10} />

                    {!loading && item.status == 'PROSES' && <MyButton onPress={SaveCatatan} warna={colors.primary} title="Simpan Selesai" Icons="checkmark-circle-outline" />}
                </ScrollView>
            }

            <View style={{
                padding: 10,
            }}>
                {!loading && item.status == 'MENUNGGU DIVERIFIKASI' && user.id_departement == 2 && <MyButton onPress={SaveDone} warna={colors.success} title="VERIFIKASI" Icons="checkmark-circle-outline" />}

                {!loading && item.status == 'SUDAH DIVERIFIKASI' && user.id_departement == 2 && <MyButton onPress={SaveDownload} warna={colors.success} title="DOWNLOAD" Icons="download-outline" />}

                {loading && <ActivityIndicator color={colors.primary} size="large" />}
            </View>
        </SafeAreaView >

    )
}

const styles = StyleSheet.create({})