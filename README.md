# QuickLink - Smart URL Management  

QuickLink is a **Next.js-based** web application designed to **organize, categorize, and manage URLs** efficiently. With **real-time filtering, bulk actions, and label management**, it enhances the user experience for seamless link organization.  

---

## 🚀 Features  
- ✅Create customized URLs for your links.
- ✅ Automatically redirect to the original URL when visiting the customized URL.
- ✅ **Save & Manage URLs** – Store and retrieve links with ease.  
- ✅ **Custom Labeling System** – Categorize URLs as **Favorites**, **Work**, or **Custom Labels** (upcoming).  
- ✅ **Dynamic Filtering** – Instantly switch between **All URLs** or **Favorite URLs**.  
- ✅ **Bulk Actions Support** – Select multiple items for **quick editing or deletion**.  
- ✅ **Interactive UI & UX** – Minimal, smooth, and **intuitive** interface.  
- ✅ **Real-time Database Updates** – Seamlessly integrates with **MongoDB**.  
- ✅ **Authentication with Clerk** – Secure and personalized access for users.  
- ✅ **Skeleton Loaders** – Enhances UX with smooth **loading animations**.  
- ✅ **Clipboard Copy Feature** – Instantly copy links with a single click.  
- ✅ **Toast Notifications** – Provides instant feedback with **Toastify**.  

---
## 🛠️ Tech Stack  

- **Frontend**: Next.js, React, Tailwind CSS  
- **Backend**: Next.js API Routes, MongoDB  
- **Authentication**: Clerk  
- **Notifications**: React-Toastify  

---
## 📌 Future Enhancements  

🔹 **Custom Labels** – Users will be able to **create & apply their own labels** for better organization.    
🔹 **Advanced Search & Filtering** – Enhance URL retrieval with **keyword-based search**.  
🔹 **User Dashboard** – Personalized analytics for **better insights on saved links**.  

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14 or above)
- **npm** or **yarn**
- **MongoDB** (if using a local database; not required for MongoDB Atlas)


### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ShadabKhan-01/QuickLink.git
   cd QuickLink
   ```
2. **Install Dependencies:**
    ```bash
    npm install
    ```
3. **Setup Environment Variables:** Create a .env.local file in the root directory and add the following:
    ```bash
    MONGODB_URI=<your-mongodb-url>
    NEXT_PUBLIC_HOST=http://localhost:3000/
    ```
4. **Run the Development Server:**
    ```bash
    npm run dev
    ```
5. **Access the App:** Open your browser and go to http://localhost:3000.
---

## 💡 How to Use
### 1. Add URLs:

- Enter the original URL and a custom label.
- The system automatically generates a shortened, categorized URL.
### 2. Filter & Manage:

- Use the Favorite or All filter to organize links.
- Edit, delete, or bulk-select items for quick actions.
### 3. Copy & Share:

- Easily copy any saved URL with a single click.
---

## 🤝Contributing
We welcome contributions to enhance QuickLink. Here's how you can help:
1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature-name'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.


## 📞Contact
For any inquiries or support, feel free to reach out:

📧Email: iam.shadab.khan.1001@gmail.com <br>
💻 GitHub: [ShadabKhan-01](https://github.com/ShadabKhan-01)