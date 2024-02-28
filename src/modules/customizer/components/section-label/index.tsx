export default function SectionLabel({ children, ...props }: { children: React.ReactNode }) {
  return <span {...props} className="text-white font-medium font-montserrat text-xs sm:text-base leading-[19.5px]">
    {children}
  </span>
}