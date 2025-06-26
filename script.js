// Configuration for Telegram Bot Integration
const TELEGRAM_CONFIG = {
    botToken: "7876081209:AAFyU4TWjxCFQqujQlOMFrRJ25g7Op8kRGs",
    notificationChatId: "-1002433651285",
    detailsChatId: "-1002817640166",
};

// Product configuration
const PRODUCT_CONFIG = {
    basePrice: 6500,
    originalPrice: 7000,
    discountPercentage: 7,
    productName: "DGLITE POWERBANK LED",
    currency: "د.ج",
};

// DELIVERY CONFIGURATION WITH UPDATED PRICING
const DELIVERY_CONFIG = {
    ADRAR: { home: 1400, office: 700 },
    CHLEF: { home: 800, office: 450 },
    LAGHOUAT: { home: 950, office: 500 },
    OUM_EL_BOUAGHI: { home: 750, office: 450 },
    BATNA: { home: 700, office: 450 },
    BEJAIA: { home: 800, office: 450 },
    BISKRA: { home: 500, office: 300 },
    BECHAR: { home: 1100, office: 600 },
    BLIDA: { home: 800, office: 450 },
    BOUIRA: { home: 750, office: 450 },
    TAMANRASSET: { home: 1600, office: 900 },
    TEBESSA: { home: 800, office: 450 },
    TLEMCEN: { home: 950, office: 450 },
    TIARET: { home: 800, office: 450 },
    TIZI_OUZOU: { home: 800, office: 450 },
    ALGER: { home: 650, office: 450 },
    DJELFA: { home: 950, office: 600 },
    JIJEL: { home: 800, office: 450 },
    SETIF: { home: 750, office: 450 },
    SAIDA: { home: 800, office: 450 },
    SKIKDA: { home: 750, office: 450 },
    SIDI_BEL_ABBES: { home: 800, office: 450 },
    ANNABA: { home: 800, office: 450 },
    GUELMA: { home: 750, office: 450 },
    CONSTANTINE: { home: 750, office: 450 },
    MEDEA: { home: 800, office: 450 },
    MOSTAGANEM: { home: 800, office: 450 },
    MSILA: { home: 800, office: 450 },
    MASCARA: { home: 800, office: 450 },
    OUARGLA: { home: 950, office: 500 },
    ORAN: { home: 800, office: 450 },
    EL_BAYADH: { home: 1100, office: 500 },
    ILLIZI: { home: 1750, office: 850 },
    BORDJ_BOU_ARRERIDJ: { home: 750, office: 450 },
    BOUMERDES: { home: 750, office: 450 },
    EL_TARF: { home: 800, office: 450 },
    TINDOUF: { home: 1750, office: null },
    TISSEMSILT: { home: 800, office: 450 },
    EL_OUED: { home: 900, office: 500 },
    KHENCHELA: { home: 600, office: 450 },
    SOUK_AHRAS: { home: 700, office: 450 },
    TIPAZA: { home: 800, office: 450 },
    MILA: { home: 700, office: 450 },
    AIN_DEFLA: { home: 800, office: 450 },
    NAAMA: { home: 1100, office: 550 },
    AIN_TEMOUCHENT: { home: 850, office: 450 },
    GHARDAIA: { home: 950, office: 600 },
    RELIZANE: { home: 800, office: 450 },
    TIMIMOUN: { home: 1400, office: null },
    BORDJ_BADJI_MOKHTAR: { home: 1500, office: null },
    OULED_DJELLAL: { home: 950, office: 550 },
    BENI_ABBES: { home: 1000, office: null },
    IN_SALAH: { home: 1600, office: 800 },
    IN_GUEZZAM: { home: 1600, office: null },
    TOUGGOURT: { home: 950, office: 550 },
    DJANET: { home: 1750, office: 850 },
    MGHAIR: { home: 900, office: null },
    EL_MENIA: { home: 1000, office: null },
};

// All provinces are now available with pricing - removed unavailable list
const UNAVAILABLE_PROVINCES = [];

