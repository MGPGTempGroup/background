const company = {
  namespaced: true,
  state: {
    members: [
      {
        id: 1,
        name: 'xxx',
        phone: '***********',
        email: 'xxxx@gmail.com',
        job: ['Office Manager'],
        branch: 'Corporate',
        photo: 'http://lorempixel.com/640/480',
        description: `Ann Rogers has a talent for management. As right hand woman to MRE founder and director, Peter Hooymans, she serves as a linchpin of the company. A founding member of the agency, she is incredibly proud to have helped realise the vision of creating an award winning boutique real estate agency.
        Her extensive experience and industry knowledge makes Ann truly indispensable and central to the smooth running of the business. Her natural inclination is to provide support and she is always ready to drop everything and assist where required.
        Ann’s pivotal role in the company is undeniable, as her professionalism, tireless work ethic and outstanding time management skills continue to provide a benchmark for incoming staff. Her positivity and energy encapsulate the MRE cultural mind-set, with its emphasis on excellence and team work.
        A commitment to fitness and wellbeing is obvious as Ann fairly radiates good health. She knows that a successful career can only be realised when priorities are in order and everything in life is balanced, a feat she has successfully achieved.`,
        testimonials: [
          { id: 1, content: '123' }
        ],
        personal_homepage: {
          google_plus: 'http://www.google.com',
          linkin: 'http://www.linkin.com'
        },
        created_at: '3 days ago',
        updated_at: '3 days ago'
      }
    ],
    createMembersDialogVisible: false
  },
  mutations: {
    toggleCreateMembersDialogVisible(state, payload) {
      state.createMembersDialogVisible = payload.visible
    }
  }
}

export default company
