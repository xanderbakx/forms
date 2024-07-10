import React, { ReactNode, useState } from 'react'
import {
  ButtonProps,
  NonIdealState,
  NonIdealStateProps,
} from '@blueprintjs/core'
import {
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { TablePaginationActions } from './TablePaginationActions'
import { MaybeCollapsibleRowRenderer } from './MaybeCollapsibleRowRenderer'

export interface ISPAResponseInfo {
  hasNextPage: boolean
  page: number
  nextPage: number | undefined
  previousPage: number | undefined
  totalRows: number
  rowsPerPage: number
}

export interface ICollapsibleDataTableProps<Data = unknown> {
  headers: ICollapsibleDataTableHeader<Data>[]
  collapseHeaders?: ICollapsibleDataTableHeader<Data>[]
  collapseActionButtons?: ButtonProps[]
  rowData: ICollapsibleDataTableData<Data>[]
  responseInfo?: ISPAResponseInfo
  collapseRenderer?: (
    data: ICollapsibleDataTableData<Data>
  ) => React.ReactElement | null
  rowsOverlay?: () => React.ReactElement | null
  showRowsOverlay?: boolean
  showHeaderOnRowsOverlay?: boolean
  paginate?: boolean
  paginationOptions?: {
    rowsPerPage?: number
  }
  className?: string
  nonIdeal?: NonIdealStateProps
  size?: 'small' | 'medium'
}

export type CellRenderer = string | number | ReactNode

export interface ICollapsibleDataTableHeader<Data = unknown>
  extends TableCellProps {
  displayName: string
  key: string
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit'
  cellRenderer?: (data: Data) => CellRenderer
}

export interface ICollapsibleDataTableData<Data = unknown> {
  [key: string]: Data
}

const defaultNonIdeal: NonIdealStateProps = {
  description: 'None',
}

const defaultPaginationOptions = (rowDataLength: number) => ({
  rowsPerPage:
    rowDataLength > 25 ? 25 : rowDataLength > 5 && rowDataLength <= 10 ? 10 : 5,
})

export const CollapsibleDataTable = ({
  collapseRenderer,
  collapseHeaders,
  headers,
  rowData,
  responseInfo,
  collapseActionButtons,
  showRowsOverlay = false,
  rowsOverlay,
  paginate = false,
  paginationOptions = defaultPaginationOptions(rowData.length),
  className,
  nonIdeal = defaultNonIdeal,
  size = 'medium',
}: ICollapsibleDataTableProps) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(
    paginationOptions.rowsPerPage || 10
  )

  const handleChangePage = (newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TableContainer className={className}>
      {showRowsOverlay && rowsOverlay && (
        <NonIdealState {...nonIdeal} className="non-ideal-state" />
      )}
      <Table size={size} aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <TableCell
                key={`header-${header.key}`}
                align={header.align ? header.align : 'left'}
              >
                {header.displayName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row, index) => (
            <MaybeCollapsibleRowRenderer
              key={`row-${index}`}
              headers={headers}
              data={row}
              collapseHeaders={collapseHeaders}
              collapseRenderer={collapseRenderer}
              collapseActionButtons={collapseActionButtons}
            />
          ))}
        </TableBody>
        {paginate && (
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={responseInfo?.totalRows || rowData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(_event, newPage) => handleChangePage(newPage)}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  )
}
