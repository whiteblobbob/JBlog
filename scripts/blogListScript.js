function formatTime(timestamp) {
    const MONTHS = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember'
    ];

    const time = new Date(timestamp);
    return `${time.getDate()} ${MONTHS[time.getMonth()]} ${time.getFullYear()}`;
}

const params = new URLSearchParams(window.location.search);
let page = Number(params.get('page'));
const blogs = document.getElementById('blogs');
let idIncrement = localStorage.getItem('id_increment');

if (!idIncrement) {
    localStorage.setItem('id_increment', '0');
    idIncrement = '0'
}

idIncrement = Number(idIncrement);
const maxPages = Math.ceil(idIncrement / 5);

if (Number.isNaN(page) || page < 1 || page > maxPages) {
    page = 1;
}

let lastBlog = page * 5 - 1;

if (lastBlog > idIncrement - 1) {
    lastBlog = idIncrement - 1;
}

for (let i = (page - 1) * 5; i <= lastBlog; i++) {
    const post = JSON.parse(localStorage.getItem(`post_${i}`));

    const newDiv = document.createElement('div');
    newDiv.className = 'post';
    newDiv.onclick = ev => {
        window.location.href = `/blog.html?id=${i}`
    };

    const title = document.createElement('h2');
    title.innerText = post.title;

    const author = document.createElement('p');
    author.innerText = `Oleh ${post.author}, ${formatTime(post.timestamp)}`;

    newDiv.appendChild(title);
    newDiv.appendChild(author);

    blogs.appendChild(newDiv);
}

const pageInput = document.getElementById('page');
pageInput.value = page.toString();

if (page == 1) {
    document.getElementById('page-first').style.visibility = 'hidden';
    document.getElementById('page-previous').style.visibility = 'hidden';
}

if (page == maxPages) {
    document.getElementById('page-next').style.visibility = 'hidden';
    document.getElementById('page-last').style.visibility = 'hidden';
}

document.getElementById('page-first').addEventListener('click', () => {
    window.location.href = `/blog-list.html?page=1`;
});

document.getElementById('page-previous').addEventListener('click', () => {
    window.location.href = `/blog-list.html?page=${page - 1}`;
});

document.getElementById('page-next').addEventListener('click', () => {
    window.location.href = `/blog-list.html?page=${page + 1}`;
});

document.getElementById('page-last').addEventListener('click', () => {
    window.location.href = `/blog-list.html?page=${maxPages}`;
});

document.getElementById('page-selector-form').addEventListener('submit', ev => {
    ev.preventDefault();

    window.location.href = `/blog-list.html?page=${pageInput.value}`;
});