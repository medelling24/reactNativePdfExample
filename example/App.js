import * as React from 'react';
import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DocumentPicker from 'react-native-document-picker'
import DocumentViewExample from "./DocumentView";

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title={'Open File'} onPress={()=> {
                DocumentPicker.pickSingle({
                    mode: 'open',
                    presentationStyle: 'fullScreen',
                    copyToCacheDirectory: false,
                }).then((f) => {
                    navigation.navigate('DocumentView', {
                        path: f.uri,
                    })
                })
            }}/>
        </View>
    );
}

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="DocumentView" component={DocumentViewExample} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
