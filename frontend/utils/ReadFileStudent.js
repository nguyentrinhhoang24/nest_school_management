import ExcelJS from "exceljs";

export async function readStudentExcel(file) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file);

    const worksheet = workbook.worksheets[0]; // Lấy sheet đầu tiên
    const data = [];

    worksheet.eachRow((row, rowIndex) => {
        if (rowIndex === 1) return; // Bỏ qua dòng tiêu đề

        const name = row.getCell(1).value;
        const birthday = row.getCell(2).value || "";
        const gender = row.getCell(3).value == "1" ? "boy" : "girl";
        const address = row.getCell(4).value;

        console.log('read data:', name, birthday, gender, address);
        data.push({ name, birthday, gender, address, });
    });

    return data;
}
