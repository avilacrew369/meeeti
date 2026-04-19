"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { CommunityInput, CommunitySchema } from "../schemas/communitySchema"
import { Form, FormSubmit } from "@/src/shared/components/forms"
import CommunityForm from "./CommunityForm"
import { SelectCommunity } from "../types/community.types"
import { editCommunityAction } from "../actions/community-actions"

type Props = {
    community: SelectCommunity
}

export default function EditCommunity({community} : Props) {
    const {id, name, description, image} = community
     const methods =  useForm({
            resolver: zodResolver(CommunitySchema),
            mode: 'all',
            defaultValues: {
               name,
               description,
               image: image || ''
               
            }
        })

        const onSubmit = async(data: CommunityInput) => {
            await editCommunityAction(data, id)
        }
  return (
    <FormProvider {...methods}  >
        <Form
            onSubmit={(methods.handleSubmit(onSubmit))}
        >
            <CommunityForm />
            <FormSubmit value={'Guardar Cambios'} />
        </Form>
    </FormProvider>
  )
}
