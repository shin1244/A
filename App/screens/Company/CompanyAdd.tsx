import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const CompanyAdd = () => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [address, setAddress] = useState('');
  const [building, setBuilding] = useState('');
  const [logo, setLogo] = useState<string | null>(null);
  const [description, setDescription] = useState('');
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
  
  const handleCompanyAdd = async () => {
    const formData = new FormData();
    formData.append('company_name', name);
    formData.append('company_year', year);
    formData.append('company_address', address);
    formData.append('company_building', building);
    
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
      await axios.post('http://14.53.217.16:3000/companies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 파일 업로드를 위해 Content-Type을 설정
        },
      });
      navigation.navigate('CompanyMain')
    } catch (error) {
      console.error('회사 추가 실패:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회사 추가</Text>
      <TouchableOpacity style={styles.logoContainer} onPress={handleChooseLogo}>
        {logo ? (
          <Image source={{ uri: logo }} style={styles.logoImage} />
        ) : (
          <View style={styles.emptyLogoBox}>
            <Text style={{ color: '#aaa' }}>로고 선택</Text>
          </View>
        )}
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
      <TextInput
        style={styles.input}
        placeholder="회사 주소"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="대표 건축물"
        value={building}
        onChangeText={setBuilding}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="회사 소개글을 입력하세요 (최대 500자)"
        value={description}
        onChangeText={setDescription}
        multiline
        maxLength={500}
      />
      <TouchableOpacity style={styles.button} onPress={handleCompanyAdd}>
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
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  emptyLogoBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top', // 안드로이드에서 위쪽 정렬
  },
  charCount: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    color: '#888',
    fontSize: 12,
  },
});

export default CompanyAdd;