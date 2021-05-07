package com.in28minutes.rest.webservices.restfulwebservices.versioning;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PersonVersioningController {
	
/*	
	Here are some examples of version control.
	The hardest part of version control is deciding on which type of versioning to use.
	Some factors to consider when deciding:
		-URI Pollution  (uri versioning)
		-Misuse of HTTP Headers  (headers were never intended for this use)
		-Caching  (not all versioning types can be cached)
		-Can we execute the request on the browser?
		-API Documentation
		
	There is no perfect solution. Each has pros and cons.
	You should decide on Versioning approach /system before building your API.
*/
	
	
	//versioning using uri (called uri versioning)
	//used by Twitter
	@GetMapping("v1/person")
	public PersonV1 personV1() {
		return new PersonV1("Bob Charlie");
	}
	
	@GetMapping("v2/person")
	public PersonV2 personV2() {
		return new PersonV2(new Name("Bob", "Charlie"));
	}
	
	//versioning using request param (called request parameter versioning)
	//used by Amazon
	@GetMapping(value="/person/param", params="version=1")
	public PersonV1 paramV1() {
		return new PersonV1("Bob Charlie");
	}
	
	@GetMapping(value="/person/param", params="version=2")
	public PersonV2 paramV2() {
		return new PersonV2(new Name("Bob", "Charlie"));
	}
	
	//versioning using header param (called header versioning)
	//used by Microsoft
	@GetMapping(value="/person/header", headers="X-API-VERSION=1")
	public PersonV1 headerV1() {
		return new PersonV1("Bob Charlie");
	}
	
	@GetMapping(value="/person/header", headers="X-API-VERSION=2")
	public PersonV2 headerV2() {
		return new PersonV2(new Name("Bob", "Charlie"));
	}
	
	//versioning using produces (called accept header/mime-type/media type versioning), requested using Accept header
	//used by GitHub
	@GetMapping(value="/person/produces", produces="application/vnd.company.app-v1+json")
	public PersonV1 producesV1() {
		return new PersonV1("Bob Charlie");
	}
	
	@GetMapping(value="/person/produces", produces="application/vnd.company.app-v2+json")
	public PersonV2 producesV2() {
		return new PersonV2(new Name("Bob", "Charlie"));
	}	
	

}
