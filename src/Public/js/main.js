const { width } = require("pdfkit/js/page");

const backdrop = document.querySelector(".backdrop");
const sideDrawer = document.querySelector(".mobile-nav");
const menuToggle = document.querySelector("#side-menu-toggle");
const FileSystemHierarchy = document.querySelector("#FileSystemHierarchy");
const demo = document.querySelector(".demo");



function backdropClickHandler() {
  backdrop.style.display = "none";
  sideDrawer.classList.remove("open");
}

function menuToggleClickHandler() {
  backdrop.style.display = "block";
  sideDrawer.classList.add("open");
}

function FileSystemClickHandler() {
  const file = event.target;
  if (file.tagName.toLowerCase() === "span" && file != event.currentTarget) {
    const path = file.classList.contains("folder") ? "folder" : "file";
    if (path === "file") {
      alert("File accessed");
    }
    if (path === "folder") {
      const isexpanded = file.dataset.isexpanded == "true";
      if (isexpanded) {
        file.classList.remove("fa-folder-o");
        file.classList.add("fa-folder");
      } else {
        file.classList.remove("fa-folder");
        file.classList.add("fa-folder-o");
      }
      file.dataset.isexpanded = !isexpanded;

      const fileElement = [].slice.call(file.parentElement.children);
      const classnames = "file,foldercontainer,nofile".split(",");

      fileElement.forEach(function (element) {
        if (
          classnames.some(function (val) {
            return element.classList.contains(val);
          })
        )
          element.style.display = isexpanded ? "none" : "block";
      });
    }
  }

function scrollHandler(x,y) {
    window.scrollBy(x,y);
  }

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
  var myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains('show')) {
      myDropdown.classList.remove('show');
    }
  }
}

backdrop.addEventListener("click", backdropClickHandler);
menuToggle.addEventListener("click", menuToggleClickHandler);
FileSystemHierarchy.addEventListener("click", FileSystemClickHandler);
demo.addEventListener("click", scrollHandler);
