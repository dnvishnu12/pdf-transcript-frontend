import { PdfUpload } from '@/components/PdfUpload'
import { ThemeToggle } from '@/components/elements/ThemeToggle'
import { Transcript } from '@/components/Transcript'

export default function Page() {
  return (
    <div className="flex-col lg:flex">
      <PdfUpload />
      <ThemeToggle />
      <div className="ml-0 flex-1 p-6 lg:ml-[calc(max(2rem,50%-38rem)+40rem)]">
        <Transcript />
      </div>
    </div>
  )
}
