import React, { useContext, useEffect, useState } from 'react';
import {
    Container,
    Content,
    Header,
    Body,
    Title,
    ListItem,
    Text,
    Icon,
    Item,
    Input,
    Left,
    Right,
    Button,
} from 'native-base';
import { AuthContext } from '../navigation/AuthProvider';
import database from '@react-native-firebase/database';

export const submitUser = (Id, Name, Email) => {
    alert("ส่งไปละจ้า")
    return new Promise(function(resolve, reject) {
      let key;
      if (Id != null) {
        key = Id;
      } else {
        key = database()
          .ref()
          .push().key;
      }
      let dataToSave = {
        Id: key,
        Name: Name,
        Email: Email,
      };
      database()
        .ref('users/' + key)
        .update(dataToSave)
        .then(snapshot => {
          resolve(snapshot);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

const realtimedatabase = () => {
    const [Id, setId] = React.useState();
  const [Name, setName] = React.useState('');
  const [Email, setEmail] = React.useState('');
  const [users, setUsers] = React.useState([]);

  const saveUsers = () => {
    submitUser(Id, Name, Email)
      .then((result) => {
        setId(null);
        setName('');
        setEmail('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAllUsers = () => {
    database()
      .ref('users')
      .remove()
      .then(() => {
        setUsers([]);
      });
  };

  const deleteUser = (Item) => {
    database()
      .ref('users/' + Item.Id)
      .remove()
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const editUser = (Item) => {
    setId(Item.Id);
    setName(Item.Name);
    setEmail(Item.Email);
  };

  React.useEffect(() => {
    const userRef = database().ref('/users');
    const OnLoadingListener = userRef.on('value', (snapshot) => {
      setUsers([]);
      snapshot.forEach(function (childSnapshot) {
        setUsers((users) => [...users, childSnapshot.val()]);
      });
    });
    const childRemovedListener = userRef.on('child_removed', (snapshot) => {
      // Set Your Functioanlity Whatever you want.
      alert('ลบแล้วจ้า');
    });

    const childChangedListener = userRef.on('child_changed', (snapshot) => {
      // Set Your Functioanlity Whatever you want.
      alert('แก้ไขให้แล้วค้าบ');
    });

    return () => {
      userRef.off('value', OnLoadingListener);
      userRef.off('child_removed', childRemovedListener);
      userRef.off('child_changed', childChangedListener);
    };
  }, []);

    return (
        <Container>
            <Header>
                <Right style={{ flex: 0.2 }}>
                    <Button transparent icon onPress={{}}>
                        <Icon name="trash" />
                    </Button>
                    <Button transparent icon onPress={saveUsers}>
                        <Icon name="save" />
                    </Button>
                </Right>
            </Header>
            <Header searchBar rounded>
                <Item>
                    <Input
                        placeholder="Name"
                        value={Name}
                        onChangeText={(text) => setName(text)}
                    />
                </Item>
                <Item>
                    <Input

                        placeholder="Email"
                        value={Email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </Item>
            </Header>
            <Content padder>
        {users.map((item, index) => (
          <ListItem icon>
            <Body>
              <Text>
                {'Name : '}
                {item.Name}
              </Text>
              <Text>
                {'Email : '}
                {item.Email}
              </Text>
            </Body>
            <Right>
              <Button transparent onPress={() => editUser(item)}>
                <Icon active name="create" />
              </Button>
              <Button transparent onPress={() => deleteUser(item)}>
                <Icon active name="trash" />
              </Button>
            </Right>
          </ListItem>
        ))}
      </Content>

            

        </Container>

    );
}


export default realtimedatabase;




