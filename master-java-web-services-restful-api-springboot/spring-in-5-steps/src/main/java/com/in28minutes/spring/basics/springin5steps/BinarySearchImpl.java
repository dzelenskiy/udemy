package com.in28minutes.spring.basics.springin5steps;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BinarySearchImpl {
	
	@Autowired
	private SortAlgorithm sortAlgorithm;
	
	
//	public BinarySearchImpl(SortAlgorithm sortAlgorithm) { 
//		super();
//	  	this.sortAlgorithm = sortAlgorithm; 
//	}
	 
	
//	public void setSortAlgorithm(SortAlgorithm sortAlgorithm) {
//		this.sortAlgorithm = sortAlgorithm;
//	}


	public int binarySearch(int[] numbers, int numberToSearchFor) {
				
		// Sorting an array
		
		// Implementing Sorting Logic
				
		/*
		 * BubbleSortAlgorithm bubbleSortAlgorithm = new BubbleSortAlgorithm(); int[]
		 * sortedNumbers = bubbleSortAlgorithm.sort(numbers);
		 */
		
		int[] sortedNumbers = sortAlgorithm.sort(numbers);
		System.out.println(sortAlgorithm);
		 
		
		// Bubble Sort Algorithm
		
		
		// Search the array
		// Return the result		
		return 3;
	}
	
}
