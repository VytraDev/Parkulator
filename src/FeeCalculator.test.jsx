import { test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FeeCalculator from './FeeCalculator.jsx'

test('shows RM 5 for 09:00 to 10:20', () => {
    render(<FeeCalculator />)
    fireEvent.change(screen.getByLabelText('Entry time'), { target: { value: '09:00' } })
    fireEvent.change(screen.getByLabelText('Exit time'), { target: { value: '10:20' } })
    fireEvent.click(screen.getByText('Calculate fee'))
    expect(screen.getByText('RM 5.00')).toBeTruthy()
})

test('rejects an exit time before the entry time', () => {
    render(<FeeCalculator />)
    fireEvent.change(screen.getByLabelText('Entry time'), { target: { value: '10:00' } })
    fireEvent.change(screen.getByLabelText('Exit time'), { target: { value: '09:00' } })
    fireEvent.click(screen.getByText('Calculate fee'))
    expect(screen.getByText('Exit time must be after entry time')).toBeTruthy()
})
