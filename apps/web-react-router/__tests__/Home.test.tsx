import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {Home} from '../app/routes/Home';
import {SafeAreaProvider} from 'react-native-safe-area-context';
 
describe('Home', () => {
  it('renders a heading', () => {
    render(<SafeAreaProvider><Home /></SafeAreaProvider>)
 
    const homeTitle = screen.getByText('Home')
 
    expect(homeTitle).toBeInTheDocument()
  })
})