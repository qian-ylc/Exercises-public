import { format, formatDistance, formatRelative, subDays } from 'date-fns'

console.log(format(new Date(), "'Today is a' eeee")) // Today is a Wednesday
console.log(formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true }))
// => "3 days ago"

console.log(formatRelative(subDays(new Date(), 3), new Date()))
// => last Sunday at 4:42 PM