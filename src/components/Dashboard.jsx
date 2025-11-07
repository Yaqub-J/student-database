import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase';
import { signOut } from 'firebase/auth';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import QRCode from 'qrcode';

const Dashboard = () => {
    const [studentName, setStudentName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('generate');

    useEffect(() => {
        if (activeTab === 'students') {
            fetchStudents();
        }
    }, [activeTab]);

    const fetchStudents = async () => {
        try {
            const q = query(collection(db, "students"), orderBy("id"));
            const querySnapshot = await getDocs(q);
            const studentList = [];

            for (const docSnap of querySnapshot.docs) {
                const data = docSnap.data();
                let downloadUrl = null;

                try {
                    const storageRef = ref(storage, data.qrCodeUrl);
                    downloadUrl = await getDownloadURL(storageRef);
                } catch (err) {
                    console.error('Error getting download URL:', err);
                }

                studentList.push({
                    id: docSnap.id,
                    ...data,
                    qrCodeDownloadUrl: downloadUrl
                });
            }

            setStudents(studentList);
        } catch (err) {
            console.error('Error fetching students:', err);
            setError('Failed to load students');
        }
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        if (!studentName || !studentId) {
            setError("Please enter student name and ID");
            setLoading(false);
            return;
        }

        try {
            const studentData = { name: studentName, id: studentId };
            const qrCodeString = JSON.stringify(studentData);
            const dataUrl = await QRCode.toDataURL(qrCodeString, {
                width: 300,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });
            setQrCodeDataUrl(dataUrl);

            // Upload QR code to Firebase Storage
            const storageRef = ref(storage, `qrcodes/${studentId}.png`);
            await uploadString(storageRef, dataUrl, 'data_url');

            // Save student data to Firestore
            await addDoc(collection(db, "students"), {
                name: studentName,
                id: studentId,
                qrCodeUrl: `qrcodes/${studentId}.png`,
                createdAt: new Date().toISOString()
            });

            setSuccess(`QR Code generated successfully for ${studentName}!`);
            setStudentName('');
            setStudentId('');

            // Refresh student list if on that tab
            if (activeTab === 'students') {
                fetchStudents();
            }

        } catch (err) {
            console.error('Error generating QR code:', err);
            setError(err.message || 'Failed to generate QR code');
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadQR = () => {
        if (qrCodeDataUrl) {
            const link = document.createElement('a');
            link.href = qrCodeDataUrl;
            link.download = `student_${studentId}_qrcode.png`;
            link.click();
        }
    };

    const handleDeleteStudent = async (studentDocId, studentIdNumber) => {
        if (window.confirm(`Are you sure you want to delete student ${studentIdNumber}?`)) {
            try {
                await deleteDoc(doc(db, "students", studentDocId));
                setSuccess(`Student ${studentIdNumber} deleted successfully`);
                fetchStudents();
            } catch (err) {
                console.error('Error deleting student:', err);
                setError('Failed to delete student');
            }
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-content">
                    <h1>Student QR Code ID Generator</h1>
                    <div className="user-info">
                        <span>{auth.currentUser?.email}</span>
                        <button onClick={handleLogout} className="btn-secondary">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="dashboard-content">
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'generate' ? 'active' : ''}`}
                        onClick={() => setActiveTab('generate')}
                    >
                        Generate QR Code
                    </button>
                    <button
                        className={`tab ${activeTab === 'students' ? 'active' : ''}`}
                        onClick={() => setActiveTab('students')}
                    >
                        View Students
                    </button>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                        <button onClick={() => setError(null)} className="close-btn">×</button>
                    </div>
                )}

                {success && (
                    <div className="success-message">
                        {success}
                        <button onClick={() => setSuccess(null)} className="close-btn">×</button>
                    </div>
                )}

                {activeTab === 'generate' && (
                    <div className="tab-content">
                        <div className="generate-section">
                            <h2>Create New Student QR Code</h2>
                            <form onSubmit={handleGenerate} className="qr-form">
                                <div className="form-group">
                                    <label htmlFor="studentName">Student Name</label>
                                    <input
                                        id="studentName"
                                        type="text"
                                        placeholder="Enter student's full name"
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="studentId">Student ID</label>
                                    <input
                                        id="studentId"
                                        type="text"
                                        placeholder="Enter unique student ID"
                                        value={studentId}
                                        onChange={(e) => setStudentId(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <button type="submit" className="btn-primary" disabled={loading}>
                                    {loading ? 'Generating...' : 'Generate & Save QR Code'}
                                </button>
                            </form>

                            {qrCodeDataUrl && (
                                <div className="qr-preview">
                                    <h3>Generated QR Code</h3>
                                    <div className="qr-code-container">
                                        <img src={qrCodeDataUrl} alt="Student QR Code" />
                                    </div>
                                    <button onClick={handleDownloadQR} className="btn-secondary">
                                        Download QR Code
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'students' && (
                    <div className="tab-content">
                        <div className="students-section">
                            <div className="section-header">
                                <h2>Student Records</h2>
                                <button onClick={fetchStudents} className="btn-secondary">
                                    Refresh
                                </button>
                            </div>

                            {students.length === 0 ? (
                                <div className="empty-state">
                                    <p>No students found. Generate your first QR code to get started!</p>
                                </div>
                            ) : (
                                <div className="students-grid">
                                    {students.map((student) => (
                                        <div key={student.id} className="student-card">
                                            <div className="student-info">
                                                <h3>{student.name}</h3>
                                                <p className="student-id">ID: {student.id}</p>
                                            </div>
                                            {student.qrCodeDownloadUrl && (
                                                <div className="qr-code-small">
                                                    <img src={student.qrCodeDownloadUrl} alt={`QR code for ${student.name}`} />
                                                </div>
                                            )}
                                            <div className="student-actions">
                                                {student.qrCodeDownloadUrl && (
                                                    <a
                                                        href={student.qrCodeDownloadUrl}
                                                        download={`${student.id}_qrcode.png`}
                                                        className="btn-small"
                                                    >
                                                        Download
                                                    </a>
                                                )}
                                                <button
                                                    onClick={() => handleDeleteStudent(student.id, student.id)}
                                                    className="btn-small btn-danger"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;