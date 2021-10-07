const now = new Date().getUTCFullYear()
export const years = Array(now - (now - 150)).fill('').map((v, idx) => now - idx)

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const businessModels =  [
  'Business-to-consumer (B2C)',
  'Business-to-business (B2B)',
  'Business-to-many (B2M)'
]


export const chartBackgroundColours = [
  'rgba(54, 162, 235, 0.2)', // blue
  'rgba(255, 159, 64, 0.2)', //orange
  'rgba(75, 192, 192, 0.2)', // green
  'rgba(255, 99, 132, 0.2)', // red
  'rgba(255, 206, 86, 0.2)', // yello
  'rgba(153, 102, 255, 0.2)', // purple
]

export const intensityColours = [
  'rgba(255, 206, 86, 0.2)',
  'rgba(255, 206, 86, 1)'
]

export const chartBorderColours = [
  'rgba(54, 162, 235, 1)', // blue
  'rgba(255, 159, 64, 1)', // orange
  'rgba(75, 192, 192, 1)', // green
  'rgba(255, 99, 132, 1)', // red
  'rgba(255, 206, 86, 1)', // yello
  'rgba(153, 102, 255, 1)', // purple
]


export const chartBackgroundColoursDict = {
  'Customers (Individuals)': 'rgba(54, 162, 235, 0.2)', // blue
  'Indirect Consumers': 'rgba(153, 102, 255, 0.2)', // purple
  'Employees': 'rgba(255, 159, 64, 0.2)', //orange

  'Customers (Businesses)': 'rgba(99, 255, 182, 0.2)', // red
  'Environment': 'rgba(75, 192, 192, 0.2)', // green
  'Communities / Society': 'rgba(255, 206, 86, 0.2)', // yello
}

export const chartBorderColoursDict = {
  'Customers (Individuals)': 'rgba(54, 162, 235, 1)', // blue
  'Indirect Consumers': 'rgba(153, 102, 255, 1)', // purple
  'Employees': 'rgba(255, 159, 64, 1)', // orange
}

const sdgOpacity = 0.75

export const sdgColours = {
  1: `rgb(229, 36, 59, ${sdgOpacity})`,
  2: `rgb(221, 166, 58, ${sdgOpacity})`,
  3: `rgb(76, 159, 56, ${sdgOpacity} )`,
  4: `rgb(197, 25, 45, ${sdgOpacity})`,
  5: `rgb(255, 58, 33, ${sdgOpacity})`,
  6: `rgb(38, 189, 226, ${sdgOpacity})`,
  7: `rgb(252, 195, 11, ${sdgOpacity})`,
  8: `rgb(162, 25, 66, ${sdgOpacity})`,
  9: `rgb(253, 105, 37, ${sdgOpacity})`,
  10: `rgb(221, 19, 103, ${sdgOpacity})`,
  11: `rgb(253, 157, 36, ${sdgOpacity})`,
  12: `rgb(191, 139, 46, ${sdgOpacity})`,
  13: `rgb(63, 126, 68, ${sdgOpacity})`,
  14: `rgb(10, 151, 217, ${sdgOpacity})`,
  15: `rgb(86, 192, 43, ${sdgOpacity})`,
  16: `rgb(0, 104, 157, ${sdgOpacity})`,
  17: `rgb(25, 72, 106, ${sdgOpacity})`,
}


export function toCurrency(value) {
  if (typeof value !== "number") {
      return value
  }
  var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
  })
  return formatter.format(value)
}

export function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
