import type { SubmitHandler } from 'react-hook-form'
import type { CreateRepairData } from '@/pages/Repairs/schemas/createRepair.schema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useRouteContext } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCreateRepairMutation, useDeleteRepairMutation, useGetOptionsQuery, useGetSelfRepairsQuery } from '@/api'
import { createRepairSchema } from '@/pages/Repairs/schemas/createRepair.schema'
import { useToast } from '@/shared/hooks'
import { createErrorHandler } from '@/shared/utils'

export function useRepairsPage() {
  const [isOpen, setIsOpen] = useState(false)
  const { showSuccess, showError } = useToast()
  const optionsQuery = useGetOptionsQuery()
  const repairsQuery = useGetSelfRepairsQuery()
  const { queryClient } = useRouteContext({
    from: '__root__',
  })

  const form = useForm<CreateRepairData>({
    defaultValues: {
      pcbName: '',
      date: new Date(),
      defect: '',
      note: '',
    },
    resolver: valibotResolver(createRepairSchema),
  })

  const deleteRepairMutation = useDeleteRepairMutation({
    options: {
      onSuccess: () => {
        showSuccess('Deleted repair record')
        queryClient.invalidateQueries({ queryKey: ['repairs', 'self'] })
      },
      onError: createErrorHandler(showError),
    },
  })

  const createRepairMutation = useCreateRepairMutation({
    options: {
      onSuccess: () => {
        showSuccess('Created repair record')
        queryClient.invalidateQueries({ queryKey: ['repairs', 'self'] })
        form.reset()
      },
      onError: createErrorHandler(showError),
    },
  })

  const onSubmit: SubmitHandler<CreateRepairData> = (data) => {
    if (!optionsQuery.data?.data.pcbNames.includes(data.pcbName)) {
      return form.setError('pcbName', {
        type: 'manual',
        message: 'Invalid board name',
      })
    }

    if (!optionsQuery.data?.data.defects.includes(data.defect)) {
      return form.setError('defect', {
        type: 'manual',
        message: 'Invalid defect',
      })
    }

    createRepairMutation.mutate({
      date: data.date,
      pcbName: data.pcbName,
      defect: data.defect,
      note: data.note,
    })
  }

  const onDelete = (id: number) => deleteRepairMutation.mutate({ id })

  return {
    queries: {
      options: optionsQuery,
      repairs: repairsQuery,
    },
    handlers: {
      onDelete,
      onSubmit,
    },
    form,
    modal: {
      isOpen,
      setIsOpen,
    },
  }
}
