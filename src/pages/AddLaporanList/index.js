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

    useEffect(() => {
        if (isFocused) {

        }
    }, [isFocused])

    const MyList = ({ image, label, onPress }) => {
        return (
            <TouchableOpacity onPress={onPress} style={{
                flex: 1,
                borderRadius: 10,
                backgroundColor: colors.primary,
                padding: 10,
                marginHorizontal: 5,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={image} style={{
                    height: 35,
                    resizeMode: 'contain',
                    marginBottom: 5,
                }} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                    fontSize: 12
                }}>{label}</Text>
            </TouchableOpacity>
        )
    }





    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 10,
        }}>
            <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                <View style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                }}>
                    <MyList onPress={() => navigation.navigate('AddLaporan1', {
                        kode: kode
                    })} label="Analisa Pekerjaan" image={require('../../assets/analisa.png')} />
                    <MyList onPress={() => navigation.navigate('AddLaporan2', {
                        kode: kode
                    })} label="Aktifitas Unit" image={require('../../assets/aktifitas.png')} />
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                }}>
                    <MyList onPress={() => navigation.navigate('AddLaporan3', {
                        kode: kode
                    })} label="Kondisi Cuaca" image={require('../../assets/cuaca.png')} />
                    <MyList onPress={() => navigation.navigate('AddLaporan4', {
                        kode: kode
                    })} label="Rock Layering" image={require('../../assets/layer.png')} />
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                }}>
                    <MyList onPress={() => navigation.navigate('AddLaporan5', {
                        kode: kode
                    })} label="Photo Activity" image={require('../../assets/foto.png')} />
                </View>


            </ScrollView>
        </SafeAreaView >

    )
}

const styles = StyleSheet.create({})