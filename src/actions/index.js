// helper to hanlde server error
export const throwServerError = error => {
  throw new Error(error.response
    ? error.response.statusText
    : error
  )
}

export * from './operations'
