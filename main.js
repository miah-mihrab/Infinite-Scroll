const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.querySelector(".filter");
// const form = document.getElementById("form");
// const submit = document.querySelector("button");
let limit = 5;
let page = 1;

// FILTER POST
function filterPost(query) {
  query = query.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach(post => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText;
    if (title.indexOf(query) > -1 || body.indexOf(query) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}

// SHOW POST IN CLIENT SIDE
async function showPosts() {
  const posts = await getPosts();
  console.log(posts);
  posts.forEach(post => {
    const postElement = document.createElement("div");

    postElement.classList.add("post");

    postElement.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">
                    ${post.body}
                </p>
            </div>
        `;

    postsContainer.appendChild(postElement);
  });
}

// show loader and fetch posts
async function showLoader() {
  loading.classList.add("show");
  console.log(loading);
  await showPosts().then(() => {
    loading.classList.remove("show");
  });
}

//INIT SHOW
showPosts();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  // console.log((clientHeight + scrollTop) >= scrollHeight - 5)
  if (clientHeight + scrollTop >= scrollHeight - 5) {
    page++;
    showLoader();
  }
});

filter.addEventListener("input", e => {
  console.log(e.target.value);
  filterPost(e.target.value);
});

form.addEventListener("submit", e => {
  e.preventDefault();
  const createPost = fetch("https://jsonplaceholder.typicode.com/posts/", {
    method: "POST",
    body: {
      userId: 101,
      id: 101,
      title: "New",
      body:
        "in non odio excepturi sint eum\nlabore voluptates vitae quia qui et\ninventore itaque rerum\nveniam non exercitationem delectus aut"
    }
  });
  showPosts();
});
