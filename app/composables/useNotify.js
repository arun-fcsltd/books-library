// composables/useNotify.js
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

export default function useNotify() {
  const toast = useToast()
  const confirm = useConfirm()

  const showToast = (options) => {
    toast.add(options)
  }

  const confirmDialog = ({ event, message = 'Are you sure?', accept, reject }) => {
    confirm.require({
      target: event?.currentTarget,
      message,
      icon: 'pi pi-exclamation-triangle',
      accept,
      reject,
      rejectProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptProps: {
        label: 'Yes'
      }
    })
  }

  return { showToast, confirmDialog }
}
