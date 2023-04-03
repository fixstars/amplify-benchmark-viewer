import { useRef, useState } from 'react'

import DriveFolderUploadRoundedIcon from '@mui/icons-material/DriveFolderUploadRounded'
import { Typography } from '@mui/material'
import { styled, keyframes } from '@mui/system'

import { Loading } from '../Loading'

const Container = styled('div')`
  flex: 1;
  display: flex;
`

const progressAnimation = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -70px 0;
  }
`

const DropArea = styled('div')<{ readonly isDragOver?: boolean }>`
  flex: 1;
  margin: 10px;
  padding: 10px;
  border: dashed;
  cursor: pointer;
  border-color: rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation: ${progressAnimation} 2s linear infinite !important;

  ${(props) =>
    props.isDragOver === true &&
    `
    border: solid;
    border-color: #7986cb;
    background-size: 150% 100%;
    background-image: repeating-linear-gradient(
      -45deg,
      #fff,
      #fff 25px,
      rgba(0, 0, 0, 0.12) 25px,
      rgba(0, 0, 0, 0.12) 50px
    );
  `}
`

interface Props {
  readonly onLoad?: (data: unknown) => void
}

export const JsonFileUploader = ({ onLoad }: Props) => {
  const inputFile = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const label = isLoading
    ? 'Loading...'
    : 'Drag and drop the JSON file here or click'

  const loadFile = (file: Blob) => {
    setIsLoading(true)
    const fr = new FileReader()

    fr.onload = (event) => {
      if (
        typeof event.target?.result === 'string' &&
        typeof onLoad === 'function'
      ) {
        onLoad(JSON.parse(event.target.result))
      }
      setIsLoading(false)
    }

    fr.readAsText(file)
  }

  const handleClick = () => {
    inputFile.current?.click()
  }

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) loadFile(e.target.files[0])
  }

  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDropFile = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files.length !== 0) {
      Array.from(e.dataTransfer.files).forEach((file) => {
        loadFile(file)
      })
    }
  }

  return (
    <Container>
      <DropArea
        isDragOver={isDragOver}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDropFile}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={inputFile}
          accept=".json"
          type="file"
          style={{ display: 'none' }}
          onChange={handleChangeFile}
        />
        <Typography variant="h5">{label}</Typography>
        {isLoading ? (
          <div style={{ marginTop: '15px' }}>
            <Loading />
          </div>
        ) : (
          <DriveFolderUploadRoundedIcon
            data-testid="upload-icon"
            fontSize="large"
            sx={{ marginTop: '20px' }}
          />
        )}
      </DropArea>
    </Container>
  )
}