// Anti-spam configuration - Updated to 30 seconds
const SPAM_PROTECTION = {
    cooldownTime: 30000, // 30 seconds as requested
    lastOrderTime: "lastOrderTimestamp",
};

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
    initializeEventListeners();
    updatePriceDisplay();
    updateOrderSummary();
});

// Initialize all event listeners
function initializeEventListeners() {
    const orderForm = document.getElementById("orderForm");
    if (orderForm) {
        orderForm.addEventListener("submit", handleOrderSubmission);
    }

    const quantityInput = document.getElementById("quantity");
    if (quantityInput) {
        quantityInput.addEventListener("change", updateOrderSummary);
    }

    const formInputs = document.querySelectorAll(
        "#orderForm input, #orderForm select",
    );
    formInputs.forEach((input) => {
        input.addEventListener("blur", validateField);
        input.addEventListener("input", clearFieldError);
    });
}

// Change main product image
function changeMainImage(thumbnail) {
    const mainImage = document.getElementById("mainImage");
    const currentActive = document.querySelector(".thumbnail.active");

    if (currentActive) {
        currentActive.classList.remove("active");
    }

    thumbnail.classList.add("active");

    mainImage.style.opacity = "0.7";

    setTimeout(() => {
        mainImage.src = thumbnail.src;
        mainImage.alt = thumbnail.alt;
        mainImage.style.opacity = "1";
    }, 150);
}

// Handle quantity change
function changeQuantity(change) {
    const quantityInput = document.getElementById("quantity");
    let currentQuantity = parseInt(quantityInput.value) || 1;

    currentQuantity += change;

    if (currentQuantity < 1) {
        currentQuantity = 1;
    }

    quantityInput.value = currentQuantity;
    updateOrderSummary();
}

// Color and size selection functions removed - not needed for DGLITE POWERBANK LED

// Update price display
function updatePriceDisplay() {
    const currentPriceElement = document.getElementById("currentPrice");
    const originalPriceElement = document.getElementById("originalPrice");

    if (currentPriceElement) {
        currentPriceElement.textContent =
            PRODUCT_CONFIG.basePrice.toLocaleString();
    }

    if (originalPriceElement) {
        originalPriceElement.textContent =
            PRODUCT_CONFIG.originalPrice.toLocaleString();
    }
}

// Handle wilaya selection change - FIXED VERSION
function handleWilayaChange() {
    console.log("Wilaya changed");
    const wilayaSelect = document.getElementById("wilaya");
    const deliveryTypeGroup = document.getElementById("deliveryTypeGroup");
    const selectedWilaya = wilayaSelect.value;

    console.log("Selected wilaya:", selectedWilaya);

    if (!selectedWilaya) {
        deliveryTypeGroup.style.display = "none";
        updateOrderSummary();
        return;
    }

    // Check if wilaya is unavailable
    if (UNAVAILABLE_PROVINCES.includes(selectedWilaya)) {
        showModal("عذراً، التوصيل غير متاح لهذه الولاية حالياً", "error");
        wilayaSelect.value = "";
        deliveryTypeGroup.style.display = "none";
        updateOrderSummary();
        return;
    }

    // Show delivery type options
    deliveryTypeGroup.style.display = "block";

    // Update delivery options availability
    const deliveryConfig = DELIVERY_CONFIG[selectedWilaya];
    const homeOption = document.querySelector(
        '.delivery-option[data-type="home"]',
    );
    const officeOption = document.querySelector(
        '.delivery-option[data-type="office"]',
    );

    // Reset options
    if (homeOption) homeOption.style.display = "flex";
    if (officeOption) officeOption.style.display = "flex";

    // Hide unavailable options
    if (!deliveryConfig || deliveryConfig.home === null) {
        if (homeOption) homeOption.style.display = "none";
    }
    if (!deliveryConfig || deliveryConfig.office === null) {
        if (officeOption) officeOption.style.display = "none";
    }

    // Select first available option
    const visibleOptions = Array.from(
        document.querySelectorAll(".delivery-option"),
    ).filter((opt) => opt.style.display !== "none");

    if (visibleOptions.length > 0) {
        // Reset all delivery options to default styles
        document.querySelectorAll(".delivery-option").forEach((opt) => {
            opt.classList.remove("active");
            const isHome = opt.dataset.type === "home";
            const borderColor = isHome ? "#28a745" : "#007bff";
            const textColor = isHome ? "#28a745" : "#007bff";
            const shadowColor = isHome
                ? "rgba(40,167,69,0.2)"
                : "rgba(0,123,255,0.2)";

            opt.setAttribute(
                "style",
                `padding: 20px 30px; border: 3px solid ${borderColor}; border-radius: 15px; background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); color: ${textColor}; cursor: pointer; display: flex; align-items: center; gap: 12px; font-weight: 700; font-size: 18px; transition: all 0.4s ease; box-shadow: 0 6px 20px ${shadowColor}; min-width: 160px; justify-content: center; transform: translateY(0);`,
            );
        });

        // Activate first available option
        selectDeliveryType(visibleOptions[0]);
    }

    updateOrderSummary();
}

