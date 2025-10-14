import * as v from 'valibot'

export const loginSchema = v.object({
  userName: v.pipe(v.string(), v.nonEmpty('* Required'), v.minLength(3, 'Too short (>2)')),
  password: v.pipe(v.string(), v.nonEmpty('* Required'), v.minLength(6, 'Too short (>5)')),
})

export type LoginFormData = v.InferOutput<typeof loginSchema>
