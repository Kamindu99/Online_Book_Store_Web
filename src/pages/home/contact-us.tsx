// material-ui
import { Container, Grid } from '@mui/material';
import ContactForm from 'sections/home/contact-us/ContactForm';
import ContactHeader from 'sections/home/contact-us/ContactHeader';

// ==============================|| Contact Us ||============================== //

const ContactUs = () => {

    return (
        <Grid container spacing={12} justifyContent="center" alignItems="center" sx={{ mb: 12 }}>
            <Grid item xs={12} md={12}>
                <ContactHeader />
            </Grid>
            <Grid item xs={12} sm={10} lg={9}>
                <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
                    <ContactForm />
                </Container>
            </Grid>
        </Grid>
    );
}

export default ContactUs;
