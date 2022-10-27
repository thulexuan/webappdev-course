// focus vào ô họ tên khi mới vào trang
document.getElementById("fullname").focus();

// nhập xong ô nào nhấn enter thì chuyển quyền điều khiển sang ô tiếp theo
document.getElementById("fullname").onkeyup = function (e) {
    pressEnter(e, this, "address");
}

document.getElementById("address").onkeyup = function (e) {
    pressEnter(e, this, "male");
}

document.getElementById("male").onkeyup = function (e) {
    pressEnter(e, this, "female");
}

document.getElementById("female").onkeyup = function (e) {
    pressEnter(e, this, "dob");
}

document.getElementById("dob").onkeyup = function (e) {
    pressEnter(e, this, "phone");
}

document.getElementById("email").onkeyup = function (e) {
    pressEnter(e, this, "phone");
}

document.getElementById("phone").onkeyup = function (e) {
    pressEnter(e, this, "english");
}

document.getElementById("english").onkeyup = function (e) {
    pressEnter(e, this, "management");
}

document.getElementById("management").onkeyup = function (e) {
    pressEnter(e, this, "cntt");
}

document.getElementById("cntt").onkeyup = function (e) {
    pressEnter(e, this, "username");
}

document.getElementById("username").onkeyup = function (e) {
    pressEnter(e, this, "pw");
}

document.getElementById("pw").onkeyup = function (e) {
    pressEnter(e, this, "pw_cf");
}

document.getElementById("pw_cf").onkeyup = function (e) {
    pressEnter(e, this, "note");
}

function pressEnter(e, current_input_id, next_input_id) {
    if (window.event) e = window.event;
    if (e.keyCode == 13) {
        document.getElementById(next_input_id).focus();
    }
}

// Chuẩn hóa tên khi blur ra khỏi ô input họ tên
document.getElementById("fullname").onblur = function () {
    normalizeName();
}

function normalizeName() {
    var name = document.getElementById("fullname").value.trim();
    name_array = name.split(' ');
    name_final = "";
    for (i = 0; i < name_array.length; i++) {
        if (name_array[i].length > 0) {
            name_final += name_array[i].substring(0, 1).toUpperCase();
            name_final += name_array[i].substring(1);
            name_final += " ";
        }
    }
    document.getElementById("fullname").value = name_final;
}

// kiểm tra mật khẩu gõ lại không đúng
document.getElementById("pw_cf").onchange = function (e) {
    checkPw();
}

function checkPw() {
    pw = document.getElementById("pw").value;
    pw_cf = document.getElementById("pw_cf").value;
    if (pw != pw_cf) {
        document.getElementById("pw_cf_error").innerHTML = "Mật khẩu gõ lại không đúng";
    } else {
        document.getElementById("pw_cf_error").innerHTML = "";
    }
}

// thêm dấu "/" khi gõ xong ngày hoặc tháng
document.getElementById("dob").onkeypress = function (e) {
    addSlash();
}

function addSlash() {
    var text = document.getElementById("dob").value;
    if (text.length == 2) {
        document.getElementById("dob").value = text + "/";
    }
    if (text.length == 5) {
        document.getElementById("dob").value = text + "/";
    }
}

// Blur ra khỏi ô ngày sinh thì kiểm tra xem ngày sinh đúng định dạng không
document.getElementById("dob").onblur = function () {
    text_date = document.getElementById("dob").value;
    date_array = text_date.split("/");
    day = parseInt(date_array[0]);
    month = parseInt(date_array[1]);
    year = parseInt(date_array[2]);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    checkDay = true;
    checkMonth = true;
    checkYear = true;

    // Kiểm tra với ngày tháng năm hiện tại
    if (year > yyyy) {
        checkYear = false;
    } else if (year == yyyy) {
        if (month > mm) {
            checkMonth = false;
        } else if (month == mm) {
            if (day > dd) {
                checkDay = false;
            }
        }
    }

    if (month < 1 || month > 12) {
        checkMonth = false;
    } else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        if (day < 1 || day > 31) {
            checkDay = false;
        }
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
        if (day < 1 || day > 30) {
            checkDay = false;
        }
    } else if (month == 2) {
        if (year % 4 == 0) {
            if (day < 1 || day > 29) {
                checkDay = false;
            }
        } else {
            if (day < 1 || day > 28) {
                checkDay = false;
            }
        }
    }

    if (!checkDay || !checkMonth || !checkYear) {
        document.getElementById("dob_error").innerHTML = "Ngày sinh không đúng định dạng";
    } else {
        document.getElementById("dob_error").innerHTML = "";
    }
}

// Kiểm tra định dạng email sau khi blur ra khỏi ô email
document.getElementById("email").onblur = function () {
    text_email = document.getElementById("email").value;
    if (!text_email.includes("@gmail.com")) {
        document.getElementById("email_error").innerHTML = "Email không đúng định dạng";
    } else {
        document.getElementById("email_error").innerHTML = "";
    }
}

// Hiển thị ảnh preview
document.getElementById("image").onchange = function () {
    let preview = document.querySelector("img.preview");
    let file = this.files[0];
    let reader = new FileReader();
    reader.onload = function () {
        preview.src = reader.result;
    };
    if (file) {
        reader.readAsDataURL(file);
    }
}
// click vào ô chấp nhận
document.getElementById("btn_ok").onclick = function () {
    checkRequiredField();
}

function checkRequiredField() {
    var name = document.getElementById("fullname").value;
    var address = document.getElementById("address").value;
    var dob = document.getElementById("dob").value;
    var username = document.getElementById("username").value;
    var pw = document.getElementById("pw").value;
    var pw_cf = document.getElementById("pw_cf").value;

    if (name == "") {
        document.getElementById("name_error").innerHTML = "Bạn chưa nhập họ tên";
    } else {
        document.getElementById("name_error").innerHTML = "";
    }

    if (address == "") {
        document.getElementById("address_error").innerHTML = "Bạn chưa nhập địa chỉ";
    } else {
        document.getElementById("address_error").innerHTML = "";
    }

    if (dob == "") {
        document.getElementById("dob_error").innerHTML = "Bạn chưa nhập ngày sinh";
    } else {
        document.getElementById("dob_error").innerHTML = "";
    }

    if (username == "") {
        document.getElementById("username_error").innerHTML = "Bạn chưa nhập tên sử dụng";
    } else {
        document.getElementById("username_error").innerHTML = "";
    }

    if (pw == "") {
        document.getElementById("pw_error").innerHTML = "Bạn chưa nhập mật khẩu";
    } else {
        document.getElementById("pw_error").innerHTML = "";
    }

    if (pw_cf == "") {
        document.getElementById("pw_cf_error").innerHTML = "Bạn chưa nhập lại mật khẩu";
    } else {
        document.getElementById("pw_cf_error").innerHTML = "";
    }

    if (!document.getElementById("english").checked && !document.getElementById("cntt").checked && !document.getElementById("management").checked) {
        document.getElementById("courses_error").innerHTML = "Bạn chưa chọn khóa học";
        document.getElementById("courses_error").style.paddingLeft = "26px";
    } else {
        document.getElementById("courses_error").innerHTML = "";
    }
}

// Click vào ô Bỏ qua
document.getElementById("btn_cancel").onclick = function () {
    window.location.href = "https://itest.com.vn/lects/webappdev/form/";
}