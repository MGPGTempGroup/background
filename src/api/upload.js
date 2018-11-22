import request from '@/utils/request'

export function uploadImage(images) {
  const formData = new FormData()
  formData.append('images', images)
  return request({
    method: 'POST',
    url: 'images',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
