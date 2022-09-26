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
    FlatList
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts, windowWidth } from '../../utils/fonts';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'
import { MyButton, MyGap } from '../../components';
import SignatureScreen from "react-native-signature-canvas";
import SignatureCapture from 'react-native-signature-capture';
import { showMessage } from 'react-native-flash-message';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


export default function Menu5_detail({ route }) {
    const item = route.params;
    const [before, setBefore] = useState([]);

    const [after, setAfter] = useState([]);

    useEffect(() => {

        axios.post(urlAPI + '/1data_foto1.php', {
            kode: route.params.kode
        }).then(res => {
            console.log(res.data);
            setBefore(res.data);
        });

        axios.post(urlAPI + '/1data_foto2.php', {
            kode: route.params.kode
        }).then(res => {
            console.log(res.data);
            setAfter(res.data);
        });



    }, []);


    const __renderItem = ({ item, index }) => {
        return (
            <View style={{
                borderWidth: 1,
                margin: 2,
                flex: 0.25,
                borderColor: colors.secondary,
                // borderRadius: 10,
                overflow: 'hidden'
            }}>
                <Image source={{
                    uri: item.nama_foto
                }} style={{
                    width: '100%',
                    resizeMode: 'cover',
                    aspectRatio: 1,
                }} />
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 35,
                    maxWidth: 100,
                    padding: 2,
                }}>{item.keterangan}</Text>
                <TouchableOpacity onPress={() => {
                    console.log(index)

                    let value = index
                    let arr = foto;
                    arr = arr.map((e, i) => i !== value ? { nama: e.nama, keterangan: e.keterangan } : undefined).filter(x => x)
                    setFoto(arr);




                }} style={{
                    backgroundColor: colors.primary,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 35,
                        maxWidth: 100,
                        textAlign: 'center',
                        color: colors.white,
                        padding: 5,
                    }}>BEFORE</Text>
                </TouchableOpacity>
            </View>
        )
    }


    const __renderItem2 = ({ item, index }) => {
        return (
            <View style={{
                borderWidth: 1,
                margin: 2,
                flex: 0.25,
                borderColor: colors.secondary,
                // borderRadius: 10,
                overflow: 'hidden'
            }}>
                <Image source={{
                    uri: item.nama_foto
                }} style={{
                    width: '100%',
                    resizeMode: 'cover',
                    aspectRatio: 1,
                }} />
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 35,
                    maxWidth: 100,
                    padding: 2,
                }}>{item.keterangan}</Text>
                <TouchableOpacity onPress={() => {
                    console.log(index)

                    let value = index
                    let arr = foto;
                    arr = arr.map((e, i) => i !== value ? { nama: e.nama, keterangan: e.keterangan } : undefined).filter(x => x)
                    setFoto(arr);




                }} style={{
                    backgroundColor: colors.success,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 35,
                        maxWidth: 100,
                        textAlign: 'center',
                        color: colors.white,
                        padding: 5,
                    }}>AFTER</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{
                padding: 10,
            }}>
                <View style={{
                    paddingVertical: 5,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        flex: 1,
                    }}>Tanggal & Waktu</Text>
                    <Text style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                        paddingVertical: 10,
                        color: colors.tertiary,
                    }}>
                        {item.tanggal} {item.jam}
                    </Text>
                </View>

                <View style={{
                    paddingVertical: 5,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        flex: 1,
                    }}>Nama Inspektor</Text>
                    <Text style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                        paddingVertical: 10,
                        color: colors.tertiary,
                    }}>
                        {item.nama_inspektor}
                    </Text>
                </View>
                <View style={{
                    paddingVertical: 5,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        flex: 1,
                    }}>Nomor Body</Text>
                    <Text style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                        paddingVertical: 10,
                        color: colors.tertiary,
                    }}>
                        {item.nomor_body}
                    </Text>
                </View>
                <View style={{
                    paddingVertical: 5,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        flex: 1,
                    }}>Kilometer</Text>
                    <Text style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                        paddingVertical: 10,
                        color: colors.tertiary,
                    }}>
                        {item.kilometer}
                    </Text>
                </View>
                <FlatList numColumns={4} data={before} renderItem={__renderItem} />

                <FlatList numColumns={4} data={after} renderItem={__renderItem2} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})