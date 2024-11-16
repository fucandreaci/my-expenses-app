import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';
import '../global.css';
import {expenseService} from '@/service/expense.service';
import {categoryService} from '@/service/category.service';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [isLoadingServiceInit, setIsLoadingServiceInit] = useState<boolean>(false);

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const initServices = async () => {
    setIsLoadingServiceInit(true);
    await expenseService.initExpenses();
    await categoryService.initCategories();
    setIsLoadingServiceInit(false);
  }

  // Initialize services on app start
  useEffect(() => {
    initServices();
  }, []);

  useEffect(() => {
    if (error) {
      throw error;
    }

    if (loaded && !isLoadingServiceInit) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, isLoadingServiceInit]);

  if (!loaded && !error) {
    return null;
  }

  return (
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
  );
}

export default RootLayout;
