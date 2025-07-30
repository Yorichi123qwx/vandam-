// Enhanced Device Detection System for Free Fire Sensitivity
class EnhancedDeviceDetector {
    constructor() {
        this.deviceInfo = {};
        this.isDetecting = false;
    }

    // Main detection function with comprehensive device analysis
    async detectDevice() {
        if (this.isDetecting) return this.deviceInfo;
        
        this.isDetecting = true;
        
        try {
            // Parallel detection of all device properties
            const [
                basicInfo,
                hardwareInfo,
                displayInfo,
                performanceInfo,
                networkInfo,
                touchInfo
            ] = await Promise.all([
                this.getBasicDeviceInfo(),
                this.getHardwareInfo(),
                this.getDisplayInfo(),
                this.getPerformanceInfo(),
                this.getNetworkInfo(),
                this.getTouchInfo()
            ]);

            this.deviceInfo = {
                ...basicInfo,
                ...hardwareInfo,
                ...displayInfo,
                ...performanceInfo,
                ...networkInfo,
                ...touchInfo,
                detectionTimestamp: Date.now(),
                accuracy: this.calculateAccuracy()
            };

            return this.deviceInfo;
        } catch (error) {
            console.error('Device detection error:', error);
            return this.getFallbackInfo();
        } finally {
            this.isDetecting = false;
        }
    }

    // Basic device information using multiple sources
    async getBasicDeviceInfo() {
        const userAgent = navigator.userAgent;
        const platform = navigator.platform;
        
        // Enhanced OS detection
        const os = this.detectOperatingSystem(userAgent);
        
        // Device type detection with multiple checks
        const deviceType = this.detectDeviceType();
        
        // Browser detection
        const browser = this.detectBrowser(userAgent);
        
        // Device name extraction
        const deviceName = this.extractDeviceName(userAgent);

        return {
            os,
            deviceType,
            browser,
            deviceName,
            platform,
            userAgent: userAgent.substring(0, 100) + (userAgent.length > 100 ? '...' : '')
        };
    }

    // Hardware information detection
    async getHardwareInfo() {
        const hardware = {};

        // Memory detection (if available)
        if ('deviceMemory' in navigator) {
            hardware.ram = navigator.deviceMemory;
            hardware.ramFormatted = `${navigator.deviceMemory} GB`;
        } else {
            // Estimate RAM based on other factors
            hardware.ram = this.estimateRAM();
            hardware.ramFormatted = `~${hardware.ram} GB (تقديري)`; // This will be translated
        }

        // CPU cores detection
        if ('hardwareConcurrency' in navigator) {
            hardware.cpuCores = navigator.hardwareConcurrency;
            hardware.cpuInfo = `${navigator.hardwareConcurrency} نواة`; // This will be translated
        } else {
            hardware.cpuCores = 2; // Default fallback
            hardware.cpuInfo = "غير معروف"; // This will be translated
        }

        // GPU detection using WebGL
        hardware.gpu = await this.detectGPU();

        // Battery information (if available)
        if ('getBattery' in navigator) {
            try {
                const battery = await navigator.getBattery();
                hardware.battery = {
                    level: Math.round(battery.level * 100),
                    charging: battery.charging
                };
            } catch (e) {
                hardware.battery = null;
            }
        }

        return hardware;
    }

    // Display and screen information
    async getDisplayInfo() {
        const display = {};

        // Screen resolution
        display.screenWidth = screen.width;
        display.screenHeight = screen.height;
        display.resolution = `${screen.width}×${screen.height}`;

        // Viewport size
        display.viewportWidth = window.innerWidth;
        display.viewportHeight = window.innerHeight;
        display.viewport = `${window.innerWidth}×${window.innerHeight}`;

        // Pixel density
        display.pixelRatio = window.devicePixelRatio || 1;
        display.pixelDensity = this.calculatePixelDensity();

        // Color depth
        display.colorDepth = screen.colorDepth;

        // Orientation
        display.orientation = this.getScreenOrientation();

        return display;
    }