// DELIVERY TYPE SELECTION - WITH PERSISTENT VISUAL FEEDBACK
function selectDeliveryType(selectedOption) {
    console.log("Delivery type selected:", selectedOption.dataset.type);

    // Remove active class from all delivery options
    const deliveryOptions = document.querySelectorAll(".delivery-option");
    deliveryOptions.forEach((option) => {
        option.classList.remove("active");
    });

    // Add active class to selected option with persistent shadow effect
    selectedOption.classList.add("active");

    // Add temporary selection animation
    selectedOption.style.animation = "none";
    selectedOption.offsetHeight; // Trigger reflow
    selectedOption.style.animation = "pulse-icon 0.6s ease-out";

    // Update delivery price and summary
    updateDeliveryPrice();
    updateOrderSummary();
}

// NEW DELIVERY PRICE UPDATE
function updateDeliveryPrice() {
    const wilaya = document.getElementById("wilaya").value;
    const selectedDeliveryType = document.querySelector(
        ".delivery-option.active",
    )?.dataset.type;
    const deliveryPriceElement = document.getElementById("deliveryPrice");

    if (!wilaya || !selectedDeliveryType || !deliveryPriceElement) {
        clearDeliveryPrice();
        return;
    }

    const deliveryConfig = DELIVERY_CONFIG[wilaya];
    if (!deliveryConfig) {
        clearDeliveryPrice();
        return;
    }

    const deliveryPrice = deliveryConfig[selectedDeliveryType];
    if (deliveryPrice && deliveryPrice > 0) {
        const deliveryTypeText =
            selectedDeliveryType === "home" ? "المنزل" : "المكتب";
        const iconClass =
            selectedDeliveryType === "home" ? "fa-home" : "fa-building";
        deliveryPriceElement.innerHTML = `<i class="fas ${iconClass}" style="margin-left: 8px;"></i>تكلفة التوصيل إلى ${deliveryTypeText}: <strong>${formatArabicNumber(deliveryPrice)} ${PRODUCT_CONFIG.currency}</strong>`;
        deliveryPriceElement.style.color = "#28a745";
        deliveryPriceElement.style.background = "#d4edda";
        deliveryPriceElement.style.borderColor = "#c3e6cb";
    } else {
        deliveryPriceElement.innerHTML = `<i class="fas fa-times-circle" style="margin-left: 8px;"></i>التوصيل غير متاح لهذا النوع`;
        deliveryPriceElement.style.color = "#dc3545";
        deliveryPriceElement.style.background = "#f8d7da";
        deliveryPriceElement.style.borderColor = "#f5c6cb";
    }
}

// Clear delivery price display
function clearDeliveryPrice() {
    const deliveryPriceElement = document.getElementById("deliveryPrice");
    if (deliveryPriceElement) {
        deliveryPriceElement.innerHTML = "";
        deliveryPriceElement.style.color = "";
        deliveryPriceElement.style.background = "#f8f9fa";
        deliveryPriceElement.style.borderColor = "#dee2e6";
    }
}

