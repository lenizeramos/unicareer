import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';
import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    // Set worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    
    // Convert Buffer to Uint8Array
    const uint8Array = new Uint8Array(buffer);
    
    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    
    // Extract text from each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText;
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error('Failed to extract text from PDF');
  }
}