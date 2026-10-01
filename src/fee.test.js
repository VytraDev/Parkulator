import { test, expect } from 'vitest'
import { parkingFee } from './fee.js'

test('the first 15 minutes are free', () => {
    expect(parkingFee(15)).toBe(0)
})

test('16 minutes costs RM 3', () => {
    expect(parkingFee(16)).toBe(3)
})

test('an hour costs RM 3', () => {
    expect(parkingFee(60)).toBe(3)
})

test('61 minutes costs RM 5', () => {
    expect(parkingFee(61)).toBe(5)
})

test('the daily fee stops at RM 15', () => {
    expect(parkingFee(600)).toBe(15)
})
