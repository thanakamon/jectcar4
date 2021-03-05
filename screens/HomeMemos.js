import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MemosCard from '../components/MemosCard';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import {Container} from '../styles/HomeMemos';

const HomeMemos = () => {
  const [Memos, setMemos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const fetchMemos = async () => {
    try {
      const list = [];

      await firestore()
        .collection('Memos')
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
          console.log('Total Memos: ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
              title,
              memosDetails,
              postImg,
              postTime,
              
            } = doc.data();
            list.push({
              id: doc.id,
              Title : title,
              MemosDetails: memosDetails,
        
              postTime: postTime,
              postImg,
            });
          });
        });

      setMemos(list);

      if (loading) {
        setLoading(false);
      }

      console.log('Memos: ', Memos);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  useEffect(() => {
    fetchMemos();
    setDeleted(false);
  }, [deleted]);

  const handleDelete = (postId) => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const deletePost = (postId) => {
    console.log('Current Post Id: ', postId);

    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const {postImg} = documentSnapshot.data();

          if (postImg != null) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully.`);
                deleteFirestoreData(postId);
              })
              .catch((e) => {
                console.log('Error while deleting the image. ', e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };

  const deleteFirestoreData = (postId) => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          'Post deleted!',
          'Your post has been deleted successfully!',
        );
        setDeleted(true);
      })
      .catch((e) => console.log('Error deleting posst.', e));
  };

  const ListHeader = () => {
    return null;
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}>
          <SkeletonPlaceholder>
            <View style={{marginTop: 10, marginBottom: 30}}>   
              <View
                style={{marginTop: 6, width: 350, height: 200, borderRadius: 4}}
              />
            </View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <View style={{marginTop: 10, marginBottom: 30}}>   
              <View
                style={{marginTop: 6, width: 350, height: 200, borderRadius: 4}}
              />
            </View>
          </SkeletonPlaceholder>
          
        </ScrollView>
        
      ) : (
        <Container>
          <FlatList
            data={Memos}
            renderItem={({item}) => (
              <MemosCard item={item} onDelete={handleDelete} />
            )}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListHeader}
            showsVerticalScrollIndicator={false}
          />
        </Container>
      )}
    </SafeAreaView>
  );
};

export default HomeMemos;
