const audio1 = new Audio(); 
  audio1.loop = true; 
  // Không phát lại liên tục 
  audio1.src = 'music.mp3';
const twocards = [1, 3, 6, 8, 9, 12, 14, 25, 28, 29, 31, 33, 34, 35, 37, 38, 40, 46, 48, 53, 57];
const ttcard = 30;
// Mảng chứa các lá bài đã chọn
let selectedCards = [];
// Số lượng lá bài đã chọn
let selectedCount = 0;

// Mảng chứa các lá bài ẩn
let hiddenCards = [];
// Mảng chứa các lá bài đã biến mất
let removedCards = [];

// Số lượng lá bài ẩn
const hiddenCardCount = 5;

// Số lá bài trên mỗi trang
const cardsPerPage = 2;

// Tính số trang dựa trên số lá bài đã bị mất
const pageCount = Math.ceil(removedCards.length / cardsPerPage);

// Trang hiện tại
let currentPage = 1;

function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
}

// Tạo các lá bài trên trang chủ
document.getElementById("startButton").style.display = "none";
const cardContainer = document.getElementById("cardContainer");
for (let i = 1; i <= 81; i++) {
  const card = document.createElement("div");
  card.className = "card";
  card.style.backgroundImage = `url(images/card${i}.jpg)`;
  const removeeButton = document.createElement("button");
  removeeButton.textContent = "Cấm";
  removeeButton.addEventListener("click", function() {
    removeSelectedCard(card);
  });

  card.appendChild(removeeButton);
  removeeButton.style.fontSize = "30px";
  removeeButton.style.marginTop = "138%";
  removeeButton.style.marginLeft = "80%";
  removeeButton.style.backgroundColor = "#ff00001f";
  removeeButton.style.borderRadius = "5px";

  addNumberTwoToCards(twocards);
  if (twocards.includes(i)) {
    card.addEventListener("click", function(event) {
      if (event.target !== removeeButton) {
        selectCard2(card, i);
      }
    });
  } else {
    card.addEventListener("click", function(event) {
      if (event.target !== removeeButton) {
        selectCard(card, i);
      }
    });
  }

  card.setAttribute("data-card-id", i);
  cardContainer.appendChild(card);
}

// Hàm để kiểm tra trạng thái xoay màn hình
function checkOrientation() {
  if (screen.orientation && screen.orientation.type.includes("landscape")) {
    // Trang web đã ở chế độ ngang, không cần thay đổi
    return;
  }

  // Kiểm tra nếu đang trong chế độ toàn màn hình
  if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
    // Xác định các API hỗ trợ xoay màn hình
    const orientationAPI = screen.orientation || screen.mozOrientation || screen.msOrientation || screen.webkitOrientation;

    // Kiểm tra nếu API xoay màn hình khả dụng
    if (orientationAPI && orientationAPI.lock) {
      orientationAPI.lock("landscape").then(function() {
        // Xoay màn hình thành công
      }).catch(function() {
        // Xoay màn hình thất bại
      });
    }
  } else {
    // Không trong chế độ toàn màn hình, kiểm tra nếu đang ở chế độ ngang
    if (screen.orientation && screen.orientation.type.includes("portrait")) {
      // Xác định các API hỗ trợ xoay màn hình
      const orientationAPI = screen.orientation || screen.mozOrientation || screen.msOrientation || screen.webkitOrientation;

      // Kiểm tra nếu API xoay màn hình khả dụng
      if (orientationAPI && orientationAPI.lock) {
        orientationAPI.lock("portrait").then(function() {
          // Xoay màn hình thành công
        }).catch(function() {
          // Xoay màn hình thất bại
        });
      }
    }
  }
}

// Gọi hàm checkOrientation khi chuyển đổi chế độ toàn màn hình
document.addEventListener("fullscreenchange", checkOrientation);
document.addEventListener("mozfullscreenchange", checkOrientation);
document.addEventListener("webkitfullscreenchange", checkOrientation);
document.addEventListener("msfullscreenchange", checkOrientation);


// Gọi hàm checkOrientation khi chuyển đổi chế độ toàn màn hình
document.addEventListener("fullscreenchange", checkOrientation);
document.addEventListener("mozfullscreenchange", checkOrientation);
document.addEventListener("webkitfullscreenchange", checkOrientation);
document.addEventListener("msfullscreenchange", checkOrientation);


