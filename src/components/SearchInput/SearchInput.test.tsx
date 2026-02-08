import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SearchInput } from '@/components/SearchInput'
import type { SearchInputProps } from '@/components/SearchInput/SearchInput.types'

describe('Input Component', () => {
  const mockHandleInputFocus = vi.fn()
  const mockHandleInputChange = vi.fn()
  const mockValidateStyle = vi.fn((style: string) => `mock-${style}`)

  const defaultProps: SearchInputProps = {
    inputRef: { current: null as unknown as HTMLInputElement },
    query: '',
    handleInputFocus: mockHandleInputFocus,
    handleInputChange: mockHandleInputChange,
    placeholder: 'Search...',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders input with correct placeholder', () => {
    render(<SearchInput {...defaultProps} />)
    const input = screen.getByPlaceholderText('Search...')
    expect(input).toBeInTheDocument()
  })

  it('displays the query value', () => {
    render(<SearchInput {...defaultProps} query="test query" />)
    const input = screen.getByDisplayValue('test query')
    expect(input).toBeInTheDocument()
  })

  it('calls handleInputFocus when input is focused', () => {
    render(<SearchInput {...defaultProps} />)
    const input = screen.getByPlaceholderText('Search...')
    
    fireEvent.focus(input)
    
    expect(mockHandleInputFocus).toHaveBeenCalledTimes(1)
  })

  it('calls handleInputChange when user types', () => {
    render(<SearchInput {...defaultProps} />)
    const input = screen.getByPlaceholderText('Search...')
    
    fireEvent.change(input, { target: { value: 'new text' } })
    
    expect(mockHandleInputChange).toHaveBeenCalledTimes(1)
  })

  it('calls validateStyle with correct class names', () => {
    render(<SearchInput {...defaultProps} />)
    
    expect(mockValidateStyle).toHaveBeenCalledWith('searchWrapper')
    expect(mockValidateStyle).toHaveBeenCalledWith('searchInput')
  })

  it('applies validated styles to wrapper and input', () => {
    const { container } = render(<SearchInput {...defaultProps} />)
    
    const wrapper = container.querySelector('.mock-searchWrapper')
    const input = container.querySelector('.mock-searchInput')
    
    expect(wrapper).toBeInTheDocument()
    expect(input).toBeInTheDocument()
  })

  it('sets ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    const props = { ...defaultProps, inputRef: ref as React.RefObject<HTMLInputElement> }
    
    render(<SearchInput {...props} />)
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current?.value).toBe('')
  })

  it('works with custom placeholder', () => {
    render(<SearchInput {...defaultProps} placeholder="Type to search..." />)
    
    const input = screen.getByPlaceholderText('Type to search...')
    expect(input).toBeInTheDocument()
  })

  it('updates when query prop changes', () => {
    const { rerender } = render(<SearchInput {...defaultProps} query="" />)
    expect(screen.getByDisplayValue('')).toBeInTheDocument()
    
    rerender(<SearchInput {...defaultProps} query="updated" />)
    expect(screen.getByDisplayValue('updated')).toBeInTheDocument()
  })

  it('has correct input type', () => {
    render(<SearchInput {...defaultProps} />)
    const input = screen.getByPlaceholderText('Search...')
    
    expect(input).toHaveAttribute('type', 'text')
  })
})