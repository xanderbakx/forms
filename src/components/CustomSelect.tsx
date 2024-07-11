import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'
import { ItemRenderer, Select, SelectProps } from '@blueprintjs/select'
import { Button, MenuItem } from '@blueprintjs/core'
import { SelectItem } from './Select'
import { FormGroup } from './FormGroup'

const itemRenderer: ItemRenderer<SelectItem> = (
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
      key={option.key}
      onClick={handleClick}
      onFocus={handleFocus}
      text={option.text}
    />
  )
}

const itemPredicate = (
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

interface CustomSelectProps
  extends Omit<SelectProps<SelectItem>, 'onItemSelect' | 'itemRenderer'> {
  name: string
  helperText?: string
  registerOptions?: RegisterOptions
}

export const CustomSelect = ({
  name,
  items,
  helperText,
  registerOptions,
}: CustomSelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormGroup
            name={name}
            labelFor={name}
            labelInfo={registerOptions?.required ? '*' : ''}
            helperText={errors[name]?.message?.toString() ?? helperText}
            intent={errors[name] ? 'danger' : 'none'}
          >
            <Select
              items={items}
              onItemSelect={item => field.onChange(item)}
              itemRenderer={itemRenderer}
              itemPredicate={itemPredicate}
              noResults={<MenuItem disabled={true} text="No results." />}
            >
              <Button rightIcon="double-caret-vertical">
                {field.value.text || `Select ${name}`}
              </Button>
            </Select>
          </FormGroup>
        )
      }}
    />
  )
}
