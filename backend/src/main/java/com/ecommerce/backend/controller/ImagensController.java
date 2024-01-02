package com.ecommerce.backend.controller;

import java.io.IOException;
import java.util.List;

import com.ecommerce.backend.service.ImagensService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * A REST Controller that exposes upload, download,
 * list, and delete file operations on Google Cloud Storage.
 */
@RestController
@RequestMapping("/api/imagens")
public class ImagensController {

  @Autowired
   ImagensService fileService;

  //List all file name
  @GetMapping("/")
  public ResponseEntity<List<String>> listOfFiles() {

    List<String> files = fileService.listOfFiles();

    return ResponseEntity.ok(files);
  }

  //Upload file
  @PostMapping("/")
  public ResponseEntity<String> uploadFile(@RequestParam Long idProduto, @RequestParam MultipartFile file) throws IOException {

    fileService.uploadFile(idProduto, file);

    return ResponseEntity.ok("File uploaded successfully");
  }

  //Delete file
  @DeleteMapping("/")
  public ResponseEntity<String> deleteFile(
          @RequestParam String fileName) {

    fileService.deleteFile(fileName);

    return ResponseEntity.ok(" File deleted successfully");
  }

  //Download file
  @GetMapping("/download")
  public ResponseEntity<Resource> downloadFile(
          @RequestParam String fileName)  {

    ByteArrayResource resource = fileService.downloadFile(fileName);

    HttpHeaders headers = new HttpHeaders();
    headers.add(HttpHeaders.CONTENT_DISPOSITION,
            "attachment; filename=\"" + fileName + "\"");

    return ResponseEntity.ok().
            contentType(MediaType.APPLICATION_OCTET_STREAM).
            headers(headers).body(resource);
  }
}