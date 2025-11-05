// Configuration for Telegram Bot Integration
const TELEGRAM_CONFIG = {
    botToken: "8550949965:AAEQJ8ihNZe8XiXqhlMUOzJ3tRSU1fFcl68",
    chatId: "-1003265029727"
};

// Product configuration
const PRODUCT_CONFIG = {
    basePrice: 2900,
    originalPrice: 3200,
    discountPercentage: Math.round(((3200 - 2900) / 3200) * 100),
    productName: "My Pet & Go - حقيبة حمل القطط",
    currency: "د.ج",
};

// DELIVERY CONFIGURATION - Based on provided PDF
const DELIVERY_CONFIG = {
    "Médéa": { home: 500, office: 400 },
    "Blida": { home: 550, office: 450 },
    "Bouira": { home: 550, office: 450 },
    "Tiaret": { home: 550, office: 450 },
    "Alger": { home: 550, office: 450 },
    "M'Sila": { home: 550, office: 450 },
    "Tissemsilt": { home: 550, office: 450 },
    "Chlef": { home: 700, office: 600 },
    "Oum El Bouaghi": { home: 700, office: 600 },
    "Batna": { home: 700, office: 600 },
    "Béjaïa": { home: 700, office: 600 },
    "Tlemcen": { home: 700, office: 600 },
    "Tizi Ouzou": { home: 700, office: 600 },
    "Djelfa": { home: 700, office: 600 },
    "Jijel": { home: 700, office: 600 },
    "Sétif": { home: 700, office: 600 },
    "Saïda": { home: 700, office: 600 },
    "Skikda": { home: 700, office: 600 },
    "Sidi Bel Abbès": { home: 700, office: 600 },
    "Annaba": { home: 700, office: 600 },
    "Guelma": { home: 700, office: 600 },
    "Constantine": { home: 700, office: 600 },
    "Mostaganem": { home: 700, office: 600 },
    "Mascara": { home: 700, office: 600 },
    "Oran": { home: 700, office: 600 },
    "Bordj Bou Arreridj": { home: 700, office: 600 },
    "Boumerdès": { home: 700, office: 600 },
    "El Tarf": { home: 700, office: 600 },
    "Khenchela": { home: 700, office: 600 },
    "Souk Ahras": { home: 700, office: 600 },
    "Tipaza": { home: 700, office: 600 },
    "Mila": { home: 700, office: 600 },
    "Aîn Defla": { home: 700, office: 600 },
    "Aîn Témouchent": { home: 700, office: 600 },
    "Relizane": { home: 700, office: 600 },
    "Laghouat": { home: 850, office: 700 },
    "Biskra": { home: 850, office: 700 },
    "Tébessa": { home: 850, office: 700 },
    "Ouargla": { home: 850, office: 700 },
    "El Oued": { home: 850, office: 700 },
    "Ghardaïa": { home: 850, office: 700 },
    "Ouled Djellal": { home: 850, office: 700 },
    "Touggourt": { home: 850, office: 700 },
    "El M'Ghair": { home: 850, office: 700 },
    "El Menia": { home: 850, office: 700 },
    "Adrar": { home: 1000, office: 800 },
    "Béchar": { home: 1000, office: 800 },
    "El Bayadh": { home: 1000, office: 800 },
    "Naâma": { home: 1000, office: 800 },
    "Timimoun": { home: 1000, office: 800 },
    "Bordj Badji Mokhtar": { home: 1000, office: 800 },
    "Béni Abbès": { home: 1000, office: 800 },
    "Tamanrasset": { home: 1500, office: 1300 },
    "Illizi": { home: 1500, office: 1300 },
    "Tindouf": { home: 1500, office: 1300 },
    "In Salah": { home: 1500, office: 1300 },
    "In Guezzam": { home: 1500, office: 1300 },
    "Djanet": { home: 1500, office: 1300 }
};

// Anti-spam configuration
const SPAM_PROTECTION = {
    cooldownTime: 30000,
    lastOrderTime: "lastOrderTimestamp",
};

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
    initializeEventListeners();
    updatePriceDisplay();
    updateOrderSummary();
    initializeFloatingButton();
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

