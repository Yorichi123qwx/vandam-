// Enhanced Free Fire Sensitivity Tool
document.addEventListener("DOMContentLoaded", function () {
    // Initialize components
    const deviceDetector = new EnhancedDeviceDetector();
    const sensitivityDB = new FreeFireSensitivityDatabase();
    
    // Language variables
    let currentLanguage = localStorage.getItem('lang') || 'ar'; // Default to Arabic
    let translations = {};

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
        shareSettings: document.getElementById("share-settings"),
        langSwitch: document.getElementById("lang-switch-btn") // New language switch button
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

    // Load translations and setup event listeners
    loadTranslations().then(() => {
        setupEventListeners();
        translatePage(); // Translate page after loading translations
        // Set initial text for dynamic elements that might not be covered by data-i18n
        updateElement("device-name", getTranslation("detecting_placeholder"));
        updateElement("device-os", getTranslation("detecting_placeholder"));
        updateElement("device-ram", getTranslation("detecting_placeholder"));
        updateElement("device-cpu", getTranslation("detecting_placeholder"));
        updateElement("device-gpu", getTranslation("detecting_placeholder"));
        updateElement("device-resolution", getTranslation("detecting_placeholder"));
        updateElement("device-touch", getTranslation("detecting_placeholder"));
        updateElement("device-performance", getTranslation("detecting_placeholder"));
    });

    async function loadTranslations() {
        try {
            const response = await fetch(`./lang/${currentLanguage}.json`);
            translations = await response.json();
            document.documentElement.lang = currentLanguage;
            document.documentElement.dir = (currentLanguage === 'ar') ? 'rtl' : 'ltr';
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to a default language or show an error
            currentLanguage = 'en'; // Fallback
            const response = await fetch(`./lang/en.json`);
            translations = await response.json();
            document.documentElement.lang = currentLanguage;
            document.documentElement.dir = 'ltr';
        }
    }

    function getTranslation(key, replacements = {}) {
        let text = translations[key] || key; // Fallback to key if not found
        for (const placeholder in replacements) {
            text = text.replace(`{${placeholder}}`, replacements[placeholder]);
        }
        return text;
    }

    function translatePage() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (element.tagName === 'META' && element.name === 'description') {
                element.setAttribute('content', getTranslation(key));
            } else {
                element.textContent = getTranslation(key);
            }
        });

        // Special handling for elements with dynamic content or attributes
        if (buttons.langSwitch) {
            buttons.langSwitch.textContent = getTranslation('language_switch_btn');
        }
        // Update placeholders for input fields if any
        // document.getElementById('someInput').placeholder = getTranslation('input_placeholder_key');

        // Update finger card descriptions and levels
        document.querySelectorAll('.finger-card').forEach(card => {
            const fingers = card.dataset.fingers;
            updateElement(card.querySelector('h3'), getTranslation(`fingers_${fingers}_name`));
            updateElement(card.querySelector('.finger-description'), getTranslation(`fingers_${fingers}_desc`));
            updateElement(card.querySelector('.level-badge'), getTranslation(`fingers_${fingers}_level`));
            // Update features list (assuming they are always 2 features)
            const featuresList = card.querySelectorAll('.finger-features li span');
            if (featuresList[0]) updateElement(featuresList[0], getTranslation(`fingers_${fingers}_feat1`));
            if (featuresList[1]) updateElement(featuresList[1], getTranslation(`fingers_${fingers}_feat2`));
        });

        // Update sensitivity explanations if already calculated
        if (currentSelection.sensitivityResult) {
            displaySensitivityValues(currentSelection.sensitivityResult.sensitivity);
        }
        // Update recommendations if already calculated
        if (currentSelection.sensitivityResult) {
            displayRecommendations(currentSelection.sensitivityResult.recommendations);
        }
        // Update compatibility info if already calculated
        if (currentSelection.deviceInfo) {
            displayCompatibilityInfo();
        }
    }

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

        // Language switch button
        if (buttons.langSwitch) {
            buttons.langSwitch.addEventListener("click", toggleLanguage);
        }
    }

    async function toggleLanguage() {
        currentLanguage = (currentLanguage === 'ar') ? 'en' : 'ar';
        localStorage.setItem('lang', currentLanguage);
        await loadTranslations();
        translatePage();
        // Re-render dynamic content that depends on language
        if (currentSelection.deviceInfo) {
            updateDeviceInfoDisplay();
        }
        if (currentSelection.fingerCount) {
            updateFingerSummary();
        }
        if (currentSelection.sensitivityResult) {
            calculateAndDisplaySensitivity();
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
                    <span>${getTranslation("detecting_device_message")}</span>
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
                        ${getTranslation("device_detected_success", { deviceType: getDeviceTypeArabic(deviceInfo.deviceType) })}
                        <br>
                        <small>${getTranslation("detection_accuracy")} ${deviceInfo.accuracy}%</small>
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
                        ${getTranslation("auto_detection_failed")}
                    </div>
                `;
            }
        }
    }

    async function startDeviceDetection() {
        // Show detection status
        if (pages.detectionStatus) {
            pages.detectionStatus.style.display = "block";
            updateElement(pages.detectionStatus.querySelector('h3'), getTranslation("analyzing_device"));
            updateElement(pages.detectionStatus.querySelector('p'), getTranslation("please_wait_analysis"));
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
        updateElement("device-name", getTranslation(formatted.deviceName) === formatted.deviceName ? formatted.deviceName : getTranslation(formatted.deviceName));
        updateElement("device-os", getTranslation(formatted.os) === formatted.os ? formatted.os : getTranslation(formatted.os));
        updateElement("device-ram", getTranslation(formatted.ram) === formatted.ram ? formatted.ram : getTranslation(formatted.ram));
        updateElement("device-cpu", getTranslation(formatted.cpu) === formatted.cpu ? formatted.cpu : getTranslation(formatted.cpu));
        updateElement("device-gpu", getTranslation(formatted.gpu) === formatted.gpu ? formatted.gpu : getTranslation(formatted.gpu));
        updateElement("device-resolution", getTranslation(formatted.resolution) === formatted.resolution ? formatted.resolution : getTranslation(formatted.resolution));
        updateElement("device-touch", `${formatted.touchPoints} ${getTranslation("fingers_plural")}`); // Assuming "نقاط اللمس" or "Touch Points"
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
        updateElement("selected-finger-name", getTranslation(fingerProfile?.name || `fingers_${currentSelection.fingerCount}_name`));
        updateElement("selected-finger-description", getTranslation(fingerProfile?.description || `fingers_${currentSelection.fingerCount}_desc`));
        updateElement(document.getElementById("selected-finger-count").nextElementSibling, getTranslation("fingers_plural")); // Update "أصابع" / "Fingers"
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

        const explanations = sensitivityDB.getSensitivityExplanation(); // This returns keys
        container.innerHTML = "";

        Object.entries(sensitivity).forEach(([key, value]) => {
            const item = document.createElement("div");
            item.className = "sensitivity-item";

            const label = getTranslation(explanations[key]); // Get translated explanation

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

        recommendations.forEach(recKey => { // recKey can be a direct key or "key|param1|param2"
            const parts = recKey.split('|');
            let translatedText = '';

            if (parts[0] === 'finger_style_recommendation_prefix') {
                const fingerNameKey = parts[1];
                const descriptionKey = parts[2];
                translatedText = getTranslation('finger_style_recommendation_prefix', {
                    fingerName: getTranslation(fingerNameKey),
                    description: getTranslation(descriptionKey)
                });
            } else if (parts[0] === 'finger_style_advantage_prefix') {
                const advantageKey = parts[1];
                translatedText = getTranslation('finger_style_advantage_prefix') + getTranslation(advantageKey);
            } else {
                translatedText = getTranslation(recKey); // Direct key
            }

            const item = document.createElement("div");
            item.className = "recommendation-item";
            item.innerHTML = `
                <i class="fas fa-lightbulb"></i>
                ${translatedText}
            `;
            container.appendChild(item);
        });
    }

    function displayCompatibilityInfo() {
        const compatibility = sensitivityDB.getDeviceCompatibility(currentSelection.deviceInfo);
        
        updateElement("freefire-support", getTranslation(compatibility.freefire_support_key));
        updateElement("recommended-settings", getTranslation(compatibility.recommended_settings_key));
        updateElement("expected-fps", compatibility.expected_fps); // FPS is numeric, not translated
        updateElement("battery-life", getTranslation(compatibility.battery_life_key));
    }

    // Action functions
    function testSensitivity() {
        const sensitivity = currentSelection.sensitivityResult?.sensitivity;
        if (!sensitivity) {
            alert(getTranslation("sensitivity_not_calculated"));
            return;
        }

        let message = `${getTranslation("optimal_sensitivity_title")}:\n\n`;
        Object.entries(sensitivity).forEach(([key, value]) => {
            message += `${getTranslation(`sensitivity_${key}`)}: ${value}\n`;
        });
        message += `\n${getTranslation("copy_settings_instruction")}`; // Add instruction to copy

        alert(message);
    }

    async function copySettings() {
        const sensitivity = currentSelection.sensitivityResult?.sensitivity;
        if (!sensitivity) {
            alert(getTranslation("sensitivity_not_calculated"));
            return;
        }

        const text = Object.entries(sensitivity).map(([key, value]) => {
            return `${getTranslation(`sensitivity_${key}`)}: ${value}`;
        }).join('\n');

        try {
            await navigator.clipboard.writeText(text);
            
            // Show success feedback
            const button = buttons.copySettings;
            const originalText = button.innerHTML;
            button.innerHTML = `<i class="fas fa-check"></i> ${getTranslation("copy_success")}`;
            button.style.background = 'var(--success-color)';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
            }, 2000);
            
        } catch (error) {
            console.error('Copy failed:', error);
            alert(getTranslation("copy_failed"));
        }
    }

    function shareSettings() {
        const sensitivity = currentSelection.sensitivityResult?.sensitivity;
        const deviceInfo = currentSelection.deviceInfo;
        
        if (!sensitivity || !deviceInfo) {
            alert(getTranslation("sensitivity_not_calculated"));
            return;
        }

        const settingsText = Object.entries(sensitivity).map(([key, value]) => {
            return `${getTranslation(`sensitivity_${key}`)}: ${value}`;
        }).join('\n');

        const shareText = getTranslation("share_text_template", {
            deviceName: getTranslation(deviceInfo.deviceName) === deviceInfo.deviceName ? deviceInfo.deviceName : getTranslation(deviceInfo.deviceName), // Translate if it's a key
            fingerCount: currentSelection.fingerCount,
            confidence: currentSelection.sensitivityResult.confidence,
            settings: settingsText
        });

        if (navigator.share) {
            navigator.share({
                title: getTranslation("share_title"),
                text: shareText
            }).catch(console.error);
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                alert(getTranslation("share_copy_alert"));
            }).catch(() => {
                alert(getTranslation("share_failed_alert"));
            });
        }
    }

    // Utility functions
    function updateElement(elementOrId, value) {
        let element;
        if (typeof elementOrId === 'string') {
            element = document.getElementById(elementOrId);
        } else {
            element = elementOrId;
        }

        if (element) {
            element.textContent = value;
        }
    }

    function getDeviceTypeArabic(deviceType) {
        const types = {
            mobile: getTranslation("mobile_btn"),
            tablet: getTranslation("tablet_btn"),
            desktop: getTranslation("pc_btn"),
            unknown: getTranslation("unknown_device")
        };
        return types[deviceType] || deviceType;
    }

    function showDetectionError() {
        if (pages.detectionStatus) {
            pages.detectionStatus.innerHTML = `
                <div style="text-align: center; color: var(--danger-color);">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <h3>${getTranslation("detection_error_title")}</h3>
                    <p>${getTranslation("detection_error_message")}</p>
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
                    ${getTranslation("sensitivity_error_message")}
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
