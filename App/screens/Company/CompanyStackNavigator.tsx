import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CompanyMain from './CompanyMain';
import CompanyAdd from './CompanyAdd';

type CompanyStackParamList = {
  CompanyMain: undefined;
  CompanyAdd: undefined;
};

const Stack = createStackNavigator<CompanyStackParamList>();

const CompanyStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='CompanyMain' component={ CompanyMain }  />
      <Stack.Screen name='CompanyAdd' component={ CompanyAdd } />
    </Stack.Navigator>
  );
};

export default CompanyStackNavigator;