import api from "./base_url";

const endPoints = {
  translate: "modules/translate/",
  image_bg_remover: "modules/image-bg-remover/",
  pdf_to_word: "modules/pdf-to-word/",
  merge_pdf: "modules/merge-pdfs/",
  excel_to_pdf: "modules/excel-to-pdf/",
  pdf_to_excel: "modules/pdf-to-excel/",
  pdf_to_images: "modules/pdf-to-images/",
  add_watermark: "modules/add-watermark/",
  pdf_to_rotate: "modules/pdf-to-rotate/",
  repair_pdf: "modules/repair-pdf/",
  split_pdf: "modules/split-pdf/",
  pagenumber_pdf: "modules/pagenumber_pdf/",
  organize_pdf: "modules/organize-pdf/",
  lock_unlock_pdf: "modules/lock-unlock-pdf/",
  protect_pdf: "modules/protect-pdf/",
  compress_pdf: "modules/compress-pdf/",
  word_ppt_to_pdf: "modules/word-ppt-to-pdf/",
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

