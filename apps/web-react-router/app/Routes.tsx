import {createBrowserRouter} from "react-router";
import BaseLayout from "./layouts/baseLayout";

export const router = createBrowserRouter([
  {
    path: '/',
    Component: BaseLayout,
    children: [
      {
        index: true,
        lazy: async () => {
          const {Home} = await import('./routes/Home');
          return {Component: Home};
        },
      },
      {
        path: 'profile',
        lazy: async () => {
          const {Profile} = await import('./routes/Profile');
          return {Component: Profile};
        }
      },
      {
        path: 'explore',
        lazy: async () => {
          const {Explore} = await import('./routes/Explore');
          return {Component: Explore};
        }
      },
    ]
  },
]);
