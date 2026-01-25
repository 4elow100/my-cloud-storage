import {
  faFile,
  faFilePdf,
  faFileImage,
  faFileWord,
  faFileExcel,
  faFileAudio,
  faFileVideo,
  faFileArchive,
} from '@fortawesome/free-solid-svg-icons'

const FILE_ICONS = {
  pdf: faFilePdf,

  jpg: faFileImage,
  jpeg: faFileImage,
  png: faFileImage,
  gif: faFileImage,
  webp: faFileImage,

  doc: faFileWord,
  docx: faFileWord,

  xls: faFileExcel,
  xlsx: faFileExcel,

  mp3: faFileAudio,
  wav: faFileAudio,

  mp4: faFileVideo,
  mkv: faFileVideo,

  zip: faFileArchive,
  rar: faFileArchive,
  '7z': faFileArchive,
}

const getFileExtension = (filename = '') => {
  const parts = filename.split('.')
  return parts.length > 1 ? parts.pop().toLowerCase() : ''
}

export const getFileIcon = filename => {
  const ext = getFileExtension(filename)
  return FILE_ICONS[ext] || faFile
}
