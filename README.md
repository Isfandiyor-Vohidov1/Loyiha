# Loyiha


# BlogAPI: Bu loyiha blog postlarini boshqarish uchun

**BlogAPI** blog postlarini boshqarish uchun mo'ljallangan API bo'lib, postlar, mualliflar, taglar, kategoriyalar, va foydalanuvchilarni boshqarish imkoniyatini beradi. Advanced level talablarga muvofiq, rolga asoslangan autentifikatsiya va ruxsatnomalar, JWT asosida autentifikatsiya, va boshqa funksiyalarni o'z ichiga oladi.

### 1. Ma'lumotlar Modellari

### Post Modeli (`Post`)

- **id** (UUID) - Post identifikatori.
- **title** (string) - Post nomi.
- **content** (text) - Post matni.
- **authorId** (UUID) - Muallif identifikatori.
- **tags** (array of UUIDs) - Postga tegishli taglar identifikatorlari.
- **categoryId** (UUID) - Kategoriya identifikatori.
- **status** (enum) - Post holati (`draft`, `published`, `archived`).
- **publishedAt** (timestamp) - Nashr qilish sanasi.
- **createdAt** (timestamp) - Yaratilgan sana.
- **updatedAt** (timestamp) - Yangilangan sana.

### Muallif Modeli (`Author`)

- **id** (UUID) - Muallif identifikatori.
- **name** (string) - Muallif nomi.
- **bio** (text) - Muallif biografiyasi.
- **avatar** (string) - Muallif rasmi URL'i.
- **createdAt** (timestamp) - Yaratilgan sana.
- **updatedAt** (timestamp) - Yangilangan sana.

### Kategoriya Modeli (`Category`)

- **id** (UUID) - Kategoriya identifikatori.
- **name** (string) - Kategoriya nomi.
- **description** (text) - Kategoriya ta'rifi.
- **createdAt** (timestamp) - Yaratilgan sana.
- **updatedAt** (timestamp) - Yangilangan sana.

### Teglar Modeli (`Tag`)

- **id** (UUID) - Teg identifikatori.
- **name** (string) - Teg nomi.
- **createdAt** (timestamp) - Yaratilgan sana.
- **updatedAt** (timestamp) - Yangilangan sana.

### Foydalanuvchi Modeli (`User`)

- **id** (UUID) - Foydalanuvchi identifikatori.
- **email** (string) - Email manzili, unikal.
- **username** (string) - Foydalanuvchi nomi, unikal.
- **password** (string) - Shaxtalangan parol.
- **role** (enum) - Roli (`author`, `editor`, `admin`).
- **status** (enum) - Hisob holati (`active`, `inactive`).
- **createdAt** (timestamp) - Yaratilgan sana.
- **updatedAt** (timestamp) - Yangilangan sana.

### 2. API End-pointlar

### 2.1. Auth API-lar

**2.1.1. Foydalanuvchi Ro'yxatdan O'tish (Sign Up)**

- **Endpoint**: `/auth/signup`
- **Method**: `POST`
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "email": "string",
      "username": "string",
      "password": "string",
      "confirmPassword": "string",
      "role": "string", // Enum: ["author", "editor", "admin"]
      "firstName": "string",
      "lastName": "string",
      "avatar": "string", // URL to profile picture (optional)
      "bio": "string" // Optional
    }
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "message": "User created",
      "userId": "UUID",
      "otpSent": true
    }
    
    ```
    

**2.1.2. OTP ni Tasdiqlash (Verify OTP)**

- **Endpoint**: `/auth/verify-otp`
- **Method**: `POST`
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "userId": "UUID",
      "otp": "string"
    }
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "message": "OTP verified, account activated"
    }
    
    ```
    

**2.1.3. Foydalanuvchi Tizimga Kirish (Sign In)**

- **Endpoint**: `/auth/signin`
- **Method**: `POST`
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "email": "string",
      "password": "string"
    }
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "accessToken": "string",
      "refreshToken": "string"
    }
    
    ```
    

**2.1.4. Foydalanuvchi Ma'lumotlarini Olish (Get Current User)**

- **Endpoint**: `/auth/me`
- **Method**: `GET`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "id": "UUID",
      "email": "string",
      "username": "string",
      "role": "string",
      "firstName": "string",
      "lastName": "string",
      "avatar": "string",
      "bio": "string",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
    
    ```
    

