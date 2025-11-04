# My Pet & Go - Landing Page

## Overview

صفحة هبوط (Landing Page) عربية احترافية لبيع منتج "My Pet & Go" - حقيبة حمل القطط المريحة والآمنة. الصفحة مصممة بشكل بسيط وفعال لزيادة المبيعات من خلال صورة منتج جذابة ونموذج طلب سهل الاستخدام.

## System Architecture

### Frontend Architecture
- **Static HTML Structure**: صفحة واحدة بتصميم بسيط (صورة + نموذج)
- **CSS Styling**: تصميم متجاوب مع دعم كامل للعربية (RTL)
- **JavaScript Functionality**: نموذج تفاعلي مع تكامل Telegram و Facebook Pixel
- **No Framework Dependencies**: تقنيات ويب خالصة للسرعة والأداء

### Backend Architecture
- **Static File Server**: Python HTTP server للتطوير
- **Client-Side Processing**: معالجة النماذج في المتصفح
- **External API Integration**: تكامل مباشر مع Telegram Bot API

## Key Components

### 1. Product Banner
- صورة طويلة تحتوي على جميع معلومات ومميزات المنتج
- تصميم جذاب بألوان وردية وزرقاء
- عرض كامل للشاشة مع تجاوب للموبايل

### 2. Order Form
- **Form Fields**: 
  - الاسم الكامل
  - رقم الهاتف (تحقق من الصيغة الجزائرية)
  - الولاية (58 ولاية جزائرية)
  - نوع التوصيل (منزل/مكتب)
  - البلدية
  - الكمية (أزرار +/-)

### 3. Dynamic Pricing System
- **Product Price**: 
  - السعر الأصلي: 3,200 د.ج
  - السعر بعد التخفيض: 2,900 د.ج
  - نسبة التخفيض: 9%
- **Delivery Pricing**: أسعار متغيرة حسب الولاية ونوع التوصيل
  - Group 1 (المدية، البليدة، إلخ): 400-550 د.ج
  - Group 2 (معظم الولايات): 600-700 د.ج
  - Group 3 (الجنوب): 700-850 د.ج
  - Group 4 (الصحراء): 800-1000 د.ج
  - Group 5 (أقصى الجنوب): 1300-1500 د.ج
- **Total Calculation**: حساب تلقائي للسعر الإجمالي

### 4. Telegram Integration
- **Single Channel System**: قناة واحدة لجميع الطلبات
- **Channel ID**: -1003265029727
- **Bot Token**: 8550949965:AAEQJ8ihNZe8XiXqhlMUOzJ3tRSU1fFcl68
- **Message Format**: رسالة مفصلة تحتوي على:
  - معلومات العميل (الاسم، الهاتف)
  - العنوان (الولاية، البلدية، نوع التوصيل)
  - تفاصيل الطلب (الكمية، الأسعار)
  - السعر الإجمالي

### 5. Facebook Pixel Tracking
- **Pixel ID**: 729458889477435
- **PageView**: عند تحميل الصفحة
- **Purchase**: عند نجاح الطلب مع القيمة الإجمالية

### 6. Form Validation
- **Client-Side Validation**: تحقق فوري من البيانات
- **Phone Validation**: رقم جزائري (10 أرقام، يبدأ بـ 05/06/07)
- **Required Fields**: جميع الحقول مطلوبة
- **Error Messages**: رسائل واضحة بالعربية

### 7. Anti-Spam Protection
- **Cooldown**: 30 ثانية بين كل طلب
- **LocalStorage**: حفظ وقت آخر طلب
- **User Feedback**: رسائل واضحة للمستخدم

## Data Flow

1. **User Visits**: تحميل الصفحة → Facebook Pixel PageView
2. **Form Interaction**: اختيار الولاية → إظهار خيارات التوصيل → حساب السعر
3. **Order Submission**: 
   - التحقق من Anti-Spam
   - التحقق من البيانات
   - إرسال إلى Telegram
   - Facebook Pixel Purchase
   - رسالة نجاح
   - إعادة تعيين النموذج

## External Dependencies

### CDN Resources
- **Font Awesome 6.0.0**: الأيقونات
- **Google Fonts Cairo**: الخط العربي
- **Telegram Bot API**: إرسال الطلبات
- **Facebook Pixel**: تتبع التحويلات

### Development Dependencies
- **Python 3.11**: خادم ملفات ثابت
- **Port 5000**: منفذ الخادم

## Recent Changes

### December 5, 2024
- **Product Changed**: من "DGLITE SOLAR" إلى "My Pet & Go - حقيبة حمل القطط"
- **Complete Redesign**: تحويل من صفحة منتج إلى صفحة هبوط (Landing Page)
- **Layout**: صورة طويلة في الأعلى + نموذج في الأسفل
- **Pricing Updated**: 
  - سعر قديم: 3,200 د.ج
  - سعر جديد: 2,900 د.ج
- **Delivery Prices**: تحديث شامل لكل 58 ولاية من ملف PDF
- **Telegram Updated**: 
  - Bot Token جديد
  - قناة واحدة فقط (حذف قناة النوتيفيكيشن)
  - Channel ID: -1003265029727
- **Facebook Pixel**: تحديث Pixel ID الجديد (729458889477435)
- **Image Gallery**: إزالة نظام المعرض والاستبدال بصورة واحدة طويلة
- **Features Removed**: 
  - حذف معرض الصور المصغرة
  - حذف قسم المواصفات المنفصل
  - حذف الزر العائم
  - حذف قناة الإشعارات في Telegram
- **UI Improvements**:
  - تصميم أنظف وأبسط
  - تركيز على النموذج
  - ألوان جديدة (بنفسجي/وردي)
  - تجاوب محسّن للموبايل

## User Preferences

- Preferred communication style: Simple, everyday language in Arabic
- Focus on functionality and user experience
- Clean, professional design without extra features

## Notes

- المشروع جاهز للنشر
- جميع المفاتيح محدثة
- نظام التوصيل يعمل بشكل كامل
- التكامل مع Telegram و Facebook Pixel فعال