// Xử lý sự kiện khi nhấp vào nút toàn màn hình
fullscreenButton.addEventListener("click", function() {
  if (document.fullscreenElement) {
    exitFullscreen();
  } else {
    enterFullscreen();
  }
});

// Hàm để vào chế độ toàn màn hình
function enterFullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }
}

// Hàm để thoát chế độ toàn màn hình
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

// Cập nhật nội dung của nút khi chuyển đổi chế độ toàn màn hình
document.addEventListener("fullscreenchange", function() {
  if (document.fullscreenElement) {
    fullscreenButton.innerHTML = "&#x26F7;"; // Biểu tượng thoát toàn màn hình
  } else {
    fullscreenButton.innerHTML = "&#x26F6;"; // Biểu tượng toàn màn hình
  }
});

// Mảng chứa các tên tập tin nhạc
const musicFiles = ['music.m4a', 'music1.mp3', 'music2.mp3', 'music3.mp3', 'music4.mp3', 'music5.mp3', 'music2.m4a', 'music3.m4a'];

// Đối tượng âm thanh
const audio = new Audio();
audio.loop = false; // Không phát lại liên tục

// Biến kiểm tra trạng thái âm thanh (mặc định là bật)
let isAudioOn = true;
let isAudioOn2 = true;

// Hàm chuyển đổi trạng thái âm thanh
function toggleAudio() {
  if (isAudioOn) {
    audio.pause();
    isAudioOn = false;
    document.getElementById('audioControlButton').textContent = 'Bật tiếng';
  } else {
    audio.play();
    isAudioOn = true;
    document.getElementById('audioControlButton').textContent = 'Tắt tiếng';
  }
}

function toggleAudio2() {
  if (isAudioOn2) {
    audio1.pause();
    isAudioOn2 = false;
    document.getElementById('audioControlButton2').textContent = 'Bật tiếng (nền đầu)';
  } else {
    audio1.play();
    isAudioOn2 = true;
    document.getElementById('audioControlButton2').textContent = 'Tắt tiếng (nền đầu)'; 
  }
}

// Hàm phát nhạc ngẫu nhiên
function playRandomMusic() {
  const randomIndex = Math.floor(Math.random() * musicFiles.length);
  const randomMusicFile = musicFiles[randomIndex];
  audio.src = randomMusicFile;
  audio.play();
  audio1.pause();
}

// Xác định mốc thời gian mục tiêu (25-9-2023 23:59:59)
const tdate = new Date("2023-11-31T23:59:59").getTime();
const rdate = new Date("2024-01-30T23:59:59").getTime();
// Lấy thời gian hiện tại
const cdate = new Date().getTime();
// Tính khoảng thời gian còn lại đến mốc thời gian mục tiêu
const tremaining = tdate - cdate;
const rremaining = rdate - cdate;


// Lấy thẻ lá bài cụ thể
function addNoteToCards(cardList, noteText) {
  cardList.forEach(id => {
      const card = document.querySelector(`[data-card-id="${id}"]`);

      // Kiểm tra xem thẻ lá bài có tồn tại không
      if (card) {
          // Tạo một phần tử div cho ghi chú
          const note = document.createElement("div");
          note.className = "card-note";
          note.textContent = noteText;

          // Thêm phần tử ghi chú vào thẻ lá bài
          card.appendChild(note);
      }
  });
}

function addNumberTwoToCards(cardList) {
  cardList.forEach(id => {
    const card = document.querySelector(`[data-card-id="${id}"]`);

    // Kiểm tra xem thẻ lá bài có tồn tại không
    if (card) {
      // Tạo một phần tử div cho ghi chú số "2"
      const numberTwo = document.createElement("div");
      numberTwo.className = "card-number";
      numberTwo.textContent = "2";

      // Thêm phần tử ghi chú số "2" vào thẻ lá bài
      card.appendChild(numberTwo);
    }
  });
}

function removeNoteFromCards(cardList) {
  cardList.forEach(id => {
      const card = document.querySelector(`[data-card-id="${id}"]`);

      // Kiểm tra xem thẻ lá bài có tồn tại không
      if (card) {
          // Tìm và loại bỏ phần tử ghi chú nếu tồn tại
          const note = card.querySelector(".card-note");
          if (note) {
              card.removeChild(note);
          }
      }
  });
}

