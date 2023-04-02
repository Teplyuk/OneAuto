import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SQLite, {SQLTransaction} from 'react-native-sqlite-2';
import {StatusActPage, idAct, changeStatusActPage, db} from '../../App';
import vrStructureData from './actStructure.json';
import {Picker} from '@react-native-picker/picker';

interface actStructure {
  [key: string]: number | string | Date | boolean;
}
function createVrStructure(data: {
  [key: string]: number | string | boolean;
}): actStructure {
  const result: actStructure = {};
  for (const key in data) {
    const value = data[key];
    result[key] = value === 'new Date()' ? new Date() : value;
  }
  return result;
}

export let actStructure: actStructure = createVrStructure(vrStructureData);
let iRender = 1;

const selectActSQL = async (id: number): Promise<Map<string, any>> => {
  return new Promise<Map<string, any>>((resolve, reject) => {
    db.transaction((tx: SQLTransaction) => {
      tx.executeSql(
        `SELECT 
          id, 
          mName, 
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
          tdNoiseOfUpholsteryAndInteriorEquipment 
        FROM ActTable WHERE id = (?)`,
        [id],
        (tx, results) => {
          let myMap = new Map();
          const row = results.rows.item(0);
          myMap.set('id', row.id);
          myMap.set('mName', row.mName);
          myMap.set('mDate', row.mDate);
          myMap.set('mBoolean', row.mBoolean);
          myMap.set('mVIN', row.mVIN);
          myMap.set('mYear', row.mYear);
          myMap.set('mMileage', row.mMileage);
          myMap.set('mMileageType', row.mMileageType);
          myMap.set('mMileageMeasurement', row.mMileageMeasurement);
          myMap.set('mPrice', row.mPrice);
          myMap.set('mCurrency', row.mCurrency);
          myMap.set('mGearbox', row.mGearbox);
          myMap.set('mDriveUnit', row.mDriveUnit);
          myMap.set('mFuel', row.mFuel);
          myMap.set('mTypeSeller', row.mTypeSeller);
          myMap.set('mRegister', row.mRegister);
          myMap.set('mServiceBook', row.mServiceBook);
          myMap.set('mSecondSetOfTires', row.mSecondSetOfTires);
          myMap.set('mBodyCondition', row.mBodyCondition);
          myMap.set('mSalonCondition', row.mSalonCondition);
          myMap.set('mPreSalePreparation', row.mPreSalePreparation);
          myMap.set('c01Value', row.c01Value);
          myMap.set('c01Condition', row.c01Condition);
          myMap.set('c02Value', row.c02Value);
          myMap.set('c02Condition', row.c02Condition);
          myMap.set('c03Value', row.c03Value);
          myMap.set('c03Condition', row.c03Condition);
          myMap.set('c04Value', row.c04Value);
          myMap.set('c04Condition', row.c04Condition);
          myMap.set('c05Value', row.c05Value);
          myMap.set('c05Condition', row.c05Condition);
          myMap.set('c06Value', row.c06Value);
          myMap.set('c06Condition', row.c06Condition);
          myMap.set('c07Value', row.c07Value);
          myMap.set('c07Condition', row.c07Condition);
          myMap.set('c08Value', row.c08Value);
          myMap.set('c08Condition', row.c08Condition);
          myMap.set('c09Value', row.c09Value);
          myMap.set('c09Condition', row.c09Condition);
          myMap.set('c10Value', row.c10Value);
          myMap.set('c10Condition', row.c10Condition);
          myMap.set('c11Value', row.c11Value);
          myMap.set('c11Condition', row.c11Condition);
          myMap.set('gobWindshield', row.gobWindshield);
          myMap.set('gobWindshieldDamaged', row.gobWindshieldDamaged);
          myMap.set('gobLeftGlass', row.gobLeftGlass);
          myMap.set('gobLeftGlassDamaged', row.gobLeftGlassDamaged);
          myMap.set('gobRightGlass', row.gobRightGlass);
          myMap.set('gobRightGlassDamaged', row.gobRightGlassDamaged);
          myMap.set('gobCarHeadlights', row.gobCarHeadlights);
          myMap.set('gobCarHeadlightsDamaged', row.gobCarHeadlightsDamaged);
          myMap.set('gobFrontBumper', row.gobFrontBumper);
          myMap.set('gobFrontBumperDamaged', row.gobFrontBumperDamaged);
          myMap.set('gobRearBumper', row.gobRearBumper);
          myMap.set('gobRearBumperDamaged', row.gobRearBumperDamaged);
          myMap.set('viSeatCondition', row.viSeatCondition);
          myMap.set('viSteeringWheelCondition', row.viSteeringWheelCondition);
          myMap.set('viDoorCards', row.viDoorCards);
          myMap.set('viTorpedo', row.viTorpedo);
          myMap.set('viPedals', row.viPedals);
          myMap.set('viCoulisseGearbox', row.viCoulisseGearbox);
          myMap.set('viHeaterAirConditioner', row.viHeaterAirConditioner);
          myMap.set('viPowerWindows', row.viPowerWindows);
          myMap.set('viButtonsLeversSwitches', row.viButtonsLeversSwitches);
          myMap.set('viAudio', row.viAudio);
          myMap.set('viRearViewCamera', row.viRearViewCamera);
          myMap.set('viInstrumentPanelWarnings', row.viInstrumentPanelWarnings);
          myMap.set('viSpareWheel', row.viSpareWheel);
          myMap.set('viTrunkUpholstery', row.viTrunkUpholstery);
          myMap.set('viOtherRemarks', row.viOtherRemarks);
          myMap.set('tdUnderTheHood', row.tdUnderTheHood);
          myMap.set('tdOilLevel', row.tdOilLevel);
          myMap.set('tdFrontSuspension', row.tdFrontSuspension);
          myMap.set('tdRearSuspension', row.tdRearSuspension);
          myMap.set('tdOverclocking', row.tdOverclocking);
          myMap.set('tdSmoke', row.tdSmoke);
          myMap.set('tdEngineTemperature', row.tdEngineTemperature);
          myMap.set('tdEngineNoise', row.tdEngineNoise);
          myMap.set('tdEngineOperation', row.tdEngineOperation);
          myMap.set('tdMotorStart', row.tdMotorStart);
          myMap.set('tdSwitchingGearbox', row.tdSwitchingGearbox);
          myMap.set('tdRudderZeroPoint', row.tdRudderZeroPoint);
          myMap.set('tdSteeringRack', row.tdSteeringRack);
          myMap.set(
            'tdNoiseOfUpholsteryAndInteriorEquipment',
            row.tdNoiseOfUpholsteryAndInteriorEquipment,
          );

          // console.log(`id: ${row.id}, mName: ${row.mName}`);
          resolve(myMap);
        },
      );
    });
  });
};

