// material-ui
import { Box, Button, Stack, SxProps } from '@mui/material';
import { styled, Theme, useTheme } from '@mui/material/styles';
// third-party
import { DropzoneOptions, useDropzone } from 'react-dropzone';

// project import
import imageCompression from 'browser-image-compression';
import PlaceholderContent from './PlaceholderContent';
import RejectionFiles from './RejectionFiles';

// types
import { CustomFile } from 'types/dropzone';

const DropzoneWrapper = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.secondary.main}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' }
}));

// ==============================|| UPLOAD - SINGLE FILE ||============================== //

export interface UploadProps extends DropzoneOptions {
  error?: boolean;
  file: string | null;
  setFieldValue: (field: string, value: any) => void;
  sx?: SxProps<Theme>;
}

const SingleFileUpload = ({ error, file, setFieldValue, sx, ...other }: UploadProps) => {
  const theme = useTheme();

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    accept: {
      'image/*': []
    },
    multiple: false,
    onDrop: async (acceptedFiles: CustomFile[]) => {
      const file = acceptedFiles[0]; // Assuming only one file is accepted

      try {
        // Define compression options
        const options = {
          maxSizeMB: 1, // Max size in MB
          maxWidthOrHeight: 360,
          useWebWorker: true
        };

        // Compress the image
        const compressedFile = await imageCompression(file, options);

        // Create a FileReader to read the compressed image
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result; // This is the Base64-encoded string
          setFieldValue('imageUrl', base64String); // Set Base64 string to form field
        };

        reader.readAsDataURL(compressedFile); // Convert compressed file to Base64
      } catch (error) {
        console.error('Image compression error:', error);
      }
    }
  });

  const thumbs =
    file &&
    <img
      key={'file.preview'}
      alt={'file.name'}
      src={file}
      style={{
        top: 8,
        left: 8,
        borderRadius: 2,
        position: 'absolute',
        width: 'calc(100% - 16px)',
        height: 'calc(100% - 16px)',
        background: theme.palette.background.paper
      }}
      onLoad={() => {
        URL.revokeObjectURL(file);
      }}
    />

  const onRemove = () => {
    setFieldValue('files', null);
  };

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropzoneWrapper
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter'
          }),
          ...(file && {
            padding: '12% 0'
          })
        }}
      >
        <input {...getInputProps()} />
        <PlaceholderContent />
        {thumbs}
      </DropzoneWrapper>

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

      {file && file.length > 0 && (
        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 1.5 }}>
          <Button variant="contained" color="error" onClick={onRemove}>
            Remove
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default SingleFileUpload;

