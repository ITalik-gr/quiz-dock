import type { ReactNode } from "react"

type PageContainerProps = {
  children: ReactNode
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="mx-auto flex w-full max-w-[1120px] flex-col gap-[40px] px-[16px] py-[32px] | sm:px-[24px] sm:py-[48px] | lg:px-[40px] lg:py-[56px]">
      {children}
    </main>
  )
}