/*function addCustomCard() {
  for (let j = 69; j <= 72; j++) {
  const card = document.createElement("div");
  card.className = "card";
  card.style.backgroundImage = `url(images/card${j}.jpg)`;
  const removeeButton = document.createElement("button");
  removeeButton.textContent = "Cấm";
  removeeButton.addEventListener("click", function() {
    removeSelectedCard(card);
  });

  card.appendChild(removeButton);
  removeeButton.style.fontSize = "15px";
  removeButton.style.borderRadius = "5px";


  card.addEventListener("click", function(event) {
    if (event.target !== removeButton) {
      selectCard(card, j);
    }
  });
  card.setAttribute("data-card-id", j);
  cardContainer.appendChild(card);
  }};

  function removeCardById(cardId) {
    const cardToRemove = document.querySelector(`[data-card-id="${cardId}"]`);
    if (cardToRemove) {
      cardToRemove.remove();
    }
  }*/
 
  if (tremaining < 0) {
    //addCustomCard();
    audio1.src = 'music.mp3'
    audio1.play();
  addNoteToCards([54, 50, 46], "BUFF");
  addNoteToCards([36], "NERF");
  addNoteToCards([22], "ADJUST");
  addNoteToCards([75,76,77,78,79,80,81], "REWRITE");
  } else {audio1.play()}
  if (rremaining < 0) {
    // Sử dụng hàm để xóa ghi chú từ các lá bài trong mảng newcard
    removeNoteFromCards([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81]);
    audio1.src = 'tetmusic.mp3'
    audio1.play();
    //for (let z = 69; z <= 72; z++) { removeCardById(z); }
  }
// Chọn lá bài

// Thêm hàm để cập nhật hiển thị số lá bài đã chọn
function updateSelectedCount() {
  selectedCountDisplay.textContent = `Đã chọn ${selectedCount} lá bài`;
}

function selectCard(card, cardIndex) {
  if (selectedCount < ttcard) {
    if (!selectedCards.includes(cardIndex)) {
      selectedCards.push(cardIndex);
      selectedCount++;
      updateSelectedCount()
      card.style.border = "5px solid yellow";
    } else {
      selectedCards = selectedCards.filter(item => item !== cardIndex);
      selectedCount--;
      updateSelectedCount()
      card.style.border = "none";
    }
  }
  if (selectedCount === ttcard-1) {selectedCountDisplay.textContent = `Đã chọn ${selectedCount} lá bài, chọn lá nữa sẽ khóa chọn`;}
  if (selectedCount === ttcard) {
    document.getElementById("startButton").style.display = "block";
    selectedCountDisplay.textContent = `Đã khóa chọn ${selectedCount} lá bài, hãy ấn bắt đầu`;
  } else {
    document.getElementById("startButton").style.display = "none";
  }
}

function selectCard2(card, cardIndex) {
  if (selectedCount < ttcard) {
    if (!selectedCards.includes(cardIndex)) {
      selectedCards.push(cardIndex);
      selectedCount++;
      updateSelectedCount();
      card.style.border = "5px solid yellow";
    } else {
      // Nếu card đã được chọn, thực hiện thêm card thứ 2
      if (!selectedCards.includes(cardIndex + '_2')) {
        selectedCards.push(cardIndex + '_2');
        selectedCount++;
        updateSelectedCount();
        card.style.border = "5px solid red";
      } else {
        // Bỏ chọn card khi click lần nữa
        selectedCards = selectedCards.filter(item => item !== cardIndex && item !== cardIndex + '_2');
        selectedCount -= 2;
        updateSelectedCount();
        card.style.border = "none";
      }
    }
  }

  // Các điều kiện hiển thị thông báo
  if (selectedCount === ttcard - 2) {
    selectedCountDisplay.textContent = `Đã chọn ${selectedCount} lá bài, chọn 2 lá nữa sẽ khóa chọn`;
  }
  if (selectedCount === ttcard - 1) {
    selectedCountDisplay.textContent = `Đã chọn ${selectedCount} lá bài, chọn lá nữa sẽ khóa chọn`;
  }

  if (selectedCount === ttcard) {
    document.getElementById("startButton").style.display = "block";
    document.getElementById("save").style.display = "block";
    selectedCountDisplay.textContent = `Đã khóa chọn ${selectedCount} lá bài, hãy ấn bắt đầu`;
  } else {
    document.getElementById("startButton").style.display = "none";
  }
}


