import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CompanyDetailScreen = ({ id: number }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.detailText}>회사 이름: {company.name}</Text>
      <Text style={styles.detailText}>설립 년도: {company.year}</Text>
      {/* 필요한 회사 상세 정보를 추가하세요 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default CompanyDetailScreen;