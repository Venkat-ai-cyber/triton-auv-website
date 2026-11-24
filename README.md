# TRITON – Autonomous Underwater Vehicle (AUV)
### Complete Product & Investor-Facing Platform | 3D CAD | Edge AI | Offline-First

Developed by **Team Triton** at **Team Triton**.

**Tagline:** BUILT FOR THE OCEAN. ENGINEERED FOR IMPACT.  
**Brand Statement:** EXPLORE. NAVIGATE. ACCOMPLISH.  
**Primary Point of Contact:** ASHOK · Phone: [+91 98844 69962](tel:+919884469962) · WhatsApp: [919884469962](https://wa.me/919884469962)

---

## 1. Project Overview & Vision Statement

TRITON is an intelligent, high-endurance Autonomous Underwater Vehicle engineered for critical subsea operations. It bridges academic research and industrial marine applications, providing a robust, holonomic robotic platform for:
1. **Inspection of ships and structures** (Hull inspection, damage assessment, marine surveys)
2. **Pipeline and cable inspection** (Submerged pipeline tracking, cable diagnostics, structural integrity)
3. **Data collection and survey** (High-resolution bathymetric mapping, environmental telemetry)
4. **Collecting underwater objects** (Autonomous target detection, grasping, sample retrieval)
5. **Supporting underwater operations** (Intervention tasks, maintenance support)

> *"To develop an intelligent and reliable underwater robotic platform capable of supporting underwater exploration, inspection, surveying, and object-retrieval operations."*

---

## 2. Key Technical Specifications

| Parameter | Specification | Engineering Detail |
| :--- | :--- | :--- |
| **Propulsion System** | **8 Thrusters** | 4 Horizontal Vectored (45°) + 4 Vertical Fixed |
| **Degrees of Freedom** | **6-DOF** | Surge, Sway, Yaw (Horizontal) · Heave, Roll, Pitch (Vertical) |
| **Power Source** | **3S LiPo Battery** | 11.1V Nominal (12.6V Peak) |
| **Battery Capacity** | **22,000 mAh** | Heavy-duty copper busbar Power Distribution Board |
| **Mission Endurance** | **&gt; 20 Minutes** | Sustained operational endurance under active 6-DOF thruster load |
| **Operating Depth** | **~2 m** | Designed for shallow-water inspection, surveying, and test tank operations |
| **Vehicle Weight** | **~22 kg** | Ballasted for slight positive buoyancy for passive surface ascent |
| **Chassis Dimensions** | **482.6 × 331 × 262 mm** | Structural frame plate envelope (L × W × H) |
| **Diagonal Thruster Span** | **582.70 mm** | Outer operating envelope spanning angled corner thrusters |
| **Pressure Hull** | **Ø114.30 × 443.22 mm** | Optical acrylic cylinder, dual O-ring sealed, removable end cap |
| **Flight Controller** | **Pixhawk 2.4.8** | Running ArduSub firmware at 400 Hz EKF sensor fusion |
| **Companion Computer** | **NVIDIA Jetson Orin Nano** | 40 TOPS AI compute, Ubuntu Linux, TensorRT engine |
| **AI Vision Model** | **YOLOv11** | **Upgraded from legacy YOLOv8**; subsea gate and obstacle tracking |
| **Acoustic Array** | **3-Hydrophone Array** | 40 kHz pinger localization via Time Difference of Arrival (TDoA) |

---

## 3. Engineering Dimension Verification

- **482.60 mm:** Length of the side frame plates (CNC aluminum, 6.0 mm thickness).
- **331.02 mm:** Outer width across the chassis frame plates (inner spacing: 319.02 mm).
- **262.52 mm:** Height from lower skid rails to upper buoyancy tube mounts.
- **582.70 mm:** Total diagonal envelope across the outermost tips of the 45° angled corner thrusters.
*Note: Both dimensions are confirmed from the primary 2D CAD blueprint and represent distinct physical structural boundaries.*

---

## 4. Application Architecture & Technology Stack

The platform is designed with an offline-first architecture, functioning without internet dependencies once installed.

### Frontend (`/frontend`)
- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + custom oceanic design system
- **3D Graphics:** Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
- **Motion & UI:** Framer Motion + Lucide React + Canvas Confetti
- **CAD Visualizers:** Parametric GLB Assembly Viewer, Raw CAD Mesh Viewer, Orthographic 2D Blueprint Zoom/Pan Engine

### Backend (`/backend`)
- **Runtime:** Node.js + Express.js + TypeScript
- **Security:** Helmet, CORS, Express Session with HTTP-only cookies, Rate Limiting
- **Authentication:** Bcrypt password hashing (12 salt rounds)
- **Database:** Local atomic CSV database (`backend/data/users.csv`)
- **Protection:** OWASP formula injection sanitization on all CSV inputs

### Shared Resources (`/shared`)
- `tritonTechnicalConfig.json`: Centralized configuration maintaining single-source-of-truth technical consistency across both backend and frontend.

---

## 5. Quickstart & Installation

From the project root:

```bash
# 1. Install all dependencies across root, backend, and frontend
npm run install:all

# 2. Start both backend (port 5000) and frontend (port 5173) concurrently
npm run dev

# 3. Production Build
npm run build
```

### Direct Service URLs
- **Frontend Application:** [http://localhost:5173](http://localhost:5173)
- **Backend API & Health Check:** [http://localhost:5000/health](http://localhost:5000/health)

---

## 6. Complete Website Pages & Features

1. **Home (`/` or `#home`):** Product Hero with 3D CAD model, 360° rotation, PBR materials, full-screen, quick specifications, and CTAs.
2. **About TRITON (`#about`):** Team Triton background, team identity, engineering philosophy, and vision statement.
3. **Engineering (`#engineering`):** 
   - 8-Thruster propulsion system with interactive 6-DOF simulator (Surge, Sway, Yaw, Heave, Roll, Pitch).
   - High-current 3S LiPo power distribution bus, UBEC regulation, and kill switch.
   - Transparent optical pressure hull, Buna-N O-rings, and penetrators.
4. **Technology (`#technology`):** 5-pillar interconnected architecture matrix (Embedded, Edge AI, Vision, Sensors, Mechanical).
5. **Control & Autonomy (`#control`):** Pixhawk flight controller loop diagram and Jetson Orin Nano companion workflow diagram.
6. **Sensors & Perception (`#sensors`):** Interactive deep dive into ICM-20948 IMU, Bar30 pressure, RM3100 magnetometer, leak probes, dual cameras, and 40 kHz hydrophones.
7. **Vision & AI (`#vision-ai`):** Prominently highlights the **YOLOv11 upgrade**, CLAHE optical equalization, turbidity simulation, and real subsea gate detection demo.
8. **Mission Capabilities (`#missions`):** 5 core objectives, 3 operating modes (Inspection, Survey, Retrieval), and 6 flight capabilities.
9. **CAD & Design (`#cad-design`):** Dual-mode 3D CAD model viewer (subsystem isolation) and 2D engineering PDF viewer with dimensional ledger.
10. **Gallery (`#gallery`):** Filterable asset gallery with high-res lightbox modals, CAD renders, and subsea test images.
11. **Sponsorship (`#sponsorship`):** Corporate engagement tiers (Hardware, Financial, Tech & Computing, Fabrication, Research).
12. **Contact (`#contact`):** Lead contact card for ASHOK (+91 98844 69962), WhatsApp link, copy button, and enquiry form.
13. **Login (`#login`):** Secure authentication portal with session persistence.
14. **Registration (`#register`):** Open partner registration with instant CSV persistence and validation.
15. **User Dashboard (`#dashboard`):** Protected partner portal displaying registered user credentials, CAD vault access, and system telemetry.

---

## 7. Account Database & CSV Security

All user registrations are immediately persisted to:
```
backend/data/users.csv
```

### CSV Schema
```csv
id,name,company_name,email,password_hash,role,created_at
```

### Security Measures Implemented
- **Case-Insensitive Duplicate Blocking:** Emails are sanitized and normalized (`email.toLowerCase().trim()`).
- **Bcrypt Hashing:** Passwords hashed with 12 salt rounds; plaintext is never stored or logged.
- **Formula Injection Mitigation:** Any input beginning with `=`, `+`, `-`, `@`, `\t`, or `\r` is escaped with a single quote prefix to prevent execution in spreadsheet viewers.
- **Atomic File Operations:** CSV writes utilize temporary write buffers and atomic replacement to prevent data corruption during concurrent operations.
- **Public Protection:** `backend/data/` is strictly private and never exposed via public static routes.

---

## 8. Verified Verification Report

| Test Category | Test Case | Status | Details |
| :--- | :--- | :--- | :--- |
| **Backend API** | Health Check (`/health`) | **PASS** | Returns HTTP 200 with platform timestamp |
| **Backend API** | Technical Config (`/api/technical/config`) | **PASS** | Serves central JSON configuration accurately |
| **Authentication** | User Registration | **PASS** | Generates UUID, hashes password, saves to `users.csv` |
| **Authentication** | Duplicate Email Prevention | **PASS** | Rejects duplicate accounts with HTTP 400 |
| **Authentication** | Formula Injection Sanitization | **PASS** | Escapes dangerous spreadsheet formulas safely |
| **Authentication** | Session Persistence (`/api/auth/me`) | **PASS** | Authenticates via HTTP-only session cookie |
| **Authentication** | Protected Dashboard Route | **PASS** | Returns HTTP 200 for active session |
| **Authentication** | Session Logout | **PASS** | Invalidates session and clears cookie |
| **Authentication** | Protected Route Rejection | **PASS** | Rejects unauthenticated requests with HTTP 401 |
| **Authentication** | Valid & Invalid Login | **PASS** | Validates bcrypt hashes; rejects incorrect passwords |
| **Contact API** | Sponsorship Enquiry | **PASS** | Logs submission to `backend/data/enquiries.json` |
| **Frontend** | TypeScript Compilation (`tsc`) | **PASS** | 0 type errors across all 15 pages and components |
| **Frontend** | Vite Production Build | **PASS** | Bundles clean HTML/CSS/JS in 8.78s |
| **3D Viewer** | Parametric Assembly GLB | **PASS** | 8 thrusters, hull, frame, buoyancy tubes, sensors |
| **3D Viewer** | Raw CAD Mesh GLB | **PASS** | Converted directly from `TRITON_A_original_reconstruction.stl` |
| **AI Engine** | YOLOv11 Reference Audit | **PASS** | 0 unchecked YOLOv8 references found |

---

## 9. Contact Information

**Team Triton Robotics**  
Team Triton  
Team Triton Robotics Laboratory, Chennai, Tamil Nadu, India  

- **Point of Contact:** ASHOK  
- **Phone:** [+91 98844 69962](tel:+919884469962)  
- **WhatsApp:** [919884469962](https://wa.me/919884469962)
