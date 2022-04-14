package com.example.capstone.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
	private String token;
	private String id;
	private String email;
	private String password;
	private String username;
	private int age;
	private String gender;
}
