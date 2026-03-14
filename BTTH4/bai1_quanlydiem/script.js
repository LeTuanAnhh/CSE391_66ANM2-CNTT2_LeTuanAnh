// 1. DỮ LIỆU GỐC
// Mảng này luôn giữ toàn bộ danh sách sinh viên, không bị mất đi khi tìm kiếm
let students = [];
let sortDir = 1; // 1: Tăng dần, -1: Giảm dần (Dùng cho chức năng sắp xếp)

// 2. LẤY CÁC PHẦN TỬ DOM
const tableBody = document.getElementById('studentTableBody');
const txtName = document.getElementById('txtName');
const txtScore = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');

// Các phần tử phục vụ Bài 1.2 (Tìm kiếm & Lọc)
const txtSearch = document.getElementById('txtSearch');
const selRank = document.getElementById('selRank');

// 3. HÀM TÍNH XẾP LOẠI 
function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}

// 4. HÀM XỬ LÝ HIỂN THỊ CHÍNH (Kết hợp Lọc & Vẽ bảng - Bài 1.2)
function applyAndRender() {
    // Lấy giá trị người dùng đang nhập ở ô tìm kiếm và dropdown lọc
    const keyword = txtSearch.value.toLowerCase().trim();
    const rankFilter = selRank.value;

    // BƯỚC LỌC: Tạo một mảng tạm thời thỏa mãn các điều kiện
    let filtered = students.filter(s => {
        const matchName = s.name.toLowerCase().includes(keyword);
        const matchRank = (rankFilter === "All" || s.rank === rankFilter);
        return matchName && matchRank;
    });

    // BƯỚC VẼ BẢNG: Xóa bảng cũ và vẽ mảng đã lọc
    tableBody.innerHTML = "";
    
    if (filtered.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="no-result">Không tìm thấy sinh viên nào phù hợp</td></tr>`;
    } else {
        filtered.forEach((s, index) => {
            const row = document.createElement('tr');
            
            // Yêu cầu: Điểm < 5 tô màu vàng (Sử dụng class trong CSS)
            if (s.score < 5) row.classList.add('low-score');

            row.innerHTML = `
                <td>${index + 1}</td>
                <td><strong>${s.name}</strong></td>
                <td>${s.score}</td>
                <td><span class="rank-badge">${s.rank}</span></td>
                <td><button class="btn-delete" data-id="${s.id}">Xóa</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    updateDashboard(filtered);
}

// 5. THÊM SINH VIÊN MỚI
btnAdd.onclick = function() {
    const name = txtName.value.trim();
    const score = parseFloat(txtScore.value);

    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập họ tên và điểm hợp lệ (0-10)!");
        return;
    }

   
    const newStudent = {
        id: Date.now(), 
        name: name,
        score: score,
        rank: getRank(score)
    };

    students.push(newStudent); 
    
    applyAndRender(); 

    txtName.value = "";
    txtScore.value = "";
    txtName.focus();
};

// 6. XỬ LÝ XÓA (Dùng Event Delegation)
tableBody.onclick = function(e) {
    if (e.target.classList.contains('btn-delete')) {
        const idToDelete = parseInt(e.target.getAttribute('data-id'));
        
        if (confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
    
            students = students.filter(s => s.id !== idToDelete);
            applyAndRender();
        }
    }
};


document.getElementById('sortScore').onclick = function() {
    sortDir *= -1; 
    this.innerText = `Điểm ${sortDir === 1 ? '▲' : '▼'}`;
    
    students.sort((a, b) => (a.score - b.score) * sortDir);
    
    applyAndRender();
};

// 8. CẬP NHẬT THỐNG KÊ DASHBOARD
function updateDashboard(data) {
    document.getElementById('totalStudents').innerText = data.length;
    
    const totalScore = data.reduce((sum, s) => sum + s.score, 0);
    const avg = data.length > 0 ? (totalScore / data.length).toFixed(1) : "0.0";
    
    document.getElementById('avgScore').innerText = avg;
}

// 9. CÁC SỰ KIỆN REAL-TIME (Tìm kiếm ngay khi đang gõ)
txtSearch.oninput = applyAndRender; 
selRank.onchange = applyAndRender; 
txtScore.onkeyup = (e) => { if(e.key === "Enter") btnAdd.click(); };