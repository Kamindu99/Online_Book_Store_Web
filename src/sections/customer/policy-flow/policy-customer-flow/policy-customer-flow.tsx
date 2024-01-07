import { ReactNode, useEffect, useState } from 'react';

// material-ui
import { Alert, Button, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';

// project imports
import AnimateButton from 'components/@extended/AnimateButton';
import ApplicantForm, { ApplicantData } from './ApplicantForm';
import CertificateForm, { CertificateData } from './CertificateForm';
import DocumentForm, { DocumentData } from './DocumentForm';
import PaymentForm, { PaymentData } from './PaymentForm';

// step options
const steps = ['Applicant Details', 'Document Details', 'Payment Details', 'Certificate'];

const getStepContent = (
    step: number,
    handleNext: () => void,
    handleBack: () => void,
    setErrorIndex: (i: number | null) => void,
    applicantData: ApplicantData,
    setApplicantData: (d: ApplicantData) => void,
    documentData: DocumentData,
    setDocumentData: (d: DocumentData) => void,
    certificateData: CertificateData,
    setCertificateData: (d: CertificateData) => void,
    paymentData: PaymentData,
    setPaymentData: (d: PaymentData) => void
) => {
    switch (step) {
        case 0:
            return (
                <ApplicantForm
                    handleNext={handleNext}
                    setErrorIndex={setErrorIndex}
                    applicantData={applicantData}
                    setApplicantData={setApplicantData}
                />
            );
        case 1:
            return (
                <DocumentForm
                    handleNext={handleNext}
                    handleBack={handleBack}
                    setErrorIndex={setErrorIndex}
                    documentData={documentData}
                    setDocumentData={setDocumentData}
                />
            );
        case 2:
            return (
                <PaymentForm
                    handleNext={handleNext}
                    handleBack={handleBack}
                    setErrorIndex={setErrorIndex}
                    paymentData={paymentData}
                    setPaymentData={setPaymentData}
                />
            );
        case 3:
            return (
                <CertificateForm
                    handleNext={handleNext}
                    handleBack={handleBack}
                    setErrorIndex={setErrorIndex}
                    certificateData={certificateData}
                    setCertificateData={setCertificateData}
                />
            );
        default:
            throw new Error('Unknown step');
    }
};

// ==============================|| POLICY CUSTOMER FLOW ||============================== //

const PolicyCustomerFlow = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const [activeStep, setActiveStep] = useState(0);
    const [applicantData, setApplicantData] = useState<ApplicantData>({});
    const [documentData, setDocumentData] = useState({});
    const [paymentData, setPaymentData] = useState({});
    const [certificateData, setCertificateData] = useState({});
    const [errorIndex, setErrorIndex] = useState<number | null>(null);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        setErrorIndex(null);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        // Add an event listener to listen for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {activeStep === steps.length ?
                <Stepper activeStep={activeStep} sx={{}}>
                    {steps.map((label, index) => {
                        const labelProps: { error?: boolean; optional?: ReactNode } = {};

                        if (index === errorIndex) {
                            labelProps.optional = (
                                <Typography variant="caption" color="error">
                                    Error
                                </Typography>
                            );

                            labelProps.error = true;
                        }

                        if (index === activeStep) {
                            return (
                                <Step key={label}>
                                    <StepLabel {...labelProps}> {label}</StepLabel>
                                </Step>
                            );
                        }
                    })}
                </Stepper>
                :
                <Stepper activeStep={activeStep} sx={{ pt: 0, pb: 5 }}>
                    {steps.map((label, index) => {
                        const labelProps: { error?: boolean; optional?: ReactNode } = {};

                        if (index === errorIndex) {
                            labelProps.optional = (
                                <Typography variant="caption" color="error">
                                    Error
                                </Typography>
                            );

                            labelProps.error = true;
                        }

                        if (screenWidth < 500) {
                            if (index === activeStep) {
                                return (
                                    <Step key={label}>
                                        <StepLabel {...labelProps}> {label}</StepLabel>
                                    </Step>
                                );
                            }
                        } else {
                            return (
                                <Step key={label}>
                                    <StepLabel {...labelProps}> {label}</StepLabel>
                                </Step>
                            );
                        }
                    })}
                </Stepper>}
            <>
                {activeStep === steps.length ? (
                    <>
                        <Alert severity='warning'>Policy Flow Completed ...</Alert>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                        setApplicantData({});
                                        setDocumentData({})
                                        setPaymentData({});
                                        setActiveStep(0);
                                    }}
                                    sx={{ my: 3, ml: 1 }}
                                >
                                    Reset
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </>
                ) : (
                    <>
                        {getStepContent(activeStep, handleNext, handleBack, setErrorIndex, applicantData, setApplicantData, documentData, setDocumentData, paymentData, setPaymentData, certificateData, setCertificateData)}
                        {activeStep === steps.length - 1 && (
                            <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                <AnimateButton>
                                    <Button variant="contained" onClick={handleNext} sx={{ my: 3, ml: 1 }}>
                                        {activeStep === steps.length - 1 ? 'Complete' : 'Save & Next'}
                                    </Button>
                                </AnimateButton>
                            </Stack>
                        )}
                    </>
                )}
            </>
        </>
    );
};

export default PolicyCustomerFlow;
