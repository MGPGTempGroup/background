const temp = []
for (let i = 0; i <= 20; i++) {
  temp.push({
    id: i + 1,
    name: 'Jerry Smith',
    surname: 'Smith',
    email: '********@gmail.com',
    phone: '173****4331',
    wechat: 'xxxxx',
    identity: ['landlord'],
    comments: 'Excellent service, prompt attention to inquiries or concerns. I am very happy to be the client and would recommend to friends and family.',
    createdAt: '3 days ago',
    updatedAt: '3 days ago'
  })
}

const comment = {
  namespaced: true,
  state: {
    comments: temp,
    // 可用身份
    availableIdentity: [
      { value: 'landlord' },
      { value: 'vendor' }
    ]
  }
}

export default comment
