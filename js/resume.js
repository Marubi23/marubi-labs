/**
 * ============================================
 * RESUME PAGE FUNCTIONALITY
 * CLEAN VERSION - Just the resume, no extra backgrounds
 * Author: Felix Marubi
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Resume page initialized');
    
    // Initialize mobile accordion
    initMobileAccordion();
    
    // Initialize download buttons
    initDownloadButtons();
    
    // Initialize back to top
    initBackToTop();
});

/**
 * Mobile Accordion Functionality
 */
function initMobileAccordion() {
    if (window.innerWidth > 768) return;
    
    const blockTitles = document.querySelectorAll('.block-title');
    
    blockTitles.forEach(title => {
        const block = title.closest('.resume-block');
        const content = block.querySelector('.block-content');
        
        if (!content) return;
        
        content.classList.remove('show');
        
        title.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            content.classList.toggle('show');
        });
    });
}

/**
 * Download PDF Function - CLEAN VERSION
 */
function downloadPDF() {
    const element = document.getElementById('resume-content');
    
    if (!element) {
        alert('Resume content not found');
        return;
    }
    
    // Show loading state
    const btn = event?.target?.closest('button');
    if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
        btn.disabled = true;
    }
    
    // Expand all sections for PDF
    const hiddenContents = document.querySelectorAll('.block-content');
    hiddenContents.forEach(el => {
        el.style.maxHeight = 'none';
        el.style.overflow = 'visible';
    });
    
    // Simple PDF options - just make it fit, no extra styling
    const opt = {
        margin:        [0.3, 0.3, 0.3, 0.3],
        filename:      'Felix_Marubi_Resume.pdf',
        image:         { type: 'jpeg', quality: 0.98 },
        html2canvas:   { 
            scale: 1.2,
            backgroundColor: null // Let it use original colors
        },
        jsPDF:         { 
            unit: 'in', 
            format: 'a4', 
            orientation: 'portrait'
        }
    };
    
    // Generate PDF directly - no extra styling, just the resume as-is
    html2pdf().set(opt).from(element).save()
        .then(() => {
            console.log('PDF generated');
            
            // Restore original state
            hiddenContents.forEach(el => {
                el.style.maxHeight = '';
                el.style.overflow = '';
            });
            
            if (btn) {
                btn.innerHTML = '<i class="fas fa-file-pdf"></i> Download PDF';
                btn.disabled = false;
            }
        })
        .catch(error => {
            console.error('PDF error:', error);
            alert('Error generating PDF. Please try again.');
            
            hiddenContents.forEach(el => {
                el.style.maxHeight = '';
                el.style.overflow = '';
            });
            
            if (btn) {
                btn.innerHTML = '<i class="fas fa-file-pdf"></i> Download PDF';
                btn.disabled = false;
            }
        });
}

/**
 * Download HTML Function - CLEAN VERSION
 */
function downloadHTML() {
    const element = document.getElementById('resume-content');
    
    if (!element) {
        alert('Resume content not found');
        return;
    }
    
    const btn = event?.target?.closest('button');
    if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating HTML...';
        btn.disabled = true;
    }
    
    const contentHTML = element.outerHTML;
    
    // Simple HTML - just the resume, no extra backgrounds
    const fullHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Felix Marubi - Resume</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="css/pages/home.css">
    <link rel="stylesheet" href="css/pages/resume.css">
</head>
<body>
    <div class="container">
        ${contentHTML}
    </div>
</body>
</html>`;
    
    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Felix_Marubi_Resume.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    if (btn) {
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-code"></i> Download Web Version';
            btn.disabled = false;
        }, 1000);
    }
}

/**
 * Initialize Download Buttons
 */
function initDownloadButtons() {
    const pdfButtons = document.querySelectorAll('#downloadPDFBtn, #downloadPDFBtn2');
    pdfButtons.forEach(btn => {
        btn.addEventListener('click', downloadPDF);
    });
    
    const htmlButtons = document.querySelectorAll('#downloadHTMLBtn, #downloadHTMLBtn2');
    htmlButtons.forEach(btn => {
        btn.addEventListener('click', downloadHTML);
    });
}

/**
 * Initialize Back to Top Button
 */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}