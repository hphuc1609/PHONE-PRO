import { Box, Button, Grid, Typography } from "@mui/material"
import { createComponentWithAuth, firestoreDB } from "Firebase/firebaseConfig"
import AlertDialog from "components/common/Dialog"
import InputTextEmoji from "components/common/InputTextEmoji"
import { IComment } from "models/product"
import { useEffect, useRef, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { WrappedComponentProps } from "react-with-firebase-auth"
import { borderColor } from "styles/config"
import Comment from "./Comment"
import scrollToTop from "helper/scrollToTop"

const CommentBox = ({ user }: WrappedComponentProps) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const replyRef = useRef(null)

  const [dataComment, setDataComment] = useState([])
  const [open, setOpen] = useState(false)
  const [openReply, setOpenReply] = useState<number | boolean>()
  const [autoFocus, setAutoFocus] = useState(false)

  useEffect(() => {
    const getDataComment = firestoreDB
      .collection("comments")
      .onSnapshot((res) => {
        const data = res.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setDataComment(data)
      })

    return () => getDataComment()
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm()

  const watchContent = watch("content")

  const handleAddComment = (data: FieldValues) => {
    const { content } = data
    const createDate = new Date().toISOString()

    if (user) {
      const newComment: IComment = {
        id: dataComment.length + 1,
        content,
        createDate,
        userId: (dataComment.length + 1).toString(),
        username: user.displayName || user.email.split("@")[0],
        parentId: openReply ? openReply.toString() : null,
        productId: id,
      }
      firestoreDB.collection("comments").add(newComment)
      reset({ content: "" })

      if (openReply) {
        replyRef.current.click(), setOpenReply(false)
      }
    } else setOpen(true)
  }

  const getReplies = (commentId: number) => {
    return dataComment
      .filter((comment) => comment.parentId === commentId.toString())
      .sort(
        (a, b) =>
          new Date(a.createDate).getTime() - new Date(b.createDate).getTime()
      )
  }

  const filterdComments = dataComment.filter(
    (comment) => comment.productId === id
  )

  const handleDeleteComment = (id: number) => {
    firestoreDB
      .collection("comments")
      .get()
      .then((res) => {
        res.forEach((doc) => {
          console.log(doc.data().id)
          if (doc.data().id === id) {
            doc.ref.delete()
          }
        })
      })
  }

  const handleClose = () => setOpen(false)

  const handleAccept = () => {
    navigate("/login")
    scrollToTop()
  }

  const handleOpenReply = (commentId: any) => {
    if (openReply === commentId) {
      setOpenReply(false)
    } else {
      setAutoFocus(true)
      setOpenReply(commentId)
    }
  }

  return (
    <>
      <Box
        maxWidth={900}
        border={`1px solid ${borderColor}`}
        borderRadius={3}
        p={3}
        mt={10}
      >
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant="h5" fontWeight={500} gutterBottom>
              Bình luận
            </Typography>
            <form
              onSubmit={handleSubmit(handleAddComment)}
              autoComplete="off"
              noValidate
            >
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
                sx={{ mt: 2, px: 4 }}
                disabled={!watchContent}
              >
                Gửi
              </Button>
            </form>
          </Grid>

          <Grid item xs={12}>
            {filterdComments
              ?.sort(
                (a, b) =>
                  new Date(b.createDate).getTime() -
                  new Date(a.createDate).getTime()
              )
              .map(
                (comment) =>
                  comment.parentId === null && (
                    <Comment
                      key={comment.id}
                      openReply={openReply}
                      replyRef={replyRef}
                      comment={comment}
                      replies={getReplies(comment.id)}
                      autoFocus={autoFocus}
                      handleDeleteComment={handleDeleteComment}
                      handleAddComment={handleAddComment}
                      handleOpenReply={handleOpenReply}
                    />
                  )
              )}
          </Grid>
        </Grid>
      </Box>

      <AlertDialog
        open={open}
        handleClose={handleClose}
        fullWidthButton
        content="Vui lòng đăng nhập tài khoản để bình luận!"
        rightButton="Đăng nhập"
        onClickRightButton={handleAccept}
        leftButton="Đóng"
        onClickLeftButton={handleClose}
      />
    </>
  )
}

export default createComponentWithAuth(CommentBox)
