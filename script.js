// ============================================================ */
// ===== TOAST NOTIFICATION ===== */
// ============================================================ */
let toastTimeout;

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toastIcon');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast) return;
    
    if (toastTimeout) clearTimeout(toastTimeout);
    
    toastIcon.className = type === 'success' ? 'fas fa-check-circle' : 
                        type === 'error' ? 'fas fa-exclamation-circle' : 
                        'fas fa-info-circle';
    
    toastMessage.textContent = message;
    toast.className = 'toast ' + type;
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// ============================================================ */
// ===== LOGIN DROPDOWN ===== */
// ============================================================ */
function initLoginDropdown() {
    const dropdownBtn = document.getElementById('loginDropdownBtn');
    const dropdown = document.getElementById('loginDropdown');
    
    if (!dropdownBtn || !dropdown) return;
    
    dropdownBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });
    
    document.addEventListener('click', function(e) {
        if (!dropdownBtn.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            dropdown.classList.remove('show');
        }
    });
}

// ============================================================ */
// ===== LOGOUT FUNCTION ===== */
// ============================================================ */
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('qskillAdminLoggedIn');
        localStorage.removeItem('qskillStudentLoggedIn');
        localStorage.removeItem('qskillInstructorLoggedIn');
        localStorage.removeItem('qskillUser');
        localStorage.removeItem('qskillStudentId');
        sessionStorage.clear();
        window.location.href = 'login.html';
    }
}

// ============================================================ */
// ===== SESSION CHECK ===== */
// ============================================================ */
function checkSession() {
    const adminLoggedIn = localStorage.getItem('qskillAdminLoggedIn');
    const studentLoggedIn = localStorage.getItem('qskillStudentLoggedIn');
    const instructorLoggedIn = localStorage.getItem('qskillInstructorLoggedIn');
    const currentPage = window.location.pathname.split('/').pop();
    
    const protectedPages = ['dashboard.html', 'admin.html', 'instructor-dashboard.html', 
                           'all-courses.html', 'my-courses.html'];
    
    if (protectedPages.includes(currentPage)) {
        if (currentPage === 'admin.html' && !adminLoggedIn) {
            window.location.href = 'login.html';
            return false;
        } else if (currentPage === 'dashboard.html' && !studentLoggedIn) {
            window.location.href = 'login.html';
            return false;
        } else if (currentPage === 'my-courses.html' && !studentLoggedIn) {
            window.location.href = 'login.html';
            return false;
        } else if (currentPage === 'all-courses.html' && !studentLoggedIn) {
            window.location.href = 'login.html';
            return false;
        } else if (currentPage === 'instructor-dashboard.html' && !instructorLoggedIn) {
            window.location.href = 'login.html';
            return false;
        }
    }
    
    if (currentPage === 'login.html') {
        if (adminLoggedIn) {
            window.location.href = 'admin.html';
            return false;
        } else if (studentLoggedIn) {
            window.location.href = 'dashboard.html';
            return false;
        } else if (instructorLoggedIn) {
            window.location.href = 'instructor-dashboard.html';
            return false;
        }
    }
    
    return true;
}

// ============================================================ */
// ===== SESSION TIMEOUT ===== */
// ============================================================ */
let sessionTimeout;
const SESSION_TIMEOUT = 30 * 60 * 1000;

function resetSessionTimer() {
    if (sessionTimeout) clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(function() {
        const studentLoggedIn = localStorage.getItem('qskillStudentLoggedIn');
        const instructorLoggedIn = localStorage.getItem('qskillInstructorLoggedIn');
        const adminLoggedIn = localStorage.getItem('qskillAdminLoggedIn');
        if (studentLoggedIn || instructorLoggedIn || adminLoggedIn) {
            showToast('Session expired. Please login again.', 'error');
            setTimeout(logout, 2000);
        }
    }, SESSION_TIMEOUT);
}

