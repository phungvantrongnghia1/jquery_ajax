$(document).ready(function () {
    var nguoiDungService = new NguoiDungServiec();
    // lay du lieu
    layDanhSachNguoiDung();
    function layDanhSachNguoiDung() {
        var danhSachNguoiDung = nguoiDungService.layDanhSachNguoiDung();
        danhSachNguoiDung.done(function (result) {
            taoBang(result);
            localStorage.setItem("DanhSachNguoiDung", JSON.stringify(result));
        })
    }
    // them moi
    $('#btnThemNguoiDung').click(function () {
        getInput("Thêm Người Dùng", "Thêm", "btnThem");
    })
    $('body').delegate('#btnThem', 'click', function () {
        var taiKhoan = $('#TaiKhoan').val();
        var hoTen = $('#HoTen').val();
        var matKhau = $('#MatKhau').val();
        var email = $('#Email').val();
        var soDT = $('#SoDienThoai').val();
        var loaiNguoiDung = $('#loaiNguoiDung').val();
        var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, loaiNguoiDung);
        nguoiDungService.ThemNguoiDung(nguoiDung);
    })
    // sửa người dùng     // Cập nhật
    $('body').delegate('.btnSua', 'click', function () {
        getInput("Sửa Người Dùng", "Cập Nhập", "btnCapNhat");
        var taiKhoan = $(this).data('taikhoan');
        var dsnd = JSON.parse(localStorage.getItem("DanhSachNguoiDung"));
        var vitri = -1;
        var x = dsnd.map(function (item, index) {
            if (item.TaiKhoan === taiKhoan) {
                vitri = index;
            }
        })
        console.log(dsnd[vitri]);
        $('#TaiKhoan').val(dsnd[vitri].TaiKhoan);
        $('#TaiKhoan').attr('readonly',true);
        $('#HoTen').val(dsnd[vitri].HoTen);
        $('#MatKhau').val(dsnd[vitri].MatKhau);
        $('#Email').val(dsnd[vitri].Email);
        $('#SoDienThoai').val(dsnd[vitri].SoDT);
        $('#loaiNguoiDung').val(dsnd[vitri].MaLoaiNguoiDung);
    })
    // Nut Cập Nhật
    $('body').delegate('#btnCapNhat','click',function(){
        var taiKhoan = $('#TaiKhoan').val();
        var hoTen = $('#HoTen').val();
        var matKhau = $('#MatKhau').val();
        var email = $('#Email').val();
        var soDT = $('#SoDienThoai').val();
        var loaiNguoiDung = $('#loaiNguoiDung').val();
        var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, loaiNguoiDung);
        nguoiDungService.CapNhatNguoiDung(nguoiDung);
        
    })
    // tách hàm 
    function getInput(title, btnTitle, btnId) {
        $('.modal-title').html(title);
        var footer = `
            <button id="${btnId}" class="btn btn-danger">${btnTitle}</button>
            <button type="button" data-dismiss="modal" id="btnDong" class="btn btn-warning">Close</button>
       `
        $('.modal-footer').html(footer);
    }
    // xóa 
    $('body').delegate('.btnXoa', 'click', function () {
        var taiKhoan = $(this).data('taikhoan');
        nguoiDungService.xoaNguoiDung(taiKhoan);
    })
    // tim kiem
    $('#txtTimKiem').keyup(function () {
        var taiKhoan = $('#txtTimKiem').val();
        var result = nguoiDungService.TimKiem(taiKhoan);
        taoBang(result);
    })
})
function taoBang(danhSachNguoiDung) {
    var tblBody = "";

    danhSachNguoiDung.map(function (item, index) { // tham số item và index nó tự gán theo index của danhSachNguoiDung
        tblBody += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.TaiKhoan}</td>
                    <td>${item.MatKhau}</td>
                    <td>${item.HoTen}</td>
                    <td>${item.Email}</td>
                    <td>${item.SoDT}</td>
                    <td>${item.TenLoaiNguoiDung}</td>
                    <td>
                        <button class = "btn btn-info btnSua" data-toggle="modal" data-target="#myModal" data-taikhoan="${item.TaiKhoan}">Sửa</button>
                        <button  class = "btn btn-success btnXoa" data-taikhoan="${item.TaiKhoan}">Xóa</button>
                    </td>
                </tr>
            `;

    })
    $('#tblDanhSachNguoiDung').html(tblBody);
}

