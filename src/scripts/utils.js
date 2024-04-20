export function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Произошла ошибка: ${res.status}`)
}