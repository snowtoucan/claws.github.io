// function setupRouter() {

//     document.body.addEventListener('click', (event) => {
//       if (event.target.tagName === 'A' && event.target.dataset.nav !== undefined) {
//         event.preventDefault(); 
//         const path = event.target.getAttribute('href');
//         history.pushState({}, '', path); 
//         navigate(path); 
//       }
//     });
  
//     // handle browser navigation 
//     window.addEventListener('popstate', () => {
//       navigate(window.location.pathname);
//     });
  
//     // load the correct page on initial load
//     navigate(window.location.pathname);
//   }

//   setupRouter();