// Handle wilaya selection change
function handleWilayaChange() {
    const wilayaSelect = document.getElementById("wilaya");
    const deliveryTypeGroup = document.getElementById("deliveryTypeGroup");
    const selectedWilaya = wilayaSelect.value;

    if (!selectedWilaya) {
        deliveryTypeGroup.style.display = "none";
        updateOrderSummary();
        return;
    }

    deliveryTypeGroup.style.display = "block";

    const deliveryConfig = DELIVERY_CONFIG[selectedWilaya];
    const homeOption = document.querySelector(
        '.delivery-option[data-type="home"]',
    );
    const officeOption = document.querySelector(
        '.delivery-option[data-type="office"]',
    );

    if (homeOption) homeOption.style.display = "flex";
    if (officeOption) officeOption.style.display = "flex";

    const visibleOptions = Array.from(
        document.querySelectorAll(".delivery-option"),
    ).filter((opt) => opt.style.display !== "none");

    if (visibleOptions.length > 0) {
        document.querySelectorAll(".delivery-option").forEach((opt) => {
            opt.classList.remove("active");
        });

        selectDeliveryType(visibleOptions[0]);
    }

    updateOrderSummary();
}

// Delivery type selection
function selectDeliveryType(selectedOption) {
    const deliveryOptions = document.querySelectorAll(".delivery-option");
    deliveryOptions.forEach((option) => {
        option.classList.remove("active");
    });

    selectedOption.classList.add("active");

    updateDeliveryPrice();
    updateOrderSummary();
}

// Update delivery price
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

// Update order summary
function updateOrderSummary() {
    const quantity = parseInt(document.getElementById("quantity")?.value) || 1;
    const wilaya = document.getElementById("wilaya")?.value;
    const selectedDeliveryType = document.querySelector(
        ".delivery-option.active",
    )?.dataset.type;

    const productPrice = PRODUCT_CONFIG.basePrice * quantity;

    let deliveryPrice = 0;
    if (wilaya && selectedDeliveryType && DELIVERY_CONFIG[wilaya]) {
        const deliveryConfig = DELIVERY_CONFIG[wilaya];
        if (deliveryConfig && deliveryConfig[selectedDeliveryType] !== null) {
            deliveryPrice = deliveryConfig[selectedDeliveryType] || 0;
        }
    }

    const totalPrice = productPrice + deliveryPrice;

    const summaryTotal = document.getElementById("summaryTotal");
    const summaryDelivery = document.getElementById("summaryDelivery");

    if (summaryTotal) {
        summaryTotal.textContent = formatArabicNumber(totalPrice);
    }

    if (summaryDelivery) {
        summaryDelivery.textContent =
            formatArabicNumber(deliveryPrice) + " د.ج";
    }
}

