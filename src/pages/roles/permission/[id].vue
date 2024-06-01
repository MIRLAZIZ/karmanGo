<template>
  <div>


    <h2 class="mb-4">Ruxsatlar</h2>


    <VRow class="">
      <VCol cols="12">
        <VCard class="pa-5">
          <VCheckbox :label="'Barchasini belgilash'" v-model="all" @click="permissionAll" />
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
        <VBtn class="ml-3" @click="router.go(-1)">orqaga</VBtn>
        <VBtn type="submit" class="ml-3" @click="sendPermission" :disabled="!permissionsData.permissions.length">Saqlash
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
    title: 'Kategoriyalar',
    lable: 'category',

  },
  {
    title: 'Maxsulotlar',
    lable: 'products',

  },
  {
    title: 'Filial',
    lable: 'branch',
  },
  {
    title: 'Foydalanuvchilar',
    lable: 'users',
  },
  {
    title: 'banner',
    lable: 'banner',
  },
  {
    title: 'Top',
    lable: 'top',
  },
  // {
  //   title: 'roles',
  //   lable: 'roles',
  // },
  {
    title: 'Top proucts',
    lable: 'topProducts',

  },
  {
    title: 'Top banners',
    lable: 'topBanners',
  },
  {
    title: 'Orders',
    lable: 'orders',
  }
]






const data = ref({
  category: [
    {
      id: 1,
      name: 'Kategoriyalar ro\'yxati',
      permission: {
        action: "index",
        subject: 'CategoryController'
      }

    },
    {
      id: 2,
      name: 'Kategoriyalar qo\'shish',
      permission: {
        action: "store",
        subject: 'CategoryController'
      }

    },
    {
      id: 3,
      name: 'Kategoriyalar o\'chirish',
      permission: {
        action: "destroy",
        subject: 'CategoryController'
      }
    },
    {
      id: 4,
      name: 'Kategoriyalar tahrirlash',
      permission: {
        action: "update",
        subject: 'CategoryController'
      }
    }],

  products: [

    {
      id: 5,
      name: "Maxsulotlar ro'yxati",
      permission: {
        action: "index",
        subject: 'ProductController'
      }
    },
    {
      id: 6,
      name: 'Maxsulot qo\'shish',

      permission: {
        action: "store",
        subject: 'ProductController'
      }

    },
    {
      id: 7,
      name: 'Maxsulot o\'chirish',

      permission: {
        action: "destroy",
        subject: 'ProductController'
      }
    },
    {
      id: 8,
      name: 'Maxsulot tahrirlash',

      permission: {
        action: "update",
        subject: 'ProductController'
      }
    }],

  branch: [
    {
      id: 9,
      name: 'Filiallar ro\'yxati',
      permission: {
        action: "index",
        subject: 'BranchController'

      }
    },
    {
      id: 10,
      name: 'Filial qo\'shish',

      permission: {
        action: "store",
        subject: 'BranchController'
      }

    },
    {
      id: 11,
      name: 'Filial o\'chirish',

      permission: {
        action: "destroy",
        subject: 'BranchController'
      }
    },
    {
      id: 12,
      name: 'Filial tahrirlash',

      permission: {
        action: "update",
        subject: 'BranchController'
      }
    }],

  users: [
    {
      id: 13,
      name: 'Foydalanuvchilar ro\'yxati',
      permission: {
        action: "index",
        subject: 'UserController'
      }
    },
    {
      id: 14,
      name: 'Foydalanuvchilar qo\'shish',

      permission: {
        action: "store",
        subject: 'UserController'
      }

    },
    {
      id: 15,
      name: 'Foydalanuvchilar o\'chirish',

      permission: {
        action: "destroy",
        subject: 'UserController'
      }
    },
    {
      id: 16,
      name: 'Foydalanuvchilar tahrirlash',

      permission: {
        action: "update",
        subject: 'UserController'
      }
    }],

  banner: [
    {
      id: 17,
      name: 'Banner ro\'yxati',
      permission: {
        action: "index",
        subject: 'BlogController'

      }
    },
    {
      id: 18,
      name: 'Banner qo\'shish',

      permission: {
        action: "create",
        subject: 'BlogController'
      }

    },
    {
      id: 19,
      name: 'Banner o\'chirish',

      permission: {
        action: "destroy",
        subject: 'BlogController'
      }
    },
    {
      id: 20,
      name: 'Banner tahrirlash',

      permission: {
        action: "update",
        subject: 'BlogController'
      }
    }],


  top: [
    {
      id: 21,
      name: 'Top ro\'yxati',

      permission: {
        action: "index",
        subject: 'TopController'
      }

    },

    {
      id: 22,
      name: 'Top qo\'shish',

      permission: {
        action: "store",
        subject: 'TopController'
      }

    },
    {
      id: 23,
      name: 'Top o\'chirish',

      permission: {
        action: "destroy",
        subject: 'TopController'
      }
    },
    {
      id: 24,
      name: 'Top tahrirlash',

      permission: {
        action: "update",
        subject: 'TopController'
      }
    }],

  // roles: [{
  //   id: 19,
  //   name: 'Role qo\'shish',

  // },
  // {
  //   id: 20,
  //   name: 'Role o\'chirish',
  // },
  // {
  //   id: 21,
  //   name: 'Role tahrirlash',
  // }],

  topProducts: [
    {
      id: 25,
      name: 'Top products ro\'yxati',
      permission: {
        action: "index",
        subject: 'TopProductController'
      }
    },
    {
      id: 26,
      name: 'Top products qo\'shish',

      permission: {
        action: "store",
        subject: 'TopProductController'
      }

    },
    {
      id: 27,
      name: 'Top products o\'chirish',

      permission: {
        action: "deleteTopsProduct",
        subject: 'TopProductController'
      }
    },
  ],

  topBanners: [
    {
      id: 28,
      name: 'Top banners ro\'yxati',
      permission: {
        action: "index",
        subject: 'TopBlogController'
      }

    },

    {
      id: 29,
      name: 'Top banners qo\'shish',

      permission: {
        action: "store",
        subject: 'TopBlogController'
      }

    },
    // {
    //   id: 30,
    //   name: 'Top banners o\'chirish',

    //   permission: {
    //     action: "destroy",
    //     subject: 'TopBlogController'
    //   }
    // },
    // {
    //   id: 31,
    //   name: 'Top banners tahrirlash',

    //   permission: {
    //     action: "update",
    //     subject: 'TopBlogController'
    //   }
    // }
  ],

  orders: [
    {
      id: 32,
      name: 'Orders ro\'yxati',
      permission: {
        action: "allOrders",
        subject: 'ProfileController'
      }
    },


    // {
    //   id: 33,
    //   name: 'Orders qo\'shish',

    //   permissions: {
    //     action: "store",
    //     subject: 'ordersCreate'
    //   }

    // },
    // {
    //   id: 34,
    //   name: 'Orders o\'chirish',

    //   permissions: {
    //     action: "destroy",
    //     subject: 'ordersDelete'
    //   }
    // },
    // {
    //   id: 35,
    //   name: 'Orders tahrirlash',

    //   permissions: {
    //     action: "update",
    //     subject: 'ordersUpdate'
    //   }
    // }
  ]
})

















</script>
<style scoped>
.permission {
  /* stylelint-disable-next-line liberty/use-logical-spec */
  border-bottom: 1px solid #ccc;
}
</style>
