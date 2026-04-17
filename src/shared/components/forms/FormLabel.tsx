import {LabelHTMLAttributes} from "react";

type Props = LabelHTMLAttributes<HTMLLabelElement>

export default function FormLabel(props: Props) {
  return (
     <label  {...props}   className="block" >{props.children}</label>
  )
}