// Lệnh xóa bài lúc đầu
function removeSelectedCard(card) {
  card.remove();
  if (card.style.border === "5px solid yellow") {
    selectedCount--;
    selectedCards = selectedCards.filter(item => item !== cardIndex);
  }
}

function setCookieinGame(seconds) {
  const date = new Date();
  date.setTime(date.getTime() + (seconds * 1000)); // Chuyển đổi giây thành mili giây
  const expires = "expires=" + date.toUTCString();
      // Chuyển đổi các mảng thành chuỗi JSON
      const selectedCardsJSON = JSON.stringify(selectedCards);
      const hiddenCardsJSON = JSON.stringify(hiddenCards);
      const removedCardsJSON = JSON.stringify(removedCards);
  document.cookie = "selectedCards=" + selectedCardsJSON + ";" + expires + ";path=/";
  document.cookie = "hiddenCards=" + hiddenCardsJSON + ";" + expires + ";path=/";
  document.cookie = "removedCards=" + removedCardsJSON + ";" + expires + ";path=/";
}


// Bắt đầu trò chơi
function startGame() {
  document.getElementById("selectedCountDisplay").style.display = "none";
  document.getElementById("cardContainer").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";
  document.getElementById("startButton").style.display = "none"
  document.getElementById('audioControlButton').style.display = "block";
  audio1.pause();
  isAudioOn2 = false;
  document.getElementById('audioControlButton2').style.display = 'none';
  document.getElementById('logout').style.display = 'none';
  // Kiểm tra trạng thái âm thanh và phát hoặc tắt nó
  if (isAudioOn) {
    playRandomMusic();
  } else {
    audio.pause();
  }
  window.addEventListener('beforeunload', function (e) {
    // Thông điệp cảnh báo khi trang web được làm mới
    var confirmationMessage = 'Dữ liệu thẻ bài sẽ mất nếu bạn làm mới trang. Bạn có chắc chắn muốn tiếp tục?';

    // (Some browsers) Gán thông điệp cảnh báo cho sự kiện
    e.returnValue = confirmationMessage;

    // (Modern browsers) Trả về thông điệp cảnh báo
    return confirmationMessage;
});
// Sự kiện phát nhạc tiếp theo khi nhạc kết thúc
audio.addEventListener('ended', playRandomMusic);


  // Gán số biến cho từng lá bài đã chọn
  const cardVariables = {};
  for (let i = 0; i < selectedCards.length; i++) {
    cardVariables[selectedCards[i]] = i + 1;
  }

  // Lưu số biến của lá bài vào mảng
  const cardVariableArray = selectedCards.map(card => cardVariables[card]);

  // Chọn ngẫu nhiên 3 lá bài từ các lá đã chọn
  hiddenCards = getRandomCards(selectedCards, 3, cardVariableArray);

  renderHiddenCards();

  const card = document.createElement("div");
    card.className = "card";
    card.style.backgroundImage = `url(images/card${cardIndex}.jpg)`;
    card.addEventListener("click", function() {
    });
    
    // Hiển thị lá bài ẩn
    const hiddenCardsContainer = document.getElementById("hiddenCards");
    hiddenCardsContainer.innerHTML = "";

    const hiddenCardsWrapper = document.createElement("div");
    hiddenCardsWrapper.className = "hidden-cards-wrapper";

  hiddenCards.forEach(function(cardIndex) {
  const cardElement = document.createElement("div");
  cardElement.className = "card large";
  cardElement.style.backgroundImage = `url(images/card${cardIndex}.jpg)`;

  const removeButton = document.createElement("button");
  removeButton.textContent = "X";
  removeButton.style.marginLeft = "55px";
  removeButton.style.fontSize = "24px";
  removeButton.style.padding = "10px 20px";
  removeButton.style.borderRadius = "5px";
  removeButton.addEventListener("click", function(event) {
    event.stopPropagation();
    new Audio("remove.mp3").play();
    removeHiddenCard(cardElement, cardIndex);
  });

  const starButton = document.createElement("button");
  starButton.textContent = "+";
  starButton.style.fontSize = "24px";
  starButton.style.padding = "10px 20px";
  starButton.style.borderRadius = "5px";
  starButton.addEventListener("click", function(event) {
    event.stopPropagation();
    addStar(cardIndex);
  });

  const unstarButton = document.createElement("button");
  unstarButton.textContent = "-";
  unstarButton.style.fontSize = "24px";
  unstarButton.style.padding = "10px 20px";
  unstarButton.style.borderRadius = "5px";
  unstarButton.addEventListener("click", function(event) {
    event.stopPropagation();
    removeStar(cardIndex);
  });

  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "buttons-container";
  buttonsContainer.appendChild(removeButton);
  buttonsContainer.appendChild(starButton);
  buttonsContainer.appendChild(unstarButton);

  const cardContainer = document.createElement("div");
  cardContainer.className = "card-container";
  cardContainer.appendChild(cardElement);
  cardContainer.appendChild(buttonsContainer);

  hiddenCardsWrapper.appendChild(cardContainer);
  });

  hiddenCardsContainer.appendChild(hiddenCardsWrapper);
  updateAddCardButtonVisibility();
}

