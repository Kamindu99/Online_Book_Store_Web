// material-ui
import { CloudDownloadOutlined, EyeTwoTone } from '@ant-design/icons';
import { Grid, IconButton, Stack, Tooltip, useTheme } from '@mui/material';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project imports
import policyTemporaryCoverNote from "assets/images/customer/policy-temporary-cover-note.png";

const validationSchema = yup.object({
    field1: yup.string().required('Field 1 is required'),
});

// ==============================|| VALIDATION WIZARD - PAYMENT ||============================== //

export type CertificateData = {
    field1?: string;
};

interface CertificateFormProps {
    certificateData: CertificateData;
    setCertificateData: (d: CertificateData) => void;
    handleNext: () => void;
    handleBack: () => void;
    setErrorIndex: (i: number | null) => void;
}

const CertificateForm = ({ certificateData, setCertificateData, handleNext, handleBack, setErrorIndex }: CertificateFormProps) => {
    const theme = useTheme();

    const formik = useFormik({
        initialValues: {
            field1: certificateData.field1,
        },
        validationSchema,
        onSubmit: (values) => {
            setCertificateData({
                field1: values.field1,
            });
            handleNext();
        }
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Stack direction="row" justifyContent={'end'}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Stack direction="row" justifyContent={'flex-end'} >
                                    <Tooltip title="View Policy">
                                        <IconButton
                                            style={{ border: '1px solid #000', margin: '5px', fontSize: "20px" }}
                                            color="error"
                                            onClick={() => { }}
                                        >
                                            <EyeTwoTone twoToneColor={theme.palette.error.main} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Download Policy">
                                        <IconButton
                                            style={{ border: '1px solid #000', margin: '5px', fontSize: "20px" }}
                                            color="primary"
                                            onClick={() => { }}
                                        >
                                            <CloudDownloadOutlined twoToneColor={theme.palette.primary.main} />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </div>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <img src={policyTemporaryCoverNote} alt='Policy-Temporary-Cover-Note' style={{ width: "100%" }} />
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

export default CertificateForm;
