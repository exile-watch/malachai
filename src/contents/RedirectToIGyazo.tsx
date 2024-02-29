import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import {Button, WritProvider} from "@exile-watch/writ-react";
import '@mantine/core/styles.css';

export const config: PlasmoCSConfig = {
  matches: ["https://gyazo.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(`.explorer-action-btn-group`)

// Use this to optimize unmount lookups
export const getShadowHostId = () => "plasmo-inline-redirect-to-i-gyazo"

const captureElement = async (selector: string) => {
  const source: HTMLSourceElement = document.querySelector(selector);
  if (!source) {
    console.error("Source element not found");
    return;
  }

  window.open(source.src, "_blank");
}

const PlasmoInline = () => {
  const handleClick = () => captureElement('video > source')

  return (
    <WritProvider>
      <Button
        onClick={handleClick}
        style={theme => ({
          background: `linear-gradient(to left, ${theme.colors.sand[9]}60, transparent)`,
          color: theme.colors.sand[2],
          border: `1px solid ${theme.colors.sand[2]}`,
          height: 30,
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