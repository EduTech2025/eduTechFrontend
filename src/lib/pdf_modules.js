import api from "./base_url";

const endPoints = {
  merge_pdf: "modules/merge-pdfs/",
  pdf_to_excel: "modules/pdf-to-excel/",
  add_watermark: "modules/add-watermark/",
};

const modulesApi = {

  pdf_to_excel_api: async function (file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post(endPoints.pdf_to_excel, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
          withCredentials: true,
      });

      blobUrlDownload(response);

      return response;
    } catch (error) {
      console.error("PDF to Excel conversion failed:", error);
      return { status: 500 };
    }
  },
  
  add_watermark_api: async function (file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post(endPoints.pdf_to_excel, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
          withCredentials: true,
      });

      blobUrlDownload(response);

      return response;
    } catch (error) {
      console.error("PDF to Excel conversion failed:", error);
      return { status: 500 };
    }
  },
  

};

export default modulesApi;




function blobUrlDownload(response) {
  const blob = new Blob([response.data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "output.xlsx");
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

