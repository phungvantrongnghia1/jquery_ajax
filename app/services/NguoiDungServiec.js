function NguoiDungServiec() {
    this.layDanhSachNguoiDung = function () {
        // tao ra doi  tuong ajax de lam viec voi back end

        return $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
            type: "GET"
        })
        // // tra ve 2 trang thai
        // // thanh cong trả về 1 kết quả
        // .done(function (result) {
        //     //console.log(result);
        //     // taoBang(result);
        // })
        // // that bai
        // .fail(function (err) {
        //     console.log(err);
        // })
    }
    this.ThemNguoiDung = function (nguoiDung) {
        $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
            type: "POST",
            data: nguoiDung
        })
            .done(function (result) {
                if (result === "tai khoan da ton tai !") {
                    alert('Đéo thêm được giống tên')
                } else {
                    location.href = ""; // bỏ trống sẽ reload lại trang "./link" để đi đến 1 link nào đó;
                }
            })
            .fail(function (err) {
                console.log(err);
            })
    }
    this.xoaNguoiDung = function (taiKhoan) {
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${taiKhoan}`,
            type: "DELETE"
        })
            .done(function (result) {
                location.reload();
            })
            .fail(function (err) {
                console.log(err);
            })
    }
    this.TimKiem = function (chuoi) {
        var mangTimKiem = [];
        var dsnd = JSON.parse(localStorage.getItem("DanhSachNguoiDung"));
        dsnd.map(function (item) {
            if (item.TaiKhoan.toLowerCase().indexOf(chuoi.toLowerCase()) > -1) {
                mangTimKiem.push(item);
            }
        })
        return mangTimKiem;
    }
    this.CapNhatNguoiDung= function(nguoiDung){
       $.ajax({
           url: `http://svcy.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung`,
           type: 'PUT',
           data: nguoiDung
       })
       .done(function(result){
        location.reload();
       })
       .fail(function(err){
           console.log(err);
       })
    }
}
// function taoBang(danhSachNguoiDung) {
//     var tblBody = "";

//     danhSachNguoiDung.map(function(item,index){ // tham số item và index nó tự gán theo index của danhSachNguoiDung
//         tblBody += `
//                 <tr>
//                     <td>${index}</td>
//                     <td>${item.TaiKhoan}</td>
//                     <td>${item.MatKhau}</td>
//                     <td>${item.HoTen}</td>
//                     <td>${item.Email}</td>
//                     <td>${item.SoDT}</td>
//                     <td>${item.TenLoaiNguoiDung}</td>
//                     <td>
//                         <button id="btnSua" class = "btn btn-info">Sửa</button>
//                         <button id="btnXoa" class = "btn btn-success">Xóa</button>
//                     </td>
//                 </tr>
//             `;

//     })
// for (var i = 0; i < danhSachNguoiDung.length; i++) {
//     tblBody += `
//         <tr>
//             <td>${i + 1}</td>
//             <td>${danhSachNguoiDung[i].TaiKhoan}</td>
//             <td>${danhSachNguoiDung[i].MatKhau}</td>
//             <td>${danhSachNguoiDung[i].HoTen}</td>
//             <td>${danhSachNguoiDung[i].Email}</td>
//             <td>${danhSachNguoiDung[i].SoDT}</td>
//             <td>${danhSachNguoiDung[i].TenLoaiNguoiDung}</td>
//         </tr>
//     `;
// }

// $('#tblDanhSachNguoiDung').html(tblBody);
