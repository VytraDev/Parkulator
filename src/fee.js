export function parkingFee(minutes) {
  if (minutes <= 15) return 0

  const extraHours = Math.ceil((minutes - 60) / 60)
  const total = 3 + Math.max(0, extraHours) * 2
  return Math.min(15, total)
}
