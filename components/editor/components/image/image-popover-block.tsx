import { cn } from '@/lib/utils'
import { ToolbarButton } from '../toolbar-button'
import { TrashIcon } from '@radix-ui/react-icons'
import { secondaryfont } from '@/lib/fonts'

const ImagePopoverBlock = ({ onRemove }: { onRemove: (e: React.MouseEvent<HTMLButtonElement>) => void }) => {
    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        onRemove(e)
    }

    return (
        <div className="flex h-10 overflow-hidden rounded bg-background p-2 shadow-lg">
            <div className="inline-flex gap-1">
                <ToolbarButton className={cn('border border-black', secondaryfont.className)} tooltip="Remove" onClick={handleRemove}>
                    Remove Image
                    <TrashIcon className="ml-4 size-4 text-red-600" />
                </ToolbarButton>
            </div>
        </div>
    )
}

export { ImagePopoverBlock }
