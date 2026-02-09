import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const downloadPDF = async (elementId, fileName = 'invitation.pdf') => {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        await document.fonts.ready; // Ensure all fonts are loaded
        const canvas = await html2canvas(element, {
            scale: 2, // High resolution
            useCORS: true, // Handle images from external sources
            logging: true,
            imageTimeout: 90000,
            backgroundColor: '#ffffff',
            windowWidth: 500,
            windowHeight: 700,
            onclone: (clonedDoc) => {
                const el = clonedDoc.getElementById(elementId);
                if (el) {
                    // Reset scaling on the element and its direct parents
                    el.style.transform = 'none';
                    el.style.margin = '0';
                    el.style.position = 'relative';
                    el.style.top = '0';
                    el.style.left = '0';
                    el.style.visibility = 'visible';
                    el.style.display = 'block';

                    if (el.parentElement) {
                        el.parentElement.style.transform = 'none';
                        el.parentElement.style.padding = '0';
                        el.parentElement.style.margin = '0';
                        el.parentElement.style.display = 'block';
                        el.parentElement.style.visibility = 'visible';
                        if (el.parentElement.parentElement) {
                            el.parentElement.parentElement.style.transform = 'none';
                            el.parentElement.parentElement.style.display = 'block';
                            el.parentElement.parentElement.style.visibility = 'visible';
                        }
                    }

                    const images = el.getElementsByTagName('img');
                    for (let img of images) {
                        img.crossOrigin = 'anonymous';
                        if (!img.complete) {
                            img.loading = 'eager';
                        }
                    }

                    const problematicElements = el.querySelectorAll('*');
                    problematicElements.forEach(item => {
                        const style = window.getComputedStyle(item);

                        // Force visibility for everything
                        item.style.visibility = 'visible';

                        // Detect and remove backdrop filters (often used for blurs)
                        if (style.backdropFilter && style.backdropFilter !== 'none') {
                            item.style.backdropFilter = 'none';
                        }

                        // Detect and remove blend modes (often used for noise/overlays)
                        if (style.mixBlendMode && style.mixBlendMode !== 'normal') {
                            item.style.mixBlendMode = 'normal';
                        }

                        // Detect and remove filters (like drop-shadow or grayscale)
                        if (style.filter && style.filter !== 'none') {
                            item.style.filter = 'none';
                        }

                        // Remove box-shadow which can be a heavy rendering burden or cause hangups
                        if (style.boxShadow && style.boxShadow !== 'none') {
                            item.style.boxShadow = 'none';
                        }

                        // Detect and remove radial-gradients which html2canvas 1.4.1 often fails to render
                        if (style.backgroundImage && style.backgroundImage.includes('radial-gradient')) {
                            item.style.backgroundImage = 'none';
                        }

                        // Remove noise texture data-url if it exists
                        if (style.backgroundImage && style.backgroundImage.includes('data:image/svg+xml')) {
                            item.style.backgroundImage = 'none';
                        }
                    });
                }
            }
        });

        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height] // Match canvas dimensions for high quality
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(fileName);
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
};

export const downloadPNG = async (elementId, fileName = 'invitation.png') => {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        await document.fonts.ready;
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            allowTaint: false, // Prevent issues with cross-origin images
            logging: true,
            backgroundColor: '#ffffff', // Force white background for PNG capture
            imageTimeout: 90000, // 90 seconds
            windowWidth: 500,
            windowHeight: 700,
            onclone: (clonedDoc) => {
                const el = clonedDoc.getElementById(elementId);
                if (el) {
                    // Reset scaling on the element and its direct parents
                    el.style.transform = 'none';
                    el.style.margin = '0';
                    el.style.position = 'relative';
                    el.style.top = '0';
                    el.style.left = '0';
                    el.style.visibility = 'visible';
                    el.style.display = 'block';

                    if (el.parentElement) {
                        el.parentElement.style.transform = 'none';
                        el.parentElement.style.padding = '0';
                        el.parentElement.style.margin = '0';
                        el.parentElement.style.display = 'block';
                        el.parentElement.style.visibility = 'visible';
                        if (el.parentElement.parentElement) {
                            el.parentElement.parentElement.style.transform = 'none';
                            el.parentElement.parentElement.style.display = 'block';
                            el.parentElement.parentElement.style.visibility = 'visible';
                        }
                    }

                    const images = el.getElementsByTagName('img');
                    for (let img of images) {
                        img.crossOrigin = 'anonymous';
                        if (!img.complete) {
                            img.loading = 'eager';
                        }
                    }

                    const problematicElements = el.querySelectorAll('*');
                    problematicElements.forEach(item => {
                        const style = window.getComputedStyle(item);

                        item.style.visibility = 'visible';

                        if (style.backdropFilter && style.backdropFilter !== 'none') {
                            item.style.backdropFilter = 'none';
                        }
                        if (style.mixBlendMode && style.mixBlendMode !== 'normal') {
                            item.style.mixBlendMode = 'normal';
                        }
                        if (style.filter && style.filter !== 'none') {
                            item.style.filter = 'none';
                        }
                        if (style.boxShadow && style.boxShadow !== 'none') {
                            item.style.boxShadow = 'none';
                        }
                        if (style.backgroundImage && style.backgroundImage.includes('radial-gradient')) {
                            item.style.backgroundImage = 'none';
                        }
                        if (style.backgroundImage && style.backgroundImage.includes('data:image/svg+xml')) {
                            item.style.backgroundImage = 'none';
                        }
                    });
                }
            }
        });

        const link = document.createElement('a');
        link.download = fileName;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
        return true; // Success
    } catch (error) {
        console.error('Error generating PNG:', error);
        throw error;
    }
};
