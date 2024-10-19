import { Skeleton } from '@mantine/core'

interface TableSkeletonProps {
  rows: number
}

export const TableSkeleton = ({ rows }: TableSkeletonProps) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} height={26} style={{ marginBottom: 11 }} />
      ))}
    </>
  )
}
