import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
 
describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)
 
    const homeTitle = screen.getByText('Home')
 
    expect(homeTitle).toBeInTheDocument()
  })
})