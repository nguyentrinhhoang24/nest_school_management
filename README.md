# Nestjs App Kids Schools Management
## Các chức năng cần thêm
- Sửa lỗi role
- User phải đăng nhập để dùng các chức năng
- Tạo một thứ mới trong trường học ví dụ: create new branch, school_id của school admin gán cho school_id của new branch
- Một school có mảng chứa các id branch, làm thế nào để khi tạo class, classgroup... branch_id của các class, group... đó được gán đúng với id của branch chứa nó
- Tạo thêm các chức năng cho teacher (xem thời khóa biểu, điểm danh, xem thông tin sức khỏe học sinh).
 driver (xác nhận đưa đón học sinh).
 parent (xem menu theo id lớp, kiểm tra học phí, thanh toán, xem thời gian đưa đón)
- Mỗi school có ít nhất 1 branch
- Admin sau khi đăng nhập sẽ vào dashboard school có id tương ứng với school_id của admin 
- Tạo branch mới thì gán school_id của school admin vào school_id của branch, push _id của branch mới vào mảng branch_id của school có _id == school_id của admin 
- Tạo classgroup mới có phần chọn branch, branch sẽ được select trong mảng branch_id của school, chọn branch nào thì gán _id và school_id của branch đó vào branch_id và school_id của classgroup, push _id của classgroup mới vào mảng classgroup_id của branch được chọn
- Tạo class mới có phần chọn branch và classgroup, branch được select theo mảng branch_id của school, classgroup được select theo mảng classgroup_id của branch, gán school_id, branch_id, _id của classgroup được chọn vào các trường tương ứng của class, push _id class vào mảng class_id của classgroup
- 