// Format number to Arabic
function formatArabicNumber(number) {
    return number.toLocaleString('ar-DZ');
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

// Show field error
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

// Remove field error
function removeFieldError(field) {
    field.classList.remove("invalid");
    const errorDiv = field.parentNode.querySelector(".validation-error");
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Clear field error on input
function clearFieldError(event) {
    const field = event.target;
    field.classList.remove("invalid");
    removeFieldError(field);
}

// Check spam protection
function checkSpamProtection() {
    const lastOrderTime = localStorage.getItem(SPAM_PROTECTION.lastOrderTime);
    if (lastOrderTime) {
        const timeSinceLastOrder = Date.now() - parseInt(lastOrderTime);
        if (timeSinceLastOrder < SPAM_PROTECTION.cooldownTime) {
            const remainingSeconds = Math.ceil(
                (SPAM_PROTECTION.cooldownTime - timeSinceLastOrder) / 1000,
            );
            showModal(
                `الرجاء الانتظار ${remainingSeconds} ثانية قبل إرسال طلب جديد`,
                "error",
            );
            return false;
        }
    }
    return true;
}

// Validate order
function validateOrder(orderData) {
    if (!orderData.fullName || orderData.fullName.trim().length < 2) {
        showModal("يرجى إدخال الاسم الكامل", "error");
        return false;
    }

    const phoneRegex = /^0[567]\d{8}$/;
    const cleanPhone = orderData.phone.replace(/\s/g, "");
    if (!phoneRegex.test(cleanPhone)) {
        showModal("رقم الهاتف غير صحيح", "error");
        return false;
    }

    if (!orderData.wilaya) {
        showModal("يرجى اختيار الولاية", "error");
        return false;
    }

    if (!orderData.commune || orderData.commune.trim().length < 2) {
        showModal("يرجى إدخال البلدية", "error");
        return false;
    }

    const selectedDeliveryType = document.querySelector(
        ".delivery-option.active",
    )?.dataset.type;
    if (!selectedDeliveryType) {
        showModal("يرجى اختيار نوع التوصيل", "error");
        return false;
    }

    return true;
}

// Enhanced order form submission
async function handleOrderSubmission(event) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = form.querySelector(".submit-btn");

    if (!checkSpamProtection()) {
        return;
    }

    document
        .querySelectorAll(".validation-error")
        .forEach((error) => error.remove());
    document
        .querySelectorAll(".invalid")
        .forEach((field) => field.classList.remove("invalid"));

    const formData = new FormData(form);
    const orderData = Object.fromEntries(formData);

    if (!validateOrder(orderData)) {
        return;
    }

    submitBtn.classList.add("loading");
    submitBtn.disabled = true;
    submitBtn.textContent = "جاري الإرسال...";

    try {
        await sendTelegramNotification(orderData);

        localStorage.setItem(
            SPAM_PROTECTION.lastOrderTime,
            Date.now().toString(),
        );

        showModal("تم إرسال الطلب بنجاح", "success");

        if (typeof fbq !== "undefined") {
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
        }

        setTimeout(() => {
            form.reset();
            document.getElementById("quantity").value = 1;
            document.getElementById("deliveryTypeGroup").style.display = "none";
            document.querySelectorAll(".delivery-option").forEach((opt) => {
                opt.classList.remove("active");
            });
            clearDeliveryPrice();
            updateOrderSummary();
        }, 2000);
    } catch (error) {
        console.error("Order submission failed:", error);
        showModal("حدث خطأ، يرجى المحاولة مرة أخرى", "error");
    } finally {
        setTimeout(() => {
            submitBtn.classList.remove("loading");
            submitBtn.disabled = false;
            submitBtn.innerHTML =
                '<i class="fas fa-check-circle"></i> تأكيد الطلب الآن';
        }, 1000);
    }
}

// Send Telegram notification (single channel)
async function sendTelegramNotification(orderData) {
    const quantity = parseInt(orderData.quantity) || 1;
    const selectedDeliveryType =
        document.querySelector(".delivery-option.active")?.dataset.type ||
        "home";

    const productPrice = PRODUCT_CONFIG.basePrice * quantity;
    let deliveryPrice = 0;

    if (orderData.wilaya && DELIVERY_CONFIG[orderData.wilaya]) {
        const deliveryConfig = DELIVERY_CONFIG[orderData.wilaya];
        if (deliveryConfig && deliveryConfig[selectedDeliveryType] !== null) {
            deliveryPrice = deliveryConfig[selectedDeliveryType] || 0;
        }
    }

    const totalPrice = productPrice + deliveryPrice;
    const deliveryTypeText = selectedDeliveryType === "home" ? "المنزل" : "المكتب";

    const message = `
🛍️ *طلب جديد - ${PRODUCT_CONFIG.productName}*

👤 *الاسم:* ${orderData.fullName}
📞 *الهاتف:* ${orderData.phone}
📍 *الولاية:* ${orderData.wilaya}
🏘️ *البلدية:* ${orderData.commune}
🚚 *نوع التوصيل:* ${deliveryTypeText}

📦 *تفاصيل الطلب:*
• المنتج: ${PRODUCT_CONFIG.productName}
• الكمية: ${quantity}
• سعر المنتج: ${formatArabicNumber(productPrice)} ${PRODUCT_CONFIG.currency}
• سعر التوصيل: ${formatArabicNumber(deliveryPrice)} ${PRODUCT_CONFIG.currency}

💰 *السعر الإجمالي:* ${formatArabicNumber(totalPrice)} ${PRODUCT_CONFIG.currency}
    `.trim();

    const url = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat_id: TELEGRAM_CONFIG.chatId,
            text: message,
            parse_mode: "Markdown",
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to send Telegram message");
    }

    return response.json();
}

// Show modal message
function showModal(message, type) {
    const modal = document.getElementById("messageModal");
    const modalMessage = document.getElementById("modalMessage");
    const modalIcon = document.getElementById("modalIcon");

    modal.className = "modal " + type;
    modalMessage.textContent = message;

    modal.style.display = "block";
    setTimeout(() => {
        modal.classList.add("show");
    }, 10);
}

// Close modal
function closeModal() {
    const modal = document.getElementById("messageModal");
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = "none";
    }, 200);
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById("messageModal");
    if (event.target === modal) {
        closeModal();
    }
};

// Initialize floating button functionality
function initializeFloatingButton() {
    const floatingBtn = document.getElementById("floatingOrderBtn");
    const orderSection = document.getElementById("orderSection");
    
    if (!floatingBtn || !orderSection) return;
    
    // Handle button click - scroll to form
    floatingBtn.addEventListener("click", function() {
        orderSection.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
        });
    });
    
    // Handle scroll - hide button when form is visible
    window.addEventListener("scroll", function() {
        const rect = orderSection.getBoundingClientRect();
        const isFormVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isFormVisible) {
            floatingBtn.classList.add("hidden");
        } else {
            floatingBtn.classList.remove("hidden");
        }
    });
    
    // Initial check
    const rect = orderSection.getBoundingClientRect();
    const isFormVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (isFormVisible) {
        floatingBtn.classList.add("hidden");
    }
}
