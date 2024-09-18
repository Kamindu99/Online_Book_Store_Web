export const getCroppedImg = (
    imageSrc: string,
    croppedAreaPixels: { x: number; y: number; width: number; height: number }
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                return reject(new Error('Canvas context not found'));
            }

            canvas.width = croppedAreaPixels.width;
            canvas.height = croppedAreaPixels.height;

            ctx.drawImage(
                image,
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height,
                0,
                0,
                croppedAreaPixels.width,
                croppedAreaPixels.height
            );

            canvas.toBlob((blob) => {
                if (!blob) {
                    return reject(new Error('Canvas is empty'));
                }
                const fileUrl = URL.createObjectURL(blob);
                resolve(fileUrl); // Resolve with the cropped image URL
            }, 'image/jpeg');
        };
        image.onerror = (error) => reject(error);
    });
};
