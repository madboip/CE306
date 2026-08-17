let amountOne = document.getElementById("amount-one");
let amountTwo = document.getElementById("amount-two");

let currencyOne = document.getElementById("currency-one");
let currencyTwo = document.getElementById("currency-two");

let rate = document.getElementById("rate");
let time = document.getElementById("time");


// อัตราแลกเปลี่ยน
let money = {
    THB: {
        USD: 0.028,
        EUR: 0.024
    },

    USD: {
        THB: 35.50,
        EUR: 0.86
    },

    EUR: {
        THB: 41.30,
        USD: 1.16
    }
};


// ========================
// ปุ่มแปลงเงิน
// ========================

document.getElementById("convert").onclick = function () {

    let from = currencyOne.value;
    let to = currencyTwo.value;

    // ยังไม่ได้กรอกเงิน
    if (amountOne.value == "" && amountTwo.value == "") {
        alert("กรุณากรอกจำนวนเงิน");
        return;
    }


    // สกุลเงินเหมือนกัน
    if (from == to) {

        if (amountOne.value != "") {
            amountTwo.value = amountOne.value;
        } else {
            amountOne.value = amountTwo.value;
        }

        rate.innerHTML = "1 " + from + " = 1 " + to;

    } else {

        let exchangeRate = money[from][to];


        // กรอกจากช่องแรก
        if (amountOne.value != "") {

            let amount = Number(amountOne.value);

            let result = amount * exchangeRate;

            amountTwo.value = result.toFixed(2);

        }


        // กรอกจากช่องที่สอง
        else {

            let amount = Number(amountTwo.value);

            let result = amount / exchangeRate;

            amountOne.value = result.toFixed(2);
        }


        rate.innerHTML =
            "1 " + from +
            " = " + exchangeRate +
            " " + to;
    }


    // แสดงเวลาปัจจุบัน
    let now = new Date();

    time.innerHTML =
        "อัปเดตล่าสุด: " +
        now.toLocaleString("th-TH");


    // บันทึกประวัติ
    saveHistory();
};


// ========================
// ปุ่มสลับสกุลเงิน
// ========================

document.getElementById("swap").onclick = function () {

    // สลับสกุลเงิน
    let tempCurrency = currencyOne.value;

    currencyOne.value = currencyTwo.value;
    currencyTwo.value = tempCurrency;


    // สลับจำนวนเงิน
    let tempAmount = amountOne.value;

    amountOne.value = amountTwo.value;
    amountTwo.value = tempAmount;


    rate.innerHTML =
        "กรุณากดปุ่ม แปลงเงิน";

    time.innerHTML =
        "ยังไม่มีการอัปเดต";
};


// ========================
// ปุ่มล้างข้อมูล
// ========================

document.getElementById("clear").onclick = function () {

    amountOne.value = "";
    amountTwo.value = "";

    rate.innerHTML =
        "อัตราแลกเปลี่ยนจะแสดงที่นี่";

    time.innerHTML =
        "ยังไม่มีการอัปเดต";
};


// ========================
// บันทึกประวัติ
// ========================

function saveHistory() {

    if (
        amountOne.value == "" ||
        amountTwo.value == ""
    ) {
        return;
    }


    let text =
        amountOne.value + " " +
        currencyOne.value +
        " → " +
        amountTwo.value + " " +
        currencyTwo.value;


    let history =
        JSON.parse(localStorage.getItem("history")) || [];


    history.unshift(text);


    // เก็บ 10 รายการล่าสุด
    history = history.slice(0, 10);


    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );


    showHistory();
}


// ========================
// แสดงประวัติ
// ========================

function showHistory() {

    let history =
        JSON.parse(localStorage.getItem("history")) || [];


    let list =
        document.getElementById("history");


    list.innerHTML = "";


    history.forEach(function (item) {

        let li = document.createElement("li");

        li.innerHTML = item;

        list.appendChild(li);
    });
}


// ========================
// ล้างประวัติ
// ========================

document.getElementById("clear-history").onclick = function () {

    localStorage.removeItem("history");

    showHistory();
};


// แสดงประวัติเมื่อเปิดเว็บ
showHistory();