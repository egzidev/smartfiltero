import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchInput from './SearchInput'
import type { SearchInputProps } from './SearchInput.types'

const mockHandleInputFocus = vi.fn()
const mockHandleInputChange = vi.fn()

const defaultProps: SearchInputProps = {
  inputRef: { current: null as unknown as HTMLInputElement },
  query: '',
  handleInputFocus: mockHandleInputFocus,
  handleInputChange: mockHandleInputChange,
  placeholder: 'Search...',
}

const renderSearchInput = (props: Partial<SearchInputProps> = {}) => {
  return render(<SearchInput {...defaultProps} {...props} />)
}

describe('Input Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders input with correct placeholder', () => {
    renderSearchInput()
    const input = screen.getByPlaceholderText('Search...')
    expect(input).toBeInTheDocument()
  })

  it('displays the query value', () => {
    renderSearchInput({ query: 'test query' })
    const input = screen.getByDisplayValue('test query')
    expect(input).toBeInTheDocument()
  })

  it('calls handleInputFocus when input is focused', () => {
    renderSearchInput()
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

  it('applies styleTheme with tailwind classes correctly', () => {
    const { container } = renderSearchInput({
        styleTheme: {
          'searchInputWrapper': 'd-flex justify-content-center align-items-center'
        }
    })

    expect(container.innerHTML).toContain('d-flex justify-content-center align-items-center')
  })

  it('applies styleTheme with custom classes correctly', () => {
    const props = {
      styleTheme: {
        'searchInputWrapper': 'custom-class'
      }
    }
    const { container } = renderSearchInput(props)
    expect(container.innerHTML).toContain('custom-class')
  })

  it('sets ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    renderSearchInput({ inputRef: ref as React.RefObject<HTMLInputElement> })
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current?.value).toBe('')
  })

  it('works with custom placeholder', () => {
    renderSearchInput({ placeholder: 'Type to search...' })
    
    const input = screen.getByPlaceholderText('Type to search...')
    expect(input).toBeInTheDocument()
  })

  it('updates when query prop changes', () => {
    const { rerender } = renderSearchInput({ query: '' })
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