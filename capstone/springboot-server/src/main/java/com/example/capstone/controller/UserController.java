package com.example.capstone.controller;

import com.example.capstone.dto.ResponseDTO;
import com.example.capstone.dto.UserDTO;
import com.example.capstone.model.UserEntity;
import com.example.capstone.security.TokenProvider;
import com.example.capstone.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/auth")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private TokenProvider tokenProvider;

	// Bean으로 작성해도 됨.
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
		try {
			// 리퀘스트를 이용해 저장할 유저 만들기
			UserEntity user = UserEntity.builder()
							.email(userDTO.getEmail())
							.password(passwordEncoder.encode(userDTO.getPassword()))
							.username(userDTO.getUsername())
							.age(userDTO.getAge())
							.gender(userDTO.getGender())
							.build();
			// 서비스를 이용해 리파지토리에 유저 저장
			UserEntity registeredUser = userService.create(user);
			UserDTO responseUserDTO = UserDTO.builder()
							.email(registeredUser.getEmail())
							.id(registeredUser.getId())
							.username(registeredUser.getUsername())
							.age(registeredUser.getAge())
							.gender(registeredUser.getGender())
							.build();
			// 유저 정보는 항상 하나이므로 그냥 리스트로 만들어야하는 ResponseDTO를 사용하지 않고 그냥 UserDTO 리턴.
			return ResponseEntity.ok(responseUserDTO);
		} catch (Exception e) {
			// 예외가 나는 경우 bad 리스폰스 리턴.
			ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
			return ResponseEntity
							.badRequest()
							.body(responseDTO);
		}
	}

	@PostMapping("/signin")
	public ResponseEntity<?> authenticate(@RequestBody UserDTO userDTO) {
		UserEntity user = userService.getByCredentials(
						userDTO.getEmail(),
						userDTO.getPassword(),
						passwordEncoder);

		if(user != null) {
			// 토큰 생성
			final String token = tokenProvider.create(user);
			final UserDTO responseUserDTO = UserDTO.builder()
							.email(user.getUsername())
							.id(user.getId())
							.token(token)
							.build();
			return ResponseEntity.ok().body(responseUserDTO);
		} else {
			ResponseDTO responseDTO = ResponseDTO.builder()
							.error("Login failed.")
							.build();
			return ResponseEntity
							.badRequest()
							.body(responseDTO);
		}
	}
}
