const filterInput = document.getElementById("filter");

const postDetail = document.getElementById("post-container");
const loading = document.getElementById("loader");

let limit = 3;
let page = 1;

const fetchDataFromAPI = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
};

const updateUi = async () => {
  const posts = await fetchDataFromAPI();
  console.log(posts);

  for (const post of posts) {
    const updatePost = document.createElement("div");
    updatePost.classList.add("post");
    updatePost.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        </div>
    </div>
        `;
    postDetail.appendChild(updatePost);
  }
};

const filterpost = (e) =>{   
const enteredTerm = event.target.value.toUpperCase();
const posts = document.querySelectorAll(".post")
for(const post of posts){
const title = post.querySelector(".post-title").innerText.toUpperCase();
const body = post.querySelector(".post-body").innerText.toUpperCase();
if(title.indexOf(enteredTerm) > -1 || body.indexOf(enteredTerm) > -1){
    post.style.display = "flex";
}else{
    post.style.display ="none";

}

}
}

const showLoading = () => {
  loading.classList.add("show");
  setTimeout(() => {
    loading.classList.remove("show");
    setTimeout(() => {
      page++;
      updateUi();
    }, 500);
  }, 1000);
};
updateUi();

filterInput.addEventListener("input",filterpost);

window.addEventListener("scroll", () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});
