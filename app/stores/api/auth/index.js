import debug from 'debug'
const log = debug('auth.js')
export async function validateLogin(creds) {
  // Temp for testing
  if (true) { // eslint-disable-line
    if ((creds.email === 'admin' && creds.password === 'password')
        || (creds.email === 'user' && creds.password === 'password')) {
      return Promise.resolve({ guid: '1234-1234-1234-1234' })
    }
  }
  return Promise.reject({
    error: {},
    type: 'Login fallo',
    message: 'Login fallo. usuario o password incorrecto',
  })
}

export async function validateToken(token) {
  if (!token) {
    return Promise.reject()
  }
  try {
    const response = await fetch('/api/token.json')

    if (response.status !== 200) {
      return Promise.reject({
        error: {
          code: response.status,
          response,
        },
        type: 'Not authenticated',
        message: 'Por favor login para usar la aplicacion',
      })
    }

    return await response.json()
  } catch (error) {
    log('validateToken catch error', error)
    return Promise.reject({
      error,
      type: 'Login fallo',
      message: 'Tu login fallo. Por favor trata de nuevo',
    })
  }
}
