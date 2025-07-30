// Comprehensive Free Fire Sensitivity Database
class FreeFireSensitivityDatabase {
    constructor() {
        this.sensitivityData = this.initializeSensitivityData();
        this.deviceProfiles = this.initializeDeviceProfiles();
        this.fingerProfiles = this.initializeFingerProfiles();
    }

    // Initialize comprehensive sensitivity data
    initializeSensitivityData() {
        return {
            // Base sensitivity values for different device categories and finger counts
            baseSensitivity: {
                mobile: {
                    low_performance: {
                        2: { general: 85, red_dot: 75, scope_2x: 65, scope_4x: 55, sniper: 35, free_look: 70 },
                        3: { general: 90, red_dot: 80, scope_2x: 70, scope_4x: 60, sniper: 40, free_look: 75 },
                        4: { general: 95, red_dot: 85, scope_2x: 75, scope_4x: 65, sniper: 45, free_look: 80 },
                        5: { general: 100, red_dot: 90, scope_2x: 80, scope_4x: 70, sniper: 50, free_look: 85 },
                        6: { general: 105, red_dot: 95, scope_2x: 85, scope_4x: 75, sniper: 55, free_look: 90 }
                    },
                    medium_performance: {
                        2: { general: 90, red_dot: 80, scope_2x: 70, scope_4x: 60, sniper: 40, free_look: 75 },
                        3: { general: 95, red_dot: 85, scope_2x: 75, scope_4x: 65, sniper: 45, free_look: 80 },
                        4: { general: 100, red_dot: 90, scope_2x: 80, scope_4x: 70, sniper: 50, free_look: 85 },
                        5: { general: 105, red_dot: 95, scope_2x: 85, scope_4x: 75, sniper: 55, free_look: 90 },
                        6: { general: 110, red_dot: 100, scope_2x: 90, scope_4x: 80, sniper: 60, free_look: 95 }
                    },
                    high_performance: {
                        2: { general: 95, red_dot: 85, scope_2x: 75, scope_4x: 65, sniper: 45, free_look: 80 },
                        3: { general: 100, red_dot: 90, scope_2x: 80, scope_4x: 70, sniper: 50, free_look: 85 },
                        4: { general: 105, red_dot: 95, scope_2x: 85, scope_4x: 75, sniper: 55, free_look: 90 },
                        5: { general: 110, red_dot: 100, scope_2x: 90, scope_4x: 80, sniper: 60, free_look: 95 },
                        6: { general: 115, red_dot: 105, scope_2x: 95, scope_4x: 85, sniper: 65, free_look: 100 }
                    }
                },
                tablet: {
                    low_performance: {
                        2: { general: 75, red_dot: 65, scope_2x: 55, scope_4x: 45, sniper: 25, free_look: 60 },
                        3: { general: 80, red_dot: 70, scope_2x: 60, scope_4x: 50, sniper: 30, free_look: 65 },
                        4: { general: 85, red_dot: 75, scope_2x: 65, scope_4x: 55, sniper: 35, free_look: 70 },
                        5: { general: 90, red_dot: 80, scope_2x: 70, scope_4x: 60, sniper: 40, free_look: 75 },
                        6: { general: 95, red_dot: 85, scope_2x: 75, scope_4x: 65, sniper: 45, free_look: 80 }
                    },
                    medium_performance: {
                        2: { general: 80, red_dot: 70, scope_2x: 60, scope_4x: 50, sniper: 30, free_look: 65 },
                        3: { general: 85, red_dot: 75, scope_2x: 65, scope_4x: 55, sniper: 35, free_look: 70 },
                        4: { general: 90, red_dot: 80, scope_2x: 70, scope_4x: 60, sniper: 40, free_look: 75 },
                        5: { general: 95, red_dot: 85, scope_2x: 75, scope_4x: 65, sniper: 45, free_look: 80 },
                        6: { general: 100, red_dot: 90, scope_2x: 80, scope_4x: 70, sniper: 50, free_look: 85 }
                    },
                    high_performance: {
                        2: { general: 85, red_dot: 75, scope_2x: 65, scope_4x: 55, sniper: 35, free_look: 70 },
                        3: { general: 90, red_dot: 80, scope_2x: 70, scope_4x: 60, sniper: 40, free_look: 75 },
                        4: { general: 95, red_dot: 85, scope_2x: 75, scope_4x: 65, sniper: 45, free_look: 80 },
                        5: { general: 100, red_dot: 90, scope_2x: 80, scope_4x: 70, sniper: 50, free_look: 85 },
                        6: { general: 105, red_dot: 95, scope_2x: 85, scope_4x: 75, sniper: 55, free_look: 90 }
                    }
                },
                desktop: {
                    low_performance: {
                        2: { general: 65, red_dot: 55, scope_2x: 45, scope_4x: 35, sniper: 15, free_look: 50 },
                        3: { general: 70, red_dot: 60, scope_2x: 50, scope_4x: 40, sniper: 20, free_look: 55 },
                        4: { general: 75, red_dot: 65, scope_2x: 55, scope_4x: 45, sniper: 25, free_look: 60 },
                        5: { general: 80, red_dot: 70, scope_2x: 60, scope_4x: 50, sniper: 30, free_look: 65 },
                        6: { general: 85, red_dot: 75, scope_2x: 65, scope_4x: 55, sniper: 35, free_look: 70 }
                    },
                    medium_performance: {
                        2: { general: 70, red_dot: 60, scope_2x: 50, scope_4x: 40, sniper: 20, free_look: 55 },
                        3: { general: 75, red_dot: 65, scope_2x: 55, scope_4x: 45, sniper: 25, free_look: 60 },
                        4: { general: 80, red_dot: 70, scope_2x: 60, scope_4x: 50, sniper: 30, free_look: 65 },
                        5: { general: 85, red_dot: 75, scope_2x: 65, scope_4x: 55, sniper: 35, free_look: 70 },
                        6: { general: 90, red_dot: 80, scope_2x: 70, scope_4x: 60, sniper: 40, free_look: 75 }
                    },
                    high_performance: {
                        2: { general: 75, red_dot: 65, scope_2x: 55, scope_4x: 45, sniper: 25, free_look: 60 },
                        3: { general: 80, red_dot: 70, scope_2x: 60, scope_4x: 50, sniper: 30, free_look: 65 },
                        4: { general: 85, red_dot: 75, scope_2x: 65, scope_4x: 55, sniper: 35, free_look: 70 },
                        5: { general: 90, red_dot: 80, scope_2x: 70, scope_4x: 60, sniper: 40, free_look: 75 },
                        6: { general: 95, red_dot: 85, scope_2x: 75, scope_4x: 65, sniper: 45, free_look: 80 }
                    }
                }
            },

            // Adjustment factors based on specific device characteristics
            adjustmentFactors: {
                ram: {
                    2: -0.1,   // 2GB RAM: reduce sensitivity by 10%
                    3: -0.05,  // 3GB RAM: reduce sensitivity by 5%
                    4: 0,      // 4GB RAM: baseline
                    6: 0.05,   // 6GB RAM: increase sensitivity by 5%
                    8: 0.1,    // 8GB RAM: increase sensitivity by 10%
                    12: 0.15,  // 12GB RAM: increase sensitivity by 15%
                    16: 0.2    // 16GB+ RAM: increase sensitivity by 20%
                },
                cpu_cores: {
                    2: -0.1,   // 2 cores: reduce sensitivity by 10%
                    4: 0,      // 4 cores: baseline
                    6: 0.05,   // 6 cores: increase sensitivity by 5%
                    8: 0.1,    // 8+ cores: increase sensitivity by 10%
                },
                gpu_performance: {
                    low: -0.15,     // Low-end GPU: reduce sensitivity by 15%
                    medium: 0,      // Medium GPU: baseline
                    high: 0.1,      // High-end GPU: increase sensitivity by 10%
                    flagship: 0.2   // Flagship GPU: increase sensitivity by 20%
                },
                screen_size: {
                    small: 0.1,    // Small screen (< 5.5"): increase sensitivity by 10%
                    medium: 0,     // Medium screen (5.5" - 6.5"): baseline
                    large: -0.05,  // Large screen (6.5" - 7"): reduce sensitivity by 5%
                    xlarge: -0.1   // Extra large screen (> 7"): reduce sensitivity by 10%
                },
                refresh_rate: {
                    60: 0,      // 60Hz: baseline
                    90: 0.05,   // 90Hz: increase sensitivity by 5%
                    120: 0.1,   // 120Hz: increase sensitivity by 10%
                    144: 0.15   // 144Hz+: increase sensitivity by 15%
                }
            }
        };
    }

