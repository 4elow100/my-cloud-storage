export const validateUsername = username => {
  if (!username) {
    return { valid: false, message: 'Логин обязателен' }
  }

  if (username.length < 4 || username.length > 20) {
    return {
      valid: false,
      message: 'Логин должен быть длиной от 4 до 20 символов',
    }
  }

  if (!/^[A-Za-z]/.test(username)) {
    return {
      valid: false,
      message: 'Логин должен начинаться с латинской буквы',
    }
  }

  if (!/^[A-Za-z0-9]+$/.test(username)) {
    return {
      valid: false,
      message: 'Логин может содержать только латинские буквы и цифры',
    }
  }

  return { valid: true }
}

export const validatePassword = password => {
  if (!password) {
    return { valid: false, message: 'Пароль обязателен' }
  }

  if (password.length < 6) {
    return {
      valid: false,
      message: 'Пароль должен быть не менее 6 символов',
    }
  }

  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: 'Пароль должен содержать хотя бы одну заглавную букву',
    }
  }

  if (!/\d/.test(password)) {
    return {
      valid: false,
      message: 'Пароль должен содержать хотя бы одну цифру',
    }
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return {
      valid: false,
      message: 'Пароль должен содержать хотя бы один специальный символ',
    }
  }

  return { valid: true }
}

export const validateEmail = email => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email) {
    return { valid: false, message: 'Email обязателен' }
  }

  if (!regex.test(email)) {
    return {
      valid: false,
      message: 'Некорректный формат email',
    }
  }

  return { valid: true }
}
