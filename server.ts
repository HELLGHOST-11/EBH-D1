import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'hospital_db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Database Seed Schema
const initialDb = {
  users: [
    {
      id: 'admin-1',
      name: 'Dr. Md. Shamim Zaman',
      email: 'admin@eximbankhospital.com',
      password: 'admin123',
      role: 'admin',
      phone: '01857-903231',
      age: 52,
      gender: 'Male',
      bloodType: 'O+',
      medicalId: 'EXIM-ADM-001',
      address: '666-A/1, West Kazipara, Rokeya Sarani, Mirpur, Dhaka-1216',
      createdAt: '2026-01-10T08:00:00.000Z'
    },
    {
      id: 'patient-1',
      name: 'Sarah Jenkins',
      email: 'patient@eximbankhospital.com',
      password: 'patient123',
      role: 'patient',
      phone: '01711-234567',
      age: 34,
      gender: 'Female',
      bloodType: 'A+',
      dob: '1992-05-14',
      address: 'House 42, Road 11, Mirpur 10, Dhaka-1216',
      medicalId: 'EXIM-P-89204',
      insuranceProvider: 'EXIM Health Insurance',
      insurancePolicyNo: 'EXIM-9923841',
      emergencyContact: '01857-903231',
      createdAt: '2026-02-15T10:30:00.000Z'
    }
  ],
  departments: [
    {
      id: 'dept-1',
      name: 'Gynecology & Obstetrics',
      slug: 'gynecology-obstetrics',
      tagline: 'Affordable & Specialized Maternal, Gynecological & Delivery Care',
      description: 'Comprehensive women’s health center providing normal delivery & cesarean sections at low cost, 4D Ultrasonography by female sonologists, and advanced laparoscopic gynae surgery.',
      headDoctor: 'Prof. Dr. Nazneen Nasreen Siddiqui',
      doctorsCount: 6,
      icon: 'HeartPulse',
      image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800',
      services: [
        'Affordable Low-Cost Normal Delivery',
        'Expert Cesarean Section Procedures',
        'Female Sonologist 4D Ultrasonography',
        'Laparoscopic & Eurogenital Gynecological Surgery',
        'OPG Dental X-Ray & Cephalometry'
      ],
      roomNumbers: 'Building 1, Floor 2',
      contactPhone: '01857-903231'
    },
    {
      id: 'dept-2',
      name: 'Medicine & Respiratory Care',
      slug: 'medicine',
      tagline: 'Expert Internal Medicine, Asthma, Pain & Critical Care',
      description: 'Round-the-clock internal medicine management, respiratory care, asthma treatment, pain management, and intensive care diagnostic evaluations.',
      headDoctor: 'Prof. Dr. Md. Shamim Zaman',
      doctorsCount: 4,
      icon: 'Stethoscope',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
      services: [
        'Internal Medicine & Chronic Disease Care',
        'Asthma, Chest & Respiratory Diseases',
        'Pain Management & ICU Care',
        '24/7 OPD & Emergency Medicine Consultations'
      ],
      roomNumbers: 'Building 1, Floor 3',
      contactPhone: '01963-886798'
    },
    {
      id: 'dept-3',
      name: 'Cardiology & Heart Care',
      slug: 'cardiology',
      tagline: '24/7 Digital ECG, Echo & Color Doppler Diagnostics',
      description: 'Advanced non-invasive cardiac diagnostic center offering digital ECG, Echo, Color Doppler Echocardiography, and specialist cardiac care.',
      headDoctor: 'Prof. Dr. Md. Shahriar Khan',
      doctorsCount: 3,
      icon: 'Heart',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
      services: [
        '24-Hour Digital 12-Channel ECG',
        'Color Doppler Echocardiography',
        'Cardiovascular Health Screening',
        'Hypertension & Coronary Risk Management'
      ],
      roomNumbers: 'Building 1, Floor 3',
      contactPhone: '02-41002909'
    },
    {
      id: 'dept-4',
      name: 'Trauma & Orthopedics',
      slug: 'orthopedics',
      tagline: 'Modern C-Arm Machine Guided Complex Orthopedic Operations',
      description: 'Specialized trauma, bone fracture repair, and complex joint surgeries performed with modern intraoperative C-Arm machine guidance.',
      headDoctor: 'Prof. Dr. Faruque Ahmed',
      doctorsCount: 4,
      icon: 'Bone',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
      services: [
        'C-Arm Assisted Complex Orthopedic Surgery',
        'Emergency Trauma & Fracture Fixation',
        'Joint Repair & Arthroscopy',
        'Spine & Bone Trauma Care'
      ],
      roomNumbers: 'Building 1, Floor 4',
      contactPhone: '01857-903231'
    },
    {
      id: 'dept-5',
      name: 'Neuromedicine & Neurology',
      slug: 'neurology',
      tagline: '3000 BDT CT Scan (Brain) & 6000 BDT M.R.I Brain Care',
      description: 'Comprehensive neurological care for stroke, epilepsy, headache, and nerve disorders with affordable high-precision CT Scan (Brain) and M.R.I.',
      headDoctor: 'Prof. Dr. Faruk Hossain',
      doctorsCount: 2,
      icon: 'Brain',
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
      services: [
        'Brain CT Scan (Special Rate ৳3,000 BDT)',
        'Brain & Spine M.R.I (Special Rate ৳6,000 BDT)',
        'Stroke, Paralysis & Seizure Treatment',
        'Neuropathy & Chronic Headache Care'
      ],
      roomNumbers: 'Building 1, Floor 4',
      contactPhone: '01963-886798'
    },
    {
      id: 'dept-6',
      name: 'General & Laparoscopic Surgery',
      slug: 'surgery',
      tagline: 'Olympus (Japan) Endoscopy & Advanced Laparoscopy',
      description: 'State-of-the-art surgical department utilizing Japan Olympus Endoscopy & Colonoscopy machines and advanced laparoscopic equipment.',
      headDoctor: 'Prof. Dr. Faruque Ahmed',
      doctorsCount: 3,
      icon: 'Activity',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
      services: [
        'Advanced Laparoscopic Surgeries',
        'Olympus (Japan) Endoscopy & Colonoscopy',
        'Lower Tract Urological & Eurogenital Surgery',
        'Pediatric Surgery Procedures'
      ],
      roomNumbers: 'Building 1, Floor 5',
      contactPhone: '02-41002909'
    },
    {
      id: 'dept-7',
      name: 'Pediatrics & Child Health',
      slug: 'pediatrics',
      tagline: 'Specialized Child Care & Pediatric Surgery',
      description: 'Expert pediatricians providing newborn care, childhood infection management, growth assessment, and pediatric surgery.',
      headDoctor: 'Prof. Dr. Md. Shahriar Zaman',
      doctorsCount: 3,
      icon: 'Users',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
      services: [
        'Neonatal & Infant Health Care',
        'Pediatric Surgery Procedures',
        'Child Nutrition & Growth Monitoring',
        'Vaccination & Fever Management'
      ],
      roomNumbers: 'Building 1, Floor 2',
      contactPhone: '01857-903231'
    },
    {
      id: 'dept-8',
      name: 'ENT (Ear, Nose & Throat)',
      slug: 'ent',
      tagline: 'Advanced Ear, Nose, Throat & Head-Neck Surgery',
      description: 'Leading ENT specialists offering microscopic ear surgery, endoscopic sinus surgery, tonsillectomy, and throat care.',
      headDoctor: 'Prof. Dr. A. K. M. Saif Uddin',
      doctorsCount: 3,
      icon: 'Headphones',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
      services: [
        'Endoscopic Sinus & Nasal Surgery',
        'Microscopic Ear Surgery & Hearing Evaluation',
        'Tonsil & Adenoid Surgery',
        'Head & Neck Tumor Evaluations'
      ],
      roomNumbers: 'Building 1, Floor 3',
      contactPhone: '01963-886798'
    },
    {
      id: 'dept-9',
      name: 'Urology & Eurogenital Care',
      slug: 'urology',
      tagline: 'Advanced Laparoscopic & Lower Tract Urological Procedures',
      description: 'Specialized urological center for kidney stones, prostate care, urinary tract operations, and eurogenital surgery.',
      headDoctor: 'Dr. Md. Masud Zaman (Shovon)',
      doctorsCount: 2,
      icon: 'Shield',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
      services: [
        'Lower Tract Urological Surgery',
        'Eurogenital Laparoscopic Operations',
        'Kidney & Bladder Stone Management',
        'Prostate Health Assessment'
      ],
      roomNumbers: 'Building 1, Floor 4',
      contactPhone: '01857-903231'
    },
    {
      id: 'dept-10',
      name: 'Dermatology, Allergy & Sexology',
      slug: 'dermatology',
      tagline: 'Expert Skin, Chronic Allergy & Venereology Care',
      description: 'Comprehensive dermatological care for chronic skin diseases, severe allergies, venereology, and sexual wellness.',
      headDoctor: 'Dr. Mashi Uddin Ahmed',
      doctorsCount: 2,
      icon: 'Sparkles',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800',
      services: [
        'Chronic Allergy & Eczema Treatments',
        'Skin Disease & Infection Management',
        'Venereology & Sexual Health Consultation',
        'Cosmetic Dermatology Guidance'
      ],
      roomNumbers: 'Building 1, Floor 2',
      contactPhone: '01963-886798'
    },
    {
      id: 'dept-11',
      name: 'Dental & Maxillofacial Surgery',
      slug: 'dental',
      tagline: 'Modern Dental Care, OPG Dental X-Ray & Cephalometry',
      description: 'Advanced dental clinic equipped with OPG Dental X-Ray & Cephalometry for oral surgery, root canal, cosmetic dentistry, and orthodontic care.',
      headDoctor: 'Dr. Umme Habiba Sarkar',
      doctorsCount: 3,
      icon: 'Smile',
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
      services: [
        'OPG Dental X-Ray & Cephalometry',
        'Oral & Maxillofacial Surgery',
        'Cosmetic Dentistry & Root Canal',
        'Orthodontic & Restorative Dentistry'
      ],
      roomNumbers: 'Building 1, Ground Floor',
      contactPhone: '02-41002909'
    },
    {
      id: 'dept-12',
      name: 'Physiotherapy & Rehabilitation',
      slug: 'physiotherapy',
      tagline: 'Modern Physical Rehabilitation & Pain Recovery',
      description: 'State-of-the-art physiotherapy center offering electrotherapy, exercise therapy, post-stroke recovery, and spinal pain relief.',
      headDoctor: 'Md. Rashel Miah',
      doctorsCount: 2,
      icon: 'UserCheck',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
      services: [
        'Musculoskeletal & Joint Pain Rehabilitation',
        'Post-Stroke & Paralysis Therapy',
        'Post-Surgical Physical Rehabilitation',
        'Electrotherapy & Spinal Decompression'
      ],
      roomNumbers: 'Building 1, Ground Floor',
      contactPhone: '01857-903231'
    },
    {
      id: 'dept-13',
      name: 'Radiology, Imaging & Pathology',
      slug: 'radiology-pathology',
      tagline: '10% Discount on All Pathology Tests | 24/7 Blood Bank & Scans',
      description: '24-hour diagnostic center providing 10% discount on all pathology tests, 3000 BDT Brain CT Scan, 6000 BDT MRI, Digital X-Ray, 4D Ultrasound, and 24/7 Blood Bank.',
      headDoctor: 'Prof. Dr. Md. Shamim Zaman',
      doctorsCount: 5,
      icon: 'Scan',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
      services: [
        '10% Special Discount on All Pathology Tests',
        'CT Scan (Brain - ৳3,000 BDT)',
        'M.R.I (৳6,000 BDT)',
        '24/7 Blood Bank & Blood Transfusion',
        '4D Ultrasonography by Female Sonologist',
        'Digital X-Ray, Echo & ECG'
      ],
      roomNumbers: 'Building 1, Ground Floor & Basement',
      contactPhone: '01857-903231'
    }
  ],
  doctors: [
    {
      id: 'doc-1',
      name: 'Prof. Dr. Nazneen Nasreen Siddiqui',
      departmentId: 'dept-1',
      departmentName: 'Gynecology & Obstetrics',
      title: 'Professor & Specialist Gynecologist',
      qualification: 'MBBS, FCPS, MS (Gynae & Obs)',
      experience: '20+ Years Experience',
      rating: 4.95,
      availableDays: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      timeSlot: '10:00 AM - 02:00 PM',
      image: 'https://images.unsplash.com/photo-1594824813566-88855ce78961?auto=format&fit=crop&q=80&w=400',
      bio: 'Leading professor in gynecological oncology, high-risk pregnancy management, normal delivery, and laparoscopic surgeries.',
      consultationFee: 800
    },
    {
      id: 'doc-2',
      name: 'Dr. Selina Akhter',
      departmentId: 'dept-1',
      departmentName: 'Gynecology & Obstetrics',
      title: 'Consultant Gynecologist & Obstetrician',
      qualification: 'MBBS, DGO, MCPS',
      experience: '15+ Years Experience',
      rating: 4.9,
      availableDays: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      timeSlot: '05:00 PM - 08:30 PM',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
      bio: 'Expert in low-cost normal delivery, maternal welfare, antenatal care, and gynecological disorder management.',
      consultationFee: 600
    },
    {
      id: 'doc-3',
      name: 'Asst. Prof. Dr. Kaniz Fatima Ananya',
      departmentId: 'dept-1',
      departmentName: 'Gynecology & Obstetrics',
      title: 'Assistant Professor (Gynae)',
      qualification: 'MBBS, FCPS (Gynae & Obs)',
      experience: '12+ Years Experience',
      rating: 4.88,
      availableDays: ['Sunday', 'Tuesday', 'Thursday'],
      timeSlot: '04:00 PM - 07:00 PM',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
      bio: 'Specialist in minimally invasive gynecological surgery, infertility management, and cesarean deliveries.',
      consultationFee: 700
    },
    {
      id: 'doc-4',
      name: 'Prof. Dr. Md. Shamim Zaman',
      departmentId: 'dept-2',
      departmentName: 'Medicine & Respiratory Care',
      title: 'Professor of Medicine',
      qualification: 'MBBS, FCPS (Medicine)',
      experience: '22+ Years Experience',
      rating: 4.98,
      availableDays: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      timeSlot: '05:00 PM - 09:00 PM',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
      bio: 'Renowned professor specializing in internal medicine, hypertension, diabetes management, and complex systemic illnesses.',
      consultationFee: 1000
    },
    {
      id: 'doc-5',
      name: 'Assoc. Prof. Dr. Md. Reazuddin',
      departmentId: 'dept-2',
      departmentName: 'Medicine & Respiratory Care',
      title: 'Associate Professor (Medicine)',
      qualification: 'MBBS, MD (Medicine)',
      experience: '16+ Years Experience',
      rating: 4.9,
      availableDays: ['Monday', 'Wednesday', 'Friday'],
      timeSlot: '04:00 PM - 08:00 PM',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
      bio: 'Specialist in chronic metabolic diseases, infectious disease management, and internal medicine diagnostics.',
      consultationFee: 800
    },
    {
      id: 'doc-6',
      name: 'Prof. Dr. Md. Shahriar Khan',
      departmentId: 'dept-3',
      departmentName: 'Cardiology & Heart Care',
      title: 'Senior Professor & Cardiologist',
      qualification: 'MBBS, MD (Cardiology)',
      experience: '20+ Years Experience',
      rating: 4.96,
      availableDays: ['Saturday', 'Monday', 'Wednesday'],
      timeSlot: '05:00 PM - 08:30 PM',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400',
      bio: 'Leading cardiologist in non-invasive cardiac evaluation, Color Doppler echocardiography, and hypertension treatment.',
      consultationFee: 900
    },
    {
      id: 'doc-7',
      name: 'Dr. Md. Ashifur Rahman',
      departmentId: 'dept-3',
      departmentName: 'Cardiology & Heart Care',
      title: 'Consultant Cardiologist',
      qualification: 'MBBS, D-CARD',
      experience: '12+ Years Experience',
      rating: 4.87,
      availableDays: ['Sunday', 'Tuesday', 'Thursday'],
      timeSlot: '05:00 PM - 08:00 PM',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=500',
      bio: 'Clinical cardiology practitioner focusing on ECG diagnostics, ischemic heart disease, and preventative cardiac care.',
      consultationFee: 700
    },
    {
      id: 'doc-8',
      name: 'Prof. Dr. Md. Shahriar Zaman',
      departmentId: 'dept-7',
      departmentName: 'Pediatrics & Child Health',
      title: 'Professor & Senior Pediatrician',
      qualification: 'MBBS, DCH, FCPS (Pediatrics)',
      experience: '18+ Years Experience',
      rating: 4.92,
      availableDays: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      timeSlot: '04:30 PM - 08:00 PM',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400',
      bio: 'Distinguished pediatrician expert in infant nutrition, pediatric infections, developmental milestones, and intensive child care.',
      consultationFee: 800
    },
    {
      id: 'doc-9',
      name: 'Prof. Dr. Faruk Hossain',
      departmentId: 'dept-5',
      departmentName: 'Neuromedicine & Neurology',
      title: 'Professor of Neurology',
      qualification: 'MBBS, MD (Neurology)',
      experience: '18+ Years Experience',
      rating: 4.94,
      availableDays: ['Sunday', 'Tuesday', 'Thursday'],
      timeSlot: '05:00 PM - 08:30 PM',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400',
      bio: 'Top neurologist specializing in stroke management, epilepsy, Parkinson’s disease, migraine, and neuro-imaging diagnostics.',
      consultationFee: 900
    },
    {
      id: 'doc-10',
      name: 'Prof. Dr. Faruque Ahmed',
      departmentId: 'dept-6',
      departmentName: 'General & Laparoscopic Surgery',
      title: 'Chief Laparoscopic & General Surgeon',
      qualification: 'MBBS, FCPS (Surgery)',
      experience: '22+ Years Experience',
      rating: 4.97,
      availableDays: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      timeSlot: '05:00 PM - 08:00 PM',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
      bio: 'Master laparoscopic surgeon performing gallbladder, hernia, appendicitis, and advanced abdominal surgeries.',
      consultationFee: 900
    },
    {
      id: 'doc-11',
      name: 'Dr. Md. Abul Kalam Azad',
      departmentId: 'dept-2',
      departmentName: 'Medicine & Respiratory Care',
      title: 'Medicine, Asthma, Pain & ICU Specialist',
      qualification: 'MBBS, DTCD, MCPS, FCPS (Medicine)',
      experience: '18+ Years Experience',
      rating: 4.91,
      availableDays: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      timeSlot: '06:00 PM - 10:00 PM',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
      bio: 'Specialist in chest medicine, asthma, allergy, chronic pain management, and critical care medicine.',
      consultationFee: 800
    },
    {
      id: 'doc-12',
      name: 'Dr. Umme Habiba Sarkar',
      departmentId: 'dept-11',
      departmentName: 'Dental & Maxillofacial Surgery',
      title: 'Consultant Dental Surgeon',
      qualification: 'BDS (Dhaka Dental College), PGT, MPH',
      experience: '10+ Years Experience',
      rating: 4.89,
      availableDays: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      timeSlot: '11:00 AM - 01:00 PM & 05:00 PM - 08:30 PM',
      image: 'https://images.unsplash.com/photo-1594824813566-88855ce78961?auto=format&fit=crop&q=80&w=400',
      bio: 'Dental surgeon specializing in cosmetic restorations, root canal treatments, scaling, and preventive oral health.',
      consultationFee: 500
    },
    {
      id: 'doc-13',
      name: 'Dr. Sultan-Ul-Arefin',
      departmentId: 'dept-11',
      departmentName: 'Dental & Maxillofacial Surgery',
      title: 'Oral & Maxillofacial Specialist',
      qualification: 'BDS, MPH, PGT (Oral & Maxillofacial Surgery)',
      experience: '12+ Years Experience',
      rating: 4.9,
      availableDays: ['Sunday', 'Tuesday', 'Thursday'],
      timeSlot: '05:00 PM - 10:00 PM',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
      bio: 'Lecturer and specialist in complex oral surgery, facial trauma repair, tooth extractions, and endodontics.',
      consultationFee: 600
    },
    {
      id: 'doc-14',
      name: 'Dr. Sadia Nowrin',
      departmentId: 'dept-11',
      departmentName: 'Dental & Maxillofacial Surgery',
      title: 'Dental Specialist & Cosmetic Dentist',
      qualification: 'BDS (DU), PGT (Cosmetic Dentistry)',
      experience: '8+ Years Experience',
      rating: 4.86,
      availableDays: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      timeSlot: '02:00 PM - 05:00 PM',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
      bio: 'Dental practitioner skilled in aesthetic smile designing, conservative dentistry, and pediatric dental care.',
      consultationFee: 500
    },
    {
      id: 'doc-15',
      name: 'Md. Rashel Miah',
      departmentId: 'dept-12',
      departmentName: 'Physiotherapy & Rehabilitation',
      title: 'Senior Consultant Physiotherapist',
      qualification: 'B.Sc. in Health Technology (Physiotherapy, DU)',
      experience: '10+ Years Experience',
      rating: 4.93,
      availableDays: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      timeSlot: '04:00 PM - 08:00 PM',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
      bio: 'Physiotherapist providing manual spinal manipulation, stroke rehabilitation, electrotherapy, and sports injury recovery.',
      consultationFee: 400
    },
    {
      id: 'doc-16',
      name: 'Dr. Md. Masud Zaman (Shovon)',
      departmentId: 'dept-9',
      departmentName: 'Urology & Eurogenital Care',
      title: 'Assistant Professor & Urologist',
      qualification: 'MBBS, MS (Urology)',
      experience: '12+ Years Experience',
      rating: 4.91,
      availableDays: ['Wednesday'],
      timeSlot: '05:30 PM - 07:30 PM',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400',
      bio: 'Urologist expert in kidney stone surgery, prostate management, laparoscopic urology, and lower tract procedures.',
      consultationFee: 800
    },
    {
      id: 'doc-17',
      name: 'Prof. Dr. A. K. M. Saif Uddin',
      departmentId: 'dept-8',
      departmentName: 'ENT (Ear, Nose & Throat)',
      title: 'Professor & Head of ENT',
      qualification: 'MBBS, DLO, MS (ENT)',
      experience: '20+ Years Experience',
      rating: 4.96,
      availableDays: ['Monday', 'Friday'],
      timeSlot: '05:00 PM - 08:00 PM',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
      bio: 'Department head and senior professor skilled in endoscopic sinus surgery, ear microsurgery, and head-neck surgery.',
      consultationFee: 900
    },
    {
      id: 'doc-18',
      name: 'Assoc. Prof. Dr. S. M. Abdul Awal',
      departmentId: 'dept-8',
      departmentName: 'ENT (Ear, Nose & Throat)',
      title: 'Associate Professor & ENT Specialist',
      qualification: 'MBBS, MS (ENT)',
      experience: '15+ Years Experience',
      rating: 4.89,
      availableDays: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      timeSlot: '05:00 PM - 07:00 PM',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
      bio: 'Associate professor specializing in nasal obstruction, throat infections, hearing restoration, and sinus treatments.',
      consultationFee: 750
    },
    {
      id: 'doc-19',
      name: 'Dr. Mashi Uddin Ahmed',
      departmentId: 'dept-10',
      departmentName: 'Dermatology, Allergy & Sexology',
      title: 'Specialist Dermatologist & Venereologist',
      qualification: 'MBBS, DDV, MCPS (Dermatology)',
      experience: '14+ Years Experience',
      rating: 4.92,
      availableDays: ['Monday', 'Thursday'],
      timeSlot: '05:00 PM - 08:00 PM',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=500',
      bio: 'Consultant in clinical dermatology, chronic allergy testing, eczema, venereology, and sexual medicine.',
      consultationFee: 700
    }
  ],
  records: [
    {
      id: 'rec-101',
      patientId: 'patient-1',
      patientName: 'Sarah Jenkins',
      doctorName: 'Dr. Alexander Vance',
      departmentName: 'Cardiology & Cardiovascular Surgery',
      recordType: 'Lab Test',
      title: 'Executive Comprehensive Metabolic & Lipid Panel',
      date: '2026-07-28',
      status: 'Finalized',
      summary: 'Patient underwent routine annual lipid evaluation. Serum cholesterol and fasting glucose levels are optimal.',
      details: 'Comprehensive blood test revealed normal electrolyte levels, excellent fasting blood sugar control (92 mg/dL), and healthy HDL/LDL ratio. Heart function enzymes show no inflammation.',
      vitals: {
        bloodPressure: '118/76 mmHg',
        heartRate: 68,
        temperature: '98.4 °F',
        oxygenLevel: 99,
        glucose: 92,
        weight: '62 kg'
      },
      labResults: [
        { testName: 'Total Cholesterol', value: '172', unit: 'mg/dL', referenceRange: '125 - 200', flag: 'Normal' },
        { testName: 'HDL Cholesterol', value: '62', unit: 'mg/dL', referenceRange: '> 50', flag: 'Normal' },
        { testName: 'LDL Cholesterol', value: '94', unit: 'mg/dL', referenceRange: '< 100', flag: 'Normal' },
        { testName: 'Fasting Blood Glucose', value: '92', unit: 'mg/dL', referenceRange: '70 - 99', flag: 'Normal' },
        { testName: 'HbA1c', value: '5.2', unit: '%', referenceRange: '4.0 - 5.6', flag: 'Normal' },
        { testName: 'High Sensitivity CRP', value: '0.8', unit: 'mg/L', referenceRange: '< 1.0', flag: 'Normal' }
      ]
    },
    {
      id: 'rec-102',
      patientId: 'patient-1',
      patientName: 'Sarah Jenkins',
      doctorName: 'Dr. Maya Patel',
      departmentName: 'Diagnostic Imaging & Radiology',
      recordType: 'Diagnostic Scan',
      title: '3T Cardiac MRI & Echocardiogram Report',
      date: '2026-07-15',
      status: 'Finalized',
      summary: 'Normal left ventricular ejection fraction (LVEF 64%). No myocardial scarring or valvular regurgitation.',
      details: '3-Tesla Cardiac Magnetic Resonance Imaging demonstrates crisp anatomical visualization. Myocardial wall thickness is uniform. No pericardial effusion detected. Valvular flow velocities are within normal limits.',
      vitals: {
        bloodPressure: '120/78 mmHg',
        heartRate: 70,
        temperature: '98.6 °F',
        oxygenLevel: 98
      }
    },
    {
      id: 'rec-103',
      patientId: 'patient-1',
      patientName: 'Sarah Jenkins',
      doctorName: 'Dr. Jonathan Ross',
      departmentName: 'Executive Health & Preventive Wellness',
      recordType: 'Prescription',
      title: 'Preventive Wellness & Micronutrient Therapy Plan',
      date: '2026-06-10',
      status: 'Completed',
      summary: 'Daily micronutrient regimen prescribed following annual executive health physical.',
      details: 'Patient prescribed pharmaceutical-grade Vitamin D3 5000 IU and Omega-3 Fatty Acids (EPA/DHA 1200mg) for optimal cardiovascular and metabolic maintenance.',
      prescriptions: [
        {
          medicine: 'Vitamin D3 (Cholecalciferol)',
          dosage: '5,000 IU',
          frequency: 'Once Daily with morning meal',
          duration: '90 Days',
          instructions: 'Take with food containing healthy fats.'
        },
        {
          medicine: 'Omega-3 Ultra Concentrate',
          dosage: '1,200 mg',
          frequency: 'Twice Daily',
          duration: '90 Days',
          instructions: 'Take with morning and evening meals.'
        }
      ]
    }
  ],
  appointments: [
    {
      id: 'app-501',
      patientId: 'patient-1',
      patientName: 'Sarah Jenkins',
      patientEmail: 'patient@eximbankhospital.com',
      patientPhone: '+1 (555) 234-5678',
      doctorId: 'doc-1',
      doctorName: 'Dr. Alexander Vance',
      departmentName: 'Cardiology & Cardiovascular Surgery',
      date: '2026-08-20',
      time: '10:30 AM',
      reason: 'Semi-Annual Cardiovascular Health Consultation & Vitals Review',
      status: 'Confirmed',
      notes: 'Patient requested morning slot. Bring recent lab records.',
      createdAt: '2026-08-01T09:00:00.000Z'
    },
    {
      id: 'app-502',
      patientId: 'patient-2',
      patientName: 'Robert Sterling',
      patientEmail: 'robert.s@example.com',
      patientPhone: '+1 (555) 876-5432',
      doctorId: 'doc-3',
      doctorName: 'Dr. Marcus Thorne',
      departmentName: 'Orthopedics & Joint Reconstruction',
      date: '2026-08-22',
      time: '02:00 PM',
      reason: 'Right Knee Joint Post-Operative Motion Evaluation',
      status: 'Pending',
      notes: 'Evaluate range of motion after physical therapy.',
      createdAt: '2026-08-05T14:30:00.000Z'
    }
  ],
  contactMessages: [
    {
      id: 'msg-1',
      name: 'Claire Montgomery',
      email: 'c.montgomery@example.com',
      phone: '+1 (555) 998-1122',
      department: 'Executive Health & Preventive Wellness',
      subject: 'Inquiry regarding Executive Concierge Assessment Program',
      message: 'Hello EXIM Bank Hospital, I am interested in scheduling a full-day executive checkup for our corporate board members next month. Could you provide details on concierge accommodations and scheduling?',
      date: '2026-08-06T11:20:00.000Z',
      status: 'Unread'
    }
  ],
  stats: {
    totalPatients: 14500,
    specialistDoctors: 85,
    departmentCount: 12,
    surgeriesCompleted: 8900,
    emergencyUnits: 4,
    customerSatisfaction: 99.4
  }
};

