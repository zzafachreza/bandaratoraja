import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    SafeAreaView,
    RefreshControl,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import axios from 'axios';
import { colors } from '../../utils/colors';
import { windowWidth, fonts } from '../../utils/fonts';
import { MyButton, MyGap, MyInput } from '../../components';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { Icon } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import WebView from 'react-native-webview';

const wait = timeout => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};
export default function ({ navigation, route }) {
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const isFocused = useIsFocused();
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getTransaction();
        wait(2000).then(() => setRefreshing(false));
    }, []);


    useEffect(() => {
        if (isFocused) {

            getTransaction();
        }
    }, [isFocused])






    const getTransaction = () => {
        setRefreshing(true);

        getData('user').then(u => {
            setUser(u);
            console.log('user', u);

            axios
                .post(urlAPI + 'v1_data_laporan.php', {
                    fid_user: u.id,
                    id_departement: u.id_departement,
                    tipe: 'F1',
                    awal: tanggal.awal,
                    akhir: tanggal.akhir
                })
                .then(x => {
                    console.warn(x.data);
                    setData(x.data);
                    setRefreshing(false)
                });

        })

    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => navigation.navigate('AddLaporanDailyList', item)} style={{
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
                <View style={{
                    flexDirection: 'row',
                    marginVertical: 3,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        flex: 0.4,
                    }}>Status Laporan</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        flex: 0.1,
                    }}>:</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        flex: 1,
                    }}>{item.status}</Text>
                </View>
            </View>

            <View style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Icon type='ionicon' name='chevron-forward-outline' color={colors.primary} />
            </View>
        </TouchableOpacity >
    );

    const [tanggal, setTanggal] = useState({
        awal: moment().format('YYYY-MM-DD'),
        akhir: moment().format('YYYY-MM-DD')
    })

    const [loading, setLoading] = useState(false);
    const [download, setDownload] = useState(false);
    const SaveDownload = () => {


        Alert.alert(
            "ARFF TORAJA AIRPORT",
            "Download Laporan " + tanggal.awal + " s/d " + tanggal.akhir + " ?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK", onPress: () => {
                        setLoading(true);
                        setDownload(true);



                        Alert.alert(
                            "ARFF TORAJA AIRPORT",
                            "Download Berhasil",
                            [

                                {
                                    text: "OK", onPress: () => {
                                        setDownload(false);
                                        setLoading(false);
                                    }
                                }
                            ],

                        );

                    }
                }
            ],

        );

    }

    return (
        <>

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.primary]}
                    />
                }
            >
                <View style={{
                    backgroundColor: colors.primary,
                    padding: 20,
                    justifyContent: 'center',
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    marginBottom: 5,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 20,
                        color: colors.white,
                        marginBottom: 5,
                    }}>Arsip Ceklis Harian F1
                    </Text>

                </View>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1,
                        padding: 5,
                    }}>
                        <DatePicker
                            style={{ width: 200 }}
                            date={tanggal.awal}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36,
                                    borderWidth: 0,
                                    borderRadius: 10,
                                    backgroundColor: colors.white
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {
                                setTanggal({
                                    ...tanggal,
                                    awal: date
                                });
                                getTransaction();

                            }}
                        />
                    </View>
                    <View style={{
                        flex: 1,
                        padding: 5,
                    }}>
                        <DatePicker
                            style={{ width: 200 }}
                            date={tanggal.akhir}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36,
                                    borderWidth: 0,
                                    borderRadius: 10,
                                    backgroundColor: colors.white
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {
                                setTanggal({
                                    ...tanggal,
                                    akhir: date
                                });
                                getTransaction();

                            }}
                        />
                    </View>
                </View>


                {loading && download && <WebView source={{
                    uri: 'https://bandaratoraja.zavalabs.com/pdf/f1_all.php?awal=' + tanggal.awal + '&akhir=' + tanggal.akhir + '&fid_user=' + user.id
                }} />}

                {!loading && <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />}
                {loading && <View style={{ flex: 1, marginTop: 100 }}><ActivityIndicator color={colors.primary} size="large" /></View>}
            </ScrollView>
            {!loading && user.id_departement == 2 && <View style={{
                padding: 10,
            }}><MyButton onPress={SaveDownload} warna={colors.success} title="DOWNLOAD" Icons="download-outline" />
            </View>}

        </>
    );
}

const styles = StyleSheet.create({});
