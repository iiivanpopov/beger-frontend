import * as v from 'valibot'
import { passwordValidator, userNameValidator } from '@/shared/utils/validators'

export const loginSchema = v.object({
  userName: userNameValidator,
  password: passwordValidator,
})

export type LoginFormData = v.InferOutput<typeof loginSchema>