// Lấy một số ngẫu nhiên không trùng lặp từ mảng
function getRandomNumberArray(array, count) {
  const randomArray = [];
  while (randomArray.length < count) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomNumber = array[randomIndex];
    if (!randomArray.includes(randomNumber)) {
      randomArray.push(randomNumber);
    }
  }
  return randomArray;
}

// Chọn ngẫu nhiên các lá bài ẩn từ danh sách lá bài đã chọn
function getRandomCards(cards, count, cardVariables) {
  const cardCount = cards.length;
  const randomIndices = getRandomNumberArray([...Array(cardCount).keys()], count);
  const randomCards = randomIndices.map(index => cards[index]);
  const randomCardVariables = randomCards.map(card => cardVariables[card]);
  return randomCards.sort((a, b) => cardVariables[a] - cardVariables[b]);
}

// Render các lá bài ẩn
function renderHiddenCards() {
  const hiddenCardsContainer = document.getElementById("hiddenCards");
  hiddenCardsContainer.innerHTML = "";

  hiddenCards.forEach(function(cardIndex) {
    const cardElement = document.createElement("div");
    cardElement.className = "card large";
    cardElement.style.backgroundImage = `url(images/card_back.jpg)`;
    cardElement.addEventListener("click", function() {
      toggleHiddenCard(cardElement, cardIndex);
    });

    // Hiển thị số sao tương ứng
    for (let i = 1; i <= starStatus[cardIndex]; i++) {
      addStarText(cardElement);
    }

    const removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.style.marginLeft = "55px";
    removeButton.style.fontSize = "24px";
    removeButton.style.padding = "10px 20px";
    removeButton.style.borderRadius = "5px";
    removeButton.addEventListener("click", function(event) {
      event.stopPropagation();
      new Audio("remove.mp3").play();
      removeHiddenCard(cardIndex);
    });

    const starButton = document.createElement("button");
    starButton.textContent = "+";
    starButton.style.fontSize = "24px";
    starButton.style.padding = "10px 20px";
    starButton.style.borderRadius = "5px";
    starButton.addEventListener("click", function(event) {
      event.stopPropagation();
      addStar(cardIndex);
    });

    const unstarButton = document.createElement("button");
    unstarButton.textContent = "-";
    unstarButton.style.fontSize = "24px";
    unstarButton.style.padding = "10px 20px";
    unstarButton.style.borderRadius = "5px";
    unstarButton.addEventListener("click", function(event) {
      event.stopPropagation();
      removeStar(cardIndex);
    });

    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "buttons-container";
    buttonsContainer.appendChild(removeButton);
    buttonsContainer.appendChild(starButton);
    buttonsContainer.appendChild(unstarButton);

    const cardContainer = document.createElement("div");
    cardContainer.className = "card-container";
    cardContainer.appendChild(cardElement);
    cardContainer.appendChild(buttonsContainer);

    hiddenCardsContainer.appendChild(cardContainer);
  });

  updateAddCardButtonVisibility();
}


// Toggle hiển thị lá bài ẩn
function toggleHiddenCard(card, cardIndex) {
  card.classList.toggle("flipped");
  if (card.classList.contains("flipped")) {
    card.style.backgroundImage = `url(images/card${cardIndex}.jpg)`;
  } else {
    card.style.backgroundImage = `url(images/card_back.jpg)`;
  }
}

// Lấy đường dẫn hình ảnh cho lá bài theo index
function getCardImagePath(cardIndex) {
  if (cardIndex === "back") {
    return "url(images/card_back.jpg)";
  } else {
    return `url(images/card${cardIndex}.jpg)`;
  }
}


