// Format number to Indian Rupees
export const formatINR = (num) => {
  return '₹' + new Intl.NumberFormat('en-IN', { 
    maximumFractionDigits: 0 
  }).format(Number(num || 0));
};

// Format Indian phone number
export const formatPhoneIN = (digits) => {
  const cleaned = String(digits).replace(/\D/g, '');
  return '+91-' + cleaned.slice(-10);
};

// Format date to Indian locale
export const formatDate = (iso) => {
  return new Date(iso).toLocaleDateString('en-IN');
};

// Validate Indian mobile number (10 digits starting with 6-9)
export const isValidIndianPhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
