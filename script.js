document.addEventListener("DOMContentLoaded", function() {
    // DOM Elements
    const pages = {
        gameSelection: document.getElementById("game-selection"),
        sensitivitySelection: document.getElementById("sensitivity-selection"),
        deviceSelection: document.getElementById("device-selection"),
        resultPage: document.getElementById("result"),
        detectionStatus: document.getElementById("detection-status"),
        deviceInfo: document.getElementById("device-info")
    };

    // Buttons
    const buttons = {
        freeFire: document.getElementById("free-fire-btn"),
        gameSense: document.getElementById("game-sensitivity-btn"),
        shootSense: document.getElementById("shoot-sensitivity-btn"),
        autoDetect: document.getElementById("auto-detect-btn"),
        pc: document.getElementById("pc-btn"),
        mobile: document.getElementById("mobile-btn"),
        testSense: document.getElementById("test-sensitivity")
    };

    // Navigation
    buttons.freeFire.addEventListener("click", () => navigateTo("sensitivity"));
    buttons.gameSense.addEventListener("click", () => selectSensitivity("game"));
    buttons.shootSense.addEventListener("click", () => selectSensitivity("shoot"));
    buttons.autoDetect.addEventListener("click", autoDetectDevice);
    buttons.pc.addEventListener("click", () => selectDevice("pc"));
    buttons.mobile.addEventListener("click", () => selectDevice("mobile"));
    buttons.testSense.addEventListener("click", testSensitivity);

    // Current selection
    let currentSelection = {
        sensitivityType: null,
        deviceType: null,
        specs: null
    };

    function navigateTo(page) {
        // Hide all pages
        Object.values(pages).forEach(p => p.classList.remove("active"));
        
        // Show requested page
        switch(page) {
            case "sensitivity":
                pages.sensitivitySelection.classList.add("active");
                break;
            case "device":
                pages.deviceSelection.classList.add("active");
                break;
            case "result":
                pages.resultPage.classList.add("active");
                detectDevice();
                break;
        }
    }

    function selectSensitivity(type) {
        currentSelection.sensitivityType = type;
        navigateTo("device");
    }

    function selectDevice(type) {
        currentSelection.deviceType = type;
        navigateTo("result");
    }

    function autoDetectDevice() {
        const message = document.getElementById("detection-message");
        message.textContent = "جاري اكتشاف نوع الجهاز...";
        
        // Simulate detection delay
        setTimeout(() => {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            currentSelection.deviceType = isMobile ? "mobile" : "pc";
            message.textContent = `تم اكتشاف جهاز ${isMobile ? "هاتف محمول" : "كمبيوتر"}`;
        }, 1500);
    }

    function detectDevice() {
        // Show loading
        pages.detectionStatus.style.display = "block";
        pages.deviceInfo.style.opacity = "0.5";
        
        setTimeout(() => {
            // Get device specs
            const specs = {
                name: navigator.platform,
                ram: navigator.deviceMemory ? `${navigator.deviceMemory}GB` : "غير معروف",
                cpu: navigator.hardwareConcurrency ? `نوى المعالج: ${navigator.hardwareConcurrency}` : "غير معروف",
                os: `${navigator.platform} (${navigator.userAgent})`
            };
            
            currentSelection.specs = specs;
            
            // Update UI
            document.getElementById("device-name").textContent = specs.name;
            document.getElementById("device-ram").textContent = specs.ram;
            document.getElementById("device-cpu").textContent = specs.cpu;
            document.getElementById("device-os").textContent = specs.os;
            
            // Hide loading
            pages.detectionStatus.style.display = "none";
            pages.deviceInfo.style.opacity = "1";
            
            // Generate sensitivity values
            generateSensitivityValues();
        }, 2500);
    }

    function generateSensitivityValues() {
        const sensitivityValues = document.getElementById("sensitivity-values");
        sensitivityValues.innerHTML = "";
        
        // Generate values based on device type
        const values = [];
        
        if (currentSelection.deviceType === "mobile") {
            values.push(["العام", "45"]);
            values.push(["المسافة القصيرة", "55"]);
            values.push(["المتوسطة", "65"]);
            values.push(["الميدان", "75"]);
        } else {
            values.push(["العام", "35"]);
            values.push(["المسافة القصيرة", "45"]);
            values.push(["المتوسطة", "55"]);
            values.push(["الميدان", "65"]);
        }
        
        values.forEach(val => {
            const div = document.createElement("div");
            div.className = "sensitivity-item";
            div.innerHTML = `<span class="sense-label">${val[0]}</span><span class="sense-value">${val[1]}</span>`;
            sensitivityValues.appendChild(div);
        });
    }

    function testSensitivity() {
        alert("جارٍ تجربة الحساسية الآن...\nيرجى الانتقال إلى اللعبة لتجربة الإعدادات الجديدة");
        // In a real implementation, this would trigger actual sensitivity adjustments
    }
});
