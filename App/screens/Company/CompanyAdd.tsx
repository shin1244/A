import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const CompanyAdd = () => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [logo, setLogo] = useState<string | null>(null);
  const navigation = useNavigation();

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('갤러리 접근 권한이 필요합니다.');
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const handleChooseLogo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      setLogo(result.assets?.[0]?.uri || null);  // 파일 URI를 상태로 저장
    }
  };
  
  const handleAddCompany = async () => {
    const formData = new FormData();
    formData.append('company_name', name);
    formData.append('company_year', year);
    
    if (logo) {
      const uriParts = logo.split('.');
      const fileType = uriParts[uriParts.length - 1];
      const fileName = `company_logo.${fileType}`;
      const file = {
        uri: logo,
        name: fileName,
        type: `image/${fileType}`,
      };
      formData.append('company_logo', file); // 이미지 파일을 formData에 추가
    }
  
    try {
      await axios.post('http://222.101.3.77:3000/companies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 파일 업로드를 위해 Content-Type을 설정
        },
      });
      navigation.goBack(); // 회사 추가 후 이전 화면으로 이동
    } catch (error) {
      console.error('회사 추가 실패:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회사 추가</Text>
      <TouchableOpacity style={styles.button} onPress={handleChooseLogo}>
        <Text style={styles.buttonText}>로고 선택</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="회사 이름"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="설립 년도"
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddCompany}>
        <Text style={styles.buttonText}>추가</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CompanyMain')}
      >
        <Ionicons name="caret-back-circle" size={50} color="blue" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default CompanyAdd;