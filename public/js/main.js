// load navbar
let navbar_client = new XMLHttpRequest();
let navbar_container = document.getElementById("navbar_container");
navbar_client.open('GET', 'partials/navbar.html', true);
navbar_client.onreadystatechange = function() {
  if (navbar_client.readyState == 4) {
    if (navbar_client.status == 200) {
      navbar_container.innerHTML = navbar_client.responseText;
      loadDefaultPage()
    }
  }
}
navbar_client.send();

// load sidebar
let sidebar_container = document.getElementById("sidebar_container");
let sidebar_client = new XMLHttpRequest();
sidebar_client.open('GET', 'partials/sidebar.html', true);
sidebar_client.onreadystatechange = function() {
  if (sidebar_client.readyState == 4) {
    if (sidebar_client.status == 200) {
      sidebar_container.innerHTML = sidebar_client.responseText;
      initializeSidebarClickListeners()
    }
  }
}
sidebar_client.send();

// initialize sidebar functionality
function toggleSidebar() {
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

// load default page. will add ability for user to define default later
function loadDefaultPage() {
  let default_page = 'pages/movies.html';
  let default_page_title = 'Movies';
  let page_title = document.getElementById("page_title");
  let page_container = document.getElementById("page_container")
  default_client = new XMLHttpRequest();
  default_client.open('GET', default_page, true);
  default_client.onreadystatechange = function() {
    if (default_client.readyState == 4) {
      if (default_client.status == 200) {
        page_title.innerHTML = default_page_title;
        page_container.innerHTML = default_client.responseText;
      }
    }
  }
  default_client.send();
}

// initialize sidebar button click listeners
function initializeSidebarClickListeners() {
  document.getElementById("movies_sidebar_button").addEventListener("click", function() {
    let client = new XMLHttpRequest();
    client.open('GET', 'pages/movies.html', true);
    client.onreadystatechange = function() {
      if (client.readyState == 4) {
        if (client.status == 200) {
          page_title.innerHTML = "Movies";
          page_container.innerHTML = client.responseText;
        }
      }
    }
    client.send();
  });
  document.getElementById("tv_sidebar_button").addEventListener("click", function() {
    let client = new XMLHttpRequest();
    client.open('GET', 'pages/tv.html', true);
    client.onreadystatechange = function() {
      if (client.readyState == 4) {
        if (client.status == 200) {
          page_title.innerHTML = "TV";
          page_container.innerHTML = client.responseText;
        }
      }
    }
    client.send();
  });
  document.getElementById("books_sidebar_button").addEventListener("click", function() {
    let client = new XMLHttpRequest();
    client.open('GET', 'pages/books.html', true);
    client.onreadystatechange = function() {
      if (client.readyState == 4) {
        if (client.status == 200) {
          page_title.innerHTML = "Books";
          page_container.innerHTML = client.responseText;
        }
      }
    }
    client.send();
  });
  document.getElementById("music_sidebar_button").addEventListener("click", function() {
    let client = new XMLHttpRequest();
    client.open('GET', 'pages/music.html', true);
    client.onreadystatechange = function() {
      if (client.readyState == 4) {
        if (client.status == 200) {
          page_title.innerHTML = "Music";
          page_container.innerHTML = client.responseText;
        }
      }
    }
    client.send();
  });
  document.getElementById("video_games_sidebar_button").addEventListener("click", function() {
    let client = new XMLHttpRequest();
    client.open('GET', 'pages/video_games.html', true);
    client.onreadystatechange = function() {
      if (client.readyState == 4) {
        if (client.status == 200) {
          page_title.innerHTML = "Video Games";
          page_container.innerHTML = client.responseText;
        }
      }
    }
    client.send();
  });
}
