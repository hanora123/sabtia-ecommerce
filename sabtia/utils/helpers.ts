export const formatCurrency = (amount: number, currency = "EGP", locale = "en-US"): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Format Arabic currency
export const formatArabicCurrency = (amount: number): string => {
  return `${amount.toLocaleString("ar-EG")} ج.م`
}

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + "..."
}

// Generate slug from text
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
}

// Generate Arabic slug
export const generateArabicSlug = (text: string): string => {
  return text
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\u0600-\u06FF\w-]/g, "") // Keep only Arabic characters, numbers, and hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
}

// Validate Egyptian phone number
export const validateEgyptianPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+20|0)?1[0125]\d{8}$/
  return phoneRegex.test(phone.replace(/\s/g, ""))
}

// Format Egyptian phone number
export const formatEgyptianPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "")

  if (cleaned.startsWith("20")) {
    return `+${cleaned.substring(0, 2)} ${cleaned.substring(2, 4)} ${cleaned.substring(4, 8)} ${cleaned.substring(8)}`
  } else if (cleaned.startsWith("01")) {
    return `${cleaned.substring(0, 4)} ${cleaned.substring(4, 7)} ${cleaned.substring(7)}`
  }

  return phone
}

// Calculate discount percentage
export const calculateDiscount = (originalPrice: number, salePrice: number): number => {
  if (originalPrice <= salePrice) return 0
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

// Generate random ID
export const generateId = (length = 8): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Deep clone object
export const deepClone = <T>(obj: T): T => {\
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T
  if (typeof obj === 'object') {\
    const clonedObj = {} as { [key: string]: any }
    for (const key in obj) {\
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj as T
  }
  return obj
}

// Format file size
export const formatFileSize = (bytes: number): string => {\
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Validate email
export const validateEmail = (email: string): boolean => {\
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Generate color from string (for avatars, etc.)
export const stringToColor = (str: string): string => {\
  let hash = 0\
  for (let i = 0; i < str.length; i++) {\
    hash = str.charCodeAt(i) + ((hash << 5) - hash)\
  }
  
  const hue = hash % 360
  return `hsl(${hue}, 70%, 50%)`
}

// Check if device is mobile
export const isMobile = (): boolean => {\
  if (typeof window === 'undefined') return false\
  return window.innerWidth < 768
}

// Get device type
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {\
  if (typeof window === 'undefined') return 'desktop'
  
  const width = window.innerWidth\
  if (width < 768) return 'mobile'\
  if (width < 1024) return 'tablet'
  return 'desktop'
}

// Format relative time
export const formatRelativeTime = (date: Date, locale: string = 'en'): string => {\
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  \
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  \
  if (diffInSeconds < 60) {\
    return rtf.format(-diffInSeconds, 'second')\
  } else if (diffInSeconds < 3600) {\
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute')\
  } else if (diffInSeconds < 86400) {\
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour')\
  } else if (diffInSeconds < 2592000) {\
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day')\
  } else if (diffInSeconds < 31536000) {\
    return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month')
  } else {\
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year')
  }
}

// Local storage helpers with error handling
export const storage = {\
  get: <T>(key: string, defaultValue?: T): T | null => {\
    try {\
      if (typeof window === 'undefined') return defaultValue || null
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue || null
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error)
      return defaultValue || null
    }
  },
  
  set: <T>(key: string, value: T): boolean => {
    try {
      if (typeof window === 'undefined') return false
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error)
      return false
    }
  },
  
  remove: (key: string): boolean => {
    try {
      if (typeof window === 'undefined') return false
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
      return false
    }
  },
  
  clear: (): boolean => {
    try {
      if (typeof window === 'undefined') return false
      localStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  }
}

// URL helpers
export const url = {
  addParams: (baseUrl: string, params: Record<string, string | number | boolean>): string => {
    const url = new URL(baseUrl, window.location.origin)
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value))
    })
    return url.toString()
  },
  
  removeParams: (baseUrl: string, paramsToRemove: string[]): string => {
    const url = new URL(baseUrl, window.location.origin)
    paramsToRemove.forEach(param => {
      url.searchParams.delete(param)
    })
    return url.toString()
  },
  
  getParam: (param: string): string | null => {
    if (typeof window === 'undefined') return null
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(param)
  }
}

// Array helpers
export const array = {
  unique: <T>(arr: T[]): T[] => [...new Set(arr)],
  
  groupBy: <T, K extends keyof T>(arr: T[], key: K): Record<string, T[]> => {
    return arr.reduce((groups, item) => {
      const group = String(item[key])
      groups[group] = groups[group] || []
      groups[group].push(item)
      return groups
    }, {} as Record<string, T[]>)
  },
  
  shuffle: <T>(arr: T[]): T[] => {
    const shuffled = [...arr]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  },
  
  chunk: <T>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = []
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size))
    }
    return chunks
  }
}
