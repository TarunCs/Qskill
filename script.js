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
        // Clear ALL session data
        localStorage.removeItem('qskillAdminLoggedIn');
        localStorage.removeItem('qskillStudentLoggedIn');
        localStorage.removeItem('qskillInstructorLoggedIn');
        localStorage.removeItem('qskillUser');
        localStorage.removeItem('qskillStudentId');
        
        // Clear session storage
        sessionStorage.clear();
        
        // Redirect to login page
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
    
    // Protected pages that require login
    const protectedPages = ['dashboard.html', 'admin.html', 'instructor-dashboard.html'];
    
    // If on a protected page and not logged in, redirect to login
    if (protectedPages.includes(currentPage)) {
        if (currentPage === 'admin.html' && !adminLoggedIn) {
            window.location.href = 'login.html';
        } else if (currentPage === 'dashboard.html' && !studentLoggedIn) {
            window.location.href = 'login.html';
        } else if (currentPage === 'instructor-dashboard.html' && !instructorLoggedIn) {
            window.location.href = 'login.html';
        }
    }
    
    // If on login page and already logged in, redirect to appropriate dashboard
    if (currentPage === 'login.html') {
        if (adminLoggedIn) {
            window.location.href = 'admin.html';
        } else if (studentLoggedIn) {
            window.location.href = 'dashboard.html';
        } else if (instructorLoggedIn) {
            window.location.href = 'instructor-dashboard.html';
        }
    }
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

// ============================================================ */
// ===== GENERATE STUDENT ID ===== */
// ============================================================ */
function generateStudentId() {
    const year = new Date().getFullYear().toString().slice(-2);
    const random = Math.floor(10000 + Math.random() * 90000).toString();
    return 'QSK' + year + random;
}

// ============================================================ */
// ===== FAQ TOGGLE ===== */
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

// ============================================================ */
// ===== DEMO FAQ TOGGLE ===== */
// ============================================================ */
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
// ===== INITIALIZE ON PAGE LOAD ===== */
// ============================================================ */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize login dropdown
    initLoginDropdown();
    
    // Initialize toggle password
    initTogglePassword();
    
    // Check session
    checkSession();
    
    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});

// ============================================================ */
// ===== ADMIN DATA FUNCTIONS ===== */
// ============================================================ */
function getAdminData() {
    return JSON.parse(localStorage.getItem('qskillAdminData')) || {
        students: {},
        instructors: {},
        courses: [],
        enrollments: []
    };
}

function saveAdminData(data) {
    localStorage.setItem('qskillAdminData', JSON.stringify(data));
}

// ============================================================ */
// ===== STUDENT DATABASE FUNCTIONS ===== */
// ============================================================ */
function getStudentDatabase() {
    return JSON.parse(localStorage.getItem('qskillStudents')) || {};
}

function saveStudentDatabase(data) {
    localStorage.setItem('qskillStudents', JSON.stringify(data));
}

// ============================================================ */
// ===== INSTRUCTOR DATABASE ===== */
// ============================================================ */
const instructorDatabase = {
    'instructor@qskill.com': {
        password: 'instructor123',
        name: 'Demo Instructor',
        role: 'instructor',
        joinedAt: new Date().toISOString()
    },
    'admin@qskill.com': {
        password: 'admin123',
        name: 'Super Admin',
        role: 'admin',
        joinedAt: new Date().toISOString()
    }
};

// ============================================================ */
// ===== BOOKING MODAL (Calendar) ===== */
// ============================================================ */
const MAX_PARTICIPANTS = 7;
const SLOTS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
const MAX_MONTHS_FUTURE = 3;

let modalCurrentDate = new Date();
let modalSelectedDate = null;
let modalSelectedTimeSlot = null;
let modalBookedSlots = {};

function generateModalBookings() {
    const today = new Date();
    const bookings = {};
    
    for (let d = 0; d < 90; d++) {
        const date = new Date(today);
        date.setDate(today.getDate() + d);
        const dateKey = date.toDateString();
        
        if (date.getDay() === 0) continue;
        
        bookings[dateKey] = SLOTS.map(time => ({
            time: time,
            booked: Math.random() > 0.55
        }));
    }
    
    return bookings;
}

function initBookingModal() {
    modalBookedSlots = generateModalBookings();
    
    const modal = document.getElementById('bookingModal');
    const openBtn = document.getElementById('openScheduleBtn2');
    const closeBtn = document.getElementById('closeModalBtn');
    
    if (!modal || !openBtn || !closeBtn) return;
    
    openBtn.addEventListener('click', function() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        modalCurrentDate = new Date();
        renderModalCalendar();
    });
    
    closeBtn.addEventListener('click', function() {
        closeBookingModal();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeBookingModal();
        }
    });
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalSelectedDate = null;
        modalSelectedTimeSlot = null;
        const bookBtn = document.getElementById('modalBookBtn');
        if (bookBtn) bookBtn.disabled = true;
    }
}

