import Slider from '@/components/slider/Slider'
import Script from 'next/script'

export default function Home() {
  return (
    <main>
      <Slider/>
      <Script src="scriptSliderHome.js" strategy="lazyOnload" />
    </main>
  )
}
