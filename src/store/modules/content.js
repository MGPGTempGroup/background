const content = {
  namespaced: true,
  state: {
    landlordSupport: {
      editorContent: `Test Content`
    },
    prospectiveTenants: {
      editorContent: 'Test Content'
    },
    historicalContent: {
      dialogVisible: false,
      currentServiceId: null,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  mutations: {
    updateLandlordSupportEditorContent(state, payload) {
      state.landlordSupport.editorContent = payload.content
    },
    updateProspectiveTenantsEditorContent(state, payload) {
      state.prospectiveTenants.editorContent = payload.content
    },
    updateHistoricalContent(state, payload) {
      console.log('payload', payload)
      state.historicalContent = Object.assign(state.historicalContent, payload)
    }
  }
}

export default content