    // Initialize device-specific profiles
    initializeDeviceProfiles() {
        return {
            // Popular mobile devices with specific optimizations
            mobile: {
                'iPhone (iOS 17.0)': { category: 'high_performance', gpu: 'flagship', screen: 'medium' }, // Example with OS version
                'iPhone (iOS 16.0)': { category: 'high_performance', gpu: 'high', screen: 'medium' },
                'iPhone (iOS 15.0)': { category: 'medium_performance', gpu: 'high', screen: 'medium' },
                'iPhone (iOS 14.0)': { category: 'medium_performance', gpu: 'medium', screen: 'medium' },
                'iPhone SE': { category: 'medium_performance', gpu: 'medium', screen: 'small' },
                
                'Samsung Galaxy S24 Ultra': { category: 'high_performance', gpu: 'flagship', screen: 'large' },
                'Samsung Galaxy S24+': { category: 'high_performance', gpu: 'flagship', screen: 'large' },
                'Samsung Galaxy S24': { category: 'high_performance', gpu: 'high', screen: 'medium' },
                'Samsung Galaxy S23 Ultra': { category: 'high_performance', gpu: 'flagship', screen: 'large' },
                'Samsung Galaxy S23+': { category: 'high_performance', gpu: 'high', screen: 'large' },
                'Samsung Galaxy S23': { category: 'high_performance', gpu: 'high', screen: 'medium' },
                'Samsung Galaxy S22': { category: 'medium_performance', gpu: 'high', screen: 'medium' },
                'Samsung Galaxy A54': { category: 'medium_performance', gpu: 'medium', screen: 'medium' },
                'Samsung Galaxy A34': { category: 'medium_performance', gpu: 'medium', screen: 'medium' },
                'Samsung Galaxy A14': { category: 'low_performance', gpu: 'low', screen: 'medium' },
                'Samsung Galaxy A13': { category: 'low_performance', gpu: 'low', screen: 'medium' }, // Added A13
                
                'Xiaomi 12 Pro': { category: 'high_performance', gpu: 'flagship', screen: 'large' }, // Added Xiaomi 12 Pro
                'Xiaomi 14 Ultra': { category: 'high_performance', gpu: 'flagship', screen: 'large' },
                'Xiaomi 14': { category: 'high_performance', gpu: 'high', screen: 'medium' },
                'Xiaomi 13 Pro': { category: 'high_performance', gpu: 'high', screen: 'large' },
                'Xiaomi 13': { category: 'high_performance', gpu: 'high', screen: 'medium' },
                'Xiaomi 12': { category: 'medium_performance', gpu: 'high', screen: 'medium' },
                'Xiaomi Redmi Note 13 Pro': { category: 'medium_performance', gpu: 'medium', screen: 'large' },
                'Xiaomi Redmi Note 13': { category: 'medium_performance', gpu: 'medium', screen: 'medium' },
                'Xiaomi Redmi 13C': { category: 'low_performance', gpu: 'low', screen: 'medium' },
                
                'Oppo Reno 8': { category: 'medium_performance', gpu: 'medium', screen: 'medium' }, // Added Oppo Reno 8
                'Oppo Reno 6': { category: 'medium_performance', gpu: 'medium', screen: 'medium' }, // Added Oppo Reno 6
                'OnePlus 12': { category: 'high_performance', gpu: 'flagship', screen: 'large' },
                'OnePlus 11': { category: 'high_performance', gpu: 'high', screen: 'large' },
                'OnePlus 10 Pro': { category: 'high_performance', gpu: 'high', screen: 'large' },
                'OnePlus Nord 3': { category: 'medium_performance', gpu: 'medium', screen: 'medium' },
                'OnePlus Nord CE 3': { category: 'medium_performance', gpu: 'medium', screen: 'medium' },
                
                'Google Pixel 8 Pro': { category: 'high_performance', gpu: 'high', screen: 'large' },
                'Google Pixel 8': { category: 'high_performance', gpu: 'high', screen: 'medium' },
                'Google Pixel 7 Pro': { category: 'medium_performance', gpu: 'high', screen: 'large' },
                'Google Pixel 7': { category: 'medium_performance', gpu: 'medium', screen: 'medium' },
                
                'Huawei P60 Pro': { category: 'high_performance', gpu: 'high', screen: 'large' },
                'Huawei Mate 60 Pro': { category: 'high_performance', gpu: 'high', screen: 'large' },
                'Honor Magic 6 Pro': { category: 'high_performance', gpu: 'high', screen: 'large' },
                
                'Oppo Find X7 Ultra': { category: 'high_performance', gpu: 'flagship', screen: 'large' },
                'Oppo Reno 11 Pro': { category: 'medium_performance', gpu: 'medium', screen: 'large' },
                'Vivo X100 Pro': { category: 'high_performance', gpu: 'high', screen: 'large' },
                'Vivo V30 Pro': { category: 'medium_performance', gpu: 'medium', screen: 'large' }
            },
            
            // Tablet profiles
            tablet: {
                'iPad Pro 12.9': { category: 'high_performance', gpu: 'flagship', screen: 'xlarge' },
                'iPad Pro 11': { category: 'high_performance', gpu: 'flagship', screen: 'large' },
                'iPad Air': { category: 'high_performance', gpu: 'high', screen: 'large' },
                'iPad': { category: 'medium_performance', gpu: 'medium', screen: 'large' },
                'iPad mini': { category: 'medium_performance', gpu: 'medium', screen: 'medium' },
                'Samsung Galaxy Tab S9 Ultra': { category: 'high_performance', gpu: 'flagship', screen: 'xlarge' },
                'Samsung Galaxy Tab S9+': { category: 'high_performance', gpu: 'high', screen: 'large' },
                'Samsung Galaxy Tab S9': { category: 'high_performance', gpu: 'high', screen: 'large' },
                'Samsung Galaxy Tab A9+': { category: 'medium_performance', gpu: 'medium', screen: 'large' },
                'Lenovo Tab P11 Pro Gen 2': { category: 'medium_performance', gpu: 'medium', screen: 'large' } // Example Lenovo Tablet
            },
            // Desktop profiles (more generic as specific models are less relevant for sensitivity)
            desktop: {
                'Windows PC/Laptop': { category: 'medium_performance', gpu: 'medium', screen: 'xlarge' },
                'Mac': { category: 'high_performance', gpu: 'high', screen: 'xlarge' },
                'Linux PC': { category: 'medium_performance', gpu: 'medium', screen: 'xlarge' }
            }
        };
    }