function renderModalCalendar() {
    const modalGrid = document.getElementById('modalCalendarGrid');
    const modalMonthYear = document.getElementById('modalMonthYear');
    const modalNextMonth = document.getElementById('modalNextMonth');
    
    if (!modalGrid || !modalMonthYear || !modalNextMonth) return;
    
    const year = modalCurrentDate.getFullYear();
    const month = modalCurrentDate.getMonth();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const maxDate = new Date(today);
    maxDate.setMonth(today.getMonth() + MAX_MONTHS_FUTURE);
    
    if (new Date(year, month, 1) > maxDate) {
        modalCurrentDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
        renderModalCalendar();
        return;
    }
    
    modalMonthYear.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
    
    const nextMonthDate = new Date(year, month + 1, 1);
    modalNextMonth.style.display = nextMonthDate > maxDate ? 'none' : 'flex';
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    modalGrid.innerHTML = '';
    
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
        const div = document.createElement('div');
        div.className = 'day-header';
        div.textContent = day;
        modalGrid.appendChild(div);
    });
    
    for (let i = 0; i < firstDay; i++) {
        const div = document.createElement('div');
        div.className = 'day-cell empty';
        modalGrid.appendChild(div);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(year, month, day);
        const dateKey = dateObj.toDateString();
        const isPast = dateObj < today;
        const isToday = dateObj.toDateString() === today.toDateString();
        const isSunday = dateObj.getDay() === 0;
        const isWeekday = dateObj.getDay() >= 1 && dateObj.getDay() <= 6;
        const isWithinRange = isWithinNext3Months(dateObj);
        
        const div = document.createElement('div');
        div.className = 'day-cell';
        if (isPast || isSunday || !isWithinRange) div.classList.add('past');
        if (isToday) div.classList.add('today');
        
        const dayNumber = document.createElement('span');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        div.appendChild(dayNumber);
        
        if (isWeekday && !isPast && isWithinRange) {
            const slots = modalBookedSlots[dateKey] || [];
            const availableSlots = slots.filter(s => !s.booked).length;
            
            const slotInfo = document.createElement('span');
            slotInfo.className = 'day-slots';
            if (availableSlots > 0) {
                slotInfo.textContent = `${availableSlots} slots available`;
                slotInfo.className = 'day-slots available';
            } else if (slots.length > 0) {
                slotInfo.textContent = 'Fully booked';
                slotInfo.className = 'day-slots full';
            } else {
                slotInfo.textContent = 'No slots';
            }
            div.appendChild(slotInfo);
            div.style.cursor = 'pointer';
            div.addEventListener('click', () => { selectModalDate(dateObj); });
        } else if (isSunday && !isPast && isWithinRange) {
            const slotInfo = document.createElement('span');
            slotInfo.className = 'day-slots';
            slotInfo.textContent = 'Closed';
            slotInfo.style.color = '#6B7280';
            div.appendChild(slotInfo);
            div.classList.add('no-slots');
        }
        modalGrid.appendChild(div);
    }
    
    document.getElementById('modalTimeSlotsGrid').innerHTML = '';
    document.getElementById('modalSelectedDate').textContent = 'Select a date to see available slots';
    document.getElementById('modalBookBtn').disabled = true;
    modalSelectedDate = null;
    modalSelectedTimeSlot = null;
}

function isWithinNext3Months(date) {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setMonth(today.getMonth() + MAX_MONTHS_FUTURE);
    return date >= today && date <= maxDate;
}

function selectModalDate(date) {
    modalSelectedDate = date;
    modalSelectedTimeSlot = null;
    
    document.querySelectorAll('.modal-calendar-grid .day-cell').forEach(el => {
        el.classList.remove('selected');
    });
    
    const dateStr = date.toDateString();
    document.querySelectorAll('.modal-calendar-grid .day-cell').forEach(cell => {
        const dayNum = cell.querySelector('.day-number');
        if (dayNum) {
            const cellDate = new Date(modalCurrentDate.getFullYear(), modalCurrentDate.getMonth(), parseInt(dayNum.textContent));
            if (cellDate.toDateString() === dateStr) {
                cell.classList.add('selected');
            }
        }
    });
    
    renderModalTimeSlots(date);
}

