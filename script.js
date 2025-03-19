/*===================Typing animation=====================*/
var typed = new Typed(".typing", {
    strings: ["Web Developer", "Web Designer", "Frontend Developer", "Graphics Designer"],
    typeSpeed: 100, // Speed of typing
    backSpeed: 60,  // Speed of backspacing
    loop: true
});

/*===================Aside=====================*/
const nav = document.querySelector(".nav"),
      navList = document.querySelectorAll(".nav li"),
      totalNavList = navList.length,
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length;

navList.forEach((navItem, index) => {
    const a = navItem.querySelector("a");
    a.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        removeBackSection();

        // Remove 'active' class from all navigation links
        navList.forEach(navItem => {
            navItem.querySelector("a").classList.remove("active");
        });

        // Add 'active' class to the clicked navigation link
        a.classList.add("active");

        // Add 'back-section' class to sections based on the active link
        allSection.forEach((section, i) => {
            if (navList[i].querySelector("a").classList.contains("active")) {
                section.classList.add("back-section");
            }
        });

        // Show the section corresponding to the clicked link
        showSection(a);

        // Toggle aside menu if viewport width is less than 1200px
        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    });
});

function removeBackSection() {
    allSection.forEach(section => section.classList.remove('back-section'));
}

function addBackSection(num) {
    allSection[num].classList.add('back-section');
}

function showSection(element) {
    // Remove 'active' class from all sections
    allSection.forEach(section => section.classList.remove("active"));

    // Add 'active' class to the target section
    const target = element.getAttribute("href").split("#")[1];
    const targetSection = document.querySelector("#" + target);
    if (targetSection) {
        targetSection.classList.add("active");
    }
}

function updateNav(element) {
    navList.forEach((navItem, index) => {
        navItem.querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[index].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[index].querySelector("a").classList.add("active");
        }
    });
}

document.querySelector(".hire-me").addEventListener("click", function() {
    const sectionIndex = this.getAttribute("data-section-index");
    console.log(sectionIndex);
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(parseInt(sectionIndex, 10));
});

const navTogglerBtn = document.querySelector(".nav-toggler"),
      aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
});

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    allSection.forEach(section => section.classList.toggle("open"));
}
