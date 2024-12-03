package com.tma.project_micro_service.feign;


import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "team-micro-services", path = "api/teams")
public interface TeamFeignClient {
}
