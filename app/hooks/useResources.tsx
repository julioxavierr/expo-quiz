import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { SplashScreen } from 'expo';
import FONT_NAMES from 'app/config/fonts';

/**
 * Load and use resources that need to be loaded async by Expo SDK
 */
const useResources = () => {
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Load resources and prevents SplashScreen from hiding until completed
   */
  useEffect(() => {
    SplashScreen.preventAutoHide();

    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          [FONT_NAMES.CIRCULAR_STD_BOLD]: require('../../assets/fonts/CircularStd-Bold.ttf'),
          [FONT_NAMES.CIRCULAR_STD_MEDIUM]: require('../../assets/fonts/CircularStd-Medium.ttf'),
        });

        setIsLoading(false);
        SplashScreen.hide();
      } catch (error) {
        // TODO: report error on sentry
      }
    };

    loadFonts();
  }, []);

  return isLoading;
};

export default useResources;
