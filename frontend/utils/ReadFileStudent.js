import ExcelJS from "exceljs";

export async function readStudentExcel(file) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file);

    const worksheet = workbook.worksheets[0]; // Lấy sheet đầu tiên
    const data = [];

    worksheet.eachRow((row, rowIndex) => {
        if (rowIndex === 1) return; // Bỏ qua dòng tiêu đề

        const code = row.getCell(1).value; // Cột A
        const name = row.getCell(2).value; // Cột B
        const birthday = row.getCell(3).value || ""; // Cột C
        const gender = row.getCell(4).value == "1" ? "boy" : "girl"; // Cột D
        const address = row.getCell(5).value; // Cột E

        console.log('read data:', code, name, birthday, gender, address);
        data.push({ code, name, birthday, gender, address, });
    });

    return data;
}
