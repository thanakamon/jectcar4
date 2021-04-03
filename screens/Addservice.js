import React, {useState, useContext,Component} from 'react';
import {ActivityIndicator,Button,StyleSheet,Switch, Text, View, TextInput, ScrollView,TouchableOpacity } from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';
import MultiSelect from 'react-native-multiple-select'
import { colorsDark } from 'react-native-elements/dist/config';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {
  AddReceipt,
  StatusWrapper,
} from '../styles/AddMemos';
const items = [{
  id: 'เทส , ',
  name: 'Ondo'
}, {
  id: ' แบตเตอรี่ , ',
  name: 'แบตเตอรี่'
}, {
  id: ' น้ำมันเครื่อง , ',
  name: 'น้ำมัน'
}, {
  id: ' ช่วงล่าง ,',
  name: 'หัวเทียน'
}, {
  id: ' เบรก , ',
  name: 'ระบบเบรก'
}];


const  AddService = (props)=> {
  const {item}=props.route.params
  const [selectedItems, setSelectedItems] =useState();
  const [date, setDate] = useState();
  const [kilo , setKilo] = useState();
  const [cost , setCost] = useState();
  const [serviceProvider , setServiceProvider] = useState();
  const [note , setNote] = useState();
 

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  
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
  
  
  const submitService = async () => {
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    firestore()
    .collection('Service')
    .add({
      CarRegistration : item.CarRegistration,
      ServiceDate : firestore.Timestamp.fromDate(new Date()),
      TotalKilo : kilo,
      Cost : cost,
      Service : selectedItems,
      ServiceProvider : serviceProvider,
      Note : note,
      Receipt : imageUrl,
    })
    .then(() => {
      console.log('Post Added!');
      Alert.alert(
        'Saved',
        'Suscess',
      );
      setDate();
      setKilo();
      setCost();
      setServiceProvider();
      setNote();
   
      
    })
    .catch((error) => {
      console.log('Something went wrong with added post to firestore.', error);
    });
  }

  const uploadImage = async () => {
    if( image == null ) {
    return null;
  }
  const { uri } = image;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      setUploading(true);
      setTransferred(0);

  const storageRef = storage().ref(`photosService/${filename}`);
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

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems );
  }
    
    return (
      <View style={styles.container}>
            <ScrollView>
        
        <Text style={styles.headerText}>
         กิโลสะสม
        </Text>
        <TextInput
          style={styles.InputText}
          underlineColorAndroid="transparent"
          placeholder="258456"
          keyboardType= "numeric"
          value={kilo}
        onChangeText={(content) => setKilo(content)}
        />
         <Text style={styles.headerText}>
         ค่าใช้จ่าย
        </Text>
        <TextInput
          style={styles.InputText}
          underlineColorAndroid="transparent"
          keyboardType= "numeric"
          value={cost}
        onChangeText={(content) => setCost(content)}
        />
        
        <Text style={styles.headerText}>
         บริการ
        </Text>
        <View style={styles.multiSelectContainer}>
          <MultiSelect
            items={items}
            uniqueKey='id'
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText='Pick Items'
            searchInputPlaceholderText='Search Items...'
            onChangeInput={(text) => console.warn(text)}
            tagRemoveIconColor='#CCC'
            tagBorderColor='#CCC'
            tagTextColor='#CCC'
            selectedItemTextColor='#CCC'
            selectedItemIconColor='#CCC'
            itemTextColor='#000'
            displayKey='name'
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor='#CCC'
            submitButtonText='Submit'
            removeSelected
          />
        </View>


        <Text style={styles.headerText}>
         ผู้บริการ
        </Text>

        <TextInput
          style={styles.InputText}
          underlineColorAndroid ='transparent'
          value={serviceProvider}
          onChangeText={(content) => setServiceProvider(content)}
        />
        <Text style={styles.headerText}>
         หมายเหตุ
        </Text>

        <TextInput
          style={styles.InputText}
          underlineColorAndroid ='transparent'
          value={note}
          onChangeText={(content) => setNote(content)}
        />
        
         
          
       
        <TouchableOpacity 
          style={styles.btn}
          onPress={takePhotoFromCamera}
        >
					<Text style={styles.btnText}>แนบใบเสร็จ + </Text>
				</TouchableOpacity>
        
        {image != null ? <AddReceipt source={{uri: image.uri}} /> : null}
        {uploading ? (
          <StatusWrapper>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </StatusWrapper>
        ) : (
          <Button style={styles.save}
          icon={
            <Icon
            name="save"
            size={30}
            color="#215F80" />
            }
            title="Save"
         
            type="clear"
            onPress={() => { submitService();  props.navigation.navigate('detialCar') }}
        />
      

        )}
        
        
        
        </ScrollView>
        
      </View>
 
      );
    };
export default AddService;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    textAlign: "left",
    margin: 10,
    fontWeight: "bold"
    
  },
  container: {
    flex: 1,
    margin: 20 ,
    borderRadius : 15,
    backgroundColor: "#e5e5e5"
  },
  InputText: {
    height: 40,
    width: "60%", 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginTop: 10  ,
    marginBottom: 20  ,
    textAlign: 'center',
    marginLeft: 40,
    
  },
  btnText: {
    fontSize: 18,
    textAlign: "left",
    margin: 10,
    fontWeight: "bold",
    color: "#fff" 
  },
  multiSelectContainer: {
    width: '60%',
    borderColor: 'gray',
    marginBottom: 20  ,
    marginLeft: 40,
    justifyContent: 'flex-end'
  },
  btn: {
    backgroundColor: '#2e64e5',
		borderRadius: 100,
    width :'35%', 
    marginBottom:20,
  },
  save:{
    marginTop:20,
  }
  
});
