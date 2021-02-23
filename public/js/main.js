// check if user is logged in
if(false){
  loadLoginOptionsPage();
} else {
  enterApp();
}

var page_navs = null;
var display_strings = {};

function loadLoginOptionsPage(){
  let client = new XMLHttpRequest();
  let page_container = document.getElementById("page_container");
  client.open('GET', 'pages/login_options.html', true);
  client.onreadystatechange = function() {
    if (client.readyState == 4) {
      if (client.status == 200) {
        page_container.innerHTML = client.responseText;

        // initialize actionable items
        document.getElementById("invoke_create_account_page_button").addEventListener("click", function() {
          loadCreateAccountPage();
        });
      }
    }
  }
  client.send();
}

function loadCreateAccountPage(){
  let client = new XMLHttpRequest();
  let page_container = document.getElementById("page_container");
  client.open('GET', 'pages/create_account.html', true);
  client.onreadystatechange = function() {
    if (client.readyState == 4) {
      if (client.status == 200) {
        page_container.innerHTML = client.responseText;
      }
    }
  }
  client.send();
}

//will add ability for user to define default later
function loadDefaultPage() {
  navigateToPage(display_strings["movies_sidebar_button"][0]);
}

function navigateToPage(id) {
  console.log(id);
  let page_title = document.getElementById("page_title");
  let page_container = document.getElementById("page_container");
  page_navs.forEach(p => {
    if (display_strings[p.id][0] == id) {
      let client = new XMLHttpRequest();
      let page_html = "pages/" + id;
      client.open("GET", page_html, true);
      client.onreadystatechange = function() {
        if (client.readyState == 4) {
          if (client.status == 200) {
            console.log("hello");
            page_title.innerHTML = display_strings[p.id][1];
            page_container.innerHTML = client.responseText;
            document.title = "Media Hub | " + display_strings[p.id][1];
          }
        }
      }
      client.send();
    }
  });
}

function initializeSidebarFunctionality() {
  window.toggleSidebar=function() {
    if (document.getElementById("media_nav_toggler").className == "fas fa-bars") {
      document.getElementById("sidebar").style.width = "auto";
      let width = document.getElementById("sidebar").offsetWidth;
      document.getElementById("navbar").style.marginLeft = width.toString()+"px";
      document.getElementById("media_nav_toggler").className = "fas fa-times";
    }
    else {
      document.getElementById("sidebar").style.width = "0";
      document.getElementById("navbar").style.marginLeft = "0";
      document.getElementById("media_nav_toggler").className = "fas fa-bars";
    }
  }
}

function initializeNavigationButtons(){
  page_navs = Array.from(document.getElementsByClassName("page_nav"));
  // create dictionary of display strings
  display_strings = {
    "profile_navbar_button" : ["profile.html","Profile","profile",null],
    "search_navbar_button" : ["search.html","Find ","search",null],
    "movies_sidebar_button" : ["movies.html","Movies","movies","Movie"],
    "tv_sidebar_button" : ["tv.html","TV","tv", null],
    "books_sidebar_button" : ["books.html","Books","books","Book"],
    "music_sidebar_button" : ["music.html","Music","music",null],
    "video_games_sidebar_button" : ["video_games.html","Video Games","video_games","Video Game"]
  }

  page_navs.forEach(p => {
    let id = p.id;
    p.addEventListener("click", e => {
      history.pushState({id}, `Selected: ${id}`);
      navigateToPage(display_strings[id][0]);
    });
  });
}

function loadSidebar() {
  let container = document.getElementById("sidebar_container");
  let client = new XMLHttpRequest();
  client.open('GET', 'partials/sidebar.html', true);
  client.onreadystatechange = function() {
    if (client.readyState == 4) {
      if (client.status == 200) {
        container.innerHTML = client.responseText;
        initializeSidebarFunctionality();

        initializeNavigationButtons();
        loadDefaultPage();
      }
    }
  }
  client.send();
}

function loadNavbar() {
  let container = document.getElementById("navbar_container");
  let client = new XMLHttpRequest();
  client.open('GET', 'partials/navbar.html', true);
  client.onreadystatechange = function() {
    if (client.readyState == 4) {
      if (client.status == 200) {
        container.innerHTML = client.responseText;
        loadSidebar();
        // loadDefaultPage()
        // // initialize navbar buttons
        // document.getElementById("search_navbar_button").addEventListener("click", function() {
        //   let search_context = document.getElementById("page_title").innerText;
        //   let client = new XMLHttpRequest();
        //   client.open('GET', 'pages/search.html', true);
        //   client.onreadystatechange = function() {
        //     if (client.readyState == 4) {
        //       if (client.status == 200) {
        //         if (search_context == "Profile") {
        //           search_context = default_page_title;
        //         }
        //         if (search_context.substring(0,4) != "Find") {
        //           if (search_context != "TV" && search_context != "Music") {
        //             page_name_singular = search_context.substring(0,search_context.length-1);
        //           }
        //           else if (search_context == "TV") {
        //             page_name_singular = "TV Show";
        //           }
        //           else if (search_context == "Music") {
        //             page_name_singular = search_context;
        //           }
        //           page_title.innerHTML = "Find " + page_name_singular;
        //           page_container.innerHTML = client.responseText;
        //         }
        //       }
        //     }
        //   }
        //   client.send();
        // });
        // document.getElementById("profile_navbar_button").addEventListener("click", function() {
        //   let client = new XMLHttpRequest();
        //   client.open('GET', 'pages/profile.html', true);
        //   client.onreadystatechange = function() {
        //     if (client.readyState == 4) {
        //       if (client.status == 200) {
        //         page_title.innerText = "Profile";
        //         page_container.innerHTML = client.responseText;
        //       }
        //     }
        //   }
        //   client.send();
        // });
      }
    }
  }
  client.send();
}

function enterApp(){
  loadNavbar();
}

window.addEventListener('popstate', e => {
  if (e.state.id != null) {
    navigateToPage(display_strings[e.state.id][0]);
  }
  else {
    console.log("load default page");
    loadDefaultPage();
  }
});

history.replaceState({id: null}, 'Default state', './');
