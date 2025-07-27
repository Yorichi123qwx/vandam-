document.addEventListener("DOMContentLoaded", function() {
    const gameSelection = document.getElementById("game-selection");
    const sensitivitySelection = document.getElementById("sensitivity-selection");
    const deviceSelection = document.getElementById("device-selection");
    const resultPage = document.getElementById("result");

    const freeFireBtn = document.getElementById("free-fire-btn");
    const gameSensitivityBtn = document.getElementById("game-sensitivity-btn");
    const shootSensitivityBtn = document.getElementById("shoot-sensitivity-btn");
    const pcBtn = document.getElementById("pc-btn");
    const mobileBtn = document.getElementById("mobile-btn");

    freeFireBtn.addEventListener("click", function() {
        gameSelection.classList.remove("active");
        sensitivitySelection.classList.add("active");
    });

    gameSensitivityBtn.addEventListener("click", function() {
        selectDevice("حساسية اللعبة");
    });

    shootSensitivityBtn.addEventListener("click", function() {
        selectDevice("حساسية زر الضرب");
    });

    function selectDevice(sensitivityType) {
        sensitivitySelection.classList.remove("active");
        deviceSelection.classList.add("active");
        deviceSelection.dataset.sensitivityType = sensitivityType;
    }

    pcBtn.addEventListener("click", function() {
        showResult("كمبيوتر");
    });

    mobileBtn.addEventListener("click", function() {
        showResult("هاتف");
    });

    function showResult(deviceType) {
        deviceSelection.classList.remove("active");
        resultPage.classList.add("active");

        const deviceInfo = `نوع الجهاز: ${deviceType}`;
        const sensitivityType = deviceSelection.dataset.sensitivityType;
        const sensitivityInfo = `الحساسية المطلوبة: ${sensitivityType}`;

        document.getElementById("device-info").innerText = deviceInfo;
        document.getElementById("sensitivity-info").innerText = sensitivityInfo;

        // هنا يمكنك إضافة منطق لجلب الحساسيات المناسبة بناءً على نوع الجهاز
    }

    // عرض الصفحة الأولى عند تحميل الصفحة
    gameSelection.classList.add("active");
});
