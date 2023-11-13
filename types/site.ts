export interface SiteConfig  {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export interface CalculateInterest  { 
  originalPrice: number
  monthlyInstallment: number
  month?: number
}