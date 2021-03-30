import React, {useState, useContext,Component} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Button,
  
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../styles/AddMemos';

import { AuthContext } from '../navigation/AuthProvider';

const AddMemosScreen = (props) => {
  const {user, logout} = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [memos, setMemos] = useState(null);
  const [title, settitle] = useState(null);


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

const submitMemos = async () => {
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    console.log('memos: ', memos);

    firestore()
    .collection('Memos')
    .add({
      Name: user.displayName,
      Email: user.email,
      title: title,
      memosDetails: memos,
      postImg: imageUrl,
      postTime: firestore.Timestamp.fromDate(new Date()),
      
    })
    .then(() => {
      console.log('Post Added!');
      Alert.alert(
        'Saved',
        'Suscess',
      );
      setMemos(null);
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

    const storageRef = storage().ref(`photos/${filename}`);
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
    <View style={styles.container}>
          <TextInput style={styles.textTitle}
            placeholder="ADD TITLE..."
            value={title}
            onChangeText={(content) => settitle(content)}
          />
          <TextInput style={styles.textDescription}
            underlineColorAndroid="transparent"
            placeholder="ADD DESCRIPTION..."
            
            multiline={true} 
            value={memos}
            onChangeText={(content) => setMemos(content)}
          />
          
       
        {image != null ? <AddImage source={{uri: image.uri}} /> : null}
        {uploading ? (
          <StatusWrapper>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </StatusWrapper>
        ) : (
          <SubmitBtn onPress={() => { submitMemos();  props.navigation.navigate('Memos') }}>
            <SubmitBtnText>บันทึก</SubmitBtnText>
          </SubmitBtn>
        )}
      
      <TouchableOpacity 
					style={styles.actionButton}
					onPress={takePhotoFromCamera}
				>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
					
				</TouchableOpacity>
        
        
    </View>

    
  );
};

export default AddMemosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  actionButtonIcon: {
    fontSize: 25,
    height: 28,
    color: 'white',
  },
  actionButton: {
		width: 60,
		height: 60,
		backgroundColor: '#2e64e5',
		borderRadius: 100, 
		position: 'absolute',
		elevation: 10,
		alignItems: 'center',
		justifyContent: 'center',
		bottom: 30,
		right: 30
	},
  textTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Lato-Regular',
    marginTop: 20,
    marginLeft:10,
    marginRight:10,
    borderBottomColor: 'black',
    borderBottomWidth: 3,
  },
  textDescription:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Lato-Regular',
    marginTop: 20,
    marginLeft:10,
    marginRight:10,
    
  },
  
  
	
});