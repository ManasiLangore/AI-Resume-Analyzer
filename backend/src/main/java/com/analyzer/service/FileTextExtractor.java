package com.analyzer.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@Component
public class FileTextExtractor {
    public String extractText(String filePath, String fileType) throws IOException {
        File file = new File(filePath);

        if(fileType.equals("application/pdf")){
            return extractTextFromPDF(file);
        }
        else if(fileType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")){
            return extractTextFromDocx(file);
        }
        else{
            throw new IllegalArgumentException("Unsupported file type for text parsing operations.");
        }
    }

    private String extractTextFromPDF(File file) throws IOException {
        // PDFBox 3.x utilizes the Loader class to safely mount documents
        try(PDDocument document = Loader.loadPDF(file)) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }

    }

    private String extractTextFromDocx(File file) throws IOException {
        try (FileInputStream fis = new FileInputStream(file);
             XWPFDocument document = new XWPFDocument(fis);
             XWPFWordExtractor extractor = new XWPFWordExtractor(document)) {
            return extractor.getText();
        }
    }
}