// Cập nhật hiển thị nút "Thêm lá bài"
function updateAddCardButtonVisibility() {
  const addCardButton = document.getElementById("addCardButton");
  if (hiddenCards.length >= hiddenCardCount) {
    addCardButton.style.display = "none";
  } else {
    addCardButton.style.display = "block";
  }
}
// Xóa lá bài ẩn
function removeHiddenCard(cardIndex) {
  // Kiểm tra xem lá bài có trong hiddenCards hay không
  if (hiddenCards.includes(cardIndex)) {
    hiddenCards = hiddenCards.filter(item => item !== cardIndex);
    removedCards.push(cardIndex);
    renderHiddenCards();
    renderRemovedCards();
    renderPagination();

    // Chuyển lá bài đã xóa xuống lịch sử
    const removedCardItem = document.createElement("div");
    removedCardItem.className = "removed-card-item";
    removedCardItem.style.backgroundImage = `url(images/card${cardIndex}.jpg)`;
    removedCardItem.addEventListener("click", function() {
      restoreCard(cardIndex);
    });

    moveRemovedCardToBottom(removedCardItem);
  }
}



// Hiển thị lịch sử bài bị mất
const removedCardsContainer = document.getElementById("removedCards");
removedCardsContainer.innerHTML = "";
removedCards.forEach(function(card) {
  const removedCardItem = document.createElement("div");
  removedCardItem.className = "removed-card-item";
  removedCardItem.style.backgroundImage = `url(images/card${card}.jpg)`;
  removedCardItem.addEventListener("click", function() {
    restoreCard(card);
  });
  removedCardsContainer.appendChild(removedCardItem);
});

// Render lịch sử bài bị mất
function renderRemovedCards() {
  const removedCardsContainer = document.getElementById("removedCards");
  removedCardsContainer.innerHTML = "";

  removedCards.forEach(function(card) {
    const removedCardItem = document.createElement("div");
    removedCardItem.className = "removed-card-item";
    removedCardItem.style.backgroundImage = `url(images/card${card}.jpg)`;
    removedCardItem.addEventListener("click", function() {
      restoreCard(card);
    });

    moveRemovedCardToBottom(removedCardItem);
  });
}

// Render phân trang
function renderPagination() {
  const paginationContainer = document.getElementById("paginationContainer");
  paginationContainer.innerHTML = "";

  const pageCount = Math.ceil(removedCards.length / 4);
  for (let i = 1; i <= pageCount; i++) {
    const paginationItem = document.createElement("div");
    paginationItem.className = "pagination-item";
    paginationItem.textContent = i;
    paginationItem.addEventListener("click", function() {
      showRemovedCards(i);
    });
    paginationContainer.appendChild(paginationItem);
  }
}

// Hiển thị các lá bài bị mất theo trang
function showRemovedCards(page) {
  const startIndex = (page - 1) * 4;
  const endIndex = page * 4;

  const removedCardsContainer = document.getElementById("removedCards");
  removedCardsContainer.innerHTML = "";

  for (let i = startIndex; i < endIndex; i++) {
    if (i >= removedCards.length) {
      break;
    }

    const card = removedCards[i];
    const removedCardItem = document.createElement("div");
    removedCardItem.className = "removed-card-item";
    removedCardItem.style.backgroundImage = `url(images/card${card}.jpg)`;
    removedCardItem.addEventListener("click", function() {
      restoreCard(card);
    });
    removedCardsContainer.appendChild(removedCardItem);
  }
}

// Phục hồi lá bài
function restoreCard(card) {
  hiddenCards.push(card);
  new Audio("restore.mp3").play();
  removedCards = removedCards.filter(item => item !== card);
  renderHiddenCards();
  renderRemovedCards();
  renderPagination();
}

