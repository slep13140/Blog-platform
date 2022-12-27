export default async function DoNewRequest(url, obj) {
  const response = await fetch(url, obj)
  const result = await response.json()
  return result
}