// Helper functions for DB reading and writing
function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
      return initialDb;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading DB file:', err);
    return initialDb;
  }
}

function writeDb(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing DB file:', err);
  }
}

// Initialize DB file if not exists
readDb();

// --- REST API ENDPOINTS ---

// Auth Register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, phone, age, gender, bloodType } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  const db = readDb();
  const existing = db.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists.' });
  }

  const medicalId = `VH-${Math.floor(10000 + Math.random() * 90000)}`;
  const newUser = {
    id: `patient-${Date.now()}`,
    name,
    email,
    password,
    role: 'patient',
    phone: phone || '',
    age: age ? Number(age) : 30,
    gender: gender || 'Not Specified',
    bloodType: bloodType || 'O+',
    medicalId,
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  writeDb(db);

  const { password: _, ...userWithoutPassword } = newUser;
  return res.json({ message: 'Account created successfully', user: userWithoutPassword });
});

// Auth Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Please enter email and password.' });
  }

  const db = readDb();
  const user = db.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials. Please check your email and password.' });
  }

  const { password: _, ...userWithoutPassword } = user;
  return res.json({ message: 'Login successful', user: userWithoutPassword });
});

// Auth Me (Fetch profile)
app.get('/api/auth/me/:userId', (req, res) => {
  const { userId } = req.params;
  const db = readDb();
  const user = db.users.find((u: any) => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }
  const { password: _, ...userWithoutPassword } = user;
  return res.json({ user: userWithoutPassword });
});

