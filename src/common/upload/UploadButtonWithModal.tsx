import { useState } from 'react'
import { Modal, Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useUploadFile } from '../../hooks/files/uploadFile'
import { Spinner } from '@chakra-ui/react'
import type { RcFile } from 'antd/es/upload/interface'

const UploadButtonWithModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [file, setFile] = useState<RcFile | null>(null)
  const { isUploading, uploadFile } = useUploadFile()

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setFile(null)
  }

  const handleUpload = () => {
    if (file) {
      uploadFile(file as File)
    }
  }

  const beforeUpload = (file: RcFile) => {
    setFile(file)
    return false
  }

  const onRemove = () => {
    setFile(null)
  }

  return (
    <>
      <Button icon={<UploadOutlined />} type="primary" onClick={showModal}>
        Upload
      </Button>
      <Modal
        title="Upload CSV File"
        open={isModalVisible}
        onCancel={handleCancel}
        okText={isUploading ? <Spinner /> : 'Upload'}
        onOk={handleUpload}
        cancelText="Cancel"
        okButtonProps={{ disabled: !file || isUploading }}
      >
        <Upload.Dragger
          beforeUpload={beforeUpload}
          onRemove={onRemove}
          name="file"
          multiple={false}
          accept=".csv"
          style={{ padding: '20px' }}
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">Only CSV files are supported.</p>
        </Upload.Dragger>
      </Modal>
    </>
  )
}

export default UploadButtonWithModal
