// Enhanced Free Fire Sensitivity Tool
document.addEventListener("DOMContentLoaded", function () {
    // Initialize components
    const deviceDetector = new EnhancedDeviceDetector();
    const sensitivityDB = new FreeFireSensitivityDatabase();
    
    // Page elements
    const pages = {
        gameSelection: document.getElementById("game-selection"),
        sensitivitySelection: document.getElementById("sensitivity-selection"),
        fingerSelection: document.getElementById("finger-selection"),
        deviceSelection: document.getElementById("device-selection"),
        resultPage: document.getElementById("result"),
        detectionStatus: document.getElementById("detection-status"),
        deviceInfo: document.getElementById("device-info")
    };

    // Button elements
    const buttons = {
        freeFire: document.getElementById("free-fire-btn"),
        gameSense: document.getElementById("game-sensitivity-btn"),
        shootSense: document.getElementById("shoot-sensitivity-btn"),
        autoDetect: document.getElementById("auto-detect-btn"),
        pc: document.getElementById("pc-btn"),
        mobile: document.getElementById("mobile-btn"),
        tablet: document.getElementById("tablet-btn"),
        testSense: document.getElementById("test-sensitivity"),
        copySettings: document.getElementById("copy-settings"),
        shareSettings: document.getElementById("share-settings")
    };

    // Current selection state
    let currentSelection = {
        game: null,
        sensitivityType: null,
        fingerCount: 4,
        deviceType: null,
        deviceInfo: null,
        sensitivityResult: null
    };

    // Event listeners
    setupEventListeners();

    function setupEventListeners() {
        // Game selection
        if (buttons.freeFire) {
            buttons.freeFire.addEventListener("click", () => selectGame("freefire"));
        }

        // Sensitivity type selection
        if (buttons.gameSense) {
            buttons.gameSense.addEventListener("click", () => selectSensitivityType("game"));
        }
        if (buttons.shootSense) {
            buttons.shootSense.addEventListener("click", () => selectSensitivityType("shoot"));
        }

        // Finger count selection
        setupFingerSelection();

        // Device selection
        if (buttons.autoDetect) {
            buttons.autoDetect.addEventListener("click", autoDetectDevice);
        }
        if (buttons.pc) {
            buttons.pc.addEventListener("click", () => selectDevice("desktop"));
        }
        if (buttons.mobile) {
            buttons.mobile.addEventListener("click", () => selectDevice("mobile"));
        }
        if (buttons.tablet) {
            buttons.tablet.addEventListener("click", () => selectDevice("tablet"));
        }

        // Action buttons
        if (buttons.testSense) {
            buttons.testSense.addEventListener("click", testSensitivity);
        }
        if (buttons.copySettings) {
            buttons.copySettings.addEventListener("click", copySettings);
        }
        if (buttons.shareSettings) {
            buttons.shareSettings.addEventListener("click", shareSettings);
        }
    }

    function setupFingerSelection() {
        const fingerCards = document.querySelectorAll('.finger-card');
        fingerCards.forEach(card => {
            card.addEventListener('click', () => {
                const fingerCount = parseInt(card.dataset.fingers);
                selectFingerCount(fingerCount);
            });
        });
    }

    // Navigation functions
    function navigateTo(page) {
        Object.values(pages).forEach(p => p.classList.remove("active"));

        switch (page) {
            case "game":
                pages.gameSelection.classList.add("active");
                break;
            case "sensitivity":
                pages.sensitivitySelection.classList.add("active");
                break;
            case "fingers":
                pages.fingerSelection.classList.add("active");
                break;
            case "device":
                pages.deviceSelection.classList.add("active");
                break;
            case "result":
                pages.resultPage.classList.add("active");
                startDeviceDetection();
                break;
        }
    }

    // Selection functions
    function selectGame(game) {
        currentSelection.game = game;
        navigateTo("sensitivity");
    }

    function selectSensitivityType(type) {
        currentSelection.sensitivityType = type;
        navigateTo("fingers");
    }

    function selectFingerCount(count) {
        currentSelection.fingerCount = count;
        
        // Update UI to show selection
        document.querySelectorAll('.finger-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-fingers="${count}"]`).classList.add('selected');
        
        // Auto-advance after a short delay
        setTimeout(() => {
            navigateTo("device");
        }, 500);
    }

    function selectDevice(type) {
        currentSelection.deviceType = type;
        navigateTo("result");
    }

    // Device detection functions
    async function autoDetectDevice() {
        const message = document.getElementById("detection-message");
        if (message) {
            message.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
                    <div class="spinner" style="width: 20px; height: 20px;"></div>
                    <span>جارٍ اكتشاف نوع الجهاز...</span>
                </div>
            `;
        }

        try {
            const deviceInfo = await deviceDetector.detectDevice();
            currentSelection.deviceType = deviceInfo.deviceType;
            currentSelection.deviceInfo = deviceInfo;
            
            if (message) {
                message.innerHTML = `
                    <div style="color: var(--success-color); text-align: center;">
                        <i class="fas fa-check-circle" style="margin-left: 0.5rem;"></i>
                        تم اكتشاف ${getDeviceTypeArabic(deviceInfo.deviceType)} بنجاح
                        <br>
                        <small>دقة الاكتشاف: ${deviceInfo.accuracy}%</small>
                    </div>
                `;
            }
            
            setTimeout(() => {
                navigateTo("result");
            }, 1500);
        } catch (error) {
            console.error('Auto detection failed:', error);
            if (message) {
                message.innerHTML = `
                    <div style="color: var(--danger-color); text-align: center;">
                        <i class="fas fa-exclamation-triangle" style="margin-left: 0.5rem;"></i>
                        فشل في الاكتشاف التلقائي، يرجى الاختيار يدوياً
                    </div>
                `;
            }
        }
    }

    async function startDeviceDetection() {
        // Show detection status
        if (pages.detectionStatus) {
            pages.detectionStatus.style.display = "block";
        }
        if (pages.deviceInfo) {
            pages.deviceInfo.style.opacity = "0.5";
        }

        try {
            // If device info is not already available, detect it
            if (!currentSelection.deviceInfo) {
                currentSelection.deviceInfo = await deviceDetector.detectDevice();
                if (!currentSelection.deviceType) {
                    currentSelection.deviceType = currentSelection.deviceInfo.deviceType;
                }
            }

            // Update device information display
            updateDeviceInfoDisplay();
            
            // Update finger selection summary
            updateFingerSummary();
            
            // Calculate and display sensitivity
            calculateAndDisplaySensitivity();
            
            // Hide detection status and show results
            setTimeout(() => {
                if (pages.detectionStatus) {
                    pages.detectionStatus.style.display = "none";
                }
                if (pages.deviceInfo) {
                    pages.deviceInfo.style.opacity = "1";
                    pages.deviceInfo.classList.add("loaded");
                }
            }, 2500);

        } catch (error) {
            console.error('Device detection failed:', error);
            showDetectionError();
        }
    }

    function updateDeviceInfoDisplay() {
        const deviceInfo = currentSelection.deviceInfo;
        const formatted = deviceDetector.formatForDisplay();

        // Update device specs
        updateElement("device-name", formatted.deviceName);
        updateElement("device-os", formatted.os);
        updateElement("device-ram", formatted.ram);
        updateElement("device-cpu", formatted.cpu);
        updateElement("device-gpu", formatted.gpu);
        updateElement("device-resolution", formatted.resolution);
        updateElement("device-touch", `${formatted.touchPoints} نقطة`);
        updateElement("device-performance", `${formatted.performanceScore}/100`);
        updateElement("detection-accuracy", `${formatted.accuracy}%`);

        // Update accuracy badge color
        const accuracyBadge = document.querySelector('.accuracy-badge');
        if (accuracyBadge && formatted.accuracy >= 80) {
            accuracyBadge.style.background = 'var(--success-color)';
        } else if (formatted.accuracy >= 60) {
            accuracyBadge.style.background = 'var(--warning-color)';
        } else {
            accuracyBadge.style.background = 'var(--danger-color)';
        }
    }

    function updateFingerSummary() {
        const fingerProfile = sensitivityDB.fingerProfiles[currentSelection.fingerCount];
        
        updateElement("selected-finger-count", currentSelection.fingerCount.toString());
        updateElement("selected-finger-name", fingerProfile?.name || `${currentSelection.fingerCount} أصابع`);
        updateElement("selected-finger-description", fingerProfile?.description || "");
    }

    function calculateAndDisplaySensitivity() {
        try {
            const result = sensitivityDB.calculateOptimalSensitivity(
                currentSelection.deviceInfo,
                currentSelection.fingerCount,
                currentSelection.sensitivityType
            );
            
            currentSelection.sensitivityResult = result;
            
            // Update sensitivity values
            displaySensitivityValues(result.sensitivity);
            
            // Update confidence
            updateElement("sensitivity-confidence", `${result.confidence}%`);
            
            // Update confidence badge color
            const confidenceBadge = document.querySelector('.confidence-badge');
            if (confidenceBadge && result.confidence >= 80) {
                confidenceBadge.style.background = 'var(--success-color)';
            } else if (result.confidence >= 60) {
                confidenceBadge.style.background = 'var(--warning-color)';
            } else {
                confidenceBadge.style.background = 'var(--danger-color)';
            }
            
            // Display recommendations
            displayRecommendations(result.recommendations);
            
            // Display compatibility info
            displayCompatibilityInfo();
            
        } catch (error) {
            console.error('Sensitivity calculation failed:', error);
            showSensitivityError();
        }
    }

    function displaySensitivityValues(sensitivity) {
        const container = document.getElementById("sensitivity-values");
        if (!container) return;

        const explanations = sensitivityDB.getSensitivityExplanation();
        container.innerHTML = "";

        Object.entries(sensitivity).forEach(([key, value]) => {
            const item = document.createElement("div");
            item.className = "sensitivity-item";
            
            const label = explanations[key] || key;
            
            item.innerHTML = `
                <span class="sense-label">${label}</span>
                <span class="sense-value">${value}</span>
            `;
            
            container.appendChild(item);
        });
    }

    function displayRecommendations(recommendations) {
        const container = document.getElementById("recommendations-list");
        if (!container || !recommendations) return;

        container.innerHTML = "";
        
        recommendations.forEach(recommendation => {
            const item = document.createElement("div");
            item.className = "recommendation-item";
            item.innerHTML = `
                <i class="fas fa-lightbulb"></i>
                ${recommendation}
            `;
            container.appendChild(item);
        });
    }

    function displayCompatibilityInfo() {
        const compatibility = sensitivityDB.getDeviceCompatibility(currentSelection.deviceInfo);
        
        updateElement("freefire-support", compatibility.freefire_support);
        updateElement("recommended-settings", compatibility.recommended_settings);
        updateElement("expected-fps", compatibility.expected_fps);
        updateElement("battery-life", compatibility.battery_life);
    }

    // Action functions
    function testSensitivity() {
        const sensitivity = currentSelection.sensitivityResult?.sensitivity;
        if (!sensitivity) {
            alert("لم يتم حساب الحساسية بعد!");
            return;
        }

        const message = `
إعدادات الحساسية المثالية لجهازك:

${Object.entries(sensitivity).map(([key, value]) => {
    const explanations = sensitivityDB.getSensitivityExplanation();
    return `${explanations[key] || key}: ${value}`;
}).join('\n')}

انسخ هذه القيم وطبقها في إعدادات فري فاير.
        `;
        
        alert(message);
    }

    async function copySettings() {
        const sensitivity = currentSelection.sensitivityResult?.sensitivity;
        if (!sensitivity) {
            alert("لم يتم حساب الحساسية بعد!");
            return;
        }

        const text = Object.entries(sensitivity).map(([key, value]) => {
            const explanations = sensitivityDB.getSensitivityExplanation();
            return `${explanations[key] || key}: ${value}`;
        }).join('\n');

        try {
            await navigator.clipboard.writeText(text);
            
            // Show success feedback
            const button = buttons.copySettings;
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
            button.style.background = 'var(--success-color)';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
            }, 2000);
            
        } catch (error) {
            console.error('Copy failed:', error);
            alert("فشل في نسخ الإعدادات. يرجى النسخ يدوياً.");
        }
    }

    function shareSettings() {
        const sensitivity = currentSelection.sensitivityResult?.sensitivity;
        const deviceInfo = currentSelection.deviceInfo;
        
        if (!sensitivity || !deviceInfo) {
            alert("لم يتم حساب الحساسية بعد!");
            return;
        }

        const shareText = `
🎮 إعدادات فري فاير المثالية

📱 الجهاز: ${deviceInfo.deviceName}
✋ عدد الأصابع: ${currentSelection.fingerCount}
🎯 دقة الحساسية: ${currentSelection.sensitivityResult.confidence}%

⚙️ الإعدادات:
${Object.entries(sensitivity).map(([key, value]) => {
    const explanations = sensitivityDB.getSensitivityExplanation();
    return `${explanations[key] || key}: ${value}`;
}).join('\n')}

🔗 احصل على إعداداتك المخصصة من: Vandam Egy Tool
        `;

        if (navigator.share) {
            navigator.share({
                title: 'إعدادات فري فاير المثالية',
                text: shareText
            }).catch(console.error);
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                alert("تم نسخ الإعدادات للمشاركة!");
            }).catch(() => {
                alert("فشل في المشاركة. يرجى النسخ يدوياً.");
            });
        }
    }

    // Utility functions
    function updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    function getDeviceTypeArabic(deviceType) {
        const types = {
            mobile: "هاتف محمول",
            tablet: "تابلت",
            desktop: "كمبيوتر",
            unknown: "جهاز غير معروف"
        };
        return types[deviceType] || deviceType;
    }

    function showDetectionError() {
        if (pages.detectionStatus) {
            pages.detectionStatus.innerHTML = `
                <div style="text-align: center; color: var(--danger-color);">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <h3>فشل في اكتشاف الجهاز</h3>
                    <p>سيتم استخدام إعدادات افتراضية</p>
                </div>
            `;
        }
        
        // Use fallback device info
        currentSelection.deviceInfo = deviceDetector.getFallbackInfo();
        updateDeviceInfoDisplay();
        calculateAndDisplaySensitivity();
    }

    function showSensitivityError() {
        const container = document.getElementById("sensitivity-values");
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; color: var(--danger-color); grid-column: 1 / -1;">
                    <i class="fas fa-exclamation-triangle"></i>
                    فشل في حساب الحساسية. يرجى المحاولة مرة أخرى.
                </div>
            `;
        }
    }

    // Make navigation function global for back buttons
    window.navigateTo = navigateTo;

    // Initialize with smooth animations
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

