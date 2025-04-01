import React, { useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import CompanyScreen from "../screens/CompanyScreen";
import WorkerScreen from "../screens/WorkerScreen";
import { useNavigation } from "@react-navigation/native";
import { TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"
import { styles } from '../style';
import OutSourceScreen from "../screens/OutSourceScreen";
import AddCompanyScreen from "../screens/AddCompanyScreen";

const TabStack = createBottomTabNavigator();
const Stack = createStackNavigator();

const BackButton = () => {
    const navigation = useNavigation();

    return(
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
            <Ionicons name='arrow-back' size={36} />
        </TouchableOpacity>
    );
}


const TabStackScreen = () => {
    const [searchText, setSearchText] = useState('');
    return (
        <TabStack.Navigator screenOptions={{
            headerLeft: () => <BackButton />,
            headerTitleStyle: {fontSize:30},
            headerRight: () => <TextInput
            style={styles.searchInput}
            placeholder="검색"
            value={searchText}
            onChangeText={setSearchText}
        />
        }}>
            <TabStack.Screen name="시공사" component={CompanyStack} />
            <TabStack.Screen name="하도급" component={OutSourceScreen} />
            <TabStack.Screen name="근로자" component={WorkerScreen} />
        </TabStack.Navigator>
    )
}

const CompanyStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="CompanyList" component={CompanyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddCompany" component={AddCompanyScreen} options={{ headerTitle: '회사 추가' }} />
      </Stack.Navigator>
    );
  }

export default TabStackScreen