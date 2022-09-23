const formatNumber = (number)=> number.toString().padStart(3, '0')

const formatName = (name)=> name.charAt(0).toUpperCase() + name.slice(1)

export { formatNumber, formatName }