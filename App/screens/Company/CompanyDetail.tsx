import { View, Text, Image, StyleSheet, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// type Props = StackScreenProps<CompanyStackParamList, 'CompanyDetail'>;

interface Company {
  company_name: string;
  company_logo: string;
  company_address: string;
  company_description: string;
  rating: number;
}

const CompanyDetail = ({ route }) => {
  const { companyId } = route.params;
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    axios.get(`http://your-api.com/companies/${companyId}`) // ← 여기서 id 기반으로 요청
      .then(res => setCompany(res.data))
      .catch(err => console.error(err));
  }, [companyId]);

  if (!company) {
    return <Text>로딩 중...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: company.company_logo }} style={styles.logo} />

      <Text style={styles.name}>{company.company_name}</Text>
      <Text style={styles.address}>{company.company_address}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>회사 소개</Text>
        <View style={styles.divider} />
        <Text style={styles.description}>{company.company_description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>회사 평점</Text>
        <View style={styles.divider} />
        <View style={styles.ratingRow}>
          {[...Array(5)].map((_, i) => (
            <Text key={i} style={styles.star}>⭐</Text>
          ))}
          <Text style={styles.ratingText}>{company.rating.toFixed(1)}/5.0</Text>
        </View>
      </View>

      <TextInput
        style={styles.commentBox}
        placeholder="댓글을 입력하세요"
        multiline
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // 이전과 동일 (필요 시 다시 드릴게요)
});

export default CompanyDetail;