    // Initialize finger count profiles with play style recommendations
    initializeFingerProfiles() {
        return {
            2: {
                name: 'fingers_2_name', // Key for translation
                description: 'fingers_2_desc', // Key for translation
                advantages: ['fingers_2_feat1', 'fingers_2_feat2'], // Keys for translation
                disadvantages: ['disadvantages_2_1', 'disadvantages_2_2'], // Example, add to lang files
                recommended_for: ['recommended_for_2_1', 'recommended_for_2_2'], // Example, add to lang files
                sensitivity_modifier: 0
            },
            3: {
                name: 'fingers_3_name',
                description: 'fingers_3_desc',
                advantages: ['fingers_3_feat1', 'fingers_3_feat2'],
                disadvantages: ['disadvantages_3_1', 'disadvantages_3_2'],
                recommended_for: ['recommended_for_3_1', 'recommended_for_3_2'],
                sensitivity_modifier: 0.05
            },
            4: {
                name: 'fingers_4_name',
                description: 'fingers_4_desc',
                advantages: ['fingers_4_feat1', 'fingers_4_feat2'],
                disadvantages: ['disadvantages_4_1', 'disadvantages_4_2'],
                recommended_for: ['recommended_for_4_1', 'recommended_for_4_2'],
                sensitivity_modifier: 0.1
            },
            5: {
                name: 'fingers_5_name',
                description: 'fingers_5_desc',
                advantages: ['fingers_5_feat1', 'fingers_5_feat2'],
                disadvantages: ['disadvantages_5_1', 'disadvantages_5_2'],
                recommended_for: ['recommended_for_5_1', 'recommended_for_5_2'],
                sensitivity_modifier: 0.15
            },
            6: {
                name: 'fingers_6_name',
                description: 'fingers_6_desc',
                advantages: ['fingers_6_feat1', 'fingers_6_feat2'],
                disadvantages: ['disadvantages_6_1', 'disadvantages_6_2'],
                recommended_for: ['recommended_for_6_1', 'recommended_for_6_2'],
                sensitivity_modifier: 0.2
            }
        };
    }

