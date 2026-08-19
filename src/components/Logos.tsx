import type React from 'react'

export const NegentroLogo: React.FC<{ className?: string }> = ({
  className = 'h-8 sm:h-9',
}) => {
  return (
    <img
      src="/logos/negentro.svg"
      alt="Negentro"
      className={`select-none object-contain ${className}`}
    />
  )
}

export const AwsLogo: React.FC<{ className?: string }> = ({ className = 'h-10 sm:h-12' }) => {
  return (
    <img
      src="/logos/aws.svg"
      alt="AWS"
      className={`select-none object-contain transition-transform duration-300 hover:scale-105 ${className}`}
    />
  )
}

export const NvidiaLogo: React.FC<{ className?: string }> = ({ className = 'h-8 sm:h-10' }) => {
  return (
    <img
      src="/logos/nvidia.svg"
      alt="NVIDIA"
      className={`select-none object-contain transition-transform duration-300 hover:scale-105 ${className}`}
    />
  )
}

export const MicrosoftLogo: React.FC<{ className?: string }> = ({ className = 'h-8 sm:h-9' }) => {
  return (
    <img
      src="/logos/microsoft.svg"
      alt="Microsoft"
      className={`select-none object-contain transition-transform duration-300 hover:scale-105 ${className}`}
    />
  )
}

export const GoogleLogo: React.FC<{ className?: string }> = ({ className = 'h-9 sm:h-11' }) => {
  return (
    <img
      src="/logos/google.svg"
      alt="Google"
      className={`select-none object-contain transition-transform duration-300 hover:scale-105 ${className}`}
    />
  )
}
