package com.example.capstone.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.capstone.model.ResultEntity;

import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<ResultEntity, String>{
	List<ResultEntity> findByUserId(String userId);
}
