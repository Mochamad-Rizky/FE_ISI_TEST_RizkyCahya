import { StylesConfig } from 'react-select';

export type SelectOption = {
  readonly value: string;
  readonly label: string;
  readonly isDisabled?: boolean;
  readonly isFixed?: boolean;
  readonly isSelected?: boolean;
};

export const selectBaseStyle: StylesConfig<SelectOption, boolean> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--bw)',
    borderColor: 'var(--border)',
    borderWidth: '2px',
    borderRadius: 'var(--border-radius)',
    boxShadow: state.isFocused ? 'var(--shadow)' : 'none',
    transition: 'all 0.2s ease',
    transform: state.isFocused ? 'translate(-2px, -2px)' : 'none',
    opacity: state.isDisabled ? 0.5 : 1,
    pointerEvents: state.isDisabled ? 'none' : 'auto',
    '&:hover': {
      borderColor: 'var(--border)',
      transform: 'translate(-2px, -2px)',
      boxShadow: 'var(--shadow)',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: '16px',
    fontWeight: 'var(--base-font-weight)',
    color: 'var(--text)',
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: '16px',
    color: 'var(--text)',
    opacity: 0.6,
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '16px',
    fontWeight: 'var(--base-font-weight)',
    backgroundColor: state.isSelected ? 'var(--main)' : 'var(--bw)',
    color: 'var(--text)',
    padding: '10px 12px',
    '&:hover': {
      backgroundColor: state.isSelected ? 'var(--main)' : 'var(--bg)',
      transform: 'translate(-2px, -2px)',
      boxShadow: 'var(--shadow)',
    },
  }),
  menu: (provided) => ({
    ...provided,
    border: '2px solid var(--border)',
    borderRadius: 'var(--border-radius)',
    boxShadow: 'var(--shadow)',
    padding: '6px',
    overflow: 'hidden',
  }),
  input: (provided) => ({
    ...provided,
    color: 'var(--text)',
    fontSize: '16px',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'var(--text)',
    '&:hover': {
      color: 'var(--text)',
    },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: 'var(--text)',
    '&:hover': {
      color: 'var(--text)',
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'var(--bg)',
    borderRadius: 'var(--border-radius)',
    border: '2px solid var(--border)',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'var(--text)',
    fontWeight: 'var(--base-font-weight)',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'var(--text)',
    '&:hover': {
      backgroundColor: 'var(--error)',
      color: 'white',
    },
  }),
};
