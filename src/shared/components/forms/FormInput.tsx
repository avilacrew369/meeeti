import {InputHTMLAttributes} from 'react'
import clsx from "clsx";

type Props = InputHTMLAttributes<HTMLInputElement>

export default function FormInput(props: Props) {

  const {className} = props
  return (
      <input {...props}
            className={clsx("border border-slate-200 w-full p-2", className)}
       />
  )
}
