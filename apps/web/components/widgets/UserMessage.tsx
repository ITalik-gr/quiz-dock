type UserMessageProps = {
  text: string
}

export function UserMessage({ text }: UserMessageProps) {
  return (
    <div className="flex justify-end">
      <p className="max-w-[85%] rounded-[16px] rounded-br-[6px] bg-[#f4f4f5] px-[14px] py-[10px] text-[15px] leading-[1.6] text-[#111111] | sm:max-w-[75%]">
        {text}
      </p>
    </div>
  )
}
