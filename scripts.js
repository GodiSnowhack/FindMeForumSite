function openFullScreen(imgElement) {
    var modal = document.getElementById('modal');
    var fullScreenImg = document.getElementById('fullScreenImage');

    fullScreenImg.src = imgElement.src;
    modal.style.display = 'block';
}

function closeFullScreen() {
    var modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Добавляем обработчик события загрузки страницы
window.onload = function () {
    // Ваши скрипты, которые обрабатывают элементы DOM
};




const chatMessages = {}; // Объект для хранения сообщений каждого чата
let selectedChat = null;

function selectChat(chatId) {
    // Сохранение сообщений текущего чата
    if (selectedChat !== null) {
        chatMessages[selectedChat] = document.getElementById('message-display').innerHTML;
    }

        // Очистка поля сообщений
        document.getElementById('message-display').innerHTML = '';

        // Загрузка сообщений нового чата
        selectedChat = chatId;
        const messageDisplay = document.getElementById('message-display');
        if (chatMessages[selectedChat]) {
            messageDisplay.innerHTML = chatMessages[selectedChat];
        }
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageDisplay = document.getElementById('message-display');

    const messageText = messageInput.value;

    if (messageText.trim() !== '') {
        const messageElement = document.createElement('div');
        messageElement.textContent = messageText;

        // Добавление стилей в зависимости от отправителя сообщения
        if (messageText.startsWith('От пользователя')) {
            messageElement.classList.add('user-message');
            } else {
                messageElement.classList.add('other-message');
            }

            messageDisplay.appendChild(messageElement);
            messageInput.value = '';
        }
}


// Скрипт для управления видимостью поля поиска пользователей
document.addEventListener("DOMContentLoaded", function() {
    // Скрываем поле поиска при загрузке страницы
    var searchUserContainer = document.getElementById("searchUserContainer");
    searchUserContainer.style.display = "none";
});

// Функция для отображения/скрытия поля поиска
function toggleSearch() {
    var searchUserContainer = document.getElementById("searchUserContainer");
    // Инвертируем видимость поля при каждом вызове функции
    searchUserContainer.style.display = (searchUserContainer.style.display === "none" || searchUserContainer.style.display === "") ? "block" : "none";
}

// Функция для выполнения поиска пользователей
function searchUsers() {
    // Ваш код для выполнения поиска
}


function redirectToHomePage() {
    window.location.href = "MainMenu.html"; 
}

document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");
    const themeStyle = document.getElementById("theme-style");
    const changeImage = document.getElementById("themeToggle");

    themeToggle.addEventListener("click", function () {
        if (themeStyle.getAttribute("href") === "light.css") {
            themeStyle.setAttribute("href", "dark.css");
        } else {
            themeStyle.setAttribute("href", "light.css");
        }
    });

    // Сохраняем пути к изображениям
    const imagePaths = ['photos/icons8-солнце-50.png', 'photos/icons8-луна-50.png'];
    let currentImageIndex = 0;

    changeImage.addEventListener('click', function () {
        // Переключаем индекс изображения
        currentImageIndex = (currentImageIndex + 1) % imagePaths.length;

        // Устанавливаем новый путь к изображению
        this.src = imagePaths[currentImageIndex];
    });
});



const commentsData1 = {}; // Объект для хранения комментариев первого поля
const commentsData2 = {}; // Объект для хранения комментариев второго поля
let currentCommentsData = commentsData1; // Изначально используем данные первого поля

function switchComments(commentsType) {
    const commentsPanel = document.getElementById('commentsPanel');
    const comments1 = document.getElementById('comments1');
    const comments2 = document.getElementById('comments2');
    const addCommentPanel = document.getElementById('addCommentPanel');

    // Скрываем/показываем панели в зависимости от выбранного поля
    if (commentsType === 'comments1') {
        currentCommentsData = commentsData1;
        comments1.style.display = 'block';
        comments2.style.display = 'none';
        } else if (commentsType === 'comments2') {
            currentCommentsData = commentsData2;
            comments1.style.display = 'none';
            comments2.style.display = 'block';
        }

        // Показываем или скрываем панель комментариев
        if (commentsPanel.style.display === 'block') {
            commentsPanel.style.display = 'none';
        } else {
        commentsPanel.style.display = 'block';
        renderComments();
    }
}

function addComment() {
    const commentInput = document.getElementById('commentInput');
    const commentText = commentInput.value;

    // Проверка наличия текста в поле ввода
    if (commentText.trim() !== '') {
        const newComment = { text: commentText, replies: [] };
        currentCommentsData[new Date().getTime()] = newComment;
        commentInput.value = '';
        renderComments();
    }
}

function renderComments() {
    const commentsContainer = document.getElementById('comments');
    commentsContainer.innerHTML = '';
    renderCommentTree(commentsContainer, currentCommentsData);
}

function renderCommentTree(container, comments) {
    for (const key in comments) {
        if (comments.hasOwnProperty(key)) {
            const comment = comments[key];
            const commentElement = createCommentElement(comment);
            container.appendChild(commentElement);

            if (comment.replies.length > 0) {
                const repliesContainer = document.createElement('div');
                repliesContainer.classList.add('replies-container');
                container.appendChild(repliesContainer);
                renderCommentTree(repliesContainer, comment.replies);
            }
        }
    }
}

function createCommentElement(comment) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment-item');
    commentElement.innerHTML = `<p>${comment.text}</p>`;
    return commentElement;
}

function filterProfiles() {
    const searchInput = document.getElementById('search-input');
    const profiles = document.querySelectorAll('.lost-profile');

    const searchTerm = searchInput.value.toLowerCase();

    profiles.forEach(profile => {
        const profileText = profile.textContent.toLowerCase();
        if (profileText.includes(searchTerm)) {
            profile.style.display = 'block';
        } else {
            profile.style.display = 'none';
        }
    });
}