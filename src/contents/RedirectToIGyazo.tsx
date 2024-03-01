import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import {Button, WritProvider} from "@exile-watch/writ-react";
import '@mantine/core/styles.css';

export const config: PlasmoCSConfig = {
  matches: ["https://gyazo.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () => document.querySelector(`.trash-btn`)


// Use this to optimize unmount lookups
export const getShadowHostId = () => "plasmo-inline-redirect-to-i-gyazo"

const captureElement = async (selector: string) => {
  const source: HTMLSourceElement = document.querySelector(selector);
  if (!source) {
    console.error("[exile.watch extension] Source element not found");
    return;
  }

  window.open(source.src, "_blank");
}

const PlasmoInline = () => {
  const handleClick = () => captureElement('#gyazo-video-player video > source')

  return (
    <WritProvider>
      <Button
        id="exile-btn-watch-redirect"
        onClick={handleClick}
        style={theme => ({
          background: `linear-gradient(to left, ${theme.colors.sand[9]}60, transparent)`,
          color: theme.colors.sand[2],
          border: `1px solid ${theme.colors.sand[2]}`,
          height: 30,
          marginTop: 1,
          marginLeft: 8,
          paddingLeft: 8,
          paddingRight: 8,
          cursor: 'pointer',
          borderRadius: 3
        })}>
        ✨ Redirect me to GIF thumbnail creation
      </Button>
    </WritProvider>
  )
}

export default PlasmoInline