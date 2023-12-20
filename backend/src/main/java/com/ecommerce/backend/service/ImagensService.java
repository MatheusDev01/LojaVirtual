package com.ecommerce.backend.service;

import com.ecommerce.backend.entity.Imagens;
import com.ecommerce.backend.entity.Produto;
import com.ecommerce.backend.repository.ImagensREP;
import com.ecommerce.backend.repository.ImagensRepository;
import com.ecommerce.backend.repository.ProdutoRepository;
import com.google.api.gax.paging.Page;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@Service
public class ImagensService implements ImagensRepository {
    @Value("${gcp.bucket.name}")
    private String bucketName;

    @Autowired
    Storage storage;

    @Autowired
    ImagensREP imagensREP;

    @Autowired
    ProdutoRepository produtoRepository;

    @Override
    public List<String> listOfFiles() {

        List<String> list = new ArrayList<>();
        Page<Blob> blobs = storage.list(bucketName);
        for (Blob blob : blobs.iterateAll()) {
            list.add(blob.getName());
        }
        return list;
    }

    @Override
    public ByteArrayResource downloadFile(String fileName) {

        Blob blob = storage.get(bucketName, fileName);
        ByteArrayResource resource = new ByteArrayResource(
                blob.getContent());

        return resource;
    }

    @Override
    public boolean deleteFile(String fileName) {
           
        List<Imagens> imagens = imagensREP.findByname(fileName);
        if (imagens != null){
        imagensREP.deleteAll(imagens);

        Blob blob = storage.get(bucketName, fileName);

        return blob.delete();
        } else {
            return false;
        }
    }

    @Override
    public void uploadFile(Long idProduto, MultipartFile file) throws IOException {

        Produto produto = produtoRepository.findById(idProduto).get();
        Imagens objeto = new Imagens();

        String nomeImagem = String.valueOf(produto.getId()) + file.getOriginalFilename();

        BlobId blobId = BlobId.of(bucketName, nomeImagem);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).
                setContentType(file.getContentType()).build();
        Blob blob = storage.create(blobInfo,file.getBytes());

        objeto.setName(nomeImagem);
        objeto.setProduto(produto);
        objeto = imagensREP.saveAndFlush(objeto);
    }
}
