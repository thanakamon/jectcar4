import React, {useContext, useState,Component} from 'react';
import {ActivityIndicator,View, Text,  TouchableOpacity,TouchableHighlight, Switch, StyleSheet, Alert, Icon, ScrollView, StatusBar,TextInput} from 'react-native';
import FormInput from '../components/FormInputAddcar';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import DatePicker from 'react-native-datepicker';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import storage from '@react-native-firebase/storage';
import {
  Avatar,
  
} from 'react-native-paper';
import {
  AddReceipt,
  StatusWrapper,
} from '../styles/AddMemos';
import ImagePicker from 'react-native-image-picker';

const Addcar = (props) => {
  
  const {user, logout} = useContext(AuthContext);
  const [brand, setBrand] = useState();
  const [model, setModel] = useState();
  const [carregis, setCarregis] = useState();
  const [datetax, setDateTaxt] = useState();
  const [dateins, setDateIns] = useState();
  const [datefirst, setDateFirst] = useState();
  const [showDatePicker,setShowDatePicker]=useState(false);
  const [showShare,setShowShare]=useState(false);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  
  const Create = async () => {
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    firestore()
    .collection('Car')
    .add({
      name : user.displayName,
      email: user.email,
      Brand : brand,
      Model : model,
      CarRegistration : carregis,
      Insurance : dateins,
      Tax : datetax,
      DateFirst : datefirst,
      Time: firestore.Timestamp.fromDate(new Date()),
      img:imageUrl,
    })
    .then(() => {
      console.log('Success');
      Alert.alert(
        'บันทึกกกก',
        'บันทึกสำเร็จ',
        
      );
      setBrand(null);
      setModel(null);
      setCarregis(null);
      setDateIns(null);
      setDateTaxt(null);
      setDateFirst(null);
    })
    .catch((error) => {
      console.log('Something went wrong with added post to firestore.', error);
    });
    
  }

  const takePhotoFromCamera = () => {
    const options = {
        maxWidth: 2000,
        maxHeight: 2000,
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };
    ImagePicker.showImagePicker(options, response => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            const source = { uri: response.uri };
            console.log(source);
            setImage(source);
        }
    });
  };
  
  const uploadImage = async () => {
    if( image == null ) {
    return null;
  }
  const { uri } = image;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      setUploading(true);
      setTransferred(0);

  const storageRef = storage().ref(`photosCar/${filename}`);
  const task = storageRef.putFile(uploadUri);

  // Set transferred state
  task.on('state_changed', (taskSnapshot) => {
    console.log(
      `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
    );

    setTransferred(
      Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
        100,
    );
  });
  
  try {
    await task;

    const url = await storageRef.getDownloadURL();

    setUploading(false);
    setImage(null);

    // Alert.alert(
    //   'Image uploaded!',
    //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
    // );
    return url;

  } catch (e) {
    console.log(e);
    return null;
  }

};
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Add Car</Text>
      
      

      <View style={styles.picture}>
      {image != null ? <Avatar.Image source={{uri: image.uri}} size={180} 
      style={styles.picture}
      /> : null}
        {uploading ? (
          <StatusWrapper>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </StatusWrapper>
        ) : (
          <TouchableOpacity onPress={takePhotoFromCamera}  >
        <FontAwesomeIcon name="camera" size={35}  style={styles.icon} ></FontAwesomeIcon>
        </TouchableOpacity>
      

        )}
      
      
      </View>
      <FormInput
        placeholderText="Brand"
        value={brand}
        onChangeText={(content) => setBrand(content)}
      />
      <FormInput
        placeholderText="Model"
        value={model}
        onChangeText={(content) => setModel(content)}
        
      />
      <FormInput
        placeholderText="Car registration"
        value={carregis}
        onChangeText={(content) => setCarregis(content)}
        
      />
      <DatePicker
          style={styles.datePickerStyle}
          date={dateins} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="Insurance expiration date"
          format="DD-MM-YYYY"
          minDate="01-01-2020"
          maxDate="01-01-2030"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDateIns(date);
          }}
        />
        <DatePicker
          style={styles.datePickerStyle}
          date={datetax} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="Tax expiration date"
          format="DD-MM-YYYY"
          minDate="01-01-2020"
          maxDate="01-01-2030"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDateTaxt(date);
          }}
        />
      <View>
          <View style={styles.vsw}>
            <Text style={styles.TCar} >กรณีผ่อนรถ</Text>
            <Switch onValueChange={()=>setShowDatePicker(!showDatePicker)} value={showDatePicker}/>
          </View>


      {showDatePicker&&(
        <>
          <DatePicker
              style={styles.datePickerStyle}
              date={datefirst} // Initial date from state
              mode="date" // The enum of date, datetime and time
              placeholder="วันที่ชำระงวดแรก"
              format="DD-MM-YYYY"
              minDate="01-01-2020"
              maxDate="01-01-2030"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  //display: 'none',
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              onDateChange={(date) => {
                setDateFirst(date);
              }}
            />
          <FormInput
            placeholderText="จำนวนงวด"
            iconType="user"
            keyboardType="number"
            
          />
          <FormInput
            placeholderText="ค่างวด"
            iconType="user"
            keyboardType="email-address"
            
          />

        </>
      )}
      </View>

        <View>
          <View style={styles.vsw}>
            <Text style={styles.TCar} >แชร์ข้อมูล</Text>
            <Switch onValueChange={()=>setShowShare(!showShare)} value={showShare}/>
          </View>

      {showShare&&(
        <>
        <View>
        <Text> if you want to share</Text>
          <View style={styles.Search}>
				  <StatusBar backgroundColor="grey"  barStyle="dark-content" />
				  <TextInput placeholder="search..."/>
          </View>
        </View>
        </>
        )
      }
      </View>
        
      <FormButton onPress={Create} 
        buttonTitle="Create" 
        //onPress={() => { props.nreavigation.navigate('CarMaintenance') }} 
      />
       
    </ScrollView>
  )
}

export default Addcar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    padding: 20,
  },
  Search:{
    backgroundColor: '#FFFFFF',
    borderColor: 'grey',
		position: 'relative',
   
  },
  vsw:{
    flexDirection: "row"
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
    textAlign:"center"
  },
  icon: {
    color: "rgba(128,128,128,1)",
    marginTop: 73,
    marginLeft: 69,
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
  TCar:{
      fontFamily: 'Kufam-SemiBoldItalic',
      marginTop:15,
      marginBottom:15,
      fontSize : 18,
      fontWeight: 'bold'
  },
  
  datePickerStyle: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  picture:{
       borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       width:180,
       height:180,
       backgroundColor:'#fff',
       borderRadius:1000,
       alignSelf: "center",
       marginBottom: 20  
       }
  
  
});
