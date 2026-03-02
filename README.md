# 🏡 CozyStay

CozyStay is a full-stack, fully functional property-booking platform inspired by Airbnb. Built from the ground up, this project focuses on clean architecture, secure authentication, and seamless third-party API integration to deliver a rich user experience.

## ✨ Features

* **Robust MVC Architecture:** The codebase is strictly organized using the Model-View-Controller pattern, ensuring maintainable routing, database logic, and frontend views.
* **Interactive Mapping:** Integrates **MapTiler** for backend geocoding and **MapLibre** for displaying dynamic, accurate location pins for every property.
* **Secure Authentication:** User sign-up, login, and session management are handled securely using **Passport.js** (Local Strategy).
* **Authorization Controls:** Custom middleware ensures users can only edit or delete properties and reviews they personally own.
* **Cloud Image Storage:** Seamless multi-part form data handling via **Multer** and **Cloudinary** allows users to upload and manage property images.
* **Full CRUD Functionality:** Complete Create, Read, Update, and Delete operations for both property listings and user reviews.

## 🛠️ Tech Stack

**Frontend:**
* HTML5, CSS3, JavaScript
* EJS (Embedded JavaScript templates) & EJS-Mate
* MapLibre GL JS (for map rendering)

**Backend:**
* Node.js
* Express.js
* Passport.js (Authentication)
* Multer (File uploads)

**Database & Cloud:**
* MongoDB Atlas & Mongoose
* Connect-Mongo (Session storage)
* Cloudinary (Image hosting & transformation)
* MapTiler API (Forward geocoding)
