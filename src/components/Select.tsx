import { useFormContext, Controller } from 'react-hook-form'
import { MenuItem, FormGroup, Button } from '@blueprintjs/core'
import {
  ItemRenderer,
  Select as BPSelect,
  SelectProps as BPSelectProps,
} from '@blueprintjs/select'

export interface SelectItem {
  key: string
  text: string
  label?: string
}

interface SelectProps
  extends Omit<
    BPSelectProps<SelectItem>,
    'itemPredicate' | 'itemRenderer' | 'onItemSelect'
  > {
  name: string
  helperText?: string
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

const itemRenderer: ItemRenderer<SelectItem> = (
  option,
  { handleClick, handleFocus, modifiers }
) => {
  if (!modifiers.matchesPredicate) {
    return null
  }
  return (
    <MenuItem
      key={option.key}
      active={modifiers.active}
      disabled={modifiers.disabled}
      onClick={handleClick}
      onFocus={handleFocus}
      text={option.text}
    />
  )
}

export const Select = ({ name, items, helperText }: SelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormGroup
            label={name}
            labelFor={name}
            // labelInfo={registerOptions?.required ? '*' : ''}
            helperText={errors[name]?.message?.toString() ?? helperText}
            intent={errors[name] ? 'danger' : 'none'}
          >
            <BPSelect
              items={items}
              onItemSelect={item => field.onChange(item)}
              itemPredicate={itemPredicate}
              itemRenderer={itemRenderer}
              noResults={<MenuItem disabled={true} text="No results." />}
            >
              <Button rightIcon="double-caret-vertical">
                {field.value.text || `Select ${name}...`}
              </Button>
            </BPSelect>
          </FormGroup>
        )
      }}
    />
  )
}
