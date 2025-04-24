import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router";
import { router } from './Routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <SafeAreaProvider>
    <RouterProvider router={router} />
  </SafeAreaProvider>
)
