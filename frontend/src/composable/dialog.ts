import { ref } from 'vue'

const activeDialog = ref('')

export function useDialog() {
  function openDialog(name: string) {
    activeDialog.value = name
  }

  function closeDialog() {
    activeDialog.value = ''
  }

  return { activeDialog, openDialog, closeDialog }
}