    // Calculate optimal sensitivity based on device and finger count
    calculateOptimalSensitivity(deviceInfo, fingerCount, sensitivityType = 'game') {
        try {
            // Determine device category
            const deviceCategory = this.determineDeviceCategory(deviceInfo);
            const deviceType = deviceInfo.deviceType || 'mobile';
            
            // Validate finger count
            const validFingerCount = Math.max(2, Math.min(6, fingerCount || 4));
            
            // Get base sensitivity values
            const baseSensitivity = this.sensitivityData.baseSensitivity[deviceType]?.[deviceCategory]?.[validFingerCount];
            
            if (!baseSensitivity) {
                return this.getFallbackSensitivity(deviceType, validFingerCount);
            }

            // Apply device-specific adjustments
            const adjustedSensitivity = this.applyDeviceAdjustments(baseSensitivity, deviceInfo);
            
            // Apply finger count modifier
            const fingerModifier = this.fingerProfiles[validFingerCount]?.sensitivity_modifier || 0;
            
            // Final sensitivity calculation
            const finalSensitivity = this.applyFinalAdjustments(adjustedSensitivity, fingerModifier);
            
            return {
                sensitivity: finalSensitivity,
                deviceCategory,
                fingerCount: validFingerCount,
                fingerProfile: this.fingerProfiles[validFingerCount],
                recommendations: this.generateRecommendations(deviceInfo, validFingerCount, deviceCategory),
                confidence: this.calculateConfidence(deviceInfo)
            };
            
        } catch (error) {
            console.error('Error calculating sensitivity:', error);
            return this.getFallbackSensitivity(deviceInfo.deviceType || 'mobile', fingerCount || 4);
        }
    }

