import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import { AuthContext } from '../navigation/AuthProvider'
import { prototype } from 'react-native/Libraries/Image/ImageBackground';

export default class CardShowcaseExample extends Component {
  static contextType = AuthContext;
  state = {
    user: {
      name: "",
      email: ""
    }
  }
  render() {
    const { user, logout } = (this.context);
    return (
      <Container>
        <Content>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Body>
                <Text>ชื่อบันทึก</Text>
                <Text note>15 Nov 2020</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  บันทึกมีอยู่ว่า  .....  อะไรก็ไม่รู้
                  แต่มีภาพปลากรอบ
                </Text>
                <Text>
                  
                </Text>
                <Image source={{ uri: 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/124819717_203407927819250_4498249846733334830_n.jpg?_nc_cat=104&ccb=2&_nc_sid=110474&_nc_ohc=NVO-uQ3MoNUAX-3eSkF&_nc_ht=scontent-sin6-1.xx&oh=b07c678cd0e3bf5488390054a90487b8&oe=5FD5FB28' }}
                  style={{ height: 200, width: 200, flex: 1 }} />
                
                  
              </Body>
            </CardItem>

          </Card>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Body>
                <Text>ชื่อบันทึก22</Text>
                <Text note>16 Nov 2020</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  ไม่มีบันทึก
                  แต่มีภาพปลากรอบ
                </Text>
                <Text>
                  
                </Text>
                <Image source={{ uri: user.photoURL }}
                  style={{ height: 200, width: 200, flex: 1 }} />
                
                  
              </Body>
            </CardItem>

          </Card>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Body>
                <Text>ชื่อบันทึก333</Text>
                <Text note>17 Nov 2020</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  อิหยังว่ะ เช้าแล้ว
                </Text>
                <Text>
                  
                </Text>
                <Image source={{ uri: 'https://scontent-sin6-2.xx.fbcdn.net/v/t1.0-9/1623546_572535149509603_832230959_n.jpg?_nc_cat=110&ccb=2&_nc_sid=43edb5&_nc_ohc=gODSbb5j7C8AX-tJ2QV&_nc_ht=scontent-sin6-2.xx&oh=d3fb6bf6efdb68fd9e14b98ccb631ee6&oe=5FD5FCD5' }}
                  style={{ height: 200, width: 200, flex: 1 }} />
                
                  
              </Body>
            </CardItem>

          </Card>
        </Content>
      </Container>
    );
  }
}