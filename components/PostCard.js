import React, {useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from '../styles/FeedStyles';

import ProgressiveImage from './ProgressiveImage';

import { AuthContext } from '../navigation/AuthProvider';

import moment from 'moment';

const PostCard = ({item, onDelete}) => {
  const {user, logout} = useContext(AuthContext);

  return (
    <Card key={item.id}>
      <UserInfo>
        <UserInfoText>
          <UserName>{item.userName}</UserName>
          <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {/* {item.postImg != null ? <PostImg source={{uri: item.postImg}} /> : <Divider />} */}
      {item.postImg != null ? (
        <ProgressiveImage 
          defaultImageSource={require('../assets/default-img.jpg')}
          source={{uri: item.postImg}}
          style={{width: '100%', height: 250}}
          resizeMode='cover'
        />
      ) : <Divider />}

      <InteractionWrapper>
        
        
        {user.uid == item.userId ?
        <Interaction onPress={() => onDelete(item.id)}>
          <Ionicons name="md-trash-bin" size={25} />
        </Interaction>
        : null}
      </InteractionWrapper>
    </Card>
  );
};

export default PostCard;
