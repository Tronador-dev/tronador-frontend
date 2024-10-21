import { useMutation } from '@tanstack/react-query'
import { uploadFile } from '../api.ts'

interface UploadFileProps {
  onSuccess: (data: object) => void
  onError: (error: string) => void
}

export const useUploadFile = ({ onSuccess, onError }: UploadFileProps) => {
  const mutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: onSuccess,
    onError: onError,
  })

  const upload = (file: File) => {
    mutation.mutate(file)
  }

  return { upload, isUploading: mutation.isPending }
}
export default useUploadFile
