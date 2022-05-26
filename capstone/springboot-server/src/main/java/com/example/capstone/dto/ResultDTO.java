package com.example.capstone.dto;

import com.example.capstone.model.ResultEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ResultDTO {
	private String id;
	private String overallData;
	private String data1;
	private String data2;
	private String data3;
	private String data4;
	private String data5;
	private String data6;

	public ResultDTO(final ResultEntity entity) {
		this.id = entity.getId();
		this.overallData = entity.getOverallData();
		this.data1 = entity.getData1();
		this.data2 = entity.getData2();
		this.data3 = entity.getData3();
		this.data4 = entity.getData4();
		this.data5 = entity.getData5();
		this.data6 = entity.getData6();
	}

	public static ResultEntity toEntity(final ResultDTO dto) {
		return ResultEntity.builder()
						.id(dto.getId())
						.overallData(dto.getOverallData())
						.data1(dto.getData1())
						.data2(dto.getData2())
						.data3(dto.getData3())
						.data4(dto.getData4())
						.data5(dto.getData5())
						.data6(dto.getData6())
				.build();
	}
}

