export default [

  {
    title: 'Продукты',
    to: { name: 'root' },
    icon: { icon: 'tabler-cheese' },
    action: "index",
    subject: 'ProductController'
  },

  {
    title: 'Заказы',
    to: { name: 'orders' },
    icon: { icon: 'tabler-reorder' },
    action: "allOrders",
    subject: 'ProfileController'
  },
  {
    title: 'Категории',
    to: { name: 'categories' },
    icon: { icon: 'tabler-category-2' },
    action: "index",
    subject: 'CategoryController'

  },

  {
    title: 'Филиал',
    to: { name: 'branches' },
    icon: { icon: 'tabler-git-branch' },
    action: "index",
    subject: 'BranchController'
  },
  {
    title: 'Пользователи',
    to: { name: 'users' },
    icon: { icon: 'tabler-users' },
    action: "index",
    subject: 'UserController'
  },
  {
    title: 'Баннеры',
    to: { name: 'banners' },
    icon: { icon: 'tabler-rectangle ' },
    action: "index",
    subject: 'BlogController'
  },
  {
    title: 'Топ',
    to: { name: 'topics' },
    icon: { icon: 'tabler-square-chevrons-up' },
    action: "index",
    subject: 'TopController'
  },
  {
    title: 'Роли',
    to: { name: 'roles' },
    icon: { icon: 'tabler-file-settings' },
    action: 'read',
    subject: 'all',
  },
  {
    title: 'Топ продукты',
    to: { name: 'top-products' },
    icon: { icon: 'tabler-square-chevrons-up' },
    action: "index",
    subject: 'TopProductController'

  }
  // {
  //   title: 'Top banners',
  //   to: { name: 'top-banners' },
  //   icon: { icon: 'tabler-square-rounded-arrow-up' },
  //   action: "index",
  //   subject: 'TopBlogController'



  // },

]
