interface LoadingDotsProps {
  size?: "sm" | "md" | "lg"
  color?: string
  className?: string
}

export function LoadingDots({ size = "md", color = "bg-primary", className = "" }: LoadingDotsProps) {
  const sizeClasses = {
    sm: "w-1 h-1",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  }

  const gapClasses = {
    sm: "gap-1",
    md: "gap-2",
    lg: "gap-3",
  }

  return (
    <div className={`flex items-center justify-center ${gapClasses[size]} ${className}`}>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`${sizeClasses[size]} ${color} rounded-full animate-pulse`}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: "1.4s",
          }}
        />
      ))}
    </div>
  )
}
