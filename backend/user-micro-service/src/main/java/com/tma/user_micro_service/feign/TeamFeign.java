package com.tma.user_micro_service.feign;


import org.springframework.cloud.openfeign.FeignClient;

@FeignClient("TEAM-MICRO-SERVICE")
public interface TeamFeign {


}
