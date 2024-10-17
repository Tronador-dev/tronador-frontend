import { Table as AntTable } from 'antd'
import { User } from '../../types/User.ts'
import './styles.css'
import { getColumns } from './defs.tsx'
import { useMemo, useRef } from 'react'
import data from '../../assets/data.json'
import UploadButtonWithModal from '../upload/UploadButtonWithModal.tsx'

export const Table = () => {
  const tableRef = useRef(null)

  /*const { data, isLoading, error } = useUsers()
  if (isLoading) return <Spin />
  if (error) return <p>Error al cargar los datos de usuarios</p>*/
  const columns = useMemo(() => getColumns(data), [])
  return (
    <>
      <UploadButtonWithModal />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          gap: '12px',
          padding: '32px',
        }}
      >
        <AntTable<User>
          ref={tableRef}
          columns={columns}
          dataSource={data}
          rowKey="id"
          scroll={{ y: 600 }}
        />
      </div>
    </>
  )
}
