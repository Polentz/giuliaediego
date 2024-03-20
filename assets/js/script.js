const documentHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
};

const handleInternalLinks = () => {
    const anchorTags = document.querySelectorAll(".js-href");
    anchorTags.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            [...anchorTags].filter(i => i !== link).forEach(i => i.classList.remove("--current"));
            link.classList.toggle("--current");
            const href = link.getAttribute("href");
            document.querySelector(href).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
};

const handleScrolledElements = () => {
    const header = document.querySelector(".header-text");
    gsap.set(header, {
        scale: 1.4,
        duration: 0.5,
    });
    window.addEventListener("scroll", () => {
        let lastScrollTop = 40;
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop < lastScrollTop) {
            gsap.to(header, {
                scale: 1.4,
                duration: 0.25,
            });
        } else {
            gsap.to(header, {
                scale: 1,
                duration: 0.25,
            });
        };
        lastScrollTop = scrollTop;
    });
};

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
}

window.addEventListener("load", () => {
    documentHeight();
    handleInternalLinks();
    observeFooter();
});

window.addEventListener("resize", () => {
    documentHeight();
});