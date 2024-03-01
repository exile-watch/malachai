import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import {Button, Flex, WritProvider, Text, Stack, Group} from "@exile-watch/writ-react";
import '@mantine/core/styles.css';
import {useRef} from "react";

export const config: PlasmoCSConfig = {
  matches: ["https://i.gyazo.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(`body`)

// Use this to optimize unmount lookups
export const getShadowHostId = () => "plasmo-inline-create-thumbnail"

type CreateElementProps = {
  selector: string,
  fileName: string
}

const captureElement = async ({selector, fileName = 'create-element.jpeg'}: CreateElementProps) => {
  const video: HTMLVideoElement = document.querySelector(selector);
  if (!video) {
    console.error("[exile.watch extension] Video element not found");
    return;
  }

  // We are loosing image quality when capturing a playing video
  video.pause()

  video.crossOrigin = "anonymous";
  const canvas = document.createElement("canvas");
  const scaleWidth = 400; // exile.watch "biggest" showcase container width
  const scaleHeight = 200; // exile.watch "biggest" showcase container height
  canvas.width = scaleWidth; // Set canvas width to target width
  canvas.height = scaleHeight; // Set canvas height to target height
  const context = canvas.getContext("2d");

  context.drawImage(video, 0, 0, scaleWidth, scaleHeight);

  const imageUrl = canvas.toDataURL("image/webp", 0.95);

  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.close()
};

const PlasmoInline = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    captureElement({selector: "video", fileName: inputRef?.current?.value});
  };

  return (
    <WritProvider>
      <Flex justify="center" w="100%" display="flex" m="md">
        <Stack>
          <Group style={{display: "flex", justifyContent: "center"}} w="100%">
            <Flex display="flex">
              <input
                ref={inputRef}
                placeholder="(optional) file name"
                style={{
                  borderRadius: 3,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  border: "1px solid gray",
                  outline: 0,
                  padding: `0 8px`
              }}
              />
              <input
                value=".webp"
                disabled
                style={{
                  width: 30,
                  borderRadius: 3,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  border: "1px solid gray",
                  borderLeft: 0,
                  textAlign: 'center'
              }}
              />
            </Flex>
            <Button
              onClick={handleClick}
              style={theme => ({
                background: `linear-gradient(to left, ${theme.colors.cyan[9]}, transparent)`,
                color: theme.colors.cyan[2],
                border: `1px solid ${theme.colors.cyan[2]}`,
                height: 30,
                marginLeft: 8,
                paddingLeft: 8,
                paddingRight: 8,
                cursor: 'pointer',
                borderRadius: 3
              })}
            >
              Create GIF thumbnail
            </Button>
          </Group>
          <Text c="dimmed" style={{fontFamily: 'monospace'}}>💡TIP: You can pause the video at any frame and then create the thumbnail</Text>
        </Stack>
      </Flex>
    </WritProvider>
  )
}

export default PlasmoInline