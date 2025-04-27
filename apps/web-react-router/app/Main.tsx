import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router";
import { router } from './Routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './index.css';
import {GluestackUIProvider} from '@monorepo/components';

createRoot(document.getElementById('root')!).render(
  <GluestackUIProvider>
    <SafeAreaProvider>
      <RouterProvider router={router} />
    </SafeAreaProvider>
  </GluestackUIProvider>
)