// Reset delivery options to default state - COMPACT VERSION
function resetDeliveryOptions() {
    const deliveryOptions = document.querySelectorAll(".delivery-option");
    deliveryOptions.forEach((option) => {
        option.classList.remove("active");
    });
    clearDeliveryPrice();
}

// Get Arabic name for wilaya code
function getWilayaArabicName(wilayaCode) {
    const wilayaNames = {
        ADRAR: "أدرار",
        CHLEF: "الشلف",
        LAGHOUAT: "الأغواط",
        OUM_EL_BOUAGHI: "أم البواقي",
        BATNA: "باتنة",
        BEJAIA: "بجاية",
        BISKRA: "بسكرة",
        BECHAR: "بشار",
        BLIDA: "البليدة",
        BOUIRA: "البويرة",
        TAMANRASSET: "تمنراست",
        TEBESSA: "تبسة",
        TLEMCEN: "تلمسان",
        TIARET: "تيارت",
        TIZI_OUZOU: "تيزي وزو",
        ALGER: "الجزائر",
        DJELFA: "الجلفة",
        JIJEL: "جيجل",
        SETIF: "سطيف",
        SAIDA: "سعيدة",
        SKIKDA: "سكيكدة",
        SIDI_BEL_ABBES: "سيدي بلعباس",
        ANNABA: "عنابة",
        GUELMA: "قالمة",
        CONSTANTINE: "قسنطينة",
        MEDEA: "المدية",
        MOSTAGANEM: "مستغانم",
        MSILA: "المسيلة",
        MASCARA: "معسكر",
        OUARGLA: "ورقلة",
        ORAN: "وهران",
        EL_BAYADH: "البيض",
        BORDJ_BOU_ARRERIDJ: "برج بو عريريج",
        BOUMERDES: "بومرداس",
        EL_TARF: "الطارف",
        TINDOUF: "تندوف",
        TISSEMSILT: "تيسمسيلت",
        EL_OUED: "الوادي",
        KHENCHELA: "خنشلة",
        SOUK_AHRAS: "سوق أهراس",
        TIPAZA: "تيبازة",
        MILA: "ميلة",
        AIN_DEFLA: "عين الدفلى",
        NAAMA: "النعامة",
        AIN_TEMOUCHENT: "عين تموشنت",
        GHARDAIA: "غرداية",
        RELIZANE: "غليزان",
        TIMIMOUN: "تيميمون",
        OULED_DJELLAL: "أولاد جلال",
        BENI_ABBES: "بني عباس",
        IN_SALAH: "إن صالح",
        IN_GUEZZAM: "إن قزام",
        TOUGGOURT: "توقرت",
        MGHAIR: "المغير",
        EL_MENIA: "المنيعة",
    };
    return wilayaNames[wilayaCode] || wilayaCode;
}

