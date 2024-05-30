import React from "react"
import { styled, keyframes } from "@mui/system"

const blink = keyframes`
  0%, 80%, 100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
`

const DotContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
})

interface DotProps {
  delay: string
}

const Dot = styled("div")<DotProps>(({ delay }) => ({
  width: 10,
  height: 10,
  margin: "0 5px",
  backgroundColor: "#3977ce",
  borderRadius: "50%",
  animation: `${blink} 1.4s infinite both`,
  animationDelay: delay,
}))

const LoadingWithDots: React.FC = () => (
  <DotContainer>
    <Dot delay="0s" />
    <Dot delay="0.2s" />
    <Dot delay="0.4s" />
  </DotContainer>
)

export default LoadingWithDots
