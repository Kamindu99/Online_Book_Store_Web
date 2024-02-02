// material-ui
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material';

//third-party
import { DropzoneOptions } from 'react-dropzone';

// ==============================|| TYPES - DROPZONE  ||============================== //

export enum DropzopType {
  default = 'DEFAULT',
  standard = 'STANDARD'
}

export interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: Date;
}


export interface UploadMultiFileProps extends DropzoneOptions {
  files?: CustomFile[] | null;
  error?: boolean;
  showList?: boolean;
  type?: DropzopType;
  sx?: SxProps<Theme>;
  onUpload?: VoidFunction;
  onRemove?: (file: File | string) => void;
  onRemoveAll?: VoidFunction;
  setFieldValue: (field: string, value: any) => void;
}

export interface FilePreviewProps {
  showList?: boolean;
  type?: DropzopType;
  files: (File | string)[];
  onRemove?: (file: File | string) => void;
}
