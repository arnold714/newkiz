export { ForbiddenPage } from './ui/ForbiddenPage';
export { NoHeaderLayout } from './ui/NoHeaderLayout'
export { default as Layout } from './ui/Layout'
export { categoryReducer, openCategoryModal, closeCategoryModal } from '@/shared/model/categorySlice'
export { LoadingComponent } from './ui/LoadingComponent'
export { default as customAxios } from './api/client/customAxios';
export { default as ProtectedRoute } from './ui/ProtectedRoute';
export { characters } from './model/characters'
export type { Character } from "./model/characters";
export { useUserProfile } from "./hooks/useUserProfile"