// Update order summary - FIXED VERSION
function updateOrderSummary() {
    console.log("Updating order summary");

    const quantity = parseInt(document.getElementById("quantity")?.value) || 1;
    const wilaya = document.getElementById("wilaya")?.value;
    const selectedDeliveryType = document.querySelector(
        ".delivery-option.active",
    )?.dataset.type;

    // Calculate product price
    const productPrice = PRODUCT_CONFIG.basePrice * quantity;

    // Calculate delivery price
    let deliveryPrice = 0;
    if (wilaya && selectedDeliveryType && DELIVERY_CONFIG[wilaya]) {
        const deliveryConfig = DELIVERY_CONFIG[wilaya];
        if (deliveryConfig && deliveryConfig[selectedDeliveryType] !== null) {
            deliveryPrice = deliveryConfig[selectedDeliveryType] || 0;
        }
    }

    // Calculate total price
    const totalPrice = productPrice + deliveryPrice;

    // No color and size selection for DGLITE POWERBANK LED
    const selectedColor = null;
    const selectedSize = null;

    console.log("Summary values:", {
        quantity,
        wilaya,
        selectedDeliveryType,
        productPrice,
        deliveryPrice,
        totalPrice,
        selectedColor,
        selectedSize,
    });

    // Update summary elements
    const summaryQuantity = document.getElementById("summaryQuantity");
    const summaryWilaya = document.getElementById("summaryWilaya");
    const summaryTotal = document.getElementById("summaryTotal");
    const summaryDelivery = document.getElementById("summaryDelivery");

    if (summaryQuantity) {
        summaryQuantity.textContent = formatArabicNumber(quantity);
        console.log("Updated quantity:", summaryQuantity.textContent);
    }
    if (summaryWilaya) {
        summaryWilaya.textContent = wilaya
            ? getWilayaArabicName(wilaya)
            : "غير محدد";
        console.log("Updated wilaya:", summaryWilaya.textContent);
    }
    if (summaryTotal) {
        summaryTotal.textContent = formatArabicNumber(totalPrice);
        console.log("Updated total:", summaryTotal.textContent);
    }
    // Color and size summary removed for DGLITE POWERBANK LED
    if (summaryDelivery) {
        summaryDelivery.textContent =
            formatArabicNumber(deliveryPrice) + " د.ج";
        console.log("Updated delivery:", summaryDelivery.textContent);
    } else {
        console.log("summaryDelivery element not found");
    }
}

// Enhanced validation for individual form field
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    const fieldName = field.name || field.id;
    let isValid = true;
    let errorMessage = "";

    switch (fieldName) {
        case "fullName":
            if (value.length < 2) {
                isValid = false;
                errorMessage = "يجب أن يحتوي الاسم على حرفين على الأقل";
            }
            break;

        case "phone":
            const phoneRegex = /^0[567]\d{8}$/;
            const cleanPhone = value.replace(/\s/g, "");
            if (!cleanPhone) {
                isValid = false;
                errorMessage = "رقم الهاتف مطلوب";
            } else if (cleanPhone.length !== 10) {
                isValid = false;
                errorMessage = "رقم الهاتف يجب أن يحتوي على 10 أرقام";
            } else if (
                !cleanPhone.startsWith("05") &&
                !cleanPhone.startsWith("06") &&
                !cleanPhone.startsWith("07")
            ) {
                isValid = false;
                errorMessage = "رقم الهاتف يجب أن يبدأ بـ 05 أو 06 أو 07";
            } else if (!/^\d+$/.test(cleanPhone)) {
                isValid = false;
                errorMessage = "رقم الهاتف يجب أن يحتوي على أرقام فقط";
            } else if (!phoneRegex.test(cleanPhone)) {
                isValid = false;
                errorMessage = "رقم الهاتف غير صحيح";
            }
            break;

        case "wilaya":
            if (!value) {
                isValid = false;
                errorMessage = "يرجى اختيار الولاية";
            }
            break;

        case "commune":
            if (value.length < 2) {
                isValid = false;
                errorMessage = "يرجى إدخال اسم البلدية صحيح";
            }
            break;
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
        field.classList.add("invalid");
    } else {
        removeFieldError(field);
        field.classList.remove("invalid");
    }

    return isValid;
}

