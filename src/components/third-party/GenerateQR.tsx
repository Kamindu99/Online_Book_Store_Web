import { Theme, useMediaQuery } from '@mui/material';
import QRCode from 'react-qr-code';

const QrGenerator = ({ qrValue }: { qrValue: string }) => {

    // const handleDownload = () => {
    //     const svg = document.getElementById('qr-gen')?.querySelector('svg');

    //     if (svg) {
    //         // Create a canvas to draw the SVG on
    //         const canvas = document.createElement('canvas');
    //         const ctx = canvas.getContext('2d');

    //         // Set the margin and the QR code size
    //         const margin = 20;
    //         const svgRect = svg.getBoundingClientRect();
    //         const canvasWidth = svgRect.width + margin * 2; // Width + left and right margin
    //         const canvasHeight = svgRect.height + margin * 2; // Height + top and bottom margin

    //         // Set the canvas size
    //         canvas.width = canvasWidth;
    //         canvas.height = canvasHeight;

    //         // Check if context is available before using it
    //         if (ctx) {
    //             // Fill the canvas with a white background
    //             ctx.fillStyle = 'white';
    //             ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    //             // Create an image from the SVG
    //             const svgData = new XMLSerializer().serializeToString(svg);
    //             const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    //             const url = URL.createObjectURL(svgBlob);
    //             const img = new Image();

    //             img.onload = () => {
    //                 // Draw the SVG onto the canvas with the margin
    //                 ctx.drawImage(img, margin, margin);

    //                 // Convert the canvas content to a JPEG data URL
    //                 const jpegDataUrl = canvas.toDataURL('image/jpeg', 1.0); // Quality set to 1.0 (maximum)

    //                 // Create a link to download the JPEG image
    //                 const a = document.createElement('a');
    //                 a.href = jpegDataUrl;
    //                 a.download = 'qrcode.jpg'; // Download as JPEG file
    //                 document.body.appendChild(a);
    //                 a.click();
    //                 document.body.removeChild(a);

    //                 // Release the object URL after download
    //                 URL.revokeObjectURL(url);
    //             };

    //             // Set the image source to the URL representing the SVG Blob
    //             img.src = url;
    //         } else {
    //             console.error("Canvas context not found!");
    //         }
    //     } else {
    //         console.error("SVG element not found!");
    //     }
    // };

    const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    return (
        <div id="qr-gen"
        // style={{ cursor: 'pointer' }}
        // onClick={handleDownload}
        >
            <QRCode value={qrValue} size={xs ? 40 : 60} />
        </div>
    );
};

export default QrGenerator;
