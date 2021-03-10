import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import ActionButton from 'react-native-action-button';
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

const AddMemosScreen = () => {
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
        'บันทึกกกก',
        'บันทึกสำเร็จ',
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
          <TextInput 
            placeholder="ADD TITLE..."
            value={title}
            onChangeText={(content) => settitle(content)}
          />
          <TextInput 
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
          <SubmitBtn onPress={submitMemos}>
            <SubmitBtnText>บันทึก</SubmitBtnText>
          </SubmitBtn>
        )}
      
      <ActionButton buttonColor="#2e64e5">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
          onPress={takePhotoFromCamera}>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>

    
  );
};

export default AddMemosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});