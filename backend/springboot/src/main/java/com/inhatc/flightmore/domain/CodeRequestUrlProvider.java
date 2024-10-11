package com.inhatc.flightmore.domain;

import com.inhatc.flightmore.domain.ServerType;

public interface CodeRequestUrlProvider {
    ServerType supportServer();

    String provide();
}