    // Determine device performance category
    determineDeviceCategory(deviceInfo) {
        let score = 0;
        
        // RAM scoring (more granular impact)
        const ram = deviceInfo.ram || 4;
        if (ram >= 16) score += 35; // Very high RAM
        else if (ram >= 12) score += 30;
        else if (ram >= 8) score += 25;
        else if (ram >= 6) score += 20;
        else if (ram >= 4) score += 15;
        else score += 10; // Low RAM
        
        // CPU scoring
        const cpuCores = deviceInfo.cpuCores || 4;
        if (cpuCores >= 8) score += 25;
        else if (cpuCores >= 6) score += 20;
        else if (cpuCores >= 4) score += 15;
        else score += 10;
        
        // GPU scoring (based on GPU string analysis)
        const gpu = (deviceInfo.gpu || '').toLowerCase();
        if (gpu.includes('adreno 750') || 
            gpu.includes('apple a17') || 
            gpu.includes('apple m') || 
            gpu.includes('snapdragon 8 gen 3')) {
            score += 30; // Flagship
        } else if (gpu.includes('adreno 7') || 
                   gpu.includes('mali-g78') || 
                   gpu.includes('apple a15') || 
                   gpu.includes('apple a16') ||
                   gpu.includes('snapdragon 8')) {
            score += 25; // High-end
        } else if (gpu.includes('adreno 6') || 
                   gpu.includes('mali-g') || 
                   gpu.includes('apple a14') ||
                   gpu.includes('snapdragon 7')) {
            score += 20; // Medium-high
        } else if (gpu.includes('adreno') || gpu.includes('mali') || gpu.includes('apple')) {
            score += 15; // Medium
        } else {
            score += 10; // Low/Unknown
        }
        
        // Performance score from device detection (overallScore)
        if (deviceInfo.overallScore) {
            score += Math.round(deviceInfo.overallScore * 0.15); // Add a weighted performance score
        }
        
        // Device-specific profile lookup
        const deviceName = deviceInfo.deviceName || '';
        const deviceProfile = this.deviceProfiles[deviceInfo.deviceType]?.[deviceName];
        if (deviceProfile) {
            if (deviceProfile.category === 'high_performance') score += 10;
            else if (deviceProfile.category === 'medium_performance') score += 5;
        }
        
        // Categorize based on total score
        if (score >= 90) return 'high_performance'; // Higher threshold for high performance
        if (score >= 65) return 'medium_performance';
        return 'low_performance';
    }

