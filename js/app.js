
// Define Global Variables
const navigationBar = document.querySelector("#navbar__list");
const sections = document.querySelectorAll('section');



// build the navbar dynamically
function appendSection() {
    for (section of sections) {
        const listElement = `<li class=element-nav-link data-identifier=${section.id}> <a href="#${section.id}">${section.dataset.listSection}</a></li>`;
        navigationBar.insertAdjacentHTML('beforeend', listElement);
    };
};



// Scroll to anchor ID using scrollTO event
function scrollTo(evt) {
  evt.preventDefault();
  let elemFocus;
  if (evt.target.hasAttribute('data-identifier')) {
  	elemFocus = evt.target;
  } else {
  	elemFocus = evt.target.parentElement;
  }
  const requiredElement = document.getElementById(elemFocus.dataset.identifier);
  requiredElement.scrollIntoView({block: 'center', behavior: 'smooth'});
};



/*Using the IntersectionObserver API to detect what is in focus and add or remove the class 'active'
to the desired section and to the navbar list element*/

// enteries are a list of all the sections in the page and we are looping over them.
const callback = entries => {
  entries.forEach(entry => {
    const navListElement = document.querySelector(`.element-nav-link[data-identifier='${entry.target.id}']`);
    const section = document.getElementById(entry.target.id);
    if (entry.isIntersecting) {
      navListElement.classList.add('active')
      section.classList.add('active')
    } else if (navListElement.classList.contains('active')) {
        navListElement.classList.remove('active')
      } else if (section.classList.contains('active')) {
        section.classList.remove('active')
    }
  })
};




// Options object for the observer
const options = {
  root: null,
  rootMargin: '-200px 0px -40px 0px',
  threshold: 0.35,          // is the best in this project
}



// creating a new observer object
const observer = new IntersectionObserver(callback, options)

// loop over the sections list and observe the change in the ID
sections.forEach(sectionElement => {
  observer.observe(document.getElementById(sectionElement.id))
})



// Build menu
appendSection();

// Scroll to section on link click
navigationBar.addEventListener('click', scrollTo);












