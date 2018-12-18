export default {
  route: {
    dashboard: 'Dashboard',
    introduction: 'Introduction',
    documentation: 'Documentation',
    guide: 'Guide',
    permission: 'Permission',
    pagePermission: 'Page Permission',
    directivePermission: 'Directive Permission',
    icons: 'Icons',
    components: 'Components',
    componentIndex: 'Introduction',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    dndList: 'Dnd List',
    splitPane: 'SplitPane',
    avatarUpload: 'Avatar Upload',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: 'Mixin',
    backToTop: 'BackToTop',
    dragDialog: 'Drag Dialog',
    dragKanban: 'Drag Kanban',
    charts: 'Charts',
    keyboardChart: 'Keyboard Chart',
    lineChart: 'Line Chart',
    mixChart: 'Mix Chart',
    example: 'Example',
    nested: 'Nested Routes',
    menu1: 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    menu2: 'Menu 2',
    Table: 'Table',
    dynamicTable: 'Dynamic Table',
    dragTable: 'Drag Table',
    inlineEditTable: 'Inline Edit',
    complexTable: 'Complex Table',
    treeTable: 'Tree Table',
    customTreeTable: 'Custom TreeTable',
    tab: 'Tab',
    form: 'Form',
    createArticle: 'Create Article',
    editArticle: 'Edit Article',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    exportZip: 'Export Zip',
    theme: 'Theme',
    clipboardDemo: 'Clipboard',
    i18n: 'I18n',
    externalLink: 'External Link',

    // extend
    propertyOwner: 'Property owner',
    content: 'Content',
    serviceAndContent: 'Service & Content',
    service: 'Service',
    contentManagement: 'Content Management',
    housing: 'Housing',
    companyInfo: 'Company info',
    rentalHousing: 'Rental housing',
    lease: 'Lease',
    rental: 'Rental',
    sale: 'Sale',
    customer: 'Customer',
    userComment: 'User comment',
    landlordSupport: 'Landlord support',
    prospectiveTenants: 'Prospective tenants',
    currentTenants: 'Current tenants',
    areasWeServe: 'Areas we serve',
    projectMarketing: 'Project marketing',
    projectLeasing: 'Project leasing',
    pastSuccess: 'Past success',
    commercial: 'Commercial',
    sell: 'Sell',
    headquarters: 'Headquarters',
    industryUpdates: 'Industry updates',
    careers: 'Careers',
    articleList: 'Article list',
    saleHouse: 'Sale house',
    members: 'Members',
    information: 'Information',
    projects: 'Projects'
  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Dashboard',
    github: 'Github',
    screenfull: 'Screenfull',
    theme: 'Theme',
    size: 'Global Size'
  },
  login: {
    title: 'MGPG backstage login',
    logIn: 'Log in',
    email: 'Email',
    username: 'Username',
    password: 'Password',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    roles: 'Your roles',
    switchRoles: 'Switch roles'
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose Tinymce. See documentation for more detailed rich text editor comparisons and introductions.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.',
    // extend
    newUniqueVisits: 'New Unique Visits',
    newPageVisits: 'New Page Visits',
    messages: 'Messages',
    turnover: 'Turnover'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',
    name: 'Name',
    surname: 'Surname',
    phone: 'Phone',
    email: 'Email',
    source: 'source',
    identity: 'identity',
    comments: 'comments',
    lastComments: 'Last comments',
    todoList: 'Todo List',
    unfinished: 'Unfinished',
    all: 'All',
    active: 'Active',
    completed: 'Completed'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name(default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name(default file)'
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  house: {
    houseManagement: 'Houses management',
    id: 'ID',
    edit: 'Edit',
    details: 'Details',
    actions: 'Actions',
    rentalHousingList: 'Rental housing list',
    houseList: 'List of houses',
    name: 'Name',
    briefIntroduction: 'Brief introduction',
    suburbName: 'Suburb Name',
    streetName: 'Street Name',
    streetCode: 'Street Code',
    postCode: 'Post Code',
    houseNumber: 'House Number',
    mapCoordinates: 'Map coordinates',
    addressDescription: 'Address description',
    beds: 'Beds',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    carSpaces: 'Car spaces',
    lockupGarages: 'Lockup garages',
    showers: 'Showers',
    propertyTypes: 'Property Types',
    suburb: 'Suburb',
    rent: 'Rent',
    dailyRent: 'Daily rent',
    weeklyRent: 'Weekly rent',
    monthlyRent: 'Monthly rent',
    agent: 'Agent',
    availableDate: 'Available Date',
    availableStartDate: 'Available start date',
    availableEndDate: 'Available end date',
    createdAt: 'Created At',
    updatedAt: 'Updated At',
    owner: 'Owner',
    detailsOfRentalHousing: 'Details of rental house',
    detailsOfSaleHousing: 'Details of sales',
    floorSpace: 'Floor space',
    basicInformation: 'Basic information',
    introduction: 'Introduction',
    housingBasicInformation: 'Housing basic information',
    pictureAndVideo: 'Picture & Video',
    introToHousingPicturesAndVideos: 'Introduction to housing pictures and videos',
    housingIntroduction: 'House introduction',
    rentalRecords: 'Rental records',
    aState: 'State',
    upcomingInspection: 'Upcoming inspection',
    upcomingInspectionDatetime: 'Upcoming inspection datetime',
    inspectionDatetime: 'Inspection datetime',
    dataCreator: 'Date creator',
    currState: 'Current state',
    reserved: 'Reserved',
    hAlready: 'Already',
    house: 'House',
    studio: 'Studio',
    unit: 'Unit',
    apartment: 'Apartment',
    townHouse: 'Townhouse',
    terrace: 'Terrace',
    villa: 'Villa',
    semi: 'Semi',
    duplex: 'Duplex',
    penthouse: 'Penthouse',
    constructedIn: 'Constructed in',
    builtIn: 'Built in',
    dateOfConstruction: 'Date of construction',
    preciseCoordinates: 'Precise coordinates',
    coordinateHints: '(For Google map display)',
    conditionalFiltering: 'Conditional filtering',
    query: 'Query',
    startDate: 'Start date',
    endDate: 'End date',
    regionSelection: 'Region selection',
    regionSelectionPlaceholder: 'Please select one or more regions',
    minimumRent: 'minimum rent',
    maximumRent: 'maximum rent',
    relatedAttributes: 'Related attributes',
    reset: 'Reset',
    active: 'Active',
    already: 'Already',
    address: 'Address',
    update: 'Update',
    price: 'Price',
    infomationStatement: 'Statement of information（pdf）',
    uploadImgTip: 'Click here to upload pictures.',
    stateSelectionPlaceholder: 'Please select the current state',
    createRentalHousingData: 'Create rental house data',
    editRentalHousingData: 'Edit rental house data',
    createSaleHousingData: 'Create sale house data',
    editSaleHousingData: 'Edit Sales data',
    housingPicture: 'Housing picture',
    housingPictureUpload: 'House Pictures (Drag Pictures to Change Display Order)',
    isNewDevelopment: 'Is it the latest property development?',
    notFillSomeFieldTips: 'If you do not fill in some fields, the front desk will not show them.',
    videoEmbeddedCode: 'Video embedded code',
    inspections: 'Inspections',
    saleOut: 'Sale out',
    preferredInspectionDatetime: 'Preferred inspection datetime',
    preferredMoveInDate: 'Preferred move in date',
    followUpState: 'Follow up state',
    comment: 'Commnet',
    belongTo: 'Belong to'
  },
  addressList: {
    australia: 'Australia',
    melbourne: 'Aelbourne',
    vic: 'Vic',
    mooneePonds: 'Moonee Ponds',
    margaretStreet: 'Margaret Street'
  },
  owner: {
    id: 'ID',
    name: 'Name',
    surname: 'Surname',
    phoneNumber: 'Phone',
    photoThumbnail: 'Photo thumbnail',
    email: 'Email',
    idCardNum: 'ID Card',
    wechat: 'Wechat',
    propertyOwnersList: 'Property Owners List',
    identity: 'Identity',
    landlord: 'Landlord',
    vendor: 'Vendor',
    other: 'Other',
    tenant: 'Tenant',
    purchaser: 'Purchasers',
    isSignContract: 'Sign Contract',
    address: 'Address',
    notSigned: 'Not signed',
    alreadySigned: 'Already signed',
    followUpState: 'Follow up state',
    followUpTime: 'Follow up time',
    intentionalCustomers: 'Intentional customers',
    noIntention: 'No intention',
    iSuccess: 'Success',
    actions: 'Action',
    details: 'Details',
    edit: 'Edit',
    agent: 'Agent',
    conditionalFiltering: 'Conditional filtering',
    phone: 'Phone',
    startDate: 'Start date',
    endDate: 'End date',
    createdDate: 'Created date',
    updatedDate: 'Updated date',
    reset: 'Reset',
    query: 'Query',
    create: 'Create',
    // placeholder
    searchBySurnamePlaceholder: 'Input surname fragment',
    searchByNamePlaceholder: 'Input name fragment',
    searchByPhonePlaceholder: 'Input phone fragment',
    searchByEmailPlaceholder: 'Input email fragment',
    searchByIdCardNumPlaceholder: 'Input ID Card number fragment',
    searchByWeChatPlaceholder: 'Input wechat number fragment',
    searchByAddressPlaceholder: 'Input address number fragment',
    selectByIdentityPlaceholder: 'Select customer identity',
    searchByAgentNamePlaceholder: 'Input agent name fragment',

    // input validation messages
    illegalEmailAddress: 'Illegal email address.',
    illegalWechat: 'Illegal wechat number.',
    requiredWechat: 'When the phone number and Email are not input, the Wechat field is required.',
    requiredPhone: 'When the Wechat and Email are not input, the Phone field is required.',
    requiredEmail: 'When the phone number and WeChat are not input, the Email field is required.',
    requiredSurname: 'When the name is not input, the surname field is required.'
  },
  userComment: {
    id: 'ID',
    userCommentsList: 'User Comments List',
    surname: 'Surname',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    wechat: 'Wechat',
    identity: 'Identity',
    landlord: 'Landlord',
    vendor: 'Vendor',
    comments: 'Comments',
    comment: 'Comment',
    createdAt: 'Created At',
    conditionalFiltering: 'Conditional filtering',
    comeFrom: 'Come from',
    confirmDeleteTip: 'Are you sure you want to delete this message?',
    page: 'Page'
  },
  contentMGT: {
    historicalContent: 'Historical content',
    confirmUpdateTips: 'Are you sure you want to update the content? Landlord support page will use your latest changes.',
    editImage: 'Edit the data of the broadcast chart',
    editMainContent: 'Edit main content',
    editServiceAreas: 'Edit service areas',
    editServiceAreaDetails: 'Edit service area details',
    createServiceArea: 'Create service area',
    areaName: 'Area name',
    selectContacts: 'Select contacts',
    searchContacts: 'Search contacts',
    searchAgents: 'Search sgents'
  },
  industryUpdates: {
    articleList: 'Article list',
    contentFragment: 'Content fragment',
    publisher: 'Publisher',
    title: 'Title',
    createArticle: 'Create article',
    mainPicture: 'Main picture',
    content: 'Content',
    editArticle: 'Edit article',
    confirmDeleteTips: 'Are you sure you want to delete this article?'
  },
  company: {
    memberList: 'Member list',
    position: 'Position',
    branch: 'Branch',
    description: 'Description',
    googlePlusHomePage: 'Google+ homepage',
    linkinHomePage: 'Linkin homepage',
    youtubeHomePaeg: 'Youtube homepage',
    facebookHomePage: 'Facebook homepage',
    twitterHomePage: 'Twitter homepage',
    instagram: 'Instagram homepage',
    createMembersData: 'Create members data',
    editMembersData: 'Edit members data',
    department: 'Department',
    confirmDeleteMemberTips: 'Are you sure you want to delete the member data?',
    conditionalFiltering: 'Conditional filtering',
    companyInformationEditor: 'Company information editor',
    socialNetworkingSiteHomepage: 'Social networking site Homepage',
    socialNetworkingSiteHomepageFormTips: 'If you do not fill in the input box, the front desk will not be displayed.',
    companyContactInfo: 'Company contact information',
    detailedAddress: 'Detailed Address',
    introduction: 'Introduction'
  },
  project: {
    list: 'List of projects',
    name: 'Project name',
    location: 'Location',
    address: 'Address',
    introduction: 'Introduction',
    description: 'Description',
    yearBuilt: 'Year built',
    minPrice: 'Min price',
    maxPrice: 'Max price',
    price: 'Price',
    isNewDevelopment: 'New development',
    isPastSuccess: 'Past success',
    agents: 'Agents',
    productType: 'Product Type',
    creator: 'Creator',
    createProject: 'Create project data',
    editProject: 'Edit project data',
    owner: 'Owner',
    pictures: 'Pictures',
    status: 'Status',
    details: 'Project details',
    basicInformation: 'Basic information',
    conditionalFiltering: 'Conditional filtering'
  },
  projectStatus: {
    soldOut: 'Sold out'
  },
  all: 'ALL',
  id: 'ID',
  submit: 'Submit',
  reset: 'Reset',
  create: 'Create',
  update: 'Update',
  query: 'Query',
  allow: 'Allow',
  close: 'Close',
  edit: 'Edit',
  delete: 'Delete',
  createdAt: 'Created At',
  updatedAt: 'Updated At',
  tips: 'Tips',
  confirm: 'Confirm',
  cancel: 'Cancel',
  details: 'Details',
  apply: 'Apply',
  preview: 'Preview',
  add: 'Add',
  actions: 'Actions',
  publish: 'Publish',
  phone: 'Phone',
  surname: 'Surname',
  photo: 'Photo',
  email: 'Email',
  name: 'Name',
  uploadPhoto: 'Upload photo',
  telephone: 'Telephone',
  facsimile: 'Facsimile',
  address: 'Address',
  openingHours: 'Opening hours',
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
  postCode: 'Post code',
  createSuccess: 'Create Success.',
  updateSuccess: 'Update Success.',
  deleteSuccess: 'Delete Success.',
  createFailed: 'Create failed.',
  deleteFailed: 'Deleteall failed.',
  updateFailed: 'Update failed.',
  uploadFailed: 'Upload failed.',
  searchFailed: 'Search failed.',
  pullingDataFailed: 'Pulling data failed.',
  noData: 'No data',
  deleteDataTips: 'Are you sure you want to delete this data?',
  landlords: 'Landlords',
  prospectiveTenants: 'Prospective Tenants',
  currentTenants: 'Current Tenants',
  projectMarketing: 'Project Marketing',
  projectLeasing: 'Project Leasing',
  commercial: 'Commercial',
  sell: 'Sell',
  careers: 'Careers',
  areasWeServe: 'Area We Serve',
  headquarters: 'Headquarters',
  // 身份相关
  landlord: 'Landlord',
  vendor: 'Vendor',
  imgCropper: 'Image cropper',
  show: 'Show',
  hide: 'Hide',
  whetherToDisplay: 'Whether to display',
  displayState: 'Display state',
  creator: 'Creator',
  nothing: 'Nothing',
  yes: 'Yes',
  no: 'No',
  startDate: 'Start date',
  endDate: 'End date',
  selectFile: 'Select file',
  currentFile: 'Current file',
  to: 'To',
  mobile: 'Mobile',
  getDataError: 'Failed to get data',
  selectPage: 'Select page'
}
