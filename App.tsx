import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite, {SQLTransaction} from 'react-native-sqlite-2';
import renderActPage from './src/pages/renderActPage';
import {actStructure} from './src/pages/renderActPage';

export let StatusActPage = 'OpenProgram';
export let idAct = 0;
export function changeStatusActPage(newValue: string) {
  StatusActPage = newValue;
}

export const db = SQLite.openDatabase('oneAuto.db', '1.0', '', 1);
const createTableSQL = () => {
  db.transaction((tx: SQLTransaction) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ActTable 
      (id INTEGER PRIMARY KEY AUTOINCREMENT, 
        mName TEXT, 
        mDate DATE, 
        mBoolean BOOLEAN,
        mVIN TEXT,
        mYear TEXT,
        mMileage TEXT,
        mMileageType TEXT,
        mMileageMeasurement TEXT,
        mPrice TEXT,
        mCurrency TEXT,
        mGearbox TEXT,
        mDriveUnit TEXT,
        mFuel TEXT,
        mTypeSeller TEXT,
        mRegister TEXT,
        mServiceBook TEXT,
        mSecondSetOfTires TEXT,
        mBodyCondition TEXT,
        mSalonCondition TEXT,
        mPreSalePreparation TEXT,
        c01Value TEXT,
        c01Condition TEXT,
        c02Value TEXT,
        c02Condition TEXT,
        c03Value TEXT,
        c03Condition TEXT,
        c04Value TEXT,
        c04Condition TEXT,
        c05Value TEXT,
        c05Condition TEXT,
        c06Value TEXT,
        c06Condition TEXT,
        c07Value TEXT,
        c07Condition TEXT,
        c08Value TEXT,
        c08Condition TEXT,
        c09Value TEXT,
        c09Condition TEXT,
        c10Value TEXT,
        c10Condition TEXT,
        c11Value TEXT,
        c11Condition TEXT,
        gobWindshield TEXT,
        gobWindshieldDamaged TEXT,
        gobLeftGlass TEXT,
        gobLeftGlassDamaged TEXT,
        gobRightGlass TEXT,
        gobRightGlassDamaged TEXT,
        gobCarHeadlights TEXT,
        gobCarHeadlightsDamaged TEXT,
        gobFrontBumper TEXT,
        gobFrontBumperDamaged TEXT,
        gobRearBumper TEXT,
        gobRearBumperDamaged TEXT,
        viSeatCondition TEXT,
        viSteeringWheelCondition TEXT,
        viDoorCards TEXT,
        viTorpedo TEXT,
        viPedals TEXT,
        viCoulisseGearbox TEXT,
        viHeaterAirConditioner TEXT,
        viPowerWindows TEXT,
        viButtonsLeversSwitches TEXT,
        viAudio TEXT,
        viRearViewCamera TEXT,
        viInstrumentPanelWarnings TEXT,
        viSpareWheel TEXT,
        viTrunkUpholstery TEXT,
        viOtherRemarks TEXT,
        tdUnderTheHood TEXT,
        tdOilLevel TEXT,
        tdFrontSuspension TEXT,
        tdRearSuspension TEXT,
        tdOverclocking TEXT,
        tdSmoke TEXT,
        tdEngineTemperature TEXT,
        tdEngineNoise TEXT,
        tdEngineOperation TEXT,
        tdMotorStart TEXT,
        tdSwitchingGearbox TEXT,
        tdRudderZeroPoint TEXT,
        tdSteeringRack TEXT,
        tdNoiseOfUpholsteryAndInteriorEquipment TEXT     
        );`,
      [],
      (tx, results) => {
        // console.log('Таблица успешно создана');
      },
    );
  });
};
const deleteTableSQL = () => {
  db.transaction((tx: SQLTransaction) => {
    tx.executeSql('DROP TABLE IF EXISTS ActTable;', [], (tx, results) => {
      // console.log('Table deleted successfully');
    });
  });
};
const checkTableExistsSQL = () => {
  db.transaction((tx: SQLTransaction) => {
    tx.executeSql(
      'SELECT name FROM sqlite_master WHERE type = "table" AND name = "ActTable";',
      [],
      (tx, results) => {
        if (results.rows.length === 0) {
          //console.log('Table does not exist');
          createTableSQL();
        } else {
          //console.log('Table exists');
        }
      },
    );
  });
};
const insertActSQL = (actStructure: any) => {
  db.transaction((tx: SQLTransaction) => {
    tx.executeSql(
      `INSERT INTO ActTable 
      (mName, 
        mDate, 
        mBoolean, 
        mVIN,
        mYear,
        mMileage,
        mMileageType,
        mMileageMeasurement,
        mPrice,
        mCurrency,
        mGearbox,
        mDriveUnit,
        mFuel,
        mTypeSeller,
        mRegister,
        mServiceBook,
        mSecondSetOfTires,
        mBodyCondition,
        mSalonCondition,
        mPreSalePreparation,
        c01Value,
        c01Condition,
        c02Value,
        c02Condition,
        c03Value,
        c03Condition,
        c04Value,
        c04Condition,
        c05Value,
        c05Condition,
        c06Value,
        c06Condition,
        c07Value,
        c07Condition,
        c08Value,
        c08Condition,
        c09Value,
        c09Condition,
        c10Value,
        c10Condition,
        c11Value,
        c11Condition,
        gobWindshield,
        gobWindshieldDamaged,
        gobLeftGlass,
        gobLeftGlassDamaged,
        gobRightGlass,
        gobRightGlassDamaged,
        gobCarHeadlights,
        gobCarHeadlightsDamaged,
        gobFrontBumper,
        gobFrontBumperDamaged,
        gobRearBumper,
        gobRearBumperDamaged,
        viSeatCondition,
        viSteeringWheelCondition,
        viDoorCards,
        viTorpedo,
        viPedals,
        viCoulisseGearbox,
        viHeaterAirConditioner,
        viPowerWindows,
        viButtonsLeversSwitches,
        viAudio,
        viRearViewCamera,
        viInstrumentPanelWarnings,
        viSpareWheel,
        viTrunkUpholstery,
        viOtherRemarks,
        tdUnderTheHood,
        tdOilLevel,
        tdFrontSuspension,
        tdRearSuspension,
        tdOverclocking,
        tdSmoke,
        tdEngineTemperature,
        tdEngineNoise,
        tdEngineOperation,
        tdMotorStart,
        tdSwitchingGearbox,
        tdRudderZeroPoint,
        tdSteeringRack,
        tdNoiseOfUpholsteryAndInteriorEquipment) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,
      [
        actStructure.mName,
        actStructure.mDate.getTime(),
        actStructure.mBoolean,
        actStructure.mVIN,
        actStructure.mYear,
        actStructure.mMileage,
        actStructure.mMileageType,
        actStructure.mMileageMeasurement,
        actStructure.mPrice,
        actStructure.mCurrency,
        actStructure.mGearbox,
        actStructure.mDriveUnit,
        actStructure.mFuel,
        actStructure.mTypeSeller,
        actStructure.mRegister,
        actStructure.mServiceBook,
        actStructure.mSecondSetOfTires,
        actStructure.mBodyCondition,
        actStructure.mSalonCondition,
        actStructure.mPreSalePreparation,
        actStructure.c01Value,
        actStructure.c01Condition,
        actStructure.c02Value,
        actStructure.c02Condition,
        actStructure.c03Value,
        actStructure.c03Condition,
        actStructure.c04Value,
        actStructure.c04Condition,
        actStructure.c05Value,
        actStructure.c05Condition,
        actStructure.c06Value,
        actStructure.c06Condition,
        actStructure.c07Value,
        actStructure.c07Condition,
        actStructure.c08Value,
        actStructure.c08Condition,
        actStructure.c09Value,
        actStructure.c09Condition,
        actStructure.c10Value,
        actStructure.c10Condition,
        actStructure.c11Value,
        actStructure.c11Condition,
        actStructure.gobWindshield,
        actStructure.gobWindshieldDamaged,
        actStructure.gobLeftGlass,
        actStructure.gobLeftGlassDamaged,
        actStructure.gobRightGlass,
        actStructure.gobRightGlassDamaged,
        actStructure.gobCarHeadlights,
        actStructure.gobCarHeadlightsDamaged,
        actStructure.gobFrontBumper,
        actStructure.gobFrontBumperDamaged,
        actStructure.gobRearBumper,
        actStructure.gobRearBumperDamaged,
        actStructure.viSeatCondition,
        actStructure.viSteeringWheelCondition,
        actStructure.viDoorCards,
        actStructure.viTorpedo,
        actStructure.viPedals,
        actStructure.viCoulisseGearbox,
        actStructure.viHeaterAirConditioner,
        actStructure.viPowerWindows,
        actStructure.viButtonsLeversSwitches,
        actStructure.viAudio,
        actStructure.viRearViewCamera,
        actStructure.viInstrumentPanelWarnings,
        actStructure.viSpareWheel,
        actStructure.viTrunkUpholstery,
        actStructure.viOtherRemarks,
        actStructure.tdUnderTheHood,
        actStructure.tdOilLevel,
        actStructure.tdFrontSuspension,
        actStructure.tdRearSuspension,
        actStructure.tdOverclocking,
        actStructure.tdSmoke,
        actStructure.tdEngineTemperature,
        actStructure.tdEngineNoise,
        actStructure.tdEngineOperation,
        actStructure.tdMotorStart,
        actStructure.tdSwitchingGearbox,
        actStructure.tdRudderZeroPoint,
        actStructure.tdSteeringRack,
        actStructure.tdNoiseOfUpholsteryAndInteriorEquipment,
      ],
      (tx, results) => {
        // console.log('Record inserted successfully');
      },
    );
  });
};
const updateActSQL = (actStructure: any) => {
  db.transaction((tx: SQLTransaction) => {
    tx.executeSql(
      `UPDATE ActTable SET 
        mName = ?, 
        mDate = ?,
        mBoolean = ?, 
        mVIN = ?,
        mYear = ?,
        mMileage = ?,
        mMileageType = ?,
        mMileageMeasurement = ?,
        mPrice = ?,
        mCurrency = ?,
        mGearbox = ?,
        mDriveUnit = ?,
        mFuel = ?,
        mTypeSeller = ?,
        mRegister = ?,
        mServiceBook = ?,
        mSecondSetOfTires = ?,
        mBodyCondition = ?,
        mSalonCondition = ?,
        mPreSalePreparation = ?,
        c01Value = ?,
        c01Condition = ?,
        c02Value = ?,
        c02Condition = ?,
        c03Value = ?,
        c03Condition = ?,
        c04Value = ?,
        c04Condition = ?,
        c05Value = ?,
        c05Condition = ?,
        c06Value = ?,
        c06Condition = ?,
        c07Value = ?,
        c07Condition = ?,
        c08Value = ?,
        c08Condition = ?,
        c09Value = ?,
        c09Condition = ?,
        c10Value = ?,
        c10Condition = ?,
        c11Value = ?,
        c11Condition = ?,
        gobWindshield = ?,
        gobWindshieldDamaged = ?,
        gobLeftGlass = ?,
        gobLeftGlassDamaged = ?,
        gobRightGlass = ?,
        gobRightGlassDamaged = ?,
        gobCarHeadlights = ?,
        gobCarHeadlightsDamaged = ?,
        gobFrontBumper = ?,
        gobFrontBumperDamaged = ?,
        gobRearBumper = ?,
        gobRearBumperDamaged = ?,
        viSeatCondition = ?,
        viSteeringWheelCondition = ?,
        viDoorCards = ?,
        viTorpedo = ?,
        viPedals = ?,
        viCoulisseGearbox = ?,
        viHeaterAirConditioner = ?,
        viPowerWindows = ?,
        viButtonsLeversSwitches = ?,
        viAudio = ?,
        viRearViewCamera = ?,
        viInstrumentPanelWarnings = ?,
        viSpareWheel = ?,
        viTrunkUpholstery = ?,
        viOtherRemarks = ?,
        tdUnderTheHood = ?,
        tdOilLevel = ?,
        tdFrontSuspension = ?,
        tdRearSuspension = ?,
        tdOverclocking = ?,
        tdSmoke = ?,
        tdEngineTemperature = ?,
        tdEngineNoise = ?,
        tdEngineOperation = ?,
        tdMotorStart = ?,
        tdSwitchingGearbox = ?,
        tdRudderZeroPoint = ?,
        tdSteeringRack = ?,
        tdNoiseOfUpholsteryAndInteriorEquipment = ? 
      WHERE id = ?;`,
      [
        actStructure.mName,
        actStructure.mDate.getTime(),
        actStructure.mBoolean,
        actStructure.mVIN,
        actStructure.mYear,
        actStructure.mMileage,
        actStructure.mMileageType,
        actStructure.mMileageMeasurement,
        actStructure.mPrice,
        actStructure.mCurrency,
        actStructure.mGearbox,
        actStructure.mDriveUnit,
        actStructure.mFuel,
        actStructure.mTypeSeller,
        actStructure.mRegister,
        actStructure.mServiceBook,
        actStructure.mSecondSetOfTires,
        actStructure.mBodyCondition,
        actStructure.mSalonCondition,
        actStructure.mPreSalePreparation,
        actStructure.c01Value,
        actStructure.c01Condition,
        actStructure.c02Value,
        actStructure.c02Condition,
        actStructure.c03Value,
        actStructure.c03Condition,
        actStructure.c04Value,
        actStructure.c04Condition,
        actStructure.c05Value,
        actStructure.c05Condition,
        actStructure.c06Value,
        actStructure.c06Condition,
        actStructure.c07Value,
        actStructure.c07Condition,
        actStructure.c08Value,
        actStructure.c08Condition,
        actStructure.c09Value,
        actStructure.c09Condition,
        actStructure.c10Value,
        actStructure.c10Condition,
        actStructure.c11Value,
        actStructure.c11Condition,
        actStructure.gobWindshield,
        actStructure.gobWindshieldDamaged,
        actStructure.gobLeftGlass,
        actStructure.gobLeftGlassDamaged,
        actStructure.gobRightGlass,
        actStructure.gobRightGlassDamaged,
        actStructure.gobCarHeadlights,
        actStructure.gobCarHeadlightsDamaged,
        actStructure.gobFrontBumper,
        actStructure.gobFrontBumperDamaged,
        actStructure.gobRearBumper,
        actStructure.gobRearBumperDamaged,
        actStructure.viSeatCondition,
        actStructure.viSteeringWheelCondition,
        actStructure.viDoorCards,
        actStructure.viTorpedo,
        actStructure.viPedals,
        actStructure.viCoulisseGearbox,
        actStructure.viHeaterAirConditioner,
        actStructure.viPowerWindows,
        actStructure.viButtonsLeversSwitches,
        actStructure.viAudio,
        actStructure.viRearViewCamera,
        actStructure.viInstrumentPanelWarnings,
        actStructure.viSpareWheel,
        actStructure.viTrunkUpholstery,
        actStructure.viOtherRemarks,
        actStructure.tdUnderTheHood,
        actStructure.tdOilLevel,
        actStructure.tdFrontSuspension,
        actStructure.tdRearSuspension,
        actStructure.tdOverclocking,
        actStructure.tdSmoke,
        actStructure.tdEngineTemperature,
        actStructure.tdEngineNoise,
        actStructure.tdEngineOperation,
        actStructure.tdMotorStart,
        actStructure.tdSwitchingGearbox,
        actStructure.tdRudderZeroPoint,
        actStructure.tdSteeringRack,
        actStructure.tdNoiseOfUpholsteryAndInteriorEquipment,
        actStructure.actID,
      ],
      (tx, results) => {
        // console.log('Record inserted successfully');
      },
    );
  });
};
const selectActsSQL = async (): Promise<Map<string, any>[]> => {
  return new Promise<Map<string, any>[]>((resolve, reject) => {
    db.transaction((tx: SQLTransaction) => {
      tx.executeSql(
        'SELECT id, mName, mDate, mBoolean FROM ActTable ORDER BY id DESC',
        [],
        (tx, results) => {
          let myArray = [];
          const len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let myMap = new Map();
            const row = results.rows.item(i);
            myMap.set('id', row.id);
            myMap.set('mName', row.mName);
            myMap.set('mDate', row.mDate);
            myMap.set('mBoolean', row.mBoolean);
            myArray.push(myMap);

            // SELECT id, mName, mDate, mBoolean
            // FROM ActTable
            // ORDER BY id DESC
            // LIMIT 50
            // OFFSET 50

            // console.log(`id: ${row.id}, mName: ${row.mName}`);
          }
          resolve(myArray);
        },
      );
    });
  });
};

