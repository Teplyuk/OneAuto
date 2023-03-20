import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import renderActPage from './src/pages/renderActPage';

export default function App() {
  let activePageContent;
  let actPageContent = renderActPage();
  const [ftpIp, setFtpIp] = useState('');
  const [ftpLogin, setFtpLogin] = useState('');
  const [ftpPassword, setFtpPassword] = useState('');
  const [user, setUser] = useState('');
  const [activePage, setActivePage] = useState('Menu');

  //OPEN APP
  useEffect(() => {}, []);

  //SQLite

  const LoadSettings = () => {
    AsyncStorage.getItem('ftpIp').then(value => {
      if (value !== null) {
        setFtpIp(value);
      } else {
        setFtpIp('192.168.0.1');
      }
    });
    AsyncStorage.getItem('ftpLogin').then(value => {
      if (value !== null) {
        setFtpLogin(value);
      } else {
        setFtpLogin('FTPLogin');
      }
    });
    AsyncStorage.getItem('ftpPassword').then(value => {
      if (value !== null) {
        setFtpPassword(value);
      } else {
        setFtpPassword('GloryOfUkraine');
      }
    });
    AsyncStorage.getItem('user').then(value => {
      if (value !== null) {
        setUser(value);
      } else {
        //don't do anything...
      }
    });
  };

  //BUTTONS:
  const handleUpdatePress = () => {
    // setActivePage('Menu');
  };

  const handleActAddPress = () => {
    setActivePage('Act');
  };

  const handleActSavePress = () => {
    setActivePage('Menu');
  };

  const handlePhotoPress = () => {
    //setActivePage('Menu');
  };

  const handleSavePress = async () => {
    try {
      await AsyncStorage.setItem('ftpIp', ftpIp);
      await AsyncStorage.setItem('ftpLogin', ftpLogin);
      await AsyncStorage.setItem('ftpPassword', ftpPassword);
      await AsyncStorage.setItem('user', user);
      handleSettingsPress();
    } catch (error) {}
  };

  const handleSettingsPress = () => {
    if (activePage === 'Menu') {
      setActivePage('Settings');
      LoadSettings();
    } else {
      setActivePage('Menu');
    }
  };

  //ELEMENTS OF PAGE:
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>1-AUTO</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleSettingsPress}>
          {activePage === 'Menu' ? <Text>Settings</Text> : <Text>Menu</Text>}
        </TouchableOpacity>
      </View>
    );
  };

  const renderFooter = () => {
    let buttons;
    if (activePage === 'Menu') {
      buttons = (
        <>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={handleUpdatePress}>
            <Text>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={handleActAddPress}>
            <Text>+Act</Text>
          </TouchableOpacity>
        </>
      );
    } else if (activePage === 'Settings') {
      buttons = (
        <TouchableOpacity style={styles.footerButton} onPress={handleSavePress}>
          <Text>SAVE</Text>
        </TouchableOpacity>
      );
    } else if (activePage === 'Act') {
      buttons = (
        <>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={handlePhotoPress}>
            <Text>AddPhoto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={handleActSavePress}>
            <Text>Save</Text>
          </TouchableOpacity>
        </>
      );
    }

    return <View style={styles.footerContainer}>{buttons}</View>;
  };

  //PAGES:
  const renderMenuPage = () => {
    return (
      // УВАЖАЕМЫЕ СМЕНИТЕ СТИЛЬ, ЭТО МЕНЮ! = А У ВАС СЕТТИНГС СТИЛЬ!!!
      <View style={styles.settingsPageContainer}>
        <Text>Сторінка меню</Text>
      </View>
    );
  };

  const renderSettingsPage = () => {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.settingsPageContainer}>
          <View style={styles.settingsGroupContainer}>
            <Text style={styles.settingsGroupHeader}>
              Настройки FTP-соединения
            </Text>
            <View style={styles.settingsInputContainer}>
              <Text style={styles.settingsInputLabel}>IP FTP</Text>
              <TextInput
                style={styles.settingsInput}
                onChangeText={handleFtpIpChange}
                value={ftpIp}
              />
            </View>
            <View style={styles.settingsInputContainer}>
              <Text style={styles.settingsInputLabel}>Логин FTP</Text>
              <TextInput
                style={styles.settingsInput}
                onChangeText={handleFtpLoginChange}
                value={ftpLogin}
              />
            </View>
            <View style={styles.settingsInputContainer}>
              <Text style={styles.settingsInputLabel}>Пароль FTP</Text>
              <TextInput
                style={styles.settingsInput}
                onChangeText={handleFtpPasswordChange}
                value={ftpPassword}
              />
            </View>
          </View>
          <View style={styles.settingsGroupContainer}>
            <Text style={styles.settingsGroupHeader}>
              Пользовательские настройки
            </Text>
            <View style={styles.settingsInputContainer}>
              <Text style={styles.settingsInputLabel}>Пользователь</Text>
              <TextInput
                style={styles.settingsInput}
                onChangeText={handleUserChange}
                value={user}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  };

  // PAGE - SETTINGS: FIELDS
  const handleFtpIpChange = (text: string) => {
    setFtpIp(text);
  };

  const handleFtpLoginChange = (text: string) => {
    setFtpLogin(text);
  };

  const handleFtpPasswordChange = (text: string) => {
    setFtpPassword(text);
  };

  const handleUserChange = (text: string) => {
    setUser(text);
  };

  if (activePage === 'Menu') {
    activePageContent = renderMenuPage();
  } else if (activePage === 'Settings') {
    activePageContent = renderSettingsPage();
  } else if (activePage === 'Act') {
    activePageContent = actPageContent;
  }

  //MAIN FUNCTION:
  return (
    <View style={styles.container}>
      {renderHeader()}
      {activePageContent}
      {renderFooter()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 50,
  },
  headerContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    width: '20%',
    alignItems: 'center',
  },
  footerContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
  },
  footerButton: {
    backgroundColor: '#aaa',
    padding: 10,
    borderRadius: 5,
    width: '25%',
    alignItems: 'center',
  },
  settingsPageContainer: {
    flex: 1,
  },
  settingsGroupContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  settingsGroupHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingsInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingsInputLabel: {
    width: '25%',
    marginRight: 10,
    color: 'black',
  },
  settingsInput: {
    flex: 1,
    width: '70%',
    height: 40,
    borderColor: 'silver',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
});
