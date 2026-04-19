import { useState } from "react";
import { twMerge } from 'tailwind-merge'
import { UploadDropzone } from "@/src/shared/utils/uploadthing";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { CommunityInput } from "@/src/features/communities/schemas/communitySchema";
import { FormError } from "../forms";

export default function UploadImage() {

    const {formState: {errors},setValue, clearErrors, getValues} = useFormContext<CommunityInput>()

        const [uploadedImage, setUploadedImage] = useState('')

        const currentImage = getValues('image') ? getValues('image') : null
    
  return (
    <>
     <UploadDropzone
                endpoint={'meetiUploader'}
                className="ut-button:bg-orange-400 hover:ut-button:bg-amber-600"
                onClientUploadComplete={(res) => {
                   setUploadedImage(res[0].ufsUrl)
                   setValue('image',res[0].ufsUrl)
                   clearErrors('image')
                }}
                appearance={{
                   button: "w-full py-3 block h-auto rounded-none after:bg-orange-100 after:h-3 after:top-0",
                   label: "text-sm text-gray-600 hover:text-gray-600",
                   allowedContent: "text-sm"
                }}
                content={{
                    button: 'Selecciona una imagen'
                }}
                config ={{
                    cn: twMerge,
                    mode: 'auto'
                }}
            />
            {errors.image && <FormError>{errors.image.message}</FormError>}
            
            {uploadedImage && (
                            <>
                            <p className="text-lg font-bold">Imagen Nueva</p>
                            <Image 
                                src={uploadedImage}
                                alt="Imagen"
                                width={300}
                                height={200}
                                priority
                            />
                            
                            </>
            )}
            {currentImage && !uploadedImage && (
                   <>
                            <p className="text-lg font-bold">Imagen Actual</p>
                            <Image 
                                src={currentImage}
                                alt="Imagen"
                                width={300}
                                height={200}
                                priority
                                
                            />
                            
                            </>

            )}
    
    </>
    
  )
}
