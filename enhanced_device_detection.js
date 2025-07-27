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
            hardware.ramFormatted = `~${hardware.ram} GB (تقديري)`;
        }

        // CPU cores detection
        if ('hardwareConcurrency' in navigator) {
            hardware.cpuCores = navigator.hardwareConcurrency;
            hardware.cpuInfo = `${navigator.hardwareConcurrency} نواة`;
        } else {
            hardware.cpuCores = 2; // Default fallback
            hardware.cpuInfo = "غير معروف";
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

        // Memory usage estimation
        if ('memory' in performance) {
            performance.memoryUsage = {
                used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
                total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
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
        if (/Chrome/i.test(userAgent) && !/Edge/i.test(userAgent)) return 'Chrome';
        if (/Firefox/i.test(userAgent)) return 'Firefox';
        if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) return 'Safari';
        if (/Edge/i.test(userAgent)) return 'Edge';
        if (/Opera/i.test(userAgent)) return 'Opera';
        return 'Unknown';
    }

    // Device name extraction
    extractDeviceName(userAgent) {
        // Android device name extraction
        if (/Android/i.test(userAgent)) {
            const match = userAgent.match(/;\s*([^)]+)\s*\)/);
            if (match) {
                let deviceName = match[1].trim();
                // Clean up common patterns
                deviceName = deviceName.replace(/Build\/.*$/, '').trim();
                deviceName = deviceName.replace(/wv$/, '').trim();
                return deviceName;
            }
        }

        // iOS device detection
        if (/iPhone/i.test(userAgent)) return 'iPhone';
        if (/iPad/i.test(userAgent)) return 'iPad';
        if (/iPod/i.test(userAgent)) return 'iPod';

        // Windows device
        if (/Windows/i.test(userAgent)) return 'Windows PC';

        // Mac device
        if (/Mac/i.test(userAgent)) return 'Mac';

        return 'Unknown Device';
    }

    // GPU detection using WebGL
    async detectGPU() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            
            if (!gl) return 'WebGL غير مدعوم';

            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (debugInfo) {
                const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
                return `${vendor} - ${renderer}`;
            }

            return 'WebGL مدعوم';
        } catch (error) {
            return 'خطأ في اكتشاف GPU';
        }
    }

    // RAM estimation for devices without deviceMemory API
    estimateRAM() {
        const userAgent = navigator.userAgent;
        const cores = navigator.hardwareConcurrency || 2;
        const screenPixels = screen.width * screen.height;

        // Basic estimation based on device characteristics
        if (/iPhone|iPad/.test(userAgent)) {
            if (screenPixels > 2000000) return 6; // High-end iOS
            if (screenPixels > 1000000) return 4; // Mid-range iOS
            return 2; // Low-end iOS
        }

        if (/Android/.test(userAgent)) {
            if (cores >= 8 && screenPixels > 2000000) return 8; // High-end Android
            if (cores >= 6 && screenPixels > 1500000) return 6; // Mid-high Android
            if (cores >= 4 && screenPixels > 1000000) return 4; // Mid-range Android
            return 3; // Low-end Android
        }

        // Desktop estimation
        if (cores >= 8) return 16;
        if (cores >= 4) return 8;
        return 4;
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
        
        if (this.deviceInfo.deviceType === 'desktop') {
            estimatedDPI = diagonalPixels / 24; // Assuming ~24 inch diagonal for desktop
        } else if (this.deviceInfo.deviceType === 'tablet') {
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
            const ramScore = Math.min(100, (this.deviceInfo.ram / 8) * 100);
            score += ramScore;
            factors++;
        }

        if (this.deviceInfo.cpuCores) {
            const cpuScore = Math.min(100, (this.deviceInfo.cpuCores / 8) * 100);
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
        if (this.deviceInfo.gpu && !this.deviceInfo.gpu.includes('غير')) accuracy += 20;
        if (this.deviceInfo.deviceName && !this.deviceInfo.deviceName.includes('Unknown')) accuracy += 15;
        if (this.deviceInfo.os && this.deviceInfo.os.name !== 'Unknown') accuracy += 10;

        return Math.min(100, accuracy);
    }

    // Fallback information when detection fails
    getFallbackInfo() {
        return {
            deviceName: 'جهاز غير معروف',
            os: { name: 'Unknown', version: 'Unknown', mobile: false },
            deviceType: 'unknown',
            browser: 'Unknown',
            ram: 4,
            ramFormatted: '4 GB (افتراضي)',
            cpuCores: 4,
            cpuInfo: '4 نواة (افتراضي)',
            gpu: 'غير معروف',
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
        
        return {
            deviceName: info.deviceName || 'غير معروف',
            os: info.os ? `${info.os.name} ${info.os.version}` : 'غير معروف',
            ram: info.ramFormatted || 'غير معروف',
            cpu: info.cpuInfo || 'غير معروف',
            gpu: info.gpu || 'غير معروف',
            resolution: info.resolution || 'غير معروف',
            touchPoints: info.maxTouchPoints || 0,
            deviceType: info.deviceType || 'unknown',
            performanceScore: info.overallScore || 50,
            accuracy: info.accuracy || 0
        };
    }
}

// Export for use in main application
window.EnhancedDeviceDetector = EnhancedDeviceDetector;

