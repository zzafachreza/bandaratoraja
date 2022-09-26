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
} from 'react-native';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import axios from 'axios';
import { colors } from '../../utils/colors';
import { windowWidth, fonts } from '../../utils/fonts';

import 'intl';
import 'intl/locale-data/jsonp/en';
import { Icon } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';

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
                    tipe: 'F1'
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

    return (
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
                }}>DAFTAR LAPORAN
                </Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 25,
                    color: colors.white,
                    marginBottom: 10,
                }}>Daily Activity GE - ACI -MMJ Road Matenance  </Text>
            </View>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
