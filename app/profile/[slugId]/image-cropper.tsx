"use client"

import React, { type SyntheticEvent } from "react"

import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    type Crop,
    type PixelCrop,
} from "react-image-crop"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"

import "react-image-crop/dist/ReactCrop.css"
import { CropIcon, Loader2, Trash2Icon } from "lucide-react"
import { FileWithPreview } from "./edit-image"
import { useMutation } from "@tanstack/react-query"
import { UpdateUserImageAction } from "@/server/actions/user"
import { useToast } from "@/components/ui/use-toast"


interface ImageCropperProps {
    dialogOpen: boolean
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectedFile: FileWithPreview | null
    setSelectedFile: React.Dispatch<React.SetStateAction<FileWithPreview | null>>
}

export function ImageCropper({
    dialogOpen,
    setDialogOpen,
    selectedFile,
    setSelectedFile,
}: ImageCropperProps) {
    const aspect = 1

    const imgRef = React.useRef<HTMLImageElement | null>(null)

    const [crop, setCrop] = React.useState<Crop>()
    const [croppedImageUrl, setCroppedImageUrl] = React.useState<string>("")
    const [croppedImage, setCroppedImage] = React.useState<string>("")

    function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }

    function onCropComplete(crop: PixelCrop) {
        if (imgRef.current && crop.width && crop.height) {
            const croppedImageUrl = getCroppedImg(imgRef.current, crop)
            setCroppedImageUrl(croppedImageUrl)
        }
    }

    function getCroppedImg(image: HTMLImageElement, crop: PixelCrop): string {
        const canvas = document.createElement("canvas")
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height

        canvas.width = crop.width * scaleX
        canvas.height = crop.height * scaleY

        const ctx = canvas.getContext("2d")

        if (ctx) {
            ctx.imageSmoothingEnabled = false

            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width * scaleX,
                crop.height * scaleY,
            )
        }

        return canvas.toDataURL("image/png", 1.0)
    }

    const { toast } = useToast()

    const { mutateAsync: updateImage, isPending: updateImagePending } = useMutation({
        mutationFn: async (image: string) => {
            await UpdateUserImageAction({ image })
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            })
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Image updated successfully",
                variant: "default",
            })
        },
    })

    async function onCrop() {
        try {
            setCroppedImage(croppedImageUrl)
            await updateImage(croppedImageUrl)
            setDialogOpen(false)
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong!",
                variant: "destructive",
            })
        }
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
                <Avatar className="size-36 cursor-pointer ring-offset-2 ring-2 ring-slate-200">
                    <AvatarImage
                        src={croppedImage ? croppedImage : selectedFile?.preview}
                        alt=""
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DialogTrigger>
            <DialogContent className="p-0 gap-0">
                <div className="p-6 size-full">
                    <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => onCropComplete(c)}
                        aspect={aspect}
                        className="w-full"
                    >
                        <Avatar className="size-full rounded-none">
                            <AvatarImage
                                ref={imgRef}
                                className="size-full rounded-none "
                                alt="Image Cropper Shell"
                                src={selectedFile?.preview}
                                onLoad={onImageLoad}
                            />
                            <AvatarFallback className="size-full min-h-[460px] rounded-none">
                                Loading...
                            </AvatarFallback>
                        </Avatar>
                    </ReactCrop>
                </div>
                <DialogFooter className=" p-6 pt-0 ">
                    <DialogClose asChild >
                        <Button
                            size={"sm"}
                            type="reset"
                            className="w-fit"
                            variant={"outline"}
                            onClick={() => {
                                setSelectedFile(null)
                            }}
                        >
                            <Trash2Icon className="mr-1.5 size-4" />
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit" size={"sm"} className="w-fit mb-6 md:mb-0" onClick={onCrop} disabled={updateImagePending}>
                        <CropIcon className="mr-1.5 size-4" />
                        {updateImagePending && <Loader2 className="mr-2 animate-spin" />}
                        Crop
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

// Helper function to center the crop
export function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
): Crop {
    return centerCrop(
        makeAspectCrop(
            {
                unit: "%",
                width: 50,
                height: 50,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}
