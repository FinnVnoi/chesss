// Lấy các phần tử từ DOM
const loginContainer = document.getElementById("loginContainer");
const contentContainer = document.getElementById("contentContainer");
const loggedInUser = document.getElementById("loggedInUser");

// Một đối tượng đại diện cho các tài khoản người dùng. Trong thực tế, bạn có thể lấy dữ liệu này từ một nguồn dữ liệu như cơ sở dữ liệu.
const userAccounts = [
    { username: "amin", password: "123" },
    { username: "hungvotai", password: "123h" },
    // Thêm các tài khoản khác ở đây
];
function setCookie(name, value, seconds) {
    const date = new Date();
    date.setTime(date.getTime() + (seconds * 1000)); // Chuyển đổi giây thành mili giây
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}


// Hàm xử lý đăng nhập
function login() {
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    // Kiểm tra tài khoản và mật khẩu
    const user = userAccounts.find(user => user.username === usernameInput && user.password === passwordInput);

    if (user) {
        /*if (usernameInput === "AMin" && passwordInput === "123") {
            // Xử lý khi đăng nhập bằng tài khoản "amindeptrai"
            // Thay đổi nội dung, hiển thị iframe hoặc bất kỳ hành động nào bạn muốn
            // Ví dụ:
            // window.location.href = 'link-cua-ban'; // Chuyển hướng tới một trang khác
            alert("Azota by A Min 👑");
            const newWindow = window.open('https://azota.vn/de-thi/r1qz5t', '_self');
if (newWindow) {
  if (newWindow.document.documentElement.requestFullscreen) {
    newWindow.document.documentElement.requestFullscreen();
  } else if (newWindow.document.documentElement.mozRequestFullScreen) { // Firefox
    newWindow.document.documentElement.mozRequestFullScreen();
  } else if (newWindow.document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
    newWindow.document.documentElement.webkitRequestFullscreen();
  }
}
            loginContainer.style.display = "none";
            return;  // Thoát khỏi hàm sau khi xử lý khi đăng nhập với tài khoản "amindeptrai"
        }*/

        // Đăng nhập thành công với tài khoản khác
        // Thực hiện các hành động bạn muốn ở đây
        alert("Chào mừng " + usernameInput);
    } else {
        alert("Đăng nhập không thành công. Vui lòng kiểm tra tài khoản hoặc mật khẩu.");
        return;
    }

    // Common actions for both cases
    loginContainer.style.display = "none";
    contentContainer.style.display = "block";
    document.getElementById("selectedCountDisplay").style.display = "block";
    document.getElementById("cardContainer").style.display = "block";
    document.getElementById("META").style.display = "block";
    document.getElementById("startButton").style.display = "none";
    document.getElementById("logout").style.display = "block";
    audio1.play();
    document.getElementById('audioControlButton2').textContent = 'Tắt tiếng (nền đầu)';
    document.getElementById('audioControlButton2').style.display = "block";
    setCookie("username", user.username, 2700);
    GameDataFromCookie();
}



function getCookie(name) {
    const cookieName = name + "=";
    const cookies = decodeURIComponent(document.cookie).split(";");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

// Hàm để lấy giá trị từ cookie dựa trên tên
function getCookieValue(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
  }
  
  // Hàm để tải giá trị từ cookie và gán lại vào biến
  function GameDataFromCookie() {
    // Lấy giá trị từ cookie dựa trên tên
  
    // Kiểm tra xem cookie có dữ liệu hay không
    if (selectedCardsJSON !== "") {
        // Chuyển đổi chuỗi JSON thành mảng và gán vào biến
      selectedCards = JSON.parse(selectedCardsJSON);
      hiddenCards = JSON.parse(hiddenCardsJSON);
      removedCards = JSON.parse(removedCardsJSON);
      availableCards = JSON.pasre(availableCards);
      document.getElementById("gameContainer").style.display = "block";
      document.getElementById("cardContainer").style.display = "none";
      document.getElementById("META").style.display = "none";
      document.getElementById("startButton").style.display = "none";
      document.getElementById('audioControlButton2').style.display = "none";
      document.getElementById("logout").style.display = "none"; 
    }
  }

document.addEventListener("DOMContentLoaded", function () {
    const savedUsername = getCookie("username");

    if (savedUsername !== "") {
        // Nếu có cookie với tên người dùng, hiển thị nội dung sau khi đăng nhập và gán tên người dùng
        loginContainer.style.display = "none";
        document.getElementById("selectedCountDisplay").style.display = "block";
        document.getElementById("cardContainer").style.display = "block";
        document.getElementById("META").style.display = "block";
        document.getElementById("startButton").style.display = "none";
        audio1.play();
        document.getElementById('audioControlButton2').style.display = "block";
        isAudioOn2 = false;
        document.getElementById('audioControlButton2').textContent = 'Bật tiếng (nền đầu)';
        document.getElementById("logout").style.display = "block";
        loggedInUser.textContent = savedUsername;
        GameDataFromCookie();
    }
});

function logout() {
loginContainer.style.display = "block";
/*document.getElementById("cardContainer").style.display = "none";
document.getElementById("META").style.display = "none";
document.getElementById("startButton").style.display = "none";
document.getElementById('audioControlButton2').style.display = "none";
document.getElementById("logout").style.display = "none";*/
deleteAllCookies();
// Khi bạn muốn tải lại trang web, sử dụng:
location.reload();
}