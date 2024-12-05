package com.tma.organization_micro_service.feign;

import com.tma.organization_micro_service.payload.request.UpdateUserOrganizationRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import com.tma.organization_micro_service.payload.response.StandardResponse;
import com.tma.organization_micro_service.payload.response.UserResponse;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.UUID;

@FeignClient(name = "user-micro-service", path = "/api/users")
public interface UserFeignClient {
    @PutMapping("{userId}/organization")
    ResponseEntity<StandardResponse<UserResponse>> updateUserOrganizationId(@PathVariable UUID userId, @RequestBody UpdateUserOrganizationRequest updateUserOrganizationRequest, @RequestHeader("Authorization") String authToken);
}
