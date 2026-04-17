import {InputHTMLAttributes} from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

export default function FormSubmit(props: Props) {
  return (
    <input {...props} type="submit" className='bg-pink-600 w-full p-2 font-black text-white cursor-pointer mt-5' />
  )
}