    // Performance benchmarking
    async getPerformanceInfo() {
        const performance = {};

        // JavaScript performance test
        performance.jsPerformance = await this.benchmarkJavaScript();

        // WebGL performance test
        performance.webglPerformance = await this.benchmarkWebGL();

        // Memory usage estimation (performance.memory is not standard, often undefined)
        // if ('memory' in performance) { // This check is incorrect, should be 'performance.memory'
        //     performance.memoryUsage = {
        //         used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
        //         total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
        //         limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
        //     };
        // }
        // Corrected memory usage estimation if performance.memory is available
        if (window.performance && window.performance.memory) {
            performance.memoryUsage = {
                used: Math.round(window.performance.memory.usedJSHeapSize / 1024 / 1024),
                total: Math.round(window.performance.memory.totalJSHeapSize / 1024 / 1024),
                limit: Math.round(window.performance.memory.jsHeapSizeLimit / 1024 / 1024)
            };
        }


        // Overall performance score
        performance.overallScore = this.calculatePerformanceScore(performance);

        return performance;
    }

    // Network information
    async getNetworkInfo() {
        const network = {};

        if ('connection' in navigator) {
            const conn = navigator.connection;
            network.effectiveType = conn.effectiveType;
            network.downlink = conn.downlink;
            network.rtt = conn.rtt;
            network.saveData = conn.saveData;
        }

        return network;
    }

    // Touch capabilities detection
    async getTouchInfo() {
        const touch = {};

        // Touch support detection
        touch.touchSupported = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        touch.maxTouchPoints = navigator.maxTouchPoints || 0;

        // Pointer events support
        touch.pointerEventsSupported = 'onpointerdown' in window;

        // Force touch support (iOS)
        touch.forceTouchSupported = 'ontouchforcechange' in window;

        return touch;
    }

    // Enhanced OS detection
    detectOperatingSystem(userAgent) {
        const os = {
            name: 'Unknown',
            version: 'Unknown',
            mobile: false
        };

        // Android detection
        if (/Android/i.test(userAgent)) {
            os.name = 'Android';
            os.mobile = true;
            const match = userAgent.match(/Android\s([0-9\.]+)/);
            if (match) os.version = match[1];
        }
        // iOS detection
        else if (/iPad|iPhone|iPod/.test(userAgent)) {
            os.name = 'iOS';
            os.mobile = true;
            const match = userAgent.match(/OS\s([0-9_]+)/);
            if (match) os.version = match[1].replace(/_/g, '.');
        }
        // Windows detection
        else if (/Windows NT/i.test(userAgent)) {
            os.name = 'Windows';
            const match = userAgent.match(/Windows NT\s([0-9\.]+)/);
            if (match) {
                const version = match[1];
                if (version === '10.0') os.version = '10/11';
                else if (version === '6.3') os.version = '8.1';
                else if (version === '6.2') os.version = '8';
                else if (version === '6.1') os.version = '7';
                else os.version = version;
            }
        }
        // macOS detection
        else if (/Mac OS X/i.test(userAgent)) {
            os.name = 'macOS';
            const match = userAgent.match(/Mac OS X\s([0-9_]+)/);
            if (match) os.version = match[1].replace(/_/g, '.');
        }
        // Linux detection
        else if (/Linux/i.test(userAgent)) {
            os.name = 'Linux';
        }

        return os;
    }

    // Enhanced device type detection
    detectDeviceType() {
        const userAgent = navigator.userAgent;
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const screenWidth = screen.width;
        const screenHeight = screen.height;
        const maxDimension = Math.max(screenWidth, screenHeight);
        const minDimension = Math.min(screenWidth, screenHeight);

        // Mobile detection
        if (/Android|iPhone|iPod/.test(userAgent)) {
            return 'mobile';
        }
        
        // Tablet detection
        if (/iPad/.test(userAgent) || 
            (hasTouch && maxDimension >= 768 && maxDimension <= 1366)) {
            return 'tablet';
        }

        // Desktop detection
        if (!hasTouch || maxDimension > 1366) {
            return 'desktop';
        }

        // Fallback based on screen size
        if (maxDimension <= 768) return 'mobile';
        if (maxDimension <= 1366) return 'tablet';
        return 'desktop';
    }

