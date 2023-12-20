package com.ecommerce.backend.repository;

import java.io.IOException;
import java.util.List;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.multipart.MultipartFile;


public interface ImagensRepository{
    List<String> listOfFiles();
    ByteArrayResource downloadFile(String fileName);
    boolean deleteFile(String fileName);
    void uploadFile(Long idProduto, MultipartFile file) throws IOException;
}

