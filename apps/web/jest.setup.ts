// import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

// jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('react-native-safe-area-context', () => {
    const SafeAreaContext = {
      SafeAreaProvider: ({ children }) => children,
      SafeAreaView: ({ children }) => children,
      useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
      useSafeAreaFrame: () => ({ x: 0, y: 0, width: 390, height: 844 }),
    };
    return SafeAreaContext;
  });
  