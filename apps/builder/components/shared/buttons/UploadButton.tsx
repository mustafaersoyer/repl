import { Button, ButtonProps, chakra } from '@chakra-ui/react'
import React, { ChangeEvent, useState } from 'react'
import { compressFile } from 'services/utils'
import { uploadFiles } from 'utils'

type UploadButtonProps = {
  filePath: string
  includeFileName?: boolean
  onFileUploaded: (url: string) => void
} & ButtonProps

export const UploadButton = ({
  filePath,
  includeFileName,
  onFileUploaded,
  ...props
}: UploadButtonProps) => {
  const [isUploading, setIsUploading] = useState(false)

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files) return
    setIsUploading(true)
    const file = e.target.files[0]
    const urls = await uploadFiles({
      files: [
        {
          file: await compressFile(file),
          path: filePath + (includeFileName ? `/${file.name}` : ''),
        },
      ],
    })
    if (urls.length && urls[0]) onFileUploaded(urls[0])
    setIsUploading(false)
  }

  return (
    <>
      <chakra.input
        data-testid="file-upload-input"
        type="file"
        id="file-input"
        display="none"
        onChange={handleInputChange}
        accept=".jpg, .jpeg, .png, .svg, .gif"
      />
      <Button
        as="label"
        size="sm"
        htmlFor="file-input"
        cursor="pointer"
        isLoading={isUploading}
        {...props}
      >
        {props.children}
      </Button>
    </>
  )
}
