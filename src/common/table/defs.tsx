import { User } from '../../types/User.ts'
import { ColumnsType } from 'antd/es/table'
import { Button, Flex, Input, Select, Tag } from 'antd'
import { FilterDropdownProps } from 'antd/es/table/interface'
import { useState } from 'react'
import { SearchIcon } from '@chakra-ui/icons'

const filterDropdown = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  label,
}: FilterDropdownProps & { label: string }) => (
  <div style={{ padding: 8 }}>
    <Flex gap={'12px'} vertical>
      <Input
        placeholder={`Search ${label}`}
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => confirm()}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Flex gap={'8px'}>
        <Button
          type="primary"
          icon={<SearchIcon />}
          size="small"
          style={{ width: 90 }}
          onClick={() => confirm()}
        >
          Search
        </Button>
        <Button
          onClick={() => {
            setSelectedKeys([])
            confirm()
          }}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </Flex>
    </Flex>
  </div>
)

const getNumberRangeColor = (value: number): string => {
  if (value < 3) return 'blue'
  if (value < 6) return 'green'
  if (value < 9) return 'orange'
  else return 'red'
}

const EditableTag = ({ value, onChange, options }) => {
  const [isEditing, setIsEditing] = useState(false)

  return isEditing ? (
    <Flex gap={'8px'} align={'center'}>
      <Select
        defaultValue={value}
        onBlur={() => setIsEditing(false)}
        onChange={(newValue) => {
          setIsEditing(false)
          onChange(newValue)
        }}
      >
        {options.map((val) => (
          <Select.Option key={val} value={val}>
            {val}
          </Select.Option>
        ))}
      </Select>
      <Button
        onClick={() => setIsEditing(false)}
        size={'small'}
        color="primary"
        variant="text"
      >
        Cancel
      </Button>
    </Flex>
  ) : (
    <Tag
      color={getNumberRangeColor(value)}
      onClick={() => setIsEditing(true)}
      style={{ cursor: 'pointer' }}
    >
      {value}
    </Tag>
  )
}

export const getColumns = (data: User[]): ColumnsType<User> => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    filterIcon: <SearchIcon />,
    sorter: (a: User, b: User) => a.name.localeCompare(b.name),
    filterDropdown: (props) => filterDropdown({ ...props, label: 'name' }),
    onFilter: (value: string | number | boolean, record: User) =>
      record.name.includes(value as string),
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    filterIcon: <SearchIcon />,
    filterDropdown: (props) => filterDropdown({ ...props, label: 'phone' }),
    onFilter: (value: string | number | boolean, record: User) =>
      record.phone.includes(value as string),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    filterIcon: <SearchIcon />,
    sorter: (a: User, b: User) => a.email.localeCompare(b.email),
    filterDropdown: (props) => filterDropdown({ ...props, label: 'email' }),
    onFilter: (value: string | number | boolean, record: User) =>
      record.email.includes(value as string),
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    filterSearch: true,
    sorter: (a: User, b: User) => a.country.localeCompare(b.country),
    filters: Array.from(new Set(data.map((item) => item.country))).map(
      (country) => ({
        text: country,
        value: country,
      }),
    ),
    onFilter: (value: string | number | boolean, record: User) =>
      record.country.includes(value as string),
  },
  {
    title: 'Region',
    dataIndex: 'region',
    key: 'region',
    filterIcon: <SearchIcon />,
    filterDropdown: (props) => filterDropdown({ ...props, label: 'region' }),
    onFilter: (value: string | number | boolean, record: User) =>
      record.region.includes(value as string),
  },
  {
    title: 'Postal/Zip',
    dataIndex: 'postalZip',
    key: 'postalZip',
    sorter: (a: User, b: User) => a.postalZip.localeCompare(b.postalZip),
    filters: Array.from(new Set(data.map((item) => item.postalZip))).map(
      (zip) => ({
        text: zip,
        value: zip,
      }),
    ),
    onFilter: (value: string | number | boolean, record: User) =>
      record.postalZip.includes(value as string),
  },
  {
    title: 'Range',
    dataIndex: 'numberrange',
    key: 'numberrange',
    filters: Array.from(new Set(data.map((item) => item.numberrange))).map(
      (range) => ({
        text: range.toString(),
        value: range,
      }),
    ),
    onFilter: (value: string | number | boolean, record: User) =>
      record.numberrange === value,
    render: (value, record) => (
      <EditableTag
        value={value}
        onChange={(newValue) => {
          record.numberrange = newValue
        }}
        options={[...new Set(data.map((item) => item.numberrange))].sort(
          (a, b) => a - b,
        )}
      />
    ),
    sorter: (a: User, b: User) => a.numberrange - b.numberrange,
  },
]
