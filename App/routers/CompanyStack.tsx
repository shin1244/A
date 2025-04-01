import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CompanyScreen from './CompanyScreen';
import AddCompanyScreen from './AddCompanyScreen';

const Stack = createStackNavigator();

const CompanyStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="CompanyList" 
        component={CompanyScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AddCompany" 
        component={AddCompanyScreen} 
        options={{ headerTitle: '회사 추가' }} 
      />
    </Stack.Navigator>
  );
};

export default CompanyStackNavigator;