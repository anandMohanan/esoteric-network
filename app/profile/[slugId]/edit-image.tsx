"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { FileWithPath, useDropzone } from "react-dropzone"
import { ImageCropper } from "./image-cropper"

export type FileWithPreview = FileWithPath & {
    preview: string
}

const accept = {
    "image/*": [],
}


export const EditImage = ({ profileUrl, userName }: { profileUrl: string | null, userName: string }) => {
    const [selectedFile, setSelectedFile] =
        React.useState<FileWithPreview | null>(null)
    const [isDialogOpen, setDialogOpen] = React.useState(false)

    const onDrop = React.useCallback(
        (acceptedFiles: FileWithPath[]) => {
            const file = acceptedFiles[0]
            if (!file) {
                alert("Selected image is too large!")
                return
            }

            const fileWithPreview = Object.assign(file, {
                preview: URL.createObjectURL(file),
            })

            setSelectedFile(fileWithPreview)
            setDialogOpen(true)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept,
    })
    return (
        <div className="relative ">
            {selectedFile ? (
                <ImageCropper
                    dialogOpen={isDialogOpen}
                    setDialogOpen={setDialogOpen}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                />
            ) : (
                <Avatar
                    {...getRootProps()}
                    className="size-20 cursor-pointer ring-offset-2 ring-2 ring-slate-200"
                >
                    <input {...getInputProps()} />
                    <AvatarImage src={profileUrl ?? ""} alt={userName} />
                    <AvatarFallback>{userName}</AvatarFallback>
                </Avatar>
            )}

        </div>
    )
}
