
'use client';
import React, {useEffect, useLayoutEffect} from 'react';
import {OverlayProvider} from '@gluestack-ui/overlay';
import {ToastProvider} from '@gluestack-ui/toast';
import {script} from './script';

export type ModeType = 'light' | 'dark' | 'system';

export const useSafeLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function GluestackUIProvider({
  mode = 'system',
  ...props
}: {
  mode?: ModeType;
  children?: React.ReactNode;
}) {
  const handleMediaQuery = React.useCallback((e: MediaQueryListEvent) => {
    script(e.matches ? 'dark' : 'light');
  }, []);

  useSafeLayoutEffect(() => {
    if (mode === 'system') {
      mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    const documentElement = document.documentElement;
    if (documentElement) {
      documentElement.classList.add(mode);
      documentElement.classList.remove(mode === 'light' ? 'dark' : 'light');
      // documentElement.style.colorScheme = mode;
    }
  }, [mode]);

  useSafeLayoutEffect(() => {
    if (mode !== 'system') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    media.addListener(handleMediaQuery);

    return () => {
      media.removeListener(handleMediaQuery);
    };
  }, [handleMediaQuery]);

  return (
    <>
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `(${script.toString()})('${mode}')`,
        }}
      />
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </>
  );
}

