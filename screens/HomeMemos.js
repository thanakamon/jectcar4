import React, {useEffect, useState,useContext,useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
  StatusBar,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import MemosCard from '../components/MemosCard';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';

  
const HomeMemos = (props) => {

  

  const [refreshing, setRefreshing] = useState(false);

  const {user, logout} = useContext(AuthContext);
  const [Memos, setMemos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  
  
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchMemos().then(() => {
      setRefreshing(false);
    });
  }, [refreshing]);
  

  const fetchMemos = async () => {
    try {
      const list = [];

      await firestore()
        .collection('Memos')
        .where('Email','==', user.email || 'Name','==', user.displayName )
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

  const handleDelete = (memosId) => {
    Alert.alert(
      'Delete Memos',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deleteMemos(memosId),
        },
      ],
      
      {cancelable: false},
    );
  };

  const deleteMemos = (memosId) => {
    console.log('Current Memos Id: ', memosId);

    firestore()
      .collection('Memos')
      .doc(memosId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const {memosImg} = documentSnapshot.data();

          if (memosImg != null) {
            const storageRef = storage().refFromURL(memosImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${memosImg} has been deleted successfully.`);
                deleteFirestoreData(memosId);
              })
              .catch((e) => {
                console.log('Error while deleting the image. ', e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(memosId);
          }
        }
      });
  };

  const deleteFirestoreData = (memosId) => {
    firestore()
      .collection('Memos')
      .doc(memosId)
      .delete()
      .then(() => {
        Alert.alert(
          'Memos deleted!',
          'Your Memos has been deleted successfully!',
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
        
        <View style={styles.parentView}>
				<StatusBar backgroundColor="white" barStyle="dark-content" />
				<TextInput 
					style={styles.search}
					placeholder="search..."
				/>
				<FlatList 
					style={styles.flatList}
					data={Memos}
					numColumns={2}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({item}) => (
            <MemosCard item={item} onDelete={handleDelete} parentProps={props} />
            
          )}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListHeader}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          
            
				/>
        
				<TouchableOpacity 
					style={styles.actionButton}
					
          onPress={() => { props.navigation.navigate('addMemos') }}
				>
					<Text style={styles.actionButtonLogo}>+</Text>
				</TouchableOpacity>
			</View>
        
      )}
    </SafeAreaView>
  );
};

export default HomeMemos;
const styles = StyleSheet.create({
	parentView: {
		backgroundColor: '#FFFFFF',
		flex: 1,
		position: 'relative'
	},
	search: {
		width: '90%',
		alignSelf: 'center',
		marginTop: 30,
		backgroundColor: 'white',
		elevation: 4,
		borderRadius: 50,
		paddingHorizontal: 25,
		fontSize: 20,
	},
	flatList: {
		paddingHorizontal: 10,
		marginTop: 20,
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
	actionButtonLogo: {
		fontSize: 30,
		fontWeight:'bold',
    color: 'white'
	},
	isLoading: {
		marginTop: 100,
	},
	isError: {
		alignSelf: 'center',
		fontSize: 20,
		marginTop: 100,
	}
})