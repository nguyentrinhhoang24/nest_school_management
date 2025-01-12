import ExcelJS from "exceljs";

export async function readExcel(file) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file);

    const worksheet = workbook.worksheets[0]; // Lấy sheet đầu tiên
    const data = [];

    worksheet.eachRow((row, rowIndex) => {
        if (rowIndex === 1) return; // Bỏ qua dòng tiêu đề

        const code = row.getCell(1).value; // Cột A
        const title = row.getCell(2).value; // Cột B
        const description = row.getCell(3).value || ""; // Cột C
        const status = row.getCell(4).value == "1" ? "active" : "draft"; // Cột D

        data.push({
            code,
            title,
            description,
            status,
        });
    });

    return data;
}
