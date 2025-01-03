/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

/// <reference types="unplugin-vue-router/client" />

import type {
  // type safe route locations
  RouteLocationTypedList,
  RouteLocationResolvedTypedList,
  RouteLocationNormalizedTypedList,
  RouteLocationNormalizedLoadedTypedList,
  RouteLocationAsString,
  RouteLocationAsRelativeTypedList,
  RouteLocationAsPathTypedList,

  // helper types
  // route definitions
  RouteRecordInfo,
  ParamValue,
  ParamValueOneOrMore,
  ParamValueZeroOrMore,
  ParamValueZeroOrOne,

  // vue-router extensions
  _RouterTyped,
  RouterLinkTyped,
  RouterLinkPropsTyped,
  NavigationGuard,
  UseLinkFnTyped,

  // data fetching
  _DataLoader,
  _DefineLoaderOptions,
} from 'unplugin-vue-router/types'

declare module 'vue-router/auto/routes' {
  export interface RouteNamedMap {
    'root': RouteRecordInfo<'root', '/', Record<never, never>, Record<never, never>>,
    '$error': RouteRecordInfo<'$error', '/:error(.*)', { error: ParamValue<true> }, { error: ParamValue<false> }>,
    'banners': RouteRecordInfo<'banners', '/banners', Record<never, never>, Record<never, never>>,
    'banners-create': RouteRecordInfo<'banners-create', '/banners/create', Record<never, never>, Record<never, never>>,
    'banners-edit-id': RouteRecordInfo<'banners-edit-id', '/banners/edit/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'branches': RouteRecordInfo<'branches', '/branches', Record<never, never>, Record<never, never>>,
    'branches-create': RouteRecordInfo<'branches-create', '/branches/Create', Record<never, never>, Record<never, never>>,
    'branches-edit-id': RouteRecordInfo<'branches-edit-id', '/branches/edit/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'categories': RouteRecordInfo<'categories', '/categories', Record<never, never>, Record<never, never>>,
    'category-create': RouteRecordInfo<'category-create', '/category/Create', Record<never, never>, Record<never, never>>,
    'category-edit-id': RouteRecordInfo<'category-edit-id', '/category/Edit/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'category-views-id': RouteRecordInfo<'category-views-id', '/category/views/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'login': RouteRecordInfo<'login', '/login', Record<never, never>, Record<never, never>>,
    'not-authorized': RouteRecordInfo<'not-authorized', '/not-authorized', Record<never, never>, Record<never, never>>,
    'orders': RouteRecordInfo<'orders', '/orders', Record<never, never>, Record<never, never>>,
    'orders-views-id': RouteRecordInfo<'orders-views-id', '/orders/views/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'product-create': RouteRecordInfo<'product-create', '/product/Create', Record<never, never>, Record<never, never>>,
    'product-edit-id': RouteRecordInfo<'product-edit-id', '/product/edit/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'roles': RouteRecordInfo<'roles', '/roles', Record<never, never>, Record<never, never>>,
    'roles-create': RouteRecordInfo<'roles-create', '/roles/create', Record<never, never>, Record<never, never>>,
    'roles-permission-id': RouteRecordInfo<'roles-permission-id', '/roles/permission/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'top-banners': RouteRecordInfo<'top-banners', '/top-banners', Record<never, never>, Record<never, never>>,
    'top-banners-create': RouteRecordInfo<'top-banners-create', '/top-banners/create', Record<never, never>, Record<never, never>>,
    'top-banners-edit-id': RouteRecordInfo<'top-banners-edit-id', '/top-banners/edit/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'top-products': RouteRecordInfo<'top-products', '/top-products', Record<never, never>, Record<never, never>>,
    'top-products-create': RouteRecordInfo<'top-products-create', '/top-products/create', Record<never, never>, Record<never, never>>,
    'top-products-edit-id': RouteRecordInfo<'top-products-edit-id', '/top-products/edit/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'topics': RouteRecordInfo<'topics', '/topics', Record<never, never>, Record<never, never>>,
    'topics-create': RouteRecordInfo<'topics-create', '/topics/create', Record<never, never>, Record<never, never>>,
    'topics-edit-id': RouteRecordInfo<'topics-edit-id', '/topics/edit/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'users': RouteRecordInfo<'users', '/users', Record<never, never>, Record<never, never>>,
    'users-create': RouteRecordInfo<'users-create', '/users/create', Record<never, never>, Record<never, never>>,
    'users-update-id': RouteRecordInfo<'users-update-id', '/users/update/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
  }
}

