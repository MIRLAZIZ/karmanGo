<template>
  <div>


    <h2 class="mb-4">Разрешения</h2>


    <VRow class="">
      <VCol cols="12">
        <VCard class="pa-5">
          <VCheckbox label="Выбрать все" v-model="all" @click="permissionAll" />
        </VCard>

      </VCol>
      <VCol cols="12" md="6" v-for="menu in menus" :key="menu" class="">
        <VCard class="pa-5 h-100">
          <h3 class="mb-4">{{ menu.title }}</h3>
          <p v-for="item in data[menu.lable]" :key="item.id" class="permission">
            <VCheckbox :label="item.name" :value="item.permission" v-model="permissionsData.permissions" />
          </p>

        </VCard>



      </VCol>
      <VCol cols="12" class="d-flex justify-end ">
        <VBtn class="ml-3" @click="router.go(-1)">Отмена</VBtn>
        <VBtn type="submit" class="ml-3" @click="sendPermission" :disabled="!permissionsData.permissions.length">
          Сохранить
        </VBtn>
      </VCol>
    </VRow>


  </div>
</template>

<script setup>
import { useRolesStore } from '@/@core/stores/roles';
import { useConfigStore } from '@/@core/stores/config';
import { onMounted } from 'vue';
import { watch } from 'vue';


definePage({
  meta: {
    action: 'read',
    subject: 'all',
  }
})


const store = useRolesStore()
const storeConfig = useConfigStore()
const all = ref(false)
const arrayPermission = ref([])


onMounted(() => {
  permissionArray()
  store.fetchPermissonsOne(route)
    .then(() => {

      permissionsData.value.permissions.push(...store.permissions.result)
    })
})

const permissionsData = ref({
  permissions: [],
})
const route = useRoute().params.id
const router = useRouter()


const sendPermission = () => {
  store.createPermssions(route, permissionsData.value)
    .then(() => {
      router.push('/roles')
        .then(() => {
          storeConfig.successToast('Ruxsatlar saqlandi')
        })
    })
    .catch((err) => {
      storeConfig.errorToast(err.response._data.message)
    })
}

const permissionAll = () => {
  permissionsData.value.permissions = []
  if (!all.value) {
    permissionsData.value.permissions.push(...arrayPermission.value)

  }



}

const permissionArray = () => {
  Object.keys(data.value).forEach(key => {
    data.value[key].forEach(item => {
      arrayPermission.value.push(item.permission)

    })
  })

}
watch(() => permissionsData.value.permissions, (value) => {

  value.length == arrayPermission.value.length ? all.value = true : all.value = false

}, {
  deep: true
})

const menus = [
  {
    title: 'Категории',
    lable: 'category',
  },
  {
    title: 'Продукты',
    lable: 'products',
  },
  {
    title: 'Филиал',
    lable: 'branch',
  },
  {
    title: 'Пользователи',
    lable: 'users',
  },
  {
    title: 'Баннер',
    lable: 'banner',
  },
  {
    title: 'Топ',
    lable: 'top',
  },
  // {
  //   title: 'Роли',
  //   lable: 'roles',
  // },
  {
    title: 'Топ продукты',
    lable: 'topProducts',
  },
  // {
  //   title: 'Топ баннеры',
  //   lable: 'topBanners',
  // },
  {
    title: 'Заказы',
    lable: 'orders',
  }
]







