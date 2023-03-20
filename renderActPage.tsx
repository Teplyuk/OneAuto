import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function renderActPage() {
  let activeActPageContent;
  const [activeActPage, setActiveActPage] = useState('Main');

  // const [mDate, setmDate] = useState('');
  // const [mStatus, setmStatus] = useState('');

  //ACT-MENU SWITCHER:
  const handleActListPress = (page: string) => {
    setActiveActPage(page);
  };

  const [actID, setactID] = useState('');
  const handleActIDChange = (text: string) => {
    if (/^\d+$/.test(text) || text === '') {
      setactID(text);
    } else {
      setactID(actID);
    }
  };

  const [mName, setmName] = useState('');
  const handleActNameChange = (text: string) => {
    setmName(text);
  };

  const myRenderActPage = () => {
    if (activeActPage === 'Main') {
      activeActPageContent = (
        <ScrollView style={styles.actPageContainer}>
          <Text style={styles.actGroupHeader}>ГОЛОВНА</Text>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Act ID</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.actInput}
              onChangeText={handleActIDChange}
              value={actID}
            />
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Name</Text>
            <TextInput
              style={styles.actInput}
              onChangeText={handleActNameChange}
              value={mName}
            />
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Name</Text>
            <TextInput
              style={styles.actInput}
              onChangeText={handleActNameChange}
              value={mName}
            />
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Name</Text>
            <TextInput
              style={styles.actInput}
              onChangeText={handleActNameChange}
              value={mName}
            />
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Name</Text>
            <TextInput
              style={styles.actInput}
              onChangeText={handleActNameChange}
              value={mName}
            />
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Name</Text>
            <TextInput
              style={styles.actInput}
              onChangeText={handleActNameChange}
              value={mName}
            />
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Name</Text>
            <TextInput
              style={styles.actInput}
              onChangeText={handleActNameChange}
              value={mName}
            />
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Name</Text>
            <TextInput
              style={styles.actInput}
              onChangeText={handleActNameChange}
              value={mName}
            />
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Name</Text>
            <TextInput
              style={styles.actInput}
              onChangeText={handleActNameChange}
              value={mName}
            />
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Name</Text>
            <TextInput
              style={styles.actInput}
              onChangeText={handleActNameChange}
              value={mName}
            />
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Name9</Text>
            <TextInput
              style={styles.actInput}
              onChangeText={handleActNameChange}
              value={mName}
            />
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Name0</Text>
            <TextInput
              style={styles.actInput}
              onChangeText={handleActNameChange}
              value={mName}
            />
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Name11</Text>
            <TextInput
              style={styles.actInput}
              onChangeText={handleActNameChange}
              value={mName}
            />
          </View>
          <View style={styles.actInputContainer}>
            <Text style={styles.actInputLabel}>Name12</Text>
            <TextInput
              style={styles.actInput}
              onChangeText={handleActNameChange}
              value={mName}
            />
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
    color: 'black',
  },
  actInput: {
    flex: 1,
    width: '70%',
    height: 40,
    borderColor: 'silver',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
});
