import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import Fonts from '../../assets/fonts';

/**
 * Load and use fonts with Expo SDK
 */
const useFont = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFont = async () => {
      try {
        await Font.loadAsync({
          [Fonts.CIRCULAR_STD_BOLD]: require('../../assets/fonts/CircularStd-Bold.ttf'),
          [Fonts.CIRCULAR_STD_MEDIUM]: require('../../assets/fonts/CircularStd-Medium.ttf'),
        });

        setIsLoading(false);
      } catch (error) {
        // TODO: report error on sentry
      }
    };

    loadFont();
  }, []);

  return isLoading;
};

export default useFont;
