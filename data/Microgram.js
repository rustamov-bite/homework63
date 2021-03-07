class Post{
    constructor(image, description, data) {
        this.image = image;
        this.description = description;
        this.data = data;
    }
}
like();
doubleLike();
bookmark();
submitPostAdding();
splashLogin();
submitLogin();
function submitPostAdding() {
    const addPostBtn = document.getElementsByClassName('add-post-btn')[0];
    addPostBtn.addEventListener('click', function (event) {
        const addPostForm = document.getElementsByClassName('add-post-form')[0];
        const formData = new FormData(addPostForm);
        const data = Object.fromEntries(formData);
        console.log(data);
        let post = new Post(URL.createObjectURL(data.image), data.description, '10-10-2021');
        addPost(post);
        event.preventDefault();
    });
}
function addPost(post) {
    document.getElementsByClassName("posts-container")[0].append(createPostElement(post));
    likeNewPost();
    bookmarkNewPost();
    doubleLikeNewPost();
}
function createPostElement(post) {
    let postElement = document.createElement("div");
    postElement.classList.add('post', 'mt-3');
    postElement.innerHTML =
        `<div class="post-image position-relative d-flex align-items-center justify-content-center">
                    <img src="${post.image}" class="img-fluid d-block" alt="Responsive image">
                </div>
                <div class="icons d-flex flex-row">
                    <div class="ml-2 like">
                        <span class="h1 mx-2 muted">
                            <i class="far fa-heart"></i>
                        </span>
                    </div>
                    <div class="ml-2">
                        <span class="h1 mx-2">
                            <i class="far fa-comment"></i>
                        </span>
                    </div>
                    <div class="ml-auto mr-3 bookmark">
                        <span class="h1 mx-2">
                            <i class="far fa-bookmark"></i>
                        </span>
                    </div>
                </div>
                <div class="border-bottom border-left border-right d-flex -flex-row">
                    <div class="ml-2">
                        <h3 class="text-muted mb-1">Description</h3>
                        <p>${post.description}</p>
                    </div>
                    <div class="ml-auto mr-2">
                        <h3 class="text-muted mb-1">Date:</h3>
                        <p>${post.data}</p>
                    </div>
                </div>`;
    return postElement;
}
function doubleLikeListener(picture) {
    picture.addEventListener('dblclick', function () {
        let heart = document.createElement('div');
        heart.classList.add('h1', 'mx-2', 'text-danger', 'position-absolute');
        heart.innerHTML = `<span><i class="fas fa-heart"></i></span>`;
        picture.append(heart);
        setTimeout(function () {
            heart.remove();
        }, 1000);
    });
}
function likeListener(like) {
    like.addEventListener('click', function () {
        let tmp = document.createElement('span');
        if (like.firstElementChild.classList.contains('muted')) {
            like.firstElementChild.remove();
            tmp.classList.add('h1', 'mx-2', 'text-danger');
            tmp.innerHTML = `<i class="fas fa-heart"></i>`;
        } else {
            like.firstElementChild.remove();
            tmp.classList.add('h1', 'mx-2', 'muted');
            tmp.innerHTML = `<i class="far fa-heart"></i>`;
        }
        like.append(tmp);
    });
}
function bookmarkListener(bookmark) {
    bookmark.addEventListener('click', function () {
        let tmp = document.createElement('span');
        tmp.classList.add('h1', 'mx-2')
        if (bookmark.firstElementChild.classList.contains('muted')) {
            bookmark.firstElementChild.remove();
            tmp.classList.add('un-muted');
            tmp.innerHTML = `<i class="fas fa-bookmark"></i>`;
        } else {
            bookmark.firstElementChild.remove();
            tmp.classList.add('muted');
            tmp.innerHTML = `<i class="far fa-bookmark"></i>`
        }
        bookmark.append(tmp);
    });
}
function like() {
    for (let i = 0; i < document.getElementsByClassName('like').length; i++) {
        const like = document.getElementsByClassName('like')[i];
        likeListener(like);
    }
}
function bookmark() {
    for (let i = 0; i < document.getElementsByClassName('bookmark').length; i++) {
        const bookmark = document.getElementsByClassName('bookmark')[i];
        bookmarkListener(bookmark);
    }
}
function doubleLike() {
    for (let i = 0; i < document.getElementsByClassName('post-image').length; i++) {
        const picture = document.getElementsByClassName('post-image')[i];
        doubleLikeListener(picture);
    }
}
function likeNewPost() {
    const like = document
        .getElementsByClassName('like')[document.getElementsByClassName('like').length - 1];
    likeListener(like);
}
function bookmarkNewPost() {
    const bookmark = document
        .getElementsByClassName('bookmark')
        [document.getElementsByClassName('bookmark').length - 1];
    bookmarkListener(bookmark);
}
function doubleLikeNewPost() {
    const picture = document
        .getElementsByClassName('post-image')
        [document.getElementsByClassName('post-image').length - 1];
    doubleLikeListener(picture);
}
function splashLogin() {
    const login = document.getElementsByClassName('btn-login')[0];
    login.addEventListener('click', function () {
        if (document.getElementsByClassName('splash-login')[0] == null) {
            getScreenLogin();
        }
        const splashLogin = document.getElementsByClassName('splash-login')[0];
        splashLogin.classList.add('d-flex','align-items-center', 'justify-content-center');
        login.remove();
        submitLogin();
    });
}
function submitLogin() {
    const login = document.getElementsByClassName('login-form')[0];
    login.addEventListener('submit', function (event) {
        document.getElementsByClassName('splash-login')[0].remove();
        const input = login.elements;
        const user = {
            login: input['login'].value,
            password: input['password'].value
        };
        saveUser(user);
        event.preventDefault();
        logout();
    });
}
function logout() {
    defineUser();
    const logout = document.getElementsByClassName('btn-logout')[0];
    logout.addEventListener('click', function (event) {
        deleteUser();
        const navbar = document.getElementsByClassName('navbar')[0];
        document.getElementsByClassName('user-info')[0].remove();
        let btnLog = document.createElement('div');
        btnLog.classList.add('my-2', 'm-auto', 'div-btn-login');
        btnLog.innerHTML = `<button class="btn btn-outline-success btn-login" type="button">Login</button>`;
        navbar.append(btnLog);
        event.preventDefault();
        splashLogin();
    });
}
if (localStorage.getItem('user') != null) {
    logout();
}
async function postHandler(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    await fetch('http://127.0.0.1:8989/publications/publication', {
        method: 'GET',
        body: data
    });
}
function saveUser(user) {
    const userAsJSON = JSON.stringify(user)
    localStorage.setItem('user', userAsJSON);
}
function getUser() {
    const userAsJSON = localStorage.getItem('user');
    return JSON.parse(userAsJSON);
}
function deleteUser() {
    localStorage.removeItem('user');
}
function defineUser() {
    document.getElementsByClassName('div-btn-login')[0].remove();
    const navbar = document.getElementsByClassName('navbar')[0];
    const user = getUser();
    const userInfo = document.createElement('div');
    userInfo.classList.add('m-auto', 'd-flex', 'row', 'user-info');
    userInfo.innerHTML = `<h5 class="mr-3 mt-1">${user.login}</h5>
        <button class="btn btn-outline-danger my-2 m-auto btn-logout" type="button">Logout</button>`;
    navbar.append(userInfo);
}
function getScreenLogin() {
    let el = document.createElement('div');
    el.classList.add('splash-login', 'w-100', 'h-100');
    el.innerHTML = `<form class="login-form">
            <input class="form-control mr-lg-2 mb-2" name="login" type="text" placeholder="Login" aria-label="Login">
            <input class="form-control mr-lg-2 mb-2" name="password" type="password"
                   placeholder="Password" aria-label="Password">
            <button class="btn btn-block btn-outline-success my-2 m-auto submit-login">login</button>
        </form>`;
    document.getElementsByClassName('ref-content')[0].append(el);
}