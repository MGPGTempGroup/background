const content = {
  namespaced: true,
  state: {
    landlordSupport: {
      editorContent: `Test Content`
    },
    prospectiveTenants: {
      editorContent: 'Test Content'
    },
    areasWeService: {
      editorContent: 'Test Content',
      list: (new Array(10)).fill(undefined).map((item, index) => ({
        id: index + 1,
        name: 'Melbourne',
        img_url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540539885793&di=85d83195fd5f853758b6afa3b9003a62&imgtype=0&src=http%3A%2F%2Fp.chanyouji.cn%2F34598%2F1367065344612p17p5mpmc3vcabc111ia39ngu20.jpg'
      })),
      editorDialogVisible: false,
      areaIdInCurrEditing: 1, // 当前编辑的服务地区id
      // 存贮的已获取的服务地区数据
      detailsData: [
        {
          id: 1,
          content: `1`
        },
        {
          id: 2,
          content: `2`
        }
      ]
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
    // 更新业主服务编辑器内容
    updateLandlordSupportEditorContent(state, payload) {
      state.landlordSupport.editorContent = payload.content
    },
    // 更新潜在租户编辑器内容
    updateProspectiveTenantsEditorContent(state, payload) {
      state.prospectiveTenants.editorContent = payload.content
    },
    // 更新地区详情编辑对话框显示状态
    updateAreaDetailsEditorDialogVisible(state, payload) {
      state.areasWeService.editorDialogVisible = payload.visible
    },
    // 更新当前编辑的服务地区id
    updateAreaIdInCurrEditing(state, payload) {
      state.areasWeService.areaIdInCurrEditing = payload.id
    },
    // 更新历史内容数据
    updateHistoricalContent(state, payload) {
      state.historicalContent = Object.assign(state.historicalContent, payload)
    }
  },
  getters: {
    contentInCurrEditing: state => {
      const obj = state.areasWeService
      return obj.detailsData.find(item => item.id === obj.areaIdInCurrEditing).content
    }
  }
}

export default content