    // Apply device-specific adjustments
    applyDeviceAdjustments(baseSensitivity, deviceInfo) {
        const adjusted = { ...baseSensitivity };
        const factors = this.sensitivityData.adjustmentFactors;
        
        let totalAdjustment = 0;
        
        // RAM adjustment
        const ram = deviceInfo.ram || 4;
        const ramKey = Object.keys(factors.ram).find(key => parseInt(key) <= ram) || '4';
        totalAdjustment += factors.ram[ramKey] || 0;
        
        // CPU adjustment
        const cpuCores = deviceInfo.cpuCores || 4;
        const cpuKey = Object.keys(factors.cpu_cores).find(key => parseInt(key) <= cpuCores) || '4';
        totalAdjustment += factors.cpu_cores[cpuKey] || 0;
        
        // GPU adjustment
        const gpuPerformance = this.analyzeGPUPerformance(deviceInfo.gpu || '');
        totalAdjustment += factors.gpu_performance[gpuPerformance] || 0;
        
        // Screen size adjustment (estimated)
        const screenSize = this.estimateScreenSize(deviceInfo);
        totalAdjustment += factors.screen_size[screenSize] || 0;
        
        // Apply adjustments to all sensitivity values
        Object.keys(adjusted).forEach(key => {
            adjusted[key] = Math.round(adjusted[key] * (1 + totalAdjustment));
            // Ensure values stay within reasonable bounds
            adjusted[key] = Math.max(10, Math.min(200, adjusted[key]));
        });
        
        return adjusted;
    }

    // Analyze GPU performance level
    analyzeGPUPerformance(gpu) {
        const gpuLower = gpu.toLowerCase();
        
        // Flagship GPUs
        if (gpuLower.includes('adreno 750') || 
            gpuLower.includes('apple a17') || 
            gpuLower.includes('apple m') ||
            gpuLower.includes('snapdragon 8 gen 3')) {
            return 'flagship';
        }
        
        // High-end GPUs
        if (gpuLower.includes('adreno 7') || 
            gpuLower.includes('mali-g78') || 
            gpuLower.includes('apple a15') || 
            gpuLower.includes('apple a16') ||
            gpuLower.includes('snapdragon 8')) {
            return 'high';
        }
        
        // Medium GPUs
        if (gpuLower.includes('adreno 6') || 
            gpuLower.includes('mali-g') || 
            gpuLower.includes('apple a14') ||
            gpuLower.includes('snapdragon 7')) {
            return 'medium';
        }
        
        return 'low';
    }

    // Estimate screen size category
    estimateScreenSize(deviceInfo) {
        const width = deviceInfo.screenWidth || 0;
        const height = deviceInfo.screenHeight || 0;
        const diagonal = Math.sqrt(width * width + height * height);
        
        if (deviceInfo.deviceType === 'tablet') {
            if (diagonal > 2000) return 'xlarge'; // > 10"
            if (diagonal > 1500) return 'large';  // 8-10"
            return 'medium'; // < 8"
        }
        
        // Mobile estimation
        if (diagonal > 2500) return 'large';   // > 6.5"
        if (diagonal > 2000) return 'medium';  // 5.5-6.5"
        return 'small'; // < 5.5"
    }

    // Apply final adjustments and finger modifier
    applyFinalAdjustments(sensitivity, fingerModifier) {
        const adjusted = { ...sensitivity };
        
        Object.keys(adjusted).forEach(key => {
            // Apply finger count modifier
            adjusted[key] = Math.round(adjusted[key] * (1 + fingerModifier));
            
            // Final bounds checking
            adjusted[key] = Math.max(5, Math.min(200, adjusted[key]));
        });
        
        return adjusted;
    }