    // Browser detection
    detectBrowser(userAgent) {
        if (/Chrome/i.test(userAgent) && !/Edge|Edg/i.test(userAgent)) return 'Chrome'; // Exclude Edge
        if (/Firefox/i.test(userAgent)) return 'Firefox';
        if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) return 'Safari';
        if (/Edge|Edg/i.test(userAgent)) return 'Edge'; // Handle new Edge (Chromium-based)
        if (/Opera|OPR/i.test(userAgent)) return 'Opera'; // Handle Opera (Chromium-based)
        if (/MSIE|Trident/i.test(userAgent)) return 'Internet Explorer'; // Old IE
        return 'Unknown';
    }

    // Device name extraction
    extractDeviceName(userAgent) {
        // Android device name extraction
        if (/Android/i.test(userAgent)) {
            // Try to match specific models first (add more as needed)
            const androidModels = {
                'SM-A135F': 'Samsung Galaxy A13',
                'CPH2239': 'Oppo Reno 6',
                'CPH2371': 'Oppo Reno 8',
                '2201116PG': 'Xiaomi 12 Pro',
                'Pixel 6': 'Google Pixel 6',
                'SM-G998B': 'Samsung Galaxy S21 Ultra',
                'ONEPLUS A0001': 'OnePlus One', // Example for older devices
                'Redmi Note 8 Pro': 'Xiaomi Redmi Note 8 Pro',
                'M2007J20CG': 'Xiaomi Mi 10T Pro',
                'V2027': 'Vivo V20',
                'RMX2185': 'Realme C15',
                'Infinix X680B': 'Infinix Note 7',
                'TECNO CD7': 'Tecno Spark 5 Pro',
                'HUAWEI JSN-L21': 'Huawei P Smart 2019',
                'Nokia G20': 'Nokia G20',
                'moto g(8) power': 'Motorola Moto G8 Power',
                'LG-H870': 'LG G6',
                'ASUS_Z01QD': 'Asus ROG Phone II',
                'POCOPHONE F1': 'Pocophone F1'
            };
            for (const model in androidModels) {
                if (userAgent.includes(model)) {
                    return androidModels[model];
                }
            }

            // Fallback to general Android device name
            // This regex tries to capture the model name often found between semicolons or before build info
            const match = userAgent.match(/Android[^;]+;\s*([^;)]+)(?:\sBuild\/|\))/);
            if (match && match[1]) {
                let deviceName = match[1].trim();
                // Clean up common patterns
                deviceName = deviceName.replace(/Build\/.*$/, '').trim();
                deviceName = deviceName.replace(/wv$/, '').trim();
                deviceName = deviceName.replace(/;.*$/, '').trim(); // Remove anything after a semicolon
                deviceName = deviceName.replace(/^[a-zA-Z0-9]{2,4}\s/, '').trim(); // Remove short prefixes like "SM-" or "CPH" if they are at the start
                if (deviceName && deviceName !== 'Mobile' && deviceName !== 'Generic') {
                    return deviceName;
                }
            }
        }

        // iOS device detection (more specific)
        if (/iPhone/i.test(userAgent)) {
            const match = userAgent.match(/iPhone OS (\d+_\d+)/);
            if (match) {
                const osVersion = match[1].replace(/_/g, '.');
                // More advanced detection might involve checking screen size/resolution for specific iPhone models
                // For simplicity, we'll keep it general for now, but this is where you'd add more logic
                return `iPhone (iOS ${osVersion})`;
            }
            return 'iPhone';
        }
        if (/iPad/i.test(userAgent)) {
            return 'iPad';
        }
        if (/iPod/i.test(userAgent)) {
            return 'iPod';
        }

        // Windows device
        if (/Windows NT/i.test(userAgent)) {
            // Detect if it's a laptop/desktop more accurately
            if (/Win(dows)?(NT)?\s*((\d+\.\d+)|(\d+))/.test(userAgent)) {
                return 'Windows PC/Laptop'; // More generic, but can be refined
            }
            return 'Windows Device';
        }

        // macOS device
        if (/Macintosh|Mac OS X/.test(userAgent)) {
            return 'Mac';
        }

        // Linux device
        if (/Linux/.test(userAgent) && !/Android/.test(userAgent)) {
            return 'Linux PC';
        }

        return 'Unknown Device';
    }

    // GPU detection using WebGL
    async detectGPU() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            
            if (!gl) return 'WebGL غير مدعوم'; // This will be translated

            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (debugInfo) {
                const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
                return `${vendor} - ${renderer}`;
            }

            return 'WebGL مدعوم'; // This will be translated
        } catch (error) {
            return 'خطأ في اكتشاف GPU'; // This will be translated
        }
    }

    // RAM estimation for devices without deviceMemory API
    estimateRAM() {
        const userAgent = navigator.userAgent;
        const cores = navigator.hardwareConcurrency || 2;
        const screenPixels = screen.width * screen.height; // Total pixels

        // More refined estimation based on device type and characteristics
        // Note: this.deviceInfo.deviceType might not be set yet when this is called initially
        // So, rely on userAgent for initial broad categorization
        const detectedDeviceType = this.detectDeviceType(); // Get device type based on UA

        if (deductedDeviceType === 'mobile' || /iPhone|Android/.test(userAgent)) {
            if (cores >= 8 && screenPixels > 2500000) return 8; // High-end mobile (e.g., Flagship Android/iOS)
            if (cores >= 6 && screenPixels > 1800000) return 6; // Mid-high mobile
            if (cores >= 4 && screenPixels > 1000000) return 4; // Mid-range mobile
            return 3; // Entry-level mobile
        }

        if (deductedDeviceType === 'tablet' || /iPad/.test(userAgent)) {
            if (cores >= 8 && screenPixels > 4000000) return 8; // High-end tablet (e.g., iPad Pro)
            if (cores >= 6 && screenPixels > 2500000) return 6; // Mid-range tablet
            return 4; // Entry-level tablet
        }

        // Desktop estimation (more RAM expected)
        if (cores >= 12) return 32;
        if (cores >= 8) return 16;
        if (cores >= 6) return 8;
        if (cores >= 4) return 4;
        return 4; // Default fallback for very low-end or unknown
    }

    // Pixel density calculation
    calculatePixelDensity() {
        const dpr = window.devicePixelRatio || 1;
        const screenWidth = screen.width;
        const screenHeight = screen.height;
        
        // Estimate physical screen size (this is approximate)
        const diagonalPixels = Math.sqrt(screenWidth * screenWidth + screenHeight * screenHeight);
        
        // Rough estimation of DPI
        let estimatedDPI = diagonalPixels / 5; // Assuming ~5 inch diagonal for mobile
        
        // Use the already detected deviceType from basicInfo
        const currentDeviceType = this.deviceInfo.deviceType || this.detectDeviceType();

        if (currentDeviceType === 'desktop') {
            estimatedDPI = diagonalPixels / 24; // Assuming ~24 inch diagonal for desktop
        } else if (currentDeviceType === 'tablet') {
            estimatedDPI = diagonalPixels / 10; // Assuming ~10 inch diagonal for tablet
        }

        return Math.round(estimatedDPI * dpr);
    }

    // Screen orientation detection
    getScreenOrientation() {
        if (screen.orientation) {
            return screen.orientation.type;
        }
        
        if (window.orientation !== undefined) {
            return Math.abs(window.orientation) === 90 ? 'landscape' : 'portrait';
        }
        
        return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    }

    // JavaScript performance benchmark
    async benchmarkJavaScript() {
        const start = performance.now();
        
        // Simple computation benchmark
        let result = 0;
        for (let i = 0; i < 100000; i++) {
            result += Math.sqrt(i) * Math.sin(i);
        }
        
        const end = performance.now();
        const duration = end - start;
        
        // Score: lower is better, normalize to 0-100 scale
        const score = Math.max(0, Math.min(100, 100 - (duration / 10)));
        
        return {
            duration: Math.round(duration),
            score: Math.round(score)
        };
    }

    // WebGL performance benchmark
    async benchmarkWebGL() {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const gl = canvas.getContext('webgl');
            
            if (!gl) return { supported: false, score: 0 };

            const start = performance.now();
            
            // Simple WebGL operations
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            for (let i = 0; i < 1000; i++) {
                gl.clear(gl.COLOR_BUFFER_BIT);
            }
            
            const end = performance.now();
            const duration = end - start;
            const score = Math.max(0, Math.min(100, 100 - (duration / 5)));
            
            return {
                supported: true,
                duration: Math.round(duration),
                score: Math.round(score)
            };
        } catch (error) {
            return { supported: false, score: 0 };
        }
    }

    // Calculate overall performance score
    calculatePerformanceScore(performanceData) {
        let score = 0;
        let factors = 0;

        if (performanceData.jsPerformance) {
            score += performanceData.jsPerformance.score;
            factors++;
        }

        if (performanceData.webglPerformance && performanceData.webglPerformance.supported) {
            score += performanceData.webglPerformance.score;
            factors++;
        }

        // Add hardware-based scoring
        if (this.deviceInfo.ram) {
            const ramScore = Math.min(100, (this.deviceInfo.ram / 8) * 100); // Scale RAM score
            score += ramScore;
            factors++;
        }

        if (this.deviceInfo.cpuCores) {
            const cpuScore = Math.min(100, (this.deviceInfo.cpuCores / 8) * 100); // Scale CPU score
            score += cpuScore;
            factors++;
        }

        return factors > 0 ? Math.round(score / factors) : 50;
    }

    // Calculate detection accuracy
    calculateAccuracy() {
        let accuracy = 0;
        let checks = 0;

        // Check availability of various APIs
        if ('deviceMemory' in navigator) accuracy += 20;
        if ('hardwareConcurrency' in navigator) accuracy += 15;
        if ('connection' in navigator) accuracy += 10;
        if ('getBattery' in navigator) accuracy += 10;
        if (this.deviceInfo.gpu && !this.deviceInfo.gpu.includes('غير')) accuracy += 20; // Check if GPU was successfully detected
        if (this.deviceInfo.deviceName && !this.deviceInfo.deviceName.includes('Unknown')) accuracy += 15; // Check if device name is specific
        if (this.deviceInfo.os && this.deviceInfo.os.name !== 'Unknown') accuracy += 10;

        return Math.min(100, accuracy);
    }

    // Fallback information when detection fails
    getFallbackInfo() {
        return {
            deviceName: 'جهاز غير معروف', // This will be translated
            os: { name: 'Unknown', version: 'Unknown', mobile: false }, // These will be translated
            deviceType: 'unknown',
            browser: 'Unknown',
            ram: 4,
            ramFormatted: '4 GB (افتراضي)', // This will be translated
            cpuCores: 4,
            cpuInfo: '4 نواة (افتراضي)', // This will be translated
            gpu: 'غير معروف', // This will be translated
            resolution: `${screen.width}×${screen.height}`,
            accuracy: 20,
            detectionTimestamp: Date.now()
        };
    }

    // Get device category for sensitivity calculation
    getDeviceCategory() {
        const info = this.deviceInfo;
        
        if (!info.overallScore) return 'medium';
        
        if (info.overallScore >= 80) return 'high';
        if (info.overallScore >= 60) return 'medium';
        return 'low';
    }

    // Format device info for display
    formatForDisplay() {
        const info = this.deviceInfo;
        
        // These strings will be translated in script.js using getTranslation
        return {
            deviceName: info.deviceName || 'unknown_device',
            os: info.os ? `${info.os.name} ${info.os.version}` : 'unknown_os',
            ram: info.ramFormatted || 'unknown_ram',
            cpu: info.cpuInfo || 'unknown_cpu',
            gpu: info.gpu || 'unknown_gpu',
            resolution: info.resolution || 'unknown_resolution',
            touchPoints: info.maxTouchPoints || 0,
            deviceType: info.deviceType || 'unknown',
            performanceScore: info.overallScore || 50,
            accuracy: info.accuracy || 0
        };
    }
}

// Export for use in main application
window.EnhancedDeviceDetector = EnhancedDeviceDetector;