// ============================================================ */
// ===== TOGGLE PASSWORD VISIBILITY ===== */
// ============================================================ */
function initTogglePassword() {
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.closest('.input-wrapper').querySelector('input');
            const icon = this.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fas fa-eye-slash';
            } else {
                input.type = 'password';
                icon.className = 'fas fa-eye';
            }
        });
    });
}

// ============================================================ */
// ===== FORM VALIDATION HELPERS ===== */
// ============================================================ */
function validateEmail(email) {
    return email !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePassword(password) {
    return password.length >= 6;
}
function validateStudentId(id) {
    return id !== '' && id.length >= 6;
}
function generateStudentId() {
    const year = new Date().getFullYear().toString().slice(-2);
    const random = Math.floor(10000 + Math.random() * 90000).toString();
    return 'QSK' + year + random;
}

// ============================================================ */
// ===== FAQ TOGGLES ===== */
// ============================================================ */
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');
    if (answer && answer.classList.contains('faq-answer')) {
        if (answer.classList.contains('open')) {
            answer.classList.remove('open');
            icon.className = 'fas fa-plus';
        } else {
            answer.classList.add('open');
            icon.className = 'fas fa-minus';
        }
    }
}
function toggleDemoFAQ(element) {
    const icon = element.querySelector('i');
    if (icon) {
        if (icon.classList.contains('fa-plus')) {
            icon.className = 'fas fa-minus';
        } else {
            icon.className = 'fas fa-plus';
        }
    }
}

// ============================================================ */
// ===== MODAL FUNCTIONS ===== */
// ============================================================ */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================================ */
// ===== ENROLL NOW - DIRECT TO ENROLL PAGE ===== */
// ============================================================ */
function goToEnroll() {
    const courseId = getCourseIdFromUrl();
    // Always go directly to enroll page without login check
    window.location.href = 'enroll.html?course=' + courseId;
}

function getCourseIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('course') || 'manual';
}

// ============================================================ */
// ===== EMAILJS CONFIGURATION (safe fallback) ===== */
// ============================================================ */
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_EMAILJS_PUBLIC_KEY',
    SERVICE_ID: 'YOUR_EMAILJS_SERVICE_ID',
    TEMPLATES: {
        STUDENT_WELCOME: 'YOUR_STUDENT_TEMPLATE_ID',
        ADMIN_NOTIFICATION: 'YOUR_ADMIN_TEMPLATE_ID',
        PASSWORD_RESET: 'YOUR_PASSWORD_RESET_TEMPLATE_ID',
        OTP_VERIFICATION: 'YOUR_OTP_TEMPLATE_ID'
    }
};
const ADMIN_EMAIL = 'admin@qskillcareersolutions.com';

let emailjsReady = false;
function initEmailService() {
    try {
        if (typeof emailjs !== 'undefined' && 
            EMAILJS_CONFIG.PUBLIC_KEY && 
            EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
            emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
            emailjsReady = true;
            console.log('✅ EmailJS initialized with real key.');
        } else {
            console.log('ℹ️ EmailJS not configured — running in DEMO mode.');
        }
    } catch (e) {
        console.warn('⚠️ EmailJS init failed:', e);
        console.log('ℹ️ Falling back to DEMO mode.');
    }
    return emailjsReady;
}

// ============================================================ */
// ===== GENERATE PASSWORD & STUDENT ID ===== */
// ============================================================ */
function generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

function generateStudentId() {
    const year = new Date().getFullYear().toString().slice(-2);
    const random = Math.floor(10000 + Math.random() * 90000).toString();
    return 'QSK' + year + random;
}

