import request from '@/utils/request'

export function uploadImage(image) {
  const formData = new FormData()
  formData.append('images', image)
  return request({
    method: 'POST',
    url: 'images',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
