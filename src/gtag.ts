declare global {
  interface Window {
    gtag: any;
  }
}

type Event = {
  action: string,
  category: string,
  label: string,
  value: number
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ID

export const pageview = (url: string) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  })
}

export const event = ({ action, category, label, value }: Event) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}