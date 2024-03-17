const documentHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
};

const handleInternalLinks = () => {
    const anchorTags = document.querySelectorAll(".nav-item");
    anchorTags.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const href = link.getAttribute("href");
            // const offset = document.querySelector(".header").offsetHeight;
            const elementPosition = document.querySelector(href).getBoundingClientRect().top;
            // const offsetPosition = elementPosition + window.scrollY - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: "smooth"
            });
        });
    });
};

// const marquee = () => {
//     const marquee = document.querySelectorAll(".marquee-part");
//     marquee.forEach(el => {
//         let rate = 70;
//         let distance = el.clientWidth;
//         let style = window.getComputedStyle(el);
//         let marginRight = parseInt(style.marginRight) || 0;
//         let totalDistance = distance + marginRight;
//         let time = totalDistance / rate;
//         let container = el.parentElement;
//         gsap.to(container, time, {
//             repeat: -1,
//             x: '-' + totalDistance,
//             ease: Linear.easeNone,
//         });
//     });
// };

window.addEventListener("load", () => {
    documentHeight();
    // handleInternalLinks();
});

window.addEventListener("resize", () => {
    documentHeight();
});
