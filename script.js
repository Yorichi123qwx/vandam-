document.addEventListener("DOMContentLoaded", function () {
    const pages = {
        gameSelection: document.getElementById("game-selection"),
        sensitivitySelection: document.getElementById("sensitivity-selection"),
        deviceSelection: document.getElementById("device-selection"),
        resultPage: document.getElementById("result"),
        detectionStatus: document.getElementById("detection-status"),
        deviceInfo: document.getElementById("device-info")
    };

    const buttons = {
        freeFire: document.getElementById("free-fire-btn"),
        gameSense: document.getElementById("game-sensitivity-btn"),
        shootSense: document.getElementById("shoot-sensitivity-btn"),
        autoDetect: document.getElementById("auto-detect-btn"),
        pc: document.getElementById("pc-btn"),
        mobile: document.getElementById("mobile-btn"),
        testSense: document.getElementById("test-sensitivity")
    };

    buttons.freeFire.addEventListener("click", () => navigateTo("sensitivity"));
    buttons.gameSense.addEventListener("click", () => selectSensitivity("game"));
    buttons.shootSense.addEventListener("click", () => selectSensitivity("shoot"));
    buttons.autoDetect.addEventListener("click", autoDetectDevice);
    buttons.pc.addEventListener("click", () => selectDevice("pc"));
    buttons.mobile.addEventListener("click", () => selectDevice("mobile"));
    buttons.testSense.addEventListener("click", testSensitivity);

    let currentSelection = {
        sensitivityType: null,
        deviceType: null,
        specs: null
    };

    function navigateTo(page) {
        Object.values(pages).forEach(p => p.classList.remove("active"));

        switch (page) {
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

    async function autoDetectDevice() {
        const message = document.getElementById("detection-message");
        message.textContent = "جارٍ اكتشاف نوع الجهاز...";

        setTimeout(() => {
            const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
            const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 1;
            const deviceType = (isMobile && hasTouch) ? "mobile" : "pc";
            currentSelection.deviceType = deviceType;
            message.textContent = `تم اكتشاف جهاز ${deviceType === "mobile" ? "هاتف محمول" : "كمبيوتر"}`;
        }, 1500);
    }

    async function detectDevice() {
        pages.detectionStatus.style.display = "block";
        pages.deviceInfo.style.opacity = "0.5";

        setTimeout(async () => {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            let gpu = "غير معروف";
            if (gl) {
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (debugInfo) {
                    gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                }
            }

            const specs = {
                name: (navigator.userAgentData && navigator.userAgentData.brands)
                    ? navigator.userAgentData.brands.map(b => b.brand).join("، ")
                    : (navigator.userAgent.length > 50 ? navigator.userAgent.slice(0, 50) + "..." : navigator.userAgent),
                ram: navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "غير معروف",
                cpu: navigator.hardwareConcurrency ? `نوى المعالج: ${navigator.hardwareConcurrency}` : "غير معروف",
                gpu: gpu,
                os: detectOS()
            };

            currentSelection.specs = specs;

            document.getElementById("device-name").textContent = specs.name;
            document.getElementById("device-ram").textContent = specs.ram;
            document.getElementById("device-cpu").textContent = specs.cpu;
            document.getElementById("device-gpu").textContent = specs.gpu;
            document.getElementById("device-os").textContent = specs.os;

            pages.detectionStatus.style.display = "none";
            pages.deviceInfo.style.opacity = "1";

            generateSensitivityValues();
        }, 2500);
    }

    function detectOS() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/windows phone/i.test(userAgent)) return "Windows Phone";
        if (/android/i.test(userAgent)) return "Android";
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "iOS";
        if (/Win/.test(userAgent)) return "Windows";
        if (/Mac/.test(userAgent)) return "macOS";
        if (/Linux/.test(userAgent)) return "Linux";
        return "غير معروف";
    }

    function generateSensitivityValues() {
        const sensitivityValues = document.getElementById("sensitivity-values");
        sensitivityValues.innerHTML = "";

        const { deviceType, specs } = currentSelection;
        const ram = parseFloat(specs.ram) || 2;
        const coresMatch = specs.cpu.match(/\d+/);
        const cores = coresMatch ? parseInt(coresMatch[0]) : 2;
        const gpu = specs.gpu.toLowerCase();

        let scale = 1;

        if (ram >= 6 && cores >= 4 && !gpu.includes("intel")) {
            scale = 1.2;
        } else if (ram >= 4 && cores >= 2) {
            scale = 1;
        } else {
            scale = 0.8;
        }

        const baseValues = deviceType === "mobile"
            ? [45, 55, 65, 75]
            : [35, 45, 55, 65];

        const labels = ["العام", "المسافة القصيرة", "المتوسطة", "الميدان"];

        baseValues.forEach((val, i) => {
            const value = Math.round(val * scale);
            const div = document.createElement("div");
            div.className = "sensitivity-item";
            div.innerHTML = `<span class="sense-label">${labels[i]}</span><span class="sense-value">${value}</span>`;
            sensitivityValues.appendChild(div);
        });
    }

    function testSensitivity() {
        alert("جارٍ تجربة الحساسية الآن...\nيرجى الانتقال إلى اللعبة لتجربة الإعدادات الجديدة");
    }
});