// ============================================================ */
// ===== SEND WELCOME EMAIL ===== */
// ============================================================ */
function sendWelcomeEmail(studentData) {
    console.log('📧 ==========================================');
    console.log('📧 WELCOME EMAIL SENT TO: ' + studentData.email);
    console.log('📧 ==========================================');
    console.log('📧 Subject: Welcome to QSkill Career Solutions!');
    console.log('📧');
    console.log('📧 Dear ' + studentData.name + ',');
    console.log('📧');
    console.log('📧 Thank you for enrolling in the "' + studentData.course + '" course!');
    console.log('📧');
    console.log('📧 Your account has been created successfully:');
    console.log('📧');
    console.log('📧   🆔 Student ID: ' + studentData.studentId);
    console.log('📧   🔑 Password:   ' + studentData.password);
    console.log('📧');
    console.log('📧 You can login at: ' + window.location.origin + '/login.html');
    console.log('📧');
    console.log('📧 ⚠️ Please keep your credentials safe. You can change your password');
    console.log('📧    after logging in from your dashboard.');
    console.log('📧');
    console.log('📧 If you have any questions, contact us at support@qskill.com');
    console.log('📧');
    console.log('📧 Best regards,');
    console.log('📧 QSkill Career Solutions Team');
    console.log('📧 ==========================================');
    
    // Show toast notification
    showToast('📧 Welcome email sent to ' + studentData.email, 'success');
}

