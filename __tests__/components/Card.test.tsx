import React from 'react'
import { render, screen } from '@testing-library/react'
import Card from '@/components/Card'

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(<Card>Test Content</Card>)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies default padding', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.firstChild
    expect(card).toHaveClass('p-6')
  })

  it('applies custom padding when specified', () => {
    const { container } = render(<Card padding="lg">Content</Card>)
    const card = container.firstChild
    expect(card).toHaveClass('p-8')
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>)
    const card = container.firstChild
    expect(card).toHaveClass('custom-class')
  })
})
