# System Intelligence Dashboard 🚀

A lightweight, browser-based IT audit and network monitoring tool designed for quick hardware inventory and connection stability checks. 

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Platform](https://img.shields.io/badge/platform-Windows-lightgrey.svg)

## 📋 Overview
This project provides a "Zero-Install" solution for IT technicians and system administrators to gather detailed hardware and network specifications from Windows machines. It uses a combination of a PowerShell-backed `.bat` script for data extraction and a modern HTML5 dashboard for visualization.



## ✨ Key Features
* **One-Click Audit:** Download and run a `.bat` tool to extract system data instantly.
* **Hardware Inventory:** View CPU, GPU (NVIDIA GTX 1050 Ti detected), Motherboard, RAM, and Storage info.
* **Network Topology:** Visualizes the connection path from Local IP to Default Gateway.
* **Live Performance:** Real-time simulated monitoring for Download, Upload, and Latency.
* **Smart Alerts:** Visual "Pulse Alerts" if high Virtual Memory usage is detected.
* **Privacy First:** No data is sent to a server. All processing happens locally in your browser.

## 🚀 How to Use
1.  **Open the Dashboard:** Launch the live site via GitHub Pages.
2.  **Download the Tool:** Click the `mdi-download-network-outline` **GET .BAT TOOL** button.
3.  **Run the Audit:** Double-click `AuditTool.bat` on the target Windows PC.
4.  **Sync Data:** Click **SYNC JSON** and select the generated `system.json` file.
5.  **Review:** Analyze the system details and network stability.



## 🛠 Tech Stack
* **Frontend:** HTML5, CSS3 (Inter & JetBrains Mono fonts)
* **Icons:** Material Design Icons (MDI)
* **Backend Logic:** PowerShell / WMI (Windows Management Instrumentation)
* **Deployment:** GitHub Pages

## 🔒 Security & Privacy
This application is a **Client-Side Only** tool. 
* The `.bat` file is transparent and can be inspected via Notepad.
* The `system.json` file is read by the browser's `FileReader` API.
* No system data is uploaded, stored, or tracked by any third-party server.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Created with 💻 by [Geperson/kuyagep]*