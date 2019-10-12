package com.boxing.maghnia.service.dto;

import java.time.LocalDate;

import org.springframework.data.domain.Pageable;

public class BoxerSearch {
	public static final String FULL_NAME = "fullname";
	public static final String PHONE = "phone";
	public static final String BIRTH_DATE = "birthdate";
	
	private String value;
	private String filter;
	
	
	public BoxerSearch() {
	}

	public BoxerSearch(String value, String filter) {
		super();
		this.value = value;
		this.filter = filter;
		
	}
	
	
	public void setValue(String value) {
		this.value = value;
	}
	
	public void setFilter(String filter) {
		this.filter = filter;
	}
	
	public Object getValue() {
		switch (this.getFilter()) {
		case FULL_NAME:
		case PHONE: return value;	
		case BIRTH_DATE:
			String[] dateStrings = this.value.split("-");
			return LocalDate.of(Integer.parseInt(dateStrings[0]), Integer.parseInt(dateStrings[1]), Integer.parseInt(dateStrings[2]));

		default:
			break;
		}
		return value;
	}
	
	public String getFilter() {
		return this.filter.toLowerCase();
	}

	@Override
	public String toString() {
		return "BoxerSearch [value=" + value + ", filter=" + filter + "]";
	}
	

	

	
}
