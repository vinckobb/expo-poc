import { render } from '@testing-library/react-native';
import App from '../src/index';

describe('App', () => 
{
  it('renders without crashing', () => 
  {
    render(<App />);
    // Add your expectations based on what should be visible in the App
  });
});