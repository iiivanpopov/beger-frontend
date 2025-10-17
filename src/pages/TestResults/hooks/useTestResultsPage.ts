import type { SubmitHandler } from 'react-hook-form'
import type { CreateTestResultData } from '@/pages/TestResults/schemas/createTestResult.schema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useRouteContext } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCreateTestResultMutation, useDeleteTestResultMutation, useGetOptionsQuery, useGetSelfTestResultsQuery } from '@/api'
import { CreateTestResultSchema } from '@/pages/TestResults/schemas/createTestResult.schema'
import { useToast } from '@/shared/hooks'
import { createErrorHandler } from '@/shared/utils'

export function useTestResultsPage() {
  const [isOpen, setIsOpen] = useState(false)
  const { showSuccess, showError } = useToast()
  const optionsQuery = useGetOptionsQuery()
  const testResultsQuery = useGetSelfTestResultsQuery()
  const { queryClient } = useRouteContext({
    from: '__root__',
  })

  const form = useForm<CreateTestResultData>({
    defaultValues: {
      pcbName: '',
      date: new Date(),
      failed: '',
      firstTry: '',
      total: '',
    },
    resolver: valibotResolver(CreateTestResultSchema),
  })

  const deleteTestResultMutation = useDeleteTestResultMutation({
    options: {
      onSuccess: () => {
        showSuccess('Deleted test results record')
        queryClient.invalidateQueries({ queryKey: ['test-results', 'self'] })
      },
      onError: createErrorHandler(showError),
    },
  })

  const createTestResultMutation = useCreateTestResultMutation({
    options: {
      onSuccess: () => {
        showSuccess('Created test results record')
        queryClient.invalidateQueries({ queryKey: ['test-results', 'self'] })
        form.reset()
      },
      onError: createErrorHandler(showError),
    },
  })

  const onSubmit: SubmitHandler<CreateTestResultData> = (data) => {
    if (!optionsQuery.data?.data.pcbNames.includes(data.pcbName)) {
      return form.setError('pcbName', {
        type: 'manual',
        message: 'Invalid board name',
      })
    }

    createTestResultMutation.mutate({
      date: data.date,
      pcbName: data.pcbName,
      passedFirstTry: Number(data.firstTry),
      failed: Number(data.failed),
      total: Number(data.total),
    })
  }

  const onDelete = (id: number) => deleteTestResultMutation.mutate({ id })

  return {
    form,
    handlers: {
      onSubmit,
      onDelete,
    },
    queries: {
      options: optionsQuery,
      testResults: testResultsQuery,
    },
    modal: {
      isOpen,
      setIsOpen,
    },
  }
}
