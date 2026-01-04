import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TestButton from '../TestButton'

describe('TestButton', () => {
  it('should render with initial count of 0', () => {
    render(<TestButton />)
    expect(screen.getByText(/Click count: 0/i)).toBeInTheDocument()
  })

  it('should increment count when clicked', () => {
    render(<TestButton />)
    const button = screen.getByRole('button', { name: /Click me/i })
    fireEvent.click(button)
    expect(screen.getByText(/Click count: 1/i)).toBeInTheDocument()
  })

  // Intentionally failing test for Claude to fix
  it('should have correct initial text', () => {
    render(<TestButton />)
    // This will fail - wrong text expected
    expect(screen.getByText('Wrong Text')).toBeInTheDocument()
  })
})
