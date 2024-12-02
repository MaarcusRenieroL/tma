package com.tma.user_micro_service.feign;


import com.tma.user_micro_service.model.User;
import org.springframework.cloud.openfeign.FeignClient;

import java.util.List;

@FeignClient("TEAM-MICRO-SERVICE")
public interface UserTeamInterface {


}
