import { Controller } from 'react-hook-form'
import { TestResultCard } from '@/components/TestResultCard/TestResultCard'
import { Autocomplete, Button, Datepicker, Form, Input, Modal, Typography } from '@/shared/ui'
import { useTestResultsPage } from './hooks/useTestResultsPage'
import styles from './TestResultsPage.module.css'

export function TestResultsPage() {
  const { form, modal, handlers, queries, mutations } = useTestResultsPage()

  return (
    <>
      <div className={styles.header}>
        <Typography tag="h2" variant="subheading">Create new record</Typography>
        <Modal isOpen={modal.isOpen} setIsOpen={modal.setIsOpen}>
          <Modal.Trigger asChild>
            <Button className={styles.open} variant="ghost">View last</Button>
          </Modal.Trigger>
          <Modal.Content className={styles.records}>
            {!queries.testResults.data?.data.length && (
              <Typography>No records found.</Typography>
            )}
            {queries.testResults.data?.data.map((testResult, i) => {
              return (
                <TestResultCard
                  key={testResult.id}
                  i={i + 1}
                  onDelete={handlers.onDelete}
                  testResult={testResult}
                />
              )
            })}
          </Modal.Content>
        </Modal>
      </div>
      <Form onSubmit={form.handleSubmit(handlers.onSubmit)}>
        <Form.Row className={styles.row}>
          <Controller
            name="pcbName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Form.Field {...fieldState}>
                <Autocomplete {...field}>
                  <Autocomplete.Trigger placeholder="PCB name" />
                  <Autocomplete.Items>
                    {queries.options.data?.data.pcbNames.map((pcb) => {
                      return (
                        <Autocomplete.Item key={pcb} value={pcb}>
                          {pcb}
                        </Autocomplete.Item>
                      )
                    })}
                  </Autocomplete.Items>
                </Autocomplete>
              </Form.Field>
            )}
          />
          <Controller
            name="date"
            control={form.control}
            render={({ field, fieldState }) => (
              <Form.Field {...fieldState}>
                <Datepicker {...field} />
              </Form.Field>
            )}
          />
        </Form.Row>
        <Form.Row>
          <Controller
            name="firstTry"
            control={form.control}
            render={({ field, fieldState }) => (
              <Form.Field {...fieldState} label="First Try">
                <Input {...field} placeholder="123..." type="number" />
              </Form.Field>
            )}
          />
          <Controller
            name="failed"
            control={form.control}
            render={({ field, fieldState }) => (
              <Form.Field {...fieldState} label="Failed">
                <Input {...field} placeholder="456..." type="number" />
              </Form.Field>
            )}
          />
          <Controller
            name="total"
            control={form.control}
            render={({ field, fieldState }) => (
              <Form.Field {...fieldState} label="Total">
                <Input {...field} placeholder="789..." type="number" />
              </Form.Field>
            )}
          />
        </Form.Row>
        <Button
          type="submit"
          size="large"
          className={styles.submit}
          loading={mutations.createTestResult.isPending}
        >
          Submit
        </Button>
      </Form>
    </>
  )
}
