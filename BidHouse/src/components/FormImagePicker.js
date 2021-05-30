import React from 'react'
import { useFormikContext } from 'formik' 
import ImageInputList from '../components/ImageInputList';

export default function FormImagePicker({name}) {
   
    const { setFieldValue,values } = useFormikContext();
    const imageUris=values[name]

    const handleAdd =(uri) => {
        setFieldValue(name,[...imageUris,uri])
      
        }
      
        const handleRemove =(uri) =>
        {
          setFieldValue(name,imageUris.filter(imageUri=>imageUri !== uri));
        }
   
    return (  

         <>
        <ImageInputList 
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
        />
       
    
        </>
    )
}