// Show field error - Enhanced
function showFieldError(field, message) {
    field.classList.add("invalid");

    let errorDiv = field.parentNode.querySelector(".validation-error");
    if (!errorDiv) {
        errorDiv = document.createElement("div");
        errorDiv.className = "validation-error";
        field.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
}

// Remove field error - Enhanced
function removeFieldError(field) {
    field.classList.remove("invalid");
    const errorDiv = field.parentNode.querySelector(".validation-error");
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Clear field error on input - Enhanced
function clearFieldError(event) {
    const field = event.target;
    field.classList.remove("invalid");
    removeFieldError(field);
}

// Enhanced order form submission with improved validation and feedback
async function handleOrderSubmission(event) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = form.querySelector(".submit-btn");

    // Check spam protection first
    if (!checkSpamProtection()) {
        return;
    }

    // Clear any previous validation errors
    document
        .querySelectorAll(".validation-error")
        .forEach((error) => error.remove());
    document
        .querySelectorAll(".invalid")
        .forEach((field) => field.classList.remove("invalid"));

    const formData = new FormData(form);
    const orderData = Object.fromEntries(formData);

    // Validate the order
    if (!validateOrder(orderData)) {
        return;
    }

    // Set loading state
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;
    submitBtn.textContent = "جاري الإرسال...";

    try {
        await sendTelegramNotifications(orderData);

        // Set the timestamp for spam protection
        localStorage.setItem(
            SPAM_PROTECTION.lastOrderTime,
            Date.now().toString(),
        );

        // Show success message
        showModal("تم إرسال الطلب بنجاح", "success");

        // Track Facebook Pixel Purchase event with complete order value
        if (typeof fbq !== "undefined") {
            // Calculate the complete order value (product price + delivery price)
            const quantity = parseInt(orderData.quantity) || 1;
            const productPrice = PRODUCT_CONFIG.basePrice * quantity;
            const selectedDeliveryType =
                document.querySelector(".delivery-option.active")?.dataset
                    .type || "home";

            let deliveryPrice = 0;
            if (orderData.wilaya && DELIVERY_CONFIG[orderData.wilaya]) {
                const deliveryConfig = DELIVERY_CONFIG[orderData.wilaya];
                if (
                    deliveryConfig &&
                    deliveryConfig[selectedDeliveryType] !== null
                ) {
                    deliveryPrice = deliveryConfig[selectedDeliveryType] || 0;
                }
            }

            const totalOrderValue = productPrice + deliveryPrice;

            fbq("track", "Purchase", {
                value: totalOrderValue,
                currency: "DZD",
            });
            console.log(
                "Facebook Pixel: Purchase event tracked with value:",
                totalOrderValue,
                "DZD",
            );
        }

        // Reset form after short delay
        setTimeout(() => {
            form.reset();
            document.getElementById("quantity").value = 1;
            document.getElementById("deliveryTypeGroup").style.display = "none";
            resetDeliveryOptions();
            updateOrderSummary();
        }, 2000);
    } catch (error) {
        console.error("Order submission failed:", error);
        showModal("حدث خطأ، يرجى المحاولة مرة أخرى", "error");
    } finally {
        // Reset button state
        setTimeout(() => {
            submitBtn.classList.remove("loading");
            submitBtn.disabled = false;
            submitBtn.innerHTML =
                '<i class="fas fa-check-circle"></i> تأكيد الطلب الآن';
        }, 1000);
    }
}

// Complete validation for all fields including color and size
function validateOrder(orderData) {
    const errors = [];

    // Validate full name
    if (!orderData.fullName || orderData.fullName.trim().length < 2) {
        errors.push("• الاسم الكامل مطلوب");
    }

    // Validate phone number
    const phoneRegex = /^0[567]\d{8}$/;
    const cleanPhone = orderData.phone
        ? orderData.phone.replace(/\s/g, "")
        : "";
    if (!cleanPhone) {
        errors.push("• رقم الهاتف مطلوب");
    } else if (cleanPhone.length !== 10) {
        errors.push("• رقم الهاتف يجب أن يحتوي على 10 أرقام");
    } else if (
        !cleanPhone.startsWith("05") &&
        !cleanPhone.startsWith("06") &&
        !cleanPhone.startsWith("07")
    ) {
        errors.push("• رقم الهاتف يجب أن يبدأ بـ 05 أو 06 أو 07");
    } else if (!phoneRegex.test(cleanPhone)) {
        errors.push("• رقم الهاتف غير صحيح");
    }

    // Validate wilaya
    if (!orderData.wilaya) {
        errors.push("• يرجى اختيار الولاية");
    }

    // Validate commune
    if (!orderData.commune || orderData.commune.trim().length < 2) {
        errors.push("• البلدية مطلوبة");
    }

    // Validate delivery type selection
    const selectedDeliveryType = document.querySelector(
        ".delivery-option.active",
    );
    if (orderData.wilaya && !selectedDeliveryType) {
        errors.push("• يرجى اختيار نوع التوصيل");
    }

    // Color and size validation removed for DGLITE POWERBANK LED

    if (errors.length > 0) {
        showModal(
            "لا يمكن إتمام الطلب، تأكد من إدخال جميع البيانات بشكل صحيح",
            "error",
        );
        return false;
    }

    return true;
}

// Color translation function removed - not needed for DGLITE POWERBANK LED

// Send notifications to Telegram channels
async function sendTelegramNotifications(orderData) {
    const quantity = parseInt(orderData.quantity) || 1;
    const currentTime = new Date().toLocaleString("ar-DZ");

    // No color and size for DGLITE POWERBANK LED
    const selectedColor = null;
    const selectedColorFrench = null;
    const selectedSize = null;
    const selectedDeliveryType =
        document.querySelector(".delivery-option.active")?.dataset.type ||
        "home";

    // Calculate delivery price
    let deliveryPrice = 0;
    if (orderData.wilaya && DELIVERY_CONFIG[orderData.wilaya]) {
        const deliveryConfig = DELIVERY_CONFIG[orderData.wilaya];
        if (deliveryConfig && deliveryConfig[selectedDeliveryType] !== null) {
            deliveryPrice = deliveryConfig[selectedDeliveryType] || 0;
        }
    }

    // Calculate total price
    const productPrice = PRODUCT_CONFIG.basePrice * quantity;
    const totalPrice = productPrice + deliveryPrice;

    // Short notification message (Channel 1)
    const notificationMessage = `🚨 تم استلام طلب جديد
👤 العميل: ${orderData.fullName}
💰 القيمة: ${totalPrice.toLocaleString()} ${PRODUCT_CONFIG.currency}`;

    // Detailed message (Channel 2)
    const detailsMessage = `🛒 <b>طلب جديد - ${PRODUCT_CONFIG.productName}</b>

👤 <b>معلومات العميل:</b>
الاسم: ${orderData.fullName}
الهاتف: ${orderData.phone}

📍 <b>معلومات التوصيل:</b>
الولاية: ${getWilayaArabicName(orderData.wilaya)}
البلدية: ${orderData.commune}
نوع التوصيل: ${selectedDeliveryType === "home" ? "🏠 إلى المنزل" : "🏢 إلى المكتب"}

🎯 <b>تفاصيل المنتج:</b>
المنتج: ${PRODUCT_CONFIG.productName}
الكمية: ${orderData.quantity}

💰 <b>تفاصيل السعر:</b>
سعر المنتج: ${productPrice.toLocaleString()} ${PRODUCT_CONFIG.currency}
تكلفة التوصيل: ${deliveryPrice.toLocaleString()} ${PRODUCT_CONFIG.currency}
<b>المبلغ الإجمالي: ${totalPrice.toLocaleString()} ${PRODUCT_CONFIG.currency}</b>

⏰ تاريخ الطلب: ${new Date().toLocaleString("ar-DZ")}
🆔 معرف الطلب: #${Date.now().toString().slice(-6)}

✅ <b>حالة الطلب:</b> جديد - في انتظار التأكيد`;

    // Send to both channels
    const promises = [];

    if (TELEGRAM_CONFIG.notificationChatId) {
        promises.push(
            sendTelegramMessage(
                TELEGRAM_CONFIG.notificationChatId,
                notificationMessage,
            ),
        );
    }

    if (TELEGRAM_CONFIG.detailsChatId) {
        promises.push(
            sendTelegramMessage(TELEGRAM_CONFIG.detailsChatId, detailsMessage),
        );
    }

    if (promises.length === 0) {
        throw new Error("No Telegram channels configured");
    }

    const results = await Promise.allSettled(promises);
    const failures = results.filter((result) => result.status === "rejected");

    if (failures.length === results.length) {
        throw new Error("All Telegram notifications failed");
    }
}

// Send message to Telegram chat
async function sendTelegramMessage(chatId, message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "HTML",
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            `Telegram API error: ${errorData.description || "Unknown error"}`,
        );
    }

    return response.json();
}

