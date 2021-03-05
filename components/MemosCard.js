import React, {useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from "react-native";

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
} from '../styles/HomeMemos';

import ProgressiveImage from './ProgressiveImage';

import { AuthContext } from '../navigation/AuthProvider';

import moment from 'moment';

const MemosCard = ({item, onDelete}) => {
  const {user, logout} = useContext(AuthContext);
  
  return (
    <TouchableOpacity key={item.id} style={{ backgroundColor: "#D6EAF8", width: 360, marginTop:15,borderRadius:15}}>
      <UserInfo>
        <UserInfoText>
          <UserName>{item.Title}</UserName>
          <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.MemosDetails}</PostText>

      </TouchableOpacity>
  );
};

export default MemosCard;




