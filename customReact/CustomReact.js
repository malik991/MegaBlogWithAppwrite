function customRender(reElement, container) {
  //   // to crate the DOM element
  //   const domElement = document.createElement(reactElement.type);
  //   // add the react element on DOM
  //   domElement.innerHTML = reElement.children;
  //   // set the attribute of DOM element
  //   domElement.setAttribute("href", reElement.props.href);
  //   domElement.setAttribute("target", reElement.props.target);

  //   // now add this DOM element to you container of div which id is root
  //   container.appendChild(domElement);

  /* in above code we have to reapeat our code for every single line of set attribute  */

  const domElement = document.createElement(reElement.type);
  domElement.innerHTML = reElement.children;
  for (const prop in reElement.props) {
    if (prop === "children") continue;

    domElement.setAttribute(prop, reElement.props[prop]);
  }
  container.appendChild(domElement);
}

const reactElement = {
  type: "a",
  props: {
    href: "https://google.com",
    target: "_blank",
  },
  children: "CLick me to visist Google",
};

// create your own container to put the DOM in it
const mainContainer = document.querySelector("#root");

// add the dom and render through a funciton
customRender(reactElement, mainContainer);
