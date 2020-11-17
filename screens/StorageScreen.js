import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';

const StorageScreen = ({ navigation }) => {


    const reference = storage().ref('../assets/logo.png');

    return (
        <View>
            <Button
                title="Firebase"
                onPress={async () => {
                    // path to existing file on filesystem
                    const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`;
                    // uploads file
                    await reference.putFile(pathToFile);
                  }}
            />
        </View>
    );
};

export default StorageScreen;