// Thêm lá bài
function addCard() {
  if (selectedCount === ttcard) {
    const availableCards = selectedCards.filter(card => !hiddenCards.includes(card) && !removedCards.includes(card));
    if (availableCards.length === 0) {
      alert("Thẻ bài của bạn đã hết");
    } else {
      let randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
      while (hiddenCards.includes(randomCard)) {
        randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
      }
      new Audio("add.mp3").play();
      hiddenCards.push(randomCard);
      renderHiddenCards();
      if (hiddenCards.length >= hiddenCardCount) {
        addCardButton.style.display = "none";
      } else {
        addCardButton.style.display = "block";
      }
      const removeButton = document.createElement("button");
      removeButton.textContent = "X";
      removeButton.style.marginLeft = "55px";
      removeButton.style.marginTop = "5px";
      removeButton.style.fontSize = "24px";
      removeButton.style.padding = "10px 20px";
      removeButton.style.borderRadius = "5px";
      removeButton.addEventListener("click", function(event) {
        event.stopPropagation();
        new Audio("remove.mp3").play();
        removeHiddenCard(randomCard);
      });

      const starButton = document.createElement("button");
      starButton.textContent = "+";
      starButton.style.fontSize = "24px";
      starButton.style.padding = "10px 20px";
      starButton.style.borderRadius = "5px";
      starButton.addEventListener("click", function(event) {
        event.stopPropagation();
        addStar(randomCard);
      });

      const unstarButton = document.createElement("button");
      unstarButton.textContent = "-";
      unstarButton.style.fontSize = "24px";
      unstarButton.style.padding = "10px 20px";
      unstarButton.style.borderRadius = "5px";
      unstarButton.addEventListener("click", function(event) {
        event.stopPropagation();
        removeStar(randomCard);
      });

      const buttonsContainer = document.createElement("div");
      buttonsContainer.appendChild(removeButton);
      buttonsContainer.appendChild(starButton);
      buttonsContainer.appendChild(unstarButton);

      const cardContainer = document.createElement("div");
      cardContainer.appendChild(cardElement);
      cardContainer.appendChild(buttonsContainer);
      hiddenCardsContainer.appendChild(cardContainer);
    }
  }
}

// Mảng lưu trạng thái sao của mỗi lá bài
let starStatus = {};

// Hàm để đánh dấu ngôi sao trên lá bài
function addStar(card) {
  const hiddenCardsContainer = document.getElementById("hiddenCards");
  const cards = hiddenCardsContainer.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    const cardElement = cards[i];
    if (cardElement.style.backgroundImage.includes(`card${card}.jpg`)) {
      // Kiểm tra nếu lá bài chưa có trạng thái sao thì tạo mới
      if (!starStatus.hasOwnProperty(card)) {
        starStatus[card] = 0;
      }

      // Tăng giá trị trạng thái sao
      starStatus[card]++;

      // Tạo một thẻ span để hiển thị sao
      const star = document.createElement("span");
      star.className = "star";
      star.textContent = "*";

      // Thêm sao vào lá bài
      cardElement.appendChild(star);

      break;
    }
  }
}


// Hàm để hiển thị số sao trên lá bài
function addStarText(cardElement) {
  const star = document.createElement("span");
  star.className = "star";
  star.textContent = "*";
  // Thêm sao vào lá bài
  cardElement.appendChild(star);
}

function removeStar(card) {
  const hiddenCardsContainer = document.getElementById("hiddenCards");
  const cards = hiddenCardsContainer.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    const cardElement = cards[i];
    if (cardElement.style.backgroundImage.includes(`card${card}.jpg`)) {
      // Kiểm tra nếu lá bài không có trạng thái sao thì không thực hiện gì cả
      if (!starStatus.hasOwnProperty(card) || starStatus[card] <= 0) {
        return;
      }

      // Giảm giá trị trạng thái sao
      starStatus[card]--;

      // Xóa tất cả các sao và hiển thị lại số sao mới
      removeAllStars(cardElement);
      for (let j = 1; j <= starStatus[card]; j++) {
        addStarText(cardElement, j);
      }
      break;
    }
  }
}

// Hàm để xóa tất cả các sao từ lá bài
function removeAllStars(cardElement) {
  const stars = cardElement.getElementsByClassName("star");
  const starTexts = cardElement.getElementsByClassName("star-text");
  while (stars.length > 0) {
    stars[0].remove();
  }
  while (starTexts.length > 0) {
    starTexts[0].remove();
  }
}



// Hàm để di chuyển lá bài đã bị xóa xuống dưới của thanh lịch sử
function moveRemovedCardToBottom(card) {
  const removedCardsContainer = document.getElementById("removedCards");
  const removedCardItems = removedCardsContainer.getElementsByClassName("removed-card-item");
  if (removedCardItems.length >= cardsPerPage) {
    removedCardsContainer.removeChild(removedCardItems[0]);
  }
  removedCardsContainer.appendChild(card);
}
