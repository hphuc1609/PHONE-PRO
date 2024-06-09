import { Avatar, Box, Button, Typography } from "@mui/material"
import InputTextEmoji from "components/common/InputTextEmoji"
import { IComment } from "models/product"
import React from "react"
import { FieldValues, useForm } from "react-hook-form"
import { primaryDark } from "styles/config"

interface CommentProps {
  openReply: boolean | number
  replyRef?: React.MutableRefObject<HTMLButtonElement>
  comment: IComment
  replies?: IComment[]
  handleDeleteComment: (id: number) => void
  handleAddComment: (data: FieldValues) => void
  handleOpenReply: (id: number) => void
}

const Comment = ({
  openReply,
  replyRef,
  comment,
  replies,
  handleDeleteComment,
  handleAddComment,
  handleOpenReply,
}: CommentProps) => {
  const createDate = new Date(comment.createDate).toLocaleString().split(" ")[1]
  const isReplyOpen = openReply === comment.id

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm()

  const watchContent = watch("content")

  const handleReset = () => {
    reset({ content: "" })
  }

  return (
    <Box mt={2} display="flex" gap={2}>
      <Avatar sx={{ bgcolor: primaryDark }}>
        {comment.username?.slice(0, 1).toLocaleUpperCase()}
      </Avatar>
      <Box width="100%" display="flex" flexDirection="column">
        <Box display="flex" alignItems="center" mb={1}>
          <Typography variant="body1" fontWeight={500}>
            {comment.username?.split("@")[0]}
          </Typography>
          <Typography variant="body2" color="GrayText" ml={1}>
            {createDate}
          </Typography>
        </Box>
        <Typography variant="body2">{comment.content}</Typography>
        <Box>
          {replies && (
            <Button
              variant="text"
              color="primary"
              size="small"
              disableRipple
              sx={{
                padding: 0,
                marginTop: 0.5,
                marginLeft: -1.5,
                textTransform: "none",
              }}
              onClick={() => handleOpenReply(comment.id)}
            >
              Trả lời
            </Button>
          )}
          <Button
            variant="text"
            color="primary"
            size="small"
            disableRipple
            sx={{
              padding: 0,
              marginTop: 0.5,
              marginLeft: -1.5,
              textTransform: "none",
            }}
            onClick={() => handleDeleteComment(comment.id)}
          >
            Xoá
          </Button>
        </Box>

        {replies?.map((reply) => (
          <Comment
            key={reply.id}
            comment={reply}
            handleDeleteComment={() => handleDeleteComment(reply.id)}
            handleAddComment={handleAddComment}
            handleOpenReply={() => handleOpenReply(reply.id)}
            openReply={openReply}
            replyRef={replyRef}
          />
        ))}

        {isReplyOpen && (
          <>
            <InputTextEmoji
              control={control}
              errors={errors}
              reset={reset}
              watchContent={watchContent}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2, px: 4, alignSelf: "flex-end" }}
              disabled={!watchContent}
              onClick={handleSubmit(handleAddComment)}
            >
              Gửi
            </Button>
            <Button
              ref={replyRef}
              sx={{ display: "none" }}
              onClick={handleReset}
            />
          </>
        )}
      </Box>
    </Box>
  )
}

export default Comment