function renderModalTimeSlots(date) {
    const dateKey = date.toDateString();
    const slots = modalBookedSlots[dateKey] || [];
    const modalTimeSlotsGrid = document.getElementById('modalTimeSlotsGrid');
    const modalSelectedDateEl = document.getElementById('modalSelectedDate');
    const modalBookBtn = document.getElementById('modalBookBtn');
    
    if (!modalTimeSlotsGrid || !modalSelectedDateEl || !modalBookBtn) return;
    
    modalSelectedDateEl.textContent = `Available slots for ${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}`;
    modalTimeSlotsGrid.innerHTML = '';
    
    if (slots.length === 0) {
        const msg = document.createElement('p');
        msg.style.color = '#6B7280';
        msg.style.padding = '12px';
        msg.textContent = 'No slots available for this date.';
        modalTimeSlotsGrid.appendChild(msg);
        modalBookBtn.disabled = true;
        return;
    }
    
    slots.forEach(slot => {
        const div = document.createElement('div');
        div.className = 'time-slot';
        if (slot.booked) div.classList.add('booked');
        
        const timeSpan = document.createElement('span');
        timeSpan.textContent = slot.time;
        div.appendChild(timeSpan);
        
        const bookedCount = slot.booked ? Math.floor(Math.random() * 7) + 1 : 0;
        const available = MAX_PARTICIPANTS - bookedCount;
        const countSpan = document.createElement('span');
        countSpan.className = 'slot-count';
        
        if (slot.booked) {
            countSpan.textContent = ` (${bookedCount}/${MAX_PARTICIPANTS} booked)`;
            const icon = document.createElement('span');
            icon.className = 'booked-icon';
            icon.innerHTML = ' ❌';
            div.appendChild(icon);
        } else {
            countSpan.textContent = ` (${available} spots left)`;
            const icon = document.createElement('span');
            icon.className = 'available-icon';
            icon.innerHTML = ' ✅';
            div.appendChild(icon);
        }
        div.appendChild(countSpan);
        
        if (!slot.booked) {
            div.addEventListener('click', () => {
                document.querySelectorAll('.modal-time-slots-grid .time-slot').forEach(el => {
                    el.classList.remove('selected-slot');
                });
                div.classList.add('selected-slot');
                modalSelectedTimeSlot = slot.time;
                modalBookBtn.disabled = false;
            });
        }
        modalTimeSlotsGrid.appendChild(div);
    });
    modalBookBtn.disabled = true;
}

// ============================================================ */
// ===== BOOKING MODAL - NEXT MONTH ===== */
// ============================================================ */
document.addEventListener('DOMContentLoaded', function() {
    const modalNextMonth = document.getElementById('modalNextMonth');
    const modalBookBtn = document.getElementById('modalBookBtn');
    
    if (modalNextMonth) {
        modalNextMonth.addEventListener('click', function() {
            const today = new Date();
            const maxDate = new Date(today);
            maxDate.setMonth(today.getMonth() + MAX_MONTHS_FUTURE);
            const nextMonthDate = new Date(modalCurrentDate.getFullYear(), modalCurrentDate.getMonth() + 1, 1);
            if (nextMonthDate <= maxDate) {
                modalCurrentDate.setMonth(modalCurrentDate.getMonth() + 1);
                renderModalCalendar();
            }
        });
    }
    
    if (modalBookBtn) {
        modalBookBtn.addEventListener('click', function() {
            if (modalSelectedDate && modalSelectedTimeSlot) {
                const dateStr = modalSelectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                });
                alert(`✅ Booking Confirmed!\n\nDate: ${dateStr}\nTime: ${modalSelectedTimeSlot}\nDuration: 1 Hour\nMax Participants: 7\n\nThank you for booking with QSkill!`);
                
                const dateKey = modalSelectedDate.toDateString();
                const slots = modalBookedSlots[dateKey] || [];
                const slotIndex = slots.findIndex(s => s.time === modalSelectedTimeSlot);
                if (slotIndex !== -1) slots[slotIndex].booked = true;
                
                modalSelectedTimeSlot = null;
                modalBookBtn.disabled = true;
                document.querySelectorAll('.modal-time-slots-grid .time-slot').forEach(el => {
                    el.classList.remove('selected-slot');
                });
                renderModalCalendar();
            }
        });
    }
});

// ============================================================ */
// ===== INITIALIZE BOOKING MODAL ON LOAD ===== */
// ============================================================ */
document.addEventListener('DOMContentLoaded', function() {
    // Check if booking modal elements exist
    if (document.getElementById('bookingModal')) {
        initBookingModal();
        renderModalCalendar();
    }
});