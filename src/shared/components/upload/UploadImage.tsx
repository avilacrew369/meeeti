import { useState } from "react";
import { twMerge } from 'tailwind-merge'
import { UploadDropzone } from "@/src/shared/utils/uploadthing";
import Image from "next/image";


export default function UploadImage() {
        const [uploadedImage, setUploadedImage] = useState('')
    
  return (
    <>
     <UploadDropzone
                endpoint={'meetiUploader'}
                className="ut-button:bg-orange-400 hover:ut-button:bg-amber-600"
                onClientUploadComplete={(res) => {
                   setUploadedImage(res[0].ufsUrl)
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
            {uploadedImage && (
                            <>
                            <p className="text-lg font-bold">Imagen Nueva</p>
                            <Image 
                                src={uploadedImage}
                                alt="Imagen"
                                width={300}
                                height={200}
                            />
                            
                            </>
            )}
    
    </>
    
  )
}