// ============================================================ */
// ===== LOGIN PAGE SPECIFIC FUNCTIONS ===== */
// ============================================================ */
function initLoginPage() {
    // Only run on login page
    if (!document.getElementById('loginForm')) return;

    console.log('🔐 Initializing login page...');

    // DOM refs
    const studentTab = document.getElementById('studentTab');
    const instructorTab = document.getElementById('instructorTab');
    const roleSubtitle = document.getElementById('roleSubtitle');
    const emailField = document.getElementById('emailField');
    const studentIdField = document.getElementById('studentIdField');
    const passwordField = document.getElementById('passwordField');
    const emailInput = document.getElementById('emailInput');
    const studentIdInput = document.getElementById('studentIdInput');
    const passwordInput = document.getElementById('passwordInput');
    const emailWrapper = document.getElementById('emailWrapper');
    const studentIdWrapper = document.getElementById('studentIdWrapper');
    const passwordWrapper = document.getElementById('passwordWrapper');
    const emailError = document.getElementById('emailError');
    const studentIdError = document.getElementById('studentIdError');
    const passwordError = document.getElementById('passwordError');
    const togglePassword = document.getElementById('togglePassword');
    const loginForm = document.getElementById('loginForm');
    const loginSubmitBtn = document.getElementById('loginSubmitBtn');
    const forgotLink = document.getElementById('forgotLink');
    const forgotModalOverlay = document.getElementById('forgotModalOverlay');
    const forgotModalClose = document.getElementById('forgotModalClose');
    const forgotCancel = document.getElementById('forgotCancel');
    const forgotSend = document.getElementById('forgotSend');
    const forgotInput = document.getElementById('forgotInput');
    const forgotWrapper = document.getElementById('forgotWrapper');
    const forgotError = document.getElementById('forgotError');
    const forgotErrorText = document.getElementById('forgotErrorText');
    const forgotLabel = document.getElementById('forgotLabel');
    const forgotModalDesc = document.getElementById('forgotModalDesc');

    // Databases
    let studentDatabase = JSON.parse(localStorage.getItem('qskillStudents')) || {};
    const instructorDatabase = {
        'instructor@qskill.com': { password: 'instructor123', name: 'Demo Instructor', role: 'instructor' },
        'admin@qskill.com': { password: 'admin123', name: 'Super Admin', role: 'admin' }
    };

    // Always ensure default students exist
    const defaultStudents = {
        'QSK24012345': {
            email: 'student@qskill.com',
            phone: '9876543210',
            password: 'a1b2c3d4e5f67890',
            name: 'Demo Student'
        },
        'QSK24067890': {
            email: 'demo@qskill.com',
            phone: '9876543211',
            password: 'f9e8d7c6b5a43210',
            name: 'Demo User'
        }
    };

    let needsUpdate = false;
    for (var key in defaultStudents) {
        if (!studentDatabase[key]) {
            studentDatabase[key] = defaultStudents[key];
            needsUpdate = true;
        }
    }
    if (needsUpdate) {
        localStorage.setItem('qskillStudents', JSON.stringify(studentDatabase));
    }

    let currentRole = 'student';
    let forgotResetting = false;

    function validateEmailField() {
        if (!emailInput || !emailWrapper || !emailError) return false;
        const val = emailInput.value.trim();
        const ok = val !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        if (val === '') { emailWrapper.classList.remove('success','error'); emailError.classList.remove('show'); return false; }
        if (ok) { emailWrapper.classList.remove('error'); emailWrapper.classList.add('success'); emailError.classList.remove('show'); return true; }
        else { emailWrapper.classList.remove('success'); emailWrapper.classList.add('error'); emailError.classList.add('show'); return false; }
    }

    function validateStudentIdField() {
        if (!studentIdInput || !studentIdWrapper || !studentIdError) return false;
        const val = studentIdInput.value.trim();
        const ok = val !== '' && val.length >= 6;
        if (val === '') { studentIdWrapper.classList.remove('success','error'); studentIdError.classList.remove('show'); return false; }
        if (ok) { studentIdWrapper.classList.remove('error'); studentIdWrapper.classList.add('success'); studentIdError.classList.remove('show'); return true; }
        else { studentIdWrapper.classList.remove('success'); studentIdWrapper.classList.add('error'); studentIdError.classList.add('show'); return false; }
    }

    function validatePasswordField() {
        if (!passwordInput || !passwordWrapper || !passwordError) return false;
        const val = passwordInput.value;
        const ok = val.length >= 6;
        if (val === '') { passwordWrapper.classList.remove('success','error'); passwordError.classList.remove('show'); return false; }
        if (ok) { passwordWrapper.classList.remove('error'); passwordWrapper.classList.add('success'); passwordError.classList.remove('show'); return true; }
        else { passwordWrapper.classList.remove('success'); passwordWrapper.classList.add('error'); passwordError.classList.add('show'); return false; }
    }

    function resetForm() {
        [emailWrapper, studentIdWrapper, passwordWrapper].forEach(w => { if (w) w.classList.remove('error','success'); });
        [emailError, studentIdError, passwordError].forEach(e => { if (e) e.classList.remove('show'); });
    }

    // Role switching
    function switchToStudent() {
        if (!studentTab || !instructorTab) return;
        studentTab.classList.add('active');
        instructorTab.classList.remove('active');
        currentRole = 'student';
        if (studentIdField) { studentIdField.classList.remove('hide'); studentIdField.style.display = 'block'; }
        if (emailField) { emailField.classList.remove('show'); emailField.style.display = 'none'; }
        if (passwordField) { passwordField.classList.remove('hide'); passwordField.style.display = 'block'; }
        if (roleSubtitle) roleSubtitle.textContent = 'Welcome back! Please enter your Student ID to continue.';
        if (studentIdInput) studentIdInput.placeholder = 'Enter your Student ID';
        if (passwordInput) passwordInput.placeholder = 'Enter your password';
        if (forgotLabel) forgotLabel.textContent = 'Student ID';
        if (forgotInput) forgotInput.placeholder = 'Enter your Student ID';
        if (forgotModalDesc) forgotModalDesc.textContent = 'Enter your Student ID to receive a password reset link.';
        resetForm();
    }

    function switchToInstructor() {
        if (!studentTab || !instructorTab) return;
        instructorTab.classList.add('active');
        studentTab.classList.remove('active');
        currentRole = 'instructor';
        if (studentIdField) { studentIdField.classList.add('hide'); studentIdField.style.display = 'none'; }
        if (emailField) { emailField.classList.add('show'); emailField.style.display = 'block'; }
        if (passwordField) { passwordField.classList.remove('hide'); passwordField.style.display = 'block'; }
        if (roleSubtitle) roleSubtitle.textContent = 'Please enter your email and password to continue.';
        if (emailInput) emailInput.placeholder = 'Enter your email address';
        if (passwordInput) passwordInput.placeholder = 'Enter your password';
        if (forgotLabel) forgotLabel.textContent = 'Email Address';
        if (forgotInput) forgotInput.placeholder = 'Enter your email address';
        if (forgotModalDesc) forgotModalDesc.textContent = 'Enter your email address to receive a password reset link.';
        resetForm();
    }

    // Tab event listeners
    if (studentTab) {
        studentTab.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentRole !== 'student') switchToStudent();
        });
    }
    if (instructorTab) {
        instructorTab.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentRole !== 'instructor') switchToInstructor();
        });
    }

    // Initial role from URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('role') === 'instructor') switchToInstructor(); else switchToStudent();

    // Toggle password
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const isPass = passwordInput.type === 'password';
            passwordInput.type = isPass ? 'text' : 'password';
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Login handlers
    function handleStudentLogin() {
        if (!studentIdInput || !passwordInput) return;
        const sid = studentIdInput.value.trim().toUpperCase();
        const pass = passwordInput.value;
        if (!validateStudentIdField()) { showToast('Please enter a valid Student ID', 'error'); return; }
        if (!validatePasswordField()) { showToast('Please enter your password', 'error'); return; }
        
        const currentDb = JSON.parse(localStorage.getItem('qskillStudents')) || {};
        const student = currentDb[sid];
        
        if (!student) {
            if (studentIdWrapper) studentIdWrapper.classList.add('error');
            if (studentIdError) studentIdError.classList.add('show');
            showToast('Student ID not found. Please check your ID.', 'error');
            return;
        }
        if (student.password !== pass) {
            if (passwordWrapper) passwordWrapper.classList.add('error');
            if (passwordError) passwordError.classList.add('show');
            showToast('Incorrect password. Please try again.', 'error');
            return;
        }
        
        // Check for redirect parameter
        const redirect = urlParams.get('redirect');
        const course = urlParams.get('course');
        
        localStorage.setItem('qskillStudentLoggedIn', 'true');
        localStorage.setItem('qskillStudentId', sid);
        localStorage.setItem('qskillUser', JSON.stringify({ id: sid, email: student.email, phone: student.phone || '', name: student.name || 'Student', role: 'student' }));
        
        showToast(`✅ Welcome back, ${sid}!`, 'success');
        if (loginSubmitBtn) { loginSubmitBtn.classList.add('loading'); loginSubmitBtn.disabled = true; }
        
        setTimeout(() => {
            if (loginSubmitBtn) { loginSubmitBtn.classList.remove('loading'); loginSubmitBtn.disabled = false; }
            if (redirect === 'course' && course) {
                window.location.href = 'enroll.html?course=' + course;
            } else {
                window.location.href = 'dashboard.html';
            }
        }, 1500);
    }

    function handleInstructorLogin() {
        if (!emailInput || !passwordInput) return;
        const email = emailInput.value.trim();
        const pass = passwordInput.value;
        if (!validateEmailField()) { showToast('Please enter a valid email', 'error'); return; }
        if (!validatePasswordField()) { showToast('Please enter your password', 'error'); return; }
        const user = instructorDatabase[email];
        if (!user) {
            if (emailWrapper) emailWrapper.classList.add('error');
            if (emailError) emailError.classList.add('show');
            showToast('❌ User not found. Please check your email.', 'error');
            return;
        }
        if (user.password !== pass) {
            if (passwordWrapper) passwordWrapper.classList.add('error');
            if (passwordError) passwordError.classList.add('show');
            showToast('❌ Incorrect password. Please try again.', 'error');
            return;
        }
        
        if (user.role === 'instructor') {
            localStorage.setItem('qskillInstructorLoggedIn', 'true');
        } else if (user.role === 'admin') {
            localStorage.setItem('qskillAdminLoggedIn', 'true');
        }
        
        localStorage.setItem('qskillUser', JSON.stringify({ email, name: user.name, role: user.role }));
        showToast(`✅ Welcome back, ${user.role === 'admin' ? 'Admin' : 'Instructor'}!`, 'success');
        if (loginSubmitBtn) { loginSubmitBtn.classList.add('loading'); loginSubmitBtn.disabled = true; }
        
        setTimeout(() => {
            if (loginSubmitBtn) { loginSubmitBtn.classList.remove('loading'); loginSubmitBtn.disabled = false; }
            window.location.href = user.role === 'admin' ? 'admin.html' : 'instructor-dashboard.html';
        }, 1500);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (currentRole === 'student') handleStudentLogin();
            else handleInstructorLogin();
        });
    }

    // Forgot Password Modal
    function openForgotModal() {
        if (!forgotInput || !forgotWrapper || !forgotError || !forgotSend) return;
        forgotInput.value = '';
        forgotWrapper.classList.remove('error','success');
        forgotError.classList.remove('show');
        forgotSend.classList.remove('loading');
        forgotSend.disabled = false;
        if (forgotSend.querySelector('.btn-text-modal')) forgotSend.querySelector('.btn-text-modal').textContent = 'Send Reset Link';
        if (currentRole === 'student') {
            if (forgotLabel) forgotLabel.textContent = 'Student ID';
            if (forgotInput) forgotInput.placeholder = 'Enter your Student ID';
            if (forgotModalDesc) forgotModalDesc.textContent = 'Enter your Student ID to receive a password reset link.';
        } else {
            if (forgotLabel) forgotLabel.textContent = 'Email Address';
            if (forgotInput) forgotInput.placeholder = 'Enter your email address';
            if (forgotModalDesc) forgotModalDesc.textContent = 'Enter your email address to receive a password reset link.';
        }
        if (forgotModalOverlay) forgotModalOverlay.classList.add('show');
        setTimeout(() => { if (forgotInput) forgotInput.focus(); }, 200);
    }

    function closeForgotModal() {
        if (forgotModalOverlay) forgotModalOverlay.classList.remove('show');
        if (forgotSend) {
            forgotSend.classList.remove('loading');
            forgotSend.disabled = false;
            if (forgotSend.querySelector('.btn-text-modal')) forgotSend.querySelector('.btn-text-modal').textContent = 'Send Reset Link';
        }
        forgotResetting = false;
    }

    if (forgotLink) {
        forgotLink.addEventListener('click', function(e) {
            e.preventDefault();
            openForgotModal();
        });
    }
    if (forgotModalClose) forgotModalClose.addEventListener('click', closeForgotModal);
    if (forgotCancel) forgotCancel.addEventListener('click', closeForgotModal);
    if (forgotModalOverlay) {
        forgotModalOverlay.addEventListener('click', function(e) {
            if (e.target === this) closeForgotModal();
        });
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && forgotModalOverlay && forgotModalOverlay.classList.contains('show')) {
            closeForgotModal();
        }
    });

    // Forgot Send
    if (forgotSend) {
        forgotSend.addEventListener('click', async function(e) {
            e.preventDefault();
            if (forgotResetting) return;
            if (!forgotInput || !forgotWrapper || !forgotError || !forgotErrorText) return;

            const val = forgotInput.value.trim();
            if (!val) {
                forgotWrapper.classList.add('error');
                forgotError.classList.add('show');
                forgotErrorText.textContent = 'Please enter your ' + (currentRole === 'student' ? 'Student ID' : 'email address');
                return;
            }
            if (currentRole === 'instructor') {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
                    forgotWrapper.classList.add('error');
                    forgotError.classList.add('show');
                    forgotErrorText.textContent = 'Please enter a valid email address';
                    return;
                }
            } else {
                const upperVal = val.toUpperCase();
                forgotInput.value = upperVal;
                if (upperVal.length < 6) {
                    forgotWrapper.classList.add('error');
                    forgotError.classList.add('show');
                    forgotErrorText.textContent = 'Student ID must be at least 6 characters';
                    return;
                }
            }

            forgotWrapper.classList.remove('error','success');
            forgotError.classList.remove('show');

            let found = false, userEmail = '', userName = '';
            if (currentRole === 'student') {
                const db = JSON.parse(localStorage.getItem('qskillStudents')) || {};
                const s = db[val.toUpperCase()];
                if (s) { found = true; userEmail = s.email; userName = s.name || 'Student'; }
            } else {
                const u = instructorDatabase[val];
                if (u) { found = true; userEmail = val; userName = u.name || 'Instructor'; }
            }
            if (!found) {
                forgotWrapper.classList.add('error');
                forgotError.classList.add('show');
                forgotErrorText.textContent = currentRole === 'student' ? 'Student ID not found.' : 'Email not found.';
                return;
            }

            forgotResetting = true;
            forgotSend.classList.add('loading');
            forgotSend.disabled = true;
            if (forgotSend.querySelector('.btn-text-modal')) forgotSend.querySelector('.btn-text-modal').textContent = 'Sending...';

            const resetToken = generateResetToken();
            const resetLink = window.location.origin + '/reset-password.html?token=' + resetToken + '&role=' + currentRole + '&id=' + encodeURIComponent(val);
            const resetData = { token: resetToken, id: val, role: currentRole, email: userEmail, createdAt: Date.now() };
            localStorage.setItem('qskillReset_' + resetToken, JSON.stringify(resetData));

            const result = await sendPasswordResetEmail(userEmail, resetLink);

            forgotSend.classList.remove('loading');
            forgotSend.disabled = false;
            if (forgotSend.querySelector('.btn-text-modal')) forgotSend.querySelector('.btn-text-modal').textContent = 'Send Reset Link';
            forgotResetting = false;

            if (result.success) {
                forgotWrapper.classList.remove('error');
                forgotWrapper.classList.add('success');
                const demoMsg = result.demo ? ' [DEMO]' : '';
                showToast(`📧 Reset link sent to ${userEmail}${demoMsg}`, 'success');
                setTimeout(closeForgotModal, 1500);
            } else {
                forgotWrapper.classList.add('error');
                forgotError.classList.add('show');
                forgotErrorText.textContent = 'Failed to send email. Please try again.';
                showToast('❌ Failed to send reset email. Please try again.', 'error');
            }
        });
    }

    function generateResetToken() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for (let i = 0; i < 32; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return token;
    }

    console.log('✅ Login page initialised successfully!');
    console.log('📝 Student IDs: QSK24012345, QSK24067890');
    console.log('👨‍🏫 Instructor: instructor@qskill.com | Password: instructor123');
    console.log('👨‍💼 Admin: admin@qskill.com | Password: admin123');
}

// ============================================================ */
// ===== INITIALIZE ON PAGE LOAD ===== */
// ============================================================ */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Document loaded, initializing...');
    
    initLoginDropdown();
    initTogglePassword();
    initEmailService();

    const sessionValid = checkSession();
    if (sessionValid) {
        const studentLoggedIn = localStorage.getItem('qskillStudentLoggedIn');
        const instructorLoggedIn = localStorage.getItem('qskillInstructorLoggedIn');
        const adminLoggedIn = localStorage.getItem('qskillAdminLoggedIn');
        if (studentLoggedIn || instructorLoggedIn || adminLoggedIn) {
            resetSessionTimer();
            document.addEventListener('click', resetSessionTimer);
            document.addEventListener('keydown', resetSessionTimer);
            document.addEventListener('scroll', resetSessionTimer);
            document.addEventListener('mousemove', resetSessionTimer);
        }
    }

    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Initialize login page
    initLoginPage();
});

console.log('🔐 QSkill Scripts Loaded');