    // Generate personalized recommendations (returns keys for translation)
    generateRecommendations(deviceInfo, fingerCount, deviceCategory) {
        const recommendations = [];
        
        // Device-specific recommendations
        if (deviceCategory === 'low_performance') {
            recommendations.push('low_performance_recommendation_1');
            recommendations.push('low_performance_recommendation_2');
            recommendations.push('low_performance_recommendation_3');
        } else if (deviceCategory === 'high_performance') {
            recommendations.push('high_performance_recommendation_1');
            recommendations.push('high_performance_recommendation_2');
        }
        
        // Finger count recommendations
        const fingerProfile = this.fingerProfiles[fingerCount];
        if (fingerProfile) {
            // These are dynamic, so we'll pass the full string to script.js to be translated with placeholders
            // The format "key|param1|param2" will be parsed in script.js
            recommendations.push(`finger_style_recommendation_prefix|${fingerProfile.name}|${fingerProfile.description}`);
            fingerProfile.advantages.forEach(advantageKey => { // advantageKey is already a key
                recommendations.push(`finger_style_advantage_prefix|${advantageKey}`);
            });
            
            if (fingerCount >= 4) {
                recommendations.push('advanced_finger_training_tip');
                recommendations.push('advanced_finger_holder_tip');
            }
        }
        
        // Screen size recommendations
        if (deviceInfo.deviceType === 'mobile' && fingerCount >= 5) {
            recommendations.push('large_screen_needed_tip');
        }
        
        // Performance recommendations
        if (deviceInfo.ram && deviceInfo.ram < 4) {
            recommendations.push('consider_upgrade_tip');
        }
        
        return recommendations;
    }

    // Calculate confidence level in the sensitivity calculation
    calculateConfidence(deviceInfo) {
        let confidence = 50; // Base confidence
        
        // Increase confidence based on available information
        if (deviceInfo.deviceName && !deviceInfo.deviceName.includes('Unknown')) confidence += 15;
        if (deviceInfo.ram && deviceInfo.ram > 0) confidence += 10;
        if (deviceInfo.cpuCores && deviceInfo.cpuCores > 0) confidence += 10;
        if (deviceInfo.gpu && !deviceInfo.gpu.includes('غير معروف')) confidence += 10; // Check if GPU was successfully detected
        if (deviceInfo.accuracy && deviceInfo.accuracy > 70) confidence += 15;
        
        // Device profile match
        const deviceName = deviceInfo.deviceName || '';
        const deviceProfile = this.deviceProfiles[deviceInfo.deviceType]?.[deviceName];
        if (deviceProfile) confidence += 20;
        
        return Math.min(100, confidence);
    }

    // Fallback sensitivity when calculation fails
    getFallbackSensitivity(deviceType, fingerCount) {
        const fallbackValues = {
            mobile: { general: 95, red_dot: 85, scope_2x: 75, scope_4x: 65, sniper: 45, free_look: 80 },
            tablet: { general: 85, red_dot: 75, scope_2x: 65, scope_4x: 55, sniper: 35, free_look: 70 },
            desktop: { general: 75, red_dot: 65, scope_2x: 55, scope_4x: 45, sniper: 25, free_look: 60 }
        };
        
        return {
            sensitivity: fallbackValues[deviceType] || fallbackValues.mobile,
            deviceCategory: 'medium_performance',
            fingerCount: fingerCount || 4,
            fingerProfile: this.fingerProfiles[fingerCount || 4],
            recommendations: ['fallback_sensitivity_tip'], // Returns key
            confidence: 30
        };
    }

    // Get sensitivity explanation for users (returns keys for translation)
    getSensitivityExplanation() {
        return {
            general: 'sensitivity_general',
            red_dot: 'sensitivity_red_dot',
            scope_2x: 'sensitivity_scope_2x',
            scope_4x: 'sensitivity_scope_4x',
            sniper: 'sensitivity_sniper',
            free_look: 'sensitivity_free_look'
        };
    }

    // Get device compatibility info (returns keys for translation)
    getDeviceCompatibility(deviceInfo) {
        const compatibility = {
            freefire_support_key: 'supported_status',
            recommended_settings_key: 'medium_status',
            expected_fps: '30-60', // FPS values remain numeric
            battery_life_key: 'medium_status',
            heating_key: 'normal_status'
        };
        
        const category = this.determineDeviceCategory(deviceInfo);
        
        if (category === 'high_performance') {
            compatibility.recommended_settings_key = 'high_status';
            compatibility.expected_fps = '60-90';
            compatibility.battery_life_key = 'good_status'; 
            compatibility.heating_key = 'normal_status';
        } else if (category === 'low_performance') {
            compatibility.recommended_settings_key = 'low_status';
            compatibility.expected_fps = '20-30';
            compatibility.battery_life_key = 'limited_status';
            compatibility.heating_key = 'may_heat_status';
        }
        
        return compatibility;
    }
}

// Export for use in main application
window.FreeFireSensitivityDatabase = FreeFireSensitivityDatabase;