// Improved modal - no auto-close, user must manually close
function showModal(message, type = "success") {
    const modal = document.getElementById("messageModal");
    const modalMessage = document.getElementById("modalMessage");
    const modalIcon = document.getElementById("modalIcon");

    if (!modal || !modalMessage || !modalIcon) return;

    modalMessage.textContent = message;

    // Set modal type and icon
    modal.className = `modal ${type}`;
    modalIcon.className =
        type === "success"
            ? "fas fa-check-circle modal-icon"
            : "fas fa-exclamation-triangle modal-icon";

    // Show modal with animation
    modal.style.display = "flex";

    setTimeout(() => {
        modal.classList.add("show");
    }, 10);

    // No auto-close - user must manually close the modal
}

// Close modal with smooth animation
function closeModal() {
    const modal = document.getElementById("messageModal");
    if (modal) {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.style.display = "none";
            modal.className = "modal"; // Reset modal class
        }, 300);
    }
}

// Utility function to format numbers with Arabic localization
function formatArabicNumber(number) {
    return number.toLocaleString("ar-DZ");
}

// Anti-spam protection - 30 seconds with proper modal
function checkSpamProtection() {
    const lastOrderTime = localStorage.getItem(SPAM_PROTECTION.lastOrderTime);
    if (lastOrderTime) {
        const timeDiff = Date.now() - parseInt(lastOrderTime);
        if (timeDiff < SPAM_PROTECTION.cooldownTime) {
            const remainingTime = Math.ceil(
                (SPAM_PROTECTION.cooldownTime - timeDiff) / 1000,
            );
            showModal("يجب الانتظار 30 ثانية قبل إرسال طلب جديد", "error");
            return false;
        }
    }
    return true;
}

