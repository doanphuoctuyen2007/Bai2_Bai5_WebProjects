const { createApp } = Vue;

createApp({
  data() {
    return {
      tuKhoa: '',
      cart: [],
      thongBao: '',
      nextCartId: 1,
      products: [
        { id: 1, ten: 'Ốp lưng trong suốt chống sốc', loai: 'Ốp lưng', gia: 89000, anh: 'https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=700&q=80', moTa: 'Thiết kế gọn nhẹ, bảo vệ điện thoại hằng ngày.', nhan: 'Bán chạy' },
        { id: 2, ten: 'Tai nghe Bluetooth AirBeat', loai: 'Tai nghe', gia: 399000, anh: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80', moTa: 'Âm thanh rõ, hộp sạc nhỏ gọn dễ mang theo.', nhan: 'Hot' },
        { id: 3, ten: 'Củ sạc nhanh 20W', loai: 'Sạc điện thoại', gia: 189000, anh: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=700&q=80', moTa: 'Sạc tiện lợi cho thiết bị tương thích USB-C.', nhan: 'Mới' },
        { id: 4, ten: 'Cáp sạc Type-C bền chắc', loai: 'Cáp sạc', gia: 79000, anh: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=80', moTa: 'Dây cáp linh hoạt, thuận tiện dùng ở nhà và văn phòng.', nhan: '' },
        { id: 5, ten: 'Giá đỡ điện thoại để bàn', loai: 'Giá đỡ', gia: 119000, anh: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=700&q=80', moTa: 'Giữ điện thoại chắc chắn khi xem video hoặc học online.', nhan: 'Tiện ích' },
        { id: 6, ten: 'Pin sạc dự phòng 10000mAh', loai: 'Pin dự phòng', gia: 329000, anh: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=700&q=80', moTa: 'Bổ sung năng lượng khi bạn di chuyển cả ngày.', nhan: 'Ưa chuộng' },
        { id: 7, ten: 'Ốp lưng màu pastel', loai: 'Ốp lưng', gia: 99000, anh: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&w=700&q=80', moTa: 'Màu sắc nhẹ nhàng, tạo phong cách riêng.', nhan: '' },
        { id: 8, ten: 'Tai nghe có dây SoundGo', loai: 'Tai nghe', gia: 129000, anh: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=700&q=80', moTa: 'Dễ sử dụng, phù hợp nghe nhạc và học trực tuyến.', nhan: '' }
      ]
    };
  },
  computed: {
    // Lọc sản phẩm theo từ khóa, không phân biệt chữ hoa và chữ thường.
    danhSachLoc() {
      const tuKhoaNho = this.tuKhoa.trim().toLocaleLowerCase('vi');
      if (!tuKhoaNho) return this.products;
      return this.products.filter(sp =>
        `${sp.ten} ${sp.loai} ${sp.moTa}`.toLocaleLowerCase('vi').includes(tuKhoaNho)
      );
    },
    // Tổng số món trong giỏ, tính theo số lượng từng sản phẩm.
    cartCount() {
      return this.cart.reduce((tong, item) => tong + item.soLuong, 0);
    },
    // Tổng tiền hàng trước phí giao hàng.
    tongTien() {
      return this.cart.reduce((tong, item) => tong + item.gia * item.soLuong, 0);
    },
    // Demo: miễn phí giao hàng cho đơn từ 500.000đ.
    phiGiaoHang() {
      if (this.cart.length === 0 || this.tongTien >= 500000) return 0;
      return 25000;
    },
    // Tổng thanh toán bằng tiền hàng cộng phí giao hàng.
    tongThanhToan() {
      return this.tongTien + this.phiGiaoHang;
    }
  },
  methods: {
    // Định dạng số tiền theo cách hiển thị tiền Việt Nam.
    dinhDangTien(soTien) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(soTien);
    },
    // Thêm sản phẩm vào giỏ; nếu đã có sản phẩm cùng ID thì tăng số lượng.
    themVaoGio(sanPham) {
      this.thongBao = '';
      const itemCoSan = this.cart.find(item => item.id === sanPham.id);
      if (itemCoSan) {
        itemCoSan.soLuong++;
      } else {
        this.cart.push({ ...sanPham, soLuong: 1, cartId: this.nextCartId++ });
      }
    },
    // Xóa một dòng sản phẩm khỏi giỏ theo vị trí.
    xoaKhoiGio(index) {
      this.cart.splice(index, 1);
      this.thongBao = '';
    },
    // Giảm số lượng; tối thiểu một món cho mỗi dòng.
    giamSoLuong(index) {
      if (this.cart[index] && this.cart[index].soLuong > 1) {
        this.cart[index].soLuong--;
      }
    },
    // Minh họa thao tác đặt hàng ở giao diện; chưa gửi dữ liệu lên máy chủ.
    thanhToan() {
      if (this.cart.length === 0) {
        this.thongBao = 'Bạn hãy thêm sản phẩm vào giỏ trước khi đặt hàng.';
        return;
      }
      this.thongBao = `Đã tạo đơn hàng demo với tổng tiền ${this.dinhDangTien(this.tongThanhToan)}. Chức năng này chưa kết nối thanh toán thật.`;
    }
  }
}).mount('#app');

// Ghi chú: nếu dùng Vanilla JavaScript, mỗi lần thêm/xóa giỏ hàng phải tự querySelector
// và cập nhật DOM thủ công. Vue tự động cập nhật giao diện nhờ cơ chế reactivity.
