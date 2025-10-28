import "@styles/globals.css"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { AppProps } from "next/app"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import Layout from "@layout/Layout"
import { DarkModeProvider } from "@context/darkModeContext"
import { ClientIDProvider } from '@context/clientIdContext'
import { GoogleAnalytics } from "nextjs-google-analytics"
import { Analytics } from "@vercel/analytics/next"

NProgress.configure({
  easing: "ease",
  speed: 800,
  showSpinner: false,
})

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const start = () => {
      NProgress.start()
    }
    const end = () => {
      NProgress.done()
    }
    router.events.on("routeChangeStart", start)
    router.events.on("routeChangeComplete", end)
    router.events.on("routeChangeError", end)
    return () => {
      router.events.off("routeChangeStart", start)
      router.events.off("routeChangeComplete", end)
      router.events.off("routeChangeError", end)
    }
  }, [router.events])

  return (
    <DarkModeProvider>
      <ClientIDProvider>
        <Layout>
          {process.env.NODE_ENV === 'production' && <GoogleAnalytics strategy="lazyOnload" />}
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </ClientIDProvider>
    </DarkModeProvider>
  )
}

export default MyApp
