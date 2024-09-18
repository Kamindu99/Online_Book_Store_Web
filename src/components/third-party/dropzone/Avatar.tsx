import { CameraOutlined } from '@ant-design/icons';
import { Button, Dialog, DialogActions, Stack, SxProps, Theme, Typography } from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import imageCompression from 'browser-image-compression';
import { useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import Cropper from 'react-easy-crop';
import { CustomFile } from 'types/dropzone';
import { getCroppedImg } from './cropImage'; // Make sure this is the correct path
import RejectionFiles from './RejectionFiles';

const RootWrapper = styled('div')(({ theme }) => ({
  width: 124,
  height: 124,
  borderRadius: '50%',
  border: `1px dashed ${theme.palette.primary.main}`,
  background: theme.palette.primary.lighter
}));

const DropzoneWrapper = styled('div')({
  zIndex: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '50%',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { width: '100%', height: '100%' },
  '&:hover': {
    cursor: 'pointer',
    '& .placeholder': {
      zIndex: 9
    }
  }
});

const PlaceholderWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: alpha(theme.palette.primary.lighter, 0.75),
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&:hover': { opacity: 0.85 }
}));

interface UploadProps extends DropzoneOptions {
  error?: boolean;
  file: string | null;
  setFieldValue: (field: string, value: any) => void;
  sx?: SxProps<Theme>;
}

const AvatarUpload = ({ error, file, setFieldValue, sx, ...other }: UploadProps) => {
  const theme = useTheme();
  const [imageSrc, setImageSrc] = useState<string | null>(null); // Store image URL
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropOpen, setIsCropOpen] = useState(false); // Flag to show crop dialog

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    accept: {
      'image/*': []
    },
    multiple: false,
    onDrop: async (acceptedFiles: CustomFile[]) => {
      const file = acceptedFiles[0];

      try {
        const reader = new FileReader();

        reader.onloadend = () => {
          setImageSrc(reader.result as string); // Set the selected image for cropping
          setIsCropOpen(true); // Open crop modal
        };

        reader.readAsDataURL(file); // Convert compressed file to Base64
      } catch (error) {
        console.error('Image compression error:', error);
      }
    }
  });

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const blobToFile = (blob: Blob, fileName: string): File => {
    return new File([blob], fileName, { type: blob.type, lastModified: Date.now() });
  };

  const handleCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels); // Get cropped image
      const response = await fetch(croppedImageUrl);
      const croppedImageBlob = await response.blob();

      // Compress the cropped image
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 360,
        useWebWorker: true
      };
      // Convert the base64 string to a Blob
      const croppedImageFile = blobToFile(croppedImageBlob, 'croppedImage.jpg');

      const compressedFile = await imageCompression(croppedImageFile, options);

      // Convert compressed image to Base64
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFieldValue('imageUrl', base64String); // Set cropped image as base64 string in form field
        setIsCropOpen(false); // Close crop modal
      };

    } catch (error) {
      console.error('Cropping error:', error);
    }
  };

  const thumbs =
    file && (
      <img
        key={'file.preview'}
        alt={'file.name'}
        src={file}
        onLoad={() => {
          URL.revokeObjectURL(file);
        }}
      />
    );

  return (
    <>
      <RootWrapper
        sx={{
          ...((isDragReject || error) && {
            borderColor: 'error.light'
          }),
          ...sx
        }}
      >
        <DropzoneWrapper {...getRootProps()} sx={{ ...(isDragActive && { opacity: 0.6 }) }}>
          <input {...getInputProps()} />
          {thumbs}
          <PlaceholderWrapper
            className="placeholder"
            sx={{
              ...(thumbs && {
                opacity: 0,
                color: 'common.white',
                bgcolor: 'grey.900'
              }),
              ...((isDragReject || error) && {
                bgcolor: 'error.lighter'
              })
            }}
          >
            <Stack spacing={0.5} alignItems="center">
              <CameraOutlined style={{ color: theme.palette.secondary.main, fontSize: '2rem' }} />
              <Typography color="secondary">{file ? 'Update' : 'Upload'}</Typography>
            </Stack>
          </PlaceholderWrapper>
        </DropzoneWrapper>
      </RootWrapper>

      {/* Crop Modal */}
      {isCropOpen && (
        <Dialog open={isCropOpen} onClose={() => setIsCropOpen(false)} maxWidth="sm" fullWidth>
          <div style={{ position: 'relative', width: '100%', height: 400 }}>
            <Cropper
              image={imageSrc as string}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <DialogActions>
            <Button onClick={() => setIsCropOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleCrop} color="primary">
              Crop
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
    </>
  );
};

export default AvatarUpload;