// Public Departments
app.get('/api/departments', (req, res) => {
  const db = readDb();
  res.json(db.departments);
});

// Public Doctors
app.get('/api/doctors', (req, res) => {
  const db = readDb();
  res.json(db.doctors);
});

// Public Hospital Stats
app.get('/api/stats', (req, res) => {
  const db = readDb();
  res.json(db.stats);
});

// Patient Health Records
app.get('/api/patient/records/:patientId', (req, res) => {
  const { patientId } = req.params;
  const db = readDb();
  const patientRecords = db.records.filter((r: any) => r.patientId === patientId);
  res.json(patientRecords);
});

// Patient Appointments
app.get('/api/patient/appointments/:patientId', (req, res) => {
  const { patientId } = req.params;
  const db = readDb();
  const patientApps = db.appointments.filter((a: any) => a.patientId === patientId);
  res.json(patientApps);
});

// Create Appointment
app.post('/api/appointments', (req, res) => {
  const {
    patientId,
    patientName,
    patientEmail,
    patientPhone,
    doctorId,
    doctorName,
    departmentName,
    date,
    time,
    reason
  } = req.body;

  if (!patientName || !doctorName || !date || !time) {
    return res.status(400).json({ error: 'Please provide patient details, doctor, date, and time.' });
  }

  const db = readDb();
  const newAppointment = {
    id: `app-${Date.now()}`,
    patientId: patientId || 'guest',
    patientName,
    patientEmail: patientEmail || '',
    patientPhone: patientPhone || '',
    doctorId: doctorId || '',
    doctorName,
    departmentName: departmentName || 'General Medicine',
    date,
    time,
    reason: reason || 'Routine Medical Checkup',
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  db.appointments.unshift(newAppointment);
  writeDb(db);

  res.json({ message: 'Appointment request submitted successfully', appointment: newAppointment });
});

// Submit Contact Message
app.post('/api/contact', (req, res) => {
  const { name, email, phone, department, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const db = readDb();
  const newMsg = {
    id: `msg-${Date.now()}`,
    name,
    email,
    phone: phone || '',
    department: department || 'General Inquiry',
    subject: subject || 'Hospital Information Inquiry',
    message,
    date: new Date().toISOString(),
    status: 'Unread'
  };

  db.contactMessages.unshift(newMsg);
  writeDb(db);

  res.json({ message: 'Your message has been sent to our medical team.', contactMessage: newMsg });
});

// --- ADMIN BACKEND DASHBOARD ROUTES ---

// Admin Summary
app.get('/api/admin/dashboard', (req, res) => {
  const db = readDb();
  res.json({
    totalPatients: db.users.filter((u: any) => u.role === 'patient').length,
    totalRecords: db.records.length,
    totalAppointments: db.appointments.length,
    pendingAppointments: db.appointments.filter((a: any) => a.status === 'Pending').length,
    totalDoctors: db.doctors.length,
    totalDepartments: db.departments.length,
    unreadMessages: db.contactMessages.filter((m: any) => m.status === 'Unread').length
  });
});

// Admin Get Patients
app.get('/api/admin/patients', (req, res) => {
  const db = readDb();
  const patients = db.users
    .filter((u: any) => u.role === 'patient')
    .map(({ password, ...rest }: any) => rest);
  res.json(patients);
});

// Admin Create Patient Health Record
app.post('/api/admin/records', (req, res) => {
  const {
    patientId,
    patientName,
    doctorName,
    departmentName,
    recordType,
    title,
    date,
    status,
    summary,
    details,
    vitals,
    labResults,
    prescriptions
  } = req.body;

  if (!patientId || !title || !recordType) {
    return res.status(400).json({ error: 'Patient ID, record title, and type are required.' });
  }

  const db = readDb();
  const newRecord = {
    id: `rec-${Date.now()}`,
    patientId,
    patientName: patientName || 'Patient',
    doctorName: doctorName || 'Attending Physician',
    departmentName: departmentName || 'General Medicine',
    recordType,
    title,
    date: date || new Date().toISOString().split('T')[0],
    status: status || 'Finalized',
    summary: summary || '',
    details: details || '',
    vitals: vitals || undefined,
    labResults: labResults || undefined,
    prescriptions: prescriptions || undefined
  };

  db.records.unshift(newRecord);
  writeDb(db);

  res.json({ message: 'Medical record created successfully', record: newRecord });
});

// Admin Delete Record
app.delete('/api/admin/records/:id', (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.records = db.records.filter((r: any) => r.id !== id);
  writeDb(db);
  res.json({ message: 'Record deleted successfully' });
});

// Admin Update Appointment Status
app.put('/api/admin/appointments/:id', (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const db = readDb();
  const appt = db.appointments.find((a: any) => a.id === id);
  if (!appt) {
    return res.status(404).json({ error: 'Appointment not found.' });
  }
  if (status) appt.status = status;
  if (notes !== undefined) appt.notes = notes;
  writeDb(db);
  res.json({ message: 'Appointment updated successfully', appointment: appt });
});

// Admin Get All Appointments
app.get('/api/admin/appointments', (req, res) => {
  const db = readDb();
  res.json(db.appointments);
});

// Admin Get All Contact Messages
app.get('/api/admin/messages', (req, res) => {
  const db = readDb();
  res.json(db.contactMessages);
});

// Admin Update Message Status
app.put('/api/admin/messages/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const db = readDb();
  const msg = db.contactMessages.find((m: any) => m.id === id);
  if (msg) {
    msg.status = status || 'Read';
    writeDb(db);
  }
  res.json({ message: 'Message updated' });
});

// Admin Department Operations (Create/Update/Delete)
app.post('/api/admin/departments', (req, res) => {
  const db = readDb();
  const newDept = {
    id: `dept-${Date.now()}`,
    name: req.body.name || 'New Department',
    slug: (req.body.name || 'dept').toLowerCase().replace(/\s+/g, '-'),
    tagline: req.body.tagline || '',
    description: req.body.description || '',
    headDoctor: req.body.headDoctor || 'TBD',
    doctorsCount: req.body.doctorsCount || 1,
    icon: req.body.icon || 'HeartPulse',
    image: req.body.image || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    services: req.body.services || ['General Care'],
    roomNumbers: req.body.roomNumbers || 'Building A',
    contactPhone: req.body.contactPhone || '+1 (800) 555-0000'
  };
  db.departments.push(newDept);
  writeDb(db);
  res.json({ message: 'Department added', department: newDept });
});

app.delete('/api/admin/departments/:id', (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.departments = db.departments.filter((d: any) => d.id !== id);
  writeDb(db);
  res.json({ message: 'Department removed' });
});

// Admin Doctor Operations (Create/Delete)
app.post('/api/admin/doctors', (req, res) => {
  const db = readDb();
  const newDoctor = {
    id: `doc-${Date.now()}`,
    name: req.body.name,
    departmentId: req.body.departmentId || 'dept-1',
    departmentName: req.body.departmentName || 'Cardiology',
    title: req.body.title || 'Specialist Physician',
    qualification: req.body.qualification || 'MD',
    experience: req.body.experience || '10+ Years Experience',
    rating: 5.0,
    availableDays: req.body.availableDays || ['Monday', 'Wednesday'],
    timeSlot: req.body.timeSlot || '09:00 AM - 04:00 PM',
    image: req.body.image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    bio: req.body.bio || '',
    consultationFee: req.body.consultationFee || 200
  };
  db.doctors.push(newDoctor);
  writeDb(db);
  res.json({ message: 'Doctor added', doctor: newDoctor });
});

app.delete('/api/admin/doctors/:id', (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.doctors = db.doctors.filter((d: any) => d.id !== id);
  writeDb(db);
  res.json({ message: 'Doctor removed' });
});

// Start express server with Vite integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EXIM Bank Hospital Node.js Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
