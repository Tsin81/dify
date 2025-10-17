import React, { useState } from 'react'
import { ReactMultiEmail, isEmail } from 'react-multi-email'
import 'react-multi-email/dist/style.css'
import cn from 'classnames'
import s from './index.module.css'

type CustomEmailInputProps = {
  emails: string[]
  onChange: (emails: string[]) => void
}

const CustomEmailInput: React.FC<CustomEmailInputProps> = ({ emails, onChange }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const defaultDomain = process.env.NEXT_PUBLIC_DEFAULT_DOMAIN

  const setBlur = () => {
    if (inputValue && !inputValue.includes('@')) {
      const newEmail = `${inputValue}@${defaultDomain}`
      if (isEmail(newEmail)) {
        setInputValue('')
        onChange([...emails, newEmail])
        // eslint-disable-next-line no-implied-eval
        setTimeout('document.getElementsByClassName(\'bg-transparent\')[0].value = \'\'', 100)
      }
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue && !inputValue.includes('@')) {
      const newEmail = `${inputValue}@${defaultDomain}`
      if (isEmail(newEmail)) {
        setInputValue('')
        onChange([...emails, newEmail])
        // eslint-disable-next-line no-implied-eval
        setTimeout('document.getElementsByClassName(\'bg-transparent\')[0].value = \'\'', 100)
      }
    }
  }

  return (
    <ReactMultiEmail
      className={cn(
        'w-full pt-2 px-3 outline-none border-none',
        'appearance-none text-sm text-gray-900 rounded-lg overflow-y-auto',
        s.emailsInput,
      )}
      autoFocus
      emails={emails}
      allowDuplicate={false}
      inputClassName='bg-transparent'
      onChange={onChange}
      autoComplete={'on'}
      onBlur={setBlur}
      onChangeInput={setInputValue}
      initialInputValue={inputValue}
      getLabel={(email: string, index: number, removeEmail: (index: number) => void) => (
        <div data-tag key={index}>
          {email}
          <span data-tag-handle onClick={() => removeEmail(index)}>×</span>
        </div>
      )}
      onKeyDown={handleKeyDown}
    />
  )
}

export default CustomEmailInput
