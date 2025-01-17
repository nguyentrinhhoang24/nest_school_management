import ExcelJS from "exceljs";

export async function readParentsExcel(file) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file);

    const worksheet = workbook.worksheets[0]; // Lấy sheet đầu tiên
    const data = [];

    worksheet.eachRow((row, rowIndex) => {
        if (rowIndex === 1) return; // Bỏ qua dòng tiêu đề

        const name = row.getCell(1).value || "";
        const phone = row.getCell(2).value.toString() || "";
        const address = row.getCell(3).value || "";
        const birthday = row.getCell(4).value || "";
        const gender = row.getCell(5).value == "1" ? "male" : "female";
        const email = row.getCell(6).value.toString() || "";
        const password = row.getCell(7).value || "";

        console.log('read data:', name, phone, address, birthday, gender, email, password);
        console.log('type of password:', typeof(password));
        data.push({ name, phone, address, birthday, gender, email, password });

    });

    return data;
}
