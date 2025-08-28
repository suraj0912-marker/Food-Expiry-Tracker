# 🍎 Food Expiry Tracker

A comprehensive web application built with **Spring Boot** to help users track food items and monitor expiration dates, promoting food safety and reducing waste.

## 📋 Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **📦 Food Inventory Management**: Add, update, delete, and view food items
- **⏰ Expiry Monitoring**: Track expiration dates with visual indicators
- **🔔 Automated Alerts**: Notifications for items nearing expiry
- **📊 Dashboard**: Clean and intuitive user interface
- **💾 Persistent Storage**: Oracle database integration for data management
- **📱 Responsive Design**: Works across different screen sizes

## 🛠️ Technologies Used

### Backend
- **Java 8+**
- **Spring Boot 2.x**
- **Spring Data JPA**
- **Oracle Database**

### Frontend
- **HTML5**
- **CSS3**
- **JavaScript**

### Tools
- **Spring Tool Suite (STS)**
- **Oracle SQL Developer**
- **Maven** (Dependency Management)

## 📋 Prerequisites

Before running this application, make sure you have:

- Java 8 or higher installed
- Oracle Database setup
- Maven 3.6+ installed
- Spring Tool Suite (STS) or any Java IDE

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/food-expiry-tracker.git
   cd food-expiry-tracker
   ```

2. **Configure Database**
   - Update `application.properties` with your Oracle database credentials:
   ```properties
   spring.datasource.url=jdbc:oracle:thin:@localhost:1521:xe
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```

3. **Build the project**
   ```bash
   mvn clean install
   ```

4. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

5. **Access the application**
   - Open your browser and go to `http://localhost:8080`

## 💻 Usage

2. **Add Food Items**: Navigate to the dashboard and add food items with expiry dates
3. **Monitor Expiry**: View all items with color-coded expiry indicators
4. **Update Items**: Edit food item details as needed
5. **Delete Items**: Remove consumed or expired items
6. **Get Alerts**: Receive notifications for items nearing expiry

## 📁 Project Structure

```
food-expiry-tracker/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── foodtracker/
│   │   │           ├── FoodExpiryApplication.java
│   │   │           ├── controller/
│   │   │           ├── model/
│   │   │           ├── repository/
│   │   │           └── service/
│   │   ├── resources/
│   │   │   ├── static/
│   │   │   │   ├── css/
│   │   │   │   ├── js/
│   │   │   │   └── images/
│   │   │   ├── templates/
│   │   │   └── application.properties
│   └── test/
├── pom.xml
└── README.md
```



## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**[Suraj Behra]**
- GitHub: (https://github.com/suraj0912-marker)
  

## 🙏 Acknowledgments

- Spring Boot community for excellent documentation
- Oracle for database support
- All contributors who helped improve this project

---

⭐ **Star this repository if you found it helpful!**
