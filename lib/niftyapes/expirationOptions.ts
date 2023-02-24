import { ToRelativeUnit } from 'luxon'

export enum Expiration {
  OneHour,
  TwelveHours,
  OneDay,
  ThreeDays,
  OneWeek,
  OneMonth,
  ThreeMonths,
  None,
}

export type ExpirationOption = {
  value: Expiration
  label: string
  relativeTime: number | null
  relativeTimeUnit: ToRelativeUnit | null
}

const expirationOptions: ExpirationOption[] = [
  {
    label: '1 Hour',
    value: Expiration.OneHour,
    relativeTime: 1,
    relativeTimeUnit: 'hours',
  },
  {
    label: '12 Hours',
    value: Expiration.TwelveHours,
    relativeTime: 12,
    relativeTimeUnit: 'hours',
  },
  {
    label: '1 Day',
    value: Expiration.OneDay,
    relativeTime: 1,
    relativeTimeUnit: 'days',
  },
  {
    label: '3 Days',
    value: Expiration.ThreeDays,
    relativeTime: 3,
    relativeTimeUnit: 'days',
  },
  {
    label: '1 Week',
    value: Expiration.OneWeek,
    relativeTime: 1,
    relativeTimeUnit: 'weeks',
  },
  {
    label: '1 Month',
    value: Expiration.OneMonth,
    relativeTime: 1,
    relativeTimeUnit: 'months',
  },
  {
    label: '3 Months',
    value: Expiration.ThreeMonths,
    relativeTime: 3,
    relativeTimeUnit: 'months',
  },
  {
    label: 'None',
    value: Expiration.None,
    relativeTime: 100,
    relativeTimeUnit: 'years',
  },
]

export default expirationOptions
