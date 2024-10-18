import { useMutation } from '@tanstack/react-query'
import { postFile } from '../api.ts'

export const useUploadFile = () => {
  const mutation = useMutation({
    mutationFn: postFile,
    onSuccess: () => {},
    onError: () => {},
  })

  const uploadFile = (file: File) => {
    mutation.mutate(file)
  }

  return { uploadFile, isUploading: mutation.isPending }
}
export default useUploadFile
