gsap.registerPlugin(ScrollTrigger);


const documentHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
};

const handleInternalLinks = () => {
    const anchorTags = document.querySelectorAll(".js-href");
    anchorTags.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const href = link.getAttribute("href");
            document.querySelector(href).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
};

// const handleScrolledElements = () => {
//     const header = document.querySelector(".header-text");
//     gsap.set(header, {
//         scale: 1.4,
//         duration: 0.5,
//     });
//     window.addEventListener("scroll", () => {
//         let lastScrollTop = 40;
//         let scrollTop = window.scrollY || document.documentElement.scrollTop;
//         if (scrollTop < lastScrollTop) {
//             gsap.to(header, {
//                 scale: 1.4,
//                 duration: 0.25,
//             });
//         } else {
//             gsap.to(header, {
//                 scale: 1,
//                 duration: 0.25,
//             });
//         };
//         lastScrollTop = scrollTop;
//     });
// };

const observeFooter = () => {
    const targets = document.querySelectorAll(".footer-item");
    const marquee = document.querySelector(".marquee");
    const headline = document.querySelector("#regalo .text-headline");
    const options = {
        threshold: 0.5,
    };
    const handleIntersection = (entries) => {
        entries.map((entry) => {
            if (entry.isIntersecting) {
                marquee.style.opacity = "0";
                headline.style.opacity = "0";
            } else {
                marquee.style.opacity = "1";
                headline.style.opacity = "1";
            };
        });
    };
    const observer = new IntersectionObserver(handleIntersection, options);
    targets.forEach(target => {
        observer.observe(target);
    });
};

const observeSections = () => {
    const sections = document.querySelectorAll(".section, .footer");
    const navItems = document.querySelectorAll(".nav-item.js-href");
    const options = {
        threshold: 0.25,
    };
    const handleIntersection = (entries) => {
        entries.map((entry) => {
            if (entry.isIntersecting && window.scrollY > 10) {
                navItems.forEach(item => {
                    const itemId = item.dataset.id;
                    if (itemId === entry.target.id) {
                        [...navItems].filter(i => i !== item).forEach(i => i.classList.remove("--current"));
                        item.classList.add("--current");
                    };
                });
            } else if (window.scrollY < 10) {
                [...navItems].forEach(i => i.classList.remove("--current"));
                document.querySelector('.nav-item[data-id="benvenuti"]').classList.add("--current");
            };
        });
    };
    const observer = new IntersectionObserver(handleIntersection, options);
    sections.forEach(section => {
        observer.observe(section);
    });
};


const revealOnLoad = () => {
    const reveals = document.querySelectorAll(".text-container, .image-container, .drawing-container");
    reveals.forEach(element => {
        element.classList.add("--appear");
    });
};

const revealOnScroll = () => {
    const reveals = document.querySelectorAll(".text-container, .image-container, .drawing-container");
    for (let i = 0; i < reveals.length; i++) {
        const element = reveals[i];
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add("--appear");
        } else {
            element.classList.remove("--appear");
        };
    };
};

window.addEventListener("load", () => {
    documentHeight();
    handleInternalLinks();
    observeFooter();
    revealOnLoad();
});

window.addEventListener("scroll", () => {
    observeSections();
    revealOnScroll();
})

window.addEventListener("resize", () => {
    documentHeight();
});