import { EmojiEmotions } from "@mui/icons-material"
import { Box, IconButton } from "@mui/material"
import EmojiPicker, { EmojiClickData } from "emoji-picker-react"
import { useEffect, useState } from "react"
import { Control, FieldErrors, FieldValues } from "react-hook-form"
import FormInputText from "../FormInput/FormInputText"

interface InputTextEmojiProps {
  control: Control<FieldValues>
  errors: FieldErrors<FieldValues>
  watchContent: string
  reset: (values?: FieldValues) => void
}

const InputTextEmoji = ({
  control,
  errors,
  reset,
  watchContent,
}: InputTextEmojiProps) => {
  const [toggleEmoji, setToogleEmoji] = useState(false)
  const [selectedEmoji, setSelectedEmoji] = useState("")

  const onClickEmoji = (emojiData: EmojiClickData) => {
    setSelectedEmoji(emojiData.unified)
  }

  const handleShowEmoji = () => {
    setTimeout(() => {
      setToogleEmoji(!toggleEmoji)
    })
  }

  const renderEmoji = () => {
    if (selectedEmoji) {
      return String.fromCodePoint(parseInt(selectedEmoji, 16))
    }

    return ""
  }

  // Effect: Add emoji to input content
  useEffect(() => {
    if (selectedEmoji) {
      const content = watchContent
        ? watchContent + renderEmoji()
        : renderEmoji()
      reset({ content })
      setSelectedEmoji("") // Reset emoji after input
    }
  }, [selectedEmoji])

  useEffect(() => {
    window.addEventListener("click", () => {
      setToogleEmoji(false)
    })
  }, [])

  return (
    <Box position="relative">
      <FormInputText
        control={control}
        error={errors}
        name="content"
        TextFieldProps={{
          placeholder: "Bình luận hoặc đặt câu hỏi",
          multiline: true,
          rows: 3,
          InputProps: {
            endAdornment: (
              <IconButton
                sx={{ position: "absolute", bottom: 0, right: 10 }}
                onClick={handleShowEmoji}
              >
                <EmojiEmotions />
              </IconButton>
            ),
          },
        }}
      />
      {toggleEmoji && (
        <Box width={300} position="absolute" top={0} right={0} zIndex={99}>
          <EmojiPicker
            width="100%"
            height={350}
            onEmojiClick={onClickEmoji}
            autoFocusSearch={false}
          />
        </Box>
      )}
    </Box>
  )
}

export default InputTextEmoji
