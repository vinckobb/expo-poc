import NetInfo from '@react-native-community/netinfo';

export interface NetworkService {
  isConnected(): Promise<boolean>;
  onConnectionChange(callback: (isConnected: boolean) => void): () => void;
}

export class NetworkServiceImpl implements NetworkService {
  async isConnected(): Promise<boolean> {
    const state = await NetInfo.fetch();
    return state.isConnected ?? false;
  }

  onConnectionChange(callback: (isConnected: boolean) => void): () => void {
    return NetInfo.addEventListener(state => {
      callback(state.isConnected ?? false);
    });
  }
}