export default function renderActPage() {
  let activeActPageContent;
  const [activeActPage, setActiveActPage] = useState('Main');

  async function loadMenuItems(id: number) {
    const items = await selectActSQL(id);

    let mDate = items.get('mDate');
    const date = new Date(mDate);

    setactID(id.toString());
    setmName(items.get('mName'));
    setmDate(date);
    setmBoolean(items.get('mBoolean') === 0 ? false : true);
    setmVIN(items.get('mVIN'));
    setmYear(items.get('mYear'));
    setmMileage(items.get('mMileage'));
    setmMileageType(items.get('mMileageType'));
    setmMileageMeasurement(items.get('mMileageMeasurement'));
    setmPrice(items.get('mPrice'));
    setmCurrency(items.get('mCurrency') || 'EUR');
    setmGearbox(items.get('mGearbox'));
    setmDriveUnit(items.get('mDriveUnit'));
    setmFuel(items.get('mFuel'));
    //setmTypeSeller(items.get('mTypeSeller'));
    setmRegister(items.get('mRegister'));
    setmServiceBook(items.get('mServiceBook'));
    //setmSecondSetOfTires(items.get('mSecondSetOfTires'));
    //setmBodyCondition(items.get('mBodyCondition'));
    //setmSalonCondition(items.get('mSalonCondition'));
    //setmPreSalePreparation(items.get('mPreSalePreparation'));
    setc01Value(items.get('c01Value'));
    setc01Condition(items.get('c01Condition'));
    setc02Value(items.get('c02Value'));
    setc02Condition(items.get('c02Condition'));
    setc03Value(items.get('c03Value'));
    setc03Condition(items.get('c03Condition'));
    setc04Value(items.get('c04Value'));
    setc04Condition(items.get('c04Condition'));
    setc05Value(items.get('c05Value'));
    setc05Condition(items.get('c05Condition'));
    setc06Value(items.get('c06Value'));
    setc06Condition(items.get('c06Condition'));
    setc07Value(items.get('c07Value'));
    setc07Condition(items.get('c07Condition'));
    setc08Value(items.get('c08Value'));
    setc08Condition(items.get('c08Condition'));
    setc09Value(items.get('c09Value'));
    setc09Condition(items.get('c09Condition'));
    setc10Value(items.get('c10Value'));
    setc10Condition(items.get('c10Condition'));
    setc11Value(items.get('c11Value'));
    setc11Condition(items.get('c11Condition'));
    setgobWindshield(items.get('gobWindshield'));
    setgobWindshieldDamaged(items.get('gobWindshieldDamaged'));
    setgobLeftGlass(items.get('gobLeftGlass'));
    setgobLeftGlassDamaged(items.get('gobLeftGlassDamaged'));
    setgobRightGlass(items.get('gobRightGlass'));
    setgobRightGlassDamaged(items.get('gobRightGlassDamaged'));
    setgobCarHeadlights(items.get('gobCarHeadlights'));
    setgobCarHeadlightsDamaged(items.get('gobCarHeadlightsDamaged'));
    setgobFrontBumper(items.get('gobFrontBumper'));
    setgobFrontBumperDamaged(items.get('gobFrontBumperDamaged'));
    setgobRearBumper(items.get('gobRearBumper'));
    setgobRearBumperDamaged(items.get('gobRearBumperDamaged'));
    setviSeatCondition(items.get('viSeatCondition'));
    setviSteeringWheelCondition(items.get('viSteeringWheelCondition'));
    setviDoorCards(items.get('viDoorCards'));
    setviTorpedo(items.get('viTorpedo'));
    setviPedals(items.get('viPedals'));
    setviCoulisseGearbox(items.get('viCoulisseGearbox'));
    setviHeaterAirConditioner(items.get('viHeaterAirConditioner'));
    setviPowerWindows(items.get('viPowerWindows'));
    setviButtonsLeversSwitches(items.get('viButtonsLeversSwitches'));
    setviAudio(items.get('viAudio'));
    setviRearViewCamera(items.get('viRearViewCamera'));
    setviInstrumentPanelWarnings(items.get('viInstrumentPanelWarnings'));
    setviSpareWheel(items.get('viSpareWheel'));
    setviTrunkUpholstery(items.get('viTrunkUpholstery'));
    setviOtherRemarks(items.get('viOtherRemarks'));
    settdUnderTheHood(items.get('tdUnderTheHood'));
    settdOilLevel(items.get('tdOilLevel'));
    settdFrontSuspension(items.get('tdFrontSuspension'));
    settdRearSuspension(items.get('tdRearSuspension'));
    settdOverclocking(items.get('tdOverclocking'));
    settdSmoke(items.get('tdSmoke'));
    settdEngineTemperature(items.get('tdEngineTemperature'));
    settdEngineNoise(items.get('tdEngineNoise'));
    settdEngineOperation(items.get('tdEngineOperation'));
    settdMotorStart(items.get('tdMotorStart'));
    settdSwitchingGearbox(items.get('tdSwitchingGearbox'));
    settdRudderZeroPoint(items.get('tdRudderZeroPoint'));
    settdSteeringRack(items.get('tdSteeringRack'));
    settdNoiseOfUpholsteryAndInteriorEquipment(
      items.get('tdNoiseOfUpholsteryAndInteriorEquipment'),
    );

    actStructure.actID = id;
    actStructure.mName = items.get('mName');
    actStructure.mDate = date;
    actStructure.mBoolean = items.get('mBoolean');
    actStructure.mVIN = items.get('mVIN');
    actStructure.mYear = items.get('mYear');
    actStructure.mMileage = items.get('mMileage');
    actStructure.mMileageType = items.get('mMileageType');
    actStructure.mMileageMeasurement = items.get('mMileageMeasurement');
    actStructure.mPrice = items.get('mPrice');
    actStructure.mCurrency = items.get('mCurrency');
    actStructure.mGearbox = items.get('mGearbox');
    actStructure.mDriveUnit = items.get('mDriveUnit');
    actStructure.mFuel = items.get('mFuel');
    actStructure.mTypeSeller = items.get('mTypeSeller');
    actStructure.mRegister = items.get('mRegister');
    actStructure.mServiceBook = items.get('mServiceBook');
    actStructure.mSecondSetOfTires = items.get('mSecondSetOfTires');
    actStructure.mBodyCondition = items.get('mBodyCondition');
    actStructure.mSalonCondition = items.get('mSalonCondition');
    actStructure.mPreSalePreparation = items.get('mPreSalePreparation');
    actStructure.c01Value = items.get('c01Value');
    actStructure.c01Condition = items.get('c01Condition');
    actStructure.c02Value = items.get('c02Value');
    actStructure.c02Condition = items.get('c02Condition');
    actStructure.c03Value = items.get('c03Value');
    actStructure.c03Condition = items.get('c03Condition');
    actStructure.c04Value = items.get('c04Value');
    actStructure.c04Condition = items.get('c04Condition');
    actStructure.c05Value = items.get('c05Value');
    actStructure.c05Condition = items.get('c05Condition');
    actStructure.c06Value = items.get('c06Value');
    actStructure.c06Condition = items.get('c06Condition');
    actStructure.c07Value = items.get('c07Value');
    actStructure.c07Condition = items.get('c07Condition');
    actStructure.c08Value = items.get('c08Value');
    actStructure.c08Condition = items.get('c08Condition');
    actStructure.c09Value = items.get('c09Value');
    actStructure.c09Condition = items.get('c09Condition');
    actStructure.c10Value = items.get('c10Value');
    actStructure.c10Condition = items.get('c10Condition');
    actStructure.c11Value = items.get('c11Value');
    actStructure.c11Condition = items.get('c11Condition');
    actStructure.gobWindshield = items.get('gobWindshield');
    actStructure.gobWindshieldDamaged = items.get('gobWindshieldDamaged');
    actStructure.gobLeftGlass = items.get('gobLeftGlass');
    actStructure.gobLeftGlassDamaged = items.get('gobLeftGlassDamaged');
    actStructure.gobRightGlass = items.get('gobRightGlass');
    actStructure.gobRightGlassDamaged = items.get('gobRightGlassDamaged');
    actStructure.gobCarHeadlights = items.get('gobCarHeadlights');
    actStructure.gobCarHeadlightsDamaged = items.get('gobCarHeadlightsDamaged');
    actStructure.gobFrontBumper = items.get('gobFrontBumper');
    actStructure.gobFrontBumperDamaged = items.get('gobFrontBumperDamaged');
    actStructure.gobRearBumper = items.get('gobRearBumper');
    actStructure.gobRearBumperDamaged = items.get('gobRearBumperDamaged');
    actStructure.viSeatCondition = items.get('viSeatCondition');
    actStructure.viSteeringWheelCondition = items.get(
      'viSteeringWheelCondition',
    );
    actStructure.viDoorCards = items.get('viDoorCards');
    actStructure.viTorpedo = items.get('viTorpedo');
    actStructure.viPedals = items.get('viPedals');
    actStructure.viCoulisseGearbox = items.get('viCoulisseGearbox');
    actStructure.viHeaterAirConditioner = items.get('viHeaterAirConditioner');
    actStructure.viPowerWindows = items.get('viPowerWindows');
    actStructure.viButtonsLeversSwitches = items.get('viButtonsLeversSwitches');
    actStructure.viAudio = items.get('viAudio');
    actStructure.viRearViewCamera = items.get('viRearViewCamera');
    actStructure.viInstrumentPanelWarnings = items.get(
      'viInstrumentPanelWarnings',
    );
    actStructure.viSpareWheel = items.get('viSpareWheel');
    actStructure.viTrunkUpholstery = items.get('viTrunkUpholstery');
    actStructure.viOtherRemarks = items.get('viOtherRemarks');
    actStructure.tdUnderTheHood = items.get('tdUnderTheHood');
    actStructure.tdOilLevel = items.get('tdOilLevel');
    actStructure.tdFrontSuspension = items.get('tdFrontSuspension');
    actStructure.tdRearSuspension = items.get('tdRearSuspension');
    actStructure.tdOverclocking = items.get('tdOverclocking');
    actStructure.tdSmoke = items.get('tdSmoke');
    actStructure.tdEngineTemperature = items.get('tdEngineTemperature');
    actStructure.tdEngineNoise = items.get('tdEngineNoise');
    actStructure.tdEngineOperation = items.get('tdEngineOperation');
    actStructure.tdMotorStart = items.get('tdMotorStart');
    actStructure.tdSwitchingGearbox = items.get('tdSwitchingGearbox');
    actStructure.tdRudderZeroPoint = items.get('tdRudderZeroPoint');
    actStructure.tdSteeringRack = items.get('tdSteeringRack');
    actStructure.tdNoiseOfUpholsteryAndInteriorEquipment = items.get(
      'tdNoiseOfUpholsteryAndInteriorEquipment',
    );
  }

  //ACT-MENU SWITCHER:
  const handleActListPress = (page: string) => {
    setActiveActPage(page);
  };

  const [actID, setactID] = useState('');
  const handleActIDChange = (text: string) => {
    if (/^\d+$/.test(text) || text === '') {
      setactID(text);
      actStructure.actID = parseInt(text);
      if (isNaN(actStructure.actID)) {
        actStructure.actID = -0;
      }
    } else {
      setactID(actID);
      actStructure.actID = parseInt(actID);
      if (isNaN(actStructure.actID)) {
        actStructure.actID = -0;
      }
    }
  };

  const [mName, setmName] = useState('');
  const handleActmNameChange = (text: string) => {
    setmName(text);
    actStructure.mName = text;
  };

  const [mVIN, setmVIN] = useState('');
  const handleActmVINChange = (text: string) => {
    setmVIN(text);
    actStructure.mVIN = text;
  };
  const [mYear, setmYear] = useState('');
  const handleActmYearChange = (text: string) => {
    setmYear(text);
    actStructure.mYear = text;
  };
  const [mMileage, setmMileage] = useState('');
  const handleActmMileageChange = (text: string) => {
    setmMileage(text);
    actStructure.mMileage = text;
  };
  const [mMileageType, setmMileageType] = useState('1');
  const omMileageType = [
    {label: 'км', value: '1'},
    {label: 'мл', value: '2'},
  ];
  const [mMileageMeasurement, setmMileageMeasurement] = useState('');
  const omMileageMeasurement = [
    {label: 'Оригінальний', value: '1'},
    {label: 'Скручений', value: '2'},
  ];

  const [mPrice, setmPrice] = useState('');
  const handleActmPriceChange = (text: string) => {
    setmPrice(text);
    actStructure.mPrice = text;
  };
  const [mCurrency, setmCurrency] = useState('');
  const handleActmCurrencyChange = (text: string) => {
    console.log(text);
    setmCurrency(text);
    actStructure.mCurrency = text;
  };
  const omCurrency = [
    {label: 'EUR', value: 'EUR'},
    {label: 'UAH', value: 'UAH'},
    {label: 'USD', value: 'USD'},
  ];
  const [mGearbox, setmGearbox] = useState('1');
  const omGearbox = [
    {label: 'АКПП', value: '1'},
    {label: 'Варіатор', value: '2'},
    {label: 'Робот', value: '3'},
    {label: 'МКПП', value: '4'},
  ];
  const [mDriveUnit, setmDriveUnit] = useState('1');
  const omDriveUnit = [
    {label: 'Передній', value: '1'},
    {label: 'Задній', value: '2'},
    {label: 'Повний', value: '3'},
  ];
  const [mFuel, setmFuel] = useState('1');
  const omFuel = [
    {label: 'Бензин', value: '1'},
    {label: 'Дизель', value: '2'},
    {label: 'Газ', value: '3'},
    {label: 'Електро', value: '4'},
  ];
  const [mTypeSeller, setmTypeSeller] = useState('1');
  const omTypeSeller = [
    {label: 'Посередник', value: '1'},
    {label: 'Власник', value: '2'},
    {label: 'Автосалон', value: '3'},
  ];
  const [mRegister, setmRegister] = useState('1');
  const omRegister = [
    {label: 'Знятий', value: '1'},
    {label: 'Стоїть на обліку', value: '2'},
  ];
  const [mServiceBook, setmServiceBook] = useState('1');
  const omServiceBook = [
    {label: 'Є', value: '1'},
    {label: 'Відсутня', value: '2'},
  ];
  const [mSecondSetOfTires, setmSecondSetOfTires] = useState('1');
  const omSecondSetOfTires = [
    {label: 'Є', value: '1'},
    {label: 'Відсутня', value: '2'},
  ];
  const [mBodyCondition, setmBodyCondition] = useState('1');
  const omBodyCondition = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
  ];
  const [mSalonCondition, setmSalonCondition] = useState('1');
  const omSalonCondition = [
    {label: 'Знятий', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
  ];
  const [mPreSalePreparation, setmPreSalePreparation] = useState('1');
  const omPreSalePreparation = [
    {label: 'Є', value: '1'},
    {label: 'Відсутня', value: '2'},
  ];
  const [c01Value, setc01Value] = useState('');
  const handleActc01ValueChange = (text: string) => {
    setc01Value(text);
    actStructure.c01Value = text;
  };
  const [c01Condition, setc01Condition] = useState('');
  const handleActc01ConditionChange = (text: string) => {
    setc01Condition(text);
    actStructure.c01Condition = text;
  };
  const [c02Value, setc02Value] = useState('');
  const handleActc02ValueChange = (text: string) => {
    setc02Value(text);
    actStructure.c02Value = text;
  };
  const [c02Condition, setc02Condition] = useState('');
  const handleActc02ConditionChange = (text: string) => {
    setc02Condition(text);
    actStructure.c02Condition = text;
  };
  const [c03Value, setc03Value] = useState('');
  const handleActc03ValueChange = (text: string) => {
    setc03Value(text);
    actStructure.c03Value = text;
  };
  const [c03Condition, setc03Condition] = useState('');
  const handleActc03ConditionChange = (text: string) => {
    setc03Condition(text);
    actStructure.c03Condition = text;
  };
  const [c04Value, setc04Value] = useState('');
  const handleActc04ValueChange = (text: string) => {
    setc04Value(text);
    actStructure.c04Value = text;
  };
  const [c04Condition, setc04Condition] = useState('');
  const handleActc04ConditionChange = (text: string) => {
    setc04Condition(text);
    actStructure.c04Condition = text;
  };
  const [c05Value, setc05Value] = useState('');
  const handleActc05ValueChange = (text: string) => {
    setc05Value(text);
    actStructure.c05Value = text;
  };
  const [c05Condition, setc05Condition] = useState('');
  const handleActc05ConditionChange = (text: string) => {
    setc05Condition(text);
    actStructure.c05Condition = text;
  };
  const [c06Value, setc06Value] = useState('');
  const handleActc06ValueChange = (text: string) => {
    setc06Value(text);
    actStructure.c06Value = text;
  };
  const [c06Condition, setc06Condition] = useState('');
  const handleActc06ConditionChange = (text: string) => {
    setc06Condition(text);
    actStructure.c06Condition = text;
  };
  const [c07Value, setc07Value] = useState('');
  const handleActc07ValueChange = (text: string) => {
    setc07Value(text);
    actStructure.c07Value = text;
  };
  const [c07Condition, setc07Condition] = useState('');
  const handleActc07ConditionChange = (text: string) => {
    setc07Condition(text);
    actStructure.c07Condition = text;
  };
  const [c08Value, setc08Value] = useState('');
  const handleActc08ValueChange = (text: string) => {
    setc08Value(text);
    actStructure.c08Value = text;
  };
  const [c08Condition, setc08Condition] = useState('');
  const handleActc08ConditionChange = (text: string) => {
    setc08Condition(text);
    actStructure.c08Condition = text;
  };
  const [c09Value, setc09Value] = useState('');
  const handleActc09ValueChange = (text: string) => {
    setc09Value(text);
    actStructure.c09Value = text;
  };
  const [c09Condition, setc09Condition] = useState('');
  const handleActc09ConditionChange = (text: string) => {
    setc09Condition(text);
    actStructure.c09Condition = text;
  };
  const [c10Value, setc10Value] = useState('');
  const handleActc10ValueChange = (text: string) => {
    setc10Value(text);
    actStructure.c10Value = text;
  };
  const [c10Condition, setc10Condition] = useState('');
  const handleActc10ConditionChange = (text: string) => {
    setc10Condition(text);
    actStructure.c10Condition = text;
  };
  const [c11Value, setc11Value] = useState('');
  const handleActc11ValueChange = (text: string) => {
    setc11Value(text);
    actStructure.c11Value = text;
  };
  const [c11Condition, setc11Condition] = useState('');
  const handleActc11ConditionChange = (text: string) => {
    setc11Condition(text);
    actStructure.c11Condition = text;
  };
  const [gobWindshield, setgobWindshield] = useState('');
  const handleActgobWindshieldChange = (text: string) => {
    setgobWindshield(text);
    actStructure.gobWindshield = text;
  };
  const [gobWindshieldDamaged, setgobWindshieldDamaged] = useState('');
  const handleActgobWindshieldDamagedChange = (text: string) => {
    setgobWindshieldDamaged(text);
    actStructure.gobWindshieldDamaged = text;
  };
  const [gobLeftGlass, setgobLeftGlass] = useState('');
  const handleActgobLeftGlassChange = (text: string) => {
    setgobLeftGlass(text);
    actStructure.gobLeftGlass = text;
  };
  const [gobLeftGlassDamaged, setgobLeftGlassDamaged] = useState('');
  const handleActgobLeftGlassDamagedChange = (text: string) => {
    setgobLeftGlassDamaged(text);
    actStructure.gobLeftGlassDamaged = text;
  };
  const [gobRightGlass, setgobRightGlass] = useState('');
  const handleActgobRightGlassChange = (text: string) => {
    setgobRightGlass(text);
    actStructure.gobRightGlass = text;
  };
  const [gobRightGlassDamaged, setgobRightGlassDamaged] = useState('');
  const handleActgobRightGlassDamagedChange = (text: string) => {
    setgobRightGlassDamaged(text);
    actStructure.gobRightGlassDamaged = text;
  };
  const [gobCarHeadlights, setgobCarHeadlights] = useState('');
  const handleActgobCarHeadlightsChange = (text: string) => {
    setgobCarHeadlights(text);
    actStructure.gobCarHeadlights = text;
  };
  const [gobCarHeadlightsDamaged, setgobCarHeadlightsDamaged] = useState('');
  const handleActgobCarHeadlightsDamagedChange = (text: string) => {
    setgobCarHeadlightsDamaged(text);
    actStructure.gobCarHeadlightsDamaged = text;
  };
  const [gobFrontBumper, setgobFrontBumper] = useState('');
  const handleActgobFrontBumperChange = (text: string) => {
    setgobFrontBumper(text);
    actStructure.gobFrontBumper = text;
  };
  const [gobFrontBumperDamaged, setgobFrontBumperDamaged] = useState('');
  const handleActgobFrontBumperDamagedChange = (text: string) => {
    setgobFrontBumperDamaged(text);
    actStructure.gobFrontBumperDamaged = text;
  };
  const [gobRearBumper, setgobRearBumper] = useState('');
  const handleActgobRearBumperChange = (text: string) => {
    setgobRearBumper(text);
    actStructure.gobRearBumper = text;
  };
  const [gobRearBumperDamaged, setgobRearBumperDamaged] = useState('');
  const handleActgobRearBumperDamagedChange = (text: string) => {
    setgobRearBumperDamaged(text);
    actStructure.gobRearBumperDamaged = text;
  };
  const [viSeatCondition, setviSeatCondition] = useState('');
  const handleActviSeatConditionChange = (text: string) => {
    setviSeatCondition(text);
    actStructure.viSeatCondition = text;
  };
  const [viSteeringWheelCondition, setviSteeringWheelCondition] = useState('');
  const handleActviSteeringWheelConditionChange = (text: string) => {
    setviSteeringWheelCondition(text);
    actStructure.viSteeringWheelCondition = text;
  };
  const [viDoorCards, setviDoorCards] = useState('');
  const handleActviDoorCardsChange = (text: string) => {
    setviDoorCards(text);
    actStructure.viDoorCards = text;
  };
  const [viTorpedo, setviTorpedo] = useState('');
  const handleActviTorpedoChange = (text: string) => {
    setviTorpedo(text);
    actStructure.viTorpedo = text;
  };
  const [viPedals, setviPedals] = useState('');
  const handleActviPedalsChange = (text: string) => {
    setviPedals(text);
    actStructure.viPedals = text;
  };
  const [viCoulisseGearbox, setviCoulisseGearbox] = useState('');
  const handleActviCoulisseGearboxChange = (text: string) => {
    setviCoulisseGearbox(text);
    actStructure.viCoulisseGearbox = text;
  };
  const [viHeaterAirConditioner, setviHeaterAirConditioner] = useState('');
  const handleActviHeaterAirConditionerChange = (text: string) => {
    setviHeaterAirConditioner(text);
    actStructure.viHeaterAirConditioner = text;
  };
  const [viPowerWindows, setviPowerWindows] = useState('');
  const handleActviPowerWindowsChange = (text: string) => {
    setviPowerWindows(text);
    actStructure.viPowerWindows = text;
  };
  const [viButtonsLeversSwitches, setviButtonsLeversSwitches] = useState('');
  const handleActviButtonsLeversSwitchesChange = (text: string) => {
    setviButtonsLeversSwitches(text);
    actStructure.viButtonsLeversSwitches = text;
  };
  const [viAudio, setviAudio] = useState('');
  const handleActviAudioChange = (text: string) => {
    setviAudio(text);
    actStructure.viAudio = text;
  };
  const [viRearViewCamera, setviRearViewCamera] = useState('');
  const handleActviRearViewCameraChange = (text: string) => {
    setviRearViewCamera(text);
    actStructure.viRearViewCamera = text;
  };
  const [viInstrumentPanelWarnings, setviInstrumentPanelWarnings] =
    useState('');
  const handleActviInstrumentPanelWarningsChange = (text: string) => {
    setviInstrumentPanelWarnings(text);
    actStructure.viInstrumentPanelWarnings = text;
  };
  const [viSpareWheel, setviSpareWheel] = useState('');
  const handleActviSpareWheelChange = (text: string) => {
    setviSpareWheel(text);
    actStructure.viSpareWheel = text;
  };
  const [viTrunkUpholstery, setviTrunkUpholstery] = useState('');
  const handleActviTrunkUpholsteryChange = (text: string) => {
    setviTrunkUpholstery(text);
    actStructure.viTrunkUpholstery = text;
  };
  const [viOtherRemarks, setviOtherRemarks] = useState('');
  const handleActviOtherRemarksChange = (text: string) => {
    setviOtherRemarks(text);
    actStructure.viOtherRemarks = text;
  };
  const [tdUnderTheHood, settdUnderTheHood] = useState('');
  const handleActtdUnderTheHoodChange = (text: string) => {
    settdUnderTheHood(text);
    actStructure.tdUnderTheHood = text;
  };
  const [tdOilLevel, settdOilLevel] = useState('');
  const handleActtdOilLevelChange = (text: string) => {
    settdOilLevel(text);
    actStructure.tdOilLevel = text;
  };
  const [tdFrontSuspension, settdFrontSuspension] = useState('');
  const handleActtdFrontSuspensionChange = (text: string) => {
    settdFrontSuspension(text);
    actStructure.tdFrontSuspension = text;
  };
  const [tdRearSuspension, settdRearSuspension] = useState('');
  const handleActtdRearSuspensionChange = (text: string) => {
    settdRearSuspension(text);
    actStructure.tdRearSuspension = text;
  };
  const [tdOverclocking, settdOverclocking] = useState('');
  const handleActtdOverclockingChange = (text: string) => {
    settdOverclocking(text);
    actStructure.tdOverclocking = text;
  };
  const [tdSmoke, settdSmoke] = useState('');
  const handleActtdSmokeChange = (text: string) => {
    settdSmoke(text);
    actStructure.tdSmoke = text;
  };
  const [tdEngineTemperature, settdEngineTemperature] = useState('');
  const handleActtdEngineTemperatureChange = (text: string) => {
    settdEngineTemperature(text);
    actStructure.tdEngineTemperature = text;
  };
  const [tdEngineNoise, settdEngineNoise] = useState('');
  const handleActtdEngineNoiseChange = (text: string) => {
    settdEngineNoise(text);
    actStructure.tdEngineNoise = text;
  };
  const [tdEngineOperation, settdEngineOperation] = useState('');
  const handleActtdEngineOperationChange = (text: string) => {
    settdEngineOperation(text);
    actStructure.tdEngineOperation = text;
  };
  const [tdMotorStart, settdMotorStart] = useState('');
  const handleActtdMotorStartChange = (text: string) => {
    settdMotorStart(text);
    actStructure.tdMotorStart = text;
  };
  const [tdSwitchingGearbox, settdSwitchingGearbox] = useState('');
  const handleActtdSwitchingGearboxChange = (text: string) => {
    settdSwitchingGearbox(text);
    actStructure.tdSwitchingGearbox = text;
  };
  const [tdRudderZeroPoint, settdRudderZeroPoint] = useState('');
  const handleActtdRudderZeroPointChange = (text: string) => {
    settdRudderZeroPoint(text);
    actStructure.tdRudderZeroPoint = text;
  };
  const [tdSteeringRack, settdSteeringRack] = useState('');
  const handleActtdSteeringRackChange = (text: string) => {
    settdSteeringRack(text);
    actStructure.tdSteeringRack = text;
  };
  const [
    tdNoiseOfUpholsteryAndInteriorEquipment,
    settdNoiseOfUpholsteryAndInteriorEquipment,
  ] = useState('');
  const handleActtdNoiseOfUpholsteryAndInteriorEquipmentChange = (
    text: string,
  ) => {
    settdNoiseOfUpholsteryAndInteriorEquipment(text);
    actStructure.tdNoiseOfUpholsteryAndInteriorEquipment = text;
  };

  const [mDate, setmDate] = useState(new Date());
  const [mDateShow, setmDateShow] = useState(false);
  const onPressDate = () => {
    setmDateShow(true);
  };
  const handleActDateChange = (event: any, date: Date | undefined) => {
    setmDateShow(false);
    if (date) {
      setmDate(date);
      actStructure.mDate = date;
    }
  };

  const [mBoolean, setmBoolean] = useState(false);
  const handleActBooleanChange = (value: boolean) => {
    setmBoolean(value);
    actStructure.mBoolean = value;
  };

  if (StatusActPage == 'OpenPageAct') {
    setActiveActPage('Main');
    changeStatusActPage('OpenedPageAct');

    let thisidAct = idAct;

    if (idAct === 0) {
      setactID('');
      setmName('');
      setmDate(new Date());
      setmBoolean(false);
      setmVIN('');
      setmYear('');
      setmMileage('');
      setmMileageType('1');
      setmMileageMeasurement('1');
      setmPrice('');
      setmCurrency('EUR');
      setmGearbox('1');
      setmDriveUnit('1');
      setmFuel('1');
      setmTypeSeller('1');
      setmRegister('1');
      setmServiceBook('1');
      setmSecondSetOfTires('1');
      setmBodyCondition('1');
      setmSalonCondition('1');
      setmPreSalePreparation('1');
      setc01Value('');
      setc01Condition('');
      setc02Value('');
      setc02Condition('');
      setc03Value('');
      setc03Condition('');
      setc04Value('');
      setc04Condition('');
      setc05Value('');
      setc05Condition('');
      setc06Value('');
      setc06Condition('');
      setc07Value('');
      setc07Condition('');
      setc08Value('');
      setc08Condition('');
      setc09Value('');
      setc09Condition('');
      setc10Value('');
      setc10Condition('');
      setc11Value('');
      setc11Condition('');
      setgobWindshield('');
      setgobWindshieldDamaged('');
      setgobLeftGlass('');
      setgobLeftGlassDamaged('');
      setgobRightGlass('');
      setgobRightGlassDamaged('');
      setgobCarHeadlights('');
      setgobCarHeadlightsDamaged('');
      setgobFrontBumper('');
      setgobFrontBumperDamaged('');
      setgobRearBumper('');
      setgobRearBumperDamaged('');
      setviSeatCondition('');
      setviSteeringWheelCondition('');
      setviDoorCards('');
      setviTorpedo('');
      setviPedals('');
      setviCoulisseGearbox('');
      setviHeaterAirConditioner('');
      setviPowerWindows('');
      setviButtonsLeversSwitches('');
      setviAudio('');
      setviRearViewCamera('');
      setviInstrumentPanelWarnings('');
      setviSpareWheel('');
      setviTrunkUpholstery('');
      setviOtherRemarks('');
      settdUnderTheHood('');
      settdOilLevel('');
      settdFrontSuspension('');
      settdRearSuspension('');
      settdOverclocking('');
      settdSmoke('');
      settdEngineTemperature('');
      settdEngineNoise('');
      settdEngineOperation('');
      settdMotorStart('');
      settdSwitchingGearbox('');
      settdRudderZeroPoint('');
      settdSteeringRack('');
      settdNoiseOfUpholsteryAndInteriorEquipment('');

      actStructure = createVrStructure(vrStructureData);
    } else {
      loadMenuItems(idAct);
    }
  } else {
  }

  const myRenderActPage = () => {
    if (activeActPage === 'Main') {
      activeActPageContent = (
        <ScrollView style={styles.actPageContainer}>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Boolean</Text>
            <Switch
              value={mBoolean}
              trackColor={{true: '#00f', false: 'red'}}
              thumbColor="green"
              onValueChange={handleActBooleanChange}
            />
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>ID</Text>
            <TextInput
              keyboardType="decimal-pad"
              style={styles.actInputSilver}
              onChangeText={handleActIDChange}
              value={actID}
              editable={false}
            />
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Дата перевірки</Text>
            <Text onPress={onPressDate} style={styles.actInputBlack}>
              {('0' + mDate.getDate()).slice(-2) +
                '.' +
                ('0' + (mDate.getMonth() + 1)).slice(-2) +
                '.' +
                mDate.getFullYear()}
            </Text>
          </View>
          {mDateShow && (
            <DateTimePicker
              value={mDate}
              mode="date"
              is24Hour={true}
              display="calendar"
              onChange={handleActDateChange}
            />
          )}
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Марка,{'\n'}модель авто</Text>
            <TextInput
              style={styles.actInputBlack}
              onChangeText={handleActmNameChange}
              value={mName}
            />
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>VIN код</Text>
            <TextInput
              style={styles.actInputBlack}
              onChangeText={handleActmVINChange}
              value={mVIN}
            />
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Рік випуску</Text>
            <TextInput
              keyboardType="decimal-pad"
              style={styles.actInputBlack}
              onChangeText={handleActmYearChange}
              value={mYear}
            />
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Пробіг</Text>
            <TextInput
              keyboardType="decimal-pad"
              style={styles.actInputBlack}
              onChangeText={handleActmMileageChange}
              value={mMileage}
            />
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Пробіг</Text>
            {omMileageType.map((omMileageType, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: 7,
                }}
                onPress={() => {
                  setmMileageType(omMileageType.value);
                  actStructure.mMileageType = omMileageType.value;
                }}>
                <View
                  style={[
                    styles.actInputRadioBar,
                    {
                      borderColor:
                        mMileageType === omMileageType.value ? 'green' : 'gray',
                    },
                  ]}>
                  {mMileageType === omMileageType.value && (
                    <View style={styles.actInputRadioBarInnerCircle} />
                  )}
                </View>
                <Text style={{marginLeft: 5, padding: 5, color: 'black'}}>
                  {omMileageType.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Пробіг</Text>
            {omMileageMeasurement.map((omMileageMeasurement, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: 7,
                }}
                onPress={() => {
                  setmMileageMeasurement(omMileageMeasurement.value);
                  actStructure.mMileageMeasurement = omMileageMeasurement.value;
                }}>
                <View
                  style={[
                    styles.actInputRadioBar,
                    {
                      borderColor:
                        mMileageMeasurement === omMileageMeasurement.value
                          ? 'green'
                          : 'gray',
                    },
                  ]}>
                  {mMileageMeasurement === omMileageMeasurement.value && (
                    <View style={styles.actInputRadioBarInnerCircle} />
                  )}
                </View>
                <Text style={{marginLeft: 5, padding: 5, color: 'black'}}>
                  {omMileageMeasurement.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Ціна</Text>
            <TextInput
              keyboardType="decimal-pad"
              style={styles.actInputBlack}
              onChangeText={handleActmPriceChange}
              value={mPrice}
            />
            <Text>{mCurrency}</Text>
            <Picker
              style={styles.currencyPicker}
              selectedValue={mCurrency}
              onValueChange={handleActmCurrencyChange}>
              {omCurrency.map(option => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>КПП</Text>
            {omGearbox.map((omGearbox, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: 7,
                }}
                onPress={() => {
                  setmGearbox(omGearbox.value);
                  actStructure.mGearbox = omGearbox.value;
                }}>
                <View
                  style={[
                    styles.actInputRadioBar,
                    {
                      borderColor:
                        mGearbox === omGearbox.value ? 'green' : 'gray',
                    },
                  ]}>
                  {mGearbox === omGearbox.value && (
                    <View style={styles.actInputRadioBarInnerCircle} />
                  )}
                </View>
                <Text style={{marginLeft: 5, padding: 5, color: 'black'}}>
                  {omGearbox.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Привід</Text>
            {omDriveUnit.map((omDriveUnit, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: 7,
                }}
                onPress={() => {
                  setmDriveUnit(omDriveUnit.value);
                  actStructure.mDriveUnit = omDriveUnit.value;
                }}>
                <View
                  style={[
                    styles.actInputRadioBar,
                    {
                      borderColor:
                        mDriveUnit === omDriveUnit.value ? 'green' : 'gray',
                    },
                  ]}>
                  {mDriveUnit === omDriveUnit.value && (
                    <View style={styles.actInputRadioBarInnerCircle} />
                  )}
                </View>
                <Text style={{marginLeft: 5, padding: 5, color: 'black'}}>
                  {omDriveUnit.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Паливо</Text>
            {omFuel.map((omFuel, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: 7,
                }}
                onPress={() => {
                  setmFuel(omFuel.value);
                  actStructure.mFuel = omFuel.value;
                }}>
                <View
                  style={[
                    styles.actInputRadioBar,
                    {
                      borderColor: mFuel === omFuel.value ? 'green' : 'gray',
                    },
                  ]}>
                  {mFuel === omFuel.value && (
                    <View style={styles.actInputRadioBarInnerCircle} />
                  )}
                </View>
                <Text style={{marginLeft: 5, padding: 5, color: 'black'}}>
                  {omFuel.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Хто продає</Text>
            {omTypeSeller.map((omTypeSeller, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: 7,
                }}
                onPress={() => {
                  setmTypeSeller(omTypeSeller.value);
                  actStructure.mTypeSeller = omTypeSeller.value;
                }}>
                <View
                  style={[
                    styles.actInputRadioBar,
                    {
                      borderColor:
                        mTypeSeller === omTypeSeller.value ? 'green' : 'gray',
                    },
                  ]}>
                  {mTypeSeller === omTypeSeller.value && (
                    <View style={styles.actInputRadioBarInnerCircle} />
                  )}
                </View>
                <Text style={{marginLeft: 5, padding: 5, color: 'black'}}>
                  {omTypeSeller.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Знятий з обліку</Text>
            {omRegister.map((omRegister, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: 7,
                }}
                onPress={() => {
                  setmRegister(omRegister.value);
                  actStructure.mRegister = omRegister.value;
                }}>
                <View
                  style={[
                    styles.actInputRadioBar,
                    {
                      borderColor:
                        mRegister === omRegister.value ? 'green' : 'gray',
                    },
                  ]}>
                  {mRegister === omRegister.value && (
                    <View style={styles.actInputRadioBarInnerCircle} />
                  )}
                </View>
                <Text style={{marginLeft: 5, padding: 5, color: 'black'}}>
                  {omRegister.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Сервісна книга</Text>
            {omServiceBook.map((omServiceBook, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: 7,
                }}
                onPress={() => {
                  setmServiceBook(omServiceBook.value);
                  actStructure.mServiceBook = omServiceBook.value;
                }}>
                <View
                  style={[
                    styles.actInputRadioBar,
                    {
                      borderColor:
                        mServiceBook === omServiceBook.value ? 'green' : 'gray',
                    },
                  ]}>
                  {mServiceBook === omServiceBook.value && (
                    <View style={styles.actInputRadioBarInnerCircle} />
                  )}
                </View>
                <Text style={{marginLeft: 5, padding: 5, color: 'black'}}>
                  {omServiceBook.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Другий комплект резини</Text>
            {omSecondSetOfTires.map((omSecondSetOfTires, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: 7,
                }}
                onPress={() => {
                  setmSecondSetOfTires(omSecondSetOfTires.value);
                  actStructure.mSecondSetOfTires = omSecondSetOfTires.value;
                }}>
                <View
                  style={[
                    styles.actInputRadioBar,
                    {
                      borderColor:
                        mSecondSetOfTires === omSecondSetOfTires.value
                          ? 'green'
                          : 'gray',
                    },
                  ]}>
                  {mSecondSetOfTires === omSecondSetOfTires.value && (
                    <View style={styles.actInputRadioBarInnerCircle} />
                  )}
                </View>
                <Text style={{marginLeft: 5, padding: 5, color: 'black'}}>
                  {omSecondSetOfTires.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Стан кузова</Text>
            {omBodyCondition.map((omBodyCondition, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: 7,
                }}
                onPress={() => {
                  setmBodyCondition(omBodyCondition.value);
                  actStructure.mBodyCondition = omBodyCondition.value;
                }}>
                <View
                  style={[
                    styles.actInputRadioBar,
                    {
                      borderColor:
                        mBodyCondition === omBodyCondition.value
                          ? 'green'
                          : 'gray',
                    },
                  ]}>
                  {mBodyCondition === omBodyCondition.value && (
                    <View style={styles.actInputRadioBarInnerCircle} />
                  )}
                </View>
                <Text style={{marginLeft: 5, padding: 5, color: 'black'}}>
                  {omBodyCondition.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Стан салону</Text>
            {omSalonCondition.map((omSalonCondition, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: 7,
                }}
                onPress={() => {
                  setmSalonCondition(omSalonCondition.value);
                  actStructure.mSalonCondition = omSalonCondition.value;
                }}>
                <View
                  style={[
                    styles.actInputRadioBar,
                    {
                      borderColor:
                        mSalonCondition === omSalonCondition.value
                          ? 'green'
                          : 'gray',
                    },
                  ]}>
                  {mSalonCondition === omSalonCondition.value && (
                    <View style={styles.actInputRadioBarInnerCircle} />
                  )}
                </View>
                <Text style={{marginLeft: 5, padding: 5, color: 'black'}}>
                  {omSalonCondition.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Передпродажна підготовка</Text>
            {omPreSalePreparation.map((omPreSalePreparation, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: 7,
                }}
                onPress={() => {
                  setmPreSalePreparation(omPreSalePreparation.value);
                  actStructure.mPreSalePreparation = omPreSalePreparation.value;
                }}>
                <View
                  style={[
                    styles.actInputRadioBar,
                    {
                      borderColor:
                        mPreSalePreparation === omPreSalePreparation.value
                          ? 'green'
                          : 'gray',
                    },
                  ]}>
                  {mPreSalePreparation === omPreSalePreparation.value && (
                    <View style={styles.actInputRadioBarInnerCircle} />
                  )}
                </View>
                <Text style={{marginLeft: 5, padding: 5, color: 'black'}}>
                  {omPreSalePreparation.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      );
    } else if (activeActPage === 'Cab') {
      activeActPageContent = <Text>Cab</Text>;
    } else if (activeActPage === 'GlassOpticsBumpers') {
      activeActPageContent = <Text>GlassOpticsBumpers</Text>;
    } else if (activeActPage === 'VehicleInterior') {
      activeActPageContent = <Text>VehicleInterior</Text>;
    } else {
      /*(activeActPage === 'TestDrive')*/
      activeActPageContent = <Text>TestDrive</Text>;
    }

    let getActButtonStyle = (page: string) =>
      activeActPage === page ? styles.actButtonActive : styles.actButton;

    return (
      <View style={styles.container}>
        <ScrollView
          horizontal={true}
          style={styles.actScrollview}
          contentContainerStyle={styles.actScrollviewContent}
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={getActButtonStyle('Main')}
            onPress={() => handleActListPress('Main')}>
            <Text>Головна</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getActButtonStyle('Cab')}
            onPress={() => handleActListPress('Cab')}>
            <Text>Кузов</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getActButtonStyle('GlassOpticsBumpers')}
            onPress={() => handleActListPress('GlassOpticsBumpers')}>
            <Text style={styles.actButtonText}>Скло, оптика, бампери</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getActButtonStyle('VehicleInterior')}
            onPress={() => handleActListPress('VehicleInterior')}>
            <Text>Салон</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getActButtonStyle('TestDrive')}
            onPress={() => handleActListPress('TestDrive')}>
            <Text>Тест-Драйв</Text>
          </TouchableOpacity>
        </ScrollView>
        {activeActPageContent}
      </View>
    );
  };

  return myRenderActPage();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  actScrollview: {
    width: '100%',
    marginBottom: 10,
  },
  actScrollviewContent: {
    width: '168.5%',
  },
  actButton: {
    margin: 10,
    height: 45,
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    width: '17%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actButtonActive: {
    margin: 10,
    height: 45,
    backgroundColor: '#A9A9A9',
    borderRadius: 10,
    width: '17%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actButtonText: {
    textAlign: 'center',
  },
  actPageContainer: {
    height: '90%',
  },
  actGroupContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  actGroupHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  actInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  actInputLabel: {
    width: '25%',
    marginRight: 10,
    marginLeft: 10,
    color: 'black',
  },
  actInputSilver: {
    flex: 1,
    width: '70%',
    height: 40,
    borderColor: 'silver',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
    color: 'silver',
    textAlignVertical: 'center',
    marginRight: 10,
  },
  actInputBlack: {
    flex: 1,
    width: '70%',
    height: 40,
    borderColor: 'silver',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
    color: 'black',
    textAlignVertical: 'center',
    marginRight: 10,
  },
  actInputRadioBar: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actInputRadioBarInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: 'green',
  },
  currencyPicker: {
    width: 40,
    height: 40,
  },
});
