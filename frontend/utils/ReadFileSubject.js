import ExcelJS from "exceljs";

export async function readExcel(file) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file);

    const worksheet = workbook.worksheets[0]; // Lấy sheet đầu tiên
    const data = [];

    worksheet.eachRow((row, rowIndex) => {
        if (rowIndex === 1) return; // Bỏ qua dòng tiêu đề

        const title = row.getCell(1).value; 
        const description = row.getCell(2).value || ""; 
        const status = row.getCell(3).value == "1" ? "active" : "draft";

        data.push({
            title,
            description,
            status,
        });
    });

    return data;
}
