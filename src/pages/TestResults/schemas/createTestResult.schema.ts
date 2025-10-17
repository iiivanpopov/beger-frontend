import * as v from 'valibot'

export const createTestResultSchema = v.object({
  pcbName: v.pipe(v.string(), v.nonEmpty('* Required')),
  date: v.date(),
  firstTry: v.pipe(v.string(), v.nonEmpty('* Required')),
  failed: v.pipe(v.string(), v.nonEmpty('* Required')),
  total: v.pipe(v.string(), v.nonEmpty('* Required')),
})

export type CreateTestResultData = v.InferOutput<typeof createTestResultSchema>
