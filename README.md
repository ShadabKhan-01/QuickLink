# QuickLink - Get URL of Your Type

QuickLink is a web application that allows users to generate customized URLs for their desired links. It is built using **Next.js** and **MongoDB** as the database.

---

## Features
- Create customized URLs for your links.
- Automatically redirect to the original URL when visiting the customized URL.
- Simple and intuitive UI for creating customized links.

### Future Enhancements
- Add user authentication for managing links.
- Track the number of visits for each customized URL.
- Organize and categorize customized URLs.

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
   git clone <repository-url>
   cd QuickLink
   ```
2. **Install Dependencies:**
    ```bash
    npm install
    ```
3. **Setup Environment Variables:** Create a .env.local file in the root directory and add the following:
    ```bash
    MONGODB_URI=<your-mongodb-url>
    NEXT_PUBLIC_HOST=http://localhost:3000
    ```
4. **Run the Development Server:**
    ```bash
    npm run dev
    ```
5. **Access the App:** Open your browser and go to http://localhost:3000.
---

## Usage
1. On the homepage, input:
    - **Original URL:** The URL you want to create a customized link for.
    - **Customized URL:** Your desired custom string.
2. If the customized URL does not already exist, the application will generate a new URL with the prefix:
    ```vbnet
    http://localhost:3000/<custom-string>
    ```
3. Visiting the generated URL will redirect you to the original URL.
---
## Technologies Used
- **Next.js:** Framework for building the app.
- **MongoDB:** Database for storing URLs and associated data.
---

## Contributing
We welcome contributions to enhance QuickLink. Here's how you can help:
1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature-name'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.


## Contact
For any inquiries or support, feel free to reach out:

Email: iam.shadab.khan.1001@gmail.com <br>
GitHub: [ShadabKhan-01](https://github.com/ShadabKhan-01)