type ErrorHandlerMap = {
  [statusCode: number]: (message: string) => void
}

const errorHandlerMap: ErrorHandlerMap = {
  401: (message: string) => {
    console.error(message)
    console.error('No autorizado, redireccionando al login...')
  },
  403: (message: string) => {
    console.error(message)
    console.error('Prohibido, no tienes acceso a este recurso.')
  },
  500: (message: string) => {
    console.error(message)
    console.error('Error del servidor, intenta nuevamente más tarde.')
  },
}

export const handleAxiosError = (error: any) => {
  if (error.response) {
    const { status, statusText } = error.response
    const handleError = errorHandlerMap[status]

    if (handleError) {
      handleError(statusText)
    } else {
      console.error(`Error desconocido: ${status} - ${statusText}`)
    }
  } else if (error.request) {
    console.error('No se recibió respuesta del servidor. Verifica tu conexión.')
  } else {
    console.error('Error al configurar la solicitud:', error.message)
  }

  return Promise.reject(error)
}
