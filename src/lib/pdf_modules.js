import api from "./base_url";
import Cookies from "js-cookie"; 

const endPoints = {
  translate: "pdf/translate/",
  image_bg_remover: "pdf/image-bg-remover/",
  pdf_to_word: "pdf/pdf-to-word/",
  merge_pdf: "pdf/merge-pdfs/",
  excel_to_pdf: "pdf/excel-to-pdf/",
  pdf_to_excel: "pdf/pdf-to-excel/",
  pdf_to_images: "pdf/pdf-to-images/",
  add_watermark: "pdf/add-watermark/",
  pdf_to_rotate: "pdf/pdf-to-rotate/",
  repair_pdf: "pdf/repair-pdf/",
  split_pdf: "pdf/split-pdf/",
  pagenumber_pdf: "pdf/pagenumber_pdf/",
  organize_pdf: "pdf/organize-pdf/",
  lock_unlock_pdf: "pdf/lock-unlock-pdf/",
  protect_pdf: "pdf/protect-pdf/",
  compress_pdf: "pdf/compress-pdf/",
  word_ppt_to_pdf: "pdf/word-ppt-to-pdf/",
};

const csrfToken = Cookies.get("csrftoken");

function blobUrlDownload(response, defaultFileName = "downloaded_file") {
  const contentType =
    response.headers["content-type"] || "application/octet-stream";
  const blob = new Blob([response.data], { type: contentType });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  // Try to extract filename from content-disposition header
  const disposition = response.headers["content-disposition"];
  let filename = defaultFileName;

  if (disposition && disposition.includes("filename=")) {
    filename = disposition
      .split("filename=")[1]
      .split(";")[0]
      .replace(/['"]/g, "");
  }

  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}


// important
const modulesApi = {
  excel_to_pdf_api: async function (file) {
    return handleUpload(endPoints.excel_to_pdf, file, "converted.pdf");
  },
  word_to_pdf_api: async function (file) {
    return handleUpload(endPoints.word_ppt_to_pdf, file, "converted.pdf");
  },

  pdf_to_excel_api: async function (file) {
    return handleUpload(endPoints.pdf_to_excel, file, "output.xlsx");
  },

  add_watermark_api: async function (file) {
    return handleUpload(endPoints.add_watermark, file, "watermarked.pdf");
  },
};




async function handleUpload(endpoint, file, defaultFileName) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-CSRFToken": csrfToken,
      },
      responseType: "blob",
      withCredentials: true,
    });

    blobUrlDownload(response, defaultFileName);
    return response;
  } catch (error) {
    console.error(`Upload failed at ${endpoint}:`, error);
    return { status: 500 };
  }
}

export default modulesApi;
