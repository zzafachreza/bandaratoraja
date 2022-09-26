import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import MyCarouser from '../../components/MyCarouser';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import 'intl';
import 'intl/locale-data/jsonp/en';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

export default function Home({ navigation }) {
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState(0);
  const [token, setToken] = useState('');

  const isFocused = useIsFocused();
  const [laporan, setLaporan] = useState({
    daily: 0,
    normal: 0,
  })

  useEffect(() => {

    const unsubscribe = messaging().onMessage(async remoteMessage => {

      const json = JSON.stringify(remoteMessage);
      const obj = JSON.parse(json);



      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: 'bandaratoraja', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: obj.notification.title, // (optional)
        message: obj.notification.body, // (required)
      });
    });

    if (isFocused) {
      __getDataUserInfo();
    }
    return unsubscribe;
  }, [isFocused]);


  const __getDataUserInfo = () => {
    getData('user').then(users => {
      setUser(users);

      axios.post(urlAPI + 'v1_data_info.php', {
        fid_user: users.id
      }).then(zz => {
        // console.warn('ZZZ', zz.data)
        setLaporan(zz.data)
      })

      getData('token').then(res => {
        console.log('data token,', res);
        setToken(res.token);
        axios
          .post(urlAPI + '/update_token.php', {
            id: users.id,
            token: res.token,
          })
          .then(res => {
            console.error('update token', res.data);
          });
      });
    });
  }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;

  const DataKategori = ({
    icon,
    nama,
    nama2,
    onPress,
    warna = colors.primary,
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: warna,
          padding: 5,
          borderRadius: 10,
          width: windowWidth / 2.5,
          height: windowHeight / 5.3,
          elevation: 5,
          justifyContent: 'center',
        }}>
        <View>
          <Icon
            type="ionicon"
            name={icon}
            color={colors.primary}
            size={windowWidth / 5}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.primary,
              fontSize: windowWidth / 30,
              textAlign: 'center',

            }}>
            {nama}
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              color: colors.tertiary,
              fontSize: windowWidth / 35,
              textAlign: 'center',
            }}>
            {nama2}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>

      <View
        style={{
          marginBottom: 20,
          backgroundColor: colors.primary,
          height: windowHeight / 9,
          padding: 10,
          flexDirection: 'row',
        }}>


        <View style={{ paddingLeft: 10, flex: 1 }}>
          <Text
            style={{
              fontSize: windowWidth / 30,
              color: colors.white,
              fontFamily: fonts.secondary[600],
            }}>
            Welcome, <Text
              style={{
                fontSize: windowWidth / 30,
                color: colors.white,
                fontFamily: fonts.secondary[600],
              }}>
              {user.nama_lengkap}
            </Text>
          </Text>
          <Text
            style={{
              fontSize: windowWidth / 20,
              color: colors.white,
              fontFamily: fonts.secondary[600],
            }}>
            {user.nama_departement}
          </Text>

        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Image source={require('../../assets/logo.png')} style={{
            width: 50,
            resizeMode: 'contain'
          }} />
        </TouchableOpacity>

      </View>



      <MyCarouser />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 15,
        }}>
        <DataKategori
          warna={colors.secondary}
          onPress={() => navigation.navigate('AddLaporanDaily', user)}
          icon="checkmark-circle"
          nama="Checklist Harian F1"

        />
        <DataKategori
          warna={colors.secondary}
          onPress={() => navigation.navigate('AddLaporan')}
          icon="checkbox"
          nama="Checklist Harian F2"
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 15,
        }}>
        <DataKategori
          warna={colors.secondary}
          onPress={() => navigation.navigate('DaftarLaporanDaily')}
          icon="file-tray-stacked"
          nama="Arsip Checklist Harian F1"
        />
        <DataKategori
          warna={colors.secondary}
          onPress={() => {

            navigation.navigate('DaftarLaporan')

          }
          }
          icon="receipt"
          nama="Arsip Checklist Harian F2"
        />
      </View>



    </SafeAreaView>
  );
}
