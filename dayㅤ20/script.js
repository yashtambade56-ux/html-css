
    document.addEventListener('DOMContentLoaded', function () {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (el) { return new bootstrap.Tooltip(el); });
    });

    let slideIndex = 0;
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".dot");

    function showSlides(n) {
        if (n >= slides.length) slideIndex = 0;
        else if (n < 0) slideIndex = slides.length - 1;
        else slideIndex = n;

        slides.forEach(s => s.classList.remove("active"));
        dots.forEach(d => d.classList.remove("active-dot"));
        
        slides[slideIndex].classList.add("active");
        dots[slideIndex].classList.add("active-dot");
    }

    function changeSlide(n) { showSlides(slideIndex + n); }
    function currentSlide(n) { showSlides(n); }
    setInterval(() => { changeSlide(1); }, 6000);

    const alertPlaceholder = document.getElementById('alertPlaceholder');
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible fade show glass-card shadow-lg" role="alert">`,
            `   <div class="fw-bold">${message}</div>`,
            '   <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert"></button>',
            '</div>'
        ].join('');
        alertPlaceholder.append(wrapper);
        setTimeout(() => {
            const bsAlert = bootstrap.Alert.getOrCreateInstance(wrapper.querySelector('.alert'));
            if(bsAlert) bsAlert.close();
        }, 5000);
    }

    const buyBtns = document.querySelectorAll('.buy-btn');
    const toastEl = document.getElementById('statusToast');
    const statusToast = new bootstrap.Toast(toastEl);

    buyBtns.forEach(btn => {
        btn.addEventListener('click', () => { statusToast.show(); });
    });

    const form = document.getElementById('axonForm');
    form.addEventListener('submit', function (e) {
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();
            appendAlert('Thank you. A consultant will contact you shortly.', 'success');
            form.reset();
            form.classList.remove('was-validated');
        }
        form.classList.add('was-validated');
    });