export default function App() {
  let activePageContent;
  let actPageContent = renderActPage();
  const [ftpIp, setFtpIp] = useState('');
  const [ftpLogin, setFtpLogin] = useState('');
  const [ftpPassword, setFtpPassword] = useState('');
  const [user, setUser] = useState('');
  const [activePage, setActivePage] = useState('Menu');
  const [menuItems, setMenuItems] = useState<Map<string, any>[]>([]);

  async function loadMenuItems() {
    const items = await selectActsSQL();
    setMenuItems(items);
  }

  //OPEN APP
  useEffect(() => {
    checkTableExistsSQL();
    loadMenuItems();
  }, []);

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
    deleteTableSQL();
  };

  const handleActAddPress = (thisIDAct: number) => {
    StatusActPage = 'OpenPageAct';
    idAct = thisIDAct;
    setActivePage('Act');
  };

  const handleActSavePress = () => {
    if (actStructure.actID != 0) {
      updateActSQL(actStructure);
    } else {
      insertActSQL(actStructure);
    }
    loadMenuItems();
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
            onPress={() => handleActAddPress(0)}>
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
      <ScrollView style={styles.settingsPageContainer}>
        {renderMenu()}
      </ScrollView>
    );
  };

  const renderMenu = () => {
    const myArray = menuItems;
    const menuComponents: JSX.Element[] = [];
    myArray.forEach(myMap => {
      // Доступ к значениям в Map
      let id = myMap.get('id');
      let mName = myMap.get('mName');
      let mDate = myMap.get('mDate');
      let mBoolean = myMap.get('mBoolean');

      const date = new Date(mDate);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}.${date.getFullYear()} ${date
        .getHours()
        .toString()
        .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

      menuComponents.push(
        <TouchableOpacity
          key={id}
          onPress={() => handleActAddPress(id)}
          style={{
            height: Dimensions.get('window').height / 7,
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: mBoolean ? 'green' : 'red',
              marginLeft: 10,
            }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              marginLeft: 10,
            }}>
            <Text
              style={{
                fontSize: 17,
                color: 'black',
                textAlignVertical: 'center',
                includeFontPadding: false,
              }}>
              {formattedDate}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                textAlignVertical: 'center',
                includeFontPadding: false,
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {mName}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginRight: 10,
              textAlignVertical: 'center',
              includeFontPadding: false,
            }}>
            {id}
          </Text>
        </TouchableOpacity>,
      );
    });
    return menuComponents;
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