declare module 'vue-router/auto' {
  import type { RouteNamedMap } from 'vue-router/auto/routes'

  export type RouterTyped = _RouterTyped<RouteNamedMap>

  /**
   * Type safe version of `RouteLocationNormalized` (the type of `to` and `from` in navigation guards).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationNormalized<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationNormalizedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationNormalizedLoaded` (the return type of `useRoute()`).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationNormalizedLoaded<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationResolved` (the returned route of `router.resolve()`).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationResolved<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationResolvedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocation` . Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocation<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationRaw` . Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationRaw<Name extends keyof RouteNamedMap = keyof RouteNamedMap> =
    | RouteLocationAsString<RouteNamedMap>
    | RouteLocationAsRelativeTypedList<RouteNamedMap>[Name]
    | RouteLocationAsPathTypedList<RouteNamedMap>[Name]

  /**
   * Generate a type safe params for a route location. Requires the name of the route to be passed as a generic.
   */
  export type RouteParams<Name extends keyof RouteNamedMap> = RouteNamedMap[Name]['params']
  /**
   * Generate a type safe raw params for a route location. Requires the name of the route to be passed as a generic.
   */
  export type RouteParamsRaw<Name extends keyof RouteNamedMap> = RouteNamedMap[Name]['paramsRaw']

  export function useRouter(): RouterTyped
  export function useRoute<Name extends keyof RouteNamedMap = keyof RouteNamedMap>(name?: Name): RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[Name]

  export const useLink: UseLinkFnTyped<RouteNamedMap>

  export function onBeforeRouteLeave(guard: NavigationGuard<RouteNamedMap>): void
  export function onBeforeRouteUpdate(guard: NavigationGuard<RouteNamedMap>): void

  export const RouterLink: RouterLinkTyped<RouteNamedMap>
  export const RouterLinkProps: RouterLinkPropsTyped<RouteNamedMap>

  // Experimental Data Fetching

  export function defineLoader<
    P extends Promise<any>,
    Name extends keyof RouteNamedMap = keyof RouteNamedMap,
    isLazy extends boolean = false,
  >(
    name: Name,
    loader: (route: RouteLocationNormalizedLoaded<Name>) => P,
    options?: _DefineLoaderOptions<isLazy>,
  ): _DataLoader<Awaited<P>, isLazy>
  export function defineLoader<
    P extends Promise<any>,
    isLazy extends boolean = false,
  >(
    loader: (route: RouteLocationNormalizedLoaded) => P,
    options?: _DefineLoaderOptions<isLazy>,
  ): _DataLoader<Awaited<P>, isLazy>

  export {
    _definePage as definePage,
    _HasDataLoaderMeta as HasDataLoaderMeta,
    _setupDataFetchingGuard as setupDataFetchingGuard,
    _stopDataFetchingScope as stopDataFetchingScope,
  } from 'unplugin-vue-router/runtime'
}

declare module 'vue-router' {
  import type { RouteNamedMap } from 'vue-router/auto/routes'

  export interface TypesConfig {
    beforeRouteUpdate: NavigationGuard<RouteNamedMap>
    beforeRouteLeave: NavigationGuard<RouteNamedMap>

    $route: RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[keyof RouteNamedMap]
    $router: _RouterTyped<RouteNamedMap>

    RouterLink: RouterLinkTyped<RouteNamedMap>
  }
}
