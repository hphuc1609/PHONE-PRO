import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import React from "react"

interface Props {
  open: boolean
  handleClose: () => void
  title?: string
  content: React.ReactNode
  leftButton?: string
  rightButton?: string
  fullWidthButton?: boolean
  onClickLeftButton?: () => void
  onClickRightButton?: () => void
}

const AlertDialog = ({
  open,
  handleClose,
  title,
  content,
  leftButton,
  rightButton,
  fullWidthButton = false,
  onClickLeftButton,
  onClickRightButton,
}: Props) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {leftButton && (
            <Button
              variant="outlined"
              color="primary"
              fullWidth={fullWidthButton}
              onClick={onClickLeftButton}
            >
              {leftButton}
            </Button>
          )}
          {rightButton && (
            <Button
              variant="contained"
              color="primary"
              fullWidth={fullWidthButton}
              onClick={onClickRightButton}
            >
              {rightButton}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AlertDialog
