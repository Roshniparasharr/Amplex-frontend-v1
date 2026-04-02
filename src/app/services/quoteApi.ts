const BASE_URL = "http://127.0.0.1:8000";

export const uploadRfqFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BASE_URL}/v1/upload-route/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error uploading RFQ file:", error);
    throw error;
  }
};

export const validateStandards = async (quoteId: string, spec: any) => {
  try {
    const response = await fetch(`${BASE_URL}/v1/validate-standards/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quote_id: quoteId,
        spec: spec,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to validate standards");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error validating standards:", error);
    throw error;
  }
};