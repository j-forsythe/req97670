export const updatePosition = (positionData = {}) => {
  fetch(`/api/positions/${positionData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(positionData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
