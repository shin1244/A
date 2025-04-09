import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CompanyMain from './CompanyMain';
import CompanyAdd from './CompanyAdd';
import { TextInput } from 'react-native';
import { styles } from '../../style';
import CompanyDetail from './CompanyDetail';

type CompanyStackParamList = {
  CompanyMain: undefined;
  CompanyAdd: undefined;
  CompanyDetail: { companyId: number };
};

const Stack = createStackNavigator<CompanyStackParamList>();

const CompanyStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerTitleStyle: {fontSize:30}, headerLeft: () => null}}>
      <Stack.Screen 
      name='CompanyMain' 
      component={ CompanyMain } 
      options={{headerTitle: "시공사", headerRight: () => <TextInput style={styles.searchInput}/>}} />
      
      <Stack.Screen 
      name='CompanyAdd' component={ CompanyAdd } 
      options={{headerTitle: "시공사 추가"}} />

      <Stack.Screen 
      name='CompanyDetail' component={ CompanyDetail }
       />
    </Stack.Navigator>
  );
};

export default CompanyStackNavigator;