**2.1.5. Foydalanuvchi Tizimdan Chiqish (Logout)**

- **Endpoint**: `/auth/logout`
- **Method**: `GET`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "message": "Logout successful"
    }
    
    ```
    

**2.1.6. Token Yangilash (Refresh Token)**

- **Endpoint**: `/auth/refresh-token`
- **Method**: `POST`
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "refreshToken": "string"
    }
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "accessToken": "string",
      "refreshToken": "string"
    }
    
    ```
    

### 2.2. Postlar API-lari

**2.2.1. Yangi Post Qo'shish (Create Post)**

- **Endpoint**: `/posts`
- **Method**: `POST`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "title": "string",
      "content": "string",
      "authorId": "UUID",
      "tags": ["UUID"], // Array of tag IDs
      "categoryId": "UUID",
      "status": "string" // Enum: ["draft", "published", "archived"]
    }
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "postId": "UUID",
      "message": "Post created"
    }
    
    ```
    

**2.2.2. Barcha Postlarni Olish (Get All Posts)**

- **Endpoint**: `/posts`
- **Method**: `GET`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    [
      {
        "id": "UUID",
        "title": "string",
        "content": "string",
        "authorId": "UUID",
        "tags": ["UUID"],
        "categoryId": "UUID",
        "status": "string",
        "publishedAt": "timestamp",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      },
      ...
    ]
    
    ```
    

**2.2.3. ID bo'yicha Post Olish (Get Post by ID)**

- **Endpoint**: `/posts/:id`
- **Method**: `GET`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "id": "UUID",
      "title": "string",
      "content": "string",
      "authorId": "UUID",
      "tags": ["UUID"],
      "categoryId": "UUID",
      "status": "string",
      "publishedAt": "timestamp",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
    
    ```
    

**2.2.4. Postni Yangilash (Update Post)**

- **Endpoint**: `/posts/:id`
- **Method**: `PUT`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "title": "string",
      "content": "string",
      "tags
    
    ```
    

": ["UUID"],
"categoryId": "UUID",
"status": "string"
}
```

- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "postId": "UUID",
      "message": "Post updated"
    }
    
    ```
    

**2.2.5. Postni O'chirish (Delete Post)**

- **Endpoint**: `/posts/:id`
- **Method**: `DELETE`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "message": "Post deleted"
    }
    
    ```
    

### 2.3. Mualliflar API-lari

**2.3.1. Yangi Muallif Qo'shish (Create Author)**

- **Endpoint**: `/authors`
- **Method**: `POST`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "name": "string",
      "bio": "string",
      "avatar": "string" // URL to profile picture
    }
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "authorId": "UUID",
      "message": "Author created"
    }
    
    ```
    

**2.3.2. Barcha Mualliflarni Olish (Get All Authors)**

- **Endpoint**: `/authors`
- **Method**: `GET`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    [
      {
        "id": "UUID",
        "name": "string",
        "bio": "string",
        "avatar": "string",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      },
      ...
    ]
    
    ```
    

**2.3.3. ID bo'yicha Muallif Olish (Get Author by ID)**

- **Endpoint**: `/authors/:id`
- **Method**: `GET`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "id": "UUID",
      "name": "string",
      "bio": "string",
      "avatar": "string",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
    
    ```
    

**2.3.4. Muallifni Yangilash (Update Author)**

- **Endpoint**: `/authors/:id`
- **Method**: `PUT`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "name": "string",
      "bio": "string",
      "avatar": "string"
    }
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "authorId": "UUID",
      "message": "Author updated"
    }
    
    ```
    

**2.3.5. Muallifni O'chirish (Delete Author)**

- **Endpoint**: `/authors/:id`
- **Method**: `DELETE`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "message": "Author deleted"
    }
    
    ```
    

### 2.4. Kategoriyalar API-lari

**2.4.1. Yangi Kategoriya Qo'shish (Create Category)**

- **Endpoint**: `/categories`
- **Method**: `POST`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "name": "string",
      "description": "string"
    }
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "categoryId": "UUID",
      "message": "Category created"
    }
    
    ```
    

**2.4.2. Barcha Kategoriyalarni Olish (Get All Categories)**

- **Endpoint**: `/categories`
- **Method**: `GET`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    [
      {
        "id": "UUID",
        "name": "string",
        "description": "string",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      },
      ...
    ]
    
    ```
    

**2.4.3. ID bo'yicha Kategoriya Olish (Get Category by ID)**

- **Endpoint**: `/categories/:id`
- **Method**: `GET`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "id": "UUID",
      "name": "string",
      "description": "string",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
    
    ```
    

**2.4.4. Kategoriyani Yangilash (Update Category)**

- **Endpoint**: `/categories/:id`
- **Method**: `PUT`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "name": "string",
      "description": "string"
    }
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "categoryId": "UUID",
      "message": "Category updated"
    }
    
    ```
    

**2.4.5. Kategoriyani O'chirish (Delete Category)**

- **Endpoint**: `/categories/:id`
- **Method**: `DELETE`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "message": "Category deleted"
    }
    
    ```
    

### 2.5. Teglar API-lari

**2.5.1. Yangi Teg Qo'shish (Create Tag)**

- **Endpoint**: `/tags`
- **Method**: `POST`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "name": "string"
    }
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "tagId": "UUID",
      "message": "Tag created"
    }
    
    ```
    

**2.5.2. Barcha Teglarni Olish (Get All Tags)**

- **Endpoint**: `/tags`
- **Method**: `GET`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    [
      {
        "id": "UUID",
        "name": "string",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      },
      ...
    ]
    
    ```
    

**2.5.3. ID bo'yicha Teg Olish (Get Tag by ID)**

- **Endpoint**: `/tags/:id`
- **Method**: `GET`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "id": "UUID",
      "name": "string",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
    
    ```
    

**2.5.4. Tegni Yangilash (Update Tag)**

- **Endpoint**: `/tags/:id`
- **Method**: `PUT`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "name": "string"
    }
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "tagId": "UUID",
      "message": "Tag updated"
    }
    
    ```
    

**2.5.5. Tegni O'chirish (Delete Tag)**

- **Endpoint**: `/tags/:id`
- **Method**: `DELETE`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "message": "Tag deleted"
    }
    
    ```
    

### 3. Autentifikatsiya va Ruxsatnomalar

### 3.1. JWT Autentifikatsiya

- **Access Token**: Foydalanuvchini autentifikatsiya qilish uchun ishlatiladi.
- **Refresh Token**: Access token muddati tugaganda yangilash uchun ishlatiladi.

### 3.2. Role-based Authorization

- **Roles**:
    - `author`: O'z postlarini boshqarish.
    - `editor`: Barcha postlarni ko'rish va tahrir qilish.
    - `admin`:

Foydalanuvchilarni boshqarish, barcha admin huquqlariga ega.

### 3.3. Permission Guards

- Endpointlar uchun `Authorization` sarlavhasi kerak.
- Rolga qarab himoyalangan:
    - `admin`: Barcha postlar, foydalanuvchilar, kategoriyalar, va taglarni boshqarish.
    - `editor`: Barcha postlar bo'yicha operatsiyalarni bajarish.

**Guard Misoli**:

```json
{
  "role": "admin",
  "message": "Access denied. Admins only."
}

```

### 4. Texnologiyalar

- **Express.js**: API yaratish uchun.
- **Knex.js**: Ma'lumotlar bazasi bilan ishlash uchun.
- **PostgreSQL**: Ma'lumotlarni saqlash uchun.
- **JWT**: Foydalanuvchi autentifikatsiyasi uchun.
- **Express-Winston**: Loglarni saqlash va ularga kirish uchun.

### 5. Test va Loyihani Versiya Boshqaruvi

- **Postman**: API'ni sinab ko'rish uchun.
- **GitHub**: Versiyalarni boshqarish uchun.

### Xulosa

**BlogAPI** yuqori darajadagi blog post boshqaruvi uchun kerakli barcha funksiyalarni taqdim etadi. Postlar, mualliflar, taglar, kategoriyalar, va foydalanuvchilarni boshqarish uchun CRUD operatsiyalari, JWT asosida autentifikatsiya, va rolga asoslangan ruxsatnomalar o'z ichiga oladi. Bu API'lar orqali blog postlari samarali boshqariladi va himoyalanadi.
