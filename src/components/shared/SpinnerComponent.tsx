import { Spinner } from "@/components/ui/spinner"

export function SpinnerComponent() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      
      <Spinner className="h-10 w-10  text-secondary font-bold" />
    </div>
  )
}
