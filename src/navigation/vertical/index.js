export default [

  {
    title: 'Продукты',
    to: { name: 'root' },
    icon: { icon: 'tabler-cheese' },
    action: "index",
    subject: 'ProductController'
  },
  {
    title: 'Kategoriyalar',
    to: { name: 'categories' },
    icon: { icon: 'tabler-category-2' },
    action: "index",
    subject: 'CategoryController'

  },

  {
    title: 'Filial',
    to: { name: 'branches' },
    icon: { icon: 'tabler-git-branch' },
    action: "index",
    subject: 'BranchController'
  },
  {
    title: 'Foydalanuvchilar',
    to: { name: 'users' },
    icon: { icon: 'tabler-users' },
    action: "index",
    subject: 'UserController'
  },
  {
    title: 'banner',
    to: { name: 'banners' },
    icon: { icon: 'tabler-rectangle ' },
    action: "index",
    subject: 'BlogController'
  },
  {
    title: 'Top',
    to: { name: 'topics' },
    icon: { icon: 'tabler-square-chevrons-up' },
    action: "index",
    subject: 'TopController'
  },
  {
    title: 'roles',
    to: { name: 'roles' },
    icon: { icon: 'tabler-file-settings' },
    action: 'read',
    subject: 'all',
  },
  {
    title: 'Top proucts',
    to: { name: 'top-products' },
    icon: { icon: 'tabler-square-chevrons-up' },
    action: "index",
    subject: 'TopProductController'

  },
  // {
  //   title: 'Top banners',
  //   to: { name: 'top-banners' },
  //   icon: { icon: 'tabler-square-rounded-arrow-up' },
  //   action: "index",
  //   subject: 'TopBlogController'



  // },
  {
    title: 'Orders',
    to: { name: 'orders' },
    icon: { icon: 'tabler-reorder' },
    action: "allOrders",
    subject: 'ProfileController'
  }
]
