import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

//componente de navegacion
import { Navigation } from './src/navigation/Navigation';
import { FadeScreen } from './src/screen/FadeScreen';
import { GradientProvider } from './src/context/GradientContext';

const AppState = ({ children }: any) => {

  return (
    <GradientProvider>
      { children }
    </GradientProvider>
  )
}

const App = () => {
  return(
    <NavigationContainer>
      <AppState>
        <Navigation />
      </AppState>
      {/* <FadeScreen /> */}
    </NavigationContainer>
  );
};

export default App;