const data = ref({
  category: [
    {
      id: 1,
      name: 'Список категорий',
      permission: {
        action: "index",
        subject: 'CategoryController'
      }
    },
    {
      id: 2,
      name: 'Добавить категорию',
      permission: {
        action: "store",
        subject: 'CategoryController'
      }
    },
    {
      id: 3,
      name: 'Удалить категорию',
      permission: {
        action: "destroy",
        subject: 'CategoryController'
      }
    },
    {
      id: 4,
      name: 'Редактировать категорию',
      permission: {
        action: "update",
        subject: 'CategoryController'
      }
    }
  ],
  products: [
    {
      id: 5,
      name: 'Список продуктов',
      permission: {
        action: "index",
        subject: 'ProductController'
      }
    },
    {
      id: 6,
      name: 'Добавить продукт',
      permission: {
        action: "store",
        subject: 'ProductController'
      }
    },
    {
      id: 7,
      name: 'Удалить продукт',
      permission: {
        action: "destroy",
        subject: 'ProductController'
      }
    },
    {
      id: 8,
      name: 'Редактировать продукт',
      permission: {
        action: "update",
        subject: 'ProductController'
      }
    }
  ],
  branch: [
    {
      id: 9,
      name: 'Список филиалов',
      permission: {
        action: "index",
        subject: 'BranchController'
      }
    },
    {
      id: 10,
      name: 'Добавить филиал',
      permission: {
        action: "store",
        subject: 'BranchController'
      }
    },
    {
      id: 11,
      name: 'Удалить филиал',
      permission: {
        action: "destroy",
        subject: 'BranchController'
      }
    },
    {
      id: 12,
      name: 'Редактировать филиал',
      permission: {
        action: "update",
        subject: 'BranchController'
      }
    }
  ],
  users: [
    {
      id: 13,
      name: 'Список пользователей',
      permission: {
        action: "index",
        subject: 'UserController'
      }
    },
    {
      id: 14,
      name: 'Добавить пользователя',
      permission: {
        action: "store",
        subject: 'UserController'
      }
    },
    {
      id: 15,
      name: 'Удалить пользователя',
      permission: {
        action: "destroy",
        subject: 'UserController'
      }
    },
    {
      id: 16,
      name: 'Редактировать пользователя',
      permission: {
        action: "update",
        subject: 'UserController'
      }
    }
  ],
  banner: [
    {
      id: 17,
      name: 'Список баннеров',
      permission: {
        action: "index",
        subject: 'BlogController'
      }
    },
    {
      id: 18,
      name: 'Добавить баннер',
      permission: {
        action: "create",
        subject: 'BlogController'
      }
    },
    {
      id: 19,
      name: 'Удалить баннер',
      permission: {
        action: "destroy",
        subject: 'BlogController'
      }
    },
    {
      id: 20,
      name: 'Редактировать баннер',
      permission: {
        action: "update",
        subject: 'BlogController'
      }
    }
  ],
  top: [
    {
      id: 21,
      name: 'Список лучших',
      permission: {
        action: "index",
        subject: 'TopController'
      }
    },
    {
      id: 22,
      name: 'Добавить в топ',
      permission: {
        action: "store",
        subject: 'TopController'
      }
    },
    {
      id: 23,
      name: 'Удалить из топа',
      permission: {
        action: "destroy",
        subject: 'TopController'
      }
    },
    {
      id: 24,
      name: 'Редактировать топ',
      permission: {
        action: "update",
        subject: 'TopController'
      }
    }
  ],
  topProducts: [
    {
      id: 25,
      name: 'Список топ продуктов',
      permission: {
        action: "index",
        subject: 'TopProductController'
      }
    },
    {
      id: 26,
      name: 'Добавить топ продукт',
      permission: {
        action: "store",
        subject: 'TopProductController'
      }
    },
    {
      id: 27,
      name: 'Удалить топ продукт',
      permission: {
        action: "deleteTopsProduct",
        subject: 'TopProductController'
      }
    }
  ],
  topBanners: [
    {
      id: 28,
      name: 'Список топ баннеров',
      permission: {
        action: "index",
        subject: 'TopBlogController'
      }
    },
    {
      id: 29,
      name: 'Добавить топ баннер',
      permission: {
        action: "store",
        subject: 'TopBlogController'
      }
    },
    {
      id: 30,
      name: 'Удалить топ баннер',
      permission: {
        action: "destroy",
        subject: 'TopBlogController'
      }
    },
    {
      id: 31,
      name: 'Редактировать топ баннер',
      permission: {
        action: "update",
        subject: 'TopBlogController'
      }
    }
  ],
  orders: [
    {
      id: 32,
      name: 'Список заказов',
      permission: {
        action: "allOrders",
        subject: 'ProfileController'
      }
    }
  ]
})
























</script>
<style scoped>
.permission {
  /* stylelint-disable-next-line liberty/use-logical-spec */
  border-bottom: 1px solid #ccc;
}
</style>
