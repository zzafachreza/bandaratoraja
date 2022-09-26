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


    const __updateData = (x) => {
        setRefreshing(true);
        axios.post(urlAPI + '/1update_split.php', {
            id: x
        })
            .then(x => {
                console.warn(x.data);
                getDataBarang();
                setRefreshing(false)
            });
    }

    const getDataBarang = () => {
        setRefreshing(true);
        axios
            .post(urlAPI + '/1data_split.php')
            .then(x => {
                console.warn(x.data);
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
                    flex: 0.3,
                    padding: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text
                        style={{
                            fontSize: windowWidth / 44,
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
                    flex: 1,
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
                        {item.nomor_body}
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
                        {item.tanggal}
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
                        {item.nama_pramudi}
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
                        {item.koridor}
                    </Text>

                </View>



                <View style={{
                    borderRightWidth: 1,
                    backgroundColor: colors.secondary,
                    borderColor: colors.white,
                    flex: 1,
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
                        {item.keluhan}
                    </Text>
                </View>
                {user.id_departement == 3 &&
                    <View style={{
                        borderRightWidth: 1,
                        backgroundColor: colors.secondary,
                        borderColor: colors.white,
                        flex: 1,
                        padding: 5,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {item.cek == 0 &&
                            <TouchableOpacity onPress={() => {
                                Alert.alert('Apakah Anda akan update ini ?', 'nomor body' + item.nomor_body + ' dan pramudi ' + item.nama_pramudi + '?',
                                    [
                                        {
                                            text: "Cancel",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                        },
                                        {
                                            text: "OK", onPress: () => {
                                                __updateData(item.id)
                                            }
                                        }
                                    ])
                            }}>
                                <Icon type='ionicon' name='checkmark-circle-outline' color={colors.black} />
                            </TouchableOpacity>}
                        {item.cek == 1 && <Icon type='ionicon' name='checkmark-circle' color={colors.success} />}
                    </View>

                }
                <View style={{
                    borderRightWidth: 1,
                    backgroundColor: colors.secondary,
                    borderColor: colors.white,
                    flex: 1,
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
                        {item.upd}
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
                        flex: 0.3,
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
                        flex: 1,
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
                            Nomor Body
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
                            tanggal
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
                            Nama Pramudi
                        </Text>
                    </View>

                    <View style={{
                        borderRightWidth: 1,
                        backgroundColor: colors.primary,
                        borderColor: colors.white,
                        flex: 1,
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
                    <View style={{
                        borderRightWidth: 1,
                        backgroundColor: colors.primary,
                        borderColor: colors.white,
                        flex: 1,
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
                            Keluhan
                        </Text>
                    </View>
                    {user.id_departement == 3 &&
                        <View style={{
                            borderRightWidth: 1,
                            backgroundColor: colors.primary,
                            borderColor: colors.white,
                            flex: 1,
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
                                Cek
                            </Text>
                        </View>
                    }
                    <View style={{
                        borderRightWidth: 1,
                        backgroundColor: colors.primary,
                        borderColor: colors.white,
                        flex: 1,
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
                            Update
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
