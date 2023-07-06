import { EmojiEmotions } from "@mui/icons-material"
import { Box, IconButton } from "@mui/material"
import EmojiPicker, { EmojiClickData } from "emoji-picker-react"
import { useEffect, useState } from "react"
import { Control, FieldErrors, FieldValues } from "react-hook-form"
import FormInputText from "../FormInput/FormInputText"

interface Props {
  control: Control<FieldValues>
  errors: FieldErrors<FieldValues>
  watchContent: string
  reset: (values?: FieldValues) => void
  autoFocus?: boolean
}

const InputTextEmoji = ({
  control,
  errors,
  reset,
  watchContent,
  autoFocus,
}: Props) => {
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
  }

  useEffect(() => {
    if (selectedEmoji) {
      const content = watchContent + renderEmoji()
      reset({ content })
      setSelectedEmoji("")
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
        label=""
        name="content"
        TextFieldProps={{
          placeholder: "Mời bạn bình luận hoặc đặt câu hỏi",
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
          autoFocus: autoFocus,
        }}
      />
      {toggleEmoji && (
        <Box
          width={300}
          position="absolute"
          top={-280}
          right={-260}
          zIndex={99}
        >
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
