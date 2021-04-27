import React, { useState, useContext, Component } from 'react';
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
  ScrollView,
  Switch

} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
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
  const { user, logout } = useContext(AuthContext);
  const [EmailShared, setEmailShared] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [memos, setMemos] = useState(null);
  const [title, settitle] = useState(null);
  const [category, setCategory] = useState(null);
  const [Shared, setShared] = useState(false);

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
        category: category,
        memosDetails: memos,
        postImg: imageUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
        EmailShared: EmailShared,

      })
      .then(() => {
        console.log('Post Added!');

        setMemos(null);
      })
      .catch((error) => {
        console.log('Something went wrong with added post to firestore.', error);
      });
  };

  const uploadImage = async () => {
    if (image == null) {
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

  const data = [{
    value: 'General',
  }, {
    value: 'Education',
  }, {
    value: 'Family',
  }, {
    value: '',
  }];


  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput style={styles.textTitle}
          placeholder="TITLE..."
          value={title}
          onChangeText={(content) => settitle(content)}
        />
        <Dropdown style={styles.Dropdown}
          icon='chevron-down'
          iconColor='#000'
          label='category'
          baseColor='#fff'
          labelFontSize='18'
          data={data}
          value={category}
          onChangeText={(content) => setCategory(content)}
        />
        <View>
          <View style={styles.Shared}>
            <Text style={styles.TextShared}>Shared</Text>
            <Switch style={{ marginLeft: 10 }} onValueChange={() => setShared(!Shared)} value={Shared} />
          </View>
          {Shared && (
            <>
              <TextInput style={styles.Shared1}
                underlineColorAndroid="transparent"
                placeholder="Email"
                multiline={true}
                value={EmailShared}
                onChangeText={(content) => setEmailShared(content)}
              />
            </>
          )}
        </View>





        <TextInput style={styles.textDescription}
          underlineColorAndroid="transparent"
          placeholder="DESCRIPTION..."

          multiline={true}
          value={memos}
          onChangeText={(content) => setMemos(content)}
        />


        {image != null ? <AddImage source={{ uri: image.uri }} /> : null}
        {uploading ? (
          <StatusWrapper>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </StatusWrapper>
        ) : (
          <Button

            title="Learn More"
            color="#fff"
          />
        )}
      </ScrollView>
      <ActionButton buttonColor="#2e64e5">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
          onPress={takePhotoFromCamera}>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
      <SubmitBtn onPress={() => { submitMemos(); props.navigation.navigate('Memos') }}>
        <SubmitBtnText>บันทึก</SubmitBtnText>
      </SubmitBtn>

    </View>


  );
};

export default AddMemosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  TextShared: {
    fontSize: 18,
    marginLeft: 20,
    marginBottom: 10,
    color: 'black',
    textAlign: "center"
  },
  Shared: {
    flexDirection: 'row',
    marginTop: 10,

  },
  Shared1: {
    marginLeft: 20,
    fontSize: 16,
  },
  Dropdown: {
    width: '35%',
    height: 80,
    marginLeft: 10,
    backgroundColor: 'white',
    fontSize: 16,


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
    marginBottom: 20,
    right: 30
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Lato-Regular',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 3,
  },
  textDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Lato-Regular',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,

  },



});