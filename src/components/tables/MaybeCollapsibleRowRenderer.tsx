import React, { useState } from 'react'
import { Button, ButtonProps } from '@blueprintjs/core'
import { v4 as uuid } from 'uuid'
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material'
import { Collapse, IconButton, TableCell, TableRow } from '@mui/material'
import {
  CellRenderer,
  ICollapsibleDataTableData,
  ICollapsibleDataTableHeader,
} from './CollapsibleDataTable'

export interface IMaybeCollapsibleRowRenderer<Data = unknown> {
  headers: ICollapsibleDataTableHeader<Data>[]
  data: ICollapsibleDataTableData<Data>
  collapseHeaders?: ICollapsibleDataTableHeader<Data>[]
  collapseRenderer?: (data: ICollapsibleDataTableData<Data>) => React.ReactNode
  collapseActionButtons?: ButtonProps[]
}

export const MaybeCollapsibleRowRenderer: React.FunctionComponent<
  Partial<IMaybeCollapsibleRowRenderer>
> = ({
  headers,
  data,
  collapseHeaders = [],
  collapseRenderer = null,
  collapseActionButtons = [],
}) => {
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)

  const onBlurHandler = (e: React.FocusEvent<HTMLTableRowElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setFocused(false)
    }
  }

  const handleCellData = (
    header: ICollapsibleDataTableHeader
  ): CellRenderer => {
    const cellData = header.cellRenderer
      ? header.cellRenderer(data)
      : data?.[header.key]
    if (
      cellData &&
      (typeof cellData === 'string' ||
        typeof cellData === 'number' ||
        React.isValidElement(cellData))
    ) {
      return cellData
    }
    return '--------'
  }

  const headerKeys = headers?.map(header => header.key) || []

  return (
    <>
      <TableRow
        className={
          'mainTableCell ' +
          (collapseRenderer || collapseHeaders.length
            ? 'hasCollapsibleRow'
            : 'noCollapsibleRow')
        }
        data-testid="collapsible-table-main-row"
        onBlur={onBlurHandler}
        selected={focused && open}
      >
        {(collapseRenderer || collapseHeaders.length) && (
          <TableCell align="left">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                setOpen(!open)
                setFocused(!open)
              }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        {headers?.map(header => (
          <TableCell
            className={'mainTableCell'}
            align={header.align ? header.align : 'left'}
            key={`main-table-cell-${uuid()}`}
          >
            {handleCellData(header)}
          </TableCell>
        ))}
      </TableRow>
      {(collapseRenderer || collapseHeaders.length) && (
        <TableRow data-testid="collapsible-table-collapse-row">
          <TableCell
            className={'expandTableCell'}
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={headerKeys.length + 1}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              {collapseHeaders.length ? (
                <div className="collapse">
                  {collapseHeaders.map(header => (
                    <div
                      className="collapse-row"
                      key={`collapse-row-${uuid()}`}
                    >
                      <div className="collapse-row-header">
                        {header.displayName}
                      </div>
                      <div className="collapse-row-value">
                        {handleCellData(header)}
                      </div>
                    </div>
                  ))}
                  {collapseActionButtons.length && (
                    <div className="collapse-row-footer">
                      {collapseActionButtons.map(buttonProps => (
                        <Button
                          key={`collapse-action-button-${uuid()}`}
                          {...buttonProps}
                          onClick={event => buttonProps.onClick?.(event)}
                          className={`collapse-action-button ${buttonProps.className}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : collapseRenderer && data ? (
                collapseRenderer(data)
              ) : null}
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}
