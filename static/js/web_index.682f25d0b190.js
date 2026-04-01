// Initialize carousel immediately for better LCP
function initCarousel() {
    var carouselElement = document.getElementById('carousel');
    if (carouselElement && typeof bootstrap !== 'undefined') {
        var carousel = new bootstrap.Carousel(carouselElement, {
            interval: 5000,
            wrap: true
        });
    }
}

// Defer non-critical initialization
function initSwiper() {
    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 10,
        slidesPerView: 'auto',
        loop: true,
        loopAdditionalSlides: 1,
        watchSlidesProgress: true,
        autoplay: {
            delay: 2000,
            pauseOnMouseEnter: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    document.querySelectorAll('.index-video').forEach(element => {
        element.addEventListener('click', () => {
            swiper.autoplay.stop();
            let url = element.dataset.url;
            if (url) {
                url = url.split('v=')[1];
                var modalContent = document.querySelector('#modalForVideo .modal-content');
                if (modalContent) {
                    modalContent.innerHTML = `<iframe src="https://www.youtube.com/embed/${url}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
                }
            }
        });
    });

    var modalForVideo = document.querySelector('#modalForVideo');
    if (modalForVideo) {
        modalForVideo.addEventListener('hide.bs.modal', () => {
            var modalContent = document.querySelector('#modalForVideo .modal-content');
            if (modalContent) {
                modalContent.innerHTML = '';
            }
            if (swiper) {
                swiper.autoplay.start();
            }
        });
    }
}

// Background image loader
function loadBackgroundImage() {
    let index_about = document.querySelector('.index-about-background');
    if (index_about && index_about.dataset && index_about.dataset.bgimg) {
        let bgimg = index_about.dataset.bgimg;
        var elements = document.getElementsByClassName('index-about-background');
        if (elements && elements.length > 0) {
            elements[0].style.backgroundImage = `url(${location.origin + bgimg})`;
        }
    }
}

// Initialize carousel immediately when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
} else {
    initCarousel();
}

// Defer non-critical initialization until after load
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        initSwiper();
        loadBackgroundImage();
    }, { timeout: 2000 });
} else {
    window.addEventListener('load', () => {
        setTimeout(() => {
            initSwiper();
            loadBackgroundImage();
        }, 0);
    });
}
