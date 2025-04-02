rm -rf node_modules && \
rm -rf /tmp/metro-* && \
rm -rf $TMPDIR/metro-* && \
rm -rf $TMPDIR/react-* && \
rm -rf ~/.expo && \
rm -rf ios/Pods ios/build ios/DerivedData && \
rm -rf ~/Library/Developer/Xcode/DerivedData && \
rm -rf package-lock.json yarn.lock pnpm-lock.yaml && \
rm -rf .expo .expo-shared && \
npx expo start --clear
