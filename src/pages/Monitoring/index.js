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
} from 'react-native';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import axios from 'axios';
import { colors } from '../../utils/colors';
import { windowWidth, fonts } from '../../utils/fonts';

import 'intl';
import 'intl/locale-data/jsonp/en';
import { Icon } from 'react-native-elements';
const wait = timeout => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};
export default function ({ navigation, route }) {
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getDataBarang();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {

        getData('user').then(u => {
            setUser(u);
            console.log('user', u)
        })
        getDataBarang();

    }, []);

    const getDataBarang = () => {
        setRefreshing(true);
        axios
            .post(urlAPI + '/1data_monitoring.php')
            .then(x => {
                setData(x.data);
                setRefreshing(false)
            });

    };

    const renderItem = ({ item, index }) => (
        <View
            // onPress={() => navigation.navigate('Menu1_detail', item)}
            style={{
                elevation: 1,
                marginVertical: 1,
            }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{
                    borderRightWidth: 1,
                    borderLeftWidth: 1,
                    backgroundColor: colors.secondary,
                    borderColor: colors.white,
                    flex: 0.2,
                    padding: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text
                        style={{
                            fontSize: windowWidth / 40,
                            color: colors.black,
                            fontFamily: fonts.secondary[400],
                        }}>
                        {index + 1}
                    </Text>
                </View>
                <View style={{
                    borderRightWidth: 1,
                    backgroundColor: colors.secondary,
                    borderColor: colors.white,
                    flex: 1.3,
                    padding: 5,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                }}>
                    <Text
                        style={{

                            fontSize: windowWidth / 40,
                            color: colors.black,
                            fontFamily: fonts.secondary[400],
                        }}>
                        {item.tanggal} {item.jam.substr(0, 5)}
                    </Text>
                </View>
                <View style={{
                    borderRightWidth: 1,
                    flex: 1,
                    backgroundColor: colors.secondary,
                    borderColor: colors.white,
                    padding: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text
                        style={{

                            fontSize: windowWidth / 40,
                            color: colors.black,
                            fontFamily: fonts.secondary[400],
                        }}>
                        {item.unit}
                    </Text>
                </View>

                <View style={{
                    borderRightWidth: 1,
                    flex: 1,
                    backgroundColor: colors.secondary,
                    borderColor: colors.white,
                    padding: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text
                        style={{

                            fontSize: windowWidth / 40,
                            color: colors.black,
                            fontFamily: fonts.secondary[400],
                        }}>
                        {item.waktu_tidur}
                    </Text>
                </View>


                <View style={{
                    borderRightWidth: 1,
                    backgroundColor: colors.secondary,
                    borderColor: colors.white,
                    flex: 0.5,
                    padding: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text
                        style={{

                            fontSize: windowWidth / 40,
                            color: colors.black,
                            fontFamily: fonts.secondary[400],
                        }}>
                        {item.tensi}
                    </Text>
                </View>

                <View style={{
                    borderRightWidth: 1,
                    backgroundColor: colors.secondary,
                    borderColor: colors.white,
                    flex: 0.5,
                    padding: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text
                        style={{

                            fontSize: windowWidth / 40,
                            color: colors.black,
                            fontFamily: fonts.secondary[400],
                        }}>
                        {item.koridor}
                    </Text>
                </View>

            </View>
        </View >
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
            style={{
                padding: 10,
                backgroundColor: colors.white
            }}>
            <View
                // onPress={() => navigation.navigate('Menu1_detail', item)}
                style={{
                    elevation: 1,
                    marginVertical: 1,
                }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        borderRightWidth: 1,
                        borderLeftWidth: 1,
                        backgroundColor: colors.primary,
                        borderColor: colors.white,
                        flex: 0.2,
                        padding: 5,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text
                            style={{
                                fontSize: windowWidth / 40,
                                color: colors.white,
                                fontFamily: fonts.secondary[600],
                            }}>
                            No
                        </Text>
                    </View>
                    <View style={{
                        borderRightWidth: 1,
                        backgroundColor: colors.primary,
                        borderColor: colors.white,
                        flex: 1.3,
                        padding: 5,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text
                            style={{

                                fontSize: windowWidth / 40,
                                color: colors.white,
                                fontFamily: fonts.secondary[600],
                            }}>
                            Hari Tgl/Jam
                        </Text>
                    </View>
                    <View style={{
                        borderRightWidth: 1,
                        flex: 1,
                        backgroundColor: colors.primary,
                        borderColor: colors.white,
                        padding: 5,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text
                            style={{

                                fontSize: windowWidth / 40,
                                color: colors.white,
                                fontFamily: fonts.secondary[600],
                            }}>
                            Kode Unit
                        </Text>
                    </View>


                    <View style={{
                        borderRightWidth: 1,
                        flex: 1,
                        backgroundColor: colors.primary,
                        borderColor: colors.white,
                        padding: 5,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text
                            style={{

                                fontSize: windowWidth / 40,
                                color: colors.white,
                                fontFamily: fonts.secondary[600],
                            }}>
                            Durasi Tidur
                        </Text>
                    </View>

                    <View style={{
                        borderRightWidth: 1,
                        backgroundColor: colors.primary,
                        borderColor: colors.white,
                        flex: 0.5,
                        padding: 5,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text
                            style={{
                                fontSize: windowWidth / 40,
                                color: colors.white,
                                fontFamily: fonts.secondary[600],
                            }}>
                            Tensi
                        </Text>
                    </View>

                    <View style={{
                        borderRightWidth: 1,
                        backgroundColor: colors.primary,
                        borderColor: colors.white,
                        flex: 0.5,
                        padding: 5,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text
                            style={{
                                fontSize: windowWidth / 40,
                                color: colors.white,
                                fontFamily: fonts.secondary[600],
                            }}>
                            Koridor
                        </Text>
                    </View>

                </View>
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
