import { Separator } from '@/components/ui/separator'

export const Contact = () => {
  return (
    <div className="flex gap-2 p-1 text-xs text-zinc-200 sm:text-sm">
      <span>©2025</span>
      <span>m19e</span>
      <Separator
        orientation="vertical"
        className="h-4 w-[1.5px] bg-zinc-400 sm:h-5"
      />
      <a
        href="https://github.com/m19e"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-zinc-400"
      >
        github
      </a>
      <a
        href="https://twitter.com/Versas_me"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-zinc-400"
      >
        twitter(x)
      </a>
    </div>
  )
}
