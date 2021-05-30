import AsyncStorage from '@react-native-async-storage/async-storage';
export async function saveUserId(item) {
  AsyncStorage.setItem('user', JSON.stringify(item))
    .then(() => {
      console.log(
        'data saved'
      );
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getUserId(userData) {
  AsyncStorage.getItem('user')
    .then((value) => {
      const user = JSON.parse(value);
      userData(user);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function removeIdFromLocalDb() {
  AsyncStorage.setItem('user', '');
  console.log('logout and id got nil');
}