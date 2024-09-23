package com.inhatc.flightmore.domain.client;

import com.inhatc.flightmore.domain.NaverMember;
import com.inhatc.flightmore.domain.ServerType;

public interface MemberClient {
    ServerType spportServer();

    NaverMember fetch(String code);

    NaverMember delete(String code);
}