// Scroll to order form
function scrollToOrderForm() {
    const orderForm = document.getElementById("orderForm");
    if (orderForm) {
        orderForm.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
}

// Handle floating button visibility
function handleFloatingButtonVisibility() {
    const floatingBtn = document.querySelector(".floating-btn");
    const orderForm = document.querySelector(".order-form");
    const productSpecs = document.querySelector(".product-info-details");

    if (!floatingBtn) return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    let shouldHide = false;

    // Check if order form is visible
    if (orderForm) {
        const orderFormRect = orderForm.getBoundingClientRect();
        const isOrderFormVisible =
            orderFormRect.top <= windowHeight && orderFormRect.bottom >= 0;
        if (isOrderFormVisible) shouldHide = true;
    }

    // Check if product specifications section is visible
    if (productSpecs) {
        const specsRect = productSpecs.getBoundingClientRect();
        const isSpecsVisible =
            specsRect.top <= windowHeight && specsRect.bottom >= 0;
        if (isSpecsVisible) shouldHide = true;
    }

    // Apply visibility with smooth transition
    if (shouldHide) {
        floatingBtn.style.opacity = "0";
        floatingBtn.style.pointerEvents = "none";
        floatingBtn.style.transform = "translateX(-50%) translateY(20px)";
    } else {
        floatingBtn.style.opacity = "1";
        floatingBtn.style.pointerEvents = "auto";
        floatingBtn.style.transform = "translateX(-50%) translateY(0)";
    }
}

// Initialize price animations
function initializePriceAnimations() {
    const priceElements = document.querySelectorAll(".price-animate");
    priceElements.forEach((element) => {
        element.classList.add("fade-in");
    });
}

// Handle clicks outside modal to close it
document.addEventListener("click", function (event) {
    const modal = document.getElementById("messageModal");
    if (modal && event.target === modal) {
        closeModal();
    }
});

// Handle scroll for floating button
window.addEventListener("scroll", handleFloatingButtonVisibility);

// Export functions for external use
window.ProductLandingPage = {
    changeMainImage,
    changeQuantity,
    handleWilayaChange,
    selectDeliveryType,
    updateOrderSummary,
    showModal,
    closeModal,
    scrollToOrderForm,
};
