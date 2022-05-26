package com.example.capstone.controller;

import com.example.capstone.dto.ResponseDTO;
import com.example.capstone.dto.ResultDTO;
import com.example.capstone.model.ResultEntity;
import com.example.capstone.service.ResultService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("result")
public class ResultController {

	@Autowired
	private ResultService service;

	@PostMapping
	public ResponseEntity<?> createResult(
					@AuthenticationPrincipal String userId,
					@RequestBody ResultDTO dto) {
		try {
			// (1) ResultEntity로 변환한다.
			ResultEntity entity = ResultDTO.toEntity(dto);

			// (2) id를 null로 초기화 한다. 생성 당시에는 id가 없어야 하기 때문이다.
			entity.setId(null);

			// (3) 유저 아이디 설정
			entity.setUserId(userId);

			System.out.println("entity = " + entity);

			// (4) 서비스를 이용해 Result엔티티를 생성한다.
			List<ResultEntity> entities = service.create(entity);

			// (5) 자바 스트림을 이용해 리턴된 엔티티 리스트를 ResultDTO리스트로 변환한다.

			List<ResultDTO> dtos = entities.stream().map(ResultDTO::new).collect(Collectors.toList());

			// (6) 변환된 ResultDTO리스트를 이용해ResponseDTO를 초기화한다.
			ResponseDTO<ResultDTO> response = ResponseDTO.<ResultDTO>builder().data(dtos).build();

			// (7) ResponseDTO를 리턴한다.
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			// (8) 혹시 예외가 나는 경우 dto대신 error에 메시지를 넣어 리턴한다.
			log.info("오류", String.valueOf(dto));
			String error = e.getMessage();
			ResponseDTO<ResultDTO> response = ResponseDTO.<ResultDTO>builder().error(error).build();
			return ResponseEntity.badRequest().body(response);
		}
	}

	@GetMapping
	public ResponseEntity<?> retrieveResultList(
					@AuthenticationPrincipal String userId) {
		System.out.println("UserID : " + userId);
		// (1) 서비스 메서드의 retrieve메서드를 사용해 Result리스트를 가져온다
		List<ResultEntity> entities = service.retrieve(userId);

		// (2) 자바 스트림을 이용해 리턴된 엔티티 리스트를 ResultDTO리스트로 변환한다.
		List<ResultDTO> dtos = entities.stream().map(ResultDTO::new).collect(Collectors.toList());

		// (6) 변환된 ResultDTO리스트를 이용해ResponseDTO를 초기화한다.
		ResponseDTO<ResultDTO> response = ResponseDTO.<ResultDTO>builder().data(dtos).build();

		// (7) ResponseDTO를 리턴한다.
		return ResponseEntity.ok(response);
	}


	@PutMapping
	public ResponseEntity<?> updateResult(@AuthenticationPrincipal String userId,
	                                    @RequestBody ResultDTO dto) {
		// (1) dto를 entity로 변환한다.
		ResultEntity entity = ResultDTO.toEntity(dto);

		// (2) id를 userId 초기화 한다.
		entity.setUserId(userId);

		// (3) 서비스를 이용해 entity를 업데이트 한다.
		List<ResultEntity> entities = service.update(entity);

		// (4) 자바 스트림을 이용해 리턴된 엔티티 리스트를 ResultDTO리스트로 변환한다.
		List<ResultDTO> dtos = entities.stream().map(ResultDTO::new).collect(Collectors.toList());

		// (5) 변환된 ResultDTO리스트를 이용해ResponseDTO를 초기화한다.
		ResponseDTO<ResultDTO> response = ResponseDTO.<ResultDTO>builder().data(dtos).build();

		// (6) ResponseDTO를 리턴한다.
		return ResponseEntity.ok(response);
	}

	@DeleteMapping
	public ResponseEntity<?> deleteResult(
					@AuthenticationPrincipal String userId,
					@RequestBody ResultDTO dto
	) {
		try {
			// (1) ResultEntity로 변환한다.
			ResultEntity entity = ResultDTO.toEntity(dto);

			// (2) 임시 유저 아이디를 설정 해 준다.
			entity.setUserId(userId);

			// (3) 서비스를 이용해 entity를 삭제 한다.
			List<ResultEntity> entities = service.delete(entity);

			// (4) 자바 스트림을 이용해 리턴된 엔티티 리스트를 ResultDTO리스트로 변환한다.
			List<ResultDTO> dtos = entities.stream().map(ResultDTO::new).collect(Collectors.toList());

			// (5) 변환된 ResultDTO리스트를 이용해ResponseDTO를 초기화한다.
			ResponseDTO<ResultDTO> response = ResponseDTO.<ResultDTO>builder().data(dtos).build();

			// (6) ResponseDTO를 리턴한다.
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			// (8) 혹시 예외가 나는 경우 dto대신 error에 메시지를 넣어 리턴한다.
			String error = e.getMessage();
			ResponseDTO<ResultDTO> response = ResponseDTO.<ResultDTO>builder().error(error).build();
			return ResponseEntity.badRequest().body(response);
		}
	}

}
