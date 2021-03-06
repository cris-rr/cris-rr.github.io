const images = document.querySelectorAll('img[data-src]')

const getImage = (img) => {
    const src = img.getAttribute("data-src");
    if (!src) {
        return
    } else {
        img.src = src;
        img.onload = () => {
            img.removeAttribute('data-src')
        }
    }
}

const imgOptions = {
    threshold: 0.75,
    rootMargin: "0px 50% 0px 0px"
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return
        } else {
            getImage(entry.target)
            imgObserver.unobserve(entry.target);
        }
    })
}, imgOptions);

images.forEach(image => {
    imgObserver.observe(image);
});