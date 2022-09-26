import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  Switch,
  SafeAreaView,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import LottieView from 'lottie-react-native';
import { urlAPI } from '../../utils/localStorage';

export default function Register({ navigation }) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [loading, setLoading] = useState(false);
  const [dept, setDept] = useState([])
  const [valid, setValid] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  ;
  const validate = text => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      // console.log('Email is Not Correct');
      setData({ ...data, email: text });
      setValid(false);
      return false;
    } else {
      setData({ ...data, email: text });
      setValid(true);
      // console.log('Email is Correct');
    }
  };

  const [data, setData] = useState({
    nama_lengkap: '',
    nik: '',
    email: '',
    password: '',
    telepon: '',
    jabatan: '',
    fid_departement: 1,
  });

  const simpan = () => {
    if (
      data.nama_lengkap.length === 0 &&
      data.nik.length === 0 &&
      data.email.length === 0 &&
      data.password.length === 0 &&
      data.jabatan.length === 0 &&
      data.telepon.length === 0
    ) {
      showMessage({
        message: 'Maaf Semua Field Harus Di isi !',
      });
    } else if (data.nama_lengkap.length === 0) {
      showMessage({
        message: 'Maaf Nama Lengkap masih kosong !',
      });
    } else if (data.nik.length === 0) {
      showMessage({
        message: 'Maaf NIK masih kosong !',
      });
    } else if (data.telepon.length === 0) {
      showMessage({
        message: 'Maaf Telepon masih kosong !',
      });
    } else if (data.password.length === 0) {
      showMessage({
        message: 'Maaf Password masih kosong !',
      });
    } else if (data.jabatan.length === 0) {
      showMessage({
        message: 'Maaf jabatan masih kosong !',
      });
    } else {
      setLoading(true);
      console.log(data);
      axios
        .post(urlAPI + '/register.php', data)
        .then(res => {
          console.warn(res.data);
          let err = res.data.split('#');

          // console.log(err[0]);
          if (err[0] == 50) {
            setTimeout(() => {
              setLoading(false);
              showMessage({
                message: err[1],
                type: 'danger',
              });
            }, 1200);
          } else {
            setTimeout(() => {
              navigation.replace('Success', {
                messege: res.data,
              });
            }, 1200);
          }
        });
    }
  };


  useEffect(() => {

    axios.post(urlAPI + '1data_departement.php').then(d => {
      console.log('dep', d.data);
      setDept(d.data);
    })

  }, [])



  return (
    <ImageBackground
      source={require('../../assets/back.jpeg')}
      style={{
        flex: 1,

      }}>
      {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
        {/* <Image
        source={require('../../assets/logooren.png')}
        style={styles.image}
      /> */}


        <MyGap jarak={10} />
        <MyInput
          label="NRP"
          iconname="card"
          value={data.nik}
          onChangeText={value =>
            setData({
              ...data,
              nik: value,
            })
          }
        />

        <MyGap jarak={10} />
        <MyInput
          label="Nama Lengkap"
          iconname="person"
          value={data.nama_lengkap}
          onChangeText={value =>
            setData({
              ...data,
              nama_lengkap: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Email Gmail / Ymail"
          iconname="mail"
          keyboardType="email-address"
          value={data.email}
          onChangeText={value =>
            setData({
              ...data,
              email: value,
            })
          }
        />



        <MyGap jarak={10} />
        <MyPicker iconname="star" label="Departement" selectedValue={data.fid_departement} onValueChange={x => {
          setData({
            ...data,
            fid_departement: x
          })
        }} data={dept} />

        <MyGap jarak={10} />
        <MyInput
          label="Jabatan"
          iconname="ribbon"
          value={data.jabatan}
          onChangeText={value =>
            setData({
              ...data,
              jabatan: value,
            })
          }
        />

        <MyGap jarak={10} />
        <MyInput
          label="Nomor Telephone ( WA )"
          iconname="call"
          keyboardType="phone-pad"
          value={data.telepon}
          onChangeText={value =>
            setData({
              ...data,
              telepon: value,
            })
          }
        />






        <MyGap jarak={10} />
        <MyInput
          label="Alamat Sesuai KTP / Identitas Diri"
          iconname="map"
          value={data.alamat}
          onChangeText={value =>
            setData({
              ...data,
              alamat: value,
            })
          }
        />

        <MyGap jarak={10} />
        <MyInput
          label="Password"
          iconname="key"
          secureTextEntry
          value={data.password}
          onChangeText={value =>
            setData({
              ...data,
              password: value,
            })
          }
        />
        <MyGap jarak={20} />

        <MyButton
          warna={colors.primary}
          title="REGISTER"
          Icons="log-in"
          onPress={simpan}
        />

        <MyGap jarak={20} />
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{
            flex: 1,
            backgroundColor: colors.primary,
          }}
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 620 / 4,
    height: 160 / 4,
  },
});
