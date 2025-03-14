import { Separator } from '@/components/ui/separator'

// TODO リンクwithアイコン
export const Contact = () => {
  return (
    <div className="flex gap-2 p-1 text-sm text-zinc-200">
      <span>©2025</span>
      <span>m19e</span>
      <Separator orientation="vertical" className="h-5 w-[1.5px] bg-zinc-400" />
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
