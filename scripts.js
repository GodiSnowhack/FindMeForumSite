function openModal(imagePath) {
    document.getElementById('myModal').style.display = 'flex';
    document.getElementById('modalImg').src = imagePath;
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

function redirectToHomePage() {
    window.location.href = "MainMenu.html"; 
}

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


function searchUsers() {
    const searchInput = document.getElementById('searchUser');
    const searchTerm = searchInput.value.trim();
}

const commentsData = {}; // Объект для хранения комментариев

function showCommentsPanel(panelType) {
    const commentsPanel = document.getElementById('commentsPanel');
    const comments = document.getElementById('comments');
    const addCommentPanel = document.getElementById('addCommentPanel');

    // Переключаем видимость панелей в зависимости от типа
    if (panelType === 'comments') {
        comments.style.display = 'block';
        addCommentPanel.style.display = 'none';
        renderComments();
    } else if (panelType === 'addComment') {
        comments.style.display = 'none';
        addCommentPanel.style.display = 'block';
    }

    // Показываем или скрываем панель комментариев
    if (commentsPanel.style.display === 'block') {
        commentsPanel.style.display = 'none';
    } else {
        commentsPanel.style.display = 'block';
    }
}

function addComment() {
    const commentInput = document.getElementById('commentInput');
    const commentText = commentInput.value;

        // Проверка наличия текста в поле ввода
        if (commentText.trim() !== '') {
            const newComment = { text: commentText, replies: [] };
            commentsData[new Date().getTime()] = newComment;
            commentInput.value = '';
            showCommentsPanel('comments');
        }
}

function renderComments() {
    const commentsContainer = document.getElementById('comments');
    commentsContainer.innerHTML = '';
        renderCommentTree(commentsContainer, commentsData);
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