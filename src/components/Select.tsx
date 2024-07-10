import React from 'react'
import { useFormContext, RegisterOptions, Controller } from 'react-hook-form'
import { MenuItem, FormGroup } from '@blueprintjs/core'
import {
  ItemRenderer,
  Select as BPSelect,
  SelectProps as BPSelectProps,
} from '@blueprintjs/select'
import Button from './Button'

export interface SelectItem {
  id: number
  text: string
  label?: string
}

interface SelectProps
  extends Omit<
    BPSelectProps<SelectItem>,
    'itemPredicate' | 'itemRenderer' | 'onItemSelect'
  > {
  name: string
  registerOptions?: RegisterOptions
  helperText?: string
}

const filterSelectItem = (
  query: string,
  option: SelectItem,
  _index?: number,
  exactMatch?: boolean
): boolean => {
  const normalizedTitle: string = option.text.toLowerCase()
  const normalizedQuery: string = query.toLowerCase()
  if (exactMatch) {
    return normalizedTitle === normalizedQuery
  } else {
    return `${option.text} ${option.label}`.indexOf(normalizedQuery) >= 0
  }
}

const selectItemRenderer: ItemRenderer<SelectItem> = (
  option,
  { handleClick, handleFocus, modifiers }
) => {
  if (!modifiers.matchesPredicate) {
    return null
  }
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={option.id}
      label={option.label}
      onClick={handleClick}
      onFocus={handleFocus}
      roleStructure="listoption"
      text={option.text}
    />
  )
}

export const Select = ({ name, items, helperText }: SelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const [selectedOption, setSelectedOption] = React.useState<
    SelectItem | undefined
  >(undefined)

  return (
    <FormGroup
      label={name}
      labelFor={name}
      helperText={errors[name]?.message?.toString() ?? helperText}
      intent={errors[name] ? 'danger' : 'none'}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          console.log('field', field)
          return (
            <BPSelect<SelectItem>
              items={items}
              itemPredicate={filterSelectItem}
              itemRenderer={selectItemRenderer}
              noResults={
                <MenuItem
                  disabled={true}
                  text="No results."
                  roleStructure="listoption"
                />
              }
              onItemSelect={item => {
                field.onChange(item)
                setSelectedOption(item)
              }}
              activeItem={selectedOption}
              {...field}
            >
              <Button rightIcon="double-caret-vertical">
                {selectedOption?.text ?? `Select ${name}...`}
              </Button>
            </BPSelect>
          )
        }}
      />
    </FormGroup